import { Request, Router } from 'express';
import { geoCode, getWeather } from '~/OpenWeatherMap/openWeatherMap';
import { AxiosResponse } from 'axios';

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

    await response.send(weather.data);
});

export default router;
