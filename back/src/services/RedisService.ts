import { createClient } from 'redis';

export const init = async () => {
    const client = createClient({
        url: 'redis://localhost:6379',
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value', {
        EX: 100000,
        NX: true,
    });
    const value = await client.get('key');
    console.log(value);
    await client.disconnect();
    // const redisClient = redis.createClient({
    //     url: 'redis://localhost:6379',
    // });
    //
    // redisClient.on('error', (error) => console.error(`Error : ${error}`));
    // await redisClient.connect();
};

export default { init };
