// frontend/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Base URL do backend
  timeout: 1000, // Timeout para requisições
});

export default api;
