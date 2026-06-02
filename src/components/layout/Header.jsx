import { routes } from '../../utils/routing';

const navItems = [
  ['inicio', 'Inicio', routes.home],
  ['protocolos', 'Protocolos', routes.protocols],
  ['herramientas', 'Herramientas', routes.tools],
  ['mas', 'Más', routes.more],
];

export function Header({ activeRoute }) {
  return (
    <header className="app-header">
      <a className="brand" href={routes.home} aria-label="Inicio NexoClx AP">
        <img src={`${import.meta.env.BASE_URL}assets/icons/icon-192.png?v=9`} alt="" width="42" height="42" />
        <span><strong>NexoClx AP</strong><small>Protocolos rápidos de Atención Primaria</small></span>
      </a>
      <nav className="top-nav" aria-label="Navegación principal">
        {navItems.map(([key, label, href]) => (
          <a key={key} href={href} aria-current={activeRoute === key ? 'true' : undefined}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
