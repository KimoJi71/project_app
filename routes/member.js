var express = require('express');
var db = require('../models/db_connect');
const { route } = require('./products');
var router = express.Router();

//會員註冊
// router.post('/register', (req, res) => {
//     const memberData = {
//         memNum: req.body.memNum,
//         memAccount: req.body.memAccount,
//         memPassword: req.body.memPassword,
//         memCreateDate: req.body.memCreateDate,
//         memIdentify: req.body.memIdentify,
//         memPhoto: req.body.memPhoto,
//         memName: req.body.memName,
//         memPhoto: req.body.memPhoto,
//         memIntro: req.body.memIntro,
//         memGender: req.body.memGender,
//         memBirth: req.body.memBirth,
//         memCompany: req.body.memCompany,
//         companyContact: req.body.companyContact,
//         memService: req.body.memService,
//         memPhone: req.body.memPhone,
//         memLineID: req.body.memLineID,
//         memLike: req.body.memLike,
//         memReport: req.body.memReport,
//         memCollect: req.body.memCollect,
//         memVerify: req.body.memVerify
//     }

    
// })

// const members = [];

// if (fs.existsSync(imgPath)){
//   fs.mkdirSync(imgPath);
// };

// router.use('/public/img', express.static(imgPath));

// const saveImg = dataURL => {
//   if (dataURL.indexOf('http') === 0){
//     return dataURL;
//   };
// }

module.exports = router;
