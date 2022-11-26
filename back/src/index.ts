import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import ApiIndex from './api/index';
import MangoDBService from '~/services/MangoDBService';
import RedisService from '~/services/RedisService';

dotenv.config({ path: '.env.local', override: true });

MangoDBService.init()
    .then(() => console.log('mangodb init'))
    .catch((err) => console.log(err));

RedisService.init()
    .then(() => console.log('redis init'))
    .catch((err) => console.log(err));

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/api', ApiIndex);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
