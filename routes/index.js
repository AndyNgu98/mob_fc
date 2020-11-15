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
          pool.query(`SELECT access_token FROM config WHERE ID=?`, `instagram`, (err, res) => {
              // REFRESH MEDIA FUNCTION(res[0].access_token)
              mediaCheck(res[0].access_token)
              refreshToken(res[0].access_token)
              
          })
      })
  }
  
  // ----------- THIS IS REFRESH TOKEN AND UPDATE INTO DATABASE --------------
  
  // REFRESH TOKEN
  function refreshToken(accessToken) {
      axios.get(`https://graph.instagram.com/refresh_access_token`, {
          params: {
              access_token: accessToken,
              grant_type: 'ig_refresh_token'
          }
      })
      .then(response => { 
          // UPDATE TOKEN INTO DB
          pool.getConnection((err, connection) => {
              const instaToken = response.data.access_token
              pool.query(`UPDATE config SET access_token =? WHERE ID =?`, [instaToken,`instagram`], (error, response) => {
                  console.log(response) 
              })
          });
      })
      .catch(error => {
          console.log(error)
      })
  } 
  
  // ------ THIS IS RETRIEVE MEDIA INFORMATION AND UPDATE TO DATABASE --------------
  
  // REFRESH MEDIA FUNCTION
  
  function mediaCheck(mediaToken) {
      axios.get(`${media.url.ROOT}/${media.auth.USER_ID}/media`, {
          params: {
              access_token: mediaToken,
              fields: 'media_type,media_url,permalink,thumbnail_url,timestamp'
          }
      })
      .then(response => {
        
          pool.getConnection((err, connection ) => {
              pool.query(`DELETE FROM instagram;`,(error, res ) =>  {
                  const mediaArray = response.data.data.filter(obj => obj.media_type === 'IMAGE')
                  console.log(mediaArray)
                  mediaArray.slice(0, 5).forEach(obj => {
                      pool.query(`INSERT INTO instagram SET media_type =?, media_url =?,  permalink =?, thumbnail_url =?`, 
                      [obj.media_type, obj.media_url, obj.permalink, obj.thumbnail_url ], (error, response) => {
                          console.log(response)
                      })
                  }) 
                  
              })
          })
      })
      .catch(error => {
          console.log(error)
      })
  }
  
  
  // ---------------- GET EXISITNG TOKEN AND REFRESHES IT SAVING INTO DB AND UPDATES MEDIA INTO DB ---------------------- 
  function getCurrenttoken() {
      pool.getConnection((err, connection) => {
          connection.query(`SELECT access_token FROM config WHERE instagramID = 1`, (error, token) => {
              refreshToken(token)
          })
          if(err) {
              console.log(err);
          } else {
              mediaCheck()
          }
      });
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
