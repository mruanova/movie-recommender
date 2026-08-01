from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from movies import MOVIES
from recommender import recommender

app = FastAPI(title="Movie Recommender API")

# Allow the React dev server (usually on localhost:5173) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/movies")
def list_movies():
    """Return every movie so the frontend can populate a picker."""
    return MOVIES


@app.get("/recommend/{movie_id}")
def recommend(movie_id: int, top_n: int = 5):
    """Return the top_n movies most similar to the given movie_id."""
    results = recommender.recommend(movie_id, top_n=top_n)
    if results is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return results


# Run with: uvicorn main:app --reload
