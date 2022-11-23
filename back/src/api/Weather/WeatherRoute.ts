import { Request, Router } from 'express';
import { geoCode, getWeather } from '~/services/openWeatherMapService';
import RedisService from '~/services/RedisService';

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

    const value = await RedisService.client.get(search);

    if (typeof value === 'string') {
        response.send(JSON.parse(value));
    } else {
        const result = await geoCode(search);
        const data = result.data as Geocoding[];

        if (data.length === 0) {
            response.status(500).send({ error: 'not found' });
            return;
        }

        const weather = await getWeather(data[0].lat, data[0].lon);
        const weatherData = weather.data;

        RedisService.client
            .set(search, JSON.stringify(weatherData), {
                EX: 60,
                NX: true,
            })
            .then();

        response.send(weatherData);
    }
});

export default router;
