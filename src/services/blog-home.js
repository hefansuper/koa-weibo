/*
 * @Author: stephenHe
 * @Date: 2024-12-24 14:30:35
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-24 14:35:04
 * @Description: blog-home的services
 * @FilePath: /weibo-koa/src/services/blog-home.js
 */

const Blog = require('../db/model/Blog')

const createBlog = async ({ content, image, userId }) => {
  // 插入到数据库中。
  const result = await Blog.create({
    content,
    image,
    userId,
  })

  return result.dataValues
}

module.exports = {
  createBlog,
}
