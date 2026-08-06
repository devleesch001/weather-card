import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from '~/config';

const router = Router();

if (config.otel.endpoint && config.otel.allowProxy) {
    if (config.otel.tracesExporter === 'otlp') {
        console.info('Initialize OTEL traces Proxy');
        router.use(
            '/telemetry/traces',
            createProxyMiddleware({
                target: config.otel.endpoint,
                changeOrigin: true,
                pathRewrite: (path, req) => '/v1/traces',
            })
        );
    }

    if (config.otel.metricsExporter === 'otlp') {
        console.info('Initialize OTEL metrics Proxy');
        router.use(
            '/telemetry/metrics',
            createProxyMiddleware({
                target: config.otel.endpoint,
                changeOrigin: true,
                pathRewrite: (path, req) => '/v1/metrics',
            })
        );
    }
}

export default router;
