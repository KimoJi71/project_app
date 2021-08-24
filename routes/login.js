var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

// 註冊會員資料
router.post('/register', (req, res) => {
    let insertRows = null
    let insertValues = null
    let sqlCommand = ''

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

        insertRows = Object.keys(salesmanData).map((key) => {
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

        insertRows = Object.keys(memData).map((key) => {
            return `${key}`
        }).join(', ')

        insertValues = Object.keys(memData).map((key) => {
            return `'${memData[key]}'`
        }).join(', ')
    }
    sqlCommand = `INSERT INTO members (${insertRows}) VALUES (${insertValues})`
    console.log(sqlCommand)

    db.query(sqlCommand)
    .then((err, result) => {
        // if(err) throw err
        console.log('1 record inserted.')
    })
})

//會員登入驗證
// router.get('/auth', (req,res) => {
// })

module.exports = router