const fs = require('fs');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

const memoryDest = path.join(__dirname, '../../public/images');

const storage = multer.diskStorage({
  // 文件存储位置
  destination: (req, file, cb) => {
    // console.log('🚀🚀🚀 ~ file🚀🚀🚀', file);
    const isExists = fs.existsSync(memoryDest);
    if (!isExists) {
      fs.mkdirSync(memoryDest);
    }
    cb(null, memoryDest);
  },
  filename: (req, file, cb) => {
    console.log('🚀🚀🚀 ~ file🚀🚀🚀', file);
    // 生成唯一文件名
    const uid = uuid.v1();

    cb(null, uid + file.fieldname);
  },
});

// 过滤文件
function fileFilter(req, file, callback) {
  if (!file) {
    callback(null, false);
  } else {
    callback(null, true);
  }
}
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
}).single('file'); //上传的fieldname必须为file

module.exports = upload;
