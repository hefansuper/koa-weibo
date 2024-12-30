/*
 * @Author: stephenHe
 * @Date: 2024-12-28 14:58:23
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-28 15:29:18
 * @Description: 用户关系的controller
 * @FilePath: /weibo-koa/src/controller/user-relation.js
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUsersByFollower } = require('../services/user-relation')

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

module.exports = {
  getFans,
}