# NexoClx AP

NexoClx AP es una app independiente de la familia NexoClx para Atención Primaria de adultos/general. Su función es convertir temas clínicos en herramientas rápidas para consulta: sospechar, confirmar, iniciar o ajustar tratamiento ambulatorio, hacer seguimiento, detectar alarmas y derivar.

La familia NexoClx está formada por AP, Urg, 061 y Ped. No se deben fusionar apps ni crear un selector común.

## Identidad

- Contexto: Atención Primaria.
- Enfoque: diagnóstico inicial, confirmación, pruebas/analítica, tratamiento ambulatorio, seguimiento, prevención, alarmas y derivación.
- Mantener colores, iconos, rutas, home, bottom nav y estética aprobada.

## Pertinencia de temas

Añadir un tema solo si AP puede tomar una decisión real:

- sospecha o diagnóstico inicial;
- confirmación con medición, analítica, prueba o seguimiento;
- tratamiento ambulatorio, dosis y escalada;
- medidas no farmacológicas y prevención;
- mala respuesta o seguimiento;
- alarma y derivación.

No añadir temas puramente hospitalarios, soporte crítico, traslado o procedimientos avanzados si AP solo actuaría como derivación inmediata sin herramienta útil. No añadir temas por simetría con Urg, 061 o Ped.

## Cómo decidir si aplica

Antes de crear un tema, responder:

- ¿AP puede hacer algo más que leer?
- ¿Qué dato debe introducir el usuario?
- ¿Qué salida práctica obtiene?
- ¿Hay fuente para criterios, tratamiento, dosis o derivación?

Si no hay respuesta clara, no se añade y se documenta en el reporte.

## Herramienta clínica

Cada tema debe comportarse como herramienta, no como capítulo:

- inputs, selectores o checklists;
- resultado o nivel de riesgo;
- conducta concreta;
- tratamiento, dosis y escalada si procede;
- criterios de derivación;
- resumen copiable;
- fuentes al final.

Si un bloque no cambia una decisión clínica, resumirlo, moverlo a detalle secundario o no incluirlo.

## Tratamiento

Cuando el tema requiera tratamiento, incluir grupo farmacológico, indicación, dosis inicial, rango, combinaciones, escalada, precauciones, seguimiento y mala respuesta. Cada dosis y escalón debe tener fuente trazable.

No usar frases genéricas como "ajustar tratamiento" si existen pautas concretas respaldadas.

## Cálculos

No mencionar cálculos, escalas o scores si la app no los calcula realmente. Si son necesarios y hay fórmula validada, crear campos, calcular resultado, interpretar y conectar con una conducta.

Si no se pueden implementar correctamente, no mostrarlos como herramienta activa y documentarlos en `report.json`.

## Fuentes

Fuentes aceptables: guías de sociedades científicas, organismos oficiales, consensos publicados, documentos oficiales referenciados y fuentes internas ya trazables.

Fuentes preferentes según tema: ESC/ESH, AHA/ACC, NICE, SEC, SEMES, semFYC, SEMERGEN, AHA/ERC, CHEST y documentos nacionales o autonómicos publicados.

No usar blogs, webs comerciales, apuntes, contenido generado por IA, presentaciones sin respaldo, protocolos locales no publicados ni textos sin trazabilidad.

## Derivación

Toda herramienta AP debe indicar, si procede:

- manejo ambulatorio;
- revisión o seguimiento;
- derivación preferente;
- derivación urgente;
- activación de recurso si el tema lo exige.

## Estética

No rediseñar. Mantener patrón visual family-discovery-aesthetic, tipografía, cards, espaciados, bordes, sombras, navegación, home, bottom nav, rutas, iconos y colores.

## Reglas permanentes

- No poner temas por poner.
- No copiar contenido de Urg, 061 o Ped sin adaptar al contexto AP.
- No mostrar textos internos, pendientes, mocks ni placeholders.
- No mostrar contenido clínico sin fuente.
- No mencionar cálculos si no se calculan.
- No tocar Vercel.

## Validación antes de commit/push

- `npm run build` pasa.
- El tema aporta una decisión real en AP.
- No hay contenido clínico visible sin fuente.
- No hay cálculos mencionados sin cálculo real.
- Tratamiento/dosis/escalones tienen fuente trazable.
- No se modifican colores, iconos, navegación ni estética global.
- No se mezclan apps.
- `report.json` documenta fuentes, omisiones, cálculos, riesgos y pertinencia.
