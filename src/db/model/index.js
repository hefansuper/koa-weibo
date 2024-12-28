/*
 * @Author: stephenHe
 * @Date: 2024-12-04 23:04:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-28 13:11:09
 * @Description:数据模型入口文件
 * @FilePath: /weibo-koa/src/db/model/index.js
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// Blog属于User，对应的外键是userId
// Blog表关联上user表，每次查询blog的时候能知道这个微博是谁发的。
// 外键的值是userId
Blog.belongsTo(User, {
  foreignKey: 'userId',
})

// 用户关系表中的userId和followerId都关联到User表中的userId,
// 需要注意的是这个地方的都取了一个别名，否则Sequelize无法区分对应的关联关系。
UserRelation.belongsTo(User, { foreignKey: 'userId', as: 'user' })
UserRelation.belongsTo(User, { foreignKey: 'followerId', as: 'follower' })

module.exports = {
  User,
  Blog,
  UserRelation,
}
