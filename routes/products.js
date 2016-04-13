var express = require('express');
var productsRoute = express.Router();

productsRoute.get('/', function(req, res){
  res.send('ALL GOOD');
});

module.exports = productsRoute;