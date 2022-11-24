import axios from 'axios';
import { WeatherCardInterface } from '../components/WeatherCard';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://10.3.2.54:8080/';

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
