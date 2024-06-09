const express = require('express')
const router = express.Router()




router.get('/all',async(req,res,next)=>{
    const data = await req.prisma.tag.findMany()
    res.send(data)
})
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

module.exports = router