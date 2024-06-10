const express = require('express')
const habitRouter = require('./routes/habit')
const tagRouter = require('./routes/tag.js')
const app = express()
const prisma = require('./db.js')

app.use((req,res,next)=>{
    req.prisma = prisma
    next()
})

app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req,res,next)=>{
    res.send('hello express')
})
app.use('/habit',habitRouter)
app.use('/tag',tagRouter)



app.listen(3001,()=>{
    console.log('http://localhost:3001')
})