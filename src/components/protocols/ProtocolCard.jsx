import { routes } from '../../utils/routing';

export function ProtocolCard({ protocol }) {
  return (
    <a className="protocol-row" href={routes.protocol(protocol.id)} data-protocol-open="true">
      <span>
        <strong>{protocol.title}</strong>
        <small>{protocol.category} · {protocol.focus}</small>
      </span>
    </a>
  );
}
