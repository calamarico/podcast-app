import { useEffect, useState } from "react";

export interface Podcast {
  id: string;
  title: string;
  author: string;
  image: string;
}

export const useFetchPodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
          )}`
        );

        if (!res.ok) throw new Error("Network error");
        const data = await res.json();

        const parsed = JSON.parse(data.contents);
        const entries = parsed.feed.entry.map((item: any) => ({
          id: item.id.attributes["im:id"],
          title: item["im:name"].label,
          author: item["im:artist"].label,
          image: item["im:image"][2].label,
        }));

        setPodcasts(entries);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return { podcasts, loading, error };
};
