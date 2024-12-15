/*
 * @Author: stephenHe
 * @Date: 2024-12-04 23:04:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-15 18:56:01
 * @Description: user service 数据处理+格式化
 * @FilePath: /weibo-koa/src/services/user.js
 */

const User = require('../db/model/User')
const { formatUser } = require('./_format')

/**
 * 获取用户的信息
 * @param {*} userName
 * @param {*} password
 */
const getUserInfo = async (userName, password) => {
  // 通过userName和password来查询，如果没查询到就返回null，查询到了就返回对应的值。
  const whereOpt = {
    userName,
  }

  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询是通过模型来查询的。
  const result = await User.findOne({
    attributes: ['id', 'nickName', 'nickName', 'gender', 'picture', 'city'],
    where: whereOpt,
  })
  console.log('getUserInfo', result)

  // 没有查询到就是null
  // 查询到了就需要取值dataValues

  if (!result) {
    return null
  }

  return formatUser(result.dataValues)
}

/**
 * 创建用户 service中的命名需要复合当前的业务场景。
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  // 插入到数据库中。
  const result = await User.create({
    userName,
    password,
    gender: 3,
    nickName: nickName ? nickName : userName,
  })

  return result.dataValues
}

/**
 *  通过userName来删除
 * @param {string} userName
 */
const deleteUser = async (userName) => {
  // 返回的是受影响的行数
  const result = await User.destroy({
    where: { userName },
  })
  console.log(result, 'result')

  // result 删除的行数
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}
