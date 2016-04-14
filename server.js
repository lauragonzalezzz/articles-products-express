var express = require('express');
var app = express();
var articlesRoute = require('./routes/articles.js')
var productsRoute = require('./routes/products.js')
var jade = require('jade');

app.set('view engine', 'jade');
app.use('/articles', articlesRoute);
app.use('/products', productsRoute);

app.listen(8080, function(){
  console.log('App Listening!');
});