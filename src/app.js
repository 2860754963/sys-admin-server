require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const consoletable = require('@xdooi/consoletable');
const loadsh = require('lodash');
const dayjs = require('dayjs');
const jwt = require('./middlewares/jwt');
const checkMethods = require('./middlewares/checkMethods');

// 生产环境通过mysql保存session会话
const MySQLStore = require('express-mysql-session')(session);
const pool = require('../src/dataBase/dbPool');
// console.log("🚀 ~ pool:", pool)
const sessionStore = new MySQLStore({
  checkExpirationInterval: 900000,  // 每 15 分钟检查一次过期的会话
  expiration: Number(process.env.CODE_EXPIRE_TIME),
}, pool);

global._ = loadsh;
global.dayjs = dayjs;

// 路由导入，路由的匹配是从上到下依次匹配的，写在前边的路由优先级较高
const userRoutes = require('./routes/userRoutes');
const utilsRoutes = require('./routes/utilsRouter');

const app = express();
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))); // 网站图标
app.use('/public', express.static(path.join(__dirname, '../public'))); //静态资源托管  添加路径前缀 /public

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: 'SESSION_ID',
    secret: 'session_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: Number(process.env.CODE_EXPIRE_TIME),
    },
    store: process.env.NODE_ENV === 'production' ? sessionStore : sessionStore,
  })
);

app.use((req, res, next) => {
  const options = { head: 'def', max: 50 };
  consoletable.drawTable(
    [
      {
        'Request URL': '请求地址',
        'Request Method': '请求方法',
        'Query Parameters': '查询参数',
        'Request Body': '请求体',
        'req Cookies': '请求cookies',
        'req Params': '请求参数',
      },
      {
        'Request URL': req.originalUrl,
        'Request Method': req.method,
        'Query Parameters': JSON.stringify(req?.query),
        'Request Body': JSON.stringify(req?.body ? req.body : {}),
        'req Cookies': JSON.stringify(req?.cookies),
        'req Params': JSON.stringify(req?.params),
      },
    ],
    options
  );

  next();
});

// 静态资源托管 /public为前缀
app.use('/public', express.static(path.join(__dirname, 'public'))); //静态资源托管 如果存在多个托管目录则会顺序查找

// 校验请求方法中间件
app.use(checkMethods);

// 跨域设置
app.use(cors());

app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = (data, statusCode = 200) => {
    data.code = statusCode;
    data.success = statusCode === 200;
    originalJson.call(res, data);
  };
  next();
});

// 路由注册
app.use('/api/user', jwt.checReqWhiteList, userRoutes);
app.use('/api', utilsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log("🚀 ~ err:", err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.json(
    {
      data: err.message,
    },
    err.status || 500
  );
  return
});

module.exports = app;
