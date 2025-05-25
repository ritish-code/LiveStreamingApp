import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.113.176:5000',
  timeout: 10000
});

export default api;
