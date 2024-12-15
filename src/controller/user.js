/*
 * @Author: stephenHe
 * @Date: 2024-12-04 23:04:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-15 18:56:19
 * @Description: user controller 业务逻辑的处理+返回格式
 * 建议是每个api对应的写一个controller的函数，这样的好处是分层全部都规矩化，流程化。
 * @FilePath: /weibo-koa/src/controller/user.js
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    loginFailInfo,
    deleteUserFailInfo,
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
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


// 注册
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
    const  result =  await deleteUser(userName)
  
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
    login,
    register,
    isExist,
    deleteCurUser,
}
