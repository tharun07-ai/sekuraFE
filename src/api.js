import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://sekurabe.onrender.com/",
});

// TOKEN INTERCEPTOR
api.interceptors.request.use(
  (config) => {

    const token = sessionStorage.getItem("token");
    const hasAuthorizationHeader =
      Boolean(config.headers?.Authorization) ||
      Boolean(config.headers?.authorization);

    if (token && !hasAuthorizationHeader) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;
