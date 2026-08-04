import process from 'process';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { ATTR_SERVICE_NAMESPACE } from '@opentelemetry/sdk-node/build/src/semconv';

interface TelemetryConfig {
    tracesUrl?: string;
    tracesHeaders?: Record<string, string>;
    metricsUrl?: string;
    metricsHeaders?: Record<string, string>;
}


// WIP
function parseHeaders(envVarName: string) {
    const value = process.env[envVarName];
    if (!value) return {};

    try {
        return JSON.parse(value);
    } catch (e) {
        console.error(`Error: ${envVarName} env need to be a valid JSON.`);
        return {};
    }
}

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

export default { start };
