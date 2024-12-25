/*
 * @Author: stephenHe
 * @Date: 2024-12-25 21:01:06
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-25 22:05:19
 * @Description: 个人博客的controller
 * @FilePath: /weibo-koa/src/controller/blog-profile.js
 */
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getBlogListByUser } = require('../services/blog-profile')

/**
 * 获取个人微博主页的博客信息，根据userName
 * @param {*} userName
 * @param {*} pageIndex
 */
const getProfileBlogList = async (userName, pageIndex = 0) => {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE,
  })

  const blogList = result.blogList

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
  })
}

module.exports = { getProfileBlogList }
