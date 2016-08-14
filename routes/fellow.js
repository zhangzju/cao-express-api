var express = require('express');
var router = express.Router();

var fellow = [
  {name: 'zhang', address: 'shenzhen', gender: true},
  {name: 'master', address: 'california', gender: false}
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(fellow);
});

router.put('/', function(req, res, next){
  res.json(fellow);
})

module.exports = router;
