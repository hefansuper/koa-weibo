/*
 * @Author: stephenHe
 * @Date: 2024-12-28 10:28:45
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-28 10:29:57
 * @Description: 微博广场的测试用例
 * @FilePath: /weibo-koa/test/blog/square.test.js
 */
const server = require('../server')
const { COOKIE } = require('../testUserInfo')

describe('blog-square测试', () => {
  // 加载第一页数据
  test('广场，加载第一页数据，应该成功', async () => {
    const res = await server.get(`/api/square/loadMore/0`).set('cookie', COOKIE) // 设置 cookie
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
  })
})
