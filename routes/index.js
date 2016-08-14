var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CAO' });
});

router.put('/', function(req, res, next){
  res.send('Default put request!');
})

module.exports = router;
