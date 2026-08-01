# Movie Recommender — a simple React + Python ML example

A minimal, content-based movie recommendation system. Pick a movie you
like, and a small machine learning model finds others that are textually
similar (by genre + description). No user accounts, no ratings history,
no external API keys — everything runs locally.

## How the ML part works

This uses **content-based filtering**, one of the two classic approaches to
recommendation (the other is *collaborative filtering*, which uses other
users' behavior instead of content — that needs a lot more data, so it's a
good "next step" once this makes sense).

1. **TF-IDF vectorization** — each movie's genres + description is turned
   into a vector of numbers. Words that are distinctive to a movie (like
   "rebellion" or "detective") get a higher weight than common words (like
   "a" or "the").
2. **Cosine similarity** — every pair of movies is compared by the angle
   between their vectors. A score near 1.0 means "very similar," near 0
   means "unrelated."
3. **Ranking** — for whichever movie you pick, the other 11 movies are
   sorted by similarity score, and the top 5 are returned.

All of the actual logic lives in `backend/recommender.py` — it's under 50
lines and is commented step by step. This same pattern (vectorize text →
compare vectors → rank) is the foundation for a huge range of real-world
systems: article/product recommendations, semantic search, "duplicate
question" detection, etc.

## Project structure

```
movie-recommender/
├── backend/
│   ├── movies.py          # tiny hand-written dataset (12 movies)
│   ├── recommender.py     # the ML logic (TF-IDF + cosine similarity)
│   ├── main.py             # FastAPI app exposing it as a REST API
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx          # picker UI + calls the API
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Running it

**1. Start the backend** (Python 3.9+):

```bash
cd backend
python3 -m pip install -r requirements.txt
python3 -m uvicorn main:app --reload
```

If you see an "Address already in use" message, another server is already
running on port 8000. Stop it or start the app on a different port, for
example:

```bash
python3 -m uvicorn main:app --reload --port 8001
```

This starts the API at `http://127.0.0.1:8000`. You can sanity-check it
directly in a browser at `http://localhost:8000/movies`, or try
`http://localhost:8000/recommend/1`.

**2. Start the frontend** (in a second terminal, Node 18+):

```bash
cd frontend
npm install
npm run dev
```

This starts the React app, usually at `http://localhost:5173`. Open that
URL, pick a movie from the dropdown, and click "Get recommendations."

## Ways to extend this once it clicks

- **Swap the dataset** for something you care about (books, songs,
  recipes) — just change `movies.py`'s shape and the `corpus` line in
  `recommender.py`.
- **Use real embeddings instead of TF-IDF.** TF-IDF only understands exact
  word overlap. Swapping in a sentence embedding model (e.g. from the
  `sentence-transformers` library) would let it understand that "space
  battle" and "starship combat" are related even with zero shared words.
- **Add collaborative filtering.** If you had user ratings, you could
  recommend based on "people who liked what you liked also liked X" —
  a genuinely different technique worth comparing against this one.
- **Persist the model.** Right now it's recomputed on every server start.
  For a bigger dataset you'd fit it once and save it with `joblib`.
