import { createContext, useContext, type ReactNode, useMemo, useState } from "react";
import { useFetchPodcasts, type Podcast } from "../hooks/useFetchPodcasts";

type AppContextType = {
  podcasts: Podcast[];
  filteredPodcasts: Podcast[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { podcasts, loading, error } = useFetchPodcasts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPodcasts = useMemo(() => {
    if (!searchQuery.trim()) return podcasts;
    const query = searchQuery.toLowerCase();
    return podcasts.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query)
    );
  }, [podcasts, searchQuery]);

  return (
    <AppContext.Provider
      value={{ podcasts, filteredPodcasts, loading, error, searchQuery, setSearchQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext debe usarse dentro de un AppProvider");
  return context;
};
