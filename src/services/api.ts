import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.20.16.1:3333'
});

export default api;