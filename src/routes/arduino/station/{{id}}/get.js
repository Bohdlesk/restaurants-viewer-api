import { Station } from '../../../../db/helpers';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { query: searchParams, user, params } = req;

    searchParams.id = params.id;
    searchParams.user_id = user.isAdmin ? undefined : user.id;

    const { data } = await Station.find(searchParams);

    return res
      .status(200)
      .send({ success: !!data.length, data: data[0] || {} });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
