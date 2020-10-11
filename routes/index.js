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

      const instagram = 
      [
        {
        "caption": "The Boys Make It 3 Wins Out Of 3 With Another Clean Sheet Under The Belt‼️‼️ 🦍\n\nWe’d also like to thank @officialfcub for our third friendly of pre-season and wishing them best for the up coming season ahead.\n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n\n#nonleaguefootball #nonleague #happy #grassroots #soccer #coaching #sport #fourfourtwo #picoftheday #thefa #epl #englishfa #followers #london #following #football #gainfollowers #fa #fitness #footballcoach #grassrootsfootball #ladbible #kentfa #obdsfl #preseason",
        "id": "17911804813472707",
        "media_type": "IMAGE",
        "media_url": "https://scontent-lhr8-1.cdninstagram.com/v/t51.29350-15/117526543_999202633928436_8376677129602965895_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_ohc=T4C-XvicdvIAX_1HvVe&_nc_ht=scontent-lhr8-1.cdninstagram.com&oh=48556757d7fd78df5b9614faf0b43d32&oe=5F9E1C25",
        "permalink": "https://www.instagram.com/p/CD9LjomBdaK/",
        "timestamp": "2020-08-16T15:54:19+0000",
        "username": "ministryofballfc"
        },
        {
          "caption": "The Boys Make It 3 Wins Out Of 3 With Another Clean Sheet Under The Belt‼️‼️ 🦍\n\nWe’d also like to thank @officialfcub for our third friendly of pre-season and wishing them best for the up coming season ahead.\n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n\n#nonleaguefootball #nonleague #happy #grassroots #soccer #coaching #sport #fourfourtwo #picoftheday #thefa #epl #englishfa #followers #london #following #football #gainfollowers #fa #fitness #footballcoach #grassrootsfootball #ladbible #kentfa #obdsfl #preseason",
          "id": "17911804813472707",
          "media_type": "IMAGE",
          "media_url": "https://scontent-lhr8-1.cdninstagram.com/v/t51.29350-15/117526543_999202633928436_8376677129602965895_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_ohc=T4C-XvicdvIAX_1HvVe&_nc_ht=scontent-lhr8-1.cdninstagram.com&oh=48556757d7fd78df5b9614faf0b43d32&oe=5F9E1C25",
          "permalink": "https://www.instagram.com/p/CD9LjomBdaK/",
          "timestamp": "2020-08-16T15:54:19+0000",
          "username": "ministryofballfc"
          },
        {
          "caption": "The Boys Make It 3 Wins Out Of 3 With Another Clean Sheet Under The Belt‼️‼️ 🦍\n\nWe’d also like to thank @officialfcub for our third friendly of pre-season and wishing them best for the up coming season ahead.\n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n\n#nonleaguefootball #nonleague #happy #grassroots #soccer #coaching #sport #fourfourtwo #picoftheday #thefa #epl #englishfa #followers #london #following #football #gainfollowers #fa #fitness #footballcoach #grassrootsfootball #ladbible #kentfa #obdsfl #preseason",
          "id": "17911804813472707",
          "media_type": "IMAGE",
          "media_url": "https://scontent-lhr8-1.cdninstagram.com/v/t51.29350-15/117526543_999202633928436_8376677129602965895_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_ohc=T4C-XvicdvIAX_1HvVe&_nc_ht=scontent-lhr8-1.cdninstagram.com&oh=48556757d7fd78df5b9614faf0b43d32&oe=5F9E1C25",
          "permalink": "https://www.instagram.com/p/CD9LjomBdaK/",
          "timestamp": "2020-08-16T15:54:19+0000",
          "username": "ministryofballfc"
          },
        {
          "caption": "The Boys Make It 3 Wins Out Of 3 With Another Clean Sheet Under The Belt‼️‼️ 🦍\n\nWe’d also like to thank @officialfcub for our third friendly of pre-season and wishing them best for the up coming season ahead.\n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n.⁣\n.⁣\n.⁣\n.⁣\n.⁣ \n\n#nonleaguefootball #nonleague #happy #grassroots #soccer #coaching #sport #fourfourtwo #picoftheday #thefa #epl #englishfa #followers #london #following #football #gainfollowers #fa #fitness #footballcoach #grassrootsfootball #ladbible #kentfa #obdsfl #preseason",
          "id": "17911804813472707",
          "media_type": "IMAGE",
          "media_url": "https://scontent-lhr8-1.cdninstagram.com/v/t51.29350-15/117526543_999202633928436_8376677129602965895_n.jpg?_nc_cat=109&_nc_sid=8ae9d6&_nc_ohc=T4C-XvicdvIAX_1HvVe&_nc_ht=scontent-lhr8-1.cdninstagram.com&oh=48556757d7fd78df5b9614faf0b43d32&oe=5F9E1C25",
          "permalink": "https://www.instagram.com/p/CD9LjomBdaK/",
          "timestamp": "2020-08-16T15:54:19+0000",
          "username": "ministryofballfc"
          }
            
      ]

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
            instagram,
            scores,
            fixtures,

          }


          const savedData = data

          res.render('index', savedData)

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
