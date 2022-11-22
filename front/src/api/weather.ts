import axios from 'axios';

const API_URL = 'http://10.3.2.54:8080/api';

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

export const getWeather = (search: string) => {
    return axios.get(`${API_URL}/weather`, {
        params: {
            search: search,
        },
    });
};
