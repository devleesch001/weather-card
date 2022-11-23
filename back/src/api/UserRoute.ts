import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import User from '~/models/User';
import { auth } from '~/middleware/AuthenticateMiddleware';
import { generateAccessToken } from '~/services/AuthenticationService';

const router = Router();

/**
 * @var req.query.username: ?string
 * @var req.query.email: ?string
 */
router.get('/', auth, async (req, res) => {
    /* findOne with username or/and email */
    const user = await User.findByEmailOrUsername(
        req.query['email']?.toString() ?? null,
        req.query['username']?.toString() ?? null
    );

    res.send(user.toUserInformation());
});

/**
 * create new user
 */
router.post(
    '/',
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
