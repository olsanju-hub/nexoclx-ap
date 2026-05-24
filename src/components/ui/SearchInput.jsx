export function SearchInput({ value, onChange }) {
  return (
    <label htmlFor="main-search">
      Buscar protocolo, síntoma, fármaco o término clínico
      <input
        id="main-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="tensión, azúcar, colesterol, neumonía, NAC, insulina..."
      />
    </label>
  );
}
