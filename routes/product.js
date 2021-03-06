const express = require('express')
const db = require('../models/db_connect')
const router = express.Router()

//取得商品
router.get('/', (req, res) => {
  //抓取query的資料
  const whereString = Object.keys(req.query).map((key, idx) => {
     return `${key} LIKE '%${Object.values(req.query)[idx]}%'`
   }).join(' AND ')

  const sqlCommand = `SELECT *,
  (SELECT COUNT(*) FROM productLike WHERE productLike.proNum = products.proNum) AS likeNumber
  FROM products WHERE ${whereString.length === 0 ? 1 : whereString};`

  db.query(sqlCommand)
  .then(result => {
    res.json(result[0])
  })
})

//商品按讚
router.post('/liked/:proNum', (req, res) => {
  const {proNum} = req.params
  const memNum = req.body.memNum

  db.query(`INSERT INTO productLike (proNum, memNum) VALUES ('${proNum}', '${memNum}')`)
  .then((result) => {
    res.json({
      message: '成功為商品按讚'
    })
  })
})

//取消商品按讚
router.delete('/liked/:proNum/:memNum', (req, res) => {
  const {proNum, memNum} = req.params

  db.query(`DELETE FROM productLike WHERE proNum = '${proNum}' AND memNum = '${memNum}'`)
  .then((result) => {
    res.json({
      message: '成功取消商品按讚'
    })
  })
})

//檢查用戶是否有按讚
router.get('/liked/:proNum/:memNum', (req, res) => {
  const {proNum, memNum} = req.params

  db.query(`SELECT * FROM productLike WHERE proNum = ${proNum} AND memNum = ${memNum}`)
    .then((result) => {
      if(result[0][0] !== undefined) {
        res.json({
            message: '已按讚'
        })
      } else {
        res.json({
          message: '未按讚'
        })
      }
    })
})

module.exports = router
