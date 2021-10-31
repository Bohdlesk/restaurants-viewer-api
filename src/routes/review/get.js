const AppError = require('#AppError');
const { Review } = require('../../db/helpers');

async function Handler(req, res) {
  try {
    const { query } = req;

    const data = await Review.find(query);

    return res.status(200).send({ success: !!data, ...data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
