import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import process from "process";

const router = Router();


if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    console.info('Initialize OTEL traces Proxy');
    router.use(
        '/telemetry/traces',
        createProxyMiddleware({
            target: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
            changeOrigin: true,
            pathRewrite: (path, req) => '/v1/traces',
        })
    );
}

if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    console.info('Initialize OTEL metrics Proxy');
    router.use(
        '/telemetry/metrics',
        createProxyMiddleware({
            target: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
            changeOrigin: true,
            pathRewrite: (path, req) => '/v1/metrics',
        })
    );
}

export default router;
