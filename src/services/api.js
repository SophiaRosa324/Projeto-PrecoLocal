import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173/api',
});

export default api;
