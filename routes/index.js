var mysql = require('mysql');
var config = require('../config');
var express = require('express');
var axios = require('axios');
var router = express.Router();

let pool = mysql.createPool(config.keys.db);

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const media = {
      auth: {
          USER_ID: config.keys.auth.user_Id,
          APP_ID: config.keys.auth.app_Id,
          APP_SECRET: config.keys.auth.app_Secret,
          
      },
      url: {
          ROOT: config.keys.auth.root_Url,
      }
  }

 retrieveId()

  
  // -------- THIS IS THE WEEKLY REFRESH OF THE INSTAGRAM MEDIA ------------
  
  // RUNNING ALL FUNCTIONS
function retrieveId() {
  pool.getConnection((err, connection ) => {
      
  })
}  
  
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

          // pool.query(`SELECT access_token FROM config WHERE ID=?`, `instagram`, (err, instares) => {
          //   // REFRESH MEDIA FUNCTION(res[0].access_token)
          //   axios.get(`${media.url.ROOT}/${media.auth.USER_ID}/media`, {
          //     params: {
          //         access_token: instares[0].access_token,
          //         fields: 'media_type,media_url,permalink,thumbnail_url,timestamp'
          //     }
          //   })
          //   .then(response => {
          //     const mediaArray = response.data.data.filter(obj => obj.media_type === 'IMAGE') 
          //     console.log(mediaArray.slice(0, 5))

          //     const data = {
          //       title: 'MOB-FC',
          //       instagram: mediaArray.slice(0, 5),
          //       scores,
          //       fixtures,
    
          //     }
          //     res.render('index', data);
          //   })
          //   .catch(error => {
          //       console.log(error)
          //   })          
          // })

          const data = {
            title: 'MOB-FC',
            // instagram: mediaArray.slice(0, 5),
            scores,
            fixtures,

          }
          res.render('index', data);
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









