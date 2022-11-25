import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://10.3.2.54:8080';

export const getFavoris = () => {
    return axios.get(`${API_URL}/api/favorite`);
};

export const setFavoris = (favoriteList: string[]) => {
    return axios.post(
        `${API_URL}/api/favorite`,
        favoriteList.filter((e) => e !== undefined)
    );
};
