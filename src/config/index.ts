import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Base URL do backend principal
});

const serviceApi = axios.create({
  baseURL: 'http://localhost:5001', // Base URL do serviço Python
});

export { api, serviceApi };
