const express = require('express')
const router = express.Router()


// 获取最后一个未结束的habit
router.get('/',async (req,res,next)=>{
    const habits = await req.prisma.habit.findFirst({
        where:{
            isEnd:false
        },
        orderBy:{
            id:"desc"
        }
    })

// 获取所有habit
router.get('/all',async(req,res,next)=>{
    const habits = await req.prisma.habit.findMany()
    res.send(habits)
})
router.get('/:id',async(req,res,next)=>{
    const id = Number(req.params.id)
    const habit = await req.prisma.habit.findUnique({
        where:{
            id
        }
    })
    res.send(habit)
})
// 添加habit
router.post('/',async(req,res,next)=>{
    const newHabits = req.body
    const result = await req.prisma.habit.create({
        data:newHabits
    })
    res.send(result)
})
// 修改指定habit
router.post('/:id',async(req,res,next)=>{
    const id = Number(req.params.id)
    const data = req.body
    if(data.isEnd ) data.isEnd = Boolean(data.isEnd)
    const result = await req.prisma.habit.update({
        data,
        where:{
            id
        }
    })
    res.send(result)
})


module.exports = router