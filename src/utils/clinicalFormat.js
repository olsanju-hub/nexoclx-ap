export function numberValue(value) {
  return Number(String(value).replace(',', '.'));
}

export function calculateBasal(values) {
  const weight = numberValue(values.weight);
  const age = numberValue(values.age);
  const fasting = numberValue(values.fasting);
  const fragile = Boolean(values.fragile) || age >= 80;
  const risk = Boolean(values.risk);
  if (!weight || !age || !fasting) return ['Faltan datos obligatorios.'];
  if (risk) {
    return [
      'No calcular pauta ambulatoria: hay situación de riesgo.',
      'Valorar urgencias, cetonas, hidratación, infección, embarazo o sospecha de DM1.',
    ];
  }
  const byWeight = weight * (fragile ? 0.1 : 0.2);
  const dose = Math.max(6, Math.min(10, byWeight));
  const rounded = Math.round(dose);
  const target = fragile ? '110-150 mg/dl' : '80-130 mg/dl';
  const titration = fasting > (fragile ? 150 : 130)
    ? 'si la mediana de 3 glucemias basales sigue por encima del objetivo y no hay hipoglucemia, subir 2 UI cada 3 días.'
    : 'no subir dosis ahora; mantener y revisar hipoglucemias, técnica y HbA1c.';
  return [
    `Dosis inicial orientativa: ${rounded} UI SC cada 24 h (glargina U100 u otra basal según ficha y disponibilidad).`,
    `Objetivo basal inicial: ${target}.`,
    `Titulación: ${titration}`,
    'Reducir: 10-20% si glucemia <70 mg/dl, hipoglucemia nocturna o reducción brusca de ingesta.',
    'Autocontroles: basal diaria al inicio; añadir controles si síntomas, conducción, ejercicio inhabitual o hipoglucemia.',
    'Revisión: contacto en 3-7 días y revisión en 1-2 semanas.',
  ];
}

export function calculateRenal(values) {
  const age = numberValue(values.age);
  const weight = numberValue(values.weight);
  let creatinine = numberValue(values.creatinine);
  if (values.unit === 'umol') creatinine /= 88.4;
  if (!age || !weight || !creatinine) return ['Faltan datos obligatorios.'];
  let clcr = ((140 - age) * weight) / (72 * creatinine);
  if (values.sex === 'female') clcr *= 0.85;
  const rounded = Math.round(clcr);
  const range = rounded < 30 ? '<30 ml/min' : rounded < 60 ? '30-59 ml/min' : rounded < 90 ? '60-89 ml/min' : '>=90 ml/min';
  return [
    `ClCr Cockcroft-Gault: ${rounded} ml/min (${range}).`,
    'Usar solo para fármacos cuya ficha técnica pida ClCr; si pide eGFR/CKD-EPI, no sustituirlo por este cálculo.',
  ];
}
