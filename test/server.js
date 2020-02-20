/**
 * @description jest 测试http接口
 */

 const request = require('supertest')
 const server = require('../src/app').callback()

 module.exports = request(server)