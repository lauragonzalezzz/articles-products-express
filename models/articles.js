var fs = require('fs');

module.exports = (function(data){

  _all = function(cb){
    fs.readFile('./db/articles.js', function(err, data){
      if (err){
        return cb(err);
      }
      var myData = JSON.parse(data.toString());
      return cb(null, myData);
    });
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
  };

  _getByTitle = function(data, cb){
    var titleUrl = data;

    fs.readFile('./db/articles.js', function(err, data){
      if (err){
        return cb(err);
      }
      var myData = JSON.parse(data.toString());
      var article = myData[titleUrl];
      return cb(null, article);
    });
  };

  _editByTitle = function(data, url, cb){

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
    var titleToDelete = data;

    fs.readFile('./db/articles.js', function(err, data){


      if (err){
        return cb(err);
      }
      var dbData = JSON.parse(data.toString());
      if (dbData.titleToDelete === undefined){
        return cb(new Error("No such title"));
      }
      delete dbData[titleToDelete];
      dbData = JSON.stringify(dbData);

      fs.writeFile('./db/articles.js', dbData, function(err){

        if (err) {
          return cb(err);
        }
        return cb();
      });
    });
  };


  return {
    all : _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    deleteByTitle: _deleteByTitle
  }
})();