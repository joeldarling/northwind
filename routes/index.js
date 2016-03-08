var express = require('express');

var Product = require('../models/product');

var router = express.Router();

module.exports = router;

router.get('/', function( req, res, next ){

  Product.find()
  .then(function(products){
    res.render('product', {products: products, active: true});
  }, next);

});

router.get('/active', function( req, res, next ){
  console.log('ACTIVE');
  Product.findActive()
  .then(function(products){
    res.render('product',{products: products});
  }, next);

});

router.get('/:id', function ( req, res, next ){
  Product.find()
  .then(function(products){
    res.render('product', {products: products, active: true, highlight: req.params.id});
  }, next);
});


//this should be a put
router.get('/toggle/:id', function ( req, res, next ){

  Product.findOne({_id: req.params.id})
  .then(function(result){
    result.toggleState();
    return result.save();
  })
  .then(function(){
    res.redirect('/products');
  }, next);

});

//this should be a put
router.get('/quantity/:id', function ( req, res, next ){

  Product.findOne({_id: req.params.id})
  .then(function(result){
    result.numInStock = req.query.quantity;

    return result.save();
  })
  .then(function(){
    res.redirect('/products');
  }, next);

});


//use restful routes!!
router.get('/delete/:id', function ( req, res, next ){

  Product.findByIdAndRemove({_id: req.params.id})
  .then(function(){
    res.redirect('/products');
  }, next);

});


router.post('/', function ( req, res, next ){

    var product = new Product({
      name: req.body.name,
      description: req.body.description
    });

    //save to dB
    product.save()
    .then(function(result){
      res.redirect('/products');
    }, next);
});
