import { useState } from 'react';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

export function Calculations() {
  const [mode, setMode] = useState('alarm');
  const result = mode === 'alarm'
    ? 'Si hay signos de alarma o sospecha de causa grave, prioriza derivación urgente.'
    : 'Si no hay datos de alarma, documenta valoración, seguimiento y señales de reconsulta según protocolo.';

  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Selector de conducta</h1>
        <p>Elige el escenario.</p>
      </div>
      <ContentBlock title="Dolor torácico">
        <div className="segmented-control" aria-label="Escenario">
          <button className={mode === 'alarm' ? 'is-active' : ''} type="button" onClick={() => setMode('alarm')}>Alarma</button>
          <button className={mode === 'stable' ? 'is-active' : ''} type="button" onClick={() => setMode('stable')}>Sin alarma</button>
        </div>
        <div className="decision-result">
          <h3>{mode === 'alarm' ? 'Derivación urgente' : 'Manejo no urgente'}</h3>
          <p>{result}</p>
        </div>
      </ContentBlock>
    </div>
  );
}
