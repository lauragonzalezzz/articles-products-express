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

    dbData[article.title] = { 'title' : article.title, 'body' : article.body, 'author' : article.author, 'urlTitle' : urlTitle }
    dbData = JSON.stringify(dbData);

    fs.writeFile('./db/articles.js', dbData, function(err){

      if (err) {
        res.send({'success': false});
      }
    });

  });

  res.send({ 'success': true });
});

//PUT TITLE
articlesRoute.put('/:title', function(req, res){

  var updatedData = req.body;
  var updatedUrl = updatedData.urlTitle;
  console.log('updatedData.title',updatedData.urlTitle);

  fs.readFile('./db/articles.js', function(err, data){

    var dbData = JSON.parse(data.toString());

    if (err) {
      res.send({'success': false});
    }
    if (!dbData[updatedUrl]){
      res.send({'success': false});
    }
    console.log('dbData',dbData);
    var storedObj = dbData[updatedUrl];
    if (updatedData.hasOwnProperty('title')){
      storedObj.title = updatedData.title
    }
    if (updatedData.hasOwnProperty('body')){
      storedObj.body = updatedData.body
    }
    if (updatedData.hasOwnProperty('author')){
      storedObj.author = updatedData.author
    }
    if (updatedData.hasOwnProperty('urlTitle')){
      storedObj.urlTitle = updatedData.urlTitle
    }

    dbData = JSON.stringify(dbData);

    fs.writeFile('./db/articles.js', dbData, function(err){

      if (err) {
        res.send({'success': false});
      }

    });

  });
  // res.send({'success': true});
});

//DELETE TITLE
articlesRoute.delete('/:title', function(req, res){
  var toDelete = req.params.title;

  fs.readFile('./db/articles.js', function(err, data){

    var dbData = JSON.parse(data.toString());

    if (err){
      res.send({"success" : false });
    }

    delete dbData[toDelete];
    dbData = JSON.stringify(dbData);

    fs.writeFile('./db/articles.js', dbData, function(err){

      if (err) {
        res.send({'success': false});
      }
    });
  });
  res.send({'success': true});
});

//GET
articlesRoute.get('/', function(req, res){
  fs.readFile('./db/articles.js', function(err, data){
    if (err){
      res.send({ "success" : false });
    }

    var myData = JSON.parse(data.toString());
    res.render('./articles/index', { "articles" : myData });
  });
});

//GET TITLE EDIT
articlesRoute.get('/:title/edit', function(req, res){
  var title = req.params.title

  fs.readFile('./db/articles.js', function(err, data){
    if (err){
      res.send({ "success" : false });
    }

    var myData = JSON.parse(data.toString());
    var articleToEdit = myData[title];
    res.render('./articles/edit', { "article" : articleToEdit });
  });
});

//GET NEW
articlesRoute.get('/new', function(req, res){
  res.render('./articles/new');
});


module.exports = articlesRoute;