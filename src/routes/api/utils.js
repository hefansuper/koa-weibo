/*
 * @Author: stephenHe
 * @Date: 2024-12-22 17:45:58
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-22 19:02:45
 * @Description: 工具api
 * @FilePath: /weibo-koa/src/routes/api/utils.js
 */
const router = require('koa-router')()
const koaFrom = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')

// 构建utils的前缀
router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file

  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path,
  })
})

module.exports = router
