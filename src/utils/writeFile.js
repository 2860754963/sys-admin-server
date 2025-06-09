const fs = require('fs');
const path = require('path');
/**
 *
 * @param {string} fileName 文件名
 * @param {object} data 要写入的数据
 * @param {string} keyWord 数据行唯一关键字
 *
 */

const writeFile = (fileName, data, keyWord = 'id') => {
  const contentJson = fs.readFileSync(
    path.join(__dirname, '../../public/data', fileName),
    'utf8'
  );
  const content = JSON.parse(contentJson);
  let index = content.findIndex((item) => item[keyWord] === data[keyWord]);
  if (index === -1) {
    content.push(data);
    fs.writeFileSync(
      path.join(__dirname, '../../public/data', fileName),
      JSON.stringify(content),
      'utf8'
    );
  } else {
    Object.assign(content[index], data);
    fs.writeFileSync(
      path.join(__dirname, '../../public/data', fileName),
      JSON.stringify(content),
      'utf8'
    );
  }
  return 1;
};

module.exports = writeFile;
