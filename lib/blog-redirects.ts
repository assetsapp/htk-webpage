/**
 * Redirects 301 del blog WordPress anterior → blog nuevo.
 *
 * El blog viejo vivía en este mismo dominio (htk-id.com) con URLs en la raíz.
 * Estos 301 preservan la autoridad SEO acumulada: cada URL viejo apunta a su
 * artículo nuevo, o —si el artículo se descartó en la curación— al pilar
 * temático más cercano para no dejar nada en 404.
 *
 * Se importa en next.config.ts.
 */
type Redirect = { source: string; destination: string; permanent: true };

const r = (source: string, destination: string): Redirect => ({
  source,
  destination,
  permanent: true,
});

export const blogRedirects: Redirect[] = [
  // ── Anexo 24 / IMMEX ──────────────────────────────────────────────
  r('/que-es-el-anexo-24-parte-1', '/blog/que-es-el-anexo-24-control-activos-fijos'),
  r('/que-es-el-anexo-24-parte-2', '/blog/que-es-el-anexo-24-control-activos-fijos'),
  r('/anexo-24-que-pasa-si-no-se-administra-correctamente', '/blog/anexo-24-mala-administracion-consecuencias'),
  r('/htk-y-el-programa-immex', '/blog/htk-programa-immex-control-activos'),
  r('/programa-immex-que-es', '/blog/programa-immex-que-es-como-funciona'),
  r('/como-influye-el-programa-immex-en-el-control-de-activos-fijos', '/blog/programa-immex-que-es-como-funciona'),
  r('/el-programa-immex-y-los-activos-fijos-maquinaria-y-equipos', '/blog/programa-immex-que-es-como-funciona'),
  r('/normativa-para-importacion-temporal-y-el-sistema-de-control-interno-de-activos-fijos', '/blog/que-es-el-anexo-24-control-activos-fijos'),
  r('/normativa-para-importacion-temporal-y-el-sistema-de-control-interno-de-activos-fijos-2', '/blog/que-es-el-anexo-24-control-activos-fijos'),
  r('/la-serie-iso-55000-estandarizacion-para-activos-fijos', '/blog/que-es-el-anexo-24-control-activos-fijos'),
  r('/normativa-en-relacion-a-la-administracion-de-activos-fijos', '/blog/que-es-el-anexo-24-control-activos-fijos'),
  r('/mas-vale-prevenir-que-lamentar-y-pagar-multas-del-sat', '/blog/anexo-24-mala-administracion-consecuencias'),

  // ── Tecnología RFID ───────────────────────────────────────────────
  r('/que-es-la-tecnologia-rfid', '/blog/que-es-tecnologia-rfid'),
  r('/los-usos-de-la-tecnologia-rfid-para-el-control-de-activos-fijos', '/blog/que-es-tecnologia-rfid'),
  r('/tecnologia-rfid', '/blog/que-es-tecnologia-rfid'),
  r('/3-usos-de-rfid-que-no-conocias-probablemente', '/blog/que-es-tecnologia-rfid'),
  r('/los-activos-fijos-y-los-beneficios-de-la-rfid', '/blog/que-es-tecnologia-rfid'),
  r('/uso-de-radiofrecuencia-para-un-inventario-exacto-segun-nuevas-investigaciones', '/blog/que-es-tecnologia-rfid'),
  r('/como-hacer-un-mejor-inventario-con-la-ayuda-de-la-radiofrecuencia', '/blog/que-es-tecnologia-rfid'),
  r('/el-inventario-de-activos-fijos-y-el-uso-de-identificacion-por-rfid-radiofrecuencia', '/blog/que-es-tecnologia-rfid'),
  r('/parques-industriales-se-vuelven-inteligentes-con-rfid', '/blog/que-es-tecnologia-rfid'),
  r('/etiquetas-y-placas-para-identificacion-de-activos-fijos-que-tecnologias-se-usan-actualmente', '/blog/que-es-tecnologia-rfid'),
  r('/caracteristicas-de-un-activo-para-ponerle-etiquetas-inteligentes', '/blog/que-es-tecnologia-rfid'),
  r('/los-beneficios-del-etiquetado-inteligente', '/blog/que-es-tecnologia-rfid'),
  r('/inventario-de-activos-en-minutos', '/blog/que-es-tecnologia-rfid'),
  r('/rfid-vs-codigo-de-barras', '/blog/rfid-qr-codigo-barras-control-activos'),

  // ── Beacons ───────────────────────────────────────────────────────
  r('/que-son-los-beacons', '/blog/beacons-control-activos'),
  r('/tipos-de-beacons', '/blog/beacons-control-activos'),
  r('/aplicaciones-de-los-beacons', '/blog/beacons-control-activos'),
  r('/beacons-para-el-control-de-activos-fijos', '/blog/beacons-control-activos'),
  r('/que-son-los-beacons-y-para-que-se-usan-en-el-control-de-activos', '/blog/beacons-control-activos'),

  // ── IoT y tendencias tecnológicas ─────────────────────────────────
  r('/iot-en-el-control-de-activos-fijos-de-la-industria-manufacturera', '/blog/iot-control-activos-fijos'),
  r('/iot-mantenimiento-y-monitoreo-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/el-rol-de-la-iot-en-el-mantenimiento-y-la-confiabilidad-de-los-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/principales-aplicaciones-del-iot-al-control-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/la-iot-y-su-rol-en-el-control-de-activos', '/blog/iot-control-activos-fijos'),
  r('/tendencias-tecnologicas-para-el-control-de-activos', '/blog/iot-control-activos-fijos'),
  r('/las-actuales-tendencias-para-la-gestion-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/intelligent-data-aplicada-a-la-gestion-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/la-aplicacion-de-algoritmos-en-los-inventarios-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/mejores-tecnologias-para-el-control-y-resguardo-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/el-mundo-cambio-y-el-control-de-activos-fijos', '/blog/iot-control-activos-fijos'),

  // ── Mantenimiento de activos ──────────────────────────────────────
  r('/plan-y-politicas-de-mantenimiento-de-activo-fijo', '/blog/iot-control-activos-fijos'),
  r('/cuales-son-los-tipos-de-mantenimiento-para-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/mantenimiento-y-gestion-de-activos-fijos-cuales-son-sus-diferencias-y-relaciones', '/blog/iot-control-activos-fijos'),
  r('/porque-es-importante-el-mantenimiento-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/beneficios-del-mantenimiento-predictivo', '/blog/iot-control-activos-fijos'),
  r('/continuidad-operativa-mantenimiento-preventivo-y-el-control-interno-de-activos-fijos', '/blog/iot-control-activos-fijos'),
  r('/modulos-debe-tener-software-de-mantenimiento-activos', '/blog/iot-control-activos-fijos'),
  r('/activo-fijo-como-diferenciar-los-trabajos-reparacion-mejoras', '/blog/iot-control-activos-fijos'),

  // ── Cómo hacer un inventario de activos fijos ─────────────────────
  r('/como-realizar-un-inventario-de-activos-fijos-plan-de-trabajo', '/blog/como-hacer-inventario-activos-fijos'),
  r('/procedimiento-para-levantamiento-de-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/proyecto-de-inventario-de-activos-fijos-objetivos-e-importancia', '/blog/como-hacer-inventario-activos-fijos'),
  r('/que-son-los-inventarios-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/las-mejores-practicas-para-hacer-un-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/lo-que-necesitas-saber-para-hacer-un-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/seis-ideas-practicas-para-hacer-un-inventario', '/blog/como-hacer-inventario-activos-fijos'),
  r('/pierde-el-miedo-al-hacer-inventarios', '/blog/como-hacer-inventario-activos-fijos'),
  r('/que-es-un-inventario-y-como-hacerlo', '/blog/como-hacer-inventario-activos-fijos'),
  r('/consejos-esenciales-para-priorizar-el-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/como-realizar-un-acta-de-entrega-de-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/normas-que-rigen-un-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/controlar-y-conocer-el-activo-fijo-a-traves-de-un-inventario', '/blog/como-hacer-inventario-activos-fijos'),
  r('/el-valor-de-realizar-inventarios-de-activos-fijos-en-tu-empresa', '/blog/como-hacer-inventario-activos-fijos'),
  r('/el-inventario-de-activos-fijos-por-que-es-tan-importante-para-tu-empresa', '/blog/como-hacer-inventario-activos-fijos'),
  r('/inventario-de-activo-fijo-una-herramienta-para-el-crecimiento-de-tu-empresa', '/blog/como-hacer-inventario-activos-fijos'),
  r('/ventajas-de-realizar-inventario-y-evaluacion-de-activo-fijo', '/blog/como-hacer-inventario-activos-fijos'),
  r('/la-importancia-de-contratar-una-empresa-experta-en-inventarios-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/inventario-de-activos-fijos-y-su-relacion-con-el-balance-de-tu-empresa', '/blog/como-hacer-inventario-activos-fijos'),
  r('/hacer-un-inventario-de-activos-fijos-es-fundamental-para-tu-empresa', '/blog/como-hacer-inventario-activos-fijos'),
  r('/controlar-el-patrimonio-en-las-grandes-companias-es-importante', '/blog/como-hacer-inventario-activos-fijos'),
  r('/los-riesgos-de-no-contar-con-un-buen-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/controlar-empresa-a-traves-de-un-inventario-de-activos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/es-momento-de-pensar-en-el-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/lo-que-implica-llevar-un-control-de-los-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/que-garantiza-el-eficaz-control-del-activo-fijo', '/blog/como-hacer-inventario-activos-fijos'),
  r('/algo-que-tu-y-tu-empresa-deben-entender-sobre-el-inventario-de-los-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/la-importancia-del-control-de-activos-fijos-en-las-grandes-empresas', '/blog/como-hacer-inventario-activos-fijos'),
  r('/control-de-activos-fijos-mucho-mas-que-una-base-de-datos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/el-inventario-de-activos-en-el-contexto-de-tu-empresa', '/blog/como-hacer-inventario-activos-fijos'),
  r('/termino-el-ano-lograste-hacer-tu-inventario-de-activos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/se-acaba-el-ano-listo-tu-inventario-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/estas-seguro-que-fisicamente-tienes-los-activos-que-reportas', '/blog/como-hacer-inventario-activos-fijos'),
  r('/cumplir-con-la-norma-financiera-en-el-inventario-de-activo-fijo', '/blog/como-hacer-inventario-activos-fijos'),
  r('/importancia-de-la-gestion-de-un-sistema-de-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/diagnostico-del-control-y-gestion-de-tus-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/importancia-del-control-de-activos-en-el-2021', '/blog/como-hacer-inventario-activos-fijos'),
  r('/formatos-para-control-resguardo-gestion-activos-fijos', '/blog/como-hacer-inventario-activos-fijos'),
  r('/es-importante-el-control-de-activos', '/blog/como-hacer-inventario-activos-fijos'),

  // ── Codificación ──────────────────────────────────────────────────
  r('/como-codificar-para-inventarios-de-activos-fijos', '/blog/como-codificar-activos-fijos'),

  // ── Excel ─────────────────────────────────────────────────────────
  r('/inventarios-en-excel-no-es-el-formato-para-llevar-el-control-de-los-activos', '/blog/excel-no-sirve-control-activos-fijos'),
  r('/estructura-de-un-excel-para-hacer-un-inventario-de-activos-fijos', '/blog/excel-no-sirve-control-activos-fijos'),

  // ── KPIs y gestión ────────────────────────────────────────────────
  r('/kpis-para-la-gestion-y-el-control-interno-de-activos-fijos', '/blog/kpis-control-activos-fijos'),
  r('/crear-politicas-gestion-activos-fijos-para-empresa', '/blog/kpis-control-activos-fijos'),
  r('/relacion-entre-el-valor-de-los-activos-fijos-y-el-patrimonio', '/blog/kpis-control-activos-fijos'),
  r('/relacion-entre-sistemas-de-gestion-de-activos', '/blog/kpis-control-activos-fijos'),
  r('/caracteristicas-de-una-buena-solucion-de-gestion-de-activos-fijos', '/blog/kpis-control-activos-fijos'),
  r('/como-implementar-un-sistema-de-control-automatizado-de-activos-fijos', '/blog/kpis-control-activos-fijos'),
  r('/importante-sistema-automatizado-de-control-de-activos-fijos', '/blog/kpis-control-activos-fijos'),

  // ── Auditoría ─────────────────────────────────────────────────────
  r('/auditoria-de-activos-fijos-que-son-y-como-afrontarlas', '/blog/auditoria-activos-fijos'),
  r('/control-interno-de-activos-fijos-niveles-de-certidumbre-en-la-conciliacion-contable', '/blog/auditoria-activos-fijos'),

  // ── Errores de gestión ────────────────────────────────────────────
  r('/errores-mas-frecuentes-en-la-gestion-de-activos-fijos', '/blog/errores-gestion-activos-fijos'),

  // ── Tipos de activos fijos ────────────────────────────────────────
  r('/tipos-de-activos-fijos', '/blog/tipos-de-activos-fijos'),
  r('/los-bienes-que-se-consideran-activo-fijo-en-un-inventario', '/blog/tipos-de-activos-fijos'),
  r('/activos-que-son-y-como-se-clasifican', '/blog/tipos-de-activos-fijos'),
  r('/que-son-los-activos-fijos-y-por-que-son-importantes', '/blog/tipos-de-activos-fijos'),
  r('/diferencias-entre-activo-fijo-y-activo-corriente', '/blog/tipos-de-activos-fijos'),
  r('/relaciones-diferencias-inventario-activos-corrientes-activos-fijos', '/blog/tipos-de-activos-fijos'),
  r('/los-activos-fijos-en-la-legislacion-mexicana', '/blog/tipos-de-activos-fijos'),

  // ── Depreciación, vida útil y contabilidad ────────────────────────
  r('/como-calcular-la-vida-util-de-los-activos-fijos', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/vida-util-de-los-activos-fijos-para-mexico-y-otros-paises', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/depreciacion-de-activos-fijos-por-que-hacerla', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/que-es-la-amortizacion-de-los-activos-fijos-de-una-empresa', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/porcentaje-de-depreciaciones-de-activos-fijos-de-acuerdo-a-su-tipo', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/como-se-registra-la-depreciacion-un-activo-fijo-cuando-hacerlo', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/cuales-son-los-activos-fijos-que-no-se-deprecian', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/tipos-y-topes-de-los-asientos-contables-de-la-depreciacion', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/la-vida-util-de-los-activos-fijos-post-pandemia-de-la-covid-19', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/la-covid-19-y-sus-efectos-sobre-la-depreciacion-de-activos-fijos', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/activos-fijos-contabilidad-y-nif', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/las-niif-y-las-nic-en-los-asientos-contables-de-activo-fijo', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/contabilizacion-del-activo-fijo-como-reflejar-sus-movimientos', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/asiento-contable-de-evaluacion-de-activos-fijos', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/valuacion-de-activos-fijos', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/valuacion-de-activos-fijos-por-que-es-necesaria', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/registro-contable-de-un-activo-fijo-porcentajes-y-tipos-de-amortizacion', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/asiento-contable-de-un-activo-fijo-como-hacer-una-amortizacion', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/politicas-de-capitalizacion-de-activos-fijos', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/por-que-capitalizar-el-valor-de-un-activo-fijo', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/avaluos-de-activos-fijos-en-empresas-industriales-como-se-clasifican', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/buenas-practicas-contables-ante-el-impacto-de-la-covid-19-en-las-empresas', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/inventarios-de-activos-fijos-post-pandemia-parte-ii', '/blog/depreciacion-vida-util-activos-fijos'),
  r('/inventario-de-activos-fijos-post-pandemia-parte-i', '/blog/depreciacion-vida-util-activos-fijos'),

  // ── Altas, bajas y movimientos ────────────────────────────────────
  r('/alta-transferencia-y-baja-de-activos-fijos-cual-es-el-procedimiento-para-registrarlas', '/blog/altas-bajas-movimientos-activos-fijos'),
  r('/tipos-de-movimientos-de-un-activo-fijo', '/blog/altas-bajas-movimientos-activos-fijos'),
  r('/baja-de-activo-fijo-y-otros-movimientos-que-normativas-aplican', '/blog/altas-bajas-movimientos-activos-fijos'),
  r('/diagrama-flujo-procedimientos-activos-fijos-empresa', '/blog/altas-bajas-movimientos-activos-fijos'),

  // ── Industria automotriz ──────────────────────────────────────────
  r('/la-importancia-del-control-de-activos-fijos-en-la-industria-automotriz', '/blog/control-activos-industria-automotriz'),
  r('/recomendaciones-para-el-control-de-activos-fijos-en-el-sector-automotriz', '/blog/control-activos-industria-automotriz'),
  r('/riesgos-de-descuidar-el-control-de-activos-fijos-en-la-industria-automotriz', '/blog/control-activos-industria-automotriz'),

  // ── Hospitales / etiquetado inteligente ───────────────────────────
  r('/control-de-neonatos-etiquetado-inteligente-en-hospitales', '/blog/etiquetado-inteligente-hospitales-neonatos'),

  // ── Sin pilar claro → listado del blog ────────────────────────────
  r('/reportes-plataforma-htk', '/blog'),
  r('/inventarios-previos-tecnologia-htk', '/blog'),
  r('/control-logistico-seguridad', '/blog'),
  r('/las-empresas-y-la-nueva-normalidad', '/blog'),
  r('/htk-reconocido-en-el-rfid-journal-live-2016-orlando-florida', '/blog'),
  r('/sector-hotelero-cuales-son-las-ventajas-de-un-sistema-de-mantenimiento-de-activos', '/blog'),

  // ── Páginas de archivo paginadas del WordPress viejo ──────────────
  { source: '/blog/page/:n', destination: '/blog', permanent: true },
];
