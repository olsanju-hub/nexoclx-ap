export function LinkedText({ text, medications }) {
  let parts = [text];
  medications.forEach((med) => {
    if (!med.cima.startsWith('http')) return;
    const escaped = med.generic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
    parts = parts.flatMap((part) => {
      if (typeof part !== 'string') return [part];
      const chunks = part.split(regex);
      return chunks.map((chunk, index) => (
        index % 2 === 1
          ? <a key={`${med.id}-${chunk}-${index}`} href={med.cima} target="_blank" rel="noopener noreferrer">{chunk}</a>
          : chunk
      ));
    });
  });
  return <>{parts}</>;
}
