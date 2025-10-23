import { useAppContext } from "../context/AppContext";

export const PodcastList = () => {
  const { filteredPodcasts, loading, error } = useAppContext();

  if (loading) return <p>Cargando podcasts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!filteredPodcasts.length) return <p>No se encontraron resultados.</p>;

  return (
    <div className="podcast-list">
      {filteredPodcasts.map(podcast => (
        <div
          key={podcast.id}
          className="item"
        >
          <img
            src={podcast.image}
            alt={podcast.title}
          />
          <h3>{podcast.title}</h3>
          <p>{podcast.author}</p>
        </div>
      ))}
    </div>
  );
};
