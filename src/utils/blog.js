/*
 * @Author: stephenHe
 * @Date: 2024-12-26 10:49:28
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-26 10:49:46
 * @Description: 微博数据相关的工具方法
 * @FilePath: /weibo-koa/src/utils/blog.js
 */
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 的文件内容
const BLOG_LIST_TPL = fs
  .readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))
  .toString()

/**
 * 根据 blogList 渲染出 html 字符串
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply,
  })
}

module.exports = {
  getBlogListStr,
}
