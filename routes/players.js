var mysql = require('mysql');
var config = require('../config');
var express = require('express');
var router = express.Router();

let pool = mysql.createPool(config.keys.db);

/* GET players page */
router.get('/', function(req, res, next) {

  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM team`, (error, results) => {

      const players = []

      results.forEach(result => {
        players.push({
          firstName: result.firstName,
          position: result.position,
          description: result.description,
          squadNumber: result.squadNumber
        })
      });


      const data = {
        title: 'players',
        players: chunk(players, 4)
      }

      

      res.render('players', data);
    });
  })
});

function chunk(array, size) {
  var chunked_arr = [];
  for (var i = 0; i < array.length; i++) {
    var last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

module.exports = router;

