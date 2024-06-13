const express = require('express')
const router = express.Router()

// 获取最后一个未结束的habit
router.get('/',async (req,res,next)=>{
    const habit = await req.prisma.habit.findFirst({
        where:{
            isEnd:false
        },
        orderBy:{
            id:"desc"
        }
    })
    res.send({habit})
})
// 获取所有habit
router.get('/all',async(req,res,next)=>{
    const habits = await req.prisma.habit.findMany()
    res.send({habits})
})
router.get('/select',async(req,res,next)=>{
    const select = req.query
    const whereObj = {}
    if(select.isend){
        whereObj.isEnd = JSON.parse(select.isend)
    }
    if(select.search){
        whereObj.title = {contains:select.search}
    }
    const habits = await req.prisma.habit.findMany({
        where:whereObj
    })
    res.send({habits})
})

router.get('/:id',async(req,res,next)=>{
    const id = Number(req.params.id)
    const habit = await req.prisma.habit.findUnique({
        where:{
            id
        }
    })
    res.send({habit})
})
// 添加habit
router.post('/',async(req,res,next)=>{
    const newHabits = req.body
    const habit = await req.prisma.habit.create({
        data:newHabits
    })
    res.send({habit})
})
// 修改指定habit
router.put('/:id',async(req,res,next)=>{
    const id = Number(req.params.id)
    const data = req.body
   
    if(data.isEnd ) data.isEnd = JSON.parse(data.isEnd)
    if(data.isEnd){data.endTime = new Date()}
    else{data.endTime = null}
    
   const habit = await req.prisma.habit.findUnique({where:{id}})
    if(habit){
        const result = await req.prisma.habit.update({
            data,
            where:{
                id
            }
        })
        res.send({message:"修改成功",habit:result})
    }else{
         res.send({message:'无法查询到该habit'})
    }
    
    
})


module.exports = router