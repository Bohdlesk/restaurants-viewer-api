import { Arduino } from '../../../db/helpers';
const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const data = await Arduino.getCurrentTemperature();

    return res.status(200).send({ success: !!data, ...data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
