/*
 * @Author: stephenHe
 * @Date: 2024-12-24 10:31:21
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-30 22:53:14
 * @Description: blog页面的的路由，render出index.ejs
 * @FilePath: /weibo-koa/src/routes/view/blog.js
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')

// 定义login路由
router.get('/', loginRedirect, async (ctx, next) => {
  // 这个render就是render的view/index.ejs
  await ctx.render('index', {})
})

// 不带用户名的时候就是自己的主页，获取session并调到带用户名的页面。
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const { userName: curUserName } = ctx.params

  // 1：查询第一页的博客信息
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 2: 查询当前人的信息。
  let curUserInfo
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  // 查询人是不是当前登录的人
  const isMe = myUserName === curUserName
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  // 3: 获取当前用户的粉丝
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, fansList } = fansResult.data

  console.log(fansList, 'fansList')

  // 4：判断是否关注，
  // 登录的用户是否在当前用户的粉丝列表中。
  const amIFollowed = fansList.some((item) => {
    return item.userId === myUserInfo.id
  })

  // 5：获取当前用户的关注的人列表
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, followersList } = followersResult.data

  // console.log(followersList, 'followersList')

  await ctx.render(`profile`, {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      amIFollowed,
      fansData: {
        count: fansCount,
        list: fansList,
      },
      followersData: {
        count: followersCount,
        list: followersList,
      },
    },
  })
})

// 广场页面的路由
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
  })
})

module.exports = router
