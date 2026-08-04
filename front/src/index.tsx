import 'zone.js';
import telemetry from './services/Telemetry';
import { API_URL } from './api/config';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

telemetry.start({
    metricsUrl: `${API_URL}/api/telemetry/metrics`,
    tracesUrl: `${API_URL}/api/telemetry/traces`,
    propagateTraceHeaderCorsUrls: [/.*/],
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
