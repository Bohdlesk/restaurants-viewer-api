const AppError = require('#AppError');
const { Restaurant } = require('../../../db/helpers');

async function Handler(req, res) {
  try {
    const { id } = req.params;

    const data = await Restaurant.findById(id);

    return res.status(200).send({ success: !!data, data: data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
