// 載入套件
const db = require('../../config/mongoose')
const Category = require('../Category')

const categorySeeder = require('./categorySeeder.json')

const categories = categorySeeder.results

db.once('open', () => {
  console.log('categories data, mongodb connected!')
  Category.create(categories)
    .then(() => {
      console.log('Category data load in db done.')
      console.log('mongodb disconnected!')
      return db.close()
    })
})
