const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')

const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if(isProd){
  onerrorConf = {
    redirect:'/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// ejs模板，自动找到对应目录
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session配置
app.keys= ['UIsdf_7878#$']
app.use(session({
  key:'weibo.sid', //cookie name
  prefix:'weibo:sess:', // redis key 前缀
  cookie:{
    path:'/',
    httpOnly:true, // 只允许服务端取改cookie，客户端不可以
    maxAge:24 * 60 * 60 * 1000 // ms
  },
  store:redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
