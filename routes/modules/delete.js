// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

// 刪除單筆資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => {
      record.remove()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
