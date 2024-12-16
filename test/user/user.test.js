/*
 * @Author: stephenHe
 * @Date: 2024-12-16 21:04:08
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-16 22:04:14
 * @Description: 用户部分的单元测试
 * @FilePath: /weibo-koa/test/user/user.test.js
 */

const server = require('../server')

// 构造模拟的人
const userName = `u_${Date.now()}`
// const userName = 444
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1,
}

// 存储 cookie
let COOKIE = ''

describe('user测试', () => {
  // 1: 注册新人，会成功
  test('注册一个用户，应该成功', async () => {
    const response = await server.post('/api/user/register').send(testUser)
    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)
  })

  // 2: 重复注册，会失败
  // 3: 查询存在的用户
  // 3: 查询不存在的用户
  // 4: json schema 检测
  // 5: 正常的登录，应该成功
  // 6: 不正常的登录，应该失败
  // 7：删除用户，应该成功
  // 8：再次查询用户，应该不存在
})
