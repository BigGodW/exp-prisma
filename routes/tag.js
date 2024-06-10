const express = require('express')
const router = express.Router()



// 获取所有tag
router.get('/all',async(req,res,next)=>{
    const data = await req.prisma.tag.findMany()
    res.send(data)
})

// 添加tag
router.post('/',async(req,res,next)=>{
    console.log(req.body)
    const data = req.body
    if(data.habitId) data.habitId = Number(data.habitId)
    const result = await req.prisma.tag.create({
        data
    })
    res.send(result)
})
// 指定habit的tags
router.get('/habit/:id',async(req,res,next)=>{
    const id = Number(req.params.id)
    const result = await req.prisma.tag.findMany({
        where:{
            habitId:id
        }
    })
    res.send(result)
})
// 获取指定tag
router.get('/:id',async(req,res,next)=>{
    const id = Number(req.params.id)
    const data = await req.prisma.tag.findUnique({
        where:{
            id
        }
    })
    if(data){
        res.send(data)
    }else{
        res.send('无相关数据')
    }
})
<<<<<<< HEAD
=======
router.post('/',async(req,res,next)=>{
    console.log(req.body)
    const title = req.body.title
    if(title){
        const data = await req.prisma.tag.create({
            data:{
                title
            }
        })
        res.send(data)
    }
})
>>>>>>> 4bf39797299df9dfcdd334c038383789bfd59163

module.exports = router