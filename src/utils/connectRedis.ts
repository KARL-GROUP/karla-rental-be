require('dotenv').config()
import 'reflect-metadata';
import { createClient } from 'redis';
import config from 'config';

const redisUser= config.get<string>('redisUser');
const redisPassword= config.get<string>('redisPassword');
const redisHost= config.get<string>('redisHost');
const redisPort= config.get<string>('redisPort');
const redisURL= `redis://${ redisUser }:${ redisPassword }@${ redisHost }:${ redisPort }`;


const redisClient = createClient({
  url: redisURL,
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

