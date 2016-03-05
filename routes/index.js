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

  product.findActive()
  .then(function(products){
    res.render('product', {products: products});
  });

});

router.get('/:id', function( req, res, next ){

  console.log(req.body);
  product.findOne({_id: req.params.id})
  .then(function(result){

    if(req.query.action === 'update'){
      result.numInStock = 1;
      return result.save();
    }

    if(req.query.action === 'toggle'){
      result.toggleState();
      return result.save();
    }
    else {
      return result.save();
    }

  })
  .then(function(){
    res.render('single',{ products: product });
  });
});


router.post('/', function ( req, res, next ){

    console.log('in POST');
    var newProduct = new product({
      name: req.body.name,
      description: req.body.description
    });
    console.log(newProduct);

    //save to dB
    newProduct.save()
    .then(function(result){
      console.log(result);
      res.redirect('/products');
    })
    .then( null, next );
});

router.post('/:id', function ( req, res, next ){

  console.log('poopy stick', req.body.stock);
  product.findOne({_id: req.params.id})
  .then(function(result){

    result.numInStock = req.body.stock;

    return result.save();
  })
  .then(function(){
    res.redirect('/products');

  });
});
