/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

 /**
  * 
  * @param {Object} obj 用户对象 
  */
 function _formatUserPicture(obj){
    if(obj.picture == null){
        obj.picture == 'xxx'
    }
    return obj
 }

 /**
  * 
  * @param {Array|Object} list 用户列表或者单个用户对象
  */
 function formatUser(list){
    if(list == null){
        return list
    }

    // 判断是否为数组
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
 }

 module.exports = {
    formatUser
 }