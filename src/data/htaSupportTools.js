export const htaSupportTools = [
  {
    id: 'ampa',
    title: 'Promedio AMPA',
    description: 'Media domiciliaria PAS/PAD e interpretación con umbral 135/85.',
    status: 'Calculadora',
  },
  {
    id: 'mapa',
    title: 'Promedio MAPA',
    description: 'Registro de medias diurna, nocturna y 24 h con interpretación breve.',
    status: 'Calculadora',
  },
  {
    id: 'score2',
    title: 'SCORE2 / SCORE2-OP',
    description: 'Slot estructural para riesgo CV; no calcula sin tablas validadas.',
    status: 'Pendiente',
  },
  {
    id: 'egfr',
    title: 'eGFR CKD-EPI 2021',
    description: 'Filtrado estimado por creatinina, edad y sexo.',
    status: 'Calculadora',
  },
  {
    id: 'acr',
    title: 'Albuminuria ACR',
    description: 'Cociente albumina/creatinina urinaria y categoria A1-A3.',
    status: 'Calculadora',
  },
  {
    id: 'lab-control',
    title: 'Control analitico HTA',
    description: 'Seguridad tras SRAA, diuretico o espironolactona.',
    status: 'Checklist',
  },
];

export const htaSupportSources = [
  {
    label: 'NICE NG136. Hypertension in adults: diagnosis and management.',
    url: 'https://www.nice.org.uk/guidance/ng136/chapter/recommendations',
    supports: 'AMPA/MAPA, confirmacion diagnostica, objetivos y seguimiento.',
  },
  {
    label: 'National Kidney Foundation. CKD-EPI Creatinine Equation 2021.',
    url: 'https://www.kidney.org/ckd-epi-creatinine-equation-2021-0',
    supports: 'Formula eGFR CKD-EPI 2021 sin raza.',
  },
  {
    label: 'National Kidney Foundation. How to classify CKD.',
    url: 'https://www.kidney.org/how-to-classify-ckd',
    supports: 'Categorias G de eGFR y A1-A3 de albuminuria.',
  },
  {
    label: 'AEMPS CIMA.',
    url: 'https://cima.aemps.es/cima/publico/home.html',
    supports: 'Precauciones y seguridad farmacologica.',
  },
];
