# 🧭 Mapa de Navegación — HTK Website
> Mayo 2026 · Sin links muertos · Basado en código real

---

## Navegación Global

Estas rutas están presentes en **todas las páginas** del sitio (Navbar + Footer).

### Navbar
| Elemento | Destino |
|----------|---------|
| Logo HTK | `/` |
| **Problemas** (menú) | → `/problemas/conciliacion-activos` *(enlace raíz)* |
| └ ICP 1 – Conciliación | → `/problemas/conciliacion-activos` |
| └ ICP 2 – Cumplimiento | → `/problemas/cumplimiento-activos` |
| └ ICP 3 – Control y Visibilidad | → `/problemas/control-visibilidad-activos` |
| └ ICP 4 – Disponibilidad | → `/problemas/disponibilidad-activos` |
| └ ICP 5 – Automatización | → `/problemas/automatizacion-operativa` |
| **Industrias** (menú) | → `/industrias/salud` *(enlace raíz)* |
| └ Salud | → `/industrias/salud` |
| └ Manufactura / IMMEX | → `/industrias/manufactura-immex` |
| └ Logística y Transporte | → `/industrias/logistica-transporte` |
| └ Retail y Corporativos | → `/industrias/retail-corporativos` |
| └ Gobierno | → `/industrias/gobierno` |
| └ Servicios y Eventos | → `/industrias/servicios-eventos` |
| **Soluciones** (menú) | → `/soluciones/plataforma` *(enlace raíz)* |
| └ Plataforma HTK | → `/soluciones/plataforma` |
| └ Identificación Inteligente | → `/soluciones/identificacion-inteligente` |
| └ Control y Trazabilidad | → `/soluciones/control-trazabilidad` |
| └ Integración de Información | → `/soluciones/integracion-informacion` |
| └ Automatización de Procesos | → `/soluciones/automatizacion-procesos` |
| └ Visibilidad Operativa | → `/soluciones/visibilidad-operativa` |
| **Casos** (menú) | *(sin enlace raíz — `#`)* |
| └ Conciliación físico-contable | → `/casos-aplicacion/conciliacion-fisico-contable` |
| └ Control por ubicación | → `/casos-aplicacion/control-activos-ubicacion` |
| └ Control por responsable | → `/casos-aplicacion/control-activos-responsable` |
| └ Disponibilidad de activos | → `/casos-aplicacion/disponibilidad-activos` |
| └ Control de retornables | → `/casos-aplicacion/control-retornables` |
| └ Control de activos móviles | → `/casos-aplicacion/control-activos-moviles` |
| └ Integración ERP-operación | → `/casos-aplicacion/integracion-erp-operacion` |
| └ Casos de éxito | → `/casos-exito` |
| **Recursos** | → `/recursos/calculadora-roi-activos` |
| **Nosotros** | → `/nosotros` |
| **Agendar sesión** | → `/sesion` |

### Footer
| Elemento | Destino |
|----------|---------|
| Soluciones (todas) | → `/soluciones/{slug}` (5 soluciones) |
| Industrias (todas) | → `/industrias/{slug}` (6 industrias) |
| CTA principal | → `/sesion` |
| Aviso de privacidad | → `/aviso-de-privacidad` |
| Email | `mailto:contacto@htk-id.com` |
| LinkedIn | `https://linkedin.com/company/htk-id` |

---

## Páginas Principales

### `/` — Home
| Sección | Destino |
|---------|---------|
| CTA hero | → `/sesion` |
| ICP 1–5 (tarjetas de problemas) | → `/problemas/conciliacion-activos` … `/problemas/automatizacion-operativa` |
| Soluciones (tarjetas) | → `/soluciones/identificacion-inteligente` … `/soluciones/visibilidad-operativa` |
| CTA sección soluciones | → `/sesion` |
| Industrias (tarjetas) | → `/industrias/salud` … `/industrias/servicios-eventos` |
| Industria destacada | → `/industrias/salud` |
| Casos de aplicación (tarjetas featured) | → `/casos-aplicacion/{slug}` *(selección curada)* |
| Casos de éxito (tarjetas) | → `/casos-exito/{slug}` |
| Recurso 1 | → `/recursos/calculadora-roi-activos` |
| Recurso 2 | → `/recursos/autodiagnostico-control-activos` |
| Recurso 3 | → `/recursos/checklist-control-activos` |
| CTA final | → `/sesion` |

### `/nosotros` — Nosotros
| Sección | Destino |
|---------|---------|
| CTA (×3) | → `/sesion` |

### `/sesion` — Agendar Sesión ★ Conversión principal
| Sección | Destino |
|---------|---------|
| Recurso 1 | → `/recursos/autodiagnostico-control-activos` |
| Recurso 2 | → `/recursos/calculadora-roi-activos` |
| CTA secundario | → `/sesion` *(botón en página)* |
| Casos de éxito | → `/casos-exito` |

### `/aviso-de-privacidad`
Sin enlaces de salida.

### Redirects automáticos
| Ruta | Redirige a |
|------|-----------|
| `/contacto` | → `/sesion` |
| `/diagnostico` | → `/sesion` |
| `/demo-tagventory` | → `/sesion` |

---

## Problemas / ICP
*Template compartido — aplica a los 5 slugs.*

**Rutas:** `/problemas/conciliacion-activos` · `/problemas/cumplimiento-activos` · `/problemas/control-visibilidad-activos` · `/problemas/disponibilidad-activos` · `/problemas/automatizacion-operativa`

| Sección | Destino |
|---------|---------|
| CTA hero (×2) | → `/sesion` |
| Industrias afectadas (tarjetas) | → `/industrias/{slug}` *(las que apliquen a ese ICP)* |
| Casos de aplicación relacionados | → `/casos-aplicacion/{slug}` *(los del ICP)* |
| Soluciones HTK | → `/soluciones/{slug}` |
| Casos de éxito | → `/casos-exito/{slug}` |
| Recurso 1 | → `/recursos/calculadora-roi-activos` |
| Recurso 2 | → `/recursos/checklist-control-activos` |
| CTA final | → `/sesion` |
| Link secundario | → `/nosotros` |

---

## Industrias
*Template compartido — aplica a las 6 industrias.*

**Rutas:** `/industrias/salud` · `/industrias/manufactura-immex` · `/industrias/logistica-transporte` · `/industrias/retail-corporativos` · `/industrias/gobierno` · `/industrias/servicios-eventos`

| Sección | Destino |
|---------|---------|
| CTA hero (×2) | → `/sesion` |
| ICP vinculado | → `/problemas/{icpSlug}` |
| Casos de aplicación | → `/casos-aplicacion/{slug}` *(ver tabla abajo)* |
| Soluciones | → `/soluciones/{slug}` |
| Casos de éxito | → `/casos-exito/{slug}` |
| Link industria | → `/industrias/{slug}` *(otras industrias relacionadas)* |
| CTA final | → `/sesion` |
| Link secundario | → `/nosotros` |

### Casos por industria
| Industria | Casos de aplicación accesibles |
|-----------|-------------------------------|
| **Salud** | localizacion-activos · control-activos-hospital-areas · disponibilidad-activos · trazabilidad-activos · utilizacion-activos · equipos-comodato · control-activos-hospitales · monitoreo-neonatos |
| **Manufactura / IMMEX** | conciliacion-fisico-contable · cumplimiento-immex-activos · control-activos-planta · control-activos-transito · integracion-erp-operacion · depuracion-activo-fijo · eliminacion-captura-manual · conciliaciones-automatizadas · validacion-visual-ia-operaciones |
| **Logística y Transporte** | control-activos-moviles · control-retornables · control-activos-transito · control-activos-en-clientes · utilizacion-activos · control-contenedores-retornables · automatizacion-logistica · validacion-vehiculos · validacion-integracion-operaciones |
| **Retail y Corporativos** | control-activos-sucursal · conciliacion-multisede · control-activos-responsable · transferencia-activos · visibilidad-activos · inventario-masivo-rfid · validacion-inventarios-multisede · control-activos-ubicacion |
| **Gobierno** | conciliacion-activos-gobierno · control-activos-dependencia · asignacion-activos-responsable · trazabilidad-activos · preparacion-auditorias-activos |
| **Servicios y Eventos** | control-sets-equipos · control-activos-eventos · control-activos-en-clientes · trazabilidad-activos · control-activos-facturacion |

---

## Soluciones
*Template compartido — aplica a las 5 soluciones.*

**Rutas:** `/soluciones/identificacion-inteligente` · `/soluciones/control-trazabilidad` · `/soluciones/integracion-informacion` · `/soluciones/automatizacion-procesos` · `/soluciones/visibilidad-operativa`

| Sección | Destino |
|---------|---------|
| CTA hero (×2) | → `/sesion` |
| Casos de aplicación (queHabilitaCasos) | → `/casos-aplicacion/{slug}` *(ver tabla abajo)* |
| Otras soluciones | → `/soluciones/{slug}` |
| CTA final (×2) | → `/sesion` |

### Casos por solución (queHabilitaCasos)
| Solución | Casos accesibles |
|----------|-----------------|
| **Identificación Inteligente** | control-activos-ubicacion · control-activos-moviles · control-activos-responsable · conciliacion-fisico-contable |
| **Control y Trazabilidad** | control-activos-responsable · control-retornables · conciliacion-fisico-contable · integracion-erp-operacion |
| **Integración de Información** | integracion-erp-operacion · conciliacion-fisico-contable · control-activos-responsable · disponibilidad-activos |
| **Automatización de Procesos** | integracion-erp-operacion · control-retornables · control-activos-moviles · disponibilidad-activos |
| **Visibilidad Operativa** | disponibilidad-activos · control-activos-ubicacion · control-activos-moviles · conciliacion-fisico-contable |

### `/soluciones/plataforma` — Plataforma HTK *(página estática)*
| Sección | Destino |
|---------|---------|
| CTA hero | → `/sesion` |
| Link | → `/soluciones/identificacion-inteligente` |
| Pasos / capacidades | → `/soluciones/{slug}` (todas las soluciones) |
| Casos de aplicación | → `/casos-aplicacion/{slug}` |
| Otras soluciones | → `/soluciones/{slug}` |
| CTA final (×2) | → `/sesion` |

---

## Casos de Aplicación
*Template compartido. Versión básica y versión enriquecida (⭐).*

**Ruta:** `/casos-aplicacion/{slug}` — 39 páginas

| Sección | Destino (versión básica) | Destino adicional (versión ⭐ enriquecida) |
|---------|--------------------------|-------------------------------------------|
| CTA hero (×2) | → `/sesion` | → `/sesion` |
| industryLinks | — | → `/industrias/{slug}` *(industrias vinculadas)* |
| ICP vinculado | — | → `/problemas/{icpSlug}` |
| Soluciones relacionadas | — | → `/soluciones/{slug}` |
| Casos relacionados (relatedCaseSlugs) | — | → `/casos-aplicacion/{slug}` |
| CTA final | → `/sesion` | → `/sesion` |

### Casos enriquecidos (⭐) y sus casos relacionados
| Caso | Casos relacionados |
|------|--------------------|
| conciliacion-fisico-contable | integracion-erp-operacion · conciliacion-multisede · control-activos-responsable · preparacion-auditorias-activos · control-activos-ubicacion · visibilidad-activos |
| conciliacion-multisede | conciliacion-fisico-contable · integracion-erp-operacion |
| control-activos-ubicacion | conciliacion-fisico-contable · control-activos-planta · control-activos-transito · integracion-erp-operacion · conciliacion-multisede · control-activos-responsable · control-sets-equipos · disponibilidad-activos · localizacion-activos · utilizacion-activos · visibilidad-activos |
| control-activos-moviles | control-activos-transito · control-sets-equipos · control-retornables · control-activos-ubicacion · disponibilidad-activos · localizacion-activos · utilizacion-activos |
| control-activos-responsable | trazabilidad-activos |
| control-activos-planta | control-activos-transito |
| control-activos-transito | control-activos-moviles · control-activos-planta · control-retornables |
| integracion-erp-operacion | conciliacion-fisico-contable · conciliacion-multisede · preparacion-auditorias-activos · trazabilidad-activos · validacion-integracion-operaciones · visibilidad-activos |
| control-sets-equipos | disponibilidad-activos |
| control-retornables | control-activos-moviles |
| localizacion-activos | monitoreo-neonatos |
| trazabilidad-activos | integracion-erp-operacion · preparacion-auditorias-activos · monitoreo-neonatos · validacion-visual-ia-operaciones · validacion-integracion-operaciones |
| disponibilidad-activos | control-activos-planta · control-activos-transito · control-sets-equipos · control-activos-ubicacion · localizacion-activos · utilizacion-activos |
| utilizacion-activos | control-activos-moviles · control-retornables · disponibilidad-activos |
| preparacion-auditorias-activos | conciliacion-fisico-contable · control-activos-responsable · trazabilidad-activos |
| monitoreo-neonatos | localizacion-activos · trazabilidad-activos · visibilidad-activos |
| validacion-visual-ia-operaciones | trazabilidad-activos · validacion-integracion-operaciones |
| validacion-integracion-operaciones | integracion-erp-operacion · trazabilidad-activos · validacion-visual-ia-operaciones · visibilidad-activos |
| visibilidad-activos | integracion-erp-operacion · control-activos-responsable · conciliacion-fisico-contable · monitoreo-neonatos · validacion-visual-ia-operaciones · validacion-integracion-operaciones |

---

## Casos de Éxito

### `/casos-exito` — Hub *(página estática)*
| Sección | Destino |
|---------|---------|
| CTA | → `/sesion` |
| Link | → `/soluciones/plataforma` |
| Tarjetas de clientes | → `/casos-exito/{slug}` (todos los casos) |
| Links inferiores | → `/problemas/conciliacion-activos` · `/soluciones/plataforma` · `/industrias/salud` · `/casos-aplicacion/conciliacion-fisico-contable` |
| CTA final | → `/sesion` |

### `/casos-exito/{slug}` — Caso de éxito individual
*Slugs disponibles:* `cinepolis` · `grupo-gia` · `abc-queretaro` · `vidrio-formas` · `fresenius-kabi` · `xisoem` · `validacion-ia` · `monitoreo-neonatos`

| Sección | Destino |
|---------|---------|
| CTA hero | → `/sesion` |
| Solución relacionada | → `/soluciones/{slug}` |
| Capacidades (casos/soluciones) | → `/casos-aplicacion/{slug}` o `/soluciones/{slug}` |
| ICP vinculado | → `/problemas/{icpSlug}` |
| Industria vinculada | → `/industrias/{slug}` |
| Otros casos de éxito | → `/casos-exito/{slug}` |
| CTA final | → `/sesion` |

---

## Recursos

### `/recursos/autodiagnostico-control-activos` — Autodiagnóstico
| Sección | Destino |
|---------|---------|
| Al completar (resultado) | → `/recursos/calculadora-roi-activos?nivel=alto\|medio\|bajo` |
| CTA alternativo | → `/sesion` |

### `/recursos/calculadora-roi-activos` — Calculadora ROI
| Sección | Destino |
|---------|---------|
| CTA resultado | → `/sesion` |
| Casos de éxito relacionados | → `/casos-exito/{slug}` |
| CTA final | → `/sesion` |

### `/recursos/checklist-control-activos` — Checklist
| Sección | Destino |
|---------|---------|
| Al completar | → `/recursos/calculadora-roi-activos?nivel=alto\|medio\|bajo` |
| CTA alternativo | → `/sesion` |
| CTA final | → `/sesion` |
| Link calculadora | → `/recursos/calculadora-roi-activos` |

---

## Links Muertos Corregidos en esta Sesión

| Archivo | Link incorrecto | Corregido a |
|---------|----------------|-------------|
| `app/page.tsx` | `/recursos/calculadora-perdidas-activos` | `/recursos/calculadora-roi-activos` |
| `app/page.tsx` | `/recursos/checklist-cumplimiento-activos` | `/recursos/checklist-control-activos` |
| `app/problemas/[slug]/page.tsx` | `/recursos/calculadora-perdidas-activos` | `/recursos/calculadora-roi-activos` |
| `app/problemas/[slug]/page.tsx` | `/recursos/checklist-cumplimiento-activos` | `/recursos/checklist-control-activos` |
| `app/recursos/[slug]/page.tsx` | `/recursos/calculadora-perdidas-activos` | `/recursos/calculadora-roi-activos` |
| `app/recursos/[slug]/page.tsx` | `/recursos/checklist-cumplimiento-activos` | `/recursos/checklist-control-activos` |

---

## Resumen de Flujos Principales

```
Usuario llega →
  Home  →  Problema  →  Industria  →  Caso de aplicación  →  /sesion
              │               │               │
              │               └── Solución ───┘
              │
              └── Recursos ──────────────────────────────  →  /sesion
                    │
                    Autodiagnóstico → Calculadora ROI → /sesion

  Home  →  Caso de éxito  →  Solución / Industria / ICP  →  /sesion

Toda página → Navbar → cualquier sección → ... → /sesion
```

**Punto de conversión único:** `/sesion`
**Páginas sin salida interna:** `/aviso-de-privacidad`
**Redirects preservados:** `/contacto` · `/diagnostico` · `/demo-tagventory` → `/sesion`
