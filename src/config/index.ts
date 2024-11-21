import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.210.53.70:5000', // Base URL do backend principal
});

const serviceApi = axios.create({
  baseURL: 'http://23.22.15.186:5001', // Base URL do serviço Python
});

export { api, serviceApi };