const express = require('express')
// 引入路由
const habitRouter = require('./routes/habit')
const tagRouter = require('./routes/tag.js')
const prisma = require('./db.js')
const app = express()
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
app.use('/habit',habitRouter)
app.use('/tag',tagRouter)



app.listen(3001,()=>{
    console.log('http://localhost:3001')
})