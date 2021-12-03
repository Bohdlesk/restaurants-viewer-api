import { Station } from '../../../db/helpers';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { query: searchParams, user } = req;

    searchParams.user_id = user.isAdmin ? undefined : user.id;

    const data = await Station.find(searchParams);

    return res.status(200).send({ success: !!data, ...data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
