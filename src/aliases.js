const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '#AppError': `${__dirname}/utils/error-handler`,
  '#Config': `${__dirname}/config`,
  '#handleErrorAsync': `${__dirname}/middlewares/error-middleware`,
  '#Joi': `${__dirname}/middlewares/joi-validator-middleware`,
  '#db': `${__dirname}/db/models`,
});

moduleAlias();
