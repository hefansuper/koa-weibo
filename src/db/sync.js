/*
 * @Author: stephenHe
 * @Date: 2024-12-04 20:12:29
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-23 16:58:47
 * @Description: 同步表
 * @FilePath: /weibo-koa/src/db/sync.js
 */
/**
 * @description sequelize 同步数据库
 * @author stephen
 */

const seq = require('./seq')

require('./model/index')

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('auth ok')
  })
  .catch(() => {
    console.log('auth err')
  })

// 执行同步
// force: true 将创建表,如果表已经存在,则将其首先删除---有就删除，没有就新建
// alter: true 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.--仅仅更改变化项。
seq.sync({ alter: true }).then(() => {
  console.log('sync ok')
  process.exit()
})
