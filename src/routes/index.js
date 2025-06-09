const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const CaptchaService = require('../utils/captchaService');
const utils = require('../utils/index');

let content = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../public/data/user.json'), 'utf8')
);

//获取验证码
router.get('/captcha', (req, res) => {
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
    res.send({
      success: true,
      code: 200,
      data: {
        img: `data:image/png;base64,${buffer.toString('base64')}`,
      },
    });
  } else {
    res.send({
      success: false,
      code: 500,
      data: {
        img: '',
      },
    });
  }
});

//登录
router.post('/login', (req, res, next) => {
  let username = req?.body?.username;
  let password = req?.body?.password;
  let code = req?.body?.code;
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
          expiresIn: process.env.JWT_EXPIRE_TIME,
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
  let username = req?.body?.username;
  let password = req?.body?.password;
  let code = req?.body?.code;
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
