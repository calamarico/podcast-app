import { createContext, useContext, type ReactNode } from "react";
import { useFetchPodcasts, type Podcast } from "../hooks/useFetchPodcasts";

type AppContextType = {
  podcasts: Podcast[];
  loading: boolean;
  error: string | null;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { podcasts, loading, error } = useFetchPodcasts();

  return (
    <AppContext.Provider value={{ podcasts, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
};
