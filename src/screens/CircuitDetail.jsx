import { useState } from 'react';
import { DetailHeader } from '../components/detail/DetailHeader.jsx';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

const steps = ['Valorar estabilidad y constantes.', 'Realizar ECG si está disponible sin retrasar traslado.', 'Comunicar hora de inicio, ECG, constantes y antecedentes.', 'Mantener vigilancia hasta transferencia asistencial.'];

export function CircuitDetail({ onBack }) {
  const [selected, setSelected] = useState([]);
  const toggle = (item) => setSelected((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));

  return (
    <div className="screen">
      <DetailHeader title="Dolor torácico" subtitle="Circuito de derivación desde Atención Primaria" onBack={onBack} />
      <ContentBlock title="Flujo">
        <div className="checklist-grid">
          {steps.map((item) => (
            <label className={selected.includes(item) ? 'clinical-check is-checked' : 'clinical-check'} key={item}>
              <input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div className="decision-result">
          <h3>{selected.length === steps.length ? 'Transferencia preparada' : 'Completar circuito'}</h3>
          <p>El circuito debe sostener la derivación urgente cuando el protocolo lo indique.</p>
        </div>
      </ContentBlock>
    </div>
  );
}
