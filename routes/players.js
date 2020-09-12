var express = require('express');
var router = express.Router();

/* GET players page */
router.get('/', function(req, res, next) {

  const data = {
    title: 'Players',
    players: [
      {
        name: 'Tony',
        position: 'Striker',
        description: 'This is a description',
        image: 'https://via.placeholder.com/1280x960',
        icon: 'https://via.placeholder.com/96',
      },
      {
        name: 'Adam',
        position: 'Defender',
        description: 'This is a description',
        image: 'https://via.placeholder.com/1280x960',
        icon: 'https://via.placeholder.com/96',
      },
      {
        name: 'James',
        position: 'Midfielder',
        description: 'This is a description',
        image: 'https://via.placeholder.com/1280x960',
        icon: 'https://via.placeholder.com/96',
      }
    ]
  }
  
  res.render('players', data);
});

module.exports = router;
