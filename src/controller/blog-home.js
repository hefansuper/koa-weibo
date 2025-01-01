/*
 * @Author: stephenHe
 * @Date: 2024-12-24 14:25:11
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-31 17:42:36
 * @Description: 博客首页的controller
 * @FilePath: /weibo-koa/src/controller/blog-home.js
 */

const xss = require('xss')

const { PAGE_SIZE } = require('../conf/constant')
const { createBlog, getFollowersBlogList } = require('../services/blog-home')
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
    const blog = await createBlog({ content: xss(content), image, userId })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE,
  })
  const { count, blogList } = result

  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
  })
}

module.exports = {
  create,
  getHomeBlogList,
}
