export function Button({ children, className = '', ...props }) {
  return (
    <button className={`button-link ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}
