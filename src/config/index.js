require('dotenv').config();
const env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'local';

const config = {
  dbDialect: 'postgres',
  dbPort: 5432,
  dbHost: process.env.DATABASE_HOST,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbUsername: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  env,
  workingPort: process.env.PORT || 3000,
  jwtTokenSecretKey: 'mU0rJPlyAhlBPSHLmrko',
};

console.log(config);

module.exports = config;
