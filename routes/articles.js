var express = require('express');
var articlesRoute = express.Router();

articlesRoute.get('/', function(req, res){
  res.send('ALL GOOD');
});

module.exports = articlesRoute;