const express = require('express')
const db = require('../models/db_connect')
const imgController = require('../controllers/image')
const router = express.Router()
const { encrypt } = require('../controllers/crypto')

//取得個人資料
router.get('/:memNum', (req, res) => {
    const {memNum} = req.params
    db.query(`SELECT *,
    (SELECT COUNT(*) FROM salesmanLike WHERE salesmanLike.salesmanNum = members.memNum) AS likeNum
    FROM members WHERE memNum = ${memNum}`)
    .then((result) => {
        const vm = result[0][0]
        if(result[0][0].memIdentify === 1) {
            res.json({
                data: {
                    memNum: vm.memNum,
                    memAccount: vm.memAccount,
                    memIdentify: vm.memIdentify,
                    memPhoto: vm.memPhoto === null ? vm.memPhoto : 'http://localhost:3000/images\\' + vm.memPhoto,
                    memName: vm.memName,
                    memIntro: vm.memIntro,
                    memGender: vm.memGender,
                    memBirth: vm.memBirth,
                    memCompany: vm.memCompany,
                    companyContact: vm.companyContact,
                    memService: vm.memService,
                    memPhone: vm.memPhone,
                    memLineID: vm.memLineID,
                    likeNum: vm.likeNum
                }
            })
        } else {
            res.json({
                data: {
                    memNum: vm.memNum,
                    memAccount: vm.memAccount,
                    memIdentify: vm.memIdentify,
                    memPhoto: vm.memPhoto === null ? vm.memPhoto : 'http://localhost:3000/images\\' + vm.memPhoto,
                    memName: vm.memName,
                    memIntro: vm.memIntro,
                    memGender: vm.memGender,
                    memBirth: vm.memBirth,
                    likeNum: vm.likeNum
                }
            })
        }
    })
})
//編輯個人資料
router.put('/update/:memNum', (req, res) => {
    const {memNum} = req.params
    let updateData = {
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
            return `${key} = "${updateData[key]}"`
        }
    })
    let updateValues = values.filter((el) => {
        return el !== undefined
    }).join(', ')

    db.query(`UPDATE members SET ${updateValues} WHERE memNum = ${memNum}`)
    .then((result) => {
        res.json({
            message: '個人資料編輯成功'
        })
    })
})

//變更密碼
router.put('/update-password/:memNum', (req, res) => {
    const {memNum} = req.params
    const memOldPassword = encrypt(req.body.memOldPassword).end_paw;
    const memNewPassword = encrypt(req.body.memNewPassword).end_paw;

    let sqlCommand = `UPDATE members SET memPassword = '${memNewPassword}' WHERE memNum = ${memNum}`
    console.log(sqlCommand);

    db.query(`SELECT memPassword FROM members WHERE memPassword = '${memOldPassword}'`)
    .then((result) => {
        if(result[0][0] !== undefined) {
            db.query(sqlCommand)
            .then((result) => {
                res.json({
                    status: true
                })
            })
        } else {
            res.status(400).json({
                status: false
            })
        }
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
        res.json({
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

module.exports = router
