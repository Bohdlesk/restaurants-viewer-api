import { validateRefreshJwtToken } from '../../../../utils/jwt-auth';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { refreshToken } = req.body;

    const freshTokens = await validateRefreshJwtToken(refreshToken);
    if (!freshTokens) return res.status(401).send({ status: 'unauthorized' });

    res.status(200).send({ status: 'authorized', ...freshTokens });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
