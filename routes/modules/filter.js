// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

// 篩選特定 category 的資料，並顯示總金額
router.get('/', (req, res) => {
  // 取得使用者選擇之 category
  const filterCategory = req.body.category
  // 宣告總金額變數
  let totalAmount = 0
  // 宣告使用者選取之 category 之資料清單
  let filterRecord = []

  Record.find()
    .lean()
    .then(records => {
      let loadIconWorkDone = false
      // 取出對應 category 的 icon
      Category.find()
        .lean()
        .then(categories => {
          records.forEach(item => {
            const icon = categories.find(category => category.name === item.category).icon
            item.categoryIcon = icon
          })
          loadIconWorkDone = true

          // filterCategory 為空字串，表示選取"全部類別"；若否，則為某特定之 category
          if (filterCategory === '') {
            // 篩選出資料清單
            filterRecord = [...records]
            // 計算篩選資料清單之各筆資料之總金額
            for (let i = 0; i < filterRecord.length; i++) {
              totalAmount += filterRecord[i].amount
            }
          } else {
            filterRecord = records.filter(item => item.category === filterCategory)
            for (let i = 0; i < filterRecord.length; i++) {
              totalAmount += filterRecord[i].amount
            }
          }

          if (loadIconWorkDone) {
            res.render('index', { records: filterRecord, totalAmount: totalAmount, filterCategory: filterCategory })
          }
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
