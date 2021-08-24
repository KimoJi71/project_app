var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得搜尋後的結果
// router.get('/', (req, res) => {
//     const whereString = Object.keys(req.query).map((key, idx) => {
//         console.log(key ,idx)
//         return `${key} LIKE '%${Object.values(req.query)[idx]}%'`
//     }).join(' AND ')

// })

module.exports = router
