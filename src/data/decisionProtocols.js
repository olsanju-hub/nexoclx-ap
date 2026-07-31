import { toNumber } from '../lib/clinicalToolEngine.js';

const potassiumRisk = (values) => {
  const k = toNumber(values.potassium);
  if (values.unstable || values.ecgStatus === 'risk' || (k !== null && k >= 6.5)) return 'HK-RSK-003: hiperpotasemia critica';
  if (values.sampleQuality === 'hemolyzed' && k !== null && k < 6.5) return 'HK-DX-002: muestra no valida, confirmar potasio';
  if (k === null) return 'HK-DX-001: falta potasio vigente';
  if (k >= 6) return 'HK-RSK-002: hiperpotasemia alta';
  if (k > 5.5) return 'HK-RSK-001: hiperpotasemia moderada';
  if (k > 5) return 'HK-RSK-000: hiperpotasemia leve';
  return 'HK-DX-000: sin hiperpotasemia con el dato introducido';
};

const renalFlag = (values) => {
  if (values.renalStatus === 'dialysis') return 'HK-ESC-002: alto riesgo renal o dialisis';
  if (values.renalStatus === 'ckd') return 'HK-ESC-001: ERC/FRA o causa renal probable';
  if (values.renalStatus === 'unknown') return 'HK-DX-003: funcion renal no disponible';
  return '';
};

const medicationFlag = (values) => {
  if (!Array.isArray(values.riskMedication) || values.riskMedication.length === 0) return '';
  return `HK-DX-004: revisar farmacos (${values.riskMedication.length})`;
};

const hyperkalemiaProtocol = {
  id: 'hiperpotasemia-gold-standard',
  title: 'Hiperpotasemia Gold Standard',
  description: 'Asistente AP para confirmar gravedad, descartar pseudohiperpotasemia y decidir derivacion.',
  status: 'Interactivo',
  assessment: {
    title: 'Asistente AP de hiperpotasemia',
    intro: 'Solicita solo datos que cambian conducta: potasio vigente, ECG, estabilidad, muestra, funcion renal y farmacos.',
    copyPrefix: 'Valoracion AP hiperpotasemia',
    contextLabel: 'NexoClx AP',
    operationalTrace: true,
    fields: [
      { id: 'potassium', label: 'Potasio vigente', type: 'number', unit: 'mmol/L', min: 2, max: 10 },
      { id: 'sampleQuality', label: 'Calidad de muestra', type: 'select', required: true, options: [
        { value: 'valid', label: 'Muestra valida' },
        { value: 'hemolyzed', label: 'Hemolisis o extraccion dudosa' },
        { value: 'unknown', label: 'Calidad desconocida' },
      ] },
      { id: 'ecgStatus', label: 'ECG actual', type: 'select', required: true, options: [
        { value: 'normal', label: 'Sin cambios sugestivos' },
        { value: 'risk', label: 'Cambios compatibles o arritmia' },
        { value: 'unavailable', label: 'No disponible en AP' },
      ] },
      { id: 'unstable', label: 'Inestabilidad, sincope, debilidad marcada o palpitaciones', type: 'checkbox' },
      { id: 'renalStatus', label: 'Funcion renal/contexto', type: 'select', required: true, options: [
        { value: 'known-normal', label: 'Sin ERC/FRA conocida' },
        { value: 'ckd', label: 'ERC, FRA, oligoanuria o deshidratacion' },
        { value: 'dialysis', label: 'Dialisis, trasplante o nefrologia activa' },
        { value: 'unknown', label: 'No disponible' },
      ] },
      { id: 'riskMedication', label: 'Farmacos o aportes que elevan K', type: 'multi', options: [
        { value: 'raas', label: 'IECA/ARA-II/ARNI/aliskiren' },
        { value: 'mra', label: 'Espironolactona/eplerenona' },
        { value: 'nsaid', label: 'AINE' },
        { value: 'supplements', label: 'Suplemento de potasio o sal potasica' },
        { value: 'other', label: 'Heparina, trimetoprim u otro' },
      ] },
    ],
    requiredGroups: [
      { id: 'potassium-or-risk-ecg', label: 'Potasio vigente o ECG de riesgo', fields: ['potassium', 'ecgStatus'] },
    ],
    calculations: [
      { id: 'Regla de riesgo', type: 'custom', fn: potassiumRisk },
      { id: 'Regla renal', type: 'custom', fn: renalFlag },
      { id: 'Regla farmacos', type: 'custom', fn: medicationFlag },
    ],
    interpretations: [
      {
        id: 'ap-renal-risk',
        when: { source: 'computed', id: 'Regla renal', notEquals: '' },
        title: 'Riesgo renal o funcion renal no confirmada',
        body: 'La funcion renal cambia destino, seguimiento y necesidad de analitica urgente.',
        actions: ['Solicitar/actualizar creatinina y filtrado si no estan vigentes; no asumir datos antiguos.'],
      },
      {
        id: 'ap-medication-risk',
        when: { source: 'computed', id: 'Regla farmacos', notEquals: '' },
        title: 'Farmacos o aportes implicados',
        body: 'La conducta AP incluye revisar aportes de potasio y farmacos que reducen excrecion renal.',
        actions: ['Suspender temporalmente aportes no imprescindibles y revisar interacciones segun contexto clinico.'],
      },
    ],
    outcomes: [
      {
        status: 'Emergencia',
        tone: 'alert',
        title: 'Activar traslado urgente',
        body: 'La combinacion de potasio, ECG o inestabilidad no es manejable en AP como caso ambulatorio.',
        when: { source: 'computed', id: 'Regla de riesgo', equals: 'HK-RSK-003: hiperpotasemia critica' },
        actions: [
          'Activar 061 o derivacion medicalizada segun situacion y capacidad local.',
          'No demorar traslado por repetir analitica si hay ECG de riesgo o inestabilidad.',
          'Enviar ECG, valor de potasio, hora de muestra, farmacos y funcion renal disponible.',
        ],
        recommendations: [
          {
            id: 'ap-activate-061',
            rule: 'HK-AP-TX-001',
            label: 'Activar 061',
            detail: 'Solicitar recurso urgente por hiperpotasemia critica, ECG de riesgo o inestabilidad.',
            critical: true,
          },
          {
            id: 'ap-transfer',
            rule: 'HK-AP-DST-001',
            label: 'Derivacion medicalizada',
            detail: 'Traslado a Urgencias con ECG, potasio, hora de muestra, funcion renal y medicacion.',
            critical: true,
          },
        ],
      },
      {
        status: 'Confirmar',
        title: 'Repetir muestra antes de etiquetar hiperpotasemia',
        body: 'La muestra puede explicar el resultado y no hay criterios actuales de emergencia.',
        when: { source: 'computed', id: 'Regla de riesgo', equals: 'HK-DX-002: muestra no valida, confirmar potasio' },
        actions: [
          'Repetir potasio con extraccion correcta y valorar ECG si el resultado previo fue alto o el paciente tiene riesgo.',
          'Si el nuevo valor confirma elevacion o aparecen sintomas/ECG de riesgo, reabrir el asistente con el dato actualizado.',
        ],
        recommendations: [
          {
            id: 'ap-repeat-sample',
            rule: 'HK-DX-002',
            label: 'Repetir potasio',
            detail: 'Confirmar resultado con muestra no hemolizada antes de cerrar conducta ambulatoria.',
          },
        ],
      },
      {
        status: 'Urgente',
        title: 'Derivar a Urgencias hoy',
        body: 'El valor o el contexto supera el margen razonable de manejo exclusivamente ambulatorio.',
        any: [
          { source: 'computed', id: 'Regla de riesgo', equals: 'HK-RSK-002: hiperpotasemia alta' },
          { source: 'computed', id: 'Regla renal', equals: 'HK-ESC-002: alto riesgo renal o dialisis' },
          { all: [
            { id: 'potassium', gt: 5.5 },
            { id: 'ecgStatus', equals: 'unavailable' },
          ] },
        ],
        actions: [
          'Derivar con ECG si esta disponible, potasio con hora, funcion renal y medicacion habitual.',
          'Indicar al paciente no tomar suplementos de potasio ni sales potasicas hasta reevaluacion.',
        ],
        recommendations: [
          {
            id: 'ap-urgent-referral',
            rule: 'HK-AP-DST-002',
            label: 'Derivar a Urgencias hoy',
            detail: 'Enviar al paciente a reevaluacion urgente por potasio alto o riesgo renal.',
            critical: true,
          },
        ],
      },
      {
        status: 'Seguimiento estrecho',
        title: 'Manejo AP con reevaluacion programada',
        body: 'No hay datos de emergencia, pero requiere corregir causas y verificar tendencia.',
        any: [
          { source: 'computed', id: 'Regla de riesgo', equals: 'HK-RSK-001: hiperpotasemia moderada' },
          { source: 'computed', id: 'Regla de riesgo', equals: 'HK-RSK-000: hiperpotasemia leve' },
        ],
        actions: [
          'Revisar farmacos, dieta/aportes y funcion renal; decidir ajuste farmacologico profesional.',
          'Repetir analitica segun riesgo clinico y reabrir asistente si el valor sube, faltan datos o aparecen sintomas.',
        ],
        recommendations: [
          {
            id: 'ap-follow-up',
            rule: 'HK-AP-RV-001',
            label: 'Plan de seguimiento AP',
            detail: 'Revisar farmacos/aportes y programar control analitico segun riesgo.',
          },
        ],
      },
    ],
    defaultOutcome: {
      status: 'Dato insuficiente',
      title: 'Obtener potasio vigente o ECG si hay sospecha',
      body: 'Sin potasio actual no puede clasificarse gravedad salvo que exista ECG de riesgo o inestabilidad.',
      actions: [
        'Actualizar el dato dinamico antes de cerrar la conducta.',
        'Si existe inestabilidad clinica, actuar como emergencia aunque falte confirmacion analitica.',
      ],
    },
  },
  sources: [
    { label: 'UK Kidney Association. Clinical Practice Guideline: Management of Hyperkalaemia in Adults. 2023.', url: 'https://www.ukkidney.org/sites/default/files/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20191223_0.pdf', supports: 'Clasificacion, ECG, confirmacion y escalada.' },
    { label: 'Resuscitation Council UK. Emergency treatment of hyperkalaemia algorithm.', url: 'https://www.resus.org.uk/library/additional-guidance/guidance-hyperkalaemia', supports: 'Actuacion ante hiperpotasemia grave y ECG de riesgo.' },
  ],
};

export const decisionProtocols = [hyperkalemiaProtocol];
