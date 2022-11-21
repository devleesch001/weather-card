import { Router } from 'express';
const router = Router();

router.get('/', (request, response) => {
    response.send({user: "ok"});
});

export default router;