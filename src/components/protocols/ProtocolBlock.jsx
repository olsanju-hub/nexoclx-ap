export function ProtocolBlock({ id, title, children }) {
  return (
    <section
      className="clinical-block active-tab-panel"
      id={id ? `panel-${id}` : undefined}
      role={id ? 'tabpanel' : undefined}
      aria-labelledby={id ? `tab-${id}` : undefined}
    >
      <h2>{title}</h2>
      {children}
    </section>
  );
}
