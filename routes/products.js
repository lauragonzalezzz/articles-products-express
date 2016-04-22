var express = require('express');
var productsRoute = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var productModule = require('../models/products.js');
var validation = require('../middleware/validation');


productsRoute.use(bodyParser.urlencoded({extended: true}));

//POST //DONE
productsRoute.post('/', validation({"name" : "string", "price" : "number", "inventory" : "number"}), function(req, res) {

  var productData = { "id" : req.body.id, "name" : req.body.name, "price" : req.body.price, "inventory" : req.body.inventory};

  productModule.add(productData)
  console.log('Product: ' + productData.name + ' added')
  res.redirect('/products/');
});

//PUT ID
productsRoute.put('/:id', validation({"name" : "string", "price" : "number", "inventory" : "number"}), function(req, res){

  var updatedData = { "id" : req.body.id, "name" : req.body.name, "price" : req.body.price, "inventory" : req.body.inventory};

  productModule.editById(updatedData, function(err){
    if (err){
      return res.send({"success" : false });
    }
    return res.send({'success': true});
  });

});

//DELETE BY ID //DONE
productsRoute.get('/:id/delete', function(req, res){

  var productId = req.params.id;

  productModule.deleteById(productId)
  console.log('Product: ' + productId + ' has been deleted.');
  res.redirect('/products/');
});

//GET  //DONE
productsRoute.get('/', function(req, res){

  productModule.all()
  .then(function(products){
    return res.render('./products/index', { "products" : products });
  })
  .catch(function(err){
    if (err) {
      res.send(error);
    }
  })
});

//GET ID EDIT
productsRoute.get('/:id/edit', function(req, res){
  var idNum = req.params.id

  productModule.getById(idNum)
  .then(function(product){
    return res.render('./products/edit', { "product" : product[0] });
  })
  .catch(function(err){
    if (err){
      console.error(err);
    }
  })
});

//GET NEW  //DONE
productsRoute.get('/new', function(req, res){
  res.render('./products/new');
});

module.exports = productsRoute;