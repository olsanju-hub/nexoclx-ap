import { useMemo, useState } from 'react';
import { SectionNav } from '../layout/SectionNav';
import { ProtocolHeader } from './ProtocolHeader';
import { ProtocolBlock } from './ProtocolBlock';
import { ProtocolSection } from './ProtocolSection';
import { ProtocolActions } from './ProtocolActions';
import { LinkedText } from './LinkedText';

function protocolTabs(protocol, medications) {
  const blockByTitle = Object.fromEntries(protocol.blocks.map((block) => [block.title, block]));
  return [
    {
      id: 'sospecha',
      label: 'Inicio',
      source: blockByTitle['Qué hacer ahora'] || protocol.blocks[0],
    },
    {
      id: 'valoracion',
      label: 'Valoración',
      source: blockByTitle.Valoración || blockByTitle.Diagnóstico,
    },
    {
      id: 'manejo',
      label: 'Manejo',
      source: blockByTitle.Tratamiento,
      content: protocol.treatmentRows ? <TreatmentRows rows={protocol.treatmentRows} medications={medications} /> : null,
    },
    {
      id: 'seguimiento',
      label: 'Seguimiento',
      source: blockByTitle.Seguimiento,
    },
    {
      id: 'derivacion',
      label: 'Derivación',
      source: blockByTitle['Derivar / urgencias'],
    },
  ].map((tab) => ({
    ...tab,
    title: tab.source?.title || tab.title || tab.label,
    content: tab.content || (
      tab.source?.items?.length
        ? <ul>{tab.source.items.map((item) => <li key={item}><LinkedText text={item} medications={medications} /></li>)}</ul>
        : <p className="empty">Sin contenido específico registrado.</p>
    ),
  }));
}

function TreatmentRows({ rows, medications }) {
  const byId = Object.fromEntries(medications.map((med) => [med.id, med]));
  return (
    <div className="treatment-grid">
      {rows.map((row) => {
        const med = row.cimaMedicationId ? byId[row.cimaMedicationId] : null;
        const cima = med?.cima?.startsWith('http') ? (
          <a href={med.cima} target="_blank" rel="noopener noreferrer">CIMA</a>
        ) : row.medication && row.medication !== '-' ? (
          <span className="pending">CIMA pendiente</span>
        ) : '-';
        return (
          <article className="treatment-row" key={`${row.scenario}-${row.medication}`}>
            <h3>{row.scenario}</h3>
            <dl>
              <dt>Conducta</dt><dd>{row.action}</dd>
              <dt>Grupo</dt><dd>{row.drugClass || '-'}</dd>
              <dt>Fármaco</dt><dd><strong>{row.medication || '-'}</strong></dd>
              <dt>Dosis</dt><dd>{row.dose || '-'}</dd>
              <dt>Frecuencia</dt><dd>{row.frequency || '-'}</dd>
              <dt>Duración</dt><dd>{row.duration || '-'}</dd>
              <dt>Subir/cambiar</dt><dd>{row.escalation || '-'}</dd>
              <dt>Control</dt><dd>{row.followUp || '-'}</dd>
              <dt>Precauciones</dt><dd>{row.safety || '-'}</dd>
              <dt>CIMA</dt><dd>{cima}</dd>
            </dl>
          </article>
        );
      })}
    </div>
  );
}

function MedicationCard({ med }) {
  const cima = med.cima.startsWith('http') ? (
    <a href={med.cima} target="_blank" rel="noopener noreferrer">Ficha CIMA/AEMPS</a>
  ) : (
    <span className="pending">{med.cima}</span>
  );
  return (
    <article className="med-card">
      <h3>{med.generic}</h3>
      <p><strong>Dosis:</strong> {med.dose}</p>
      <p><strong>Duración:</strong> {med.duration}</p>
      <p><strong>Seguridad:</strong> {med.safety}</p>
      <p><strong>Renal:</strong> {med.renal}</p>
      <p><strong>Hepática:</strong> {med.hepatic}</p>
      <p>{cima}</p>
    </article>
  );
}

export function ProtocolDetail({ protocol, medications, calculators, bibliography }) {
  const tabs = useMemo(() => protocolTabs(protocol, medications), [protocol, medications]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const meds = protocol.meds.map((id) => medications.find((med) => med.id === id)).filter(Boolean);
  const calcCards = protocol.calculators.map((id) => calculators.find((calc) => calc.id === id)).filter(Boolean);
  const bibRows = protocol.bibliography.map((id) => bibliography.find((bib) => bib.id === id)).filter(Boolean);

  return (
    <section className="protocol-detail-shell">
      <section className="protocol-detail-card">
        <ProtocolHeader protocol={protocol} />
        <SectionNav tabs={tabs} activeTab={activeTab} onSelect={setActiveTab} />
        <ProtocolBlock key={active.id} id={active.id} title={active.title}>{active.content}</ProtocolBlock>
      </section>
      <ProtocolActions calculators={calcCards} protocolId={protocol.id} />
      {meds.length ? (
        <section className="secondary-section">
          <h2>Medicamentos</h2>
          <div className="med-grid">{meds.map((med) => <MedicationCard key={med.id} med={med} />)}</div>
        </section>
      ) : null}
      <section className="details secondary-section">
        {protocol.secondary.map((section) => <ProtocolSection key={section.title} section={section} medications={medications} />)}
      </section>
      <section className="secondary-section details">
        <details>
          <summary>Bibliografía del protocolo</summary>
          <div className="biblio-card-list">
            {bibRows.map((bib) => <BibliographyCard key={bib.id} bib={bib} />)}
          </div>
        </details>
      </section>
    </section>
  );
}

export function BibliographyCard({ bib }) {
  return (
    <article className="biblio-card">
      <h3>{bib.title}</h3>
      <p>{bib.institution} · {bib.year} · confianza {bib.confidence}</p>
      <a href={bib.url} target="_blank" rel="noopener noreferrer">Abrir fuente</a>
    </article>
  );
}
