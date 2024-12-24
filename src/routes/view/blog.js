/*
 * @Author: stephenHe
 * @Date: 2024-12-24 10:31:21
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-24 10:36:54
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

module.exports = router
