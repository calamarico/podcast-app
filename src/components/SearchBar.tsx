import { useAppContext } from "../context/AppContext";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, filteredPodcasts } = useAppContext();

  return (
    <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="🔎 Buscar podcast o autor..."
        style={{
          padding: "0.8rem 1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
      <small style={{ color: "#666" }}>
        {filteredPodcasts.length} resultados encontrados
      </small>
    </div>
  );
};
