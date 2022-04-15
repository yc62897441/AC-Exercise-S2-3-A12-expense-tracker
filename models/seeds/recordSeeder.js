const db = require('../../config/mongoose')
const Record = require('../Record')

const recordSeeder = require('./recordSeeder.json')

const records = recordSeeder.results

db.once('open', () => {
  console.log('Record data, mongodb connected!')
  Record.create(records)
    .then(() => {
      console.log('Record data load in db done.')
      console.log('mongodb disconnected!')
      return db.close()
    })
})
