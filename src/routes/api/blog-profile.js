/*
 * @Author: stephenHe
 * @Date: 2024-12-26 10:43:47
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-26 10:48:12
 * @Description:blog-profile 的 api
 * @FilePath: /weibo-koa/src/routes/api/blog-profile.js
 */

const router = require('koa-router')()
const { getBlogListStr } = require('../../utils/blog')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')

// 构建user的前缀
router.prefix('/api/profile')

// 记载更多，返回了dom，前端直接渲染。ejs的能力。
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  const result = await getProfileBlogList(userName, pageIndex)

  // 渲染为 html 字符串---ejs
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
