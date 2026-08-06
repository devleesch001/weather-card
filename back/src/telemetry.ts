import process from 'process';
import './config';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_NAMESPACE } from '@opentelemetry/semantic-conventions';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

function start() {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

    if (!process.env.OTEL_TRACES_EXPORTER) {
        process.env.OTEL_TRACES_EXPORTER = 'none';
    }

    if (!process.env.OTEL_METRICS_EXPORTER) {
        process.env.OTEL_METRICS_EXPORTER = 'none';
    }

    if (!process.env.OTEL_LOGS_EXPORTER) {
        process.env.OTEL_LOGS_EXPORTER = 'none';
    }

    const sdk = new NodeSDK({
        resource: resourceFromAttributes({
            [ATTR_SERVICE_NAMESPACE]: 'weather-card',
            [ATTR_SERVICE_NAME]: 'api',
        }),
        instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
    console.info('Tracing initialized');

    process.on('SIGTERM', () => {
        sdk.shutdown()
            .then(() => console.info('Tracing terminated'))
            .catch((err: Error) => console.info('Error terminating tracing', err));
    });
}

start();
