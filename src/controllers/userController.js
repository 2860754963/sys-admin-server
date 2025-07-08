const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const utils = require('../utils/index');
const CaptchaService = require('../utils/captchaService');
const pool = require('../dataBase/dbPool');

let content = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../public/data/user.json'), 'utf8')
);

// 验证码
exports.captcha = (req, res, next) => {
  const { buffer, text } = CaptchaService.createPng({
    width: 120,
    height: 40,
    length: 5,
  });
  req.session.captcha = {
    text: text,
    createdAt: Date.now(),
    expiresIn: process.env.CODE_EXPIRE_TIME,
  };
  console.log('🚀🚀🚀req.session.captcha🚀🚀🚀', req.session.captcha);
  if (buffer && text) {
    return res.json({
      data: {
        img: `data:image/png;base64,${buffer.toString('base64')}`,
      },
    });
  } else {
    return res.json({ data: '验证码生成失败' }, 500);
  }
};

// 登录
exports.login = (req, res, next) => {
  let username = req?.body?.username;
  let password = req?.body?.password;
  let code = req?.body?.code;
  if (!username || !password || !code)
    return res.json({
      success: 0,
      code: 400,
      data: '用户名或密码或验证码不能为空',
    });
  if (!req.session.captcha) return res.json({ data: '验证码已过期' }, 400);
  let { text, createdAt, expiresIn } = req.session.captcha;
  if (code !== text) return res.json({ data: '验证码错误' }, 400);

  pool.getConnection((err, connection) => {
    if (err) return res.json({ data: '数据库连接失败' }, 500);
    connection.query(
      'SELECT * FROM user_info WHERE user_name = ? LIMIT 1',
      [username],
      (err, result) => {
        if (err) return res.json({ data: '数据库连接失败' }, 500);
        if (result.length === 0) {
          connection.release();
          return res.json({ data: '用户名不存在，请注册' }, 400);
        }
        let { user_pwd } = result[0];
        if (user_pwd !== password) {
          connection.release();
          return res.json({ data: '密码错误,登录失败' }, 400);
        }
        const token = jwt.sign(
          {
            id: result[0].id,
            username: result[0].user_name,
            realname: result[0].real_name,
            nickname: result[0].nick_name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRE_TIME,
          }
        );
        connection.query(
          'UPDATE user_info SET token = ?, is_login = ?, login_time = ? , login_ip = ? WHERE id = ?',
          [
            token,
            1,
            global.dayjs().format('YYYY-MM-DD HH:mm:ss'),
            req.ip,
            result[0].id,
          ],
          (err) => {
            connection.release();
            if (err) return res.json({ data: '登录失败' }, 500);
            return res.json({ data: '登录成功' });
          }
        );
      }
    );
  });
};

// 注册
exports.register = (req, res, next) => {
  if (!req.session.captcha) return res.json({ data: '验证码已过期' }, 400);
  let { text, createdAt, expiresIn } = req.session.captcha;
  if (code !== text) return res.json({ data: '验证码错误' }, 400);
  pool.getConnection((err, connection) => {
    if (err) return res.json({ data: '数据库连接失败' }, 500);
    let username = req?.body?.username;
    let password = req?.body?.password;
    let code = req?.body?.code;
    if (!username || !password || !code) {
      connection.release();
      return res.json({ data: '用户名或密码或验证码不能为空' }, 400);
    }
    connection.query(
      'SELECT * FROM user_info WHERE user_name = ? LIMIT 1',
      [username],
      (err, result) => {
        if (err) {
          connection.release();
          return res.json({ data: '注册失败' }, 500);
        }
        if (result.length > 0) {
          connection.release();
          return res.json({ data: '用户名已存在，请重新输入' }, 400);
        }
        connection.query(
          'INSERT INTO user_info (user_name, user_pwd) VALUES (?, ?)',
          [username, password],
          (err) => {
            connection.release();
            if (err) return res.json({ data: '注册失败' }, 500);
            return res.json({ data: '注册成功' });
          }
        );
      }
    );
  });
};

// 获取菜单
exports.getMenus = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) return res.json({ data: '数据库连接失败' }, 500);

    connection.query('SELECT * FROM menu ORDER BY id ASC', (err, result) => {
      connection.release();
      if (err) return res.json({ data: '数据库查询失败' }, 500);
      const map = {};
      result.forEach((item) => {
        item.children = [];
        item.hidden = !!item.hidden;
        item.alwaysShow = !!item.always_show || false;
        map[item.id] = item;
      });

      const resData = [];
      result.forEach((item) => {
        if (item.parent_id && item.parent_id !== 0) {
          const parent = map[item.parent_id];
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(item);
          }
        } else {
          resData.push(item);
        }
      });

      return res.json({ data: resData });
    });
  });
};

exports.mine = (req, res, next) => {
  utils.getCurrentInfo(req, res, next);
};

// 更新用户信息
exports.updateUserInfo = (req, res, next) => {
  let { id, nickname, phone, avatar, email } = req.body;
  let index = content.findIndex((item) => item.id == id);
  if (index === -1) {
    return res.json({ data: '用户不存在' }, 400);
  } else {
    if (nickname) content[index].nickname = nickname;
    if (avatar) content[index].avatar = avatar;
    if (phone) content[index].phone = phone;
    if (email) content[index].email = email;
    content[index].updateTime = global.dayjs().format('YYYY-MM-DD HH:mm:ss');
    utils.writeFile('user.json', content[index], 'id');
    return res.json({ data: '更新成功' });
  }
};

// 删除用户
exports.deleteUser = (req, res, next) => {
  let { id } = req.body;
  let index = content.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.json({ data: '用户不存在' }, 400);
  } else {
    content.splice(index, 1);
    utils.writeFile('user.json', content, 'id');
    return res.json({ data: '删除成功' });
  }
};
