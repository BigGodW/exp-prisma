const express = require('express')
const router = express.Router()

const habitRouter = require('./habit.js')
const tagRouter = require('./tag.js')

router.use('/habit',habitRouter)
router.use('/tag',tagRouter)



module.exports = router