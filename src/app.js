require('./aliases.js');
const express = require('express');
const { createRestaurant } = require('./db/helpers/restaurants');
const { startHttpServer } = require('./utils/create-http-server');
const { initModels } = require('./db/models');

// connect to sequelize
initModels(true);
const app = express();
startHttpServer(app);

createRestaurant({ name: 'test name' }).then((data) => {
  console.log(data);
});

console.log('-');
