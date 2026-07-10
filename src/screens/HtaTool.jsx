import { useMemo, useState } from 'react';
import { DetailHeader } from '../components/detail/DetailHeader.jsx';
import { adverseEvents, drugGroups, htaSources, treatmentSteps } from '../data/htaTool.js';

const initialValues = {
  sbp: '',
  dbp: '',
  context: 'new',
  currentTreatment: 'none',
  emergencySymptoms: false,
  pregnancy: false,
  frailty: false,
  diabetesCkd: false,
};

const contextLabels = {
  new: 'Nuevo / no tratado',
  treated: 'Ya tratado',
  frail: 'Anciano o frágil',
  diabetesCkd: 'Diabetes o ERC',
  emergency: 'Sospecha de urgencia/emergencia',
  pregnancy: 'Embarazo',
};

const treatmentLabels = {
  none: 'Ninguno',
  ace: 'IECA',
  arb: 'ARA-II',
  ccb: 'Calcioantagonista',
  diuretic: 'Diurético',
  dual: 'Doble terapia',
  triple: 'Triple terapia',
  spironolactone: 'Espironolactona',
  other: 'Otros',
};

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function classifyBp(sbp, dbp) {
  if (sbp === null || dbp === null) {
    return {
      label: 'Pendiente',
      severity: 'Datos incompletos',
      tone: 'neutral',
      needsConfirmation: true,
    };
  }

  if (sbp >= 180 || dbp >= 110) {
    return {
      label: 'HTA severa',
      severity: 'Alta',
      tone: 'alert',
      needsConfirmation: false,
    };
  }
  if (sbp >= 160 || dbp >= 100) {
    return {
      label: 'HTA grado 2',
      severity: 'Alta',
      tone: 'alert',
      needsConfirmation: true,
    };
  }
  if (sbp >= 140 || dbp >= 90) {
    return {
      label: 'HTA grado 1',
      severity: 'Moderada',
      tone: 'warning',
      needsConfirmation: true,
    };
  }
  if (sbp >= 120 || dbp >= 70) {
    return {
      label: 'Presión arterial elevada',
      severity: 'Baja-intermedia',
      tone: 'warning',
      needsConfirmation: true,
    };
  }

  return {
    label: 'TA no elevada',
    severity: 'Baja',
    tone: 'ok',
    needsConfirmation: false,
  };
}

function buildRecommendation(values) {
  const sbp = toNumber(values.sbp);
  const dbp = toNumber(values.dbp);
  const classification = classifyBp(sbp, dbp);
  const isComplete = sbp !== null && dbp !== null;
  const highRiskContext = values.context === 'diabetesCkd' || values.diabetesCkd;
  const frailContext = values.context === 'frail' || values.frailty;
  const emergencyContext = values.context === 'emergency' || values.emergencySymptoms;
  const pregnancyContext = values.context === 'pregnancy' || values.pregnancy;
  const alreadyTreated = values.context === 'treated' || values.currentTreatment !== 'none';

  if (!isComplete) {
    return {
      classification,
      title: 'Introduce PAS y PAD',
      risk: 'No clasificado',
      now: 'Completa cifras de TA antes de decidir.',
      treatment: 'No iniciar ni intensificar solo con datos incompletos.',
      dose: 'Sin dosis hasta clasificar.',
      alternative: 'Repetir medición con técnica correcta.',
      followUp: 'Registrar varias tomas si la situación clínica lo permite.',
      escalate: 'No aplica.',
      refer: 'Urgencias si hay síntomas de daño agudo aunque falten cifras completas.',
    };
  }

  if (pregnancyContext) {
    return {
      classification,
      title: 'Embarazo: ruta no aplicable',
      risk: 'Exclusión de esta herramienta AP adulta general',
      now: 'No usar esta herramienta para manejo de HTA en embarazo.',
      treatment: 'No sugerir IECA/ARA-II. Derivar a ruta específica de embarazo/obstetricia.',
      dose: 'No aplica en esta herramienta.',
      alternative: 'Confirmar TA y contactar circuito obstétrico según contexto.',
      followUp: 'Seguimiento por circuito específico.',
      escalate: 'Cualquier sospecha de preeclampsia o clínica de alarma requiere valoración urgente.',
      refer: 'Urgencias/obstetricia si cefalea intensa, alteración visual, epigastralgia, disnea, edema brusco o TA severa.',
    };
  }

  if (emergencyContext || (classification.label === 'HTA severa' && values.emergencySymptoms)) {
    return {
      classification,
      title: 'Descartar emergencia hipertensiva',
      risk: 'Alta',
      now: 'Buscar daño agudo de órgano diana y derivar a urgencias si hay clínica compatible.',
      treatment: 'No buscar descenso brusco ambulatorio si hay sospecha de emergencia.',
      dose: 'Sin pauta oral de AP como sustituto de valoración urgente.',
      alternative: 'Monitorizar, repetir TA y documentar síntomas mientras se organiza derivación.',
      followUp: 'Reevaluación inmediata según estabilidad.',
      escalate: 'Activar urgencias si dolor torácico, disnea, focalidad, confusión, alteración visual, síncope o dolor dorsal brusco.',
      refer: 'Urgencias si TA severa con síntomas o cualquier dato de daño agudo.',
    };
  }

  if (classification.label === 'TA no elevada') {
    return {
      classification,
      title: 'Sin HTA con las cifras introducidas',
      risk: 'Baja',
      now: 'Mantener controles periódicos según riesgo global.',
      treatment: 'No iniciar antihipertensivo por estas cifras.',
      dose: 'No aplica.',
      alternative: 'Revisar estilo de vida y riesgo cardiovascular.',
      followUp: 'Control programado según antecedentes y riesgo.',
      escalate: 'Reevaluar si aparecen cifras repetidas elevadas o síntomas.',
      refer: 'No precisa derivación por estas cifras aisladas.',
    };
  }

  if (classification.label === 'Presión arterial elevada') {
    return {
      classification,
      title: 'Confirmar y tratar riesgo global',
      risk: highRiskContext ? 'Intermedia por contexto de riesgo' : 'Baja-intermedia',
      now: 'Confirmar con mediciones repetidas, AMPA o MAPA si procede.',
      treatment: highRiskContext ? 'Medidas no farmacológicas y valorar tratamiento si riesgo cardiovascular alto o daño de órgano.' : 'Medidas no farmacológicas como primera intervención.',
      dose: highRiskContext ? 'Si se decide fármaco: iniciar una familia de primera línea a dosis baja según perfil.' : 'Sin dosis farmacológica inicial por defecto.',
      alternative: 'Revisar fármacos que eleven TA, sal, alcohol, peso y actividad física.',
      followUp: highRiskContext ? 'Revisar en 1-3 meses según riesgo.' : 'Revisar en 3-6 meses o antes si suben cifras.',
      escalate: 'Escalar si se confirma HTA o hay alto riesgo/lesión de órgano.',
      refer: 'Derivar si sospecha secundaria, lesión de órgano o cifras severas.',
    };
  }

  if (frailContext) {
    return {
      classification,
      title: 'Tratamiento prudente por fragilidad',
      risk: classification.severity,
      now: 'Confirmar técnica y síntomas ortostáticos. Individualizar objetivo.',
      treatment: 'Iniciar o ajustar monoterapia a dosis bajas; evitar intensificación rápida.',
      dose: 'Opciones: amlodipino 5 mg/24 h, losartán 50 mg/24 h o ramipril 1,25-2,5 mg/24 h según perfil y tolerancia.',
      alternative: 'Si hipotensión ortostática, reducir dosis o desescalar el último fármaco añadido.',
      followUp: 'Revisar TA sentado/de pie, caídas, mareo y tolerancia en 2-4 semanas.',
      escalate: 'Subir dosis o combinar solo si persiste HTA y lo tolera.',
      refer: 'Derivar/urgencias si síntomas de daño agudo, caídas repetidas, síncope o deterioro renal/electrolítico.',
    };
  }

  if (alreadyTreated) {
    if (values.currentTreatment === 'triple' || values.currentTreatment === 'spironolactone') {
      return {
        classification,
        title: 'No control con tratamiento avanzado',
        risk: 'Alta si TA persiste elevada',
        now: 'Confirmar adherencia, técnica, AMPA/MAPA, dosis toleradas y causas secundarias.',
        treatment: 'Si triple terapia optimizada no controla, valorar HTA resistente.',
        dose: 'Considerar espironolactona 25 mg/24 h si eGFR y potasio lo permiten; monitorizar estrechamente.',
        alternative: 'Si no procede espironolactona, valorar otra estrategia y derivación.',
        followUp: 'Analítica de función renal/electrolitos tras cambios y revisión en 2-4 semanas.',
        escalate: 'Derivar si confirma HTA resistente, daño de órgano, ERC progresiva o sospecha secundaria.',
        refer: 'Urgencias si síntomas de daño agudo o TA severa sintomática.',
      };
    }

    return {
      classification,
      title: 'HTA no controlada en tratamiento',
      risk: classification.severity,
      now: 'Comprobar adherencia, técnica de medida, AMPA/MAPA y dosis actuales.',
      treatment: 'Optimizar dosis y pasar a combinación si no está ya combinada.',
      dose: values.currentTreatment === 'dual' ? 'Escalar a triple: SRAA + calcioantagonista + diurético tiazídico/tiazida-like.' : 'Si monoterapia: pasar a doble terapia, por ejemplo SRAA + amlodipino 5 mg/24 h.',
      alternative: 'Si RAM o intolerancia, cambiar familia antes de añadir fármacos.',
      followUp: 'Revisar en 2-4 semanas tras intensificación y pedir creatinina/electrolitos si SRAA o diurético.',
      escalate: 'Escalar si TA sigue fuera de objetivo con adherencia confirmada.',
      refer: 'Derivar si triple terapia optimizada no controla o hay sospecha secundaria/daño de órgano.',
    };
  }

  if (classification.label === 'HTA grado 1') {
    return {
      classification,
      title: 'Confirmar HTA y decidir inicio',
      risk: highRiskContext ? 'Moderada-alta por contexto' : 'Moderada',
      now: 'Confirmar con AMPA/MAPA salvo cifras repetidas claras o alto riesgo.',
      treatment: highRiskContext ? 'Iniciar tratamiento farmacológico junto a medidas no farmacológicas.' : 'Medidas no farmacológicas; iniciar fármaco si se confirma HTA o hay riesgo alto.',
      dose: highRiskContext ? 'Preferir SRAA: ramipril 1,25-2,5 mg/24 h o losartán 50 mg/24 h; combinar con amlodipino 5 mg si precisa.' : 'Monoterapia razonable: amlodipino 5 mg/24 h, losartán 50 mg/24 h o ramipril 1,25-2,5 mg/24 h según perfil.',
      alternative: 'Si tos con IECA, cambiar a ARA-II.',
      followUp: 'Revisar en 4 semanas si inicia o ajusta fármaco; antes si alto riesgo.',
      escalate: 'Si no controla, titular o pasar a doble terapia.',
      refer: 'Derivar si sospecha secundaria, daño de órgano, embarazo o mala respuesta persistente.',
    };
  }

  return {
    classification,
    title: classification.label === 'HTA grado 2' ? 'Iniciar tratamiento y confirmar control' : 'HTA severa sin síntomas declarados',
    risk: classification.severity,
    now: classification.label === 'HTA severa' ? 'Repetir TA, buscar síntomas de daño agudo y valorar urgencias aunque esté asintomático.' : 'Confirmar técnica, iniciar tratamiento y programar control estrecho.',
    treatment: 'Tratamiento combinado salvo fragilidad: IECA/ARA-II + calcioantagonista o IECA/ARA-II + diurético tiazídico/tiazida-like.',
    dose: 'Ejemplos: losartán 50 mg/24 h + amlodipino 5 mg/24 h; o ramipril 1,25-2,5 mg/24 h + amlodipino 5 mg/24 h.',
    alternative: 'Si edema por calcioantagonista, reducir/cambiar o combinar con SRAA. Si tos por IECA, cambiar a ARA-II.',
    followUp: 'Revisar en 2-4 semanas; analítica si SRAA o diurético.',
    escalate: 'Si no controla, titular dosis y pasar a triple terapia.',
    refer: classification.label === 'HTA severa' ? 'Urgencias si cualquier síntoma de daño agudo; derivación preferente si persiste severa sin causa clara.' : 'Derivar si sospecha secundaria, daño de órgano o mala respuesta.',
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

export function HtaTool({ onBack }) {
  const [activeTab, setActiveTab] = useState('evaluate');
  const [values, setValues] = useState(initialValues);
  const [selectedAdverse, setSelectedAdverse] = useState(adverseEvents[0].id);

  const recommendation = useMemo(() => buildRecommendation(values), [values]);
  const selectedAdverseEvent = adverseEvents.find((item) => item.id === selectedAdverse) ?? adverseEvents[0];

  const updateValue = (id, value) => {
    setValues((current) => ({ ...current, [id]: value }));
  };

  return (
    <div className="screen detail-screen hta-tool">
      <DetailHeader
        title="HTA"
        subtitle="Herramienta de Atención Primaria adulta para evaluar cifras, orientar tratamiento, escalada, RAM y seguimiento."
        onBack={onBack}
      />

      <nav className="hta-tabs" aria-label="Secciones HTA">
        {[
          ['evaluate', 'Evaluar TA'],
          ['treatment', 'Tratamiento'],
          ['doses', 'Dosis'],
          ['adverse', 'RAM'],
          ['followup', 'Seguimiento'],
        ].map(([id, label]) => (
          <button key={id} className={activeTab === id ? 'is-active' : ''} type="button" onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </nav>

      {activeTab === 'evaluate' && (
        <section className="hta-grid">
          <div className="hta-card">
            <h2>Evaluar TA</h2>
            <div className="hta-two-col">
              <Field label="PAS">
                <input inputMode="numeric" min="60" max="260" type="number" value={values.sbp} onChange={(event) => updateValue('sbp', event.target.value)} placeholder="mmHg" />
              </Field>
              <Field label="PAD">
                <input inputMode="numeric" min="30" max="160" type="number" value={values.dbp} onChange={(event) => updateValue('dbp', event.target.value)} placeholder="mmHg" />
              </Field>
            </div>
            <Field label="Contexto">
              <select value={values.context} onChange={(event) => updateValue('context', event.target.value)}>
                {Object.entries(contextLabels).map(([value, label]) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </Field>
            <Field label="Tratamiento actual">
              <select value={values.currentTreatment} onChange={(event) => updateValue('currentTreatment', event.target.value)}>
                {Object.entries(treatmentLabels).map(([value, label]) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </Field>
            <div className="hta-check-grid">
              <label><input type="checkbox" checked={values.emergencySymptoms} onChange={(event) => updateValue('emergencySymptoms', event.target.checked)} /> Síntomas de daño agudo</label>
              <label><input type="checkbox" checked={values.diabetesCkd} onChange={(event) => updateValue('diabetesCkd', event.target.checked)} /> Diabetes o ERC</label>
              <label><input type="checkbox" checked={values.frailty} onChange={(event) => updateValue('frailty', event.target.checked)} /> Fragilidad / ortostatismo</label>
              <label><input type="checkbox" checked={values.pregnancy} onChange={(event) => updateValue('pregnancy', event.target.checked)} /> Embarazo</label>
            </div>
          </div>

          <div className={`hta-result-card is-${recommendation.classification.tone}`}>
            <span className="hta-status">{recommendation.classification.label}</span>
            <h2>{recommendation.title}</h2>
            <ResultRow label="Riesgo/gravedad" value={recommendation.risk} />
            <ResultRow label="Qué hacer ahora" value={recommendation.now} />
            <ResultRow label="Tratamiento sugerido" value={recommendation.treatment} />
            <ResultRow label="Dosis orientativa" value={recommendation.dose} />
            <ResultRow label="Alternativa" value={recommendation.alternative} />
            <ResultRow label="Seguimiento" value={recommendation.followUp} />
            <ResultRow label="Escalar si" value={recommendation.escalate} />
            <ResultRow label="Derivar/urgencias si" value={recommendation.refer} />
            <ResultRow label="Fuente" value="ESC 2024, NICE NG136 y fichas CIMA/AEMPS según bloque." />
          </div>
        </section>
      )}

      {activeTab === 'treatment' && (
        <section className="hta-card">
          <h2>Tratamiento y escalada</h2>
          <div className="hta-step-list">
            {treatmentSteps.map((step) => (
              <article className="hta-step" key={step.title}>
                <span>{step.condition}</span>
                <h3>{step.title}</h3>
                <p>{step.action}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'doses' && (
        <section className="hta-card">
          <h2>Vademécum de dosis</h2>
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
        </section>
      )}

      {activeTab === 'adverse' && (
        <section className="hta-grid">
          <div className="hta-card">
            <h2>RAM / cambios</h2>
            <div className="hta-option-list">
              {adverseEvents.map((event) => (
                <button key={event.id} type="button" className={selectedAdverse === event.id ? 'is-active' : ''} onClick={() => setSelectedAdverse(event.id)}>
                  {event.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hta-result-card">
            <span className="hta-status">Problema seleccionado</span>
            <h2>{selectedAdverseEvent.label}</h2>
            <ResultRow label="Sospecha" value={selectedAdverseEvent.suspicion} />
            <ResultRow label="Qué comprobar" value={selectedAdverseEvent.check} />
            <ResultRow label="Conducta" value={selectedAdverseEvent.action} />
            <ResultRow label="Alternativa" value={selectedAdverseEvent.alternative} />
            <ResultRow label="Seguimiento" value={selectedAdverseEvent.followUp} />
            <ResultRow label="Derivar/urgencias si" value={selectedAdverseEvent.urgent} />
            <ResultRow label="Fuente" value="Ficha técnica CIMA/AEMPS y guías de tratamiento HTA." />
          </div>
        </section>
      )}

      {activeTab === 'followup' && (
        <section className="hta-card">
          <h2>Seguimiento y controles</h2>
          <div className="hta-step-list">
            <article className="hta-step">
              <span>Inicio o ajuste</span>
              <h3>Revisar respuesta</h3>
              <p>Revisar TA y tolerancia en 2-4 semanas si se inicia o intensifica tratamiento.</p>
            </article>
            <article className="hta-step">
              <span>SRAA / diurético / espironolactona</span>
              <h3>Control analítico</h3>
              <p>Controlar creatinina/eGFR, sodio y potasio tras inicio o ajuste; antes si ERC, fragilidad, deshidratación o fármacos de riesgo.</p>
            </article>
            <article className="hta-step">
              <span>No control</span>
              <h3>Intensificar</h3>
              <p>Si TA sigue fuera de objetivo con técnica y adherencia confirmadas: titular, pasar a doble/triple terapia o valorar HTA resistente.</p>
            </article>
            <article className="hta-step">
              <span>Derivación</span>
              <h3>Especializada o urgencias</h3>
              <p>Derivar si sospecha secundaria, daño de órgano, embarazo, HTA resistente o deterioro renal/electrolítico. Urgencias si síntomas de daño agudo.</p>
            </article>
          </div>
        </section>
      )}

      <section className="hta-card hta-sources">
        <h2>Fuentes de la herramienta</h2>
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
