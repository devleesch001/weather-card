import axios from 'axios';

import { API_URL } from '../api/config';

export const setAuthToken = (token: string) => {
    localStorage.setItem('token', token);

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

export const register = (username: string, email: string, password: string) => {
    return axios.post(`${API_URL}/api/auth/register`, { email: email, username: username, password: password });
};

export const login = (email: string, password: string) => {
    return axios.post(`${API_URL}/api/auth/login`, { email: email, password: password });
};

export const logout = () => {
    return localStorage.removeItem('token');
};

export interface UserInformationInterface {
    username: string;
    email: string;
}
