import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import ApiIndex from './api/index';
import User from '~/models/User';

run().catch((err) => console.log(err));

async function run() {
    await mongoose.connect('mongodb://root:example@127.0.0.1:27017');

    const user = new User({
        username: 'Bill',
        email: 'bill@initech.com',
        password: 'password',
    });
    await user.save();

    console.log(user.email); // 'bill@initech.com'

    const userFromDb = await User.findOne({ email: 'bill@initech.com' }).exec();

    console.log(userFromDb);
}

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/api', ApiIndex);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
