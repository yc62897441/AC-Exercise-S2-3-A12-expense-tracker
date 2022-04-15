// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 新增單筆支出頁面
router.get('/', (req, res) => {
  res.render('new')
})

// 匯出路由模組
module.exports = router
