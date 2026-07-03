import {
  BookOpen,
  Calculator,
  FileText,
  FolderOpen,
  HeartPulse,
  Library,
  MoreHorizontal,
  Route,
  Stethoscope,
  Wrench,
} from 'lucide-react';
import { routes } from '../app/routes.js';

export const appConfig = {
  name: 'NexoClx AP',
  context: 'Atencion Primaria',
  icon: `${import.meta.env.BASE_URL}icons/icon-192.png`,
  accent: '#0f766e',
  homeVariant: 'standard',
};

export const primarySections = [
  {
    id: routes.protocols,
    title: 'Protocolos',
    description: 'Guías clínicas por motivo de consulta.',
    icon: FileText,
  },
  {
    id: routes.tools,
    title: 'Herramientas',
    description: 'Valoración inicial.',
    icon: Calculator,
  },
  {
    id: routes.bibliography,
    title: 'Bibliografía',
    description: 'Fuentes clínicas consultadas.',
    icon: BookOpen,
  },
];

export const secondarySections = [
  { id: routes.protocols, title: 'Protocolos', description: 'Guías clínicas por motivo de consulta.', icon: FolderOpen },
  { id: routes.tools, title: 'Herramientas', description: 'Valoración inicial.', icon: Wrench },
  { id: routes.bibliography, title: 'Bibliografía', description: 'Fuentes clínicas consultadas.', icon: Library },
];

export const bottomNavItems = [
  { id: routes.home, label: 'Inicio', icon: HeartPulse },
  { id: routes.protocols, label: 'Protocolos', icon: FileText },
  { id: routes.tools, label: 'Herramientas', icon: Calculator },
  { id: routes.more, label: 'Más', icon: MoreHorizontal },
];

export const desktopNavItems = [
  { id: routes.protocols, label: 'Protocolos' },
  { id: routes.tools, label: 'Herramientas' },
  { id: routes.bibliography, label: 'Bibliografía' },
];

export const sectionIcons = {
  [routes.procedures]: Stethoscope,
  [routes.circuits]: Route,
};
