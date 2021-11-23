import { User } from '../db/helpers';
const jwt = require('jsonwebtoken');
const { jwtTokenSecretKey } = require('../config');
const { compare } = require('./encrypt');
const { get } = require('lodash');

function validateJwtToken(token) {
  try {
    return jwt.verify(token, jwtTokenSecretKey, function (err, decoded) {
      if (err) {
        return false;
      }
      return decoded;
    });
  } catch (error) {
    AppError.authProcessError(error);
  }
}

async function validateRefreshJwtToken(refreshToken) {
  try {
    return jwt.verify(
      refreshToken,
      jwtTokenSecretKey,
      async function (err, decoded) {
        if (err) {
          return false;
        }

        const existToken = get(
          await User.find({ refresh_token: refreshToken }),
          'data[0]'
        );
        if (!existToken) return false;

        delete decoded.iat;
        delete decoded.exp;
        const newTokens = createAuthTokens(decoded);

        await User.update(existToken.id, {
          refresh_token: newTokens.jwtRefreshToken,
        });

        return newTokens;
      }
    );
  } catch (error) {
    AppError.authProcessError(error);
  }
}

async function authenticateUser(login, pass) {
  try {
    const userData = get(await User.find({ login }), 'data[0]');
    if (!userData) return false;

    const comparedPassword = userData.password
      ? await compare(pass, userData.password)
      : true;
    if (!comparedPassword) return false;

    const freshTokens = createAuthTokens({
      id: userData.id,
      login,
      isAdmin: userData.is_admin,
    });

    await User.update(userData.id, {
      refresh_token: freshTokens.jwtRefreshToken,
    });

    return freshTokens;
  } catch (error) {
    AppError.authProcessError(error);
  }
}

function createAuthTokens(tokenBody) {
  try {
    const jwtToken = jwt.sign(tokenBody, jwtTokenSecretKey, {
      expiresIn: '10d',
    });
    const jwtRefreshToken = jwt.sign(tokenBody, jwtTokenSecretKey, {
      expiresIn: '20d',
    });

    return {
      jwtToken,
      jwtRefreshToken,
    };
  } catch (error) {
    AppError.authProcessError(error);
  }
}

export {
  createAuthTokens,
  validateJwtToken,
  validateRefreshJwtToken,
  authenticateUser,
};
