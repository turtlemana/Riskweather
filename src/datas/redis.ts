// redis.ts
import { getClient } from './ioredisClient';
import { Redis } from 'ioredis';

const client = getClient();

export const subscribe = (channel: string, callback: (message: string) => void) => {
  const subscriber = new Redis();
  subscriber.subscribe(channel);
  subscriber.on("message", (channel, message) => callback(message));
};

export const publish = async (channel: string, message: string) => {
  await client.publish(channel, message);
};

export const setValue = async (key: string, field: string, value: any, expirationTime?: number) => {
  try {
    if (expirationTime) {
      await client.setex(key, expirationTime, JSON.stringify(value));
    } else {
      await client.hset(key, field, JSON.stringify(value));
    }

    await publish('user-update', field);

    return value;
  } catch (error) {
    console.error('Error setting value in Redis:', error);
    throw error;
  }
};

export const getValue = async (key: string, field: string) => {
  try {
    const res: string | null = await client.hget(key, field);
    if (res) {
      return JSON.parse(res);
    }
    return null;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Error parsing Redis response:', error);
    } else {
      console.error('Error getting value from Redis:', error);
    }
    throw error;
  }
};

export const deleteValue = async (key: string, field: string) => {
  try {
    await client.hdel(key, field);
  } catch (error) {
    console.error('Error deleting value from Redis:', error);
    throw error;
  }
};

export const existValue = async (key: string, field: string) => {
  try {
    console.log("Execute exist")
    const result = await client.hexists(key, field);
    console.log("What is the result?", result)
    return result === 1;
  } catch (error) {
    console.error('Error checking if value exists in Redis:', error);
    throw error;
  }
};

export const checkRateLimit = async (ip: string) => {
  const key = `rateLimit:${ip}`;
  const current = await client.get(key) || 0;

  if (Number(current) >= 5) { // 예를 들어, 5번을 초과한 호출 제한
    return false;
  }

  await client.incr(key);
  await client.expire(key, 3600); // 1시간 동안 제한

  return true;
};




process.on('exit', () => {
  client?.disconnect();
});