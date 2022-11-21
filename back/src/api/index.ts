import { Router } from 'express';
import UserRoute from './UserRoute';
const router = Router();

router.get('/', (request, response) => {
    response.send({ message: { api: 'ok' } });
});

router.use('/user', UserRoute);

export default router;
