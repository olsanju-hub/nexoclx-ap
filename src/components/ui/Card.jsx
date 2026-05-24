export function Card({ as: Component = 'section', className = '', children, ...props }) {
  return (
    <Component className={`clinical-card ${className}`} {...props}>
      {children}
    </Component>
  );
}
