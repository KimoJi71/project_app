var mysql = require('mysql2');
var pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'taiwangirl8971',
  database:'project_app',
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
});

module.exports = pool.promise();