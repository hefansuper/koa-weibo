/*
 * @Author: stephenHe
 * @Date: 2024-12-04 23:04:19
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-26 10:51:23
 * @Description: 入口文件
 * @FilePath: /weibo-koa/src/app.js
 */
const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogProfileAPIRouter = require('./routes/api/blog-profile')
const utilsAPIRouter = require('./routes/api/utils')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error',
  }
}
// 错误处理 通过koa-onerror中间件
onerror(app, onerrorConf)

// middlewares 中间件的集合。
// 解析post的入参及其数据。仅仅用来解析application/json
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
// json中间件 -传参直接是json格式
app.use(json())
// 标准的日志处理 打印日志
app.use(logger())

// 静态中间件。
app.use(koaStatic(__dirname + '/public'))
// 生成的图片
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

// 模板引擎
app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
)

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(
  session({
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 单位 ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
)

// routes
// allowedMethods中间件   会在路由注册完成后，自动注册一个中间件，用来处理非定义的请求方式的请求然后返回对应的4xx错误。

// 接口的路由 api层
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(), blogProfileAPIRouter.allowedMethods())

// 页面的路由 view层
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())

app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最后面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
