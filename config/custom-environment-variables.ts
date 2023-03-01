export default {
  port: 'PORT',
  postgresConfig: {
    host: 'PGHOST' || '0.0.0.0',
    port: 'PGPORT',
    username: 'PGUSER',
    password: 'PGPASSWORD',
    database: 'PGDATABASE',
  },
  redisHost: 'REDISHOST',
  redisUser: 'REDISUSER',
  redisPassword: 'REDISPASSWORD',
  redisPort: 'REDISPORT',
  accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',
  cloudinaryName: 'CLOUDINARY_NAME',
  cloudinaryAPIKey: 'CLOUDINARY_API_KEY',
  cloudinaryAPISecret: 'CLOUDINARY_API_SECRET',
};

