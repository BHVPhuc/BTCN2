export const API_BASE_URL = "/api";
const APP_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const headers = {
    "Content-Type": "application/json",
    "x-app-token": APP_TOKEN,
};

export const authService = {
    async login(username, password) {
        const res = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers,
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            let errorMessage = "Login failed";
            try {
                const errorData = await res.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // ignore JSON parse error
            }
            throw new Error(errorMessage);
        }

        return res.json();
    },

    async register(data) {
        const res = await fetch(`${API_BASE_URL}/users/register`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            let errorMessage = "Registration failed";
            try {
                const errorData = await res.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // ignore
            }
            throw new Error(errorMessage);
        }

        return res.json();
    },
    async getProfile(token) {
        const res = await fetch(`${API_BASE_URL}/users/profile`, {
            method: "GET",
            headers: {
                ...headers,
                "Authorization": `Bearer ${token}`
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch profile");
        }
        return res.json();
    },
};
