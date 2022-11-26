import { Router } from 'express';
import UserRoute from './UserRoute';
import WeatherRoute from './WeatherRoute';
import Authentication from './AuthenticationRoute';
import FavoriteRoute from './FavoriteRoute';
import GeoCodeRoute from './GeoCodeRoute';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = Router();

/**
 * @openapi
 * /:
 *  get:
 *      description: Welcome to api weather L2ADG!
 *      responses:
 *          200:
 *              description: Returns status of api
 */
router.get('/', (request, response) => {
    response.send({ message: { api: 'ok' } });
});

router.use('/auth', Authentication);
router.use('/user', UserRoute);
router.use('/weather', WeatherRoute);
router.use('/favorite', FavoriteRoute);
router.use('/geoCode', GeoCodeRoute);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'L2ADG Weather',
            version: '0.1.0',
        },
    },
    apis: ['./api/*', './src/api/*'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export default router;
