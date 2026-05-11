import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const ZOHO_TOKEN_URL = `https://accounts.zoho.${process.env.ZOHO_REGION}/oauth/v2/token`;
const ZOHO_CONTACTS_URL = `https://www.zohoapis.${process.env.ZOHO_REGION}/crm/v2/Contacts`;

async function getAccessToken(): Promise<string> {
  const res = await fetch(ZOHO_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('No se pudo obtener el access token');
  return data.access_token;
}

const brand = '#F79A3F';
const dark = '#1A1814';
const gray = '#6B6860';
const lightGray = '#F5F4F0';
const border = '#E7E5DE';

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: '#FFFFFF', padding: 48 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  brandBadge: { backgroundColor: brand, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  brandText: { color: '#FFFFFF', fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  dateText: { fontSize: 8, color: gray },
  heroBox: { backgroundColor: dark, padding: 24, borderRadius: 8, marginBottom: 24 },
  heroTitle: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#FFFFFF', marginBottom: 6 },
  heroSub: { fontSize: 10, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 },
  scoreRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  scoreCard: { flex: 1, padding: 16, borderRadius: 8, border: `1px solid ${border}` },
  scoreLabel: { fontSize: 8, color: gray, marginBottom: 6, letterSpacing: 0.5 },
  scoreValue: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: dark },
  levelBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  levelDot: { width: 8, height: 8, borderRadius: 4 },
  levelText: { fontSize: 10, fontFamily: 'Helvetica-Bold' },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: dark, marginBottom: 12 },
  questionCard: { marginBottom: 12, padding: 14, borderRadius: 6, border: `1px solid ${border}` },
  qCategory: { fontSize: 8, color: brand, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5, marginBottom: 5 },
  qText: { fontSize: 10, color: dark, lineHeight: 1.5, marginBottom: 10 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  option: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, border: `1px solid ${border}` },
  optionSelected: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, backgroundColor: brand },
  optionText: { fontSize: 8, color: gray },
  optionTextSelected: { fontSize: 8, color: '#FFFFFF', fontFamily: 'Helvetica-Bold' },
  recoBox: { backgroundColor: lightGray, padding: 20, borderRadius: 8, marginTop: 20 },
  recoTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: dark, marginBottom: 12 },
  recoItem: { flexDirection: 'row', gap: 8, marginBottom: 7 },
  recoDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: brand, marginTop: 4, flexShrink: 0 },
  recoText: { fontSize: 9, color: gray, lineHeight: 1.5, flex: 1 },
  footer: { position: 'absolute', bottom: 32, left: 48, right: 48, flexDirection: 'row', justifyContent: 'space-between', borderTop: `1px solid ${border}`, paddingTop: 10 },
  footerText: { fontSize: 8, color: gray },
});

const questions = [
  { id: 1, category: 'Conciliación', question: '¿Tus activos coinciden con tus registros financieros?', options: ['Siempre', 'En la mayoría de los casos', 'A veces', 'Frecuentemente no coinciden'] },
  { id: 2, category: 'Ubicación', question: '¿Sabes exactamente dónde están tus activos en todo momento?', options: ['Sí, siempre', 'Generalmente', 'A veces', 'No'] },
  { id: 3, category: 'Responsabilidad', question: '¿Cada activo tiene un responsable claramente asignado?', options: ['Sí, todos', 'La mayoría', 'Algunos', 'Ninguno'] },
  { id: 4, category: 'Disponibilidad', question: '¿Los activos están disponibles cuando los necesitas?', options: ['Siempre', 'Generalmente', 'A veces', 'Frecuentemente no'] },
  { id: 5, category: 'Trazabilidad', question: '¿Puedes reconstruir el historial de un activo?', options: ['Sí, completamente', 'Parcialmente', 'Con dificultad', 'No'] },
  { id: 6, category: 'Cumplimiento', question: '¿Tus activos cumplen con los requerimientos de auditoría?', options: ['Siempre', 'Casi siempre', 'A veces', 'No'] },
  { id: 7, category: 'Automatización', question: '¿Qué tan automatizados están tus procesos de control?', options: ['Completamente', 'Parcialmente', 'Poco', 'Nada, todo manual'] },
  { id: 8, category: 'Eficiencia', question: '¿Cuánto tiempo pierde tu equipo buscando o verificando activos?', options: ['Nada', 'Poco', 'Moderado', 'Mucho'] },
];

const recommendations: Record<string, string[]> = {
  alto: ['Optimiza los procesos ya estructurados', 'Explora automatización avanzada', 'Integra tu plataforma con sistemas ERP', 'Evalúa indicadores de rendimiento'],
  medio: ['Prioriza identificar y etiquetar todos los activos', 'Implementa visibilidad centralizada', 'Define responsables formales por activo', 'Establece conciliaciones periódicas'],
  bajo: ['Comienza con un inventario físico completo', 'Establece identificación única por activo', 'Define un responsable por activo inmediatamente', 'Solicita un diagnóstico HTK para un plan de acción'],
};

function AutodiagnosticoPDF({
  nombre, empresa, totalScore, level, answers,
}: {
  nombre: string; empresa: string; totalScore: number;
  level: 'alto' | 'medio' | 'bajo'; answers: number[];
}) {
  const levelLabel = level === 'alto' ? 'Alto control' : level === 'medio' ? 'Control medio' : 'Bajo control';
  const levelColor = level === 'alto' ? '#22C55E' : level === 'medio' ? '#F59E0B' : '#EF4444';
  const maxScore = questions.length * 3;
  const pct = Math.round(((maxScore - totalScore) / maxScore) * 100);
  const date = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerTop}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandText}>HTK IDENTIFICACIÓN INTELIGENTE</Text>
          </View>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        <View style={styles.heroBox}>
          <Text style={styles.heroTitle}>Autodiagnóstico de Control de Activos</Text>
          <Text style={styles.heroSub}>Resultado para {nombre} · {empresa}</Text>
        </View>

        <View style={styles.scoreRow}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>NIVEL DE CONTROL</Text>
            <View style={styles.levelBadge}>
              <View style={[styles.levelDot, { backgroundColor: levelColor }]} />
              <Text style={[styles.levelText, { color: levelColor }]}>{levelLabel}</Text>
            </View>
            <Text style={{ fontSize: 9, color: gray, marginTop: 8 }}>Puntuación: {totalScore}/{maxScore}</Text>
          </View>
          <View style={[styles.scoreCard, { flex: 2 }]}>
            <Text style={styles.scoreLabel}>DIAGNÓSTICO</Text>
            <Text style={{ fontSize: 9, color: gray, lineHeight: 1.5, marginTop: 4 }}>
              {level === 'alto' && 'Tu operación está bien estructurada. Existen oportunidades de optimización y automatización para alcanzar máxima eficiencia.'}
              {level === 'medio' && 'Existen inconsistencias que pueden generar pérdidas operativas y económicas. Hay áreas clave de mejora identificables.'}
              {level === 'bajo' && 'Alta probabilidad de pérdidas, ineficiencia y riesgo operativo. Se recomienda actuar de forma estructurada e inmediata.'}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tus respuestas</Text>
        {questions.map((q, i) => {
          const answerIdx = answers[i] ?? 0;
          return (
            <View key={q.id} style={styles.questionCard}>
              <Text style={styles.qCategory}>{q.category.toUpperCase()}</Text>
              <Text style={styles.qText}>{q.question}</Text>
              <View style={styles.optionsRow}>
                {q.options.map((opt, oi) => (
                  <View key={oi} style={oi === answerIdx ? styles.optionSelected : styles.option}>
                    <Text style={oi === answerIdx ? styles.optionTextSelected : styles.optionText}>{opt}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        <View style={styles.recoBox}>
          <Text style={styles.recoTitle}>Recomendaciones para tu nivel</Text>
          {recommendations[level].map((r, i) => (
            <View key={i} style={styles.recoItem}>
              <View style={styles.recoDot} />
              <Text style={styles.recoText}>{r}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>htk-id.com · ventas@htk-id.com</Text>
          <Text style={styles.footerText}>Autodiagnóstico de Control de Activos · {date}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function POST(req: NextRequest) {
  try {
    const { nombre, empresa, email, answers, totalScore, level } = await req.json();
    if (!nombre || !empresa || !email) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    // Guardar en Zoho
    try {
      const accessToken = await getAccessToken();
      const [firstName, ...rest] = nombre.trim().split(' ');
      await fetch(ZOHO_CONTACTS_URL, {
        method: 'POST',
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            First_Name: firstName,
            Last_Name: rest.join(' ') || '-',
            Email: email,
            Description: `Fuente: Autodiagnóstico de control de activos\nEmpresa: ${empresa}\n\nPuntuación: ${totalScore}/24 — Nivel: ${level}`,
            pagina_web: true,
          }],
        }),
      });
    } catch (e) {
      console.error('Zoho error (no crítico):', e);
    }

    // Generar PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(React.createElement(AutodiagnosticoPDF, { nombre, empresa, totalScore, level, answers }) as any);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="HTK-Autodiagnostico-Control-Activos.pdf"',
      },
    });
  } catch (err) {
    console.error('Error en /api/pdf/autodiagnostico:', err);
    return NextResponse.json({ error: 'Error generando el PDF' }, { status: 500 });
  }
}
