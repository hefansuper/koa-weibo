/**
 * @description user controller 业务逻辑的处理+返回格式
 * 建议是每个api对应的写一个controller的函数，这样的好处是分层全部都规矩化，流程化。
 * @author STEPHEN
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo} = require('../model/ErrorInfo')


// 登录
const login = () => {}

// 注册
/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男，2 女，3 保密）
 */
const register = ({ userName, password, gender }) => {
    console.log(userName, password, gender)
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

module.exports = {
    login,
    register,
    isExist,
}