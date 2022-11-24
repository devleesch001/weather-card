import { Router } from 'express';
import User from '~/models/User';
import { generateAccessToken } from '~/services/AuthenticationService';
import { body, validationResult } from 'express-validator';

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

        console.log(user);

        const accessToken = generateAccessToken(user.toUserInformation());
        res.send({
            token: accessToken,
        });
    }
);

router.post(
    '/register',
    body('email').isEmail().isLength({ min: 5, max: 128 }),
    body('username').isLength({ min: 5, max: 128 }),
    body('password').isLength({ min: 5, max: 128 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = new User({
            username: req.body.username,
            email: req.body.email,
        });

        await user.setPassword(req.body.password);

        user.save()
            .then(() => {
                const accessToken = generateAccessToken(user.toUserInformation());

                res.status(201).send({ user: user.toUserInformation(), token: accessToken });
            })
            .catch(() => {
                res.status(400);
                res.send({ message: 'failed' });
            });
    }
);
export default router;
