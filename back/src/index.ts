import config from '~/config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import ApiIndex from '~/api/index';
import MangoDBService from '~/services/MangoDBService';
import RedisService from '~/services/RedisService';
import mongoose from 'mongoose';
import pinoHttp from 'pino-http';
import { logger } from '~/services/Logger';
import TelemetryRoute from '~/api/TelemetryRoute';

function initDatabases() {
    return Promise.all([
        MangoDBService.init()
            .then(() => console.info('Mangodb init'))
            .catch((err) => Promise.reject(new Error(`Failed to connect to MongoDB: ${err}`))),

        RedisService.init()
            .then(() => console.info('Redis init'))
            .catch((err) => Promise.reject(new Error(`Failed to connect to Redis: ${err}`))),
    ]);
}

function closeDatabases() {
    return Promise.all([
        mongoose
            .disconnect()
            .then(() => console.info('Mangodb closed'))
            .catch((err) => Promise.reject(new Error(`Failed to close MongoDB: ${err}`))),

        // On gère le cas où le client n'existerait pas avec un fallback sur Promise.resolve()
        (RedisService.client?.close?.() || Promise.resolve())
            .then(() => console.info('Redis closed'))
            .catch((err) => Promise.reject(new Error(`Failed to close Redis: ${err}`))),
    ]);
}

async function bootstrap() {
    await initDatabases();

    const app = express();
    app.use(
        cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'traceparent', 'tracestate'],
            exposedHeaders: ['traceparent'],
        })
    );
    app.use(
        pinoHttp({
            logger,
            customSuccessMessage: (req, res) => {
                // Récupération des informations standards
                const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '-';
                // Date au format ISO (plus standard en JSON que le format CLF de Morgan)
                const date = new Date().toISOString();
                const method = req.method;
                const url = req.url;
                const httpVersion = req.httpVersion;
                const status = res.statusCode;
                const contentLength = res.getHeader('content-length') || '-';
                const referer = req.headers['referer'] || '-';
                const userAgent = req.headers['user-agent'] || '-';

                // Reconstitution du format "Combined" de Morgan / Apache
                return `${ip} - - [${date}] "${method} ${url} HTTP/${httpVersion}" ${status} ${contentLength} "${referer}" "${userAgent}"`;
            },
        })
    );

    app.use('/api', TelemetryRoute);

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

    const port = config.port;

    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });

    app.use('/api', ApiIndex);

    const server = app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });

    const shutdown = () => {
        console.log('INFO  Gracefully shutting down. Please wait...');
        server.close((err) => {
            if (err) {
                console.error('HTTP server Error closing', err);
            } else {
                console.info('HTTP server closed');
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
