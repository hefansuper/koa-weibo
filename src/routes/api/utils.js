/*
 * @Author: stephenHe
 * @Date: 2024-12-22 17:45:58
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-22 18:48:42
 * @Description: 工具api
 * @FilePath: /weibo-koa/src/routes/api/utils.js
 */
const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginChecks')

// 构建utils的前缀
router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file

  // if (files && files.image) {
  //   const file = files.image // 获取上传的图片

  //   // 上传成功后返回文件的路径
  //   ctx.body = {
  //     message: 'Image uploaded successfully',
  //     file: file.path, // 返回文件的存储路径
  //   }
  // }

  ctx.body = {}
})

module.exports = router
