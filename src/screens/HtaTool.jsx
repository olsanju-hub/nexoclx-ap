import { useMemo, useState } from 'react';
import { DetailHeader } from '../components/detail/DetailHeader.jsx';
import { htaSupportTools } from '../data/htaSupportTools.js';
import { adverseEvents, drugGroups, htaSources, treatmentSteps } from '../data/htaTool.js';

const initialValues = {
  sbp: '',
  dbp: '',
  situation: 'new',
  currentTreatment: 'none',
  problem: 'none',
  diabetes: false,
  ckd: false,
  cvd: false,
  frailty: false,
  ageAdvanced: false,
  falls: false,
  hyperkalemia: false,
  renalDrop: false,
  gout: false,
  asthmaCopd: false,
  bradycardia: false,
  adherenceKnown: false,
  drugIntolerance: false,
  riskCategory: 'none',
  transferNote: '',
};

const situations = {
  new: 'Nuevo / no tratado',
  treated: 'Diagnosticado y tratado',
  uncontrolled: 'Mal control pese a tratamiento',
  frail: 'Anciano o frágil',
  diabetes: 'Diabetes',
  ckd: 'ERC',
  cvd: 'ECV establecida',
  emergency: 'Sospecha urgencia/emergencia',
  pregnancy: 'Embarazo',
};

const treatments = {
  none: 'Ninguno',
  ace: 'IECA',
  arb: 'ARA-II',
  ccb: 'Calcioantagonista',
  diuretic: 'Diurético',
  dual: 'Doble terapia',
  triple: 'Triple terapia',
  spironolactone: 'Espironolactona',
  beta: 'Betabloqueante',
  other: 'Otro',
};

const problems = {
  none: 'Sin problema específico',
  uncontrolled: 'No controla',
  'ace-cough': 'Tos',
  angioedema: 'Angioedema',
  'ccb-edema': 'Edema maleolar',
  hyperkalemia: 'Hiperpotasemia',
  'renal-drop': 'Deterioro función renal',
  hyponatremia: 'Hiponatremia',
  hypokalemia: 'Hipopotasemia',
  'symptomatic-hypotension': 'Hipotensión sintomática',
  'beta-brady': 'Bradicardia',
  adherence: 'Mala adherencia',
  intolerance: 'Intolerancia',
};

const riskCategories = {
  none: 'No aportado',
  moderate: 'Riesgo bajo-moderado',
  high: 'Riesgo alto',
  veryHigh: 'Riesgo muy alto',
};

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function classifyBp(sbp, dbp) {
  if (sbp === null || dbp === null) return { label: 'Pendiente', severity: 'No clasificada', tone: 'neutral' };
  if (sbp >= 180 || dbp >= 110) return { label: 'HTA severa', severity: 'Alta', tone: 'alert' };
  if (sbp >= 160 || dbp >= 100) return { label: 'HTA grado 2', severity: 'Alta', tone: 'alert' };
  if (sbp >= 140 || dbp >= 90) return { label: 'HTA grado 1', severity: 'Moderada', tone: 'warning' };
  if (sbp >= 120 || dbp >= 70) return { label: 'TA elevada', severity: 'Baja-intermedia', tone: 'warning' };
  return { label: 'TA no elevada', severity: 'Baja', tone: 'ok' };
}

function findAdverse(problem) {
  if (problem === 'intolerance') return adverseEvents.find((event) => event.id === 'adherence');
  return adverseEvents.find((event) => event.id === problem);
}

function buildRecommendation(values, calculated) {
  const sbp = toNumber(values.sbp);
  const dbp = toNumber(values.dbp);
  const classification = classifyBp(sbp, dbp);
  const isComplete = sbp !== null && dbp !== null;
  const highRisk = values.diabetes || values.ckd || values.cvd || values.situation === 'diabetes' || values.situation === 'ckd' || values.situation === 'cvd' || values.riskCategory === 'high' || values.riskCategory === 'veryHigh';
  const frail = values.frailty || values.ageAdvanced || values.falls || values.situation === 'frail';
  const ram = findAdverse(values.problem);

  if (!calculated) {
    return {
      classification,
      title: 'Introduce datos y calcula',
      objective: 'Pendiente',
      now: 'Completa cifras, contexto, antecedentes y tratamiento actual.',
      treatment: 'Pendiente.',
      dose: 'Pendiente.',
      alternative: 'Pendiente.',
      check: 'PAS, PAD, situación, antecedentes y tratamiento.',
      followUp: 'Pendiente.',
      escalate: 'Pendiente.',
      refer: 'Urgencias si hay clínica de daño agudo.',
      source: 'Ver B.',
    };
  }

  if (!isComplete) {
    return {
      classification,
      title: 'Faltan PAS/PAD',
      objective: 'No decidir sin cifras.',
      now: 'Repetir medición correcta.',
      treatment: 'No iniciar ni intensificar con datos incompletos.',
      dose: 'No aplica.',
      alternative: 'AMPA/MAPA si procede.',
      check: 'Técnica, manguito y varias tomas.',
      followUp: 'Registrar cifras válidas.',
      escalate: 'No aplica.',
      refer: 'Urgencias si síntomas de daño agudo.',
      source: 'NICE NG136.',
    };
  }

  if (values.situation === 'pregnancy') {
    return {
      classification,
      title: 'Embarazo: protocolo no aplicable',
      objective: 'Ruta específica obstétrica.',
      now: 'No usar este protocolo AP adulto general.',
      treatment: 'No IECA/ARA-II.',
      dose: 'No aplica.',
      alternative: 'Circuito de embarazo/obstetricia.',
      check: 'Síntomas de preeclampsia y TA repetida.',
      followUp: 'Según circuito obstétrico.',
      escalate: 'Si clínica de alarma.',
      refer: 'Urgencias/obstetricia si cefalea, visión, epigastralgia, disnea o TA severa.',
      source: 'Exclusión de seguridad.',
    };
  }

  if (values.situation === 'emergency' || (classification.label === 'HTA severa' && values.problem !== 'none')) {
    return {
      classification,
      title: 'Descartar emergencia hipertensiva',
      objective: 'No descenso brusco ambulatorio.',
      now: 'Buscar daño agudo y derivar si clínica compatible.',
      treatment: 'No sustituir urgencias por pauta oral.',
      dose: 'No iniciar dosis de rescate en AP.',
      alternative: 'Repetir TA, monitorizar y documentar.',
      check: 'Dolor torácico, disnea, focalidad, confusión, visión, síncope, dolor dorsal.',
      followUp: 'Inmediato según estabilidad.',
      escalate: 'Cualquier dato de daño agudo.',
      refer: 'Urgencias.',
      source: 'ESC 2024 / NICE NG136.',
    };
  }

  if (ram) {
    return {
      classification,
      title: ram.label,
      objective: 'Mantener control sin perpetuar RAM.',
      now: ram.action,
      treatment: ram.suspicion,
      dose: 'Ajustar según familia alternativa y TA.',
      alternative: ram.alternative,
      check: ram.check,
      followUp: ram.followUp,
      escalate: 'Si persiste no control o RAM limita tratamiento.',
      refer: ram.urgent,
      source: 'CIMA/AEMPS y guías HTA.',
    };
  }

  if (classification.label === 'TA no elevada') {
    return {
      classification,
      title: 'Sin HTA con estas cifras',
      objective: 'Mantener control periódico.',
      now: 'No iniciar antihipertensivo por estas cifras.',
      treatment: 'Medidas saludables según riesgo.',
      dose: 'No aplica.',
      alternative: 'Revisar riesgo cardiovascular.',
      check: 'Técnica y contexto si hay discordancia.',
      followUp: 'Programado según riesgo.',
      escalate: 'Si cifras repetidas elevadas.',
      refer: 'No precisa por estas cifras.',
      source: 'ESC 2024 / NICE NG136.',
    };
  }

  if (classification.label === 'TA elevada') {
    return {
      classification,
      title: 'Confirmar y actuar sobre riesgo',
      objective: highRisk ? 'Individualizar hacia <130/80 si tolera.' : 'Evitar progresión a HTA.',
      now: 'Confirmar con tomas repetidas, AMPA o MAPA.',
      treatment: highRisk ? 'Medidas no farmacológicas; valorar fármaco si riesgo alto.' : 'Medidas no farmacológicas.',
      dose: highRisk ? 'Si se inicia: SRAA a dosis baja según perfil.' : 'Sin dosis inicial por defecto.',
      alternative: 'Revisar sal, alcohol, peso, AINE y otros fármacos.',
      check: 'Riesgo CV, ERC, diabetes, lesión de órgano.',
      followUp: highRisk ? '1-3 meses.' : '3-6 meses.',
      escalate: 'Si confirma HTA o riesgo alto.',
      refer: 'Si sospecha secundaria o daño de órgano.',
      source: 'ESC 2024 / NICE NG136.',
    };
  }

  if (frail) {
    return {
      classification,
      title: 'Tratamiento prudente',
      objective: 'Objetivo individualizado; evitar hipotensión.',
      now: 'Medir sentado/de pie y revisar caídas.',
      treatment: 'Monoterapia a dosis baja; titular lento.',
      dose: 'Amlodipino 5 mg/24 h, losartán 50 mg/24 h o ramipril 1,25-2,5 mg/24 h.',
      alternative: 'Reducir último fármaco si ortostatismo.',
      check: 'Mareo, caídas, FC, función renal/electrolitos.',
      followUp: '2-4 semanas.',
      escalate: 'Solo si persiste HTA y tolera.',
      refer: 'Síncope, caídas graves, deterioro renal o síntomas agudos.',
      source: 'ESC 2024 / NICE NG136 / CIMA.',
    };
  }

  if (values.situation === 'uncontrolled' || values.situation === 'treated' || values.problem === 'uncontrolled' || values.currentTreatment !== 'none') {
    const resistant = values.currentTreatment === 'triple' || values.currentTreatment === 'spironolactone';
    return {
      classification,
      title: resistant ? 'Valorar HTA resistente' : 'HTA no controlada',
      objective: 'Control con técnica y adherencia verificadas.',
      now: 'Comprobar medida, AMPA/MAPA, adherencia y dosis.',
      treatment: resistant ? 'Confirmar triple terapia optimizada; valorar 4º fármaco y derivación.' : 'Optimizar dosis o pasar a combinación.',
      dose: resistant ? 'Espironolactona 25 mg/24 h si eGFR y K lo permiten.' : (values.currentTreatment === 'dual' ? 'Pasar a triple: SRAA + CCB + tiazida/tiazida-like.' : 'Pasar a doble: SRAA + amlodipino 5 mg/24 h.'),
      alternative: 'Cambiar familia si RAM o contraindicación.',
      check: 'Creatinina/eGFR, sodio, potasio, interacciones, AINE, sal, alcohol.',
      followUp: '2-4 semanas; analítica si SRAA/diurético/espironolactona.',
      escalate: 'Si sigue fuera de objetivo con adherencia confirmada.',
      refer: resistant ? 'Derivar si HTA resistente confirmada.' : 'Derivar si sospecha secundaria, daño órgano o mala respuesta.',
      source: 'ESC 2024 / NICE NG136 / CIMA.',
    };
  }

  if (classification.label === 'HTA grado 1') {
    return {
      classification,
      title: 'Confirmar HTA',
      objective: highRisk ? 'Objetivo estricto si tolera.' : 'Reducir riesgo con control sostenido.',
      now: 'Confirmar AMPA/MAPA salvo alto riesgo o cifras repetidas.',
      treatment: highRisk ? 'Iniciar fármaco + medidas.' : 'Medidas; fármaco si confirma HTA/riesgo alto.',
      dose: highRisk ? 'Ramipril 1,25-2,5 mg/24 h o losartán 50 mg/24 h; añadir amlodipino 5 mg si precisa.' : 'Amlodipino 5 mg/24 h, losartán 50 mg/24 h o ramipril 1,25-2,5 mg/24 h.',
      alternative: 'ARA-II si tos por IECA.',
      check: 'Riesgo CV, ERC, diabetes, potasio/creatinina si SRAA.',
      followUp: '4 semanas si inicia/ajusta.',
      escalate: 'Si no controla: titular o doble terapia.',
      refer: 'Sospecha secundaria, daño órgano o mala respuesta.',
      source: 'ESC 2024 / NICE NG136 / CIMA.',
    };
  }

  return {
    classification,
    title: classification.label === 'HTA severa' ? 'HTA severa sin datos de daño' : 'Iniciar tratamiento',
    objective: highRisk ? 'Individualizar; buscar control si tolera.' : 'Control sostenido y seguro.',
    now: classification.label === 'HTA severa' ? 'Repetir TA y buscar daño agudo.' : 'Confirmar técnica e iniciar tratamiento.',
    treatment: 'Combinación salvo fragilidad: SRAA + CCB o SRAA + diurético.',
    dose: 'Losartán 50 mg/24 h + amlodipino 5 mg/24 h; alternativa ramipril 1,25-2,5 mg/24 h + amlodipino 5 mg/24 h.',
    alternative: 'SRAA + tiazida/tiazida-like si CCB no tolerado.',
    check: 'Creatinina/eGFR, sodio, potasio y riesgo de RAM.',
    followUp: '2-4 semanas.',
    escalate: 'Si no controla: titular y pasar a triple terapia.',
    refer: classification.label === 'HTA severa' ? 'Urgencias si síntomas; derivación preferente si persiste.' : 'Derivar si sospecha secundaria/daño órgano.',
    source: 'ESC 2024 / NICE NG136 / CIMA.',
  };
}

function Field({ label, children }) {
  return (
    <label className="hta-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="hta-result-row">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

function BibliographyModal({ onClose }) {
  return (
    <div className="hta-modal-backdrop" role="presentation">
      <section className="hta-modal" role="dialog" aria-modal="true" aria-labelledby="hta-bibliography-title">
        <div className="hta-modal-header">
          <h2 id="hta-bibliography-title">Bibliografía</h2>
          <button type="button" onClick={onClose}>Cerrar</button>
        </div>
        <div className="hta-source-list">
          {htaSources.map((source) => (
            <article key={source.label}>
              <h3>{source.label}</h3>
              <p>{source.supports}</p>
              <a href={source.url} target="_blank" rel="noreferrer">{source.url}</a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function HtaTool({ onBack, onOpenTool, incomingContext }) {
  const [values, setValues] = useState(() => ({ ...initialValues, ...(incomingContext?.values ?? {}) }));
  const [calculated, setCalculated] = useState(Boolean(incomingContext?.autoCalculate));
  const [showBibliography, setShowBibliography] = useState(false);
  const recommendation = useMemo(() => buildRecommendation(values, calculated), [calculated, values]);

  const updateValue = (id, value) => {
    setValues((current) => ({ ...current, [id]: value }));
    setCalculated(false);
  };

  return (
    <div className="screen detail-screen hta-tool">
      <div className="hta-protocol-header">
        <DetailHeader title="HTA" subtitle="Decisión terapéutica en Atención Primaria" onBack={onBack} />
        <button className="hta-bibliography-button" type="button" onClick={() => setShowBibliography(true)} aria-label="Abrir bibliografía">B</button>
      </div>

      <section className="hta-grid hta-main-grid">
        <div className="hta-card hta-input-card">
          <h2>Datos del paciente</h2>
          <div className="hta-two-col">
            <Field label="PAS">
              <input inputMode="numeric" min="60" max="260" type="number" value={values.sbp} onChange={(event) => updateValue('sbp', event.target.value)} placeholder="mmHg" />
            </Field>
            <Field label="PAD">
              <input inputMode="numeric" min="30" max="160" type="number" value={values.dbp} onChange={(event) => updateValue('dbp', event.target.value)} placeholder="mmHg" />
            </Field>
          </div>
          <Field label="Situación">
            <select value={values.situation} onChange={(event) => updateValue('situation', event.target.value)}>
              {Object.entries(situations).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Tratamiento actual">
            <select value={values.currentTreatment} onChange={(event) => updateValue('currentTreatment', event.target.value)}>
              {Object.entries(treatments).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Problema actual">
            <select value={values.problem} onChange={(event) => updateValue('problem', event.target.value)}>
              {Object.entries(problems).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Riesgo CV">
            <select value={values.riskCategory} onChange={(event) => updateValue('riskCategory', event.target.value)}>
              {Object.entries(riskCategories).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </Field>
          {values.transferNote && <p className="hta-transfer-note">{values.transferNote}</p>}
          <div className="hta-check-grid hta-compact-checks">
            {[
              ['diabetes', 'Diabetes'],
              ['ckd', 'ERC'],
              ['cvd', 'ECV establecida'],
              ['frailty', 'Fragilidad'],
              ['ageAdvanced', 'Edad avanzada'],
              ['falls', 'Caídas/ortostatismo'],
              ['hyperkalemia', 'HiperK previa'],
              ['renalDrop', 'Deterioro renal SRAA'],
              ['gout', 'Gota/hiperuricemia'],
              ['asthmaCopd', 'Asma/EPOC'],
              ['bradycardia', 'Bradicardia'],
              ['adherenceKnown', 'Mala adherencia conocida'],
              ['drugIntolerance', 'Intolerancias farmacológicas'],
            ].map(([id, label]) => (
              <label key={id}>
                <input type="checkbox" checked={values[id]} onChange={(event) => updateValue(id, event.target.checked)} />
                {label}
              </label>
            ))}
          </div>
          <button className="hta-primary-action" type="button" onClick={() => setCalculated(true)}>Calcular conducta</button>
        </div>

        <div className={`hta-result-card is-${recommendation.classification.tone}`}>
          <span className="hta-status">{recommendation.classification.label}</span>
          <h2>{recommendation.title}</h2>
          <ResultRow label="Clasificación" value={`${recommendation.classification.label}. Gravedad: ${recommendation.classification.severity}.`} />
          <ResultRow label="Objetivo terapéutico" value={recommendation.objective} />
          <ResultRow label="Qué hacer ahora" value={recommendation.now} />
          <ResultRow label="Tratamiento recomendado" value={recommendation.treatment} />
          <ResultRow label="Dosis inicial / ajuste" value={recommendation.dose} />
          <ResultRow label="Alternativa si contraindicación o RAM" value={recommendation.alternative} />
          <ResultRow label="Qué comprobar" value={recommendation.check} />
          <ResultRow label="Seguimiento" value={recommendation.followUp} />
          <ResultRow label="Escalar si" value={recommendation.escalate} />
          <ResultRow label="Derivar / urgencias si" value={recommendation.refer} />
          <ResultRow label="Fuente" value={recommendation.source} />
        </div>
      </section>

      <section className="hta-accordion-stack" aria-label="Consulta rápida HTA">
        <details>
          <summary>Escalada terapéutica</summary>
          <div className="hta-step-list">
            {treatmentSteps.map((step) => (
              <article className="hta-step" key={step.title}>
                <span>{step.condition}</span>
                <h3>{step.title}</h3>
                <p>{step.action}</p>
              </article>
            ))}
          </div>
        </details>

        <details>
          <summary>Dosis rápidas</summary>
          <div className="hta-drug-groups">
            {drugGroups.map((group) => (
              <article className="hta-drug-group" key={group.group}>
                <h3>{group.group}</h3>
                <p>{group.role}</p>
                <div className="hta-drug-list">
                  {group.drugs.map((drug) => (
                    <div className="hta-drug" key={drug.name}>
                      <strong>{drug.name}</strong>
                      <dl>
                        <div><dt>Inicio</dt><dd>{drug.start}</dd></div>
                        <div><dt>Habitual</dt><dd>{drug.usual}</dd></div>
                        <div><dt>Máx.</dt><dd>{drug.max}</dd></div>
                        <div><dt>Frecuencia</dt><dd>{drug.frequency}</dd></div>
                      </dl>
                      <p>{drug.notes}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </details>

        <details>
          <summary>RAM / cambios</summary>
          <div className="hta-step-list">
            {adverseEvents.map((event) => (
              <article className="hta-step" key={event.id}>
                <span>{event.label}</span>
                <h3>{event.action}</h3>
                <p>{event.alternative}</p>
              </article>
            ))}
          </div>
        </details>

        <details>
          <summary>Seguimiento / derivación</summary>
          <div className="hta-step-list">
            <article className="hta-step"><span>Inicio o ajuste</span><h3>Revisar en 2-4 semanas</h3><p>TA, tolerancia y adherencia.</p></article>
            <article className="hta-step"><span>SRAA / diurético</span><h3>Analítica</h3><p>Creatinina/eGFR, sodio y potasio.</p></article>
            <article className="hta-step"><span>No control</span><h3>Escalar</h3><p>Titular, doble/triple terapia o HTA resistente.</p></article>
            <article className="hta-step"><span>Alarma</span><h3>Derivar</h3><p>Daño agudo, sospecha secundaria, embarazo, daño de órgano o HTA resistente.</p></article>
          </div>
        </details>

        <details>
          <summary>Herramientas de apoyo</summary>
          <div className="hta-tool-link-grid">
            {htaSupportTools.map((tool) => (
              <button type="button" key={tool.id} onClick={() => onOpenTool?.(tool.id)}>
                <span>{tool.title}</span>
                <small>{tool.status}</small>
              </button>
            ))}
          </div>
        </details>
      </section>

      {showBibliography && <BibliographyModal onClose={() => setShowBibliography(false)} />}
    </div>
  );
}
