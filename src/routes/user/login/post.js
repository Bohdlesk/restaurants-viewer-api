const AppError = require('#AppError');
const { Review } = require('../../db/helpers');

async function Handler(req, res) {
  try {
    const { body } = req;

    const created = await Review.create(body);

    return res.status(200).send({ success: !!created, data: created });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
