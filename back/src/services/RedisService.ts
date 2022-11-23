import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
});

const init = async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('end', (args) => console.log('Redis Client Error', args));

    await client.connect();
};

export default { client, init };
