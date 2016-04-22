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

    return db.query('INSERT INTO articles (title, body, author, urltitle) values ($1, $2, $3, $4)', [article.title, article.body, article.author, article.urlTitle])
    .catch(function(err){
      console.log(err);
    })
  };

  _getByTitle = function(data){
    var titleUrl = data;
    return db.query('SELECT * FROM articles WHERE title =$1', [titleUrl]);
  };

  _editByTitle = function(data, url){
    var updatedArticle = data;
    var oldTitle = decodeURIComponent(url);
    var newUrlTitle = encodeURIComponent(updatedArticle.title);
    updatedArticle['urlTitle'] = newUrlTitle;

    db.none('UPDATE articles SET title=$1, body=$2, author=$3, urltitle=$4 WHERE title=$5', [updatedArticle.title, updatedArticle.body, updatedArticle.author, updatedArticle.urlTitle, oldTitle])
    .catch(function(err){
      if (err){
        console.error(err);
      }
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