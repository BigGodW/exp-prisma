const express = require('express')
const router = express.Router()



router.get('/',async (req,res,next)=>{
    const habit = await req.prisma.habit.findFirst()
    res.send(habit)
})
router.get('/all',async(req,res,next)=>{
    const habits = await req.prisma.habit.findMany()
    res.send(habits)
})


module.exports = router