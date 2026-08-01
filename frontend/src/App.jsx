import { useEffect, useState } from "react";
import Header from "./components/Header";
import Picker from "./components/Picker";
import Results from "./components/Results";

// If you deploy this for real, move this to an environment variable.
const API_BASE = "http://localhost:8000";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the full movie list once, on mount.
  useEffect(() => {
    fetch(`${API_BASE}/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() =>
        setError("Couldn't reach the API. Is the backend running on port 8000?")
      );
  }, []);

  async function getRecommendations() {
    if (selectedId == null) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/recommend/${selectedId}?top_n=5`);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setRecommendations(data);
    } catch {
      setError("Couldn't reach the API. Is the backend running on port 8000?");
    } finally {
      setLoading(false);
    }
  }

  const selectedMovie = movies.find((m) => m.id === selectedId);

  return (
    <div className="page">
      <Header />

      <Picker
        movies={movies}
        selectedId={selectedId}
        setSelectedId={(id) => {
          setSelectedId(id);
          setRecommendations([]);
        }}
        onGetRecommendations={getRecommendations}
        loading={loading}
        selectedMovie={selectedMovie}
      />

      {error && <p className="error">{error}</p>}

      <Results recommendations={recommendations} />
    </div>
  );
}
