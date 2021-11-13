require('./aliases.js');
const express = require('express');
const { startHttpServer } = require('./utils/create-http-server');

const app = express();
startHttpServer(app);
