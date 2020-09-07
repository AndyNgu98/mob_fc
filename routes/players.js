var express = require('express');
var router = express.Router();

/* GET players page */
router.get('/', function(req, res, next) {
  res.render('players', {title: 'Express '});
});

module.exports = router;
