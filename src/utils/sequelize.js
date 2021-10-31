const Sequilize = require('sequelize');
const config = require('#Config');

const sequelizeConnection = new Sequilize(
  config.database || 'postgres',
  config.username || 'postgres',
  config.password,
  {
    host: config.host || 'localhost',
    dialect: config.dialect || 'postgres',
    port: config.port || 5432,
    pool: {
      max: 3,
      min: 0,
      idle: 10000,
    },
    dialectOptions: config.dialectOptions || {},
  }
);

async function getConnection() {
  try {
    await sequelizeConnection.authenticate();
    console.log('Success connected to postgreSQL database');
  } catch (e) {
    console.error(e);
    console.error('Error connect to postgreSQL database');
  }
  return sequelizeConnection;
}

module.exports = { getConnection };
