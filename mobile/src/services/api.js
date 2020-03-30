import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-bthehero.herokuapp.com'
});

export default api;