import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    PGHOST: str(),
    PGPORT: port(),
    PGUSER: str(),
    PGPASSWORD: str(),
    PGDATABASE: str(),
    JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
    JWT_ACCESS_TOKEN_PUBLIC_KEY: str(),
    JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
    JWT_REFRESH_TOKEN_PUBLIC_KEY: str(),
    REDISHOST:str(),
    REDISUSER:str(),
    REDISPORT:port(),
    REDISPASSWORD:str(),
    CLOUDINARY_NAME:str(),
    CLOUDINARY_API_KEY:str(),
    CLOUDINARY_API_SECRET:str(),

  });
};

export default validateEnv;

