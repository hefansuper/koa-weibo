/*
 * @Author: stephenHe
 * @Date: 2024-12-25 21:52:55
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-25 21:53:07
 * @Description:时间相关的工具函数
 * @FilePath: /weibo-koa/src/utils/dt.js
 */

const { format } = require('date-fns')

/**
 * 格式化时间，如 09.05 23:02
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  timeFormat,
}
