const API_BASE_URL = "/api"; // sử dụng proxy trong vite.config.js
// const APP_TOKEN = import.meta.env.VITE_APP_TOKEN; // nên để trong .env
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const headers = {
  "Content-Type": "application/json",
  "x-app-token": APP_TOKEN,
};

export const movieService = {
  async getMostPopular({ page = 1, limit = 12 } = {}) {
    const res = await fetch(
      `${API_BASE_URL}/movies/most-popular?page=${page}&limit=${limit}`,
      {
        headers,
      }
    );
    if (!res.ok) throw new Error("Failed to fetch popular movies");
    return res.json();
  },

  async getTopRated({ page = 1, limit = 12, category = "IMDB_TOP_50" } = {}) {
    const res = await fetch(
      `${API_BASE_URL}/movies/top-rated?category=${category}&page=${page}&limit=${limit}`,
      {
        headers,
      }
    );
    if (!res.ok) throw new Error("Failed to fetch top rated movies");
    return res.json();
  },

  async getAll({ page = 1, limit = 10 }) {
    const res = await fetch(
      `${API_BASE_URL}/movies?page=${page}&limit=${limit}`,
      { headers }
    );
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
  },

  async getDetail(id) {
    const res = await fetch(`${API_BASE_URL}/movies/${id}`, { headers });

    if (!res.ok) {
      throw new Error(`Failed to fetch movie detail: ${res.status}`);
    }

    return res.json();
  },

  async searchMovies({ q, title, genre, person, page = 1, limit = 10 } = {}) {
    const params = new URLSearchParams();

    if (q) params.append("q", q);
    if (title) params.append("title", title);
    if (genre) params.append("genre", genre);
    if (person) params.append("person", person);
    params.append("page", page);
    params.append("limit", limit);

    const res = await fetch(
      `${API_BASE_URL}/movies/search?${params.toString()}`,
      { headers }
    );

    if (!res.ok) throw new Error("Search movies failed");
    return res.json();
  },

  async getReviews(movieId, { page = 1, limit = 5, sort = "newest" } = {}) {
    const res = await fetch(
      `${API_BASE_URL}/movies/${movieId}/reviews?page=${page}&limit=${limit}&sort=${sort}`,
      { headers }
    );
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  },
};
