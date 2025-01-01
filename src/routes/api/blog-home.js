/*
 * @Author: stephenHe
 * @Date: 2024-12-24 14:16:24
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-01 17:11:20
 * @Description: 博客首页的api
 * @FilePath: /weibo-koa/src/routes/api/blog-home.js
 */

const router = require('koa-router')()

const blogValidate = require('../../validator/blog')
const { create } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListStr } = require('../../utils/blog')

// 构建user的前缀
router.prefix('/api/blog')

// 创建博客
router.post(
  '/create',
  loginCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo

    ctx.body = await create({ content, image, userId })
  }
)

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex) // 转换 number 类型
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
