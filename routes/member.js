var express = require('express');
var fs = require('fs');
var cors = require('cors');
var crypto = require('crypto');
var _ = require('lodash');
var db = require('../models/db_connect');
var router = express.Router();

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
