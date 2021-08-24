var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得商品
router.get('/', (req, res) => {
  const whereString = Object.keys(req.query).map((key, idx) => {
     console.log(key ,idx)
     return `${key} LIKE '%${Object.values(req.query)[idx]}%'`
   }).join(' AND ')

  const sqlCommand = `SELECT * FROM products WHERE ${whereString.length === 0 ? 1 : whereString};`
  console.log(sqlCommand)

  db.query(sqlCommand)
  .then(result => {
    res.json(result)
  })
})

//收藏

module.exports = router
