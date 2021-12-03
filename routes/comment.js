const express = require('express')
const db = require('../models/db_connect')
const router = express.Router()

//取得留言
router.get('/:postNum', (req, res) => {
    const {postNum} = req.params
    db.query(`
    SELECT members.memName, members.memPhoto, members.memIdentify, comments.* FROM members INNER JOIN comments 
    ON (members.memNum = comments.memNum AND comments.postNum = '${postNum}') ORDER BY commentCreateAt DESC`
    )
    .then((result, fields) => {
      res.json(result[0])
    })
})

//新增留言
router.post('/create/:postNum', (req, res) => {
    //取得client端輸入之資料
    const postNum = req.params.postNum
    const memNum = req.body.memNum
    const commentContent = req.body.commentContent
    
    db.query(`INSERT INTO comments (postNum, memNum, commentContent) VALUES ('${postNum}', '${memNum}', '${commentContent}')`)
    .then((result) => {
      res.json({
          message: '留言新增成功'
      })
    })
})

//編輯留言
router.put('/update/:commentNum', (req, res) => {
    const {commentNum} = req.params
    const commentContent = req.body.commentContent

    db.query(`UPDATE comments SET commentContent = '${commentContent}' WHERE commentNum = '${commentNum}'`)
    .then((result) => {
      res.json({
          message: '留言編輯成功'
      })
    })
})

//刪除留言 /delete/{commentNum}
router.delete('/delete/:commentNum', (req, res) => {
    const {commentNum} = req.params

    db.query(`DELETE FROM comments WHERE commentNum = '${commentNum}'`)
    .then((result) => {
      res.json({
          message: '留言刪除成功'
      })
    })
})

//取得留言按讚數
router.get('/liked/:commentNum', (req, res) => {
    const {commentNum} = req.params
  
    db.query(`SELECT COUNT(*) AS Number FROM commentLike WHERE commentNum = ${commentNum}`)
    .then((result) => {
      res.json(result[0])
    })
})

//留言按讚
router.post('/liked/:commentNum', (req, res) => {
    const {commentNum} = req.params
    const memNum = req.body.memNum

    db.query(`INSERT INTO commentLike (commentNum, memNum) VALUES ('${commentNum}', '${memNum}')`)
    .then((result) => {
        res.json({
            message: '成功為留言按讚'
        })
    })
})

//取消留言按讚
router.delete('/liked/:commentNum/:memNum', (req, res) => {
    const {commentNum, memNum} = req.params
  
    db.query(`DELETE FROM commentLike WHERE commentNum = '${commentNum}' AND memNum = '${memNum}'`)
    .then((result) => {
      res.json({
        message: '成功取消留言按讚'
      })
    })
})

//檢查用戶是否按讚
router.get('/liked/:commentNum/:memNum', (req, res) => {
    const {commentNum, memNum} = req.params
  
    db.query(`SELECT * FROM commentLike WHERE commentNum = ${commentNum} AND memNum = ${memNum}`)
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

//檢舉文章
router.post('/report/:commentNum', (req, res) => {
    const {commentNum} = req.params
    const memNum = req.body.memNum
    const reportReason = req.body.reportReason
  
    db.query(`INSERT INTO commentReport (commentNum, memNum, reportReason) VALUES ('${commentNum}', '${memNum}', '${reportReason}')`)
    .then((result) => {
      res.json({
        message: '成功檢舉留言'
      })
    })
})

module.exports = router
