import React from "react";
import ResultCard from "./ResultCard";

export default function Results({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="results">
      <h2>You might also like</h2>
      <ul className="results-list">
        {recommendations.map((m) => (
          <ResultCard key={m.id} m={m} />
        ))}
      </ul>
    </div>
  );
}
