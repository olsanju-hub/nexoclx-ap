# NexoClx AP

NexoClx AP es una app web estática de apoyo clínico rápido para consulta de Atención Primaria. La V1 contiene 4 protocolos piloto: hipertensión arterial, diabetes mellitus tipo 2 con insulinización basal, dislipemia/riesgo cardiovascular y tos como síntoma clínico.

NexoClx AP no sustituye el juicio clínico, la valoración individual ni las guías oficiales vigentes. El contenido debe revisarse antes de uso asistencial real.

## Estado actual

| Campo | Estado |
| --- | --- |
| Versión | 0.1.0 |
| Última actualización | 2026-05-21 |
| GitHub Pages | Configurado para publicar desde `main` / raíz |
| Repositorio | https://github.com/olsanju-hub/nexoclx-ap |
| Enlace público | https://olsanju-hub.github.io/nexoclx-ap/ |
| PWA | Instalable en estructura: manifest, service worker, iconos 192/512 y favicon creados |

## Arquitectura técnica

Tecnologías: HTML, CSS y JavaScript vanilla, sin frameworks ni dependencias externas. Motivo: carga rápida, bajo mantenimiento, funcionamiento offline y compatibilidad directa con GitHub Pages.

Estructura:

| Ruta | Función |
| --- | --- |
| `index.html` | Shell de la app, navegación principal y carga de datos/scripts |
| `styles.css` | Diseño mobile-first, tokens visuales y layout responsive |
| `app.js` | Router hash, búsqueda, render de protocolos, calculadoras y PWA |
| `manifest.webmanifest` | Configuración instalable PWA |
| `sw.js` | Service worker básico con caché de shell y datos V1 |
| `assets/logo.svg` | Logo original de NexoClx AP |
| `assets/icons/` | Iconos PNG 192x192 y 512x512 |
| `data/protocols.js` | Contenido clínico estructurado por protocolo |
| `data/medications.js` | Medicamentos, dosis, seguridad y enlaces CIMA |
| `data/calculators.js` | Metadatos y criterios de calculadoras |
| `data/bibliography.js` | Fuentes clínicas trazables |

El service worker precachea los archivos principales para uso offline de la V1. Si se añaden archivos, deben registrarse en `APP_SHELL`.

Los tratamientos rápidos se registran en `treatmentRows` dentro de cada protocolo. Cada fila debe incluir escenario, conducta, grupo, fármaco, dosis, frecuencia, duración, escalado, control, seguridad y `cimaMedicationId` cuando exista enlace en `data/medications.js`.

## Protocolos incluidos

| Protocolo | Categoría | Enfoque clínico | Estado | Commit asociado | Fuente principal | Año | Revisión interna | Calculadoras | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hipertensión arterial en Atención Primaria | Cardiometabólico | diagnóstico / seguimiento crónico / tratamiento farmacológico | implementado / comiteado | commit inicial `feat: create NexoClx AP initial PWA` | 2024 ESC Guidelines for elevated BP and hypertension | 2024 | 2026-05-21 | Cockcroft-Gault | Adaptar a circuitos locales si existen |
| Diabetes mellitus tipo 2 | Cardiometabólico | seguimiento crónico / tratamiento farmacológico | implementado / comiteado | commit inicial `feat: create NexoClx AP initial PWA` | ADA Standards of Care 2026; redGDPS 2026 | 2026 | 2026-05-21 | Insulina basal; Cockcroft-Gault | Insulinización redGDPS vigente localizada es 2022 |
| Dislipemia / riesgo cardiovascular | Cardiometabólico | diagnóstico / tratamiento farmacológico | implementado / comiteado | commit inicial `feat: create NexoClx AP initial PWA` | 2025 ESC/EAS Focused Update | 2025 | 2026-05-21 | SCORE2 enlazado; Cockcroft-Gault | SCORE2 no se calcula localmente |
| Tos en Atención Primaria | Respiratorio | síndrome | implementado / comiteado | commit inicial `feat: create NexoClx AP initial PWA` | NICE NG120; ERS chronic cough | 2019/2021; 2019 | 2026-05-21 | Ninguna | La tos se aborda por duración, alarmas y causa probable |

## Calculadoras incluidas

| Calculadora | Protocolo relacionado | Variables usadas | Fórmula o criterio aplicado | Fuente | Estado | Commit asociado | Pendientes de validación |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Inicio y titulación de insulina basal | DM2 | peso, edad, fragilidad, glucemia basal, HbA1c, eGFR, tratamiento actual, situaciones de riesgo | 10 UI/día o 0,1-0,2 UI/kg/día; +2 UI cada 3 días si basal sobre objetivo; reducir 10-20% si hipoglucemia | ADA 2026; redGDPS insulinización 2022; CIMA insulina glargina | implementada con advertencias | commit inicial | Validación clínica local antes de uso asistencial |
| Función renal Cockcroft-Gault | Global | edad, sexo, peso, creatinina, unidad | Fórmula Cockcroft-Gault clásica | Fórmula farmacológica clásica; aplicar solo si ficha/guía usa ClCr | implementada | commit inicial | No sustituye CKD-EPI si la fuente pide eGFR |
| SCORE2 / SCORE2-OP oficial | Dislipemia | edad, sexo, tabaco, PAS, CT, HDL, región | No implementada; enlace a HeartScore | ESC HeartScore | pendiente, enlazada | commit inicial | No implementar sin fórmula oficial verificable |

## Medicamentos y CIMA/AEMPS

Los medicamentos se registran en `data/medications.js` con nombre genérico, protocolos, dosis, duración, seguridad, ajuste renal/hepático y enlace a ficha técnica CIMA/AEMPS. No se deben inventar URLs. Si no se verifica un enlace, usar literalmente `enlace CIMA pendiente` y no añadir una URL comercial.

Fármacos con enlace CIMA verificado en V1: enalapril, amlodipino, hidroclorotiazida, metformina, empagliflozina, sitagliptina, gliclazida, liraglutida, insulina glargina, atorvastatina, rosuvastatina, ezetimiba. Pendientes o parciales: losartán monofármaco, doxiciclina, amoxicilina.

## Bibliografía clínica

Jerarquía aceptada: guías oficiales de sociedades científicas u organismos públicos, guías españolas trazables, CIMA/AEMPS, y revisiones clínicas solo como apoyo. Prohibido usar blogs, webs comerciales, apuntes, PDFs sin autoría institucional clara o contenido sin fecha como fuente principal.

| Protocolo | Fuente principal | Fuente de apoyo | Año | Enlace | Revisión | Confianza |
| --- | --- | --- | --- | --- | --- | --- |
| HTA | ESC 2024 HTA | SEC/comentarios si se incorporan después | 2024 | https://academic.oup.com/eurheartj/article/45/38/3912/7741010 | 2026-05-21 | alto |
| DM2 | ADA Standards of Care 2026 | redGDPS 2026; redGDPS insulinización 2022 | 2026/2022 | https://professional.diabetes.org/standards-of-care | 2026-05-21 | alto/medio |
| Dislipemia | ESC/EAS Focused Update 2025 | ESC Prevention 2021; HeartScore | 2025/2021 | https://academic.oup.com/eurheartj/article/46/42/4359/8234482 | 2026-05-21 | alto |
| Tos | NICE NG120 | ERS chronic cough 2019 | 2019/2021 | https://www.nice.org.uk/guidance/ng120 | 2026-05-21 | alto |

## Historial de cambios

| Fecha | Cambio | Archivos modificados | Protocolos afectados | Commit asociado | Pendientes |
| --- | --- | --- | --- | --- | --- |
| 2026-05-21 | Conversión de tratamientos a filas estructuradas de decisión rápida y reparación del filtro por categoría/tipo | `app.js`, `styles.css`, `data/protocols.js`, `sw.js`, `README.md` | HTA, DM2, dislipemia, tos | `fix: make protocols clinically actionable and repair filters` | Validación clínica externa de filas terapéuticas |
| 2026-05-21 | Corrección geométrica del icono PWA solicitado | `assets/logo.svg`, `assets/icons/`, `favicon.png`, `sw.js` | Ninguno | `fix: correct app icon geometry` | Comprobar actualización de icono en PWAs ya instaladas |
| 2026-05-21 | Limpieza de la interfaz pública para ocultar notas internas y reducir explicaciones no necesarias en la vista clínica | `app.js`, `data/protocols.js`, `data/calculators.js`, `sw.js`, `README.md` | HTA, DM2, dislipemia, tos | `chore: simplify clinical UI copy` | Revisar con uso real si quedan textos demasiado largos en medicamentos |
| 2026-05-21 | Sustitución del icono/logo por el diseño solicitado y actualización de caché PWA | `assets/logo.svg`, `assets/icons/`, `favicon.png`, `sw.js`, `README.md` | Ninguno | `chore: update app icon` | Verificar refresco de service worker en dispositivos ya instalados |
| 2026-05-21 | Creación inicial de app PWA estática con 4 protocolos, calculadoras, medicamentos, bibliografía y README vivo | `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `assets/`, `data/`, `README.md` | HTA, DM2, dislipemia, tos | `feat: create NexoClx AP initial PWA` | Validación clínica externa; enlaces CIMA pendientes; verificar primera publicación de GitHub Pages |

## Cómo ejecutar la app

Local simple:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`. Para probar en móvil, usar la misma red local o desplegar en GitHub Pages. Para comprobar PWA, abrir DevTools > Application y revisar manifest, service worker e iconos.

GitHub Pages: publicar desde la rama `main`, carpeta raíz.

## Cómo añadir un nuevo protocolo

1. Añadir medicamentos nuevos en `data/medications.js`; verificar CIMA o marcar `enlace CIMA pendiente`.
2. Añadir fuentes en `data/bibliography.js` con año, institución, enlace, revisión y confianza.
3. Añadir calculadoras en `data/calculators.js` solo si influyen en una decisión clínica y la fórmula está verificada.
4. Añadir el protocolo en `data/protocols.js` con `id`, categoría, enfoque, palabras clave, sinónimos, revisión, fuente, nivel de confianza, bloques principales, secciones secundarias, medicamentos, calculadoras y bibliografía.
5. Añadir `type` para que el filtro funcione: por ejemplo `Crónico` o `Síndrome`.
6. Añadir `treatmentRows` con filas estructuradas. No usar texto largo si puede expresarse como decisión: escenario -> fármaco -> dosis -> frecuencia -> escalado -> control.
7. Actualizar este README: tabla de protocolos, calculadoras, bibliografía, changelog y pendientes.
8. Verificar búsqueda, filtro por categoría, filtro por tipo, navegación, calculadoras, responsive, PWA y enlaces internos antes del commit.

## Pendientes y roadmap

- Validación clínica externa por profesional o comité antes de uso real.
- Completar enlaces CIMA pendientes: losartán monofármaco, doxiciclina, amoxicilina, claritromicina/eritromicina si se incorporan.
- Revisar ajustes renales/hepáticos con fichas técnicas concretas para cada presentación seleccionada.
- Añadir pruebas automatizadas ligeras para render, búsqueda y calculadoras.
- Mantener revisión bibliográfica anual o antes si ADA/ESC/NICE/redGDPS publican actualización.
- Implementar nuevos protocolos solo después de cerrar pendientes críticos de V1.
