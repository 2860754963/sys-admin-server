const fs = require('fs');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');
const dayjs = require('dayjs');

const storage = multer.diskStorage({
  // 文件存储位置
  destination: (req, file, cb) => {
    let memoryDest = void 0;
    // 通过mimetype 区分上传的文件类型以区别不同的存放位置

    // 本地调试时需要将  ../public  改为 ../../public
    if (file.mimetype.startsWith('image/')) {
      memoryDest = path.join(__dirname, '../public/images');
    } else if (file.mimetype.startsWith('video/')) {
      memoryDest = path.join(__dirname, '../public/videos');
    } else {
      memoryDest = path.join(__dirname, '../public/files');
    }
    let isExists = fs.existsSync(memoryDest);
    if (!isExists) {
      fs.mkdirSync(memoryDest);
    }
    cb(null, memoryDest);
  },
  filename: (req, file, cb) => {
    const timestamp = dayjs().format('YYYYMMDDHHmmss');
    let fileNewName =
      file.originalname.split('.')[0] +
      '_' +
      timestamp +
      '.' +
      file.originalname.split('.')[1];
    // const uid = uuid.v1(); //Create a version 1 (timestamp) UUID
    cb(null, fileNewName);
  },
});

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
    // fileSize: 20 * 1024 * 1024,
  },
});

module.exports = upload;
