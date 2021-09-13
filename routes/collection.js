var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得用戶收藏的文章
router.get('/posts-list/:memNum', (req, res) => {
    const {memNum} = req.params

    db.query(`SELECT posts.*, members.memName, members.memPhoto
    FROM (postCollect INNER JOIN posts ON postCollect.postNum = posts.postNum AND postCollect.memNum = ${memNum})
    INNER JOIN members ON posts.memNum = members.memNum 
    ORDER BY posts.postCreateAt DESC`)
    .then((result) => {
        res.json(result[0])
    })
})

//取得文章被收藏數
router.get('/posts/:postNum', (req, res) => {
    const {postNum} = req.params

    db.query(`SELECT COUNT(*) AS Number FROM postCollect WHERE postNum = ${postNum}`)
    .then((result) => {
        res.json(result[0])
    })
})

//收藏文章
router.post('/posts/:postNum', (req, res) => {
    const {postNum} = req.params
    const memNum = req.body.memNum
    
    db.query(`INSERT INTO postCollect (postNum, memNum) VALUES ('${postNum}', '${memNum}')`)
    .then((result) => {
        res.json({
            message: '成功收藏了貼文'
        })
    })
})

//取消收藏文章
router.delete('/posts/:postNum/:memNum', (req, res) => {
    const {postNum, memNum} = req.params

    db.query(`DELETE FROM postCollect WHERE postNum = '${postNum}' AND memNum = '${memNum}'`)
    .then((result) => {
        res.json({
            message: '成功取消貼文收藏'
        })
    })
})

//取得用戶收藏的商品
router.get('/products-list/:memNum', (req, res) => {
    const {memNum} = req.params

    db.query(`SELECT products.*
    FROM (productCollect INNER JOIN products ON productCollect.proNum = products.proNum AND productCollect.memNum = ${memNum})`)
    .then((result) => {
        res.json(result[0])
    })
})

//取得商品被收藏數
router.get('/products/:proNum', (req, res) => {
    const {proNum} = req.params

    db.query(`SELECT COUNT(*) AS Number FROM productCollect WHERE proNum = ${proNum}`)
    .then((result) => {
        res.json(result[0])
    })
})

//收藏商品
router.post('/products/:proNum', (req, res) => {
    const {proNum} = req.params
    const memNum = req.body.memNum
    
    db.query(`INSERT INTO productCollect (proNum, memNum) VALUES ('${proNum}', '${memNum}')`)
    .then((result) => {
        res.json({
            message: '成功收藏了商品'
        })
    })
})

//取消收藏商品
router.delete('/products/:proNum/:memNum', (req, res) => {
    const {proNum, memNum} = req.params

    db.query(`DELETE FROM productCollect WHERE proNum = '${proNum}' AND memNum = '${memNum}'`)
    .then((result) => {
        res.json({
            message: '成功取消商品收藏'
        })
    })
})

//取得業務員被收藏數

//取得用戶收藏的業務員

//收藏業務員

//取消收藏業務員

module.exports = router