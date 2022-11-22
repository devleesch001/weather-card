import { UserInformationInterface } from '~/models/User';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const SECRET_KEY: Secret = process.env.ACCESS_TOKEN_SECRET ?? '';

export function generateAccessToken(user: UserInformationInterface) {
    return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1800s' });
}
