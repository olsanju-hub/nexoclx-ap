import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function AppShell({ activeRoute, children }) {
  const showSectionNav = activeRoute !== 'inicio';

  return (
    <>
      <Header activeRoute={activeRoute} showNav={false} />
      <main id="app" className={showSectionNav ? undefined : 'home-main'} tabIndex="-1">{children}</main>
      {showSectionNav ? <BottomNav activeRoute={activeRoute} /> : null}
    </>
  );
}
