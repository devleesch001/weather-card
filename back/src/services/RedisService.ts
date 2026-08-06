import { createClient } from 'redis';
import config from '~/config';

const client = createClient({
    url: config.redisUrl,
});

const init = async () => {
    client.on('error', (err) => console.error('Redis client error', err));
    client.on('end', (args) => console.info(`Redis client end ${args ?? ''}`));

    await client.connect();
};

export default { client, init };
