import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import process from "process";

const router = Router();


function isAllow(v?: string) {
    return v === 'true' || v === '1' || v === 'on' || v === 'y'
}

if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT && isAllow(process.env.OTEL_EXPORTER_ALLOW_PROXY)) {
    if (process.env.OTEL_TRACES_EXPORTER === 'otlp') {
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

    if (process.env.OTEL_METRICS_EXPORTER === 'otlp') {
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
}

export default router;
