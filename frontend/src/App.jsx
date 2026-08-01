import { useEffect, useState } from "react";

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
      <header className="header">
        <span className="eyebrow">A tiny ML example</span>
        <h1>Movie Recommender</h1>
        <p className="subtitle">
          Content-based filtering with TF-IDF + cosine similarity. Pick a
          movie you like, and the model finds others with similar genres and
          descriptions &mdash; no user ratings required.
        </p>
      </header>

      <div className="picker">
        <label htmlFor="movie-select">If you liked&hellip;</label>
        <div className="picker-row">
          <select
            id="movie-select"
            value={selectedId ?? ""}
            onChange={(e) => {
              setSelectedId(Number(e.target.value));
              setRecommendations([]);
            }}
          >
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
          <button onClick={getRecommendations} disabled={loading}>
            {loading ? "Thinking…" : "Get recommendations"}
          </button>
        </div>
        {selectedMovie && (
          <p className="genre-tag">{selectedMovie.genres}</p>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {recommendations.length > 0 && (
        <div className="results">
          <h2>You might also like</h2>
          <ul className="results-list">
            {recommendations.map((m) => (
              <li key={m.id} className="result-card">
                <div className="result-top">
                  <span className="result-title">{m.title}</span>
                  <span className="result-score">
                    {Math.round(m.similarity * 100)}% match
                  </span>
                </div>
                <div className="similarity-bar">
                  <div
                    className="similarity-fill"
                    style={{ width: `${Math.min(m.similarity * 100, 100)}%` }}
                  />
                </div>
                <p className="result-genres">{m.genres}</p>
                <p className="result-desc">{m.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
