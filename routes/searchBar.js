const express = require('express')
const db = require('../models/db_connect')
const router = express.Router()

// 取得搜尋後的結果(文章or商品or用戶名)
router.get('/', (req, res) => {
    const {keywords} = req.query
    const {target} = req.query
    const postsColumn = ['posts.postContent']
    const productsColumn = ['proCompany', 'proBigItem', 'proSmallItem', 'proKind', 'proPeriod', 'proName', 'proRemark', 'proFeature', 'proContent', 'proStatus']
    const membersColumn = ['memAccount', 'memName']

    if(target === 'posts') {
        const searchPosts = postsColumn.map((key) => {
            return `${key} LIKE '%${keywords}%'`
        }).join(' OR ')
    
        db.query(`
        SELECT members.memNum, members.memName, members.memPhoto, members.memIdentify, posts.*,
        (SELECT COUNT(*) FROM comments WHERE comments.postNum = posts.postNum) AS commentNumber,
        (SELECT COUNT(*) FROM postLike WHERE postLike.postNum = posts.postNum) AS likeNumber
        FROM members 
        INNER JOIN posts ON members.memNum = posts.memNum AND ${searchPosts}
        ORDER BY posts.postCreateAt DESC`
        )
        .then((result) => {
            res.json(result[0])
        })
    } else if(target === 'products') {
        const searchProducts = productsColumn.map((key) => {
            return `${key} LIKE '%${keywords}%'`
        }).join(' OR ')
        
        db.query(`SELECT *,
        (SELECT COUNT(*) FROM productLike WHERE productLike.proNum = products.proNum) AS likeNumber
        FROM products WHERE ${searchProducts}`)
        .then((result) => {
            res.json(result[0])
        })
    } else if(target === 'members') {
        const searchMembers = membersColumn.map((key) => {
            return `${key} LIKE '%${keywords}%'`
        }).join(' OR ')
        
        db.query(`SELECT memNum, memAccount, memName, memPhoto, memIdentify FROM members WHERE ${searchMembers}`)
        .then((result) => {
            res.json(result[0])
        })
    } else {
        res.status(400).json({
            message: 'Please select a valid value.'
        })
    }

})

module.exports = router
