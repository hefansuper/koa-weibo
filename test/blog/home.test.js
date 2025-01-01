/*
 * @Author: stephenHe
 * @Date: 2024-12-24 17:40:46
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-01-01 17:17:14
 * @Description: 博客首页部分的单元测试
 * @FilePath: /weibo-koa/test/blog/home.test.js
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')
const { Z_COOKIE } = require('../testUserInfo')

// 存储微博 id
let BLOG_ID = ''

describe('blog-home测试', () => {
  test('创建一条微博，应该成功', async () => {
    // 定义测试内容
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    // 开始测试
    const res = await server
      .post('/api/blog/create')
      .send({
        content,
        image,
      })
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
  })

  // 加载第一页数据
  test('首页，加载第一页数据', async () => {
    const res = await server.get(`/api/blog/loadMore/0`).set('cookie', Z_COOKIE) // 设置 cookie
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
  })
})
