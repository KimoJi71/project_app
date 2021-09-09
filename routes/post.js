var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得文章
router.get('/', (req, res) => {
  db.query('SELECT members.memName, members.memPhoto, posts.* FROM `members` INNER JOIN `posts` ON members.memNum = posts.memNum')
    .then((result) => {
      res.json(result[0])
    })
})

//新增文章
router.post('/create', (req, res) => {
  //取得client端輸入之資料
  const postData = {
    memNum: req.body.memNum,
    postContent: req.body.postContent
  }
  
  let insertRows = Object.keys(postData).map((key) => {
    return `${key}`
  }).join(', ')
  
  let insertValues = Object.keys(postData).map((key) => {
    return `'${postData[key]}'`
  }).join(', ')

  let sqlCommand = `INSERT INTO posts (${insertRows}) VALUES (${insertValues})`
  console.log(sqlCommand)
  
  db.query(sqlCommand)
  .then((result) => {
    // if(error) throw error
    console.log('1 record inserted into posts table') 
    res.json({
      message: '文章新增成功'
    })
  })
})

//編輯文章
router.put('/update/:postNum', (req, res) => {
  const {postNum} = req.params
  const postContent = req.body.postContent

  db.query(`UPDATE posts SET postContent = '${postContent}' WHERE postNum = ${postNum}`)
  .then((result) => {
    console.log('1 row updated in posts table')
    res.json({
      message: '文章編輯成功'
    })
  })
})

//刪除文章
router.delete('/delete/:postNum', (req, res) => {
  const {postNum} = req.params

  db.query(`DELETE FROM posts WHERE postNum = '${postNum}'`)
  .then((result) => {
    console.log('1 row removed in posts table')
    res.json({
      message: '文章刪除成功'
    })
  }) 
})

//取得文章按讚數
router.get('/liked/:postNum', (req, res) => {
  const {postNum} = req.params

  db.query(`SELECT COUNT(*) AS Number FROM postLike WHERE postNum = ${postNum}`)
  .then((result) => {
    res.json(result[0])
  })
})

//文章按讚
router.post('/liked/:postNum', (req, res) => {
  const {postNum} = req.params
  const memNum = req.body.memNum

  db.query(`INSERT INTO postLike (postNum, memNum) VALUES ('${postNum}', '${memNum}')`)
  .then((result) => {
    console.log('1 row updated in posts table.')
    res.json({
      message: '成功為貼文按讚'
    })
  })
})

//取消文章按讚
router.delete('/liked/:postNum/:memNum', (req, res) => {
  const {postNum, memNum} = req.params

  db.query(`DELETE FROM postLike WHERE postNum = '${postNum}' AND memNum = '${memNum}'`)
  .then((result) => {
    res.json({
      message: '成功取消貼文按讚'
    })
  })
})

//檢查用戶是否按讚
router.get('/liked/:postNum/:memNum', (req, res) => {
  const {postNum, memNum} = req.params

  db.query(`SELECT * FROM postLike WHERE postNum = ${postNum} AND memNum = ${memNum}`)
  .then((result) => {
    if(result[0][0] !== undefined) {
      res.json({
          message: '已按讚'
      })
    } else {
      res.status(400).json({
        message: '未按讚'
      })
    }
  })
})

//檢舉、收藏

module.exports = router
