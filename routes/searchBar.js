const express = require('express')
const db = require('../models/db_connect')
const router = express.Router()

// 取得搜尋後的結果(文章)
router.get('/posts', (req, res) => {
    const {search} = req.query
    const postsColumn = ['posts.postContent']

    const searchPosts = postsColumn.map((key) => {
        return `${key} LIKE '%${search}%'`
    }).join(' OR ')

    db.query(`
    SELECT members.memName, members.memPhoto, posts.* 
    FROM members 
    INNER JOIN posts ON members.memNum = posts.memNum AND ${searchPosts}
    ORDER BY posts.postCreateAt DESC`
    )
    .then((result) => {
        res.json(result[0])
    })
})

// 取得搜尋後的結果(商品)
router.get('/products', (req, res) => {
    const {search} = req.query
    const productsColumn = ['proCompany', 'proBigItem', 'proSmallItem', 'proKind', 'proPeriod', 'proName', 'proRemark', 'proFeature', 'proContent', 'proStatus']

    const searchProducts = productsColumn.map((key) => {
        return `${key} LIKE '%${search}%'`
    }).join(' OR ')

    db.query(`SELECT * FROM products WHERE ${searchProducts}`)
    .then((result) => {
        res.json(result[0])
    })
})

// 取得搜尋後的結果(用戶名)
router.get('/members', (req, res) => {
    const {search} = req.query
    const membersColumn = ['memAccount', 'memName']

    const searchMembers = membersColumn.map((key) => {
        return `${key} LIKE '%${search}%'`
    }).join(' OR ')

    db.query(`SELECT memNum, memAccount, memName FROM members WHERE ${searchMembers}`)
    .then((result) => {
        res.json(result[0])
    })
})

module.exports = router
