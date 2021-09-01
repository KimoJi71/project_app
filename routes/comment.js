var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得留言
router.get('/:postNum', (req, res) => {
    const postNum = req.params.postNum
    db.query(`SELECT * FROM comments WHERE postNum = '${postNum}'`)
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
            console.log('1 record inserted')
            res.json({
                message: '留言新增成功'
            })
        })
    })
})

//編輯留言 /update/{commentNum}

//刪除留言 /delete/{commentNum}

//按讚、檢舉

module.exports = router
