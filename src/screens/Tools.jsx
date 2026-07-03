import { useMemo, useState } from 'react';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

const checks = [
  'Constantes y saturación registradas.',
  'Hora de inicio y evolución documentadas.',
  'Síntomas acompañantes y antecedentes cardiovasculares revisados.',
  'ECG disponible revisado sin retrasar derivación.',
  'Criterios de derivación urgente revisados.',
];

export function Tools() {
  const [selected, setSelected] = useState([]);
  const [copied, setCopied] = useState(false);
  const summary = useMemo(() => `Dolor torácico AP - valoración inicial\n${selected.map((item) => `- ${item}`).join('\n') || '- Sin elementos marcados.'}`, [selected]);
  const toggle = (item) => {
    setSelected((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
    setCopied(false);
  };
  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Herramientas</h1>
        <p>Valoración inicial.</p>
      </div>
      <ContentBlock title="Checklist de valoración inicial">
        <div className="checklist-grid">
          {checks.map((item) => (
            <label className={selected.includes(item) ? 'clinical-check is-checked' : 'clinical-check'} key={item}>
              <input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div className="decision-result">
          <h3>{selected.length === checks.length ? 'Valoración mínima completa' : 'Completar datos mínimos'}</h3>
          <p>Revisa derivación urgente o manejo no urgente según los datos marcados.</p>
          <button className="copy-button" type="button" onClick={copySummary}>{copied ? 'Resumen copiado' : 'Copiar resumen'}</button>
        </div>
      </ContentBlock>
    </div>
  );
}
