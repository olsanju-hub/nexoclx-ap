import { ContentBlock } from '../components/detail/ContentBlock.jsx';

export function Procedures() {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Procedimientos</h1>
        <p>Procedimientos vinculados a los protocolos disponibles.</p>
      </div>
      <ContentBlock title="Dolor torácico">
        <p>El protocolo integra la valoración inicial y la derivación urgente cuando procede.</p>
      </ContentBlock>
    </div>
  );
}
