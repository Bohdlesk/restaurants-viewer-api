import { Arduino } from '../../db/helpers';
const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { body: body } = req;

    const data = await Arduino.create(body);

    return res.status(200).send({ success: !!data, ...data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
