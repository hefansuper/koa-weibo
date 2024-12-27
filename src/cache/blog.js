/*
 * @Author: stephenHe
 * @Date: 2024-12-27 17:32:39
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-27 17:39:49
 * @Description: 博客的缓存文件
 * @FilePath: /weibo-koa/src/cache/blog.js
 */

/**
 * 从redis中获取对应的博客广场信息，有就获取，没有就设置。
 * @param {number} pageIndex
 * @param {number} pageSize
 */
const getSquareCacheList = async (pageIndex, pageSize) => {
  // 0：redis中对应的key的值是：weibo:square:pageIndex_pageSize
  // 1：有对应的key就从redis中返回
  // 2：没有对应的key就从数组库中读取并返回，同时设置redis中的key。
}

module.exports = {
  getSquareCacheList,
}
