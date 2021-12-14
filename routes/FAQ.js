const express = require('express')
const db = require('../models/db_connect')
const router = express.Router()

//取得常見問題
router.get('/', (req, res) => {
    db.query(`SELECT serNum, question, answer FROM FAQ`)
    .then((result) => {
        res.json(result[0])
    })
})

module.exports = router