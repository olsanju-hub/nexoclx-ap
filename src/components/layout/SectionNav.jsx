export function SectionNav({ tabs, activeTab, onSelect }) {
  return (
    <div className="protocol-tabs" role="tablist" aria-label="Secciones de la patología">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className="tab-button"
          aria-selected={tab.id === activeTab ? 'true' : undefined}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
