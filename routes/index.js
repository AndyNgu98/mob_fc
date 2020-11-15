var mysql = require('mysql');
var config = require('../config');
var express = require('express');
var router = express.Router();

let pool = mysql.createPool(config.keys.db);

setInterval(function(){
  //  FUNCTION THAT REFRESHES AND SELECTS TOKEN THEN REFRESHES MEDIA AND UPDATE INTO DATABASE 
  console.log('from INDEX.JS OUTSIDE')
}, 10000);


/* GET home page. */
router.get('/', function(req, res, next) {

  setInterval(function(){
    //  FUNCTION THAT REFRESHES AND SELECTS TOKEN THEN REFRESHES MEDIA AND UPDATE INTO DATABASE 
    console.log('from index.js')
  }, 10000);


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

            connection.query(`SELECT * FROM instagram`, (error, insta) => {
                
              const instagram = []
    
              insta.forEach(insta => {
                instagram.push({
                  media: insta.media_url,
                  link: insta.permalink
                  
                })
              })
  
            

                    const data = {
                      title: 'MOB-FC',
                      instagram,
                      scores,
                      fixtures,

                    }

                    res.render('index', data);
                  // const savedData = data

                  // res.render('index', savedData)

            });      

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
