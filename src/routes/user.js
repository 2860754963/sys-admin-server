const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const utils = require('../utils/index');

let content = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../public/data/user.json'), 'utf8')
);

//登录接口
router.post('/login', function (req, res, next) {
  let { username, password, code } = req.body;
  if (!username || !password || !code)
    return res.send({
      success: 0,
      code: 400,
      data: '用户名或密码或验证码不能为空',
    });
  if (!req.session.captcha)
    return res.send({ success: false, code: 400, data: '验证码已过期' });
  let { text, createdAt, expiresIn } = req.session.captcha;
  if (code !== text)
    return res.send({ success: false, code: 400, data: '验证码错误' });

  let index = content.findIndex((item) => item.username === username);
  if (index === -1) {
    return res.send({
      success: false,
      code: 400,
      data: '用户名不存在，请注册',
    });
  } else {
    if (content[index].password === password) {
      const token = jwt.sign(
        { id: content[index].id, username: content[index].username },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );
      content[index].token = token;
      utils.writeFile('user.json', content[index], 'id');
      return res.send({
        success: true,
        code: 200,
        data: { ...content[index] },
      });
    } else {
      return res.send({ success: false, code: 400, data: '密码错误,登录失败' });
    }
  }
});

// 注册接口
router.post('/register', (req, res, next) => {
  let { username, password, code } = req.body;
  if (!username || !password || !code)
    return res.send({
      success: 0,
      code: 400,
      data: '用户名或密码或验证码不能为空',
    });
  if (!req.session.captcha)
    return res.send({ success: false, code: 400, data: '验证码已过期' });
  let { text, createdAt, expiresIn } = req.session.captcha;
  if (code !== text)
    return res.send({ success: false, code: 400, data: '验证码错误' });

  console.log('🚀🚀🚀 ~ content🚀🚀🚀', content);
  let index = content.findIndex((item) => item.username === username);
  if (index !== -1)
    return res.send({
      success: false,
      code: 400,
      data: '用户名已存在，请重新输入',
    });
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

  return res.send({ success: true, code: 200, data: '注册成功' });
});

module.exports = router;
