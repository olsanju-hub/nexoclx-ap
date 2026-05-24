import { useEffect, useMemo, useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { SearchInput } from './components/ui/SearchInput';
import { ProtocolList } from './components/protocols/ProtocolList';
import { ProtocolDetail, BibliographyCard } from './components/protocols/ProtocolDetail';
import { protocols } from './data/protocols';
import { medications } from './data/medications';
import { calculators } from './data/calculators';
import { bibliography } from './data/bibliography';
import { calculateBasal, calculateRenal } from './utils/clinicalFormat';
import { normalize, protocolSearchText } from './utils/search';
import { parseRoute, routes } from './utils/routing';

const categories = ['Todas', ...new Set(protocols.map((protocol) => protocol.category))];
const medicationsById = Object.fromEntries(medications.map((med) => [med.id, med]));

function useHashRoute() {
  const [route, setRoute] = useState(() => parseRoute());
  useEffect(() => {
    const update = () => setRoute(parseRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.name, route.id]);
  return route;
}

function PageHead({ title, subtitle }) {
  return (
    <section className="page-head">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  );
}

function ProtocolSearch({ query, setQuery, category, setCategory }) {
  return (
    <div className="search-panel">
      <SearchInput value={query} onChange={setQuery} />
      <div className="filter-group">
        <span>Categoría</span>
        <div className="filters" role="list" aria-label="Categorías">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              aria-pressed={category === item ? 'true' : undefined}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function useFilteredProtocols(query, category) {
  return useMemo(() => {
    const q = normalize(query);
    return protocols.filter((protocol) => {
      const categoryOk = category === 'Todas' || protocol.category === category;
      const queryOk = !q || protocolSearchText(protocol, medicationsById).includes(q);
      return categoryOk && queryOk;
    });
  }, [query, category]);
}

function HomeView({ query, setQuery, category, setCategory }) {
  const visibleProtocols = useFilteredProtocols(query, category);
  const hasActiveFilter = Boolean(normalize(query)) || category !== 'Todas';
  return (
    <>
      <PageHead title="NexoClx AP" subtitle="Protocolos rápidos de Atención Primaria para consulta clínica con tiempo limitado." />
      <ProtocolSearch query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
      <section className="split">
        {hasActiveFilter ? (
          <div>
            <h2>Resultados</h2>
            <ProtocolList protocols={visibleProtocols} />
          </div>
        ) : null}
        <aside className="side-panel">
          <h2>Herramientas</h2>
          {calculators.map((calc) => (
            <a href={routes.tools} className="tool-link" key={calc.id}>
              <strong>{calc.title}</strong>
              <small>{calc.protocol}</small>
            </a>
          ))}
        </aside>
      </section>
    </>
  );
}

function ProtocolsView({ query, setQuery, category, setCategory }) {
  const visibleProtocols = useFilteredProtocols(query, category);
  return (
    <>
      <PageHead title="Protocolos" subtitle="Lista filtrable por categoría, sinónimos, síntomas y fármacos." />
      <ProtocolSearch query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
      <section><ProtocolList protocols={visibleProtocols} /></section>
    </>
  );
}

function ToolsView({ selectedId, fromProtocolId }) {
  const items = selectedId ? calculators.filter((calc) => calc.id === selectedId) : calculators;
  const protocol = fromProtocolId ? protocols.find((item) => item.id === fromProtocolId) : null;
  return (
    <>
      <PageHead title="Herramientas / Calculadoras" subtitle="Solo se incluyen herramientas vinculadas a decisiones de los protocolos V1." />
      {protocol ? <a className="back-link" href={routes.protocol(protocol.id)}>← Volver a {protocol.title}</a> : null}
      {items.map((calc) => <Calculator key={calc.id} calc={calc} />)}
      {selectedId && items.length ? <p><a className="button-link" href={routes.tools}>Ver todas las herramientas</a></p> : null}
    </>
  );
}

function Calculator({ calc }) {
  return (
    <article className="calculator" id={calc.id}>
      <h2>{calc.title}</h2>
      <dl>
        <dt>Protocolo</dt><dd>{calc.protocol}</dd>
        <dt>Variables</dt><dd>{calc.variables.join(', ')}</dd>
        <dt>Fórmula/criterio</dt><dd>{calc.formula}</dd>
        <dt>Fuente</dt><dd>{calc.source}</dd>
        <dt>Revisión</dt><dd>{calc.reviewed}</dd>
      </dl>
      <p className="notice">{calc.warning}</p>
      {calc.id === 'insulina-basal' ? <BasalCalculator /> : null}
      {calc.id === 'cockcroft-gault' ? <RenalCalculator /> : null}
      {calc.id === 'score2-link' ? <p><a className="button-link" href="https://www.heartscore.org/" target="_blank" rel="noopener noreferrer">Abrir ESC HeartScore oficial</a></p> : null}
    </article>
  );
}

function BasalCalculator() {
  const [result, setResult] = useState([]);
  return (
    <form
      className="calc-form"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        setResult(calculateBasal({
          ...data,
          fragile: new FormData(form).has('fragile'),
          risk: new FormData(form).has('risk'),
        }));
      }}
    >
      <label>Peso kg <input name="weight" inputMode="decimal" required /></label>
      <label>Edad <input name="age" inputMode="numeric" required /></label>
      <label>Glucemia basal media mg/dl <input name="fasting" inputMode="decimal" required /></label>
      <label>HbA1c % <input name="hba1c" inputMode="decimal" /></label>
      <label>eGFR ml/min/1,73 m2 <input name="egfr" inputMode="decimal" /></label>
      <label>Tratamiento actual <textarea name="treatment" rows="2" /></label>
      <label><input type="checkbox" name="fragile" /> Fragilidad o alto riesgo de hipoglucemia</label>
      <label><input type="checkbox" name="risk" /> Situación de riesgo actual: cetosis, vómitos, deshidratación, infección grave, embarazo o sospecha DM1</label>
      <button type="submit">Calcular orientación</button>
      <output className="calc-output">{result.map((item) => <span key={item}>{item}<br /></span>)}</output>
    </form>
  );
}

function RenalCalculator() {
  const [result, setResult] = useState([]);
  return (
    <form
      className="calc-form"
      onSubmit={(event) => {
        event.preventDefault();
        setResult(calculateRenal(Object.fromEntries(new FormData(event.currentTarget).entries())));
      }}
    >
      <label>Edad <input name="age" inputMode="numeric" required /></label>
      <label>Peso kg <input name="weight" inputMode="decimal" required /></label>
      <label>Sexo
        <select name="sex"><option value="male">Hombre</option><option value="female">Mujer</option></select>
      </label>
      <label>Creatinina <input name="creatinine" inputMode="decimal" required /></label>
      <label>Unidad
        <select name="unit"><option value="mgdl">mg/dl</option><option value="umol">µmol/l</option></select>
      </label>
      <button type="submit">Calcular ClCr</button>
      <output className="calc-output">{result.map((item) => <span key={item}>{item}<br /></span>)}</output>
    </form>
  );
}

function BibliographyView() {
  return (
    <>
      <PageHead title="Bibliografía" subtitle="Fuentes usadas por protocolo, año, institución y trazabilidad." />
      <p className="governance-note">
        NexoClx AP es una herramienta de apoyo clínico. No sustituye el juicio clínico,
        la valoración individual ni las guías oficiales vigentes.
      </p>
      <div className="biblio-card-list">
        {bibliography.map((bib) => <BibliographyCard key={bib.id} bib={bib} />)}
      </div>
    </>
  );
}

export default function App() {
  const route = useHashRoute();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const activeRoute = route.name === 'herramientas' ? 'herramientas' : route.name === 'bibliografia' ? 'bibliografia' : route.name === 'protocolos' ? 'protocolos' : 'inicio';

  let content;
  if (route.name === 'protocolos' && route.id) {
    const protocol = protocols.find((item) => item.id === route.id);
    content = protocol ? (
      <ProtocolDetail protocol={protocol} medications={medications} calculators={calculators} bibliography={bibliography} />
    ) : (
      <ProtocolsView query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
    );
  } else if (route.name === 'protocolos') {
    content = <ProtocolsView query={query} setQuery={setQuery} category={category} setCategory={setCategory} />;
  } else if (route.name === 'herramientas') {
    content = <ToolsView selectedId={route.id} fromProtocolId={route.params.get('from')} />;
  } else if (route.name === 'bibliografia') {
    content = <BibliographyView />;
  } else {
    content = <HomeView query={query} setQuery={setQuery} category={category} setCategory={setCategory} />;
  }

  return <AppShell activeRoute={activeRoute}>{content}</AppShell>;
}
