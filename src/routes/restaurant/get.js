const AppError = require('#AppError');
const { Restaurant } = require('../../db/helpers');

async function Handler(req, res) {
  try {
    const { query } = req;

    const data = await Restaurant.find(query);

    return res.status(200).send({ success: !!data, ...data });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
