/*
 * @Author: stephenHe
 * @Date: 2024-12-25 21:01:06
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-30 21:24:39
 * @Description: 个人博客的controller
 * @FilePath: /weibo-koa/src/controller/blog-profile.js
 */
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require('../model/ErrorInfo')
const {
  addFollower,
  deleteFollower,
  getBlogListByUser,
} = require('../services/blog-profile')

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

/**
 *  关注
 * @param {number} myUserId  当前人的userId
 * @param {number} followId 关注人的userId
 */
const follow = async (myUserId, followId) => {
  try {
    const result = await addFollower(myUserId, followId)
    return new SuccessModel(result)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 *  取消关注
 * @param {number} myUserId  当前人的userId
 * @param {number} followId 取消关注人的userId
 */
const unFollow = async (myUserId, unFollowId) => {
  const result = await deleteFollower(myUserId, unFollowId)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = { getProfileBlogList, follow, unFollow }
