/*
 * @Author: stephenHe
 * @Date: 2024-12-12 22:24:40
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-22 20:25:25
 * @Description: user API 路由
 * @FilePath: /weibo-koa/src/routes/api/user.js
 */

const router = require('koa-router')()
const {
  register,
  isExist,
  login,
  changeInfo,
  deleteCurUser,
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')

// 构建user的前缀
router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  // post参数从request.body中获取
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
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

// 删除当前登录的账号，并且仅仅是在进行单元测试的时候
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.request.body
    ctx.body = await deleteCurUser(userName)
  }
})

// 更新个人信息 昵称+城市+头像
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  }
)

module.exports = router
