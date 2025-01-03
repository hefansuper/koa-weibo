/*
 * @Author: stephenHe
 * @Date: 2024-12-16 21:04:08
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-23 15:50:53
 * @Description: 用户部分的单元测试
 * @FilePath: /weibo-koa/test/user/user.test.js
 */

const server = require('../server')

// 构造模拟的人
const userName = `u_${Date.now()}`
const userNameNew = `u_${Date.now()}111`
// const userName = 444
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1,
}
const testUserNew = {
  userName: userNameNew,
  password,
  nickName: userNameNew,
  gender: 1,
}

// 存储 cookie
let COOKIE = ''

describe('user测试', () => {
  // 1: register--注册新人，会成功
  test('注册一个用户，应该成功', async () => {
    const response = await server.post('/api/user/register').send(testUser)
    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)
  })

  // 2: register--重复注册，会失败
  test('重复注册，会失败', async () => {
    const response = await server.post('/api/user/register').send(testUser)
    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(10001)
  })

  // 3: isExist--查询存在的用户
  test('查询存在的用户', async () => {
    const response = await server.post('/api/user/isExist').send(testUser)
    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)
  })

  // 4: isExist--查询不存在的用户
  test('查询存在的用户', async () => {
    const response = await server.post('/api/user/isExist').send(testUserNew)
    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(10003)
  })

  // 5: register--json schema 检测
  test('json schema 检测，非法的格式，注册应该失败', async () => {
    const response = await server.post('/api/user/register').send({
      userName: '123', // 用户名不是字母（或下划线）开头
      password: 'a', // 最小长度不是 3
      // nickName: ''
      gender: 'mail', // 不是数字
    })
    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(10009)
  })

  // 6: login--正常的登录，应该成功
  test('正常的登录，应该成功', async () => {
    const response = await server.post('/api/user/login').send(testUser)
    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)

    // 获取 cookie,为了让下面的删除可以用
    COOKIE = response.headers['set-cookie'].join(';')
  })

  // 7: login--不正常的登录，应该失败
  test('不正常的登录，应该失败', async () => {
    const response = await server.post('/api/user/login').send(testUserNew)

    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(10004)
  })

  // 8： 更新个人信息
  test('更新个人信息，应该成功', async () => {
    const response = await server
      .patch('/api/user/changeInfo')
      .send({
        nickName: '测试昵称',
        city: '测试城市',
        picture: '/test.png',
      })
      .set('cookie', COOKIE)

    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)
  })

  // 9： 修改密码
  test('修改密码，应该成功', async () => {
    const response = await server
      .patch('/api/user/changePassword')
      .send({
        password,
        newPassword: `p_${Date.now()}`,
      })
      .set('cookie', COOKIE)

    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)
  })

  // 10：delete --删除登录的用户，自己删除自己，应该成功
  test('删除前面登录的用户，应该成功', async () => {
    // 需要注意这个set('cookie', COOKIE)，因为需要登录态
    const response = await server.post('/api/user/delete').set('cookie', COOKIE)

    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)
  })

  // 11：退出登录
  test('退出登录，应该成功', async () => {
    const response = await server.post('/api/user/logout').set('cookie', COOKIE)

    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(0)
  })

  // 12：再次查询用户，应该不存在
  test('再次查询用户，应该不存在', async () => {
    const response = await server.post('/api/user/isExist').send(testUser)

    expect(response.status).toBe(200)
    expect(response.body.errno).toBe(10003)
  })
})
