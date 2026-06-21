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
  icon: '/icons/icon-192.png',
  accent: '#0f766e',
};

export const primarySections = [
  {
    id: routes.protocols,
    title: 'Protocolos',
    description: 'Diagnostico inicial y derivacion.',
    icon: FileText,
  },
  {
    id: routes.tools,
    title: 'Herramientas',
    description: 'Calculos y ayudas pendientes.',
    icon: Calculator,
  },
  {
    id: routes.bibliography,
    title: 'Bibliografia',
    description: 'Fuentes pendientes.',
    icon: BookOpen,
  },
];

export const secondarySections = [
  { id: routes.protocols, title: 'Protocolos', description: 'Listado estructural no operativo.', icon: FolderOpen },
  { id: routes.tools, title: 'Herramientas', description: 'Sin formulas clinicas activas.', icon: Wrench },
  { id: routes.bibliography, title: 'Bibliografia', description: 'Pendiente de fuentes.', icon: Library },
];

export const bottomNavItems = [
  { id: routes.home, label: 'Inicio', icon: HeartPulse },
  { id: routes.protocols, label: 'Protocolos', icon: FileText },
  { id: routes.tools, label: 'Herramientas', icon: Calculator },
  { id: routes.more, label: 'Mas', icon: MoreHorizontal },
];

export const desktopNavItems = [
  { id: routes.protocols, label: 'Protocolos' },
  { id: routes.tools, label: 'Herramientas' },
  { id: routes.bibliography, label: 'Bibliografia' },
];

export const sectionIcons = {
  [routes.procedures]: Stethoscope,
  [routes.circuits]: Route,
};
