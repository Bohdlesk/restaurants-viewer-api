const cors = require('cors');
const express = require('express');
const { errorMiddleware } = require('../middlewares/error-middleware');
const createRouter = require('./../routes/index');
const bodyParser = require('body-parser');
const boolParser = require('express-query-boolean');
const config = require('../config');

function startHttpServer(expressApp) {
  try {
    process.on('unhandledRejection', (reason, p) => {
      console.error(JSON.stringify({ p, reason }));
    });

    process.on('uncaughtException', (error) =>
      console.error(JSON.stringify(error))
    );
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({ extended: true }));
    expressApp.use(boolParser());

    expressApp.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    const env = 'DEV'; // TODO change env dynamically
    expressApp.get('/', async (req, res) => {
      res.send(`Date: ${new Date()}
    Environment: ${env}`);
    });

    createRouter(expressApp);

    expressApp.use(errorMiddleware);

    const port = config.workingPort; // TODO change port dynamically
    expressApp.listen(port, async () => {
      console.log(`API server started at port ${port} in ${env} environment`);
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = { startHttpServer };
