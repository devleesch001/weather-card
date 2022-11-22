import { Request, Router } from 'express';
import { geoCode, getWeather } from '~/services/openWeatherMapService';

const router = Router();

interface Geocoding {
    name: string;
    local_names?: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

router.get('/', async (request: Request, response) => {
    const query = request.query;
    const search = query['search'] as string;

    response.send({
        coord: { lon: 2.32, lat: 48.8589 },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
        base: 'stations',
        main: { temp: 280.56, feels_like: 277.44, temp_min: 278.83, temp_max: 281.57, pressure: 994, humidity: 87 },
        visibility: 10000,
        wind: { speed: 5.14, deg: 250 },
        clouds: { all: 0 },
        dt: 1669059424,
        sys: { type: 2, id: 2012208, country: 'FR', sunrise: 1669014525, sunset: 1669046681 },
        timezone: 3600,
        id: 6545270,
        name: 'Palais-Royal',
        cod: 200,
    });
    return;

    if (!search) {
        response.status(500).send({ error: 'bad request' });
        return;
    }

    console.log(search);

    const result = await geoCode(search);
    const data = result.data as Geocoding[];

    if (data.length === 0) {
        response.status(500).send({ error: 'not found' });
        return;
    }

    const weather = await getWeather(data[0].lat, data[0].lon);
    console.log(weather.data);

    response.send(weather.data);
});

export default router;
