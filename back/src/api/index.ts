import { Router } from 'express';
import UserRoute from './UserRoute';
import WeatherRoute from './WeatherRoute';
import Authentication from './AuthenticationRoute';
import FavoriteRoute from './FavoriteRoute';
const router = Router();

router.get('/', (request, response) => {
    response.send({ message: { api: 'ok' } });
});

router.use('/auth', Authentication);
router.use('/user', UserRoute);
router.use('/weather', WeatherRoute);
router.use('/favorite', FavoriteRoute);

export default router;
