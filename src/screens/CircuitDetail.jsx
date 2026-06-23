import { DetailHeader } from '../components/detail/DetailHeader.jsx';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';

export function CircuitDetail({ onBack }) {
  return (
    <div className="screen">
      <DetailHeader title="Dolor torácico" subtitle="Circuito de derivación desde Atención Primaria" onBack={onBack} />
      <ContentBlock title="Flujo">
        <p>Valorar estabilidad, realizar ECG si está disponible sin retrasar el traslado y activar derivación urgente cuando el protocolo lo indique.</p>
      </ContentBlock>
    </div>
  );
}
