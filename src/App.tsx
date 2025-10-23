import './App.css';
import { Routes, Route } from "react-router-dom";
import { PodcastList } from "./components/PodcastList";
import { PodcastDetail } from "./components/PodcastDetail";
import { EpisodeDetail } from "./components/EpisodeDetail";
import { SearchBar } from "./components/SearchBar";

function App() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎧 Top Podcasts</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar />
              <PodcastList />
            </>
          }
        />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetail />}
        />
      </Routes>
    </main>
  );
}

export default App;
