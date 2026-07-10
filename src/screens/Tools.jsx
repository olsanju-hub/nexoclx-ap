import { CompactList } from '../components/lists/CompactList.jsx';
import { ListRow } from '../components/lists/ListRow.jsx';
import { htaSupportTools } from '../data/htaSupportTools.js';

export function Tools({ onOpen }) {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Herramientas</h1>
        <p>Calculadoras, escalas y utilidades transversales.</p>
      </div>
      <CompactList label="Herramientas de apoyo HTA">
        {htaSupportTools.map((tool) => (
          <ListRow
            key={tool.id}
            title={tool.title}
            description={tool.description}
            meta={tool.status}
            onClick={() => onOpen(tool.id)}
          />
        ))}
      </CompactList>
    </div>
  );
}
