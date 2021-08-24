var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得現在時間，格式為YYYY-MM-DD HH:MM:SS
const onTime = () => {
  const date = new Date()
  const yy = date.getFullYear()
  const mm = date.getMonth() +1
  const dd = date.getDate()
  const hh = date.getHours()
  const mi = date.getMinutes()
  const ss = date.getSeconds()

  return [yy, '-' + 
          (mm > 9 ? '' : '0') + mm, '-' + 
          (dd > 9 ? '' : '0') + dd, ' ' +
          (hh > 9 ? '' : '0') + hh, ':' +
          (mi > 9 ? '' : '0') + mi, ':' +
          (ss > 9 ? '' : '0') + ss
        ].join('')
}

//取得文章
router.get('/', (req, res) => {
  db.query("SELECT * FROM posts")
    .then((result, fields) => {
      res.json(result)
    })
})

//新增文章
router.post('/create', (req, res) => {
  const postData = {
    memNum: req.body.memNum,
    postContent: req.body.postContent
  }
  
  let insertRows = Object.keys(postData).map((key) => {
    return `${key}`
  }).join(', ')
  
  insertValues = Object.keys(postData).map((key) => {
    return `'${postData[key]}'`
  }).join(', ')

  let sqlCommand = `INSERT INTO posts (${insertRows}) VALUES (${insertValues})`
  console.log(sqlCommand)

  db.query(sqlCommand)
  .then((error, result) => {
    // if(error) throw error
    console.log('1 record inserted') 
  })
})

//編輯文章

//刪除文章

//按讚、檢舉、收藏

module.exports = router
