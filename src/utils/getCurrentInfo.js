const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const getCurrentInfo = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.json({ data: '无效token' }, 401);
  }
  const currentInfo = jwt.verify(authorization, process.env.JWT_SECRET);
  let content = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../../public/data', 'user.json'),
      'utf8'
    )
  );
  const item = content.find((item) => item.id === currentInfo.id);
  res.json({
    data: item,
  });
};

module.exports = getCurrentInfo;
