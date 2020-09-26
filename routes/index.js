var mysql = require('mysql');
var config = require('../config');
var express = require('express');
var router = express.Router();

let pool = mysql.createPool(config.keys.db);


/* GET home page. */
router.get('/', function(req, res, next) {

  //Get Results from DB
  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM results`, (error, points) => {

      const scores = []

      points.forEach(point => {
        scores.push({
          Date: point.Date,
          Time: point.Time,
          Home: point.Home,
          Score: point.Score,
          Away: point.Away

        })
      });

        connection.query(`SELECT * FROM fixtures`, (error, plays) => {
              
          const fixtures = []

          plays.forEach(play => {
            fixtures.push({
              Date: play.Date,
              Time: play.Time,
              Home: play.Home,
              Away: play.Away,
              Venue: play.Venue,
            })
            
          })
          const data = {
            title: 'Home',
            scores: chunk(scores, 1),
            fixtures: chunk(fixtures, 1),

          }
          res.render('index', data,);

        });      
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









// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   const data = {
//     title: 'Home',

//   }
//   res.render('index', data);
// });

// module.exports = router;
