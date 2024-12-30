const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 支持分页！！！！
 * 根据用户名分页查询查询博客列表，并且查询出人的信息（头像/昵称等等）。
 * @param {*} userName 用户名
 * @param {*} pageIndex 第几页
 * @param {*} pageSize 一页多少条
 */
const getBlogListByUser = async ({
  userName,
  pageIndex = 0,
  pageSize = 10,
}) => {
  // 1：分页查询
  // 2：连表查user的信息。

  // 拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  // result.count 总条数
  // result.rows 当前查询结果，数组
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页的数据条数
    offset: pageSize * pageIndex, // 跳过的条数
    order: [
      ['createdAt', 'desc'], // 按创建时间倒序排列
    ],
    // 连表查询
    include: [
      {
        model: User, // 查询的表的model
        attributes: ['userName', 'nickName', 'picture'], // 需要查询出的key名
        where: userWhereOpts, // 查询条件
      },
    ],
  })

  // 3：格式化信息。
  let blogList = result.rows.map((row) => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList,
  }
}

/**
 *  关注
 * @param {number} myUserId  当前人的userId
 * @param {number} followId 关注人的userId
 */
const addFollower = async (myUserId, followId) => {
  const result = await UserRelation.create({
    userId: myUserId,
    followerId: followId,
  })

  return result.dataValues
}

module.exports = {
  getBlogListByUser,
  addFollower,
}
