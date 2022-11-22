import { Router } from 'express';
import UserRoute from './UserRoute';
import WeatherRoute from './Weather/WeatherRoute';
import Authentification from '~/api/AuthentificationRoute';
const router = Router();

router.get('/', (request, response) => {
    response.send({ message: { api: 'ok' } });
});

router.use('/user', UserRoute);
router.use('/weather', WeatherRoute);
router.use('/', Authentification);

export default router;
