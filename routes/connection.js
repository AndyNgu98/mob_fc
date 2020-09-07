var express                     = require('express');
var router                      = express.Router();
var config                      = require('../config');
var mysql                       = require('mysql');
// var pool                        = mysql.createPool(config.keys.db);


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mob_fc'
});

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

//   let createTable = `ALTER table users 
//                           ADD id int primary key auto_increment,
//                       )`;

//   connection.query(createTable, function(err, results, fields) {
//     if (err) {
//       console.log(err.message);
//     }
//   });

//   connection.end(function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
//   });
});

module.exports = router;
    


