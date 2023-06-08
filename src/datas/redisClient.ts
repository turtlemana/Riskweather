import * as Redis from 'redis'

// docker exec -it redis_boot redis-cli -p 6379


interface RetryOptions {
  error: {
    code: string;
  };
  total_retry_time: number;
  attempt: number;
}

const clientOptions = {
    retry_strategy: (options: RetryOptions) => {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with an individual error
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    }
  };

  let client: any | null = null;
  

const getClient = () => {
    if (!client) {
    
  //   client = Redis.createCluster({
  //   rootNodes:[
  // {url:"redis://rw-elasticache.sgefxn.clustercfg.apn2.cache.amazonaws.com:6379"}],
  //   ...clientOptions})
      // client = Redis.createClient({ pingInterval: 1000, ...clientOptions });

        // client = Redis.createClient({pingInterval:1000, url:"redis://riskweather-user.sgefxn.ng.0001.apn2.cache.amazonaws.com:6379", ...clientOptions});  
      client = Redis.createClient({pingInterval:1000, url:"redis://test-redis-001.sgefxn.0001.apn2.cache.amazonaws.com:6379", ...clientOptions});  

      client.on('connect', () => {
        console.log('Redis 클라이언트가 소켓 연결을 열었습니다.');
      });
      client.on('end', () => {
        console.log('Redis 클라이언트가 소켓 연결을 닫았습니다.');
      });
      client.on('error', (error: string) => {
        console.error('Redis 클라이언트에서 오류가 발생했습니다.', error);
      });
    }
    return client;
  };
  
  export default getClient();

    
//   // const client: any = Redis.createClient({pingInterval:1000, url:"redis://riskweather-user.sgefxn.ng.0001.apn2.cache.amazonaws.com:6379", ...clientOptions});  
  
//   const client: any = Redis.createClient({ pingInterval: 1000, ...clientOptions });

// client.on('connect', () => {
//   console.log('Redis 클라이언트가 소켓 연결을 열었습니다.');
// });

// client.on('end', () => {
//   console.log('Redis 클라이언트가 소켓 연결을 닫았습니다.');
// });

// client.on('error', (error: any) => {
//   console.error('Redis 클라이언트에서 오류가 발생했습니다.', error);
// });

// export default client;
  


// // Redis 클라이언트 소켓 연결이 설정되면 실행되는 이벤트 핸들러
// client.on('connect', () => {
//   console.log('Redis 클라이언트가 소켓 연결을 열었습니다.');
// });

// // Redis 클라이언트 소켓 연결이 닫히면 실행되는 이벤트 핸들러
// client.on('end', () => {
//   console.log('Redis 클라이언트가 소켓 연결을 닫았습니다.');
// });

// client.on('error', (error:any) => {
//     console.error('Redis 클라이언트에서 오류가 발생했습니다.', error);
//   });

// export default client;


// import Redis from 'ioredis';

// const clientOptions: any = {
//   retryStrategy: (times: number) => {
//     if (times > 10) {
//       return undefined;
//     }
//     return Math.min(times * 100, 3000);
//   }
// };



// const client = new Redis({
//   host: '127.0.0.1',
//   port: 6379,
//   retryStrategy: clientOptions.retryStrategy,
  
// });

// client.on('connect', () => {
//   console.log('Redis 클라이언트가 소켓 연결을 열었습니다.');
// });

// client.on('close', () => {
//   console.log('Redis 클라이언트가 소켓 연결을 닫았습니다.');
// });

// client.on('error', (error: Error) => {
//   console.error('Redis 클라이언트에서 오류가 발생했습니다.', error);
// });

// export default client;
