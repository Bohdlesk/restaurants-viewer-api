const AppError = require('#AppError');
const { Review } = require('../../../db/helpers');

async function Handler(req, res) {
  try {
    const { id } = req.params;

    const data = await Review.findById(id);

    return res.status(200).send({ success: !!data, data: data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
