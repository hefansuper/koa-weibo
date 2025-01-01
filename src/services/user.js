/*
 * @Author: stephenHe
 * @Date: 2024-12-04 23:04:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-01 16:52:00
 * @Description: user service 数据处理+格式化
 * @FilePath: /weibo-koa/src/services/user.js
 */

const User = require('../db/model/User')
const { formatUser } = require('./_format')
const { addFollower } = require('./blog-profile')

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
    attributes: [
      'id',
      'userName',
      'nickName',
      'gender',
      'picture',
      'city',
      'password',
    ],
    where: whereOpt,
  })

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

  // 自己关注自己（为了方便首页获取数据）
  addFollower(data.id, data.id)

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

  // result 删除的行数
  return result > 0
}

// 更新当前userName,password的一些信息
// 第一部分是覆盖的值，第二部分是索引的条件
const updateUser = async (
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) => {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }

  // 拼接查询条件
  const whereData = {
    userName,
  }
  if (password) {
    whereData.password = password
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData,
  })
  // 返回的是影响的行数
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
}
