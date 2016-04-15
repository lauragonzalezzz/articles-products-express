var fs = require('fs');

module.exports = (function(data){

  _all = function(cb){
    fs.readFile('./db/products.js', function(err, data){
      if (err){
        return cb(err);
      }

      var myData = JSON.parse(data.toString());
      return cb(null, myData);
    });
  };

  _add = function(data, cb){
    var productData = data;
    fs.readFile('./db/products.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        return cb(err);
      }
      var id = "id" + productData.id;
      dbData[id] = productData;
      dbData = JSON.stringify(dbData);

      fs.writeFile('./db/products.js', dbData, function(err){

        if (err) {
          return cb(err);
        }
        return cb();
      });
    });
  };

  _getById = function(data, cb){
    var idNum = data;

    fs.readFile('./db/products.js', function(err, data){
      if (err){
        return cb(err);
      }

      var myData = JSON.parse(data.toString());
      var productToEdit = myData[idNum];
      return cb(null, productToEdit);
    });
  };

  _editById = function(data, cb){

    var updatedData = data;
    var updatedId = "id" + updatedData.id;

    fs.readFile('./db/products.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        return cb(err);
      }

      var storedObj = dbData[updatedId];
      if (updatedData.hasOwnProperty('name')){
        storedObj.name = updatedData.name
      }
      if (updatedData.hasOwnProperty('price')){
        storedObj.price = updatedData.price
      }
      if (updatedData.hasOwnProperty('inventory')){
        storedObj.inventory = updatedData.inventory
      }

      dbData = JSON.stringify(dbData);

      fs.writeFile('./db/products.js', dbData, function(err){

        if (err) {
          return cb(err);
        }

        cb();
      });

    });
  };

  _deleteById = function(data, cb){
    var productId = "id" + data;
    fs.readFile('./db/products.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        return cb(err);
      }
      delete dbData[productId];
      dbData = JSON.stringify(dbData);

      fs.writeFile('./db/products.js', dbData, function(err){

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
    getById: _getById,
    editById: _editById,
    deleteById: _deleteById
  }
})();