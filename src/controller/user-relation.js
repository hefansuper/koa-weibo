/*
 * @Author: stephenHe
 * @Date: 2024-12-28 14:58:23
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-30 22:51:00
 * @Description: 用户关系的controller
 * @FilePath: /weibo-koa/src/controller/user-relation.js
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  getUsersByFollower,
  getFollowersByUser,
} = require('../services/user-relation')

/**
 * 查询某个人的粉丝，也就是查询用户关系表中哪一行的followerId是当前传入的userId
 * @param {number} userId
 */
const getFans = async (userId) => {
  const { count, userList } = await getUsersByFollower(userId)

  // 返回
  return new SuccessModel({
    count,
    fansList: userList,
  })
}

/**
 * 查询某个人的关注列表，也就是查询用户关系表中哪一行的userId是当前传入的userId
 * @param {number} userId
 */
const getFollowers = async (userId) => {
  const { count, userList } = await getFollowersByUser(userId)

  // 返回
  return new SuccessModel({
    count,
    followersList: userList,
  })
}

module.exports = {
  getFans,
  getFollowers,
}
