/*
 * @Author: stephenHe
 * @Date: 2024-12-24 14:16:24
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-24 14:23:59
 * @Description: 博客首页的api
 * @FilePath: /weibo-koa/src/routes/api/blog-home.js
 */

const router = require('koa-router')()

const { create } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')

// 构建user的前缀
router.prefix('/api/blog')

// 创建博客
router.post('/create', loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo

  ctx.body = await create({ content, image, userId })
})

module.exports = router
