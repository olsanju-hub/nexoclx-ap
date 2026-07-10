import { useMemo, useState } from 'react';
import { DetailHeader } from '../components/detail/DetailHeader.jsx';
import { htaSupportSources, htaSupportTools } from '../data/htaSupportTools.js';

const round = (value, decimals = 0) => {
  if (!Number.isFinite(value)) return null;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const parseSeries = (value) => value
  .split(/[\s,;]+/)
  .map((item) => Number(item.replace(',', '.')))
  .filter((item) => Number.isFinite(item) && item > 0);

const average = (values) => {
  if (values.length === 0) return null;
  return values.reduce((sum, item) => sum + item, 0) / values.length;
};

const classifyHomeBp = (sbp, dbp) => {
  if (sbp === null || dbp === null) return 'Introduce PAS y PAD.';
  if (sbp >= 135 || dbp >= 85) return 'Media compatible con HTA/no control domiciliario.';
  return 'Media por debajo del umbral domiciliario NICE.';
};

const classifyMapa = ({ daySbp, dayDbp, nightSbp, nightDbp, day24Sbp, day24Dbp }) => {
  const flags = [];
  if (daySbp >= 135 || dayDbp >= 85) flags.push('diurna alta');
  if (nightSbp >= 120 || nightDbp >= 70) flags.push('nocturna alta');
  if (day24Sbp >= 130 || day24Dbp >= 80) flags.push('24 h alta');
  if (flags.length === 0) return 'Sin medias por encima de umbral introducidas.';
  return `Medias con elevacion: ${flags.join(', ')}.`;
};

const classifyGfr = (egfr) => {
  if (egfr === null) return 'Sin resultado.';
  if (egfr >= 90) return 'G1';
  if (egfr >= 60) return 'G2';
  if (egfr >= 45) return 'G3a';
  if (egfr >= 30) return 'G3b';
  if (egfr >= 15) return 'G4';
  return 'G5';
};

const calculateEgfr = ({ age, sex, creatinine, unit }) => {
  const ageNumber = Number(age);
  let scr = Number(creatinine);
  if (!Number.isFinite(ageNumber) || !Number.isFinite(scr) || ageNumber < 18 || scr <= 0) return null;
  if (unit === 'umol') scr /= 88.4;
  const isFemale = sex === 'female';
  const k = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  return 142
    * (Math.min(scr / k, 1) ** alpha)
    * (Math.max(scr / k, 1) ** -1.2)
    * (0.9938 ** ageNumber)
    * (isFemale ? 1.012 : 1);
};

const classifyAcr = (acrMgG) => {
  if (acrMgG === null) return 'Sin resultado.';
  if (acrMgG < 30) return 'A1';
  if (acrMgG <= 300) return 'A2';
  return 'A3';
};

const classifyScore2Risk = (age, score) => {
  const ageNumber = Number(age);
  const scoreNumber = Number(score);
  if (!Number.isFinite(ageNumber) || !Number.isFinite(scoreNumber) || scoreNumber < 0) {
    return {
      category: 'Sin clasificar',
      key: 'none',
      action: 'Introduce edad y porcentaje SCORE2/SCORE2-OP obtenido con tabla o calculadora oficial.',
    };
  }
  if (ageNumber < 40) {
    return {
      category: 'Fuera de rango SCORE2 habitual',
      key: 'none',
      action: 'No usar SCORE2 para decidir intensidad. Valorar riesgo clinico, factores familiares y seguimiento preventivo.',
    };
  }
  const thresholds = ageNumber < 50
    ? { high: 2.5, veryHigh: 7.5 }
    : ageNumber < 70
      ? { high: 5, veryHigh: 10 }
      : { high: 7.5, veryHigh: 15 };
  if (scoreNumber >= thresholds.veryHigh) {
    return {
      category: 'Riesgo muy alto',
      key: 'veryHigh',
      action: 'Priorizar control intensivo de factores modificables, confirmar objetivo de TA y revisar indicacion de tratamiento farmacologico en el protocolo HTA.',
    };
  }
  if (scoreNumber >= thresholds.high) {
    return {
      category: 'Riesgo alto',
      key: 'high',
      action: 'Usar el riesgo para adelantar tratamiento farmacologico si TA elevada/HTA confirmada y reforzar intervencion global.',
    };
  }
  return {
    category: 'Riesgo bajo-moderado',
    key: 'moderate',
    action: 'Priorizar confirmacion de TA, medidas no farmacologicas y seguimiento segun cifras y tolerancia.',
  };
};

function Field({ label, children }) {
  return (
    <label className="hta-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ToolResult({ title, rows }) {
  return (
    <div className="hta-result-card is-ok">
      <span className="hta-status">Resultado</span>
      <h2>{title}</h2>
      {rows.map((row) => (
        <div className="hta-result-row" key={row.label}>
          <span>{row.label}</span>
          <p>{row.value}</p>
        </div>
      ))}
    </div>
  );
}

function OpenHtaButton({ children = 'Abrir protocolo HTA con estos datos', onClick, disabled = false }) {
  return (
    <button className="hta-primary-action" type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function BibliographyModal({ onClose }) {
  return (
    <div className="hta-modal-backdrop" role="presentation">
      <section className="hta-modal" role="dialog" aria-modal="true" aria-labelledby="hta-support-bibliography-title">
        <div className="hta-modal-header">
          <h2 id="hta-support-bibliography-title">Bibliografía</h2>
          <button type="button" onClick={onClose}>Cerrar</button>
        </div>
      <div className="hta-source-list">
        {htaSupportSources.map((source) => (
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

function AmpaTool({ onOpenHta }) {
  const [sbpSeries, setSbpSeries] = useState('');
  const [dbpSeries, setDbpSeries] = useState('');
  const result = useMemo(() => {
    const sbpValues = parseSeries(sbpSeries);
    const dbpValues = parseSeries(dbpSeries);
    const sbp = average(sbpValues);
    const dbp = average(dbpValues);
    return {
      sbp: round(sbp),
      dbp: round(dbp),
      count: Math.min(sbpValues.length, dbpValues.length),
      interpretation: classifyHomeBp(sbp, dbp),
    };
  }, [dbpSeries, sbpSeries]);
  const openHta = () => onOpenHta?.({
    autoCalculate: Boolean(result.sbp && result.dbp),
    values: {
      sbp: result.sbp ? String(result.sbp) : '',
      dbp: result.dbp ? String(result.dbp) : '',
      situation: result.sbp >= 135 || result.dbp >= 85 ? 'new' : 'treated',
      transferNote: result.sbp && result.dbp ? `Datos desde AMPA: media ${result.sbp}/${result.dbp} mmHg.` : 'Datos desde AMPA incompletos.',
    },
  });

  return (
    <section className="hta-grid hta-main-grid">
      <div className="hta-card">
        <h2>Medidas domiciliarias</h2>
        <Field label="PAS separadas por comas">
          <textarea value={sbpSeries} onChange={(event) => setSbpSeries(event.target.value)} placeholder="138, 134, 136" />
        </Field>
        <Field label="PAD separadas por comas">
          <textarea value={dbpSeries} onChange={(event) => setDbpSeries(event.target.value)} placeholder="86, 82, 84" />
        </Field>
        <OpenHtaButton onClick={openHta} disabled={!result.sbp || !result.dbp} />
      </div>
      <ToolResult
        title="Promedio AMPA"
        rows={[
          { label: 'Medidas usadas', value: result.count > 0 ? `${result.count} pares` : 'Sin pares completos.' },
          { label: 'Media', value: result.sbp && result.dbp ? `${result.sbp}/${result.dbp} mmHg` : 'Introduce PAS y PAD.' },
          { label: 'Interpretacion', value: result.interpretation },
          { label: 'Qué hacer con el resultado', value: 'Si la media es >=135/85, usarla para confirmar HTA o no control y volver al protocolo HTA. Si es inferior, evitar intensificar solo por toma aislada.' },
          { label: 'Fuente', value: 'NICE NG136.' },
        ]}
      />
    </section>
  );
}

function MapaTool({ onOpenHta }) {
  const [values, setValues] = useState({ daySbp: '', dayDbp: '', nightSbp: '', nightDbp: '', day24Sbp: '', day24Dbp: '' });
  const numeric = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
  const interpretation = classifyMapa(numeric);
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const transferSbp = Number.isFinite(numeric.daySbp) ? numeric.daySbp : numeric.day24Sbp;
  const transferDbp = Number.isFinite(numeric.dayDbp) ? numeric.dayDbp : numeric.day24Dbp;
  const openHta = () => onOpenHta?.({
    autoCalculate: Boolean(transferSbp && transferDbp),
    values: {
      sbp: transferSbp ? String(transferSbp) : '',
      dbp: transferDbp ? String(transferDbp) : '',
      situation: transferSbp >= 135 || transferDbp >= 85 ? 'new' : 'treated',
      transferNote: transferSbp && transferDbp ? `Datos desde MAPA: media usada ${transferSbp}/${transferDbp} mmHg.` : 'Datos desde MAPA incompletos.',
    },
  });

  return (
    <section className="hta-grid hta-main-grid">
      <div className="hta-card">
        <h2>Medias MAPA</h2>
        <div className="hta-two-col">
          <Field label="PAS diurna"><input inputMode="numeric" type="number" value={values.daySbp} onChange={(event) => update('daySbp', event.target.value)} /></Field>
          <Field label="PAD diurna"><input inputMode="numeric" type="number" value={values.dayDbp} onChange={(event) => update('dayDbp', event.target.value)} /></Field>
          <Field label="PAS nocturna"><input inputMode="numeric" type="number" value={values.nightSbp} onChange={(event) => update('nightSbp', event.target.value)} /></Field>
          <Field label="PAD nocturna"><input inputMode="numeric" type="number" value={values.nightDbp} onChange={(event) => update('nightDbp', event.target.value)} /></Field>
          <Field label="PAS 24 h"><input inputMode="numeric" type="number" value={values.day24Sbp} onChange={(event) => update('day24Sbp', event.target.value)} /></Field>
          <Field label="PAD 24 h"><input inputMode="numeric" type="number" value={values.day24Dbp} onChange={(event) => update('day24Dbp', event.target.value)} /></Field>
        </div>
        <OpenHtaButton onClick={openHta} disabled={!transferSbp || !transferDbp} />
      </div>
      <ToolResult
        title="Interpretacion MAPA"
        rows={[
          { label: 'Resultado', value: interpretation },
          { label: 'Confirmacion', value: 'NICE usa la media diurna ABPM >=135/85 mmHg para confirmar HTA con clinica >=140/90.' },
          { label: 'Qué hacer con el resultado', value: 'Si la media diurna es >=135/85, apoya diagnostico/no control. Si nocturna o 24 h estan altas, revisar patron y riesgo antes de intensificar.' },
          { label: 'Fuente', value: 'NICE NG136.' },
        ]}
      />
    </section>
  );
}

function Score2Tool({ onOpenHta }) {
  const [values, setValues] = useState({ age: '', score: '', sbp: '', dbp: '', smoker: 'unknown', diabetes: false, ckd: false, cvd: false });
  const scoreResult = classifyScore2Risk(values.age, values.score);
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const openHta = () => {
    onOpenHta?.({
      autoCalculate: Boolean(values.sbp || values.dbp),
      values: {
        sbp: values.sbp,
        dbp: values.dbp,
        situation: values.diabetes ? 'diabetes' : values.ckd ? 'ckd' : values.cvd ? 'cvd' : 'new',
        diabetes: values.diabetes,
        ckd: values.ckd,
        cvd: values.cvd,
        riskCategory: scoreResult.key,
        transferNote: `Datos desde SCORE2: ${scoreResult.category}${values.score ? ` (${values.score}%)` : ''}.`,
      },
    });
  };

  return (
    <section className="hta-grid hta-main-grid">
      <div className="hta-card">
        <h2>SCORE2 / SCORE2-OP</h2>
        <div className="hta-two-col">
          <Field label="Edad">
            <input inputMode="numeric" type="number" value={values.age} onChange={(event) => update('age', event.target.value)} />
          </Field>
          <Field label="SCORE2 / OP %">
            <input inputMode="decimal" type="number" value={values.score} onChange={(event) => update('score', event.target.value)} placeholder="%" />
          </Field>
          <Field label="PAS para HTA">
            <input inputMode="numeric" type="number" value={values.sbp} onChange={(event) => update('sbp', event.target.value)} />
          </Field>
          <Field label="PAD para HTA">
            <input inputMode="numeric" type="number" value={values.dbp} onChange={(event) => update('dbp', event.target.value)} />
          </Field>
        </div>
        <div className="hta-check-grid hta-compact-checks">
          {[
            ['diabetes', 'Diabetes'],
            ['ckd', 'ERC'],
            ['cvd', 'ECV establecida'],
          ].map(([id, label]) => (
            <label key={id}>
              <input type="checkbox" checked={values[id]} onChange={(event) => update(id, event.target.checked)} />
              {label}
            </label>
          ))}
        </div>
        <button className="hta-primary-action" type="button" onClick={openHta}>Abrir protocolo HTA con estos datos</button>
      </div>
      <ToolResult
        title="Riesgo CV"
        rows={[
          { label: 'Resultado', value: scoreResult.category },
          { label: 'Qué hacer con el resultado', value: scoreResult.action },
          { label: 'Tratamiento HTA', value: scoreResult.key === 'high' || scoreResult.key === 'veryHigh' ? 'Si HTA o TA elevada se confirma, usar el protocolo HTA con riesgo alto para decidir inicio/intensificacion.' : 'Si no hay alto riesgo, confirmar TA y evitar intensificar sin medias validas.' },
          { label: 'Datos que pasan a HTA', value: 'PAS, PAD, diabetes, ERC, ECV establecida y categoria de riesgo.' },
          { label: 'Fuente', value: 'ESC 2021 Prevention: umbrales SCORE2/SCORE2-OP por edad.' },
        ]}
      />
    </section>
  );
}

function EgfrTool({ onOpenHta }) {
  const [values, setValues] = useState({ age: '', sex: 'male', creatinine: '', unit: 'mgdl' });
  const egfr = calculateEgfr(values);
  const rounded = round(egfr);
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const ckd = Number.isFinite(egfr) && egfr < 60;
  const openHta = () => onOpenHta?.({
    autoCalculate: false,
    values: {
      ckd,
      situation: ckd ? 'ckd' : 'new',
      transferNote: rounded ? `Datos desde eGFR: ${rounded} mL/min/1,73 m2 (${classifyGfr(egfr)}).` : 'Datos desde eGFR incompletos.',
    },
  });

  return (
    <section className="hta-grid hta-main-grid">
      <div className="hta-card">
        <h2>CKD-EPI 2021</h2>
        <div className="hta-two-col">
          <Field label="Edad"><input inputMode="numeric" type="number" value={values.age} onChange={(event) => update('age', event.target.value)} /></Field>
          <Field label="Sexo">
            <select value={values.sex} onChange={(event) => update('sex', event.target.value)}>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </Field>
          <Field label="Creatinina"><input inputMode="decimal" type="number" value={values.creatinine} onChange={(event) => update('creatinine', event.target.value)} /></Field>
          <Field label="Unidad">
            <select value={values.unit} onChange={(event) => update('unit', event.target.value)}>
              <option value="mgdl">mg/dL</option>
              <option value="umol">micromol/L</option>
            </select>
          </Field>
        </div>
        <OpenHtaButton onClick={openHta} disabled={!rounded} />
      </div>
      <ToolResult
        title="eGFR"
        rows={[
          { label: 'Resultado', value: rounded ? `${rounded} mL/min/1,73 m2` : 'Introduce edad y creatinina validas.' },
          { label: 'Categoria', value: classifyGfr(egfr) },
          { label: 'Qué hacer con el resultado', value: 'Usar para seguridad de IECA/ARA-II, diureticos y espironolactona junto a potasio y contexto clinico.' },
          { label: 'Fuente', value: 'NKF CKD-EPI 2021 / clasificacion CKD.' },
        ]}
      />
    </section>
  );
}

function AcrTool({ onOpenHta }) {
  const [albumin, setAlbumin] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const albuminNumber = Number(albumin);
  const creatinineNumber = Number(creatinine);
  const acrMgG = Number.isFinite(albuminNumber) && Number.isFinite(creatinineNumber) && creatinineNumber > 0
    ? albuminNumber / (creatinineNumber * 0.01)
    : null;
  const acrMmol = acrMgG === null ? null : acrMgG / 8.84;
  const albuminuria = acrMgG !== null && acrMgG >= 30;
  const openHta = () => onOpenHta?.({
    autoCalculate: false,
    values: {
      ckd: albuminuria,
      situation: albuminuria ? 'ckd' : 'new',
      transferNote: acrMgG === null ? 'Datos desde ACR incompletos.' : `Datos desde ACR: ${round(acrMgG, 1)} mg/g (${classifyAcr(acrMgG)}).`,
    },
  });

  return (
    <section className="hta-grid hta-main-grid">
      <div className="hta-card">
        <h2>Albuminuria</h2>
        <div className="hta-two-col">
          <Field label="Albumina urinaria mg/L"><input inputMode="decimal" type="number" value={albumin} onChange={(event) => setAlbumin(event.target.value)} /></Field>
          <Field label="Creatinina urinaria mg/dL"><input inputMode="decimal" type="number" value={creatinine} onChange={(event) => setCreatinine(event.target.value)} /></Field>
        </div>
        <OpenHtaButton onClick={openHta} disabled={acrMgG === null} />
      </div>
      <ToolResult
        title="ACR"
        rows={[
          { label: 'ACR', value: acrMgG === null ? 'Introduce albumina y creatinina.' : `${round(acrMgG, 1)} mg/g (${round(acrMmol, 1)} mg/mmol)` },
          { label: 'Categoria', value: classifyAcr(acrMgG) },
          { label: 'Qué hacer con el resultado', value: 'Integrar con eGFR, diabetes/ERC y decision de SRAA, seguimiento renal y riesgo cardiovascular.' },
          { label: 'Fuente', value: 'NKF categorias A1-A3.' },
        ]}
      />
    </section>
  );
}

function LabControlTool({ onOpenHta }) {
  const [values, setValues] = useState({ baselineCreatinine: '', currentCreatinine: '', potassium: '', sodium: '', drug: 'sraa' });
  const baseline = Number(values.baselineCreatinine);
  const current = Number(values.currentCreatinine);
  const potassium = Number(values.potassium);
  const sodium = Number(values.sodium);
  const creatinineRise = Number.isFinite(baseline) && Number.isFinite(current) && baseline > 0
    ? ((current - baseline) / baseline) * 100
    : null;
  const update = (key, value) => setValues((currentValues) => ({ ...currentValues, [key]: value }));
  let action = 'Completa datos para orientar seguridad.';
  if (Number.isFinite(potassium) && potassium >= 6) action = 'Valorar suspension/urgencias segun ECG, sintomas y contexto.';
  else if (creatinineRise !== null && creatinineRise >= 30) action = 'Revisar volemia, AINE/interacciones y valorar reducir/suspender SRAA; repetir analitica pronto.';
  else if (Number.isFinite(sodium) && sodium < 130) action = 'Valorar diuretico, sintomas y repeticion/derivacion segun gravedad.';
  else if (creatinineRise !== null || Number.isFinite(potassium) || Number.isFinite(sodium)) action = 'Sin alerta mayor introducida; continuar vigilancia segun farmaco y contexto.';
  const problem = Number.isFinite(potassium) && potassium >= 5.5
    ? 'hyperkalemia'
    : creatinineRise !== null && creatinineRise >= 30
      ? 'renal-drop'
      : Number.isFinite(sodium) && sodium < 130
        ? 'hyponatremia'
        : 'none';
  const currentTreatment = values.drug === 'sraa'
    ? 'ace'
    : values.drug === 'diuretic'
      ? 'diuretic'
      : 'spironolactone';
  const openHta = () => onOpenHta?.({
    autoCalculate: false,
    values: {
      currentTreatment,
      problem,
      hyperkalemia: problem === 'hyperkalemia',
      renalDrop: problem === 'renal-drop',
      transferNote: `Datos desde control analitico: ${action}`,
    },
  });

  return (
    <section className="hta-grid hta-main-grid">
      <div className="hta-card">
        <h2>Control de seguridad</h2>
        <Field label="Farmaco iniciado/intensificado">
          <select value={values.drug} onChange={(event) => update('drug', event.target.value)}>
            <option value="sraa">IECA / ARA-II</option>
            <option value="diuretic">Diuretico</option>
            <option value="spironolactone">Espironolactona</option>
          </select>
        </Field>
        <div className="hta-two-col">
          <Field label="Creatinina basal"><input inputMode="decimal" type="number" value={values.baselineCreatinine} onChange={(event) => update('baselineCreatinine', event.target.value)} /></Field>
          <Field label="Creatinina actual"><input inputMode="decimal" type="number" value={values.currentCreatinine} onChange={(event) => update('currentCreatinine', event.target.value)} /></Field>
          <Field label="Potasio mmol/L"><input inputMode="decimal" type="number" value={values.potassium} onChange={(event) => update('potassium', event.target.value)} /></Field>
          <Field label="Sodio mmol/L"><input inputMode="decimal" type="number" value={values.sodium} onChange={(event) => update('sodium', event.target.value)} /></Field>
        </div>
        <OpenHtaButton onClick={openHta} disabled={creatinineRise === null && !Number.isFinite(potassium) && !Number.isFinite(sodium)} />
      </div>
      <ToolResult
        title="Control analitico"
        rows={[
          { label: 'Creatinina', value: creatinineRise === null ? 'Sin comparacion.' : `${round(creatinineRise, 1)}% respecto a basal.` },
          { label: 'Qué hacer con el resultado', value: action },
          { label: 'Comprobar', value: 'Volemia, AINE, suplementos de potasio, sintomas, ECG si hiperpotasemia relevante.' },
          { label: 'Fuente', value: 'NICE CKD / seguridad CIMA / practica conservadora de monitorizacion.' },
        ]}
      />
    </section>
  );
}

export function HtaSupportTool({ toolId, onBack, onOpenHta }) {
  const [showBibliography, setShowBibliography] = useState(false);
  const tool = htaSupportTools.find((item) => item.id === toolId) ?? htaSupportTools[0];
  const content = {
    ampa: <AmpaTool onOpenHta={onOpenHta} />,
    mapa: <MapaTool onOpenHta={onOpenHta} />,
    score2: <Score2Tool onOpenHta={onOpenHta} />,
    egfr: <EgfrTool onOpenHta={onOpenHta} />,
    acr: <AcrTool onOpenHta={onOpenHta} />,
    'lab-control': <LabControlTool onOpenHta={onOpenHta} />,
  }[tool.id];

  return (
    <div className="screen detail-screen hta-tool">
      <div className="hta-protocol-header">
        <DetailHeader title={tool.title} subtitle={tool.description} onBack={onBack} />
        <button className="hta-bibliography-button" type="button" onClick={() => setShowBibliography(true)} aria-label="Abrir bibliografía">B</button>
      </div>
      {content}
      {showBibliography && <BibliographyModal onClose={() => setShowBibliography(false)} />}
    </div>
  );
}
