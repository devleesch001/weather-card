import process from 'process';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { ConsoleMetricExporter, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

function start() {
    const sdk = new NodeSDK({
        resource: resourceFromAttributes({
            [ATTR_SERVICE_NAME]: 'weather-card-api',
        }),
        traceExporter: new ConsoleSpanExporter(),
        metricReader: new PeriodicExportingMetricReader({
            exporter: new ConsoleMetricExporter(),
        }),

        instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
    console.log("Tracing initialized")
    process.on('SIGTERM', () => {
        sdk.shutdown()
            .then(() => console.log('Tracing terminated'))
            .catch((err: Error) => console.log('Error terminating tracing', err));
    });
}

export default { start };
