import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import process from "process";

const router = Router();


if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    console.info('Initialize OTEL traces Proxy');
    router.use(
        '/telemetry/v1/traces',
        createProxyMiddleware({
            target: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
            changeOrigin: true,
            pathRewrite: {
                // Remplace "/api/telemetry/v1/traces" par "/v1/traces" pour le collecteur
                '^/api/telemetry/v1/traces': '/v1/traces',
            },
        })
    );
}

if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    console.info('Initialize OTEL metrics Proxy');
    router.use(
        '/telemetry/v1/metrics',
        createProxyMiddleware({
            target: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
            changeOrigin: true,
            pathRewrite: {
                // Remplace "/api/telemetry/v1/metrics" par "/v1/metrics" pour le collecteur
                '^/api/telemetry/v1/metrics': '/v1/metrics',
            },
        })
    );
}

export default router;
