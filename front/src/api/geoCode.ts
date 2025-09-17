import axios from 'axios';
import { WeatherCardInterface } from '../components/WeatherCard';
import { API_URL } from './config';

export const geoCode = (search: string) => {
    return axios.get(`${API_URL}/api/geoCode`, {
        params: {
            search: search,
        },
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const geoCodeToWeatherCardInterface = (data: any, isFav = false): WeatherCardInterface => {
    return {
        station: data.name,
        isUserFav: isFav,
        location: { lat: data.lat, lon: data.lon },
    };
};
