import { createClient } from 'redis';
import config from 'config';

const redisConfig= config.get<{
  host: string,
  user: string,
  password: string,
  port: number,
}>('redisConfig');

const redisClient = createClient({
  ...redisConfig
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;

