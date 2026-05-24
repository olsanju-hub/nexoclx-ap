export function normalize(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function protocolSearchText(protocol, medicationsById) {
  const meds = protocol.meds.map((id) => medicationsById[id]?.generic).join(' ');
  return normalize([
    protocol.title,
    protocol.category,
    protocol.focus,
    protocol.keywords.join(' '),
    protocol.synonyms.join(' '),
    meds,
  ].join(' '));
}
