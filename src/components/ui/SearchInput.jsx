export function SearchInput({ value, onChange }) {
  return (
    <label htmlFor="main-search">
      Buscar
      <input
        id="main-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="síntoma, protocolo, cálculo..."
      />
    </label>
  );
}
