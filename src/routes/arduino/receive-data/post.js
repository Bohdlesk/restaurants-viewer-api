import { Humidity, Station, Temperature } from '../../../db/helpers';
import moment from 'moment';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { body } = req;

    const { data } = await Station.find({ sid: body.sid });
    if (!data.length) {
      return res
        .status(200)
        .send({ success: false, message: 'Station is not registered' });
    }
    const station = data[0];

    const { id: station_id } = station;

    Station.update(station_id, {
      last_connection: moment.utc().format(),
    });

    const { temperature, humidity, data: additionalData } = body;

    if (temperature)
      Temperature.create({
        data: temperature,
        station_id,
      });

    if (humidity)
      Humidity.create({
        data: humidity,
        station_id,
      });

    return res.status(200).send({ success: true });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
