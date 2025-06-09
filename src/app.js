require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('./middlewares/jwt');

// 路由导入，路由的匹配是从上到下依次匹配的，写在前边的路由优先级较高
const index = require('./routes/index');
const user = require('./routes/user');
const data = require('./routes/data');

const app = express();

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: 'SESSION_ID',
    secret: process.env.SESSION_SECRET, // 替换为安全的密钥
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(process.env.CODE_EXPIRE_TIME),
    },
  })
);
app.use((req, res, next) => {
  console.log('🚀🚀🚀 ~ Request URL:', req.originalUrl);
  console.log('🚀🚀🚀 ~ Request Method:', req.method);
  console.log('🚀🚀🚀 ~ Query Parameters:', req.query);
  console.log('🚀🚀🚀 ~ Request Body:', req.body);
  console.log('🚀🚀🚀 ~ Cookies:', req.cookies);
  console.log('🚀🚀🚀 ~ Params:', req.params);
  next();
});

// 静态资源托管 /public为前缀
app.use('/public', express.static(path.join(__dirname, 'public'))); //静态资源托管 如果存在多个托管目录则会顺序查找

// 添加路由前缀
app.use('/api', index);
app.use(jwt.checReqWhiteList);
app.use('/api/user', user);
app.use('/api/data', data);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('🚀🚀🚀 ~ app.use ~ req🚀🚀🚀', req);
  console.log('中间件处理404');
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  return res.status(err.status || 500).send({
    success: false,
    code: err.status || 500,
    data: err.message,
  });
});

module.exports = app;
