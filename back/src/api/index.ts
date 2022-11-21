import { Router } from 'express';
import UserRoute from './UserRoute';
import WeatherRoute from './Weather/WeatherRoute';
const router = Router();

router.get('/', (request, response) => {
    response.send({ message: { api: 'ok' } });
});

router.use('/user', UserRoute);
router.use('/weather', WeatherRoute);

export default router;
