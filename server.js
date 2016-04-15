var express = require('express');
var app = express();
var articlesRoute = require('./routes/articles.js')
var productsRoute = require('./routes/products.js')
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var logModule = require('./middleware/logs.js');

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next){
  logModule(req, res, next);
});
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
app.use('/articles', articlesRoute);
app.use('/products', productsRoute);

app.listen(8080, function(){
  console.log('App Listening!');
});