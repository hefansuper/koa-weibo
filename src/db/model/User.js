/**
 * @description 用户数据模型
 * @author STEPHEN
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// 定义users表的对应key的信息。
// sequelize会自动将对应的表名转换为复数。
// 表的名字是小写。
const User = seq.define('user', {
  // 通过对象的形式来定义表的信息。
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1 男性，2 女性，3 保密）',
  },
  picture: {
    type: STRING,
    comment: '头像，图片地址',
  },
  city: {
    type: STRING,
    comment: '城市',
  },
})

module.exports = User
