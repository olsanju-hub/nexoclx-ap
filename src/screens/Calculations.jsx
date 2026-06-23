import { ContentBlock } from '../components/detail/ContentBlock.jsx';

export function Calculations() {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Cálculos</h1>
        <p>Apoyo calculado vinculado a protocolos disponibles.</p>
      </div>
      <ContentBlock title="Dolor torácico">
        <p>La versión de Atención Primaria prioriza signos de alarma, ECG si está disponible y derivación urgente cuando procede.</p>
      </ContentBlock>
    </div>
  );
}
