const express = require('express')
const db = require('../models/db_connect')
const router = express.Router()
const { encrypt } = require('../controllers/crypto')

// 註冊會員資料
router.post('/register', (req, res) => {
    let insertColumns = null
    let insertValues = null
    let sqlCommand = ''

    //判斷身分為業務員or一般用戶
    if(req.body.memIdentify === '1') {
        let salesmanData = {}
        if(req.body.memAccount !== '') salesmanData.memAccount = req.body.memAccount
        if(req.body.memPassword !== '') salesmanData.memPassword = encrypt(req.body.memPassword).end_paw
        if(req.body.memIdentify !== '') salesmanData.memIdentify = req.body.memIdentify
        if(req.body.memName !== '') salesmanData.memName = req.body.memName
        if(req.body.memGender !== '') salesmanData.memGender = req.body.memGender
        if(req.body.memBirth !== '') salesmanData.memBirth = req.body.memBirth
        if(req.body.memCompany !== '') salesmanData.memCompany = req.body.memCompany
        if(req.body.companyContact !== '') salesmanData.companyContact = req.body.companyContact
        if(req.body.memService !== '') salesmanData.memService = req.body.memService
        if(req.body.memPhone !== '') salesmanData.memPhone = req.body.memPhone
        if(req.body.memLineID !== '') salesmanData.memLineID = req.body.memLineID
        
        insertColumns = Object.keys(salesmanData).map((key) => {
            return `${key}`
        }).join(', ')
        
        insertValues = Object.keys(salesmanData).map((key) => {
            return `'${salesmanData[key]}'`
        }).join(', ')
    } else {
        let memData = {}
        if(req.body.memAccount !== '') memData.memAccount = req.body.memAccount
        if(req.body.memPassword !== '') memData.memPassword = encrypt(req.body.memPassword).end_paw
        if(req.body.memIdentify !== '') memData.memIdentify = req.body.memIdentify
        if(req.body.memName !== '') memData.memName = req.body.memName
        if(req.body.memGender !== '') memData.memGender = req.body.memGender
        if(req.body.memBirth !== '') memData.memBirth = req.body.memBirth

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
    const memPassword = encrypt(req.body.memPassword).end_paw
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