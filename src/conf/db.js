/*
 * @Author: stephenHe
 * @Date: 2024-12-04 20:12:29
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-06 15:09:33
 * @Description:存储配置
 * @FilePath: /weibo-koa/src/conf/db.js
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'hf123456',
  port: '3306',
  database: 'koa2_weibo_db',
}

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1',
  }

  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: 'localhost',
    user: 'root',
    password: 'hf123456',
    port: '3306',
    database: 'koa2_weibo_db',
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
}
