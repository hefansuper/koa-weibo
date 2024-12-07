/**
 * @description user API 路由
 * @author STEPHEN
 */

const router = require('koa-router')()

 
// 构建user的前缀
router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
    // post参数从request.body中获取
    const { userName, password, gender } = ctx.request.body
    ctx.body = {
        userName,
        password,
        gender,
    }
})


// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = {
        userName,
        password,
    }
})


module.exports = router
