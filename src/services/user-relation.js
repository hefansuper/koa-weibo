/*
 * @Author: stephenHe
 * @Date: 2024-12-28 14:58:23
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-28 15:29:52
 * @Description:
 * @FilePath: /weibo-koa/src/services/user-relation.js
 */

const { formatUser } = require('./_format')
const { UserRelation, User } = require('../db/model/index')

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * 查询用户关系表中哪一行的followerId是当前传入的userId
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
        // 加载关注人的信息（即 `followerId` 外键）
        as: 'follower',
        attributes: ['id', 'userName', 'nickName', 'picture'], // 需要查询出的key名
      },
    ],
  })

  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map((row) => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList,
  }
}

module.exports = {
  getUsersByFollower,
}
