var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得搜尋後的結果(文章or商品or用戶名)
// router.get('/', (req, res) => {
//     const search = req.query.search
//     const postsColumn = ['postContent']
//     const productsColumn = ['proCompany', 'proBigItem', 'proSmallItem', 'proKind', 'proPeriod', 'proName', 'proRemark', 'proFeature', 'proContent', 'proStatus']
//     const membersColumn = ['memName']

//     const searchPosts = postsColumn.map((key, idx) => {
//         return `${key} LIKE '%${search}%'`
//     }).join(' OR ')
// })

module.exports = router
