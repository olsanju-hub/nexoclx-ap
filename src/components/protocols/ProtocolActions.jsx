import { routes } from '../../utils/routing';

export function ProtocolActions({ calculators, protocolId }) {
  if (!calculators.length) return null;
  return (
    <section className="secondary-section">
      <h2>Herramientas vinculadas</h2>
      <div className="tool-grid">
        {calculators.map((calc) => (
          <a className="tool-link tool-card-link" href={routes.tool(calc.id, protocolId)} key={calc.id}>
            <strong>{calc.title}</strong>
            <small>{calc.status}</small>
          </a>
        ))}
      </div>
    </section>
  );
}
