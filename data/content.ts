export const icps = [
  {
    slug: 'activos-no-coinciden-registros',
    title: 'Conciliación',
    headline: 'Tus activos no coinciden con tus registros',
    description: 'Las diferencias entre el inventario físico y los sistemas contables generan pérdidas, errores fiscales y decisiones incorrectas.',
    icon: 'scale',
  },
  {
    slug: 'cumplimiento-control-activos',
    title: 'Cumplimiento',
    headline: 'No puedes demostrar control ante auditorías',
    description: 'Sin trazabilidad documentada, cada auditoría representa un riesgo de sanción y exposición regulatoria.',
    icon: 'shield',
  },
  {
    slug: 'control-activos-ubicacion-responsable',
    title: 'Control',
    headline: 'No sabes quién tiene tus activos ni dónde están',
    description: 'La falta de asignación y seguimiento por responsable convierte los activos en recursos invisibles.',
    icon: 'map-pin',
  },
  {
    slug: 'disponibilidad-activos-operacion',
    title: 'Disponibilidad',
    headline: 'Tus activos no están disponibles cuando los necesitas',
    description: 'Equipos mal ubicados, en mantenimiento no programado o perdidos detienen la operación en momentos críticos.',
    icon: 'clock',
  },
  {
    slug: 'automatizacion-procesos-operativos',
    title: 'Automatización',
    headline: 'Tus procesos siguen siendo manuales y fragmentados',
    description: 'Capturas manuales, hojas de cálculo desconectadas y flujos no trazados multiplican el error humano.',
    icon: 'cpu',
  },
];

export const industries = [
  {
    slug: 'salud',
    title: 'Salud',
    description: 'Equipos médicos trazados, disponibles y en cumplimiento normativo.',
    image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'manufactura-immex',
    title: 'Manufactura / IMMEX',
    description: 'Control de activos fijos y cumplimiento del Anexo 24 sin papel.',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'logistica-transporte',
    title: 'Logística y Transporte',
    description: 'Trazabilidad de contenedores, flotas y activos retornables en tiempo real.',
    image: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'retail-corporativos',
    title: 'Retail y Corporativos',
    description: 'Inventarios precisos y activos asignados en múltiples sucursales.',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'gobierno',
    title: 'Gobierno',
    description: 'Registro y control de bienes patrimoniales con trazabilidad para auditoría.',
    image: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'servicios-eventos',
    title: 'Servicios y Eventos',
    description: 'Control de activos en movimiento: escenarios, equipos y mobiliario.',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const solutions = [
  {
    slug: 'identificacion-inteligente',
    title: 'Identificación Inteligente',
    tagline: 'Sabes exactamente qué activo es cada uno y cómo distinguirlo.',
    description: 'Tecnologías RFID, OCR y códigos para etiquetar y reconocer cada activo de forma inequívoca.',
  },
  {
    slug: 'control-trazabilidad',
    title: 'Control y Trazabilidad',
    tagline: 'Sigues cada activo a lo largo de su ciclo de vida.',
    description: 'Registro de movimientos, asignaciones, ubicaciones y estados desde el alta hasta la baja del activo.',
  },
  {
    slug: 'integracion-informacion',
    title: 'Integración de Información',
    tagline: 'Todas tus fuentes de datos hablando entre sí sin conciliación manual.',
    description: 'Middleware y APIs que conectan Tagventory con ERP, SAP, sistemas contables y plataformas legacy.',
  },
  {
    slug: 'automatizacion-procesos',
    title: 'Automatización de Procesos',
    tagline: 'Tareas manuales y fragmentadas convertidas en flujos controlados.',
    description: 'Flujos de trabajo automatizados para entrada, salida, asignación, auditoría y conciliación de activos.',
  },
  {
    slug: 'visibilidad-operativa',
    title: 'Visibilidad Operativa',
    tagline: 'Un solo lugar para ver el estado real de tu operación.',
    description: 'Dashboard Tagventory con métricas en tiempo real, alertas y reportes para toma de decisiones.',
  },
];

export const caseApplications = [
  {
    slug: 'conciliacion-fisico-contable',
    title: 'Conciliación Físico-Contable',
    icpSlug: 'activos-no-coinciden-registros',
    industrySlug: 'manufactura-immex',
    headline: 'Elimina las discrepancias entre inventario físico y registros contables.',
    description: 'Proceso estructurado de inventario masivo con RFID y conciliación automática contra ERP para cerrar la brecha entre lo que tienes y lo que registras.',
  },
  {
    slug: 'control-contenedores-retornables',
    title: 'Control de Contenedores Retornables',
    icpSlug: 'control-activos-ubicacion-responsable',
    industrySlug: 'logistica-transporte',
    headline: 'Trazabilidad completa de cada contenedor desde salida hasta retorno.',
    description: 'Control de pallets, racks, contenedores y activos retornables con geolocalización y alertas de tiempo fuera.',
  },
  {
    slug: 'equipos-comodato',
    title: 'Equipos en Comodato',
    icpSlug: 'control-activos-ubicacion-responsable',
    industrySlug: 'salud',
    headline: 'Sabe exactamente dónde está cada equipo prestado y su estado.',
    description: 'Gestión de activos en comodato con asignación por responsable, fechas de vencimiento y trazabilidad de devoluciones.',
  },
  {
    slug: 'inventario-masivo-rfid',
    title: 'Inventario Masivo con RFID',
    icpSlug: 'activos-no-coinciden-registros',
    industrySlug: 'retail-corporativos',
    headline: 'Inventaria miles de activos en horas, no en días.',
    description: 'Captura de activos a alta velocidad con lectores RFID portátiles y fijos, sincronización automática con plataforma central.',
  },
  {
    slug: 'control-activos-hospitales',
    title: 'Control de Activos en Hospitales',
    icpSlug: 'disponibilidad-activos-operacion',
    industrySlug: 'salud',
    headline: 'El equipo médico correcto, disponible cuando se necesita.',
    description: 'Localización en tiempo real de equipos médicos críticos con alertas de disponibilidad y mantenimiento preventivo integrado.',
  },
  {
    slug: 'automatizacion-logistica',
    title: 'Automatización Logística',
    icpSlug: 'automatizacion-procesos-operativos',
    industrySlug: 'logistica-transporte',
    headline: 'Entrada y salida de activos sin captura manual.',
    description: 'Portales automáticos con RFID y lectores de código para registro instantáneo de movimientos sin intervención humana.',
  },
  {
    slug: 'validacion-vehiculos',
    title: 'Validación de Vehículos',
    icpSlug: 'cumplimiento-control-activos',
    industrySlug: 'logistica-transporte',
    headline: 'Acceso controlado y documentado de cada unidad.',
    description: 'Validación automática de vehículos en accesos con lectura RFID, OCR de placas y registro de entrada/salida para auditoría.',
  },
  {
    slug: 'control-activos-eventos',
    title: 'Control de Activos en Eventos',
    icpSlug: 'control-activos-ubicacion-responsable',
    industrySlug: 'servicios-eventos',
    headline: 'Cada artículo en su lugar antes, durante y después del evento.',
    description: 'Inventario y trazabilidad de mobiliario, equipos técnicos y materiales de producción en múltiples venues.',
  },
];

export const caseSuccesses = [
  {
    slug: 'cinepolis',
    client: 'Cinépolis',
    sector: 'Retail / Entretenimiento',
    result: '+25,000 activos conciliados sin discrepancias',
    metric: '+25K',
    metricLabel: 'activos conciliados',
    icpSlug: 'activos-no-coinciden-registros',
    industrySlug: 'retail-corporativos',
  },
  {
    slug: 'palacio-de-hierro',
    client: 'Palacio de Hierro',
    sector: 'Retail Premium',
    result: 'Trazabilidad total en inventario de activos fijos',
    metric: '100%',
    metricLabel: 'trazabilidad de activos',
    icpSlug: 'cumplimiento-control-activos',
    industrySlug: 'retail-corporativos',
  },
  {
    slug: 'hospital-ixtapaluca',
    client: 'Hospital Ixtapaluca',
    sector: 'Salud Pública',
    result: 'Disponibilidad operativa en tiempo real',
    metric: 'Real-time',
    metricLabel: 'visibilidad de equipos',
    icpSlug: 'disponibilidad-activos-operacion',
    industrySlug: 'salud',
  },
  {
    slug: 'dhl',
    client: 'DHL',
    sector: 'Logística',
    result: 'Reducción del 30% en pérdidas de activos',
    metric: '-30%',
    metricLabel: 'pérdidas de activos',
    icpSlug: 'control-activos-ubicacion-responsable',
    industrySlug: 'logistica-transporte',
  },
  {
    slug: 'metlife',
    client: 'MetLife',
    sector: 'Seguros / Finanzas',
    result: 'Cumplimiento total en auditoría sin sanciones',
    metric: '0',
    metricLabel: 'hallazgos en auditoría',
    icpSlug: 'cumplimiento-control-activos',
    industrySlug: 'retail-corporativos',
  },
];

export const clients = [
  'Cinépolis', 'Palacio de Hierro', 'DHL', 'MetLife',
  'Hospital Ixtapaluca', 'ZEISS', 'Marelli', 'OCESA',
  'TV Azteca', 'Sports World', 'Bureau de Crédito', 'Carpas San Marino',
];

export const navItems = [
  {
    label: 'Problemas',
    href: '/problemas/activos-no-coinciden-registros',
    dropdown: icps.map(i => ({ label: i.title, href: `/problemas/${i.slug}`, description: i.headline })),
  },
  {
    label: 'Industrias',
    href: '/industrias/salud',
    dropdown: industries.map(i => ({ label: i.title, href: `/industrias/${i.slug}`, description: i.description })),
  },
  {
    label: 'Soluciones',
    href: '/soluciones/identificacion-inteligente',
    dropdown: solutions.map(s => ({ label: s.title, href: `/soluciones/${s.slug}`, description: s.tagline })),
  },
  {
    label: 'Casos',
    href: '#',
    dropdown: [
      { label: 'Casos de Aplicación', href: '/casos-aplicacion/conciliacion-fisico-contable', description: 'Ejemplos de operación real', group: 'Aplicación' },
      ...caseApplications.slice(0, 4).map(c => ({ label: c.title, href: `/casos-aplicacion/${c.slug}`, description: '', group: 'Aplicación' })),
      { label: 'Casos de Éxito', href: '/casos-exito/cinepolis', description: 'Resultados documentados', group: 'Éxito' },
      ...caseSuccesses.map(c => ({ label: c.client, href: `/casos-exito/${c.slug}`, description: c.result, group: 'Éxito' })),
    ],
  },
  { label: 'Recursos', href: '/recursos/calculadora-perdidas-activos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
];
