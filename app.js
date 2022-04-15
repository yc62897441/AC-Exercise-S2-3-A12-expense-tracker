// 載入套件
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 載入自定義套件
const db = require('./config/mongoose')
// const Record = require('./models/Record')
const handlebarsSelfDefined = require('./config/handlebars')
// const { redirect } = require('express/lib/response')
const routes = require('./routes/index')

// 定義伺服器參數
const app = express()
const PORT = process.env.PORT || 3000

// use 路由前處理
// view engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.urlencoded({ extended: true }))
// method-override
app.use(methodOverride('_method'))

// 導向總路由
app.use(routes)

// 啟動、監聽伺服器
app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`)
})
