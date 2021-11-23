import { Humidity, Temperature } from '../../../db/helpers';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { query } = req;
    const temperature = await Temperature.findLatestValue(query.stationId);
    const humidity = await Humidity.findLatestValue(query.stationId);

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
