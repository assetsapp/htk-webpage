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
  // Header
  header: { marginBottom: 32 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  brandBadge: { backgroundColor: brand, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  brandText: { color: '#FFFFFF', fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  dateText: { fontSize: 8, color: gray },
  heroBox: { backgroundColor: dark, padding: 24, borderRadius: 8 },
  heroTitle: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#FFFFFF', marginBottom: 6 },
  heroSub: { fontSize: 10, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 },
  // Score
  scoreRow: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: 28 },
  scoreCard: { flex: 1, padding: 16, borderRadius: 8, border: `1px solid ${border}` },
  scoreLabel: { fontSize: 8, color: gray, marginBottom: 6, letterSpacing: 0.5 },
  scoreValue: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: dark },
  scoreUnit: { fontSize: 10, color: gray },
  levelBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  levelDot: { width: 8, height: 8, borderRadius: 4 },
  levelText: { fontSize: 10, fontFamily: 'Helvetica-Bold' },
  // Blocks
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: dark, marginBottom: 12 },
  block: { marginBottom: 16, padding: 14, borderRadius: 6, border: `1px solid ${border}` },
  blockHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  blockLabel: { fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 },
  blockScore: { fontSize: 9, color: gray },
  progressBar: { height: 4, backgroundColor: lightGray, borderRadius: 2, marginBottom: 10 },
  progressFill: { height: 4, borderRadius: 2 },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 5 },
  itemCheck: { width: 12, height: 12, borderRadius: 2, marginTop: 1, flexShrink: 0, alignItems: 'center', justifyContent: 'center' },
  checkMark: { fontSize: 8, color: '#FFFFFF', fontFamily: 'Helvetica-Bold' },
  itemText: { fontSize: 9, color: gray, lineHeight: 1.5, flex: 1 },
  itemTextDone: { fontSize: 9, color: dark, lineHeight: 1.5, flex: 1 },
  // Recommendations
  recoBox: { backgroundColor: lightGray, padding: 20, borderRadius: 8, marginTop: 28 },
  recoTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: dark, marginBottom: 12 },
  recoItem: { flexDirection: 'row', gap: 8, marginBottom: 7 },
  recoDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: brand, marginTop: 4, flexShrink: 0 },
  recoText: { fontSize: 9, color: gray, lineHeight: 1.5, flex: 1 },
  // Footer
  footer: { position: 'absolute', bottom: 32, left: 48, right: 48, flexDirection: 'row', justifyContent: 'space-between', borderTop: `1px solid ${border}`, paddingTop: 10 },
  footerText: { fontSize: 8, color: gray },
});

const blockColors: Record<string, string> = {
  conciliacion: '#EF4444',
  control: '#F97316',
  responsabilidad: '#F59E0B',
  disponibilidad: '#22C55E',
  trazabilidad: '#3B82F6',
  automatizacion: '#A855F7',
};

const blockLabels: Record<string, string> = {
  conciliacion: 'Conciliación',
  control: 'Control y visibilidad',
  responsabilidad: 'Responsabilidad',
  disponibilidad: 'Disponibilidad',
  trazabilidad: 'Trazabilidad',
  automatizacion: 'Automatización',
};

const blockItems: Record<string, string[]> = {
  conciliacion: ['Inventario actualizado de todos los activos', 'Activos coinciden con registros financieros', 'Diferencias se investigan y resuelven', 'Proceso formal de conciliación existe', 'Altas y bajas se validan correctamente'],
  control: ['Todos los activos identificados de forma única', 'Ubicación exacta de cada activo conocida', 'Visibilidad centralizada en una plataforma', 'Información fácilmente consultable', 'Se actualiza con movimientos y cambios'],
  responsabilidad: ['Cada activo tiene responsable asignado', 'Registro formal de asignación existe', 'Se valida en cambios de usuario/área', 'Entrega y recepción de activos controlada', 'Historial de responsables auditable'],
  disponibilidad: ['Activos disponibles cuando se requieren', 'No hay tiempo perdido buscando equipos', 'No se hacen compras por falta de visibilidad', 'Estado operativo de cada activo conocido', 'Activos redistribuibles eficientemente'],
  trazabilidad: ['Historial de movimientos por activo existe', 'Cambios de ubicación y responsable registrados', 'Anomalías e inconsistencias identificables', 'Trazabilidad completa del ciclo de vida', 'Auditorías con evidencia posibles'],
  automatizacion: ['Procesos no dependen de Excel o papel', 'Automatización en inventarios y validaciones', 'Información actualizada en tiempo real', 'No depende de captura manual constante', 'Integración entre sistemas operativos'],
};

const recommendations: Record<string, string[]> = {
  alto: ['Optimiza los procesos ya estructurados', 'Explora automatización avanzada en áreas pendientes', 'Considera integrar tu plataforma con sistemas ERP', 'Evalúa indicadores de rendimiento de activos'],
  medio: ['Prioriza identificar y etiquetar todos los activos', 'Implementa un sistema centralizado de visibilidad', 'Define responsables formales por activo', 'Establece procesos de conciliación periódica'],
  bajo: ['Comienza con un inventario físico completo', 'Establece identificación única para cada activo', 'Define un responsable por cada activo inmediatamente', 'Solicita un diagnóstico HTK para un plan de acción'],
};

function ChecklistPDF({
  nombre, empresa, score, total, pct, level, checkedKeys,
}: {
  nombre: string; empresa: string; score: number; total: number; pct: number;
  level: 'alto' | 'medio' | 'bajo';
  checkedKeys: string[];
}) {
  const levelLabel = level === 'alto' ? 'Alto control' : level === 'medio' ? 'Control medio' : 'Bajo control';
  const levelColor = level === 'alto' ? '#22C55E' : level === 'medio' ? '#F59E0B' : '#EF4444';
  const date = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandText}>HTK IDENTIFICACIÓN INTELIGENTE</Text>
            </View>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style={styles.heroBox}>
            <Text style={styles.heroTitle}>Checklist de Control de Activos</Text>
            <Text style={styles.heroSub}>Resultado para {nombre} · {empresa}</Text>
          </View>
        </View>

        {/* Score */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>PUNTUACIÓN TOTAL</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text style={styles.scoreValue}>{pct}</Text>
              <Text style={styles.scoreUnit}>%</Text>
            </View>
            <Text style={{ fontSize: 8, color: gray }}>{score} de {total} puntos</Text>
          </View>
          <View style={[styles.scoreCard, { flex: 2 }]}>
            <Text style={styles.scoreLabel}>NIVEL DE CONTROL</Text>
            <View style={styles.levelBadge}>
              <View style={[styles.levelDot, { backgroundColor: levelColor }]} />
              <Text style={[styles.levelText, { color: levelColor }]}>{levelLabel}</Text>
            </View>
            <Text style={{ fontSize: 9, color: gray, marginTop: 8, lineHeight: 1.5 }}>
              {level === 'alto' && 'Operación estructurada con oportunidades de optimización.'}
              {level === 'medio' && 'Existen inconsistencias que pueden generar pérdidas operativas.'}
              {level === 'bajo' && 'Alta probabilidad de pérdidas, ineficiencia y riesgo operativo.'}
            </Text>
          </View>
        </View>

        {/* Blocks */}
        <Text style={styles.sectionTitle}>Resultados por área</Text>
        {Object.entries(blockItems).map(([blockId, items]) => {
          const blockScore = items.filter((_, i) => checkedKeys.includes(`${blockId}-${i}`)).length;
          const blockPct = (blockScore / items.length) * 100;
          const color = blockColors[blockId];
          return (
            <View key={blockId} style={styles.block}>
              <View style={styles.blockHeader}>
                <Text style={[styles.blockLabel, { color }]}>{blockLabels[blockId].toUpperCase()}</Text>
                <Text style={styles.blockScore}>{blockScore}/{items.length} · {Math.round(blockPct)}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${blockPct}%`, backgroundColor: color }]} />
              </View>
              {items.map((item, i) => {
                const done = checkedKeys.includes(`${blockId}-${i}`);
                return (
                  <View key={i} style={styles.item}>
                    <View style={[styles.itemCheck, { backgroundColor: done ? brand : lightGray, border: done ? 'none' : `1px solid ${border}` }]}>
                      {done && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                    <Text style={done ? styles.itemTextDone : styles.itemText}>{item}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* Recommendations */}
        <View style={styles.recoBox}>
          <Text style={styles.recoTitle}>Recomendaciones para tu nivel</Text>
          {recommendations[level].map((r, i) => (
            <View key={i} style={styles.recoItem}>
              <View style={styles.recoDot} />
              <Text style={styles.recoText}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>htk-id.com · ventas@htk-id.com</Text>
          <Text style={styles.footerText}>Checklist de Control de Activos · {date}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function POST(req: NextRequest) {
  try {
    const { nombre, empresa, email, checkedKeys } = await req.json();
    if (!nombre || !empresa || !email) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const score = (checkedKeys as string[]).length;
    const total = 30;
    const pct = Math.round((score / total) * 100);
    const level: 'alto' | 'medio' | 'bajo' = pct >= 80 ? 'alto' : pct >= 50 ? 'medio' : 'bajo';

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
            Description: `Fuente: Checklist de control de activos\nEmpresa: ${empresa}\n\nResultado: ${pct}% (${score}/${total}) — Nivel: ${level}`,
            pagina_web: true,
          }],
        }),
      });
    } catch (e) {
      console.error('Zoho error (no crítico):', e);
    }

    // Generar PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(React.createElement(ChecklistPDF, { nombre, empresa, score, total, pct, level, checkedKeys }) as any);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="HTK-Checklist-Control-Activos.pdf"',
      },
    });
  } catch (err) {
    console.error('Error en /api/pdf/checklist:', err);
    return NextResponse.json({ error: 'Error generando el PDF' }, { status: 500 });
  }
}
