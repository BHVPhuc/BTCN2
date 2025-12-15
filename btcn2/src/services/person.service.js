const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const headers = {
  "Content-Type": "application/json",
  "x-app-token": APP_TOKEN,
};

export const personService = {
  async getDetail(id) {
    const res = await fetch(`/api/persons/${id}`, { headers });

    if (!res.ok) {
      throw new Error("Failed to fetch person detail");
    }

    return res.json();
  },
};
