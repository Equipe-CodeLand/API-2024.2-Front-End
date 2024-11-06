// frontend/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://3.210.53.70:5000', // Base URL do backend
  timeout: 1000, // Timeout para requisições
});
const serviceApi = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL || 'http://23.22.15.186:5001', // Base URL do backend
  timeout: 1000, // Timeout para requisições
});

export default api;
