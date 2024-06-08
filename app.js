const express = require('express')
const habitRouter = require('./routes/habit')
const tagRouter = require('./routes/tag.js')
const app = express()

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