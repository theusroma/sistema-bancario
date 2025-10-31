import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5213/api'
})

export default api;
