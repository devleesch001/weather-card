import pino from 'pino';
import process from 'process';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    // Format lisible pour le dev local, JSON brut pour la prod
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: false,
            ignore: 'pid,hostname,time,level',
            hideObject: true,
            messageFormat: '{msg}',
        },
    },
});
