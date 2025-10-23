import { useAppContext } from "../context/AppContext";

export const PodcastList = () => {
  const { podcasts, loading, error } = useAppContext();

  if (loading) return <p>Cargando podcasts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, 200px)" }}>
      {podcasts.map(podcast => (
        <div
          key={podcast.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            textAlign: "center",
            background: "#fff",
          }}
        >
          <img
            src={podcast.image}
            alt={podcast.title}
            style={{ width: "100%", borderRadius: "6px" }}
          />
          <h3 style={{ fontSize: "1rem", marginTop: "0.5rem" }}>{podcast.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>{podcast.author}</p>
        </div>
      ))}
    </div>
  );
};
