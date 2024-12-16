/*
 * @Author: stephenHe
 * @Date: 2024-12-15 17:21:02
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-16 21:53:09
 * @Description:jest server 文件
 * @FilePath: /weibo-koa/test/server.js
 */

// 通过supertest的方式来测试接口，需要注意的是引入app文件的时候是用的callback方法
const supertest = require('supertest')
const server = require('../src/app').callback()

module.exports = supertest(server)
