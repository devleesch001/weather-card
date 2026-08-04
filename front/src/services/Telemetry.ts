import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_NAMESPACE } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { ZoneContextManager } from '@opentelemetry/context-zone-peer-dep';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

export interface TracingConfig {
    tracesUrl?: string;
    tracesHeaders?: Record<string, string>;
    metricsUrl?: string;
    metricsHeaders?: Record<string, string>;
    propagateTraceHeaderCorsUrls?: (string | RegExp)[];
}

function start(config: TracingConfig) {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

    const resource = resourceFromAttributes({
        [ATTR_SERVICE_NAMESPACE]: 'weather-card',
        [ATTR_SERVICE_NAME]: 'web-ui',
    });

    // --- 1. Configuration des Traces ---
    const spanProcessors = [];
    if (config.tracesUrl) {
        const traceExporter = new OTLPTraceExporter({
            url: config.tracesUrl,
            headers: config.tracesHeaders || {},
        });
        spanProcessors.push(new BatchSpanProcessor(traceExporter));
    }

    // Instanciation avec les spanProcessors directement dans le constructeur
    const tracerProvider = new WebTracerProvider({
        resource,
        spanProcessors,
    });

    // --- 2. Configuration des Métriques ---
    let meterProvider: MeterProvider | undefined;

    if (config.metricsUrl) {
        const metricExporter = new OTLPMetricExporter({
            url: config.metricsUrl,
            headers: config.metricsHeaders || {},
        });

        const metricReader = new PeriodicExportingMetricReader({
            exporter: metricExporter,
            exportIntervalMillis: 10000,
            exportTimeoutMillis: 10000,
        });

        // Instanciation avec les readers directement dans le constructeur
        meterProvider = new MeterProvider({
            resource,
            readers: [metricReader],
        });
    }

    // --- 3. Enregistrement global ---
    tracerProvider.register({
        contextManager: new ZoneContextManager(),
        propagator: new W3CTraceContextPropagator(),
    });

    // --- 4. Auto-instrumentations ---
    registerInstrumentations({
        tracerProvider: tracerProvider,
        meterProvider: meterProvider,
        instrumentations: [
            getWebAutoInstrumentations({
                '@opentelemetry/instrumentation-fetch': {
                    propagateTraceHeaderCorsUrls: config.propagateTraceHeaderCorsUrls || [],
                    clearTimingResources: true,
                },
                '@opentelemetry/instrumentation-xml-http-request': {
                    propagateTraceHeaderCorsUrls: config.propagateTraceHeaderCorsUrls || [],
                    clearTimingResources: true,
                },
                '@opentelemetry/instrumentation-document-load': { enabled: true },
            }),
        ],
    });

    console.info('Web Tracing initialized');

    // --- 5. Gestion de l'arrêt ---
    const shutdown = async () => {
        try {
            const promises: Promise<void>[] = [tracerProvider.shutdown()];
            if (meterProvider) {
                promises.push(meterProvider.shutdown());
            }
            await Promise.all(promises);
            console.info('Web Tracing terminated');
        } catch (err) {
            console.error('Error terminating web tracing', err);
        }
    };

    window.addEventListener('unload', shutdown);

    return { shutdown };
}

export default { start };
