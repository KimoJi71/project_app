var config = require('../config/development_config');
var mysql = require('mysql2');

var pool = mysql.createPool({
  host:config.mysql.host,
  user:config.mysql.user,
  password:config.mysql.password,
  database:config.mysql.database,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
});

module.exports = pool.promise();