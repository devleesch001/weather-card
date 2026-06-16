import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
});

const init = async () => {
    client.on('error', (err) => console.error('Redis client error', err));
    client.on('end', (args) => console.info(`Redis client end ${args ?? ''}`));

    await client.connect();
};

export default { client, init };
