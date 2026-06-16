import process from 'process';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

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

    const sdk = new NodeSDK({
        resource: resourceFromAttributes({
            [ATTR_SERVICE_NAME]: 'weather-card-api',
        }),
        traceExporter: process.env.OTLP_TRACES_URL
            ? new OTLPTraceExporter({
                  url: process.env.OTLP_TRACES_URL,
                  headers: parseHeaders('OTLP_TRACES_HEADERS'),
              })
            : undefined,
        metricReaders: process.env.OTLP_METRICS_URL
            ? [
                  new PeriodicExportingMetricReader({
                      exporter: new OTLPMetricExporter({
                          url: process.env.OTLP_METRICS_URL,
                          headers: parseHeaders('OTLP_METRICS_HEADERS'),
                      }),
                      exportIntervalMillis: 10000,
                      exportTimeoutMillis: 10000,
                  }),
              ]
            : undefined,

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
