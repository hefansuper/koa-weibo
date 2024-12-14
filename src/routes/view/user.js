/**
 * @description user view 路由
 *  这个页面路由的目的就是render出对应的前端ejs页面，可以认为就是一个get请求的ssr接口。
 *  主要的目的就是返回对应的ejs页面。
 * @author stephen
 */

const router = require('koa-router')()


/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}


// 定义login路由
router.get('/login', async (ctx, next) => {
    // 这个render就是render的view/login.ejs
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    // 这个render就是render的view/register.ejs
    await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router