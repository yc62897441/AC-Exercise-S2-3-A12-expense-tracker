// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用路由模組
const home = require('./modules/home')
// const news = require('./modules/new')
// const edit = require('./modules/edit')
// const deletes = require('./modules/delete')
const filter = require('./modules/filter')
const record = require('./modules/record')

// 路由模組
router.use('/', home)
// router.use('/new', news)
// router.use('/edit', edit)
// router.use('/delete', deletes)
router.use('/filter', filter)
router.use('/record', record)

// 匯出路由模組
module.exports = router
