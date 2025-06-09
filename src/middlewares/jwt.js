const jwt = require('jsonwebtoken');
/**
 *  验证token令牌
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticateJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      data: '无效token或过期token',
    });
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'token无效或已过期' });
    }
    req.user = user;
    next();
  });
};

/**
 * 请求放行白名单，不需要验证token
 */

const whiteList = ['/api/captcha', '/api/user/login', '/api/user/register'];

const checReqWhiteList = (req, res, next) => {
  console.log('进行jwt验证');
  const url = req.url;
  if (whiteList.includes(url)) {
    next();
  } else {
    authenticateJWT(req, res, next);
  }
};

module.exports = {
  authenticateJWT,
  checReqWhiteList,
};
