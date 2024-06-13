const express = require('express')
const router = express.Router()


// 获取所有tag
router.get('/all',async(req,res,next)=>{
    const tags = await req.prisma.tag.findMany()
    res.send({tags})
})
// 获取指定habit的tags
router.get('/habit/:habitId',async(req,res,next)=>{
    const id = Number(req.params.habitId)
    const tags = await req.prisma.tag.findMany({
        where:{
            habitId:id
        }
    })
    res.send({tags})
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

// 添加tag
router.post('/:habitId',async(req,res,next)=>{
    const habitId = Number(req.params.habitId)
    const data = req.body
    data.habitId = habitId
    const result = await req.prisma.tag.create({
        data
    })
    res.send(result)
})


// 删除指定tag -- id
router.delete('/:id',async(req,res,next)=>{
    const id = Number(req.params.id)
    const tag = await req.prisma.tag.findUnique({
        where:{id}
    })
    if(tag){
        const result = await req.prisma.tag.delete({
            where:{
                id
            }
        })
        res.send({message:'删除成功',tag:result})
    }else{
    res.send({message:'无该tag或已被删除'})
    }
})

module.exports = router