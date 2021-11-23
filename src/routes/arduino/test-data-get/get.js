import { Humidity, Temperature } from '../../../db/helpers';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const temperature = await Temperature.findLatestValue();
    const humidity = await Humidity.findLatestValue();

    return res.status(200).send({
      data: {
        temperature,
        humidity,
      },
    });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
