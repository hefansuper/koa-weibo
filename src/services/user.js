/**
 * @description user service 数据处理+格式化
 * @author STEPHEN
 */


const User = require('../db/model/User')

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

    // 没有查询到就是null
    // 查询到了就需要取值dataValues

    console.log(result)
    if (!result) {
        return null
    }
    return result.dataValues
}


module.exports = {
    getUserInfo,
}
