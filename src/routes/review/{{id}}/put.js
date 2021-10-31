const AppError = require('#AppError');
const { Review } = require('../../../db/helpers');

async function Handler(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const updated = await Review.update(id, body);

    return res.status(200).send({ success: !!updated, data: updated });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
