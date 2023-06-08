// import client from './redisClient';
import * as Redis from 'redis'

interface RetryOptions {
  error: {
    code: string;
  };
  total_retry_time: number;
  attempt: number;
}

// const connectAndQuit = async (fn: () => Promise<any>) => {
    

//   try {
//     await client.connect();


//       const result = await fn();
//       return result;
//     } finally {
//       await client.quit();
//     }
//   }


// export const setValue = async (key: string, field:string, value: any, expirationTime?: number) => {
//     if (expirationTime) {
//       await  connectAndQuit(()=> client.SETEX(key, expirationTime, JSON.stringify(value)));
//     } else {
//         await  connectAndQuit(()=> client.HSET(key, field,JSON.stringify(value)));
//     }
//   };



// export const getValue = async (key: string,field:string) => {
//     const res:any= await connectAndQuit(()=> client.HGET(key,field))
//     const result=await JSON.parse(res!)
//     return result

//   };


  
// export const deleteValue = async (key: string,field:string) => {
//     await connectAndQuit(()=> client.HDEL(key,field));
//   };


// export const existValue=async(key: string,field:string)=>{
//     const result=await connectAndQuit(()=> client.HEXISTS(key,field)) 
//     return result           

// }



import client from './redisClient';


const clientOptions: any = {
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
  },
  enable_offline_queue: true,

};


// const connectAndQuit = async (fn: () => Promise<any>) => {
//   try {
//     if (!client.ready) { 
//       await new Promise<void>((resolve, reject) => {
//         client.on('ready', () => {
//           console.log('Redis 클라이언트가 소켓 연결을 열었습니다.');
//           resolve();
//         });
//         client.on('error', (error: any) => {
//           console.error('Redis 클라이언트에서 오류가 발생했습니다.', error);
//           reject(error);
//         });
//         if (client.status === 'wait') { // 클라이언트가 아직 연결되지 않았을 때만 연결 시도
//           client.connect();
          
//         } else {
//           resolve();
//         }
//       });
//     }
//     const result = await fn();
//     return result;
//   } catch (error) {
//     console.error('Redis error:', error);
//     throw error;
//   }
// };

// In the server/application shutdown hook
// process.on('exit', (code) => {
//   client.quit();
//   console.log('Redis 클라이언트가 소켓 연결을 닫았습니다.');
// });

const connectAndQuit = async (fn: () => Promise<any>, shouldQuit = true) => {
 
  try {
    if (!client.connected) { // 이미 연결되어 있지 않은 경우에만 연결 시도
      await new Promise<void>((resolve, reject) => {
        console.log("상태", client.on)
        client.on('ready', () => {
          console.log('Redis 클라이언트가 소켓 연결을 열었습니다.');
          resolve();
        });
        client.on('error', (error: string) => {
          console.error('Redis 클라이언트에서 오류가 발생했습니다.', error);
          reject(error);
        });
        client.connect();
      });
    }
    const result = await fn();
    return result;
  } catch (error) {
    console.error('Redis error:', error);
    throw error;
  } finally {
    try {
      if (shouldQuit) {
        await client.quit();
        console.log('Redis 클라이언트가 소켓 연결을 닫았습니다.');
      }
    } catch (error) {
      console.error('Error quitting Redis client:', error);
    }
  }
};



// const connectAndQuit = async (fn: () => Promise<any>, shouldQuit = true) => {
//   try {
//     if (!client.ready) { // 이미 연결되어 있지 않은 경우에만 연결 시도
//       await new Promise<void>((resolve, reject) => {
//         client.on('ready', () => {
//           console.log('Redis 클라이언트가 소켓 연결을 열었습니다.');
//           resolve();
//         });
//         client.on('error', (error: any) => {
//           console.error('Redis 클라이언트에서 오류가 발생했습니다.', error);
//           reject(error);
//         });
        
//         client.connect();
//       });
//     }
//     const result = await fn();
//     return result;
//   } catch (error) {
//     console.error('Redis error:', error);
//     throw error;
//   } finally {
//     try {
//       if (shouldQuit) {
//         await client.quit();
//         console.log('Redis 클라이언트가 소켓 연결을 닫았습니다.');
//       }
//     } catch (error) {
//       console.error('Error quitting Redis client:', error);
//     }
//   }
// };



const sessionCache = new Map();
let subscription: any = null;



export const setValue = async (key: string, field: string, value: any, expirationTime?: number) => {
  try {
    // Store the value in Redis
    if (expirationTime) {
      await connectAndQuit(() => client.SETEX(key, expirationTime, JSON.stringify(value)));
    } else {
      await connectAndQuit(() => client.HSET(key, field, JSON.stringify(value)));
    }

    // Update the local cache
    const cacheKey = `${key}-${field}`;
    sessionCache.set(cacheKey, value);

    // Publish a message to the channel for cache invalidation
    await connectAndQuit(() => client.PUBLISH(key, 'invalidate'));

    return value;
  } catch (error) {
    console.error('Error setting value in Redis:', error);
    throw error;
  }
};



export const getValue = async (key: string, field: string) => {
  try {
    const res: any = await connectAndQuit(() => client.HGET(key, field));
    const result = JSON.parse(res!);
    return result;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Error parsing Redis response:', error);
    } else {
      console.error('Error getting value from Redis:', error);
    }
    throw error;
  }
};




export const getSessionValue = async (key: string, field: string) => {
  const cacheKey = `${key}-${field}`;
  // Check if session data is cached locally
  if (sessionCache.has(cacheKey)) {
    console.log(`Session data cached locally: ${cacheKey}`);
    return sessionCache.get(cacheKey);
  }
  try {
    // Retrieve session data from Redis and cache it locally
    const sessionData = await connectAndQuit(() => client.HGET(key, field));
    const parsedSessionData = JSON.parse(sessionData!);
    sessionCache.set(cacheKey, parsedSessionData);
    // url:"redis://riskweather-user.sgefxn.ng.0001.apn2.cache.amazonaws.com:6379",
    // Subscribe to Redis pub/sub channel for cache invalidation
    // subscription = Redis.createClient({url:"redis://riskweather-user.sgefxn.ng.0001.apn2.cache.amazonaws.com:6379", ...clientOptions});
    // subscription = Redis.createClient({ ...clientOptions});
    subscription = Redis.createClient({url:"redis://test-redis-001.sgefxn.0001.apn2.cache.amazonaws.com:6379", ...clientOptions});
    // subscription = Redis.createClient({ ...clientOptions});
    subscription.subscribe(key);
    console.log("ssbus",key)

    // Handle cache invalidation events
    const messageListener = (channel: string, message: string) => {
      console.log(`Received message: ${message} on channel: ${channel}`);
      if (channel === key) {
        sessionCache.delete(cacheKey);
        subscription.unsubscribe(key);
        subscription.off('message', messageListener);
        subscription.quit();
      }
    };

    subscription.on('message', messageListener);

    return parsedSessionData;
  } catch (error) {
    console.error(`Error getting session data from Redis: ${error}`);
    throw error;
  }
};




export const deleteValue = async (key: string, field: string) => {
  try {
    await connectAndQuit(() => client.HDEL(key, field));
  } catch (error) {
    console.error('Error deleting value from Redis:', error);
    throw error;
  }
};

export const existValue = async (key: string, field: string) => {
  try {
    const result = await connectAndQuit(() => client.HEXISTS(key, field));
    return result;
  } catch (error) {
    console.error('Error checking if value exists in Redis:', error);
    throw error;
  }
};