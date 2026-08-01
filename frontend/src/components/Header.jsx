import React from "react";

export default function Header() {
  return (
    <header className="header">
      <span className="eyebrow">A tiny ML example</span>
      <h1>Movie Recommender</h1>
      <p className="subtitle">
        Content-based filtering with TF-IDF + cosine similarity. Pick a
        movie you like, and the model finds others with similar genres and
        descriptions &mdash; no user ratings required.
      </p>
    </header>
  );
}
