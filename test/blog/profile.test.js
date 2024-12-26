/*
 * @Author: stephenHe
 * @Date: 2024-12-26 11:07:03
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-26 11:14:10
 * @Description: 个人中心的单元测试
 * @FilePath: /weibo-koa/test/blog/profile.test.js
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

describe('blog-profile测试', () => {
  test('获取加载更多的第一条，应该成功', async () => {
    // 开始测试
    const res = await server
      .get('/api/profile/loadMore/qqqqq/1')
      .set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)

    // 测试返回值里面有对应的属性
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
  })
})
