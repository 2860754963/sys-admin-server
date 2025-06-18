exports.upload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: '未上传文件',
    });
  }

  return res.send({
    code: 200,
    result: 'success',
  });
};
