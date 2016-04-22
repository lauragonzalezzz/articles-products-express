var express = require('express');
var articlesRoute = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var articleModule = require('../models/articles');
var validation = require('../middleware/validation');
var headerVal = require('../middleware/header-validation');


//POST
articlesRoute.post('/', headerVal(), validation({"title" : "string", "author" : "string", "body" : "string"}), function(req, res){
  var article = { "title" : req.body.title, "author" : req.body.author, "body" : req.body.body};

  articleModule.add(article);
  console.log('Article: ' + article.title + ' has been added.');
  res.send({redirect : '/articles/'});
  });

//PUT TITLE
articlesRoute.put('/:title', headerVal(), validation({"title" : "string", "author" : "string", "body" : "string"}), function(req, res){

  var updatedData = req.body;
  var url = encodeURIComponent(req.params.title);

  articleModule.editByTitle(updatedData, url)
  console.log('Article: ' + updatedData.title + ' has been updated');
  res.redirect('/');
});

//DELETE TITLE
articlesRoute.get('/:title/delete', function(req, res){
  var toDelete = req.params.title;

  articleModule.deleteByTitle(toDelete)
  console.log('Article: ' + toDelete + ' has been deleted.');
  res.redirect('/');
});

//GET
articlesRoute.get('/', function(req, res){

  articleModule.all()
  .then(function(article){
    return res.render('./articles/index', { "articles" : article });
  })
  .catch(function(err){
    if (err) {
      res.send(error);
    }
  })
});

//GET TITLE EDIT
articlesRoute.get('/:title/edit', function(req, res){
  var title = req.params.title

  articleModule.getByTitle(title)
  .then(function(article){
    return res.render('./articles/edit', { "article" : article[0] });
  })
  .catch(function(err){
    if (err){
      console.error(err);
    }
  })
});

//GET NEW
articlesRoute.get('/new', function(req, res){
  res.render('./articles/new');
});


module.exports = articlesRoute;