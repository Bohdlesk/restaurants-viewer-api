const jwt = require('jsonwebtoken');
const { jwtTokenSecretKey } = require('../config');
// const { compare } = require('./encrypt');
const { Admin } = require('../db/helpers');

function validateJvtToken(token) {
  return jwt.verify(token, jwtTokenSecretKey, function (err, decoded) {
    if (err) {
      return false;
    }
    return decoded;
  });
}

async function validateRefreshJvtToken(refreshToken) {
  return jwt.verify(
    refreshToken,
    jwtTokenSecretKey,
    async function (err, decoded) {
      if (err) {
        return false;
      }

      const existToken = await Admin.find({ refresh_token: refreshToken });
      if (!existToken) return false;

      delete decoded.iat;
      delete decoded.exp;
      const newTokens = createAuthTokens(decoded);

      await Admin.update(existToken.id, {
        refresh_token: newTokens.jvtRefreshToken,
      });

      return newTokens;
    }
  );
}

async function authenticateUser(login, pass) {
  const existAdmin = await Admin.find({ login });
  if (!existAdmin) return false;

  const comparedPassword = await compare(pass, existAdmin.password);
  if (!comparedPassword) return false;

  const freshTokens = createAuthTokens({
    login,
  });

  await Admin.update(existAdmin.id, {
    refresh_token: freshTokens.jvtRefreshToken,
  });

  return freshTokens;
}

function createAuthTokens(tokenBody) {
  const jvtToken = jwt.sign(tokenBody, jwtTokenSecretKey, {
    expiresIn: '15m',
  });
  const jvtRefreshToken = jwt.sign(tokenBody, jwtTokenSecretKey, {
    expiresIn: '2d',
  });

  return {
    jvtToken,
    jvtRefreshToken,
  };
}

module.exports = {
  createAuthTokens,
  validateJvtToken,
  validateRefreshJvtToken,
  // authenticateUser,
};
