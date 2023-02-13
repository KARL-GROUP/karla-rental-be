export default {
  port: 'PORT',
  postgresConfig: {
    host: 'POSTGRES_HOST' || '0.0.0.0',
    port: 'POSTGRES_PORT',
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
  },
  redisConfig:{
    host: 'REDIS_HOST',
    user: 'REDIS_USER',
    password: 'REDIS_PASSWORD',
    port: 'REDIS_PORT',
  },
  accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',
};

