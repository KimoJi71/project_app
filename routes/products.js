var express = require('express');
var db = require('../models/db_connect');
var router = express.Router();

//獲取全部保單資訊
router.get('/', (req, res) => {
  db.query('SELECT * FROM products')
  .then(result =>{
    res.json(result);
  });
});

//獲取篩選條件後的保單資訊
router.get('/filter', (req, res) => {
  type = Object.keys(req.query); //typeof type = array
  let sql_command = "";

  if(type[0] === "proCompany"){
    sql_command = `SELECT * FROM products where proCompany = '${req.query.proCompany}'`;
  }
  if(type[0] === "proBigItem"){
    sql_command = `SELECT * FROM products where proBigItem like '%${req.query.proBigItem}%'`;
  }
  if(type[0] === "proSmallItem"){
    sql_command = `SELECT * FROM products where proSmallItem like '%${req.query.proSmallItem}%'`;
  }
  if(type[0] === "proKind"){
    sql_command = `SELECT * FROM products where proKind = '${req.query.proKind}'`;
  }
  if(type[0] === "proPeriod"){
    sql_command = `SELECT * FROM products where proPeriod = '${req.query.proPeriod}'`;
  }
  if(type[0] === "proName"){
    sql_command = `SELECT * FROM products where proName like '%${req.query.proName}%'`;
  }
  if(type[0] === "proFeature"){
    sql_command = `SELECT * FROM products where proFeature like '%${req.query.proFeature}%'`;
  }
  if(type[0] === "proContent"){
    sql_command = `SELECT * FROM products where proContent like '%${req.query.proContent}%'`;
  }

  db.query(sql_command)
  .then(result => {
    res.json(result);
  });
})

module.exports = router;
