/*
 * @Author: stephenHe
 * @Date: 2024-12-22 18:50:05
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-23 15:42:16
 * @Description: utils工具api
 * @FilePath: /weibo-koa/src/controller/utils.js
 */
const fse = require('fs-extra')
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')

// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 */
const saveFile = async ({ name, type, size, filePath }) => {
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移动文件
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
  await fse.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName,
  })
}

module.exports = {
  saveFile,
}
