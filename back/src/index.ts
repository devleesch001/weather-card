import dotenv from 'dotenv';

dotenv.config({ path: '.env.local', override: true });
dotenv.config();

import tracing from '~/services/tracing';

tracing.start();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ApiIndex from './api/index';
import MangoDBService from '~/services/MangoDBService';
import RedisService from '~/services/RedisService';
import mongoose, {Error} from 'mongoose';

function initDatabases() {
    return Promise.all([
        MangoDBService.init()
            .then(() => console.log('mangodb init'))
            .catch((err) => Promise.reject(new Error(`Failed to connect to MongoDB: ${err}`))),

        RedisService.init()
            .then(() => console.log('redis init'))
            .catch((err) => Promise.reject(new Error(`Failed to connect to Redis: ${err}`))),
    ]);
}

function closeDatabases() {
    return Promise.all([
        mongoose
            .disconnect()
            .then(() => console.log('mangodb closed'))
            .catch((err) => Promise.reject(new Error(`Failed to close MongoDB: ${err}`))),

        // On gère le cas où le client n'existerait pas avec un fallback sur Promise.resolve()
        (RedisService.client?.close?.() || Promise.resolve())
            .then(() => console.log('redis closed'))
            .catch((err) => Promise.reject(new Error(`Failed to close Redis: ${err}`))),
    ]);
}

async function bootstrap() {
    await initDatabases();

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

    const shutdown = async () => {
        console.log('INFO  Gracefully shutting down. Please wait...');
        server.close(async (err) => {
            if (err) {
                console.error('HTTP server Error closing', err);
            } else {
                console.log('HTTP server closed');
            }

            closeDatabases()
                .then(() => {
                    process.exit(0);
                })
                .catch((dbErr) => {
                    console.error(dbErr.message);
                    process.exit(1);
                });
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

bootstrap().catch((err) => {
    console.error('Panic on start :', err.message);
    process.exit(1);
});
