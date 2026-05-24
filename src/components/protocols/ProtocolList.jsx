import { EmptyState } from '../ui/EmptyState';
import { ProtocolCard } from './ProtocolCard';

export function ProtocolList({ protocols }) {
  if (!protocols.length) return <EmptyState>No hay protocolos que coincidan con la búsqueda.</EmptyState>;
  return (
    <div className="protocol-list">
      {protocols.map((protocol) => <ProtocolCard key={protocol.id} protocol={protocol} />)}
    </div>
  );
}
