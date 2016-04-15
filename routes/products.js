var express = require('express');
var productsRoute = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var productModule = require('../models/products.js');
var validation = require('../middleware/validation');

productsRoute.use(bodyParser.urlencoded({extended: true}));

//POST
productsRoute.post('/', validation({"id" : "number", "name" : "string", "price" : "number", "inventory" : "number"}), function(req, res) {

  var productData = { "id" : req.body.id, "name" : req.body.name, "price" : req.body.price, "inventory" : req.body.inventory};

  productModule.add(productData, function(err){
    if (err){
      return res.send({ "success" : false });
    }
    return res.send({'success': true});
  })

});

//PUT ID
productsRoute.put('/:id', validation({"id" : "number", "name" : "string", "price" : "number", "inventory" : "number"}), function(req, res){

  var updatedData = { "id" : req.body.id, "name" : req.body.name, "price" : req.body.price, "inventory" : req.body.inventory};

  productModule.editById(updatedData, function(err){
    if (err){
      return res.send({"success" : false });
    }
    return res.send({'success': true});
  });

});

//DELETE ID
productsRoute.delete('/:id', function(req, res){

  var productId = req.params.id;

  productModule.deleteById(productId, function(err){
    if (err){
      return res.send({"success" : false });
    }
    return res.send({'success': true});
  });
});

//GET
productsRoute.get('/', function(req, res){

  productModule.all(function(err, products){
    if (err){
      return res.send({"success" : false });
    }
    res.render('./products/index', { "products" : products });
  });
});

//GET ID EDIT
productsRoute.get('/:id/edit', function(req, res){
  var idNum = 'id' + req.params.id

  productModule.getById(idNum, function(err, product){
    if (err){
      return res.send({"success" : false });
    }
    res.render('./products/edit', { "product" : product });
  });
});

//GET NEW
productsRoute.get('/new', function(req, res){
  res.render('./products/new');
});

module.exports = productsRoute;