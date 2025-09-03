import axios from 'axios';

const BASE_URL = 'http://31.97.207.137:8090';

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);

export const addTask = (task) => axios.post(`${BASE_URL}/tasks`, task);

export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);
