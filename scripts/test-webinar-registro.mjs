import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createHmac } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

// Ejecuta el handler real con Notion y SMTP simulados: nunca envía datos ni correos.
const require = createRequire(import.meta.url);
const root = new URL('../', import.meta.url);
function loadTs(path, dependencies = {}, globals = {}) {
  const filename = fileURLToPath(new URL(path, root));
  const source = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module, exports: module.exports, Buffer, URL, Date,
    require: name => name in dependencies ? dependencies[name] : require(name),
    console: { error() {} }, ...globals,
  }, { filename });
  return module.exports;
}

function harness(options = {}) {
  const env = {
    FORM_SECRET: 'webinar-test-secret',
    WEBINAR_4_ZOOM_JOIN_URL: 'https://us06web.zoom.us/j/89923742582?pwd=test',
    NOTION_WEBINAR_DB_ID: 'test-db',
    ...options.env,
  };
  const state = { records: [], mail: [], notionRequests: 0 };
  const notion = loadTs('lib/notion.ts', {}, {
    process: { env },
    fetch: async (url, init) => {
      state.notionRequests++;
      if (options.notionFailure) return Response.json({}, { status: 503 });
      const body = JSON.parse(init.body);
      if (url.endsWith('/query')) {
        const [email, campaign] = body.filter.and;
        const results = state.records.filter(record =>
          record.properties.Correo.email === email.email.equals &&
          record.properties['Campaña preeliminar '].rich_text[0].text.content === campaign.rich_text.equals);
        return Response.json({ results });
      }
      const record = { id: `record-${state.records.length + 1}`, ...body };
      state.records.push(record);
      return Response.json(record);
    },
  });
  const handler = loadTs('app/api/webinar/registro/route.ts', {
    'next/server': { NextResponse: { json: (data, init) => Response.json(data, init) } },
    '@/lib/notion': notion,
    '@/lib/phone': loadTs('lib/phone.ts'),
    '@/lib/webinar': loadTs('lib/webinar.ts'),
    '@/lib/mail': {
      sendMail: async mail => {
        state.mail.push(mail);
        if (mail.to.includes('marketing@htk-id.com')) {
          if (options.internalMailFailure) throw new Error('SMTP interno no disponible');
        } else {
          if (options.smtpFailure) throw new Error('SMTP no disponible');
          if (options.recipientRejected) return { accepted: [] };
        }
        return { accepted: [mail.to] };
      },
    },
  }, { process: { env } });
  function token(timestamp = Date.now()) {
    const ts = String(timestamp);
    return `${ts}.${createHmac('sha256', env.FORM_SECRET || 'missing').update(ts).digest('hex')}`;
  }
  async function submit(overrides = {}, ip = '192.0.2.1') {
    const body = {
      nombre: 'Prueba Webinar', email: ' PRUEBA@example.com ', telefono: '5512345678',
      empresa: 'Empresa de prueba', _hp: '', _t: 5000, _token: token(), ...overrides,
    };
    const response = await handler.POST(new Request('http://localhost/api/webinar/registro', {
      method: 'POST', headers: { 'x-forwarded-for': ip }, body: JSON.stringify(body),
    }));
    return { status: response.status, body: await response.json() };
  }
  return { options, state, handler, submit, token };
}

test('confirma solo después de guardar y de que SMTP acepte al asistente', async () => {
  const h = harness();
  const result = await h.submit({ webinar: 'Otro evento', zoomLink: 'https://example.com/incorrecto' });
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { ok: true, registered: true, emailSent: true });
  assert.equal(h.state.records.length, 1);
  assert.equal(h.state.mail[0].to, 'prueba@example.com');
  assert.match(h.state.mail[0].html, /https:\/\/us06web.zoom.us\/j\/89923742582/);
  assert.doesNotMatch(h.state.mail[0].html, /example.com\/incorrecto/);
  assert.doesNotMatch(h.state.mail[0].subject, /Otro evento/);
});

test('SMTP fallido conserva el registro, informa error y permite reintentar sin duplicarlo', async () => {
  const options = { smtpFailure: true };
  const h = harness(options);
  const failure = await h.submit();
  assert.equal(failure.status, 502);
  assert.equal(failure.body.ok, false);
  assert.equal(failure.body.registered, true);
  assert.equal(failure.body.emailSent, false);
  assert.match(failure.body.error, /registro quedó guardado/);
  options.smtpFailure = false;
  const retry = await h.submit();
  assert.equal(retry.body.emailSent, true);
  assert.equal(h.state.records.length, 1);
});

test('SMTP que resuelve pero rechaza el destinatario tampoco confirma', async () => {
  const h = harness({ recipientRejected: true });
  const result = await h.submit();
  assert.equal(result.status, 502);
  assert.equal(result.body.emailSent, false);
  assert.equal(h.state.mail.length, 1);
});

test('un fallo en Notion impide enviar el correo de confirmación', async () => {
  const h = harness({ notionFailure: true });
  const result = await h.submit();
  assert.equal(result.status, 500);
  assert.equal(result.body.ok, false);
  assert.equal(h.state.mail.length, 0);
});

test('un fallo de la notificación interna no invalida el acceso enviado al asistente', async () => {
  const h = harness({ internalMailFailure: true });
  const result = await h.submit();
  assert.equal(result.status, 200);
  assert.equal(result.body.emailSent, true);
});

test('token ausente, inválido, vencido o futuro devuelve error sin guardar ni enviar', async () => {
  const h = harness();
  for (const token of ['', 'invalid', h.token(Date.now() - 31 * 60000), h.token(Date.now() + 60000)]) {
    const result = await h.submit({ _token: token });
    assert.equal(result.status, 403);
    assert.equal(result.body.ok, false);
  }
  assert.equal(h.state.notionRequests, 0);
  assert.equal(h.state.mail.length, 0);
});

test('honeypot y envío demasiado rápido no producen confirmaciones falsas', async () => {
  const h = harness();
  assert.equal((await h.submit({ _hp: 'bot' })).status, 400);
  for (const elapsed of [0, 2999, null]) {
    const result = await h.submit({ _t: elapsed });
    assert.equal(result.status, 429);
    assert.equal(result.body.ok, false);
  }
  assert.equal(h.state.records.length, 0);
  assert.equal(h.state.mail.length, 0);
});

test('el límite de intentos devuelve 429 y nunca éxito', async () => {
  const h = harness();
  for (let i = 0; i < 5; i++) assert.equal((await h.submit()).status, 200);
  const limited = await h.submit();
  assert.equal(limited.status, 429);
  assert.equal(limited.body.ok, false);
  assert.equal(h.state.records.length, 1);
});

test('rechaza datos inválidos antes de guardar o enviar', async () => {
  for (const overrides of [{ nombre: '   ' }, { email: 'sin-correo' }, { telefono: '123' }, { nombre: {} }, { empresa: [] }]) {
    const h = harness();
    assert.equal((await h.submit(overrides)).status, 400);
    assert.equal(h.state.notionRequests, 0);
    assert.equal(h.state.mail.length, 0);
  }
});

test('sin FORM_SECRET no guarda ni envía', async () => {
  const h = harness({ env: { FORM_SECRET: '' } });
  const result = await h.submit();
  assert.equal(result.status, 503);
  assert.equal(h.state.notionRequests, 0);
  assert.equal(h.state.mail.length, 0);
});

test('escapa texto del asistente en el HTML del correo', async () => {
  const h = harness();
  assert.equal((await h.submit({ nombre: '<b>Prueba</b> Webinar', empresa: '<b>Empresa</b>' })).status, 200);
  assert.match(h.state.mail[0].html, /&lt;b&gt;Prueba&lt;\/b&gt;/);
  assert.doesNotMatch(h.state.mail[1].html, /<b>Empresa<\/b>/);
});

function clientHarness(replies, options = {}) {
  const states = [];
  const requests = [];
  let cursor = 0;
  let tokenCount = 0;
  const react = {
    useState(initial) {
      const index = cursor++;
      if (index === states.length) states.push(typeof initial === 'function' ? initial() : initial);
      return [states[index], value => {
        states[index] = typeof value === 'function' ? value(states[index]) : value;
      }];
    },
  };
  const { default: Component } = loadTs('app/academia/webinar-4/WebinarClient.tsx', {
    react,
    'next/image': { default: 'img' },
    'next/link': { default: 'a' },
    '@/lib/phone': loadTs('lib/phone.ts'),
    '@/lib/webinar': loadTs('lib/webinar.ts'),
    './webinar.module.css': { default: {} },
  }, {
    fetch: async (url, init) => {
      requests.push({ url, init });
      if (url === '/api/leads/token') {
        tokenCount++;
        return Response.json({ token: options.tokenFailure ? '' : `fresh-token-${tokenCount}` },
          { status: options.tokenFailure ? 503 : 200 });
      }
      const reply = replies.shift();
      if (reply instanceof Error) throw reply;
      return Response.json(reply.body, { status: reply.status });
    },
  });
  function render() { cursor = 0; return Component(); }
  function find(node, predicate) {
    if (Array.isArray(node)) return node.flatMap(child => find(child, predicate));
    if (!node || typeof node !== 'object') return [];
    return [...(predicate(node) ? [node] : []), ...find(node.props?.children, predicate)];
  }
  function text(node) {
    if (Array.isArray(node)) return node.map(text).join(' ');
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    return node?.props ? text(node.props.children) : '';
  }
  for (const [placeholder, value] of [
    ['Tu nombre', 'Prueba Webinar'], ['tu@empresa.com', 'prueba@example.com'], ['+52 55 1234 5678', '5512345678'],
  ]) {
    find(render(), node => node.props?.placeholder === placeholder)[0].props.onChange({ target: { value } });
  }
  return {
    requests,
    text: () => text(render()),
    button: () => text(find(render(), node => node.type === 'button')[0]),
    async submit() {
      await find(render(), node => node.type === 'form')[0].props.onSubmit({ preventDefault() {} });
    },
  };
}

test('el formulario no confirma un ok incompleto ni una respuesta HTTP fallida', async () => {
  for (const reply of [
    { status: 200, body: { ok: true } },
    { status: 500, body: { ok: true, emailSent: true } },
  ]) {
    const h = clientHarness([reply]);
    await h.submit();
    assert.doesNotMatch(h.text(), /¡Registro confirmado!/);
    assert.match(h.text(), /No pudimos confirmar/);
    assert.equal(h.button().trim(), 'Reservar mi lugar');
  }
});

test('el formulario ofrece reenvío tras fallo SMTP y solo confirma al recibir emailSent', async () => {
  const h = clientHarness([
    { status: 502, body: { ok: false, registered: true, emailSent: false, error: 'Registro guardado, correo pendiente.' } },
    { status: 200, body: { ok: true, registered: true, emailSent: true } },
  ]);
  await h.submit();
  assert.match(h.text(), /Registro guardado, correo pendiente/);
  assert.match(h.button(), /Reintentar envío del correo/);
  await h.submit();
  assert.match(h.text(), /¡Registro confirmado!/);
  const submissions = h.requests.filter(request => request.url === '/api/webinar/registro');
  assert.equal(submissions.length, 2);
  assert.equal(JSON.parse(submissions[0].init.body)._token, 'fresh-token-1');
  assert.equal(JSON.parse(submissions[1].init.body)._token, 'fresh-token-2');
  assert.equal(JSON.parse(submissions[1].init.body).email, 'prueba@example.com');
  assert.equal('zoomLink' in JSON.parse(submissions[0].init.body), false);
});

test('si falla la obtención de token, el formulario no envía un registro inválido', async () => {
  const h = clientHarness([], { tokenFailure: true });
  await h.submit();
  assert.match(h.text(), /No pudimos validar la sesión/);
  assert.equal(h.requests.length, 1);
});

test('una desconexión conserva el formulario y permite volver a intentar', async () => {
  const h = clientHarness([
    new Error('Sin conexión'),
    { status: 200, body: { ok: true, emailSent: true } },
  ]);
  await h.submit();
  assert.match(h.text(), /Revisa tu conexión/);
  assert.doesNotMatch(h.text(), /¡Registro confirmado!/);
  await h.submit();
  assert.match(h.text(), /¡Registro confirmado!/);
});
