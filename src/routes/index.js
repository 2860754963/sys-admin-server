const express = require('express');
const router = express.Router();
const fs = require('fs');
const CaptchaService = require('../utils/captchaService');

const PATH = '../../public/data/';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '首页' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: '登录' });
});

router.get('/tuijian', function (req, res, next) {
  if (!req.cookies.user) {
    return res.render('login', {});
  }
  res.render('tuijian', {});
});

router.get('/edit', function (req, res, next) {
  if (!req.cookies.user) {
    return res.render('login', {});
  }
  var type = req.query.type;
  if (type) {
    var obj = {};
    switch (type) {
      case 'sanwen':
        obj = {};
        break;
      case 'it':
        obj = {};
        break;
      case 'manager':
        obj = {};
        break;
      case 'cookies':
        obj = {};
        break;
      default:
        return res.send({
          code: 0,
          info: '参数错误',
        });
        break;
    }
    fs.readFile(PATH + type + '.json', (err, data) => {
      if (err) {
        return res.send({
          code: 0,
          info: 'fail.....',
        });
      }
      var obj = JSON.parse(data.toString());
      return res.render('edit', {
        data: obj,
      });
    });
  } else {
    return res.send({
      code: 0,
      info: '参数错误',
    });
  }
});

/**
 * 获取验证码
 */
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

// router.get('/test/:id/:name', (req, res) => {
//   let id = req.params.id;
//   let name = req.params.name;
//   console.log(id, name);
//   res.send({
//     code: 200,
//     info: 'ok',
//   });
// });

module.exports = router;
