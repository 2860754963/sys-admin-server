const express = require('express');
const router = express.Router();
const dbapi = require('../dataBase/api');

router.get('/usedb', (req, res, next) => {
  console.log('🚀🚀🚀 ~ dbapi🚀🚀🚀', dbapi);

  console.log('usedb');
});

module.exports = router;
