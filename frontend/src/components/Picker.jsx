import React from "react";

export default function Picker({
  movies,
  selectedId,
  setSelectedId,
  onGetRecommendations,
  loading,
  selectedMovie,
}) {
  return (
    <div className="picker">
      <label htmlFor="movie-select">If you liked&hellip;</label>
      <div className="picker-row">
        <select
          id="movie-select"
          value={selectedId ?? ""}
          onChange={(e) => {
            setSelectedId(Number(e.target.value));
          }}
        >
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
        <button onClick={onGetRecommendations} disabled={loading}>
          {loading ? "Thinking…" : "Get recommendations"}
        </button>
      </div>
      {selectedMovie && <p className="genre-tag">{selectedMovie.genres}</p>}
    </div>
  );
}
