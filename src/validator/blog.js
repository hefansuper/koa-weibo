/*
 * @Author: stephenHe
 * @Date: 2024-12-24 16:23:06
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-24 16:23:14
 * @Description: blog validator
 * @FilePath: /weibo-koa/src/validator/blog.js
 */
const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255,
    },
  },
}

/**
 * 校验微博数据格式
 * @param {Object} data 微博数据
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate
