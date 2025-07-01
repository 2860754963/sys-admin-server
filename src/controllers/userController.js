const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const utils = require('../utils/index');
const CaptchaService = require('../utils/captchaService');

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

  let index = content.findIndex((item) => item.username === username);
  if (index === -1) {
    return res.json(
      {
        data: '用户名不存在，请注册',
      },
      400
    );
  } else {
    if (content[index].password === password) {
      const token = jwt.sign(
        { id: content[index].id, username: content[index].username },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE_TIME,
        }
      );
      content[index].token = token;
      utils.writeFile('user.json', content[index], 'id');
      return res.json({
        data: { ...content[index], expires: process.env.JWT_EXPIRE_TIME },
      });
    } else {
      return res.json({ data: '密码错误,登录失败' }, 400);
    }
  }
};

// 注册
exports.register = (req, res, next) => {
  let username = req?.body?.username;
  let password = req?.body?.password;
  let code = req?.body?.code;
  if (!username || !password || !code)
    return res.json(
      {
        data: '用户名或密码或验证码不能为空',
      },
      400
    );
  if (!req.session.captcha) return res.json({ data: '验证码已过期' }, 400);
  let { text, createdAt, expiresIn } = req.session.captcha;
  if (code !== text) return res.json({ data: '验证码错误' }, 400);

  let index = content.findIndex((item) => item.username === username);
  if (index !== -1)
    return res.json(
      {
        data: '用户名已存在，请重新输入',
      },
      400
    );
  utils.writeFile(
    'user.json',
    {
      name: username,
      username,
      password,
      id: content.length + 1,
    },
    'id'
  );

  return res.json({ data: '注册成功' });
};

// 获取菜单
exports.getMenus = (req, res, next) => {
  let content = fs.readFileSync(
    path.join(__dirname, '../../public/data/menus.json'),
    'utf8'
  );
  return res.json({ data: JSON.parse(content) });
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
