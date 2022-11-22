import axios from 'axios';

export const setAuthToken = (token: string) => {
    localStorage.setItem('token', token);

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const register = (username: string, email: string, password: string) => {
    return axios.post('/api/user', { email: email, username: username, password: password });
};

export const login = (email: string, password: string) => {
    axios.post('/api/login', { email: email, password: password }).then((r) => {
        const token = r.data.token;
        setAuthToken(token);
    });
};
