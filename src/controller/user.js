/*
 * @Author: stephenHe
 * @Date: 2024-12-04 23:04:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-30 17:29:19
 * @Description: user controller 业务逻辑的处理+返回格式
 * 建议是每个api对应的写一个controller的函数，这样的好处是分层全部都规矩化，流程化。
 * @FilePath: /weibo-koa/src/controller/user.js
 */

const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  loginFailInfo,
  registerFailInfo,
  deleteUserFailInfo,
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/crypt')

/**
 * 登录
 * @param {Object} ctx koa2
 * @param {string} userName
 * @param {string} password
 */
const login = async (ctx, userName, password) => {
  // 1: 姓名+密码 查库，没有就报错。
  const userInfo = await getUserInfo(userName, doCrypto(password))

  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }

  // 2：如果有, 就将用户的信息存放在session中
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男，2 女，3 保密）
 */
const register = async ({ userName, password, gender }) => {
  const userInfo = await getUserInfo(userName)

  // 1: 已经存在，就return
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }

  // 2：不存在就插入数据到users表中.
  // 调用services中的方法

  try {
    await createUser({ userName, password: doCrypto(password), gender })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}
/**
 *
 * @param {string} userName 用户名
 */
const isExist = async (userName) => {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 删除用户
 * @param {*} userName
 */
const deleteCurUser = async (userName) => {
  const result = await deleteUser(userName)

  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

/**
 *  更新信息
 */
const changeInfo = async (ctx, { nickName, city, picture }) => {
  const { userName } = ctx.session.userInfo

  // 更新当前userName的一些信息
  const res = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture,
    },
    { userName }
  )

  if (res) {
    // 执行成功 同步更新session
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture,
    })

    // 返回
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改登录密码
 * @param {string} userName
 * @param {string} password
 * @param {string} newPassword
 */
const changePassword = async (userName, password, newPassword) => {
  // 更新当前userName的一些信息
  const res = await updateUser(
    {
      newPassword: doCrypto(newPassword),
    },
    {
      userName,
      password: doCrypto(password),
    }
  )

  if (res) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录，就是删除session，同时中间会同步删除redis。
 * @param {*} ctx koa的xtx
 */
const logout = async (ctx) => {
  delete ctx.session.userInfo

  return new SuccessModel()
}

module.exports = {
  login,
  register,
  isExist,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
}
