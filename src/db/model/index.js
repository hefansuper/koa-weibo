/*
 * @Author: stephenHe
 * @Date: 2024-12-04 23:04:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-23 17:15:50
 * @Description:数据模型入口文件
 * @FilePath: /weibo-koa/src/db/model/index.js
 */

const User = require('./User')
const Blog = require('./Blog')

// Blog属于User，对应的外键是userId
// Blog表关联上user表，每次查询blog的时候能知道这个微博是谁发的。
// 外键的值是userId
Blog.belongsTo(User, {
  foreignKey: 'userId',
})

module.exports = {
  User,
  Blog,
}
