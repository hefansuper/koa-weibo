/*
 * @Author: stephenHe
 * @Date: 2024-12-28 11:03:06
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-28 13:00:17
 * @Description: 用户关系表的数据模型
 * @FilePath: /weibo-koa/src/db/model/UserRelation.js
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

// 定义UserRelation表的对应key的信息。
// sequelize会自动将对应的表名转换为复数。
// 表的名字是小写。 生成的表是UserRelations
const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID,当前人的用户ID',
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注人的用户ID，每关注一个人就会生成这个表中的一条记录',
  },
})

module.exports = UserRelation
