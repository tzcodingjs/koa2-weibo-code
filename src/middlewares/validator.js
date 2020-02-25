/**
 * @description json schema 验证中间件
 */

 const { ErrorModel } = require('../model/ResModel')
 const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

 /**
  * 
  * @param {function} validateFn 验证函数 
  */
 function genValidator(validateFn){
     async function validator (ctx, next) {
         const data = ctx.request.body
         const error = validateFn(data)
         if(error){
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
         }
        //  执行一下个中间件
        await next()
     }
     return validator
 }

 module.exports = {
    genValidator
 }