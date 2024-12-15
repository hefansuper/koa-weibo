/**
 * @description jest server 文件
 */

// 通过supertest的方式来测试接口，需要注意的是引入app文件的时候是用的callback方法

const supertest = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
