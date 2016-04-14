var express = require('express');
var productsRoute = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

productsRoute.use(bodyParser.urlencoded({
  extended: true
}));

//POST
productsRoute.post('/', function(req, res) {

	var productData = req.body;

	fs.readFile('./db/products.js', function(err, data){

		var dbData = JSON.parse(data.toString());

		if (err) {
			res.send({'success': false});
		}
    var id = "id" + productData.id;
    dbData.products[id] = productData;
		dbData = JSON.stringify(dbData);

		fs.writeFile('./db/products.js', dbData, function(err){

			if (err) {
				res.send({'success': false});
			}
		});
	});
  res.send({'success': true});
});

//PUT ID
productsRoute.put('/:id', function(req, res){
  console.log(req.body);
  var updatedData = req.body;

  fs.readFile('./db/products.js', function(err, data){

    var dbData = JSON.parse(data.toString());

    if (err) {
      res.send({'success': false});
    }

    var storedObj = dbData.products[updatedData.id];
    if (updatedData.hasOwnProperty('name')){
      storedObj.name = updatedData.name
    }
    if (updatedData.hasOwnProperty('price')){
      storedObj.price = updatedData.price
    }
    if (updatedData.hasOwnProperty('inventory')){
      storedObj.inventory = updatedData.inventory
    }

    dbData = JSON.stringify(dbData);

    fs.writeFile('./db/products.js', dbData, function(err){

      if (err) {
        res.send({'success': false});
      }

    });

  });
  res.send({'success': true});
});

//DELETE ID
productsRoute.delete('/:id', function(req, res){

  var productData = req.body;

  fs.readFile('./db/products.js', function(err, data){

    var dbData = JSON.parse(data.toString());

    if (err) {
      res.send(err);
    }
    var id = "id" + productData.id;
    delete dbData.products[id];
    dbData = JSON.stringify(dbData);

    fs.writeFile('./db/products.js', dbData, function(err){

      if (err) {
        res.send({'success': false});
      }
    });
  });
  res.send({'success': true});
});

//GET
productsRoute.get('/', function(req, res){
  fs.readFile('./db/products.js', function(err, data){
    if (err){
      res.send({ "success" : false });
    }

    var myData = JSON.parse(data.toString());
    var myProducts = myData.products;
    res.render('index', { "products" : myProducts });
  });
});

//GET ID EDIT
productsRoute.get('/:id/edit', function(req, res){
  var id = 'id' + req.params.id

  fs.readFile('./db/products.js', function(err, data){
    if (err){
      res.send({ "success" : false });
    }

    var myData = JSON.parse(data.toString());
    var productToEdit = myData.products[id];
    res.render('edit', { "product" : productToEdit });
  });
});


module.exports = productsRoute;