import axios from 'axios';

const API_URL = '';

export const getWeather = (search: string) => {
    return axios.get(`${API_URL}/weather`, {
        params: {
            search: search,
        },
    });
};
