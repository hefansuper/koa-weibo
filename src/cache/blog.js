/*
 * @Author: stephenHe
 * @Date: 2024-12-27 17:32:39
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-27 17:53:01
 * @Description: 博客的缓存文件
 * @FilePath: /weibo-koa/src/cache/blog.js
 */

const { get: redisGet, set: redisSet } = require('./_redis')
const { getBlogListByUser } = require('../services/blog-profile')
const { REDIS_SQUARE_KEY_PREFIX } = require('../conf/constant')

/**
 * 从redis中获取对应的博客广场信息，有就获取，没有就设置。
 * @param {number} pageIndex
 * @param {number} pageSize
 */
const getSquareCacheList = async (pageIndex, pageSize) => {
  // 1：redis中对应的key的值是：weibo:square:pageIndex_pageSize
  const key = `${REDIS_SQUARE_KEY_PREFIX}${pageIndex}_${pageSize}`

  // 2：有对应的key就从redis中返回
  const redisResult = await redisGet(key)
  if (redisResult) {
    return redisResult
  }

  // 3：没有对应的key就从数组库中读取并返回，同时设置redis中的key,过期时间为60s
  const dbResult = await getBlogListByUser({ pageIndex, pageSize })
  redisSet(key, dbResult, 60)
  return dbResult
}

module.exports = {
  getSquareCacheList,
}
