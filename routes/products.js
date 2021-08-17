var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得全部保單資訊
router.get('/', (req, res) => {
  db.query('SELECT * FROM products')
  .then(result =>{
    res.json(result)
  })
})

//取得篩選條件後的保單資訊
router.get('/filter', (req, res) => {
  type = Object.keys(req.query) //typeof type = array
  condition = Object.values(req.query) //typeof condition = array

  let sql_command = `SELECT * FROM products WHERE ${type.toString()} LIKE '%${condition.toString()}%'`

  db.query(sql_command)
  .then(result => {
    res.json(result)
  })
})

module.exports = router
