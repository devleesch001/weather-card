import { geoCode } from '~/services/openWeatherMapService';
import { Request, Router } from 'express';
import RedisService from '~/services/RedisService';

const router = Router();

export interface GeocodingInterface {
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

    if (!search || search === '_search') {
        response.status(500).send({ error: 'bad request' });
        return;
    }

    const value = await RedisService.client.get(`_search-${search}`);

    if (typeof value === 'string') {
        response.send(JSON.parse(value));
    } else {
        const data = (await geoCode(search)).data as GeocodingInterface[];

        if (data.length === 0) {
            response.status(500).send({ error: 'not found' });
            return;
        }

        RedisService.client
            .set(`_search-${search}`, JSON.stringify(data), {
                EX: 86400, // 1 day in secondes
                NX: true,
            })
            .then();

        response.send(data);
    }
});

export default router;
