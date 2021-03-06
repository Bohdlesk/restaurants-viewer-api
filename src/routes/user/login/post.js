import { authenticateUser } from '../../../utils/jwt-auth';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { body } = req;

    const freshTokens = await authenticateUser(body.login, body.password);
    if (!freshTokens) return res.status(401).send({ status: 'unauthorized' });

    res.status(200).send({ status: 'authorized', ...freshTokens });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
