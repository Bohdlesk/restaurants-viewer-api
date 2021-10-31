const AppError = require('#AppError');
const { Restaurant } = require('../../../db/helpers');

async function Handler(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const updated = await Restaurant.update(id, body);

    return res.status(200).send({ success: !!updated, data: updated });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
