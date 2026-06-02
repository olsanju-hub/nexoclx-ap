export function SectionNav({ tabs, activeTab, onSelect }) {
  return (
    <div className="protocol-tabs" role="tablist" aria-label="Secciones de la patología">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          type="button"
          className="tab-button"
          role="tab"
          aria-selected={tab.id === activeTab ? 'true' : undefined}
          aria-controls={`panel-${tab.id}`}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
