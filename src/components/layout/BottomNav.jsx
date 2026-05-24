import { routes } from '../../utils/routing';

const navItems = [
  ['inicio', 'Inicio', routes.home],
  ['protocolos', 'Protocolos', routes.protocols],
  ['herramientas', 'Herramientas', routes.tools],
  ['bibliografia', 'Fuentes', routes.bibliography],
];

export function BottomNav({ activeRoute }) {
  return (
    <nav className="bottom-nav" aria-label="Navegación móvil">
      {navItems.map(([key, label, href]) => (
        <a key={key} href={href} aria-current={activeRoute === key ? 'true' : undefined}>{label}</a>
      ))}
    </nav>
  );
}
