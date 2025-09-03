import axios from 'axios';

const BASE_URL = 'https://to-do-list-backend-6.onrender.com';

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);

export const addTask = (task) => axios.post(`${BASE_URL}/tasks`, task);

export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);
