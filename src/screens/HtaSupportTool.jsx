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

function SourceNote() {
  return (
    <details className="hta-support-source">
      <summary>Fuente</summary>
      <div className="hta-source-list">
        {htaSupportSources.map((source) => (
          <article key={source.label}>
            <h3>{source.label}</h3>
            <p>{source.supports}</p>
            <a href={source.url} target="_blank" rel="noreferrer">{source.url}</a>
          </article>
        ))}
      </div>
    </details>
  );
}

function AmpaTool() {
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
      </div>
      <ToolResult
        title="Promedio AMPA"
        rows={[
          { label: 'Medidas usadas', value: result.count > 0 ? `${result.count} pares` : 'Sin pares completos.' },
          { label: 'Media', value: result.sbp && result.dbp ? `${result.sbp}/${result.dbp} mmHg` : 'Introduce PAS y PAD.' },
          { label: 'Interpretacion', value: result.interpretation },
          { label: 'Conducta', value: 'Usar el promedio para confirmar diagnostico o control; no decidir por una toma aislada.' },
        ]}
      />
    </section>
  );
}

function MapaTool() {
  const [values, setValues] = useState({ daySbp: '', dayDbp: '', nightSbp: '', nightDbp: '', day24Sbp: '', day24Dbp: '' });
  const numeric = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
  const interpretation = classifyMapa(numeric);
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));

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
      </div>
      <ToolResult
        title="Interpretacion MAPA"
        rows={[
          { label: 'Resultado', value: interpretation },
          { label: 'Confirmacion', value: 'NICE usa la media diurna ABPM >=135/85 mmHg para confirmar HTA con clinica >=140/90.' },
          { label: 'Conducta', value: 'Integrar con clinica, tecnica y objetivo terapeutico del protocolo HTA.' },
        ]}
      />
    </section>
  );
}

function Score2Tool() {
  return (
    <section className="hta-card">
      <h2>SCORE2 / SCORE2-OP</h2>
      <div className="hta-result-row">
        <span>Estado</span>
        <p>Pendiente de implementacion validada.</p>
      </div>
      <div className="hta-result-row">
        <span>Motivo</span>
        <p>No se incluye una formula simplificada ni tablas incompletas. Requiere matriz SCORE2/SCORE2-OP validada y version regional aplicable.</p>
      </div>
      <div className="hta-result-row">
        <span>Uso actual</span>
        <p>Slot estructural para enlazar riesgo cardiovascular cuando se implemente con datos oficiales.</p>
      </div>
    </section>
  );
}

function EgfrTool() {
  const [values, setValues] = useState({ age: '', sex: 'male', creatinine: '', unit: 'mgdl' });
  const egfr = calculateEgfr(values);
  const rounded = round(egfr);
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));

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
      </div>
      <ToolResult
        title="eGFR"
        rows={[
          { label: 'Resultado', value: rounded ? `${rounded} mL/min/1,73 m2` : 'Introduce edad y creatinina validas.' },
          { label: 'Categoria', value: classifyGfr(egfr) },
          { label: 'Conducta', value: 'Usar para seguridad de SRAA, diureticos y espironolactona junto a potasio y contexto clinico.' },
        ]}
      />
    </section>
  );
}

function AcrTool() {
  const [albumin, setAlbumin] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const albuminNumber = Number(albumin);
  const creatinineNumber = Number(creatinine);
  const acrMgG = Number.isFinite(albuminNumber) && Number.isFinite(creatinineNumber) && creatinineNumber > 0
    ? albuminNumber / (creatinineNumber * 0.01)
    : null;
  const acrMmol = acrMgG === null ? null : acrMgG / 8.84;

  return (
    <section className="hta-grid hta-main-grid">
      <div className="hta-card">
        <h2>Albuminuria</h2>
        <div className="hta-two-col">
          <Field label="Albumina urinaria mg/L"><input inputMode="decimal" type="number" value={albumin} onChange={(event) => setAlbumin(event.target.value)} /></Field>
          <Field label="Creatinina urinaria mg/dL"><input inputMode="decimal" type="number" value={creatinine} onChange={(event) => setCreatinine(event.target.value)} /></Field>
        </div>
      </div>
      <ToolResult
        title="ACR"
        rows={[
          { label: 'ACR', value: acrMgG === null ? 'Introduce albumina y creatinina.' : `${round(acrMgG, 1)} mg/g (${round(acrMmol, 1)} mg/mmol)` },
          { label: 'Categoria', value: classifyAcr(acrMgG) },
          { label: 'Conducta', value: 'Integrar con eGFR, diabetes/ERC y decision de SRAA/seguimiento.' },
        ]}
      />
    </section>
  );
}

function LabControlTool() {
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
      </div>
      <ToolResult
        title="Control analitico"
        rows={[
          { label: 'Creatinina', value: creatinineRise === null ? 'Sin comparacion.' : `${round(creatinineRise, 1)}% respecto a basal.` },
          { label: 'Conducta', value: action },
          { label: 'Comprobar', value: 'Volemia, AINE, suplementos de potasio, sintomas, ECG si hiperpotasemia relevante.' },
          { label: 'Fuente', value: 'NICE CKD / seguridad CIMA / practica conservadora de monitorizacion.' },
        ]}
      />
    </section>
  );
}

export function HtaSupportTool({ toolId, onBack }) {
  const tool = htaSupportTools.find((item) => item.id === toolId) ?? htaSupportTools[0];
  const content = {
    ampa: <AmpaTool />,
    mapa: <MapaTool />,
    score2: <Score2Tool />,
    egfr: <EgfrTool />,
    acr: <AcrTool />,
    'lab-control': <LabControlTool />,
  }[tool.id];

  return (
    <div className="screen detail-screen hta-tool">
      <DetailHeader title={tool.title} subtitle={tool.description} onBack={onBack} />
      {content}
      <SourceNote />
    </div>
  );
}
