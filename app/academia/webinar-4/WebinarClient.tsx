'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isValidPhone } from '@/lib/phone';
import { WEBINAR_4 as WEBINAR } from '@/lib/webinar';
import styles from './webinar.module.css';

type FormState = 'idle' | 'loading' | 'sent' | 'error';

function EventIcon({ kind }: { kind: 'calendar' | 'clock' | 'video' | 'arrow' | 'check' | 'mail' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'calendar' && <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4M8 14h1M15 14h1M8 17h1" /></>}
      {kind === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
      {kind === 'video' && <><rect x="3" y="6" width="12" height="12" rx="2" /><path d="m15 10 6-3v10l-6-3" /></>}
      {kind === 'arrow' && <path d="M5 12h14m-6-6 6 6-6 6" />}
      {kind === 'check' && <path d="m5 12 4 4L19 6" />}
      {kind === 'mail' && <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>}
    </svg>
  );
}

export default function WebinarClient() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', empresa: '' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailPending, setEmailPending] = useState(false);
  const [telefonoTouched, setTelefonoTouched] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [loadedAt] = useState(() => Date.now());

  const telefonoInvalido = telefonoTouched && form.telefono.length > 0 && !isValidPhone(form.telefono);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.telefono) return;
    if (!isValidPhone(form.telefono)) { setTelefonoTouched(true); return; }

    setFormState('loading');
    try {
      // Renovar la sesión en cada intento, incluso si la página lleva tiempo abierta.
      const tokenResponse = await fetch('/api/leads/token', { cache: 'no-store' });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok || typeof tokenData.token !== 'string' || !tokenData.token) {
        setErrorMessage('No pudimos validar la sesión. Vuelve a intentar el registro en unos momentos.');
        setFormState('error');
        return;
      }
      const res = await fetch('/api/webinar/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _hp: honeypot,
          _t: Date.now() - loadedAt,
          _token: tokenData.token,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok === true && data.emailSent === true) {
        setEmailPending(false);
        setFormState('sent');
      } else {
        setEmailPending(data.registered === true && data.emailSent === false);
        setErrorMessage(typeof data.error === 'string' ? data.error : 'No pudimos confirmar el envío del correo. Intenta de nuevo o escríbenos a marketing@htk-id.com.');
        setFormState('error');
      }
    } catch {
      setErrorMessage('No pudimos confirmar el envío del correo. Revisa tu conexión e intenta de nuevo. Si ya recibiste el acceso, tu registro está completo.');
      setFormState('error');
    }
  }

  return (
    <div className={styles.page}>
      <a href="#contenido-webinar" className={styles.skipLink}>Ir al contenido</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" aria-label="HTK Identificación Inteligente, inicio" className={styles.logoLink}>
            <Image src="/htk-logo-navbar.webp" alt="HTK Identificación Inteligente" width={155} height={64} className={styles.logo} priority />
          </Link>
          <div className={styles.academyBrand}>
            <span>ACADEMIA <strong>HTK</strong></span>
            <small>Conocimiento que transforma resultados</small>
          </div>
          <a href="#registro" aria-label="Reservar mi lugar" className={styles.headerCta}><span className={styles.headerCtaText}>Reservar mi lugar</span><span className={styles.headerCtaMobileText}>Registro</span><EventIcon kind="arrow" /></a>
        </div>
      </header>

      <div id="contenido-webinar" className={styles.container}>
        <div className={styles.breadcrumb}><span>Academia HTK</span><span aria-hidden="true">/</span><span>Webinar 04</span></div>

        <section className={styles.eventCover} aria-labelledby="webinar-title">
          <div className={styles.hero}>
            <div className={styles.heroArt} aria-hidden="true">
              <Image src="/academia/webinar-4-banner.jpg" alt="" width={1600} height={900} className={styles.heroImage} sizes="(max-width: 600px) 850px, 1400px" priority />
            </div>
            <div className={styles.heroContent}>
              <div className={styles.heroEyebrow}><span className={styles.webinarNumber}>WEBINAR 04</span><span>ACADEMIA HTK · 2026</span></div>
              <h1 id="webinar-title" className={styles.title}>
                <span>¿Dónde <em>está?</em></span>
                <span>¿Quién <em>lo tiene?</em></span>
                <span>¿Qué pasó <em>con él?</em></span>
              </h1>
              <div className={styles.heroRule} />
              <p className={styles.subtitle}>{WEBINAR.subtitulo}</p>
              <a href="#registro" className={styles.heroMobileCta}>Reservar mi lugar gratis <EventIcon kind="arrow" /></a>
            </div>
            <div className={styles.heroCaption}><span /> Control · Trazabilidad · Confianza</div>
          </div>
          <div className={styles.eventMeta}>
            <div className={styles.metaItem}><span className={styles.metaIcon}><EventIcon kind="calendar" /></span><div><span className={styles.metaLabel}>FECHA</span><p><time dateTime="2026-11-19">Jueves 19 de noviembre</time><small>2026</small></p></div></div>
            <div className={styles.metaItem}><span className={styles.metaIcon}><EventIcon kind="clock" /></span><div><span className={styles.metaLabel}>HORARIO</span><p>10:00 a. m.<small>America/Merida · 60 minutos</small></p></div></div>
            <div className={styles.metaItem}><span className={styles.metaIcon}><EventIcon kind="video" /></span><div><span className={styles.metaLabel}>MODALIDAD</span><p>En línea por Zoom<small>Acceso gratuito</small></p></div></div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.intro} aria-labelledby="about-title">
            <p className={styles.eyebrow}>DESCRIPCIÓN</p>
            <h2 id="about-title">Academia HTK 2026</h2>
            <p className={styles.seriesTagline}>Activos Confiables: Cómo eliminar pérdidas, riesgos y errores en la operación</p>
            <h3 className={styles.objectiveTitle}>Objetivo General</h3>
            <p className={styles.description}>La Academia HTK 2026 tiene como objetivo ayudar a las organizaciones a resolver los principales problemas relacionados con la gestión de activos, conectando las mejores prácticas operativas con estrategias de control, cumplimiento, disponibilidad y automatización.</p>
          </section>

          <aside id="registro" className={styles.registration} aria-labelledby="registration-title">
            {formState === 'sent' ? (
              <div role="status" className={styles.success}>
                <span className={styles.successIcon}><EventIcon kind="check" /></span>
                <p className={styles.eyebrow}>ACADEMIA HTK</p>
                <h2 id="registration-title">¡Registro confirmado!</h2>
                <p>Te enviamos el enlace de Zoom a <strong>{form.email}</strong>. Revisa también tu carpeta de spam.</p>
                <div className={styles.successDetails}><EventIcon kind="calendar" /><span>19 de noviembre · 10:00 a. m.<small>America/Merida</small></span></div>
                <a href="mailto:marketing@htk-id.com" className={styles.contactLink}>¿Necesitas ayuda? Escríbenos</a>
              </div>
            ) : (
              <>
                <div className={styles.formHeading}><span className={styles.freeBadge}>REGISTRO GRATUITO</span><span className={styles.edition}>04 / ACADEMIA HTK</span></div>
                <h2 id="registration-title">Reserva tu lugar</h2>
                <p className={styles.formDescription}>Completa tus datos y recibe el acceso por correo.</p>
                <form onSubmit={handleSubmit} aria-busy={formState === 'loading'} className={styles.form}>
                  <input type="text" name="website" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} value={honeypot} onChange={e => setHoneypot(e.target.value)} autoComplete="off" />
                  <div className={styles.field}>
                    <label htmlFor="webinar-nombre">Nombre completo <span aria-hidden="true">*</span></label>
                    <input id="webinar-nombre" name="nombre" type="text" required maxLength={200} autoComplete="name" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Tu nombre" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="webinar-email">Correo electrónico <span aria-hidden="true">*</span></label>
                    <input id="webinar-email" name="email" type="email" required maxLength={254} autoComplete="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="tu@empresa.com" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="webinar-telefono">Teléfono <span aria-hidden="true">*</span></label>
                    <input id="webinar-telefono" name="telefono" type="tel" required maxLength={50} autoComplete="tel" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} onBlur={() => setTelefonoTouched(true)} placeholder="+52 55 1234 5678" aria-invalid={telefonoInvalido} aria-describedby={telefonoInvalido ? 'webinar-phone-error' : undefined} />
                    {telefonoInvalido && <p id="webinar-phone-error" className={styles.fieldError}>Ingresa un número de teléfono válido</p>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="webinar-empresa">Empresa <span className={styles.optional}>(opcional)</span></label>
                    <input id="webinar-empresa" name="empresa" type="text" maxLength={200} autoComplete="organization" value={form.empresa} onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))} placeholder="Nombre de tu empresa" />
                  </div>
                  {formState === 'error' && <p role="alert" className={styles.formError}>{errorMessage}</p>}
                  <button type="submit" disabled={formState === 'loading'} className={styles.submit}>
                    {formState === 'loading' ? 'Registrando...' : <>{emailPending ? 'Reintentar envío del correo' : 'Reservar mi lugar'} <EventIcon kind="arrow" /></>}
                  </button>
                  <p className={styles.deliveryNote}><EventIcon kind="mail" />Recibirás el enlace de Zoom por correo.</p>
                  <p className={styles.privacy}>Consulta nuestro <Link href="/aviso-de-privacidad">aviso de privacidad</Link>.</p>
                </form>
              </>
            )}
          </aside>

          <div className={styles.details}>
            <section className={styles.topics} aria-labelledby="topics-title">
              <h3 id="topics-title">Programa de la Academia</h3>
              <p className={styles.programDescription}>La serie estará compuesta por 6 webinars, uno por mes, de Agosto a Diciembre.</p>
              <ol>
                <li><span className={styles.topicNumber}>01</span><div><h4>Cuando los activos no coinciden con los registros:</h4><p>Cómo recuperar la confiabilidad de la información</p></div></li>
                <li><span className={styles.topicNumber}>02</span><div><h4>Si no puedes demostrarlo, no puedes cumplir:</h4><p>Evidencia, trazabilidad y auditoría de activos</p></div></li>
                <li><span className={styles.topicNumber}>03</span><div><h4>No necesitas más activos:</h4><p>Necesitas tener disponibles los que ya tienes</p></div></li>
                <li className={styles.currentSession}><span className={styles.topicNumber}>04</span><div><span className={styles.currentSessionBadge}>ESTE WEBINAR</span><h4>{WEBINAR.titulo}</h4><p>{WEBINAR.subtitulo}</p></div></li>
                <li><span className={styles.topicNumber}>05</span><div><h4>De Excel a procesos confiables:</h4><p>Automatización operativa aplicada a activos</p></div></li>
                <li><span className={styles.topicNumber}>06</span><div><h4>Del control a la inteligencia operativa:</h4><p>El futuro de la gestión de activos</p></div></li>
              </ol>
            </section>
            <section className={styles.speaker} aria-labelledby="speaker-title">
              <div className={styles.speakerPhoto}>
                <Image src="/academia/webinar-4-ponente.jpg" alt="Manrique Porras, ponente del webinar" width={1600} height={900} className={styles.speakerImage} sizes="600px" />
              </div>
              <div><p className={styles.eyebrow}>CONOCE A TU PONENTE</p><h3 id="speaker-title">{WEBINAR.ponente}</h3><p className={styles.speakerRole}>{WEBINAR.ponenteRol}</p><span className={styles.speakerTag}>Academia HTK · Webinar 04</span></div>
            </section>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}><div><strong>ACADEMIA HTK</strong><p>Conocimiento que transforma resultados.</p></div><a href="mailto:marketing@htk-id.com"><EventIcon kind="mail" />marketing@htk-id.com</a><Link href="/aviso-de-privacidad">Aviso de privacidad</Link></div>
        <p className={styles.copyright}>© 2026 HTK Identificación Inteligente. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
