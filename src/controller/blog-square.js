const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取微博广场的博客信息，缓存在cache层，这边仅仅是调用和包装返回给前端的Model
 * @param {*} pageIndex
 * @returns
 */
const getSquareBlogList = async (pageIndex = 0) => {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count,
  })
}

module.exports = {
  getSquareBlogList,
}
