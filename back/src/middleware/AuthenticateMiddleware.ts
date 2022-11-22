import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { SECRET_KEY } from '~/services/AuthenticationService';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token);

        if (!token) {
            throw new Error();
        }

        (req as CustomRequest).token = jwt.verify(token, SECRET_KEY);

        next();
    } catch (err) {
        console.log(err);
        res.status(401).send('Please authenticate');
    }
};
