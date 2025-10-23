import './App.css';
import { PodcastList } from "./components/PodcastList";


function App() {

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎧 Top Podcasts</h1>
      <PodcastList />
    </main>
  );
}

export default App;
