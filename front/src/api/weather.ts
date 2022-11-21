import axios from 'axios';

const API_URL = 'http://10.3.2.54:8080/api';

export interface WeatherInterface {
    coord: {
        lon: 2.32;
        lat: 48.8589;
    };
    weather: [
        {
            id: 701;
            main: 'Mist';
            description: 'mist';
            icon: '50n';
        }
    ];
    base: 'stations';
    main: {
        temp: 280.51;
        feels_like: 276.8;
        temp_min: 279.8;
        temp_max: 281.34;
        pressure: 992;
        humidity: 95;
    };
    visibility: 2900;
    wind: {
        speed: 6.69;
        deg: 150;
    };
    clouds: {
        all: 100;
    };
    dt: 1669046921;
    sys: {
        type: 2;
        id: 2012208;
        country: 'FR';
        sunrise: 1669014525;
        sunset: 1669046681;
    };
    timezone: 3600;
    id: 6545270;
    name: 'Palais-Royal';
    cod: 200;
}

export const getWeather = (search: string) => {
    return axios.get(`${API_URL}/weather`, {
        params: {
            search: search,
        },
    });
};
