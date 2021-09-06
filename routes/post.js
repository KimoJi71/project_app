var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得文章
router.get('/', (req, res) => {
  db.query('SELECT members.memName, members.memPhoto, posts.* FROM `members` INNER JOIN `posts` ON members.memNum = posts.memNum')
    .then((result) => {
      res.json(result)
    })
})

//新增文章
router.post('/create', (req, res) => {
  //找尋目前資料庫postNum最大值
  db.query('SELECT MAX(postNum) FROM posts')
  .then((result) => {
    let currentMaxNum = Object.values(result[0][0])
    currentMaxNum = currentMaxNum > 0 ? currentMaxNum : 0
    //取得client端輸入之資料
    const postData = {
      postNum: parseInt(currentMaxNum, 10) + 1,
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
})

//編輯文章
router.put('/update/:postNum', (req, res) => {
  const {postNum} = req.params
  const postContent = req.body.postContent

  db.query(`UPDATE posts SET postContent = '${postContent}' WHERE postNum = '${postNum}'`)
  .then((result) => {
    console.log('1 row updated in posts table')
    res.json({
      message: '文章編輯成功'
    })
    // if(err) {
    //   console.log(err)
    // } else {
    //   console.log('1 row updated in posts table')
    //   res.json({
    //      message: '文章編輯成功'
    //   })
    // }
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

//按讚、檢舉、收藏

module.exports = router
