/**
 * @description 加密方法
 * @author STEPHEN
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
  // 创建一个 MD5 哈希对象
  const md5 = crypto.createHash('md5')
  // 计算哈希值并以十六进制格式输出
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * 将内容和SECRET_KEY一起拼接在一起，然后进行md5加密
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto
