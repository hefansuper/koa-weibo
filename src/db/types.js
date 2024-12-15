/**
 * @description 封装 sequelize 数据类型
 * @author stephen
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  // 十进制的值 比较小的且明确的情况下使用，区别于int
  // DECIMAL(10, 2), // 总位数10，小数点后两位 尽量小的存储
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  // 整数  如果需要很大的数的时候 可以使用BIGINT
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
}
