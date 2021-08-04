var express = require('express');
var db = require('../models/db_connect');
var router = express.Router();

router.get('/', (req, res) => {
  db.query("SELECT * FROM posts")
    .then(([result, fields]) =>{
      res.json(result);
    });
});


module.exports = router;
