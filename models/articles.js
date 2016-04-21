var fs = require('fs');
var pgp = require('pg-promise')();
var dbConn = require('../private.json');
var db = pgp(dbConn);

module.exports = (function(data){

  _all = function(){
    return db.query('SELECT * FROM articles')
  };

  _add = function(data, cb){
    var article = data;
    var urlTitle = encodeURIComponent(article.title);
    article['urlTitle'] = urlTitle;
    fs.readFile('./db/articles.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        return cb(err);
      }

      dbData[urlTitle] = { 'title' : article.title, 'body' : article.body, 'author' : article.author, 'urlTitle' : article.urlTitle }
      dbData = JSON.stringify(dbData);

      fs.writeFile('./db/articles.js', dbData, function(err){

        if (err) {
          return cb(err);
        }
        return cb();
      });
    });

    // db.query('SELECT * FROM articles')
    // .then(function(articles){
    //   res.send(articles);
    // })
    // .catch(function(err){
    //   if (err) {
    //     res.send(err);
    //   }
    // });
  };

  _getByTitle = function(data, cb){
    var titleUrl = data;

    // fs.readFile('./db/articles.js', function(err, data){
    //   if (err){
    //     return cb(err);
    //   }
    //   var myData = JSON.parse(data.toString());
    //   var article = myData[titleUrl];
    //   return cb(null, article);
    // });


  };

  _editByTitle = function(data, url, cb){
    console.log('in model - edit by title');
    var updatedData = data;
    var oldUrl = url;

    fs.readFile('./db/articles.js', function(err, data){

      var dbData = JSON.parse(data.toString());
      if (err) {
        return cb(err);
      }
      if (!dbData[oldUrl]){
        return cb(err);
      }

      var newUrlTitle = encodeURIComponent(updatedData.title);
      var storedObj = {};
      storedObj = dbData[oldUrl];

      storedObj.urlTitle = newUrlTitle;
      if (updatedData.hasOwnProperty('title')){
        storedObj.title = updatedData.title
      }
      if (updatedData.hasOwnProperty('body')){
        storedObj.body = updatedData.body
      }
      if (updatedData.hasOwnProperty('author')){
        storedObj.author = updatedData.author
      }
      dbData[newUrlTitle] = storedObj;
      dbData = JSON.stringify(dbData);
      fs.writeFile('./db/articles.js', dbData, function(err){

        if (err) {
          return cb(err);
        }
        return cb();
      });
    });
  };

  _deleteByTitle = function(data, cb){
    var titleToDelete = decodeURIComponent(data);
    var selectQuery = 'SELECT * FROM articles WHERE articles.title=' + "'" + titleToDelete + "'";
    var deleteQuery = 'DELETE FROM articles WHERE articles.title =' + "'" + titleToDelete + "'";

    db.query(selectQuery)
    .then(function(article){
      if (article[0].title === titleToDelete){
        return db.query(deleteQuery)
      }
    })
    .catch(function(error){
      console.error(error, 'this is an error inside the model');
    })
  };


  return {
    all : _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    deleteByTitle: _deleteByTitle
  }
})();