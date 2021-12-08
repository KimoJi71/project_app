const express = require('express')
const db = require('../models/db_connect')
const imgController = require('../controllers/image')
const router = express.Router()

//上傳照片
router.post('/upload/:memNum', imgController.uploadImg.single('memPhoto'), (req, res) => {
    const {memNum} = req.params
    const memPhoto = req.file.filename

    db.query(`UPDATE members SET memPhoto = '${memPhoto}' WHERE memNum = ${memNum}`)
    .then((result) => {
        res.json({
            message: '照片上傳成功'
        })
    })
})

module.exports = router