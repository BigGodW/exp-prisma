const express = require('express')
const router = express.Router()

const prisma = require('../db.js')


router.get('/',async (req,res,next)=>{
    const habits = await prisma.habit.findMany()
    res.send(habits)
})



module.exports = router