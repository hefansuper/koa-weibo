/**
 * @description user API 路由
 * @author STEPHEN
 */

const router = require('koa-router')()
const { register, isExist, login } = require('../../controller/user')
const userValidate = require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')

// 构建user的前缀
router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    // post参数从request.body中获取
    const { userName, password, gender } = ctx.request.body
    ctx.body = register({ userName, password, gender })
})


// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body

    // 调用controller中的方法，需要将ctx也穿进去，已经需要在ctx中写入session信息。
    ctx.body = await login(ctx, userName, password)
})



// 判断用户名是否存在
router.post('/isExist', async (ctx, next) => { 
    const { userName, password } = ctx.request.body
    ctx.body = await isExist(userName)
})


module.exports = router
