import { decisionProtocols } from './decisionProtocols.js';

export const placeholderProtocols = [
  {
    id: 'hta',
    title: 'HTA',
    description: 'Decisión terapéutica en Atención Primaria adulta.',
    status: 'Interactivo',
  },
  ...decisionProtocols,
];
