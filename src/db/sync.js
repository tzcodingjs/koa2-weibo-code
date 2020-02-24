/**
 * @description seq同步数据库
 */

const seq = require('./seq')

require('./model/index')

seq.sync({force:true}).then(() => {
    console.log('sync ok')
    process.exit()
})