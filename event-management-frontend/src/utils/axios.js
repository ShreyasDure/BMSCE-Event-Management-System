import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      const path = window.location.pathname || '';
      const isAuthPage = path === '/login' || path === '/signup' || path === '/forgot-password';

      if (!isAuthPage) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 5000);
      }
    }
    return Promise.reject(error);
  }
);

export default api;