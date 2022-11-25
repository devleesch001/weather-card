import { Request, Router } from 'express';
import { getWeather } from '~/services/openWeatherMapService';
import RedisService from '~/services/RedisService';

const router = Router();

/**
 * @openapi
 * /api/weather:
 *  get:
 *      description: get weather from lat and lon.
 *      responses:
 *          200:
 *              description: Returns list of object
 *          500:
 *              description: Bad request query not valide
 */
router.get('/', async (request: Request, response) => {
    const query = request.query;
    const lat = Number(query['lat']);
    const lon = Number(query['lon']);

    if (!lat || !lon) {
        response.status(500).send({ error: 'bad request' });
        return;
    }

    const value = await RedisService.client.get(`_location-${lat}-${lon}`);

    if (typeof value === 'string') {
        response.send(JSON.parse(value));
    } else {
        const weather = await getWeather(lat, lon);
        const weatherData = weather.data;

        RedisService.client
            .set(`_location-${lat}-${lon}`, JSON.stringify(weatherData), {
                EX: 60,
                NX: true,
            })
            .then();

        response.send(weatherData);
    }
});

export default router;
