import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Episode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  description?: string;
  episodeUrl?: string;
  trackTimeMillis?: number;
}

export const EpisodeDetail = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
          )}`
        );
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();
        const parsed = JSON.parse(data.contents);

        // Filtramos el episodio específico
        const episodes: Episode[] = parsed.results
          .slice(1) // saltamos el podcast principal
          .map((ep: any) => ({
            trackId: ep.trackId,
            trackName: ep.trackName,
            releaseDate: ep.releaseDate,
            description: ep.description || ep.shortDescription,
            episodeUrl: ep.episodeUrl,
            trackTimeMillis: ep.trackTimeMillis,
          }));

        const found = episodes.find(ep => ep.trackId.toString() === episodeId);
        if (!found) throw new Error("Episodio no encontrado");

        setEpisode(found);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [podcastId, episodeId]);

  if (loading) return <p>Cargando episodio...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!episode) return <p>Episodio no encontrado.</p>;

  const formatDuration = (ms?: number) => {
    if (!ms) return "—";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section>
      <Link
        to={`/podcast/${podcastId}`}
        style={{ display: "inline-block", marginBottom: "1rem" }}
      >
        ← Volver al podcast
      </Link>

      <h2>{episode.trackName}</h2>
      <p style={{ color: "#666" }}>
        Fecha: {new Date(episode.releaseDate).toLocaleDateString()} | Duración: {formatDuration(episode.trackTimeMillis)}
      </p>

      {episode.description && (
        <p style={{ marginTop: "1rem", lineHeight: "1.6", color: "#333" }}>
          {episode.description}
        </p>
      )}

      {episode.episodeUrl && (
        <audio
          controls
          src={episode.episodeUrl}
          style={{ width: "100%", marginTop: "1.5rem" }}
        >
          Tu navegador no soporta el elemento de audio.
        </audio>
      )}
    </section>
  );
};
