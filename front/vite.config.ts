import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifest: Partial<VitePWAOptions> = {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
        short_name: 'L2ADG Weather',
        name: 'L2ADG Best Weather App',
        icons: [
            {
                src: 'favicon.ico',
                sizes: '64x64 32x32 24x24 16x16',
                type: 'image/x-icon',
                purpose: 'maskable',
            },
            {
                src: 'logo192.png',
                type: 'image/png',
                sizes: '192x192',
                purpose: 'maskable',
            },
            {
                src: 'logo512.png',
                type: 'image/png',
                sizes: '512x512',
            },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react(), viteTsconfigPaths(), svgrPlugin(), VitePWA(manifest)],
    build: {
        sourcemap: false,
    },
});
