import { Router } from 'express';
import UserRoute from './UserRoute';
import WeatherRoute from './WeatherRoute';
import Authentication from './AuthenticationRoute';
const router = Router();

router.get('/', (request, response) => {
    response.send({ message: { api: 'ok' } });
});

router.use('/user', UserRoute);
router.use('/weather', WeatherRoute);
router.use('/auth', Authentication);

export default router;
