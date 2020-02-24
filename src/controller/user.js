/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo
} = require('../model/ErrorInfo')

/**
 * 用户是否存在
 * @param {string} userName 用户名 
 */
async function isExist(userName){
    // 业务逻辑处理（无）
    // 调用services层获取数据
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new SuccessModel(userInfo)
    }else{
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

module.exports = {
    isExist
}