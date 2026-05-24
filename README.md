# NexoClx AP

NexoClx AP es una app web estática para consulta rápida en Atención Primaria. La V1 contiene 4 protocolos piloto: hipertensión arterial, diabetes mellitus tipo 2 con insulinización basal, dislipemia/riesgo cardiovascular y neumonía adquirida en la comunidad.

El contenido debe revisarse antes de uso asistencial real y mantenerse alineado con las fuentes clínicas vigentes.

## Estado actual

| Campo | Estado |
| --- | --- |
| Versión | 0.1.0 |
| Última actualización | 2026-05-24 |
| GitHub Pages | Build estático Vite con `base: './'`; publicar `dist` desde GitHub Pages |
| Repositorio | https://github.com/olsanju-hub/nexoclx-ap |
| Enlace público | https://olsanju-hub.github.io/nexoclx-ap/ |
| PWA | Instalable en estructura: manifest, service worker, iconos 192/512 y favicon creados |

## Arquitectura técnica

Tecnologías: React, Vite y Tailwind. La migración desde HTML/CSS/JS vanilla conserva el contenido clínico original y transforma `window.NEXO_*` en módulos ES dentro de `src/data`.

Estructura:

| Ruta | Función |
| --- | --- |
| `index.html` | Shell Vite con punto de montaje React |
| `src/App.jsx` | Router hash, búsqueda, vistas principales y composición de componentes |
| `src/main.jsx` | Entrada React y registro del service worker |
| `src/components/layout/` | AppShell, cabecera, navegación inferior y navegación por secciones |
| `src/components/protocols/` | Tarjetas, listado, detalle, cabecera, bloques, alertas y acciones de protocolos |
| `src/components/ui/` | Componentes básicos reutilizables |
| `src/styles/index.css` | Tailwind + tokens visuales actuales de AP y CSS de la app |
| `public/manifest.webmanifest` | Configuración instalable PWA |
| `public/sw.js` | Service worker básico |
| `public/assets/logo.svg` | Logo verde de NexoClx AP del paquete de iconos |
| `public/assets/icons/` | Iconos PNG PWA y variantes maskable |
| `public/favicon.ico`, `public/favicon.png`, `public/apple-touch-icon.png` | Iconos de navegador y Apple generados desde la misma identidad verde |
| `src/data/protocols.js` | Contenido clínico estructurado por protocolo |
| `src/data/medications.js` | Medicamentos, dosis, seguridad y enlaces CIMA |
| `src/data/calculators.js` | Metadatos y criterios de calculadoras |
| `src/data/bibliography.js` | Fuentes clínicas trazables |
| `src/utils/` | Routing hash, búsqueda y funciones de cálculo/formato clínico |

Los colores actuales de AP se conservan en variables CSS y en `tailwind.config.js`. La presentación de protocolos sigue el patrón operativo de NexoClx 061: tarjeta compacta, cabecera, metadatos, pestañas y bloques clínicos.

Los tratamientos rápidos se registran en `treatmentRows` dentro de cada protocolo. Cada fila debe incluir escenario, conducta, grupo, fármaco, dosis, frecuencia, duración, escalado, control, seguridad y `cimaMedicationId` cuando exista enlace en `src/data/medications.js`. La interfaz mantiene solo búsqueda y filtro simple por categoría para evitar controles innecesarios en la V1.

## Protocolos incluidos

| Protocolo | Categoría | Enfoque clínico | Estado | Commit asociado | Fuente principal | Año | Revisión interna | Calculadoras | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hipertensión arterial en Atención Primaria | Cardiometabólico | diagnóstico / seguimiento crónico / tratamiento farmacológico | implementado / comiteado | commit inicial `feat: create NexoClx AP initial PWA` | 2024 ESC Guidelines for elevated BP and hypertension | 2024 | 2026-05-21 | Cockcroft-Gault | Adaptar a circuitos locales si existen |
| Diabetes mellitus tipo 2 | Cardiometabólico | seguimiento crónico / tratamiento farmacológico | implementado / comiteado | commit inicial `feat: create NexoClx AP initial PWA` | ADA Standards of Care 2026; redGDPS 2026 | 2026 | 2026-05-21 | Insulina basal; Cockcroft-Gault | Insulinización redGDPS vigente localizada es 2022 |
| Dislipemia / riesgo cardiovascular | Cardiometabólico | diagnóstico / tratamiento farmacológico | implementado / comiteado | commit inicial `feat: create NexoClx AP initial PWA` | 2025 ESC/EAS Focused Update | 2025 | 2026-05-21 | SCORE2 enlazado; Cockcroft-Gault | SCORE2 no se calcula localmente |
| Neumonía adquirida en la comunidad en Atención Primaria | Respiratorio | diagnóstico / tratamiento antimicrobiano | implementado / comiteado | `refactor: replace acute cough protocol with CAP and fix favicon` | NICE NG250 | 2025 | 2026-05-21 | Ninguna | Sustituye al protocolo amplio de IRA/tos aguda para mantener la V1 concreta y accionable |

## Calculadoras incluidas

| Calculadora | Protocolo relacionado | Variables usadas | Fórmula o criterio aplicado | Fuente | Estado | Commit asociado | Pendientes de validación |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Inicio y titulación de insulina basal | DM2 | peso, edad, fragilidad, glucemia basal, HbA1c, eGFR, tratamiento actual, situaciones de riesgo | 10 UI/día o 0,1-0,2 UI/kg/día; +2 UI cada 3 días si basal sobre objetivo; reducir 10-20% si hipoglucemia | ADA 2026; redGDPS insulinización 2022; CIMA insulina glargina | implementada con advertencias | commit inicial | Validación clínica local antes de uso asistencial |
| Función renal Cockcroft-Gault | Global | edad, sexo, peso, creatinina, unidad | Fórmula Cockcroft-Gault clásica | Fórmula farmacológica clásica; aplicar solo si ficha/guía usa ClCr | implementada | commit inicial | No sustituye CKD-EPI si la fuente pide eGFR |
| SCORE2 / SCORE2-OP oficial | Dislipemia | edad, sexo, tabaco, PAS, CT, HDL, región | No implementada; enlace a HeartScore | ESC HeartScore | pendiente, enlazada | commit inicial | No implementar sin fórmula oficial verificable |

## Medicamentos y CIMA/AEMPS

Los medicamentos se registran en `src/data/medications.js` con nombre genérico, protocolos, dosis, duración, seguridad, ajuste renal/hepático y enlace a ficha técnica CIMA/AEMPS. No se deben inventar URLs. Si no se verifica un enlace, usar literalmente `enlace CIMA pendiente` y no añadir una URL comercial.

Fármacos con enlace CIMA verificado en V1: enalapril, amlodipino, hidroclorotiazida, metformina, empagliflozina, sitagliptina, gliclazida, liraglutida, insulina glargina, atorvastatina, rosuvastatina, ezetimiba, doxiciclina, amoxicilina, claritromicina y amoxicilina/ácido clavulánico. Pendiente o parcial: losartán monofármaco.

En protocolos con antibióticos se puede usar documentación PROA como apoyo si es institucional, autonómica, nacional, hospitalaria o de sociedad científica, con fecha y trazabilidad clara. PROA no sustituye a la guía clínica principal ni a CIMA/AEMPS; si hay discrepancia, debe registrarse en bibliografía/observaciones.

## Bibliografía clínica

Jerarquía aceptada: guías oficiales de sociedades científicas u organismos públicos, guías españolas trazables, CIMA/AEMPS, y revisiones clínicas solo como apoyo. Prohibido usar blogs, webs comerciales, apuntes, PDFs sin autoría institucional clara o contenido sin fecha como fuente principal.

| Protocolo | Fuente principal | Fuente de apoyo | Año | Enlace | Revisión | Confianza |
| --- | --- | --- | --- | --- | --- | --- |
| HTA | ESC 2024 HTA | SEC/comentarios si se incorporan después | 2024 | https://academic.oup.com/eurheartj/article/45/38/3912/7741010 | 2026-05-21 | alto |
| DM2 | ADA Standards of Care 2026 | redGDPS 2026; redGDPS insulinización 2022 | 2026/2022 | https://professional.diabetes.org/standards-of-care | 2026-05-21 | alto/medio |
| Dislipemia | ESC/EAS Focused Update 2025 | ESC Prevention 2021; HeartScore | 2025/2021 | https://academic.oup.com/eurheartj/article/46/42/4359/8234482 | 2026-05-21 | alto |
| Neumonía adquirida en la comunidad en AP | NICE NG250 | SEPAR NAC 2020; PROA local pendiente si se identifica fuente aplicable | 2025/2020 | https://www.nice.org.uk/guidance/ng250 / https://archbronconeumol.org/es-neumonia-adquirida-comunidad-normativa-sociedad-articulo-S0300289620300405 | 2026-05-21 | alto |

## Historial de cambios

| Fecha | Cambio | Archivos modificados | Protocolos afectados | Commit asociado | Pendientes |
| --- | --- | --- | --- | --- | --- |
| 2026-05-24 | Homologación visual y de estructura con la suite NexoClx: estilos en `src/styles/`, scripts en `src/scripts/`, datos en `src/data/` y assets en `public/assets/`; tokens visuales comunes con acento AP verde/teal | `index.html`, `src/styles/index.css`, `src/scripts/app.js`, `src/data/`, `public/assets/`, `manifest.webmanifest`, `sw.js`, `README.md` | Ninguno | pendiente | Validación clínica no afectada; comprobar despliegue GitHub Pages tras publicar |
| 2026-05-21 | Corrección del favicon de navegador con query string de versión, unificación visual de icono interno/PWA/favicon y sustitución del protocolo amplio de IRA/tos aguda por NAC en AP con filas terapéuticas accionables | `index.html`, `styles.css`, `app.js`, `sw.js`, `data/protocols.js`, `data/medications.js`, `data/bibliography.js`, `README.md` | NAC | `refactor: replace acute cough protocol with CAP and fix favicon` | Identificar PROA local/autonómico aplicable; validación clínica local de pauta antibiótica y criterios de derivación |
| 2026-05-21 | Eliminación del filtro visible de tipo para reducir densidad; cambio de Tos en AP a Infección respiratoria aguda / tos aguda; unificación del icono interno con el icono PWA usando el PNG verde del paquete | `app.js`, `styles.css`, `index.html`, `data/protocols.js`, `data/bibliography.js`, `sw.js`, `README.md` | Respiratorio | `refactor: simplify filters focus respiratory protocol and unify icon` | Protocolo futuro de tos persistente/crónica; validación clínica del protocolo respiratorio agudo |
| 2026-05-21 | Sustitución de iconos por el paquete `nexoclx-ap-icon-pack-verde`, incorporación de favicon ICO, Apple Touch Icon y variantes maskable; carpeta de paquete eliminada | `assets/logo.svg`, `assets/icons/`, `favicon.png`, `favicon.ico`, `apple-touch-icon.png`, `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` | Ninguno | `chore: use provided green icon pack` | Comprobar refresco de icono en PWAs ya instaladas |
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

1. Añadir medicamentos nuevos en `src/data/medications.js`; verificar CIMA o marcar `enlace CIMA pendiente`.
2. Añadir fuentes en `src/data/bibliography.js` con año, institución, enlace, revisión y confianza.
3. Añadir calculadoras en `src/data/calculators.js` solo si influyen en una decisión clínica y la fórmula está verificada.
4. Añadir el protocolo en `src/data/protocols.js` con `id`, categoría, enfoque, palabras clave, sinónimos, revisión, fuente, nivel de confianza, bloques principales, secciones secundarias, medicamentos, calculadoras y bibliografía.
5. Añadir `treatmentRows` con filas estructuradas. No usar texto largo si puede expresarse como decisión: escenario -> fármaco -> dosis -> frecuencia -> escalado -> control.
6. Actualizar este README: tabla de protocolos, calculadoras, bibliografía, changelog y pendientes.
7. Verificar búsqueda, filtro por categoría, navegación, calculadoras, responsive, PWA y enlaces internos antes del commit.

## Pendientes y roadmap

- Validación clínica externa por profesional o comité antes de uso real.
- Protocolo futuro pendiente: Infección respiratoria aguda / tos aguda en Atención Primaria. Enfoque previsto: catarro, bronquitis aguda, antibiótico sí/no, tratamiento sintomático, revisión y alarmas.
- Protocolo futuro pendiente: Tos persistente / tos crónica en Atención Primaria. Enfoque previsto: tos subaguda/crónica, IECA, rinitis/goteo nasal posterior, asma, EPOC, reflujo, tabaquismo, alarmas, Rx tórax, espirometría y derivación a neumología, ORL o digestivo.
- Identificar PROA local/autonómico aplicable para NAC si se quiere adaptar la selección antibiótica al entorno asistencial concreto.
- Completar enlaces CIMA pendientes: losartán monofármaco.
- Revisar ajustes renales/hepáticos con fichas técnicas concretas para cada presentación seleccionada.
- Añadir pruebas automatizadas ligeras para render, búsqueda y calculadoras.
- Mantener revisión bibliográfica anual o antes si ADA/ESC/NICE/redGDPS publican actualización.
- Implementar nuevos protocolos solo después de cerrar pendientes críticos de V1.
