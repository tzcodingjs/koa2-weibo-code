/**
 * @description seq同步数据库
 */

const seq = require('./seq')

seq.sync({force:true}).then(() => {
    console.log('sync ok')
    process.exit()
})