import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const getToken = () => localStorage.getItem('token');

export const registerUser = async (username, password) => {
  return api.post('/register/', { username, password });
};

export const loginUser = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);
  return api.post('/token/', formData);
};

export const getTasks = async () => {
  return api.get('/tasks', {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getTask = async (id) => {
  return api.get(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const createTask = async (task) => {
  return api.post('/tasks', task, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const updateTask = async (id, task) => {
  return api.put(`/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const deleteTask = async (id) => {
  return api.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

