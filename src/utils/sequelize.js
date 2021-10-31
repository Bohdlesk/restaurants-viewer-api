const Sequilize = require('sequelize');
const config = require('#Config');

const sequelizeConnection = new Sequilize(
  config.database || 'postgres',
  config.dbUsername || 'postgres',
  config.dbPassword,
  {
    host: config.dbHost || 'localhost',
    dialect: config.dbDialect || 'postgres',
    port: config.dbPort || 5432,
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
