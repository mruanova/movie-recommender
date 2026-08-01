import React from "react";

export default function ResultCard({ m }) {
  return (
    <li className="result-card">
      <div className="result-top">
        <span className="result-title">{m.title}</span>
        <span className="result-score">{Math.round(m.similarity * 100)}% match</span>
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
  );
}
