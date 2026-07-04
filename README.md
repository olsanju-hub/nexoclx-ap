# NexoClx AP

NexoClx AP es una app independiente de la familia NexoClx para Atención Primaria. Su función es convertir temas clínicos en herramientas rápidas para consulta: sospechar, confirmar, iniciar o ajustar tratamiento ambulatorio, hacer seguimiento, detectar alarma y derivar.

## Qué temas pertenecen a AP

Incluye un tema solo si Atención Primaria puede tomar una decisión real:

- sospecha o diagnóstico inicial;
- confirmación con medición, analítica, prueba o seguimiento;
- inicio de tratamiento ambulatorio;
- ajuste, escalada o revisión de mala respuesta;
- medidas no farmacológicas y prevención;
- señales de alarma;
- criterios de derivación.

No añadir temas puramente hospitalarios, de procedimiento avanzado, soporte crítico o traslado si AP solo actuaría como derivación inmediata sin herramienta útil. Si un tema tiempo-dependiente aplica a AP, debe centrarse en alarma, datos mínimos y derivación.

## Cómo construir una herramienta clínica

Cada tema debe ser una herramienta, no un texto:

- pedir datos mínimos mediante inputs, selectores o checks;
- devolver una conducta concreta;
- mostrar tratamiento, dosis y escalones si proceden;
- indicar qué pedir o revisar;
- dar criterios de derivación;
- permitir copiar un resumen útil;
- dejar fuentes trazables al final.

Si un contenido no cambia una decisión clínica, resumirlo, ocultarlo como detalle secundario o no incluirlo.

## Tratamiento, dosis y escalada

Cuando el tema requiera tratamiento, incluir grupo farmacológico, indicación, dosis inicial, rango, combinaciones, escalada, precauciones relevantes, seguimiento y mala respuesta. Cada dosis y escalón debe tener fuente trazable. No usar frases genéricas como "ajustar tratamiento" si existen pautas concretas respaldadas.

## Cálculos

No mencionar cálculos, escalas o scores si la app no los calcula. Si son necesarios y hay fórmula validada, crear campos, calcular resultado, interpretar y conectar la salida con una conducta. Si no se pueden implementar correctamente, documentarlos en `report.json` como omitidos.

## Fuentes aceptables

Usar guías de sociedades científicas, organismos oficiales, consensos publicados y documentos oficiales referenciados. Fuentes preferentes según tema: ESC/ESH, AHA/ACC, NICE, SEC, SEMES, semFYC, SEMERGEN, AHA/ERC, CHEST y documentos oficiales nacionales o autonómicos.

No usar blogs, webs comerciales, apuntes, contenido generado por IA, presentaciones sin respaldo, protocolos locales no publicados ni textos sin trazabilidad.

## Estética y navegación

No rediseñar. Mantener colores, iconos, home, rutas, bottom nav, tipografía, cards, espaciado y patrón visual actual. Las nuevas interacciones deben encajar en los componentes existentes.

## Validación antes de commit/push

- `npm run build` pasa.
- No hay temas añadidos por simetría.
- Cada tema aporta una decisión real en AP.
- No hay contenido clínico visible sin fuente.
- No hay cálculos mencionados sin cálculo real.
- No hay textos internos, pendientes, mocks ni placeholders visibles.
- No se modifican colores, iconos, navegación ni Vercel.
- `report.json` documenta fuentes, omisiones, cálculos, riesgos y pertinencia.
