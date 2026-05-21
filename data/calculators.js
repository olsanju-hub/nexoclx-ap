window.NEXO_CALCULATORS = [
  {
    id: 'insulina-basal',
    title: 'Inicio y titulación de insulina basal',
    protocol: 'dm2',
    status: 'implementado con advertencias',
    variables: ['peso', 'edad', 'fragilidad/riesgo hipoglucemia', 'glucemias basales', 'HbA1c', 'eGFR', 'tratamiento actual', 'situaciones de riesgo'],
    formula: 'Dosis inicial orientativa: 10 UI/día o 0,1-0,2 UI/kg/día. En fragilidad/riesgo de hipoglucemia usa el extremo bajo. Titulación: +2 UI cada 3 días si mediana de glucemia basal supera objetivo y no hay hipoglucemia; reducir 10-20% si hipoglucemia.',
    source: 'ADA Standards of Care 2026; redGDPS insulinización DM2 2022; ficha técnica CIMA insulina glargina',
    reviewed: '2026-05-21',
    warning: 'No propone bolo-basal ni sustituye educación terapéutica. Confirmar indicación, técnica y plan de hipoglucemia antes de prescribir.'
  },
  {
    id: 'cockcroft-gault',
    title: 'Función renal para ajuste farmacológico',
    protocol: 'global',
    status: 'implementado',
    variables: ['edad', 'sexo', 'peso', 'creatinina', 'unidad de creatinina'],
    formula: 'Cockcroft-Gault: ((140 - edad) * peso kg) / (72 * creatinina mg/dl); multiplicar por 0,85 en mujeres. Si creatinina en µmol/l, convertir a mg/dl dividiendo entre 88,4.',
    source: 'Fórmula Cockcroft-Gault clásica; usar solo cuando ficha técnica/guía pide aclaramiento para ajuste.',
    reviewed: '2026-05-21',
    warning: 'No sustituye eGFR CKD-EPI cuando la guía o ficha técnica lo especifique.'
  },
  {
    id: 'score2-link',
    title: 'SCORE2 / SCORE2-OP oficial',
    protocol: 'dislipemia',
    status: 'pendiente: enlace oficial, sin cálculo local',
    variables: ['edad', 'sexo', 'tabaco', 'presión arterial sistólica', 'colesterol total', 'HDL', 'región de riesgo'],
    formula: 'No implementada localmente. Usar herramienta oficial ESC HeartScore.',
    source: 'ESC HeartScore / SCORE2',
    reviewed: '2026-05-21',
    warning: 'No se simula SCORE2/SCORE2-OP en esta V1 para evitar fórmulas no verificadas.'
  }
];
