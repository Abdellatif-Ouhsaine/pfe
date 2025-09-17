// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Ne pas définir 'Content-Type' ici !
// Axios le détecte automatiquement pour FormData.

export default api;
