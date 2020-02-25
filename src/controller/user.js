/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerFailInfo,
    loginFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户是否存在
 * @param {string} userName 用户名 
 */
async function isExist(userName) {
    // 业务逻辑处理（无）
    // 调用services层获取数据
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        // 打印一下错误信息与错误栈
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password){
     // 获取用户信息
     const userInfo = await getUserInfo(userName, doCrypto(password))
     if (!userInfo) {
         // 登录失败
         return new ErrorModel(loginFailInfo)
     }
 
     // 登录成功
     if (ctx.session.userInfo == null) {
         ctx.session.userInfo = userInfo
     }
     return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login
}