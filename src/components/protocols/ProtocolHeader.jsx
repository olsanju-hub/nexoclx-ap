import { routes } from '../../utils/routing';

export function ProtocolHeader({ protocol }) {
  return (
    <>
      <a className="back-link" href={routes.protocols}>← Protocolos</a>
      <div className="protocol-title">
        <h1>{protocol.title}</h1>
      </div>
    </>
  );
}
