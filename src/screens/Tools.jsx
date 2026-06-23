import { ContentBlock } from '../components/detail/ContentBlock.jsx';

export function Tools() {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Herramientas</h1>
        <p>Apoyo rápido vinculado al protocolo Dolor torácico.</p>
      </div>
      <ContentBlock title="Valoración inicial">
        <p>Registro estructurado de constantes, hora de inicio, síntomas acompañantes y antecedentes cardiovasculares.</p>
      </ContentBlock>
      <ContentBlock title="Derivación">
        <p>Acceso al flujo de derivación urgente descrito en el protocolo Dolor torácico.</p>
      </ContentBlock>
    </div>
  );
}
