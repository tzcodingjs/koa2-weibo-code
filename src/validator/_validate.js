/**
 * @description json schema 效验
 */

 const Ajv = require('ajv')
 const ajv = new Ajv({
    //  allErrors:true //输出所有错误
 })

 /**
  * 
  * @param {Object} schema 
  * @param {Object} data 
  */
 function validate(schema, data = {}){
    const valid = ajv.validate(schema, data)
    if(!valid) {
        return ajv.errors[0]
    }
 }

 module.exports = validate