/*
 * @Author: stephenHe
 * @Date: 2024-12-24 10:31:21
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-25 17:25:00
 * @Description: blog页面的的路由，render出index.ejs
 * @FilePath: /weibo-koa/src/routes/view/blog.js
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 定义login路由
router.get('/', loginRedirect, async (ctx, next) => {
  // 这个render就是render的view/index.ejs
  await ctx.render('index', {})
})

// 不带用户名的时候就是自己的主页，获取session并调到带用户名的页面。
// router.get('/profile', loginRedirect, async (ctx, next) => {
//   const { userName } = ctx.session.userInfo
//   ctx.redirect(`/profile/${userName}`)
// })

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  await ctx.render(`profile`, {})
})

module.exports = router
