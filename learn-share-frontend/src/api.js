import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

// Remove trailing slash if present
const cleanBaseURL = API_BASE_URL.replace(/\/$/, "");

export const API_BASE = `${cleanBaseURL}/api`; // ✅ must include /api

// Debug log (only in development)
if (import.meta.env.DEV) {
  console.log("🔧 API Configuration:", {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    API_BASE_URL: cleanBaseURL,
    API_BASE: API_BASE,
  });
}

// Create axios instance with base URL and auth interceptor
export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      return Promise.reject(error);
    } else if (error.request) {
      // Request made but no response (network error)
      console.error("Network error:", error.request);
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    } else {
      // Something else happened
      console.error("Error:", error.message);
      return Promise.reject(error);
    }
  }
);

// Auth APIs
export const loginUser = (data) => api.post(`/auth/login`, data);
export const signupUser = (data) => api.post(`/auth/signup`, data);

// User APIs
export const fetchUser = (userId) => api.get(`/users/${userId}`);
export const updateUserRole = (role) => api.patch("/users/role", { role });

// Connection APIs
export const sendConnectionRequest = (userId, targetUserId) =>
  api.post("/connection/send", { userId, targetUserId });
export const acceptConnectionRequest = (targetUserId, fromUserId) =>
  api.post("/connection/accept", { targetUserId, fromUserId });
export const rejectConnectionRequest = (targetUserId, fromUserId) =>
  api.post("/connection/reject", { targetUserId, fromUserId });
export const disconnectConnection = (userId, targetUserId) =>
  api.post("/connection/disconnect", { userId, targetUserId });
export const fetchReceivedRequests = (userId) =>
  api.get(`/connection/received/${userId}`);
export const fetchUserConnections = (userId) =>
  api.get(`/connection/user/${userId}`);

// Teachers API
export const fetchTeachers = () => api.get(`/teachers`);

// Skills API
export const fetchSkills = () => api.get(`/skills`);

// Chat API
export const fetchChatHistory = (userId, otherUserId) =>
  api.get(`/chat/history?userId=${userId}&otherUserId=${otherUserId}`);
