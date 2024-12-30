/*
 * @Author: stephenHe
 * @Date: 2024-12-28 14:58:23
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-30 22:51:48
 * @Description:
 * @FilePath: /weibo-koa/src/services/user-relation.js
 */

const { formatUser } = require('./_format')
const { UserRelation, User } = require('../db/model/index')

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * 查询用户关系表中哪一行的followerId是当前传入的userId,对应的userid就是followerid的粉丝
 * a关注了b，a就是关注人，b就是被关注人
 * @param {number} followerId 被关注人的 id
 */
const getUsersByFollower = async (followerId) => {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['createdAt', 'desc'], // 按创建时间倒序排列
    ],
    where: {
      followerId,
    },
    // 连表查询
    include: [
      {
        model: User, // 查询的表的model
        // 加载关注人的信息（即 `userId` 外键）
        // 查询当前的人的粉丝，就是被关注的人是传入的人，在链表查询userId的信息
        as: 'user',
        attributes: ['id', 'userName', 'nickName', 'picture'], // 需要查询出的key名
      },
    ],
  })

  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map((row) => row.dataValues)
  userList = userList.map((item) => {
    return {
      ...item,
      ...item.user.dataValues,
    }
  })
  userList = formatUser(userList)

  return {
    count: result.count,
    userList,
  }
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
const getFollowersByUser = async (userId) => {
  // 1: 先通过userId查UserRelation表
  // 2：根据第一步中的followerId，连表查followerId对应的用户信息。
  const result = await UserRelation.findAndCountAll({
    order: [
      ['createdAt', 'desc'], // 按创建时间倒序排列
    ],
    where: {
      userId,
    },
    // 连表查询
    include: [
      {
        model: User, // 查询的表的model
        // 加载关注人的信息（即 `followerId` 外键）
        // 查询当前的人的关注人，就是关注的人是传入的人，在链表查询followerId的信息
        as: 'follower',
        attributes: ['id', 'userName', 'nickName', 'picture'], // 需要查询出的key名
      },
    ],
  })

  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map((row) => row.dataValues)
  userList = userList.map((item) => {
    return {
      ...item,
      ...item.follower.dataValues,
    }
  })
  userList = formatUser(userList)

  return {
    count: result.count,
    userList,
  }
}

module.exports = {
  getUsersByFollower,
  getFollowersByUser,
}
