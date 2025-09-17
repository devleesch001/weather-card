import axios from 'axios';
import { API_URL } from './config';

export const getFavoris = () => {
    return axios.get(`${API_URL}/api/favorite`);
};

export const setFavoris = (favoriteList: string[]) => {
    return axios.post(
        `${API_URL}/api/favorite`,
        favoriteList.filter((e) => e !== undefined)
    );
};
