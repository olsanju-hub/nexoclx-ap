import { routes } from '../../utils/routing';
import { Badge } from '../ui/Badge';
import { ProtocolAlert } from './ProtocolAlert';

export function ProtocolHeader({ protocol }) {
  return (
    <>
      <a className="back-link" href={routes.protocols}>← Protocolos</a>
      <div className="protocol-title">
        <Badge>{protocol.category}</Badge>
        <h1>{protocol.title}</h1>
        <p>{protocol.focus}</p>
      </div>
      <ProtocolAlert />
      <div className="protocol-context">
        <span>{protocol.category}</span>
        <span>{protocol.focus}</span>
        <span>{protocol.type}</span>
        <span>{protocol.mainSource}</span>
      </div>
    </>
  );
}
