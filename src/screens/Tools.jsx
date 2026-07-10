import { CompactList } from '../components/lists/CompactList.jsx';
import { ListRow } from '../components/lists/ListRow.jsx';

export function Tools({ onOpenHta }) {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Herramientas</h1>
        <p>Herramientas clínicas de Atención Primaria.</p>
      </div>
      <CompactList label="Listado de herramientas">
        <ListRow
          title="HTA"
          description="Evaluar cifras, decidir conducta, escalar tratamiento y consultar dosis."
          meta="AP adulta"
          onClick={onOpenHta}
        />
      </CompactList>
    </div>
  );
}
