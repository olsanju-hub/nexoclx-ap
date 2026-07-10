import {
  Calculator,
  FileText,
  FolderOpen,
  HeartPulse,
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
    description: 'Estructura preparada para futuros protocolos.',
    icon: FileText,
  },
  {
    id: routes.tools,
    title: 'Herramientas',
    description: 'Estructura preparada para futuras herramientas.',
    icon: Calculator,
  },
];

export const secondarySections = [
  { id: routes.protocols, title: 'Protocolos', description: 'Estructura preparada para futuros protocolos.', icon: FolderOpen },
  { id: routes.tools, title: 'Herramientas', description: 'Estructura preparada para futuras herramientas.', icon: Wrench },
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
];

export const sectionIcons = {
  [routes.procedures]: Stethoscope,
  [routes.circuits]: Route,
};
