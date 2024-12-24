/*
 * @Author: stephenHe
 * @Date: 2024-12-24 14:25:11
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-24 14:36:50
 * @Description: 博客首页的controller
 * @FilePath: /weibo-koa/src/controller/blog-home.js
 */

const { createBlog } = require('../services/blog-home')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 创建微博
 * @param {*} content 内容
 * @param {*} image 图片
 * @param {*} userId 员工id
 */
const create = async ({ content, image, userId }) => {
  try {
    const blog = await createBlog({ content, image, userId })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create,
}
