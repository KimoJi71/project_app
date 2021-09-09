var express = require('express')
var db = require('../models/db_connect')
var router = express.Router()

//取得個人資料
router.get('/:memNum', (req, res) => {
    const {memNum} = req.params
    db.query(`SELECT * FROM members WHERE memNum = ${memNum}`)
    .then((result) => {
        const vm = result[0][0]
        if(result[0][0].memIdentify === 1) {
            res.json({
                data: {
                    memNum: vm.memNum,
                    memAccount: vm.memAccount,
                    memPassword: vm.memPassword,
                    memIdentify: vm.memIdentify,
                    memPhoto: vm.memPhoto,
                    memName: vm.memName,
                    memIntro: vm.memIntro,
                    memGender: vm.memGender,
                    memBirth: vm.memBirth,
                    memCompany: vm.memCompany,
                    companyContact: vm.companyContact,
                    memService: vm.memService,
                    memPhone: vm.memPhone,
                    memLineID: vm.memLineID
                }
            })
        } else {
            res.json({
                data: {
                    memNum: vm.memNum,
                    memAccount: vm.memAccount,
                    memPassword: vm.memPassword,
                    memIdentify: vm.memIdentify,
                    memPhoto: vm.memPhoto,
                    memName: vm.memName,
                    memIntro: vm.memIntro,
                    memGender: vm.memGender,
                    memBirth: vm.memBirth
                }
            })
        }
    })
})
//編輯個人資料
router.put('/update/:memNum', (req, res) => {
    const {memNum} = req.params
    const updateData = {
        memPassword: req.body.memPassword,
        memPhoto: req.body.memPhoto,
        memName: req.body.memName,
        memIntro: req.body.memIntro,
        memGender: req.body.memGender,
        memBirth: req.body.memBirth,
        memCompany: req.body.memCompany,
        companyContact: req.body.companyContact,
        memService: req.body.memService,
        memPhone: req.body.memPhone,
        memLineID: req.body.memLineID
    }

    let values = Object.keys(updateData).map((key) => {
        if(updateData[key] !== undefined) {
            return `${key} = '${updateData[key]}'`
        }
    })
    let updateValues = values.filter((el) => {
        return el !== undefined
    }).join(', ')
    console.log(`UPDATE members SET ${updateValues} WHERE memNum = ${memNum}`)

    db.query(`UPDATE members SET ${updateValues} WHERE memNum = ${memNum}`)
    .then((result) => {
        console.log('1 row updated in members table')
        res.json({
            massage: '個人資料編輯成功'
        })
    })
})

//取得業務員按讚數
router.get('/liked/:salesmanNum', (req, res) => {
    const {salesmanNum} = req.params
  
    db.query(`SELECT COUNT(*) AS Number FROM salesmanLike WHERE salesmanNum = ${salesmanNum}`)
    .then((result) => {
      res.json(result[0])
    })
})

//業務員按讚
router.post('/liked/:salesmanNum', (req, res) => {
    const {salesmanNum} = req.params
    const memNum = req.body.memNum

    db.query(`INSERT INTO salesmanLike (memNum, salesmanNum) VALUES ('${memNum}', '${salesmanNum}')`)
    .then((result) => {
        res.json({
            message: '成功為業務員按讚'
        })
    })
})

//取消業務員按讚
router.delete('/liked/:salesmanNum/:memNum', (req, res) => {
    const {salesmanNum, memNum} = req.params
  
    db.query(`DELETE FROM salesmanLike WHERE salesmanNum = '${salesmanNum}' AND memNum = '${memNum}'`)
    .then((result) => {
      res.json({
        message: '成功取消業務員按讚'
      })
    })
})

//檢查用戶是否按讚
router.get('/liked/:salesmanNum/:memNum', (req, res) => {
    const {salesmanNum, memNum} = req.params
  
    db.query(`SELECT * FROM salesmanLike WHERE salesmanNum = ${salesmanNum} AND memNum = ${memNum}`)
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
router.post('/report/:salesmanNum', (req, res) => {
    const {salesmanNum} = req.params
    const memNum = req.body.memNum
    const reportReason = req.body.reportReason
  
    db.query(`INSERT INTO salesmanReport (salesmanNum, memNum, reportReason) VALUES ('${salesmanNum}', '${memNum}', '${reportReason}')`)
    .then((result) => {
      res.json({
        message: '成功檢舉業務員'
      })
    })
})
//收藏數

module.exports = router
