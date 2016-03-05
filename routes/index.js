var express = require('express');

var product = require('../models/product');

var router = express.Router();

module.exports = router;

router.get('/', function( req, res, next ){

  product.find()
  .then(function(products){
    res.render('product', {products: products, active: true});
  });

});

router.get('/active', function( req, res, next ){
  console.log('ACTIVE');
  product.findActive()
  .then(function(products){
    res.render('product',{products: products});
  });

});

router.get('/:id', function ( req, res, next ){
  product.find()
  .then(function(products){
    res.render('product', {products: products, active: true, highlight: req.params.id});
  });
});



router.get('/toggle/:id', function ( req, res, next ){

  product.findOne({_id: req.params.id})
  .then(function(result){
    result.toggleState();
    return result.save();
  })
  .then(function(){
    res.redirect('/products');
  });

});

router.get('/quantity/:id', function ( req, res, next ){

  product.findOne({_id: req.params.id})
  .then(function(result){
    result.numInStock = req.query.quantity;

    return result.save();
  })
  .then(function(){
    res.redirect('/products');
  });

});



router.get('/delete/:id', function ( req, res, next ){

  product.findByIdAndRemove({_id: req.params.id})
  .then(function(){
    res.redirect('/products');
  });

});


router.post('/', function ( req, res, next ){

    var newProduct = new product({
      name: req.body.name,
      description: req.body.description
    });

    //save to dB
    newProduct.save()
    .then(function(result){
      res.redirect('/products');
    })
    .then( null, next );
});
