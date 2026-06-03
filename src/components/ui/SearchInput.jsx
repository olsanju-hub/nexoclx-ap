export function SearchInput({ value, onChange }) {
  return (
    <label htmlFor="main-search">
      Buscar protocolo, síntoma, cálculo...
      <input
        id="main-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar protocolo, síntoma, cálculo..."
      />
    </label>
  );
}
