/*
 * @Author: stephenHe
 * @Date: 2024-12-24 17:35:53
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-24 17:37:20
 * @Description: 测试blog model 也就是写的user表的相关逻辑。
 * 如果寿面的更改改了user这个model，这个地方可能就会报错
 * @FilePath: /weibo-koa/test/blog/model.test.js
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性，符合预期', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库中
  const user = Blog.build({
    userId: 'zhangsan',
    content: 'p123123',
    image: '/xxx.png',
  })

  // 验证各个属性
  expect(user.userId).toBe('zhangsan')
  expect(user.content).toBe('p123123')
  expect(user.image).toBe('/xxx.png')
})
