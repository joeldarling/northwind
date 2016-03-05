var express = require('express');

var products = require('../models/product');

var router = express.Router();

module.exports = router;

router.get('/', function( req, res, next ){
  res.render('product', {});
});
