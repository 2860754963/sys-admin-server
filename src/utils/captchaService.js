// 引入 captchapng2 库，用于生成验证码图片
const captchapng = require('captchapng2');

// 定义 CaptchaService 类，用于处理验证码的生成和清除
class CaptchaService {
  /**
   * 生成 PNG 格式的验证码
   * @param {number} width   图片宽度，默认值为 100
   * @param {number} height  图片高度，默认值为 40
   * @param {number} length  验证码长度，默认值为 4
   * @returns {{ buffer: Buffer, text: string }} 返回一个对象，包含图片 Buffer 和验证码文本
   */
  static createPng({ width = 100, height = 40, length = 4 } = {}) {
    // 随机生成验证码文本，这里只生成数字验证码，长度由参数决定
    const code = Math.random()
      .toString() // 将随机数转换为字符串
      .slice(2, 2 + length); // 截取字符串的第2到第(2+length)位作为验证码

    // 创建 captchapng 实例，传入宽度、高度和验证码数值
    const p = new captchapng(width, height, parseInt(code, 10));

    let buffer;
    // 生成验证码图片的 Buffer 数据
    try {
      buffer = p.getBuffer();
    } catch (error) {
      console.error('Error generating buffer:', error);
    }

    // 返回包含图片 Buffer 和验证码文本的对象
    return { buffer, text: code };
  }

  /**
   * 清除 Session 中存储的验证码信息
   * @param {Object} session Express 的 session 对象
   */
  static clear(session) {
    // 使用 delete 关键字移除 session 对象中的 captcha 属性
    delete session.captcha;
  }
}

module.exports = CaptchaService;
