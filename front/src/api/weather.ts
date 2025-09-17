import axios from 'axios';
import { WeatherCardInterface } from '../components/WeatherCard';
import { API_URL } from './config';

export interface WeatherDataInterface {
    coord: {
        lon: number;
        lat: number;
    };
    weather: WeatherInterface[];
    base: 'stations';
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherInterface {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export const getWeather = (search: WeatherCardInterface) => {
    return axios.get(`${API_URL}/api/weather`, {
        params: {
            lon: search.location.lon,
            lat: search.location.lat,
        },
    });
};
