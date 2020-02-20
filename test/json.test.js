/**
 * @description json test
 */

 const server = require('./server')

 test('json 接口返回数据格式正确', async () => {
    //  测试路由返回值
     const res = await server.get('/json')
    //  使用对象相等可以用toEqual
     expect(res.body).toEqual({
         title:'koa2 json'
     })
 })