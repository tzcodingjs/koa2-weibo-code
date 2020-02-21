/**
 * @description sequelize 配置
 */

const Sequelize = require('supertest')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

// 测试环境关闭sequelize打印原生sql语句
if(isTest){
    conf.logging = () => {}
}

//  线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000
    }
}


const seq = new Sequelize(database, user, password, conf)

module.exports = seq