var express = require('express');
var db = require('../models/db_connect');
var router = express.Router();

//取得全部文章
router.get('/', (req, res) => {
  db.query("SELECT * FROM posts")
    .then(([result, fields]) =>{
      res.json(result);
    });
});

// //取得搜尋後的文章
router.get('/search', (req, res) => {
  rows = ['memNum', 'postContent']
  condition = Object.values(req.query)
  let sql_command = ''

  for(let i = 0; i < rows.length; i++) {
    sql_command = `SELECT * FROM posts WHERE ${rows[i]} LIKE '%${condition[i]}%'`
    
    db.query(sql_command)
    .then(result => {
      res.json(result)
    })
  }
})

module.exports = router;
