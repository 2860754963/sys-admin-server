const route = require('../routes/index');

let { pathsList } = route;
let urlToMethodMap = {};

pathsList.forEach((route) => {
  const [method, url] = route.split(' ');
  urlToMethodMap[url] = method;
});

const isValidMethod = (request) => {
  const url = `/${request.url.split('/').slice(-1).join('/')}`;
  return urlToMethodMap[url] === request.method;
};

const checkMethods = (req, res, next) => {
  const url = `/${req.url.split('/').slice(-1).join('/')}`;

  if (urlToMethodMap[url]) {
    if (!isValidMethod(req)) {
      return res.status(405).send({
        message: `url: ${req.url} does not support ${req.method} method`,
      });
    }
  }
  next();
};

module.exports = checkMethods;
