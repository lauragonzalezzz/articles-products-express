var express = require('express');
var productsRoute = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

productsRoute.use(bodyParser.urlencoded({
  extended: true
}));

productsRoute.post('/', function(req, res) {

	var productData = req.body;
	
	fs.readFile('./db/products.js', function(err, data){

		var dbData = JSON.parse(data.toString());
		
		if (err) {
			res.send(err);
		}
		productData.id = dbData.currentId;
		
		dbData.products.push(productData);
		dbData.currentId++;
		dbData = JSON.stringify(dbData);

		fs.writeFile('./db/products.js', dbData, function(err){
			
			if (err) {
				res.send(err);
			}
		});
	});
  res.send({'success': true});
});



module.exports = productsRoute;