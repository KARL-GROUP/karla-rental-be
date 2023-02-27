export default {
  port: 'PORT',
  postgresConfig: {
    host: 'POSTGRES_HOST' || '0.0.0.0',
    port: 'POSTGRES_PORT',
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
  },
  redisHost: 'REDIS_HOST',
  redisUser: 'REDIS_USER',
  redisPassword: 'REDIS_PASSWORD',
  redisPort: 'REDIS_PORT',
  accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',
  cloudinaryName: 'CLOUDINARY_NAME',
  cloudinaryAPIKey: 'CLOUDINARY_API_KEY',
  cloudinaryAPISecret: 'CLOUDINARY_API_SECRET',
};

