var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得留言
router.get('/:postNum', (req, res) => {
    const {postNum} = req.params
    db.query(`SELECT members.memName, members.memPhoto, comments.* FROM members INNER JOIN comments 
              ON (members.memNum = comments.memNum AND comments.postNum = '${postNum}') ORDER BY commentCreateAt DESC`)
      .then((result, fields) => {
        res.json(result)
    })
})

//新增留言
router.post('/create/:postNum', (req, res) => {
    //找尋目前資料庫commentNum最大值
    db.query('SELECT MAX(commentNum) FROM comments')
    .then((result) => {
        let currentMaxNum = Object.values(result[0][0])
        currentMaxNum = currentMaxNum > 0 ? currentMaxNum : 0
        //取得client端輸入之資料
        const commentData = {
            commentNum: parseInt(currentMaxNum, 10) + 1,
            postNum: req.params.postNum,
            memNum: req.body.memNum,
            commentContent: req.body.commentContent
        }

        let insertRows = Object.keys(commentData).map((key) => {
            return `${key}`
        }).join(', ')

        let insertValues = Object.keys(commentData).map((key) => {
            return `'${commentData[key]}'`
        }).join(', ')
        
        let sqlCommand = `INSERT INTO comments (${insertRows}) VALUES (${insertValues})`
        console.log(sqlCommand)

        db.query(sqlCommand)
        .then((result) => {
            console.log('1 record inserted into comments table')
            res.json({
                message: '留言新增成功'
            })
        })
    })
})

//編輯留言
router.put('/update/:commentNum', (req, res) => {
    const {commentNum} = req.params
    const commentContent = req.body.commentContent

    db.query(`UPDATE comments SET commentContent = '${commentContent}' WHERE commentNum = '${commentNum}'`)
    .then((result) => {
        console.log('1 row updated in comments table')
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
        console.log('1 row removed in comments table')
        res.json({
            message: '文章刪除成功'
        })
    })
})

//按讚、檢舉

module.exports = router
