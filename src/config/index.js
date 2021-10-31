require('dotenv').config();
const env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'local';

const config = {
  dialect: 'postgres',
  port: 5432,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  env,
  workingPort: process.env.PORT || 3000,
  jwtTokenSecretKey: process.env.JWT_SECRET,
};

console.log(config);

module.exports = config;
