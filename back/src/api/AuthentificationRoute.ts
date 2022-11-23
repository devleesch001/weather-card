import { Router } from 'express';
import User from '~/models/User';
import { generateAccessToken } from '~/services/AuthenticationService';
import { body } from 'express-validator';

const router = Router();

router.post(
    '/login',
    body('email').isEmail().isLength({ min: 5, max: 128 }),
    body('password').isLength({ min: 5, max: 128 }),
    async (req, res) => {
        const user = await User.findByEmailOrUsername(req.body.email);

        if (!user) {
            res.status(401).send({ message: 'invalid credentials' });
            return;
        }

        const password = req.body['password'];

        if (!(await user.checkPassword(password))) {
            res.status(401).send({ message: 'invalid password' });
            return;
        }

        const accessToken = generateAccessToken(user.toUserInformation());
        res.send({
            token: accessToken,
        });
    }
);

export default router;
