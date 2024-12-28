/*
 * @Author: stephenHe
 * @Date: 2024-12-28 10:00:46
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-28 10:12:47
 * @Description: 微博广场的api
 * @FilePath: /weibo-koa/src/routes/api/blog-square.js
 */

const router = require('koa-router')()
const { getBlogListStr } = require('../../utils/blog')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')

// 构建square的前缀
router.prefix('/api/square')

// 加载更多，返回了dom，前端直接渲染。ejs的能力。
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  const result = await getSquareBlogList(pageIndex)

  console.log(result, 'result')

  // 渲染为 html 字符串---ejs
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
