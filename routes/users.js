var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sapa', (req, res, next) => {
  res.json({message: 'success', data: 'nama saya dzaki'});
});

module.exports = router;
