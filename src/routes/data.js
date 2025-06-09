const express = require('express');
const router = express.Router();
const fs = require('fs');
const publicIndex = require('../../public/index');

const PATH = publicIndex.pubilcDataPath + '/';
//读取数据模块，供客户端调用
//查询接口，token校验
//公共接口，无需校验
//data/read?type=it
//data/read?type=it.json
router.get('/read', (req, res, next) => {
  let type = req.param('type') || '';
  fs.readFile(PATH + type + '.json', (err, data) => {
    if (err) {
      return res.send({
        status: 0,
        info: '读取文件异常',
      });
    }
    let COUNT = 50;
    // TODO: try{}catch(){}
    let obj = [];
    try {
      obj = JSON.parse(data.toString());
    } catch (e) {
      obj = [];
    }
    if (obj.length > COUNT) {
      obj = obj.slice(0, COUNT);
    }
    return res.send({
      status: 1,
      data: obj,
    });
  });
});

// 数据存储模块——后台开发使用
router.post('/write', (req, res, next) => {
  if (!req.cookies.user) {
    return res.render('login', {});
  }
  // 文件名
  let type = req.param('type') || '';
  // 关键字段
  let url = req.param('url') || '';
  let title = req.param('title') || '';
  let img = req.param('img') || '';
  if (!type || !url || !title || !img) {
    return res.send({
      status: 0,
      info: '提交的字段不全',
    });
  }
  //1)读取文件
  let filePath = PATH + type + '.json';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.send({
        status: 0,
        info: '读取数据失败',
      });
    }
    let arr = JSON.parse(data.toString());
    //代表每一条记录
    let obj = {
      img: img,
      url: url,
      title: title,
      id: guidGenerate(),
      time: new Date(),
    };
    arr.splice(0, 0, obj);
    //2)写入文件
    let newData = JSON.stringify(arr);
    fs.writeFile(filePath, newData, (err) => {
      if (err) {
        return res.send({
          status: 0,
          info: '写入文件失败',
        });
      }
      return res.send({
        status: 1,
        info: obj,
      });
    });
  });
});

//阅读模块写入接口 后台开发使用
router.post('/write_config', (req, res, next) => {
  if (!req.cookies.user) {
    return res.render('login', {});
  }
  //TODO:后期进行提交数据的验证
  //防xss攻击 xss
  // npm install xss
  // require('xss')
  // let str = xss(name);
  let data = req.body.data;
  //TODO ： try catch
  let obj = JSON.parse(data);
  let newData = JSON.stringify(obj);

  // 写入
  fs.writeFile(PATH + 'config.json', newData, function (err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '写入数据失败',
      });
    }
    return res.send({
      status: 1,
      info: '数据写入成功',
      data: newData,
    });
  });
});

//guid
const guidGenerate = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
};

module.exports = router;
