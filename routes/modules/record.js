// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

// 新增單筆支出頁面
router.get('/', (req, res) => {
  res.render('new')
})

// 新增單筆支出(從表單至資料庫)
router.post('/', (req, res) => {
  const reqBody = req.body
  const newRecord = new Record({
    name: reqBody.name,
    category: reqBody.category,
    date: reqBody.date,
    amount: reqBody.amount
  })

  newRecord.save()
    .then(res.redirect('../'))
    .catch(error => console.log(error))
})

// 編輯單筆資料頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record: record })
    })
    .catch(error => console.log(error))
})

// 編輯單筆資料(從表單至資料庫)
router.put('/:id', (req, res) => {
  const id = req.params.id
  const reqBody = req.body

  Record.findById(id)
    .then(record => {
      record.name = reqBody.name
      record.category = reqBody.category
      record.date = reqBody.date
      record.amount = reqBody.amount
      record.save()
      res.redirect('../')
    })
    .catch(error => console.log(error))
})

// 刪除單筆資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => {
      record.remove()
      res.redirect('../')
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
