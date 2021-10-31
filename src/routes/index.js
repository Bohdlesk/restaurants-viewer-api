const glob = require('glob');

function createRouter(app) {
  glob
    .sync('**/router.js', { cwd: `${__dirname}/` })
    .sort((a, b) => (b.split('/').length > a.split('/').length ? 1 : -1))
    .forEach((path) => {
      const parsedPath = path.replace(/{{/g, ':').replace(/}}/g, '');
      const routePath = `/${parsedPath.replace('/router.js', '')}`;
      const filePath = `./${path}`;

      console.log(routePath);

      app.use(routePath, require(filePath));
    });
}

module.exports = createRouter;
