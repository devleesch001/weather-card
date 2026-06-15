import dotenv from 'dotenv';

dotenv.config({ path: '.env.local', override: true });
dotenv.config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ApiIndex from './api/index';
import MangoDBService from '~/services/MangoDBService';
import RedisService from '~/services/RedisService';
import mongoose from 'mongoose';

MangoDBService.init()
    .then(() => console.log('mangodb init'))
    .catch((err) => console.log(err));

RedisService.init()
    .then(() => console.log('redis init'))
    .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/api', ApiIndex);

const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Graceful shutdown
const shutdown = async () => {
    console.log('INFO  Gracefully shutting down. Please wait...');
    server.close(async (err) => {
        if (err) {
            console.error('Error closing HTTP server:', err);
            process.exit(1);
        }
        try {
            await mongoose.disconnect();
        } catch (e) {
            console.error('Error closing MongoDB:', e);
        }
        try {
            await RedisService.client?.close?.();
        } catch (e) {
            console.error('Error closing Redis:', e);
        }
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
