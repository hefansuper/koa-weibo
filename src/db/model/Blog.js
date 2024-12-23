/*
 * @Author: stephenHe
 * @Date: 2024-12-23 16:59:37
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-23 17:13:46
 * @Description: blog表的模型定义
 * @FilePath: /weibo-koa/src/db/model/Blog.js
 */

const seq = require('../seq')
const { STRING, DECIMAL, TEXT, INTEGER } = require('../types')

// 定义blogs表的对应key的信息。
// sequelize会自动将对应的表名转换为复数。
// 表的名字是小写。 生成的表是blogs
const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID',
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博的文案',
  },
  image: {
    type: TEXT,
    comment: '微博的图片',
  },
})

module.exports = Blog
