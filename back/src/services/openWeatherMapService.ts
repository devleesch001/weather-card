import axios from 'axios';
import config from '~/config';

export const getWeather = (lat: number, lon: number) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}`);
};

/**
 * @param query {city name},{country code}
 */
export const geoCode = (query: string) => {
    return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${config.apiKey}`);
};
