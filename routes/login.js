var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

// 註冊會員資料
router.post('/register', (req, res) => {
    let insertColumns = null
    let insertValues = null
    let sqlCommand = ''

    //判斷身分為業務員or一般用戶
    if(req.body.memIdentify === '1') {
        const salesmanData = {
            memAccount: req.body.memAccount,
            memPassword: req.body.memPassword,
            memIdentify: req.body.memIdentify,
            memPhoto: req.body.memPhoto,
            memName: req.body.memName,
            memIntro: req.body.memIntro,
            memGender: req.body.memGender,
            memBirth: req.body.memBirth,
            memCompany: req.body.memCompany,
            companyContact: req.body.companyContact,
            memService: req.body.memService,
            memPhone: req.body.memPhone,
            memLineID: req.body.memLineID,
        }
        
        insertColumns = Object.keys(salesmanData).map((key) => {
            return `${key}`
        }).join(', ')
        
        insertValues = Object.keys(salesmanData).map((key) => {
            return `'${salesmanData[key]}'`
        }).join(', ')
    } else {
        const memData = {
            memAccount: req.body.memAccount,
            memPassword: req.body.memPassword,
            memIdentify: req.body.memIdentify,
            memPhoto: req.body.memPhoto,
            memName: req.body.memName,
            memIntro: req.body.memIntro,
            memGender: req.body.memGender,
            memBirth: req.body.memBirth,
        }
        insertColumns = Object.keys(memData).map((key) => {
            return `${key}`
        }).join(', ')
    
        insertValues = Object.keys(memData).map((key) => {
            return `'${memData[key]}'`
        }).join(', ')
    }

    sqlCommand = `INSERT INTO members (${insertColumns}) VALUES (${insertValues})`

    //尋找是否有重複的帳號
    db.query(`SELECT memAccount FROM members WHERE memAccount = '${req.body.memAccount}'`) 
    .then ((result) => {
        // if(err) {
        //     console.log(err)
        //     res.json({
        //         status: '伺服器忙碌中，請稍後再試'
        //     })
        //     return
        // }
        //帳號已被註冊
        if(result[0][0] !== undefined) {
            res.status(400).json({
                status: '帳號已被註冊'
            })
        } else {
            db.query(sqlCommand)
            .then((err, results) => {
                // if(err) throw err
                res.json({
                    status: '註冊成功'
                })
            })
        }
    })
})
        
//會員登入驗證
router.post('/auth', (req,res) => {
    const memAccount = req.body.memAccount
    const memPassword = req.body.memPassword
    //尋找是否存在資料庫內
    db.query(`SELECT memAccount, memPassword FROM members WHERE memAccount = '${memAccount}' AND memPassword = '${memPassword}'`)
    .then((result) => {        
        if(result[0][0] !== undefined) {
            res.json({
                success: true
            })
        } else {
            res.status(400).json({
                success: false
            })
        }
    })
})

module.exports = router