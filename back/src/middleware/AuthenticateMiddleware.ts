import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { SECRET_KEY } from '~/services/AuthenticationService';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        (req as Request).token = jwt.verify(token, SECRET_KEY);

        next();
    } catch (err) {
        res.status(401).send({ message: 'Please authenticate' });
    }
};
