import { Router } from 'express';
import { body } from 'express-validator';
import User from '~/models/User';
import { auth } from '~/middleware/AuthenticateMiddleware';

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
        res.redirect('/api/auth/register');
    }
);

export default router;
