import axios from 'axios';

// Use backend URL from Vercel environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' // fallback for local dev
});

// API ENDPOINTS
export const fetchRelation = (relation) => API.post('/relation/get', relation);
export const fetchAllRelation = () => API.get('/relation/getAll');
export const createRelation = (newRelation) => API.post('/relation/create', newRelation);
export const deleteRelation = (id) => API.delete(`/relation/${id}`);

export const fetchUsers = () => API.get('/user');
export const createUser = (formData) => API.post('/user', formData);
export const deleteUser = (id) => API.delete(`/user/${id}`);
