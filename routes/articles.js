var express = require('express');
var articlesRoute = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

//POST
articlesRoute.post('/', function(req, res){
  var article = req.body;
  var urlTitle = encodeURIComponent(req.body.title);

  fs.readFile('./db/articles.js', function(err, data){

    var dbData = JSON.parse(data.toString());

    if (err) {
      res.send({'success': false});
    }

    dbData[article.title] = { 'body' : article.body, 'author' : article.author, 'urlTitle' : urlTitle }
    dbData = JSON.stringify(dbData);

    fs.writeFile('./db/articles.js', dbData, function(err){

      if (err) {
        res.send({'success': false});
      }
    });

  });

  res.send({ 'success': true });
});

module.exports = articlesRoute;