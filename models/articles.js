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
  }; //DONE

  _getByTitle = function(data, cb){
    var idNum = data;

    fs.readFile('./db/articles.js', function(err, data){
      if (err){
        return cb(err);
      }

      var myData = JSON.parse(data.toString());
      var productToEdit = myData[idNum];
      return cb(null, productToEdit);
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
      delete dbData[oldUrl];
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
    var productId = "id" + data;
    fs.readFile('./db/articles.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        return cb(err);
      }
      delete dbData[productId];
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