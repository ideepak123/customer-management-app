import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000, // prevents hanging requests
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: global error logging (helps during dev)
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
