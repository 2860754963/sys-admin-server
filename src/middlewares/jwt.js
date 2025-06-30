const jwt = require('jsonwebtoken');
const route = require('../routes/index');
/**
 *  验证token令牌
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticateJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.json(
      {
        data: '无效token或过期token',
      },
      401
    );
  }
  jwt.verify(authorization, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.json({ error: 'token无效或已过期' }, 403);
    }
    req.user = user;
    next();
  });
};

const whiteList = ['/captcha', '/register', '/login']; //设置白名单

const checReqWhiteList = (req, res, next) => {
  const url = req.url;
  let pathsList = route.pathsList.map((item) => item.split(' ')[1]);

  if (pathsList.includes(url)) {
    if (whiteList.includes(url)) {
      next();
    } else {
      authenticateJWT(req, res, next);
    }
  } else {
    next();
  }
};

module.exports = {
  checReqWhiteList,
};
