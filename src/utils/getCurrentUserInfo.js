const jwt = require('jsonwebtoken');
const pool = require('../dataBase/dbPool');

const getCurrentUserInfo = (req) => {
  return new Promise((resolve, reject) => {
    let { authorization } = req.headers;
    jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject({ data: '请先登录', err });
      pool.getConnection((err, connection) => {
        if (err) reject({ data: '数据库连接失败', err });
        connection.query(
          'SELECT * FROM userInfo WHERE id = ? LIMIT 1',
          [decoded.id],
          (err, result) => {
            connection.release();
            if (err) reject({ data: '数据库查询失败', err });
            resolve({
              ...result[0],
              login_time: global
                .dayjs(result[0].login_time)
                .format('YYYY-MM-DD HH:mm:ss'),
            });
          }
        );
      });
    });
  });
};

module.exports = getCurrentUserInfo;
