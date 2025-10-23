import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Episode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis?: number;
  description?: string;
  episodeUrl?: string;
}

export const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
          )}`
        );
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();
        const parsed = JSON.parse(data.contents);

        // El primer item es el podcast, los siguientes son episodios
        const entries = parsed.results.slice(1).map((ep: any) => ({
          trackId: ep.trackId,
          trackName: ep.trackName,
          releaseDate: ep.releaseDate,
          trackTimeMillis: ep.trackTimeMillis,
          description: ep.description || ep.shortDescription,
          episodeUrl: ep.episodeUrl,
        }));

        setEpisodes(entries);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetail();
  }, [podcastId]);

  const formatDuration = (ms?: number) => {
    if (!ms) return "—";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) return <p>Cargando episodios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
        ← Volver
      </Link>
      <h2>Episodios del podcast</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Título</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Fecha</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Duración</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map(ep => (
            <tr key={ep.trackId} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>
                <Link
                  to={`/podcast/${podcastId}/episode/${ep.trackId}`}
                  state={{ episode: ep }} // 🔹 pasamos los datos del episodio
                  style={{ color: "#0077cc", textDecoration: "none" }}
                >
                  {ep.trackName}
                </Link>
              </td>
              <td style={{ padding: "0.5rem" }}>
                {new Date(ep.releaseDate).toLocaleDateString()}
              </td>
              <td style={{ padding: "0.5rem" }}>
                {formatDuration(ep.trackTimeMillis)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
