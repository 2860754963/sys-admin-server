const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// 获取菜单
router.get('/menu', (req, res, next) => {
  let content = fs.readFileSync(
    path.join(__dirname, '../../public/data/menus.json'),
    'utf8'
  );
  return res.send({ success: true, code: 200, data: JSON.parse(content) });
});

module.exports = router;
