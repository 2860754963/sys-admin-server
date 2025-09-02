const pool = require('../dataBase/dbPool');
const { getCurrentUserInfo } = require('../utils/index');
let currentUserInfo = await getCurrentUserInfo(req);
let host = req.headers.host;
exports.upload = async (req, res, next) => {
  if (!req.file) {
    return res.json({ data: '未检测到文件', err }, 400);
  }
  let url = host + '/public' + req.file.path.split('public')[1];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ data: '数据库连接失败', err }, 500);
    }

    let fileType = 'file';
    if (req.file.mimetype.includes('image')) {
      fileType = 'image';
    } else if (req.file.mimetype.includes('video')) {
      fileType = 'video';
    }
    const sql = `
    INSERT INTO uploaded_files 
    (file_name, file_type, file_path, file_size, upload_time) 
    VALUES (?, ?, ?, ?, NOW(),?)
  `;

    const params = [
      req.file.originalname,
      fileType,
      url, // 文件存储路径
      req.file.size, // 文件大小
      currentUserInfo.id, // 上传用户ID
    ];

    connection.query(sql, params, (err, result) => {
      connection.release();
      if (err) {
        return res.json({ data: '数据库插入失败', err }, 500);
      }
      return res.json(
        {
          success: true,
          message: '文件上传成功',
          url,
          file: req.file,
        },
        200
      );
    });
  });
};

exports.uploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: '未检测到文件',
    });
  }
};
