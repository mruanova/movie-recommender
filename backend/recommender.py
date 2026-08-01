"""
This is the "AI/ML" part of the project. It's a content-based recommender:
it recommends movies that are textually similar to a movie you already like,
based on genre + description. No user history or ratings needed.

The core idea, in 3 steps:

1. Turn each movie's text (genres + description) into a vector of numbers
   using TF-IDF (Term Frequency-Inverse Document Frequency). TF-IDF scores
   words higher if they appear a lot in one movie but not in most others,
   which makes distinctive words (e.g. "rebellion", "detective") matter more
   than common ones (e.g. "a", "the").

2. Compare every pair of movies using cosine similarity, which measures the
   angle between two vectors. 1.0 means "pointing in the same direction"
   (very similar), 0 means "unrelated".

3. For a chosen movie, sort every other movie by similarity score and return
   the top N.

This is the same family of technique used (in more sophisticated form) by
real recommendation systems for articles, products, and streaming content.
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from movies import MOVIES


class MovieRecommender:
    def __init__(self, movies):
        self.movies = movies

        # Combine genres + description into one string per movie -- this is
        # the "document" TF-IDF will vectorize.
        corpus = [f"{m['genres']} {m['description']}" for m in movies]

        # stop_words="english" strips common filler words like "a", "the".
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)

        # Precompute similarity between every pair of movies once, up front,
        # so each recommendation request is just a fast lookup.
        self.similarity_matrix = cosine_similarity(self.tfidf_matrix)

        self.id_to_index = {m["id"]: i for i, m in enumerate(movies)}

    def recommend(self, movie_id: int, top_n: int = 5):
        if movie_id not in self.id_to_index:
            return None

        idx = self.id_to_index[movie_id]
        scores = list(enumerate(self.similarity_matrix[idx]))

        # Exclude the movie itself, sort by similarity score descending.
        scores = [(i, s) for i, s in scores if i != idx]
        scores.sort(key=lambda pair: pair[1], reverse=True)

        top_matches = scores[:top_n]
        return [
            {**self.movies[i], "similarity": round(float(score), 3)}
            for i, score in top_matches
        ]


recommender = MovieRecommender(MOVIES)
