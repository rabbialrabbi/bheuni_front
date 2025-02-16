import axios from 'axios'
import { router } from '@/router';

let api =   axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:8002/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  function (config) {
    // Get the latest token from localStorage

    const token = localStorage.getItem('authToken');
    // If a token exists, attach it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Continue the request
    return config;
  },
  function (error) {
    // Handle the error if something goes wrong before the request is sent
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      localStorage.removeItem('authToken');

      router.push('/auth/login');
    }
    return Promise.reject(error);
  }
);
export default api
