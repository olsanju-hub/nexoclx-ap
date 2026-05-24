import { LinkedText } from './LinkedText';

export function ProtocolSection({ section, medications }) {
  return (
    <details>
      <summary>{section.title}</summary>
      <ul>
        {section.items.map((item) => (
          <li key={item}><LinkedText text={item} medications={medications} /></li>
        ))}
      </ul>
    </details>
  );
}
