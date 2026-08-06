import dotenv from 'dotenv';

dotenv.config({ path: '.env.local', override: true });
dotenv.config();

function isAllow(v?: string) {
    return v === 'true' || v === '1' || v === 'on' || v === 'y';
}

export const config = {
    port: Number(process.env.PORT) || 8080,
    apiKey: process.env.API_KEY || '',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
    mongodbUrl: process.env.MANGODB_URL || '',
    redisUrl: process.env.REDIS_URL || '',
    otel: {
        endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || '',
        tracesExporter: process.env.OTEL_TRACES_EXPORTER || 'none',
        metricsExporter: process.env.OTEL_METRICS_EXPORTER || 'none',
        logsExporter: process.env.OTEL_LOGS_EXPORTER || 'none',
        allowProxy: isAllow(process.env.OTEL_EXPORTER_ALLOW_PROXY),
    },
};

export default config;