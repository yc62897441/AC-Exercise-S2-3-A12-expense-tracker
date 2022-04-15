// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

// 顯示首頁
router.get('/', (req, res) => {
  let workDone = false
  Record.find()
    .lean()
    .then(records => {
      // 計算總金額
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }

      // 取出對應 category 的 icon
      Category.find()
        .lean()
        .then(categories => {
          for (let i = 0; i < records.length; i++) {
            const icon = categories.find(category => category.name === records[i].category).icon
            records[i].categoryIcon = icon
          }
          workDone = true
          
          if (workDone) {
            res.render('index', { records: records, totalAmount: totalAmount })
          }
        })
        .catch(error => console.log(error))

    })
    .catch(error => console.log(error))
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
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
