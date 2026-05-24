import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function AppShell({ activeRoute, children }) {
  return (
    <>
      <Header activeRoute={activeRoute} />
      <main id="app" tabIndex="-1">{children}</main>
      <BottomNav activeRoute={activeRoute} />
    </>
  );
}
