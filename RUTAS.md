# 🗺️ Manual de Rutas y Sitemap — HTK Website

> Actualizado: Mayo 2026
> Framework: Next.js 16 App Router
> Fuente de datos: `data/content.ts`
> Total de páginas: ~75

---

## Arquitectura General

El sitio usa **Next.js App Router** con rutas estáticas y dinámicas. Las páginas dinámicas (`[slug]`) se pre-generan en build time usando `generateStaticParams()` a partir de los arrays en `data/content.ts`.

**Punto de conversión único:** todas las páginas dirigen a `/sesion`. Las rutas `/contacto`, `/diagnostico` y `/demo-tagventory` existen como redirects automáticos a `/sesion` para preservar URLs externas.

---

## 1. Páginas Principales

| Ruta | Archivo | Tipo | Descripción |
|------|---------|------|-------------|
| `/` | `app/page.tsx` | Estática | Home |
| `/nosotros` | `app/nosotros/page.tsx` | Estática | Quiénes somos |
| `/sesion` | `app/sesion/page.tsx` | Estática | **Conversión principal** — agendar sesión |
| `/aviso-de-privacidad` | `app/aviso-de-privacidad/page.tsx` | Estática | Aviso legal |
| `/contacto` | `app/contacto/page.tsx` | Redirect | → `/sesion` |
| `/diagnostico` | `app/diagnostico/page.tsx` | Redirect | → `/sesion` |
| `/demo-tagventory` | `app/demo-tagventory/page.tsx` | Redirect | → `/sesion` |

---

## 2. Soluciones

**Fuente de datos:** `solutions[]` en `data/content.ts`
**Template:** `app/soluciones/[slug]/page.tsx`

| Ruta | Título |
|------|--------|
| `/soluciones/plataforma` | Plataforma HTK — *página estática independiente* |
| `/soluciones/identificacion-inteligente` | Identificación Inteligente |
| `/soluciones/control-trazabilidad` | Control y Trazabilidad |
| `/soluciones/integracion-informacion` | Integración de Información |
| `/soluciones/automatizacion-procesos` | Automatización de Procesos |
| `/soluciones/visibilidad-operativa` | Visibilidad Operativa |

> `/soluciones/plataforma` es estática (`app/soluciones/plataforma/page.tsx`) y toma prioridad sobre el dynamic route `[slug]`.

---

## 3. Industrias

**Fuente de datos:** `industries[]` en `data/content.ts`
**Template:** `app/industrias/[slug]/page.tsx`

| Ruta | Industria |
|------|-----------|
| `/industrias/salud` | Salud / Hospitales |
| `/industrias/manufactura-immex` | Manufactura / IMMEX |
| `/industrias/logistica-transporte` | Logística y Transporte |
| `/industrias/retail-corporativos` | Retail y Corporativos |
| `/industrias/gobierno` | Gobierno |
| `/industrias/servicios-eventos` | Servicios y Eventos |

---

## 4. Problemas / ICP

**Fuente de datos:** `icps[]` en `data/content.ts`
**Template:** `app/problemas/[slug]/page.tsx`

| Ruta | Problema |
|------|----------|
| `/problemas/conciliacion-activos` | ICP 1 · Conciliación |
| `/problemas/cumplimiento-activos` | ICP 2 · Cumplimiento |
| `/problemas/control-visibilidad-activos` | ICP 3 · Control y Visibilidad |
| `/problemas/disponibilidad-activos` | ICP 4 · Disponibilidad |
| `/problemas/automatizacion-operativa` | ICP 5 · Automatización |

---

## 5. Casos de Éxito

**Fuente de datos:** `caseSuccesses[]` en `data/content.ts`
**Template:** `app/casos-exito/[slug]/page.tsx`

| Ruta | Cliente |
|------|---------|
| `/casos-exito` | Hub con filtros — *página estática* |
| `/casos-exito/cinepolis` | Cinépolis |
| `/casos-exito/grupo-gia` | Grupo GIA |
| `/casos-exito/abc-queretaro` | ABC Querétaro |
| `/casos-exito/vidrio-formas` | Vidrio Formas |
| `/casos-exito/fresenius-kabi` | Fresenius Kabi |
| `/casos-exito/xisoem` | Xisoem |
| `/casos-exito/validacion-ia` | Validación con IA |
| `/casos-exito/monitoreo-neonatos` | Monitoreo Neonatos |

---

## 6. Casos de Aplicación (39 páginas)

**Fuente de datos:** `caseApplications[]` en `data/content.ts`
**Template:** `app/casos-aplicacion/[slug]/page.tsx`

> El template detecta con `'problemTitle' in ca` si la entrada tiene contenido enriquecido y renderiza la versión completa o básica.
> ⭐ = contenido enriquecido (hero, problema, causas, impacto, solución, resultados, CTA completos)

### Conciliación

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/conciliacion-fisico-contable` | Conciliación físico-contable de activos | ⭐ |
| `/casos-aplicacion/conciliacion-multisede` | Conciliación de activos multi-sede | ⭐ |
| `/casos-aplicacion/conciliacion-activos-gobierno` | Conciliación patrimonial de activos | — |
| `/casos-aplicacion/conciliaciones-automatizadas` | Conciliaciones automáticas entre sistemas | — |
| `/casos-aplicacion/validacion-inventarios-multisede` | Validación de inventarios multi-sede | — |
| `/casos-aplicacion/inventario-masivo-rfid` | Inventario Masivo con RFID | — |
| `/casos-aplicacion/depuracion-activo-fijo` | Depuración y reestructuración de activo fijo | — |

### Control y Ubicación

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/control-activos-ubicacion` | Control de activos por ubicación | ⭐ |
| `/casos-aplicacion/control-activos-moviles` | Control de activos móviles | ⭐ |
| `/casos-aplicacion/control-activos-responsable` | Control de activos por responsable | ⭐ |
| `/casos-aplicacion/control-activos-planta` | Control de activos en planta | ⭐ |
| `/casos-aplicacion/control-activos-transito` | Control de activos en tránsito | ⭐ |
| `/casos-aplicacion/control-activos-sucursal` | Control de activos por sucursal | — |
| `/casos-aplicacion/control-activos-hospitales` | Disponibilidad de equipos en operación crítica | — |
| `/casos-aplicacion/control-activos-hospital-areas` | Control de activos entre áreas hospitalarias | — |
| `/casos-aplicacion/control-activos-dependencia` | Control de activos por dependencia | — |
| `/casos-aplicacion/control-activos-eventos` | Control de activos en eventos | — |
| `/casos-aplicacion/control-activos-en-clientes` | Control de activos en sitio del cliente | — |
| `/casos-aplicacion/control-activos-facturacion` | Control de activos para facturación | — |
| `/casos-aplicacion/control-sets-equipos` | Control de sets de equipos | ⭐ |
| `/casos-aplicacion/control-retornables` | Control de activos retornables | ⭐ |
| `/casos-aplicacion/control-contenedores-retornables` | Contenedores y retornables | — |

### Localización y Visibilidad

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/localizacion-activos` | Localización de activos | ⭐ |
| `/casos-aplicacion/visibilidad-activos` | Visibilidad consolidada de activos | ⭐ |

### Trazabilidad

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/trazabilidad-activos` | Trazabilidad de activos | ⭐ |

### Disponibilidad y Utilización

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/disponibilidad-activos` | Disponibilidad de activos críticos | ⭐ |
| `/casos-aplicacion/utilizacion-activos` | Optimización de utilización de activos | ⭐ |

### Integración y Automatización

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/integracion-erp-operacion` | Integración ERP vs operación | ⭐ |
| `/casos-aplicacion/automatizacion-logistica` | Automatización de procesos multifuente | — |
| `/casos-aplicacion/eliminacion-captura-manual` | Eliminación de captura manual | — |
| `/casos-aplicacion/validacion-visual-ia-operaciones` | Validación automatizada con IA | ⭐ |
| `/casos-aplicacion/validacion-integracion-operaciones` | Validación e integración automatizada | ⭐ |
| `/casos-aplicacion/validacion-vehiculos` | Control de activos para Anexo 24 | — |
| `/casos-aplicacion/asignacion-activos-responsable` | Asignación de activos por responsable | — |
| `/casos-aplicacion/transferencia-activos` | Reubicación y transferencia de activos | — |

### Cumplimiento y Auditorías

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/preparacion-auditorias-activos` | Preparación para auditorías de activos | ⭐ |
| `/casos-aplicacion/cumplimiento-immex-activos` | Cumplimiento IMMEX y Anexo 24 | — |

### Especializado

| Ruta | Título | Rico |
|------|--------|:----:|
| `/casos-aplicacion/equipos-comodato` | Equipos en Comodato | — |
| `/casos-aplicacion/monitoreo-neonatos` | Protección y monitoreo neonatal 24/7 | ⭐ |

---

## 7. Recursos (Herramientas Interactivas)

**Tipo:** Client components con `useState` / `useSearchParams`

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/recursos/autodiagnostico-control-activos` | `app/recursos/autodiagnostico-control-activos/page.tsx` | 8 preguntas → 3 niveles de control, puntaje 0–24 |
| `/recursos/calculadora-roi-activos` | `app/recursos/calculadora-roi-activos/page.tsx` | 6 tipos de activos, pérdida estimada, ROI, gauge de optimización |
| `/recursos/checklist-control-activos` | `app/recursos/checklist-control-activos/page.tsx` | 30 items en 6 bloques, progress bar global |
| `/recursos/[slug]` | `app/recursos/[slug]/page.tsx` | Fallback dinámico para futuros recursos |

> **Flujo de conversión:**
> Autodiagnóstico → pasa `?nivel=alto|medio|bajo` → Calculadora ROI → `/sesion`

---

## Reglas de Enrutamiento

| Regla | Detalle |
|-------|---------|
| **Punto de conversión único** | Todos los CTAs del sitio apuntan a `/sesion`. Las rutas antiguas (`/diagnostico`, `/contacto`, `/demo-tagventory`) hacen `redirect('/sesion')` automáticamente. |
| **Prioridad estática sobre dinámica** | `/soluciones/plataforma` y `/casos-exito` (hub) son páginas estáticas que toman prioridad sobre sus `[slug]` respectivos. |
| **Detección de contenido rico** | Los templates `[slug]/page.tsx` usan `'problemTitle' in objeto` para renderizar versión completa vs básica sin romper tipos TypeScript. |
| **Parámetros entre páginas** | La calculadora acepta `?nivel=alto\|medio\|bajo` vía `useSearchParams()`, envuelto en `<Suspense>`. |

---

---

# Sitemap Visual

```
htk.com/
│
├── /  .................................................... Home
├── /nosotros  ............................................ Nosotros
├── /sesion  .............................................. ★ Conversión principal
├── /aviso-de-privacidad  ................................. Aviso de Privacidad
│
├── /contacto  ............................................ → redirect /sesion
├── /diagnostico  ......................................... → redirect /sesion
├── /demo-tagventory  ..................................... → redirect /sesion
│
├── /soluciones/
│   ├── plataforma  ....................................... Plataforma HTK  [estática]
│   ├── identificacion-inteligente  ....................... Identificación Inteligente
│   ├── control-trazabilidad  ............................. Control y Trazabilidad
│   ├── integracion-informacion  .......................... Integración de Información
│   ├── automatizacion-procesos  .......................... Automatización de Procesos
│   └── visibilidad-operativa  ............................ Visibilidad Operativa
│
├── /industrias/
│   ├── salud  ............................................ Salud / Hospitales
│   ├── manufactura-immex  ................................ Manufactura / IMMEX
│   ├── logistica-transporte  ............................. Logística y Transporte
│   ├── retail-corporativos  .............................. Retail y Corporativos
│   ├── gobierno  ......................................... Gobierno
│   └── servicios-eventos  ................................ Servicios y Eventos
│
├── /problemas/
│   ├── conciliacion-activos  ............................. ICP 1 · Conciliación
│   ├── cumplimiento-activos  ............................. ICP 2 · Cumplimiento
│   ├── control-visibilidad-activos  ...................... ICP 3 · Control y Visibilidad
│   ├── disponibilidad-activos  ........................... ICP 4 · Disponibilidad
│   └── automatizacion-operativa  ......................... ICP 5 · Automatización
│
├── /casos-exito/
│   ├── (hub)  ............................................ Hub con filtros  [estático]
│   ├── cinepolis  ........................................ Cinépolis
│   ├── grupo-gia  ........................................ Grupo GIA
│   ├── abc-queretaro  .................................... ABC Querétaro
│   ├── vidrio-formas  .................................... Vidrio Formas
│   ├── fresenius-kabi  ................................... Fresenius Kabi
│   ├── xisoem  ........................................... Xisoem
│   ├── validacion-ia  .................................... Validación con IA
│   └── monitoreo-neonatos  ............................... Monitoreo Neonatos
│
├── /casos-aplicacion/                                        39 páginas generadas
│   │
│   ├── ── CONCILIACIÓN ──────────────────────────────────
│   ├── conciliacion-fisico-contable  ..................... ⭐ Conciliación físico-contable
│   ├── conciliacion-multisede  ........................... ⭐ Multi-sede
│   ├── conciliacion-activos-gobierno  .................... Gobierno
│   ├── conciliaciones-automatizadas  ..................... Automáticas entre sistemas
│   ├── validacion-inventarios-multisede  ................. Validación multi-sede
│   ├── inventario-masivo-rfid  ........................... Inventario masivo RFID
│   └── depuracion-activo-fijo  ........................... Depuración activo fijo
│   │
│   ├── ── CONTROL Y UBICACIÓN ───────────────────────────
│   ├── control-activos-ubicacion  ........................ ⭐ Por ubicación
│   ├── control-activos-moviles  .......................... ⭐ Activos móviles
│   ├── control-activos-responsable  ...................... ⭐ Por responsable
│   ├── control-activos-planta  ........................... ⭐ En planta
│   ├── control-activos-transito  ......................... ⭐ En tránsito
│   ├── control-activos-sucursal  ......................... Por sucursal
│   ├── control-activos-hospitales  ....................... Hospitales
│   ├── control-activos-hospital-areas  ................... Áreas hospitalarias
│   ├── control-activos-dependencia  ...................... Dependencias gobierno
│   ├── control-activos-eventos  .......................... Eventos
│   ├── control-activos-en-clientes  ...................... En sitio del cliente
│   ├── control-activos-facturacion  ...................... Facturación
│   ├── control-sets-equipos  ............................. ⭐ Sets de equipos
│   ├── control-retornables  .............................. ⭐ Retornables
│   └── control-contenedores-retornables  ................. Contenedores
│   │
│   ├── ── LOCALIZACIÓN Y VISIBILIDAD ────────────────────
│   ├── localizacion-activos  ............................. ⭐ Localización
│   └── visibilidad-activos  .............................. ⭐ Consolidada
│   │
│   ├── ── TRAZABILIDAD ──────────────────────────────────
│   └── trazabilidad-activos  ............................. ⭐ General
│   │
│   ├── ── DISPONIBILIDAD Y UTILIZACIÓN ──────────────────
│   ├── disponibilidad-activos  ........................... ⭐ Activos críticos
│   └── utilizacion-activos  .............................. ⭐ Optimización
│   │
│   ├── ── INTEGRACIÓN Y AUTOMATIZACIÓN ──────────────────
│   ├── integracion-erp-operacion  ........................ ⭐ ERP vs operación
│   ├── automatizacion-logistica  ......................... Logística
│   ├── eliminacion-captura-manual  ....................... Captura manual
│   ├── validacion-visual-ia-operaciones  ................. ⭐ IA visual
│   ├── validacion-integracion-operaciones  ............... ⭐ Integración automatizada
│   ├── validacion-vehiculos  ............................. Vehículos / Anexo 24
│   ├── asignacion-activos-responsable  ................... Asignación
│   └── transferencia-activos  ............................ Transferencias
│   │
│   ├── ── CUMPLIMIENTO Y AUDITORÍAS ─────────────────────
│   ├── preparacion-auditorias-activos  ................... ⭐ Auditorías
│   └── cumplimiento-immex-activos  ....................... IMMEX / Anexo 24
│   │
│   └── ── ESPECIALIZADO ─────────────────────────────────
│       ├── equipos-comodato  ............................. Comodato
│       └── monitoreo-neonatos  ........................... ⭐ Neonatal 24/7
│
└── /recursos/
    ├── autodiagnostico-control-activos  .................. 🛠 Autodiagnóstico (8 preguntas)
    ├── calculadora-roi-activos  .......................... 🛠 Calculadora ROI
    ├── checklist-control-activos  ........................ 🛠 Checklist (30 items)
    └── [slug]  ........................................... Recursos dinámicos futuros
```

---

## Resumen de Totales

| Sección | Páginas |
|---------|---------|
| Páginas principales | 4 |
| Redirects (conservados para URLs externas) | 3 |
| Soluciones | 6 |
| Industrias | 6 |
| Problemas / ICP | 5 |
| Casos de Éxito (hub + clientes) | 9 |
| Casos de Aplicación | 39 |
| Recursos interactivos | 3 |
| **Total** | **~75** |

### Páginas con contenido enriquecido (⭐): 21

| Slug | Sección |
|------|---------|
| `conciliacion-fisico-contable` | Casos de Aplicación |
| `conciliacion-multisede` | Casos de Aplicación |
| `control-activos-ubicacion` | Casos de Aplicación |
| `control-activos-moviles` | Casos de Aplicación |
| `control-activos-responsable` | Casos de Aplicación |
| `control-activos-planta` | Casos de Aplicación |
| `control-activos-transito` | Casos de Aplicación |
| `control-sets-equipos` | Casos de Aplicación |
| `control-retornables` | Casos de Aplicación |
| `localizacion-activos` | Casos de Aplicación |
| `visibilidad-activos` | Casos de Aplicación |
| `trazabilidad-activos` | Casos de Aplicación |
| `disponibilidad-activos` | Casos de Aplicación |
| `utilizacion-activos` | Casos de Aplicación |
| `integracion-erp-operacion` | Casos de Aplicación |
| `validacion-visual-ia-operaciones` | Casos de Aplicación |
| `validacion-integracion-operaciones` | Casos de Aplicación |
| `preparacion-auditorias-activos` | Casos de Aplicación |
| `monitoreo-neonatos` | Casos de Aplicación |
| Todas las entradas de `caseSuccesses` | Casos de Éxito |
| Todas las entradas de `solutions` | Soluciones |

---

## Estructura de Archivos del Proyecto

```
app/
├── page.tsx                                          # /
├── layout.tsx                                        # Layout global (Navbar + Footer)
├── nosotros/page.tsx                                 # /nosotros
├── sesion/page.tsx                                   # /sesion  ★ conversión principal
├── aviso-de-privacidad/page.tsx                      # /aviso-de-privacidad
├── contacto/page.tsx                                 # redirect → /sesion
├── diagnostico/page.tsx                              # redirect → /sesion
├── demo-tagventory/page.tsx                          # redirect → /sesion
├── soluciones/
│   ├── plataforma/page.tsx                           # /soluciones/plataforma  [estática]
│   └── [slug]/page.tsx                               # /soluciones/:slug
├── industrias/
│   └── [slug]/page.tsx                               # /industrias/:slug
├── problemas/
│   └── [slug]/page.tsx                               # /problemas/:slug
├── casos-exito/
│   ├── page.tsx                                      # /casos-exito  [hub]
│   └── [slug]/page.tsx                               # /casos-exito/:slug
├── casos-aplicacion/
│   └── [slug]/page.tsx                               # /casos-aplicacion/:slug
└── recursos/
    ├── autodiagnostico-control-activos/page.tsx      # /recursos/autodiagnostico-...
    ├── calculadora-roi-activos/page.tsx              # /recursos/calculadora-roi-...
    ├── checklist-control-activos/page.tsx            # /recursos/checklist-...
    └── [slug]/page.tsx                               # /recursos/:slug  [fallback]

data/
└── content.ts                                        # Fuente única de verdad (arrays)

components/
├── Nav.tsx                                           # Navbar global
└── Footer.tsx                                        # Footer global
```

---

## Historial de Cambios

### Mayo 2026 — Limpieza de redundancias
- **Conversión unificada:** `/contacto`, `/diagnostico` y `/demo-tagventory` convertidos a redirects hacia `/sesion`. Todos los CTAs del sitio actualizados.
- **Navbar:** "Contacto" → "Agendar sesión" (`/sesion`)
- **16 casos de aplicación eliminados** por redundancia con páginas enriquecidas equivalentes:

| Eliminada | Absorbida por |
|-----------|---------------|
| `trazabilidad-activos-gobierno` | `trazabilidad-activos` |
| `trazabilidad-activos-servicios` | `trazabilidad-activos` |
| `trazabilidad-activos-transito` | `control-activos-transito` |
| `trazabilidad-equipos-medicos` | `trazabilidad-activos` |
| `trazabilidad-movimientos-activos` | `trazabilidad-activos` |
| `utilizacion-activos-salud` | `utilizacion-activos` |
| `utilizacion-activos-logistica` | `utilizacion-activos` |
| `localizacion-activos-criticos` | `localizacion-activos` |
| `localizacion-equipos-medicos` | `localizacion-activos` |
| `visibilidad-activos-corporativo` | `visibilidad-activos` |
| `disponibilidad-equipos-criticos` | `disponibilidad-activos` |
| `control-sets-componentes` | `control-sets-equipos` |
| `control-activos-multisede` | `conciliacion-multisede` |
| `integracion-erp-fisico` | `integracion-erp-operacion` |
| `integracion-sistemas-operacion` | `integracion-erp-operacion` |
| `validacion-documental-inventarios` | `conciliacion-fisico-contable` |

### Mayo 2026 — Corrección de páginas huérfanas
- **Auditoría de alcanzabilidad:** 14 páginas de `caseApplications` no tenían ningún punto de entrada desde navegación, industrias ni soluciones.
- **Solución:** se agregaron los 14 slugs huérfanos a los `caseSlugs[]` de las industrias correspondientes, basándose en el campo `industrySlug` de cada caso.

| Caso huérfano | Agregado a industria |
|---------------|----------------------|
| `equipos-comodato` | `salud` |
| `control-activos-hospitales` | `salud` |
| `monitoreo-neonatos` | `salud` |
| `depuracion-activo-fijo` | `manufactura-immex` |
| `eliminacion-captura-manual` | `manufactura-immex` |
| `conciliaciones-automatizadas` | `manufactura-immex` |
| `validacion-visual-ia-operaciones` | `manufactura-immex` |
| `control-contenedores-retornables` | `logistica-transporte` |
| `automatizacion-logistica` | `logistica-transporte` |
| `validacion-vehiculos` | `logistica-transporte` |
| `validacion-integracion-operaciones` | `logistica-transporte` |
| `inventario-masivo-rfid` | `retail-corporativos` |
| `validacion-inventarios-multisede` | `retail-corporativos` |
| `control-activos-ubicacion` | `retail-corporativos` |

**Resultado:** 0 páginas huérfanas. Las 39 páginas de casos de aplicación son alcanzables desde la navegación.

---

*Actualizar este archivo cuando se agreguen nuevas páginas o se modifiquen slugs en `data/content.ts`.*
