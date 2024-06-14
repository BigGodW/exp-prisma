const express = require('express')
// 引入路由
const apiRouter = require('./routes/api/index.js')
const prisma = require('./db.js')
const app = express()


// vue项目刷新页面问题
const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static('public'))

// 前段接口代理
const {createProxyMiddleware} = require('http-proxy-middleware')
app.use(
    '/wubug',createProxyMiddleware({
        target:"https://text-vercel.wubug.cn/api",
        pathRewrite:{'^/wubug':''}
    })
)



app.use((req,res,next)=>{
    req.prisma = prisma
    next()
})

app.use(express.json())
app.use(express.urlencoded())
// 添加数据库引用
app.use((req,res,next)=>{
    req.prisma = prisma
    next()
})


app.use('/api',apiRouter)

app.use((err,req,res,next)=>{
    res.send(err)
})






app.listen(3001,()=>{
    console.log('http://localhost:3001')
})