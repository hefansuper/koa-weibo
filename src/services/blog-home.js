/*
 * @Author: stephenHe
 * @Date: 2024-12-24 14:30:35
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-01 16:45:56
 * @Description: blog-home的services
 * @FilePath: /weibo-koa/src/services/blog-home.js
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

const createBlog = async ({ content, image, userId }) => {
  // 插入到数据库中。
  const result = await Blog.create({
    content,
    image,
    userId,
  })

  return result.dataValues
}

/**
 * 查询首页的微博信息，自己的微博+关注人的微博
 * 在当前的场景中，只需要获取关注人的就行，因为已经将自己关注了自己，方便获取数据。
 * @param {*} userId
 * @param {*} pageIndex
 * @param {*} pageSize
 * @returns
 */
const getFollowersBlogList = async ({
  userId,
  pageIndex = 0,
  pageSize = 10,
}) => {
  // 需要注意的include中的where，会将整个Blog过滤掉。

  // 1：查询Blog中的所有的微博，并分页
  // 2：include的User表，每个微博对应出原来的个人信息
  // 3：继续include到UserRelation表，并且听过userId进行筛选整个blog。
  // 这样就能得到所有关注人的微博，这个where是作用到所有的blog上。
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId },
      },
    ],
  })

  console.log(result, 'getFollowersBlogList')

  // 格式化数据
  let blogList = result.rows.map((row) => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList,
  }
}

module.exports = {
  createBlog,
  getFollowersBlogList,
}
