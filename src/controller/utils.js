/**
 * @description utils controller
 * 
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
// 是koa fs方法的扩展
const fse = require('fs-extra')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1M 单位是比特
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        // 创建一个目录
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名 
 * @param {string} type 文件类型 
 * @param {number} size 文件体积大小 
 * @param {string} filePath 文件路径 
 */
async function saveFile({ name, type, size, filePath }) {
    if (size > MAX_SIZE) {
        // 删除该文件
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = Date.now() + '.' + name // 加时间戳，防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
    // 移动文件原始位置， 目的地位置
    await fse.move(filePath, distFilePath)

    // 返回信息
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}
