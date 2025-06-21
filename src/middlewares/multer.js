const fs = require('fs');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

const memoryDest = path.join(__dirname, '../../public/files');

const storage = multer.diskStorage({
  // 文件存储位置
  destination: (req, file, cb) => {
    const isExists = fs.existsSync(memoryDest);
    if (!isExists) {
      fs.mkdirSync(memoryDest);
    }
    cb(null, memoryDest);
  },
  filename: (req, file, cb) => {
    const uid = uuid.v1(); //Create a version 1 (timestamp) UUID
    cb(null, uid + file.originalname);
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
    fileSize: 20 * 1024 * 1024,
  },
});

module.exports = upload;
