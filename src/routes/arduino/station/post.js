import { Station } from '../../../db/helpers';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { body } = req;

    body.user_id = req.user.id;

    const data = await Station.create(body);

    return res.status(200).send({ success: !!data, ...data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
