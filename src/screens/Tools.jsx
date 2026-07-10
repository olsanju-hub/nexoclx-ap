import { EmptyClinicalState } from '../components/feedback/EmptyClinicalState.jsx';

export function Tools() {
  return (
    <div className="screen">
      <div className="section-heading">
        <h1>Herramientas</h1>
        <p>Calculadoras, escalas y utilidades transversales.</p>
      </div>
      <EmptyClinicalState text="No hay herramientas transversales cargadas." />
    </div>
  );
}
