import './App.css';
import { PodcastList } from "./components/PodcastList";
import { SearchBar } from "./components/SearchBar";

function App() {

  return (
    <main>
      <h1>🎧 Top Podcasts</h1>
      <SearchBar />
      <PodcastList />
    </main>
  );
}

export default App;
