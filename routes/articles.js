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

  articleModule.add(article, function(err){
    if (err){
      return res.send({"success": false});
    }
    return res.send({"success": true});
  });
});

//PUT TITLE
articlesRoute.put('/:title', headerVal(), validation({"title" : "string", "author" : "string", "body" : "string"}), function(req, res){

  var updatedData = req.body;
  var url = encodeURIComponent(req.params.title);

  articleModule.editByTitle(updatedData, url, function(err){
    if (err){
      return res.send({"success" : false });
    }
    return res.send({"success" : true });
  });
});

//DELETE TITLE
articlesRoute.get('/:title', function(req, res){
  var toDelete = req.params.title;

  articleModule.deleteByTitle(toDelete)

  .then(function(){
    articleModule.all();
  })
  .then(function(article){
    return res.render('./articles/index', { "articles" : article });
  })
  .catch(function(err){
    if (err) {
      res.send(error);
    }
  })

});

//GET  //DONE
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
  var titleUrl = encodeURIComponent(req.params.title)

  articleModule.getByTitle(titleUrl, function(err, article){
    if (err){
      return res.send({"success" : false });
    }
    return res.render('./articles/edit', { "article" : article });
  });
});

//GET NEW
articlesRoute.get('/new', function(req, res){
  res.render('./articles/new');
});


module.exports = articlesRoute;