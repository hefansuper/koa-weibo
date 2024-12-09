/**
 * @description user API 路由
 * @author STEPHEN
 */

const router = require('koa-router')()

const { register, isExist } = require('../../controller/user')

 
// 构建user的前缀
router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
    // post参数从request.body中获取
    const { userName, password, gender } = ctx.request.body
    ctx.body = register({ userName, password, gender })
})


// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = {
        userName,
        password,
    }
})

// 判断用户名是否存在
router.post('/isExist', async (ctx, next) => { 
    const { userName, password } = ctx.request.body
    ctx.body = await isExist(userName)
})


module.exports = router
