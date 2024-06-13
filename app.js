const express = require('express')
// 引入路由
const apiRouter = require('./routes/api/index.js')
const prisma = require('./db.js')
const app = express()


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

app.get('/',(req,res,next)=>{
    res.send('项目启动成功，使用后端响应api')
})
app.use('/api',apiRouter)

app.use((err,req,res,next)=>{
    res.send(err)
})

app.listen(3001,()=>{
    console.log('http://localhost:3001')
})