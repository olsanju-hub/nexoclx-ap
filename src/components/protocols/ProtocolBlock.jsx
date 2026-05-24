export function ProtocolBlock({ title, children }) {
  return (
    <section className="clinical-block active-tab-panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
