const express = require('express')
const db = require('../models/db_connect')
const router = express.Router()

//取得文章
router.get('/', (req, res) => {
  db.query(`
  SELECT members.memNum, members.memName, members.memPhoto, posts.*,
  (SELECT COUNT(*) FROM comments WHERE comments.postNum = posts.postNum) AS commentNumber,
  (SELECT COUNT(*) FROM postLike WHERE postLike.postNum = posts.postNum) AS likeNumber
  FROM members 
  INNER JOIN posts ON members.memNum = posts.memNum
  ORDER BY posts.postCreateAt DESC`
  )
  .then((result) => {
    res.json(result[0])
  })
})

//新增文章
router.post('/create', (req, res) => {
  //取得client端輸入之資料
    const memNum = req.body.memNum
    const postContent = req.body.postContent

  let sqlCommand = `INSERT INTO posts (memNum, postContent) VALUES (${memNum}, '${postContent}')`
  console.log(sqlCommand);
  
  db.query(sqlCommand)
  .then((result) => {
    // if(error) throw error
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
    res.json({
      message: '文章刪除成功'
    })
  }) 
})

//文章按讚
router.post('/liked/:postNum', (req, res) => {
  const {postNum} = req.params
  const memNum = req.body.memNum

  db.query(`INSERT INTO postLike (postNum, memNum) VALUES ('${postNum}', '${memNum}')`)
  .then((result) => {
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
      res.json({
        message: '未按讚'
      })
    }
  })
})

//檢舉文章
router.post('/report/:postNum', (req, res) => {
  const {postNum} = req.params
  const memNum = req.body.memNum
  const reportReason = req.body.reportReason

  db.query(`INSERT INTO postReport (postNum, memNum, reportReason) VALUES ('${postNum}', '${memNum}', '${reportReason}')`)
  .then((result) => {
    res.json({
      message: '成功檢舉貼文'
    })
  })
})

//收藏

module.exports = router
