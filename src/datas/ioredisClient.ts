// import { Cluster } from 'ioredis';

// let client: Cluster | null = null;

// export const getClient = (): Cluster => {
//   if (!client) {
//     const nodes = [
//       { host: "127.0.0.1", port: 7000 },
//       { host: "127.0.0.1", port: 7001 },
//       { host: "127.0.0.1", port: 7002 },
//       { host: "127.0.0.1", port: 7003 },
//       { host: "127.0.0.1", port: 7004 },
//       { host: "127.0.0.1", port: 7005 },
//     ];

//     const options = {
//       redisOptions: {
//         connectTimeout: 10000, 
//       },
//       clusterRetryStrategy: (times: number) => {
//         const delay = Math.min(times * 100, 2000);
//         return delay;
//       }
//     };

//     client = new Cluster(nodes,options);
//     client.set("foo", "bar");

//     client.on('connect', () => {
//       console.log('Connected to Redis cluster.');
//     });

//     client.on('error', (err) => {
//       console.error('Redis error:', err);
//     });

//     client.on('reconnecting', () => {
//       console.warn('Reconnecting to Redis cluster...');
//     });

//     client.on('close', () => {
//       console.log('Connection to Redis cluster closed.');
//     });

//     client.on('end', () => {
//       console.warn('Connection to Redis cluster ended and will not retry.');
//     });
//   }

//   return client;
// };


import { Redis } from 'ioredis';

let client: Redis | null = null;

export const getClient = (): Redis => {
  if (!client) {
    const options = {
      // host: "main-redis-001.main-redis.sgefxn.apn2.cache.amazonaws.com",
      // host: "test-redis-001.sgefxn.0001.apn2.cache.amazonaws.com",
      host: "127.0.0.1",
      port: 6379,
      connectTimeout: 10000,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 100, 2000);
        return delay;
      }
    };

    client = new Redis(options);

    client.on('connect', () => {
      console.log('Connected to Redis.');
    });

    client.on('error', (err) => {
      console.error('Redis error:', err);
    });

    client.on('reconnecting', () => {
      console.warn('Reconnecting to Redis...');
    });

    client.on('close', () => {
      console.log('Connection to Redis closed.');
    });

    client.on('end', () => {
      console.warn('Connection to Redis ended and will not retry.');
    });
  }

  return client;
};