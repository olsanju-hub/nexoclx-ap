import { DetailHeader } from '../components/detail/DetailHeader.jsx';
import { ContentBlock } from '../components/detail/ContentBlock.jsx';
import { SourceList } from '../components/detail/SourceList.jsx';
import { genericProtocolSections, placeholderSources } from '../data/placeholders.js';

export function ProtocolDetail({ protocol, onBack }) {
  return (
    <div className="screen detail-screen protocol-detail">
      <DetailHeader title={protocol.title} subtitle={protocol.description} onBack={onBack} />

      <section className="protocol-flow" aria-label="Estructura del protocolo">
        {genericProtocolSections.map((section) => (
          <article className="protocol-step-card" key={section.step}>
            <span className="protocol-step-index">{section.step}</span>
            <div className="protocol-step-copy">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </article>
        ))}
      </section>

      <ContentBlock title="Herramientas relacionadas">
        <p>Módulo no operativo. Pendiente de contenido clínico validado.</p>
      </ContentBlock>

      <SourceList sources={placeholderSources} />
    </div>
  );
}
