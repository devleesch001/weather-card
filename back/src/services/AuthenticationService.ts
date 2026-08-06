import { UserInformationInterface } from '~/models/User';
import jwt, { Secret } from 'jsonwebtoken';
import config from '~/config';

export const SECRET_KEY: Secret = config.accessTokenSecret;

export function generateAccessToken(user: UserInformationInterface) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '3600s' });
}
