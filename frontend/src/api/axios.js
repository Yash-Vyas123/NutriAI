import axios from 'axios';

// All API calls go to the backend URL set in .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.endsWith('/') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/`,
  headers: { 'Content-Type': 'application/json' },
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nutriai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 (expired token) globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nutriai_token');
      localStorage.removeItem('nutriai_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
