export function EmptyState({ children = 'No hay resultados para la búsqueda.' }) {
  return <p className="empty">{children}</p>;
}
