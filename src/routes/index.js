const userRoutes = require('./userRoutes');
const utilsRoutes = require('./utilsRouter');

const getRoutePaths = (routers) => {
  const paths = [];
  routers.forEach((router) => {
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        paths.push(
          ...Object.keys(middleware.route.methods).map(
            (method) => `${method.toUpperCase()} ${middleware.route.path}`
          )
        );
      }
    });
  });

  return paths;
};

const pathsList = getRoutePaths([userRoutes, utilsRoutes]);

module.exports = {
  pathsList,
};
