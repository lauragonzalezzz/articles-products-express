var fs = require('fs');
var pgp = require('pg-promise')();
var dbConn = require('../private.json');
var db = pgp(dbConn);

module.exports = (function(data){

  _all = function(cb){
    return db.query('SELECT * FROM products')
  };

  _add = function(data, cb){

    var productData = data;

    return db.query('INSERT INTO products (id, name, price, inventory) values ($1, $2, $3, $4)', [productData.id, productData.name, productData.price, productData.inventory])
    .catch(function(err){
      if (err){
        console.error(err);
      }
    })
    // fs.readFile('./db/products.js', function(err, data){

    //   var dbData = JSON.parse(data.toString());

    //   if (err) {
    //     return cb(err);
    //   }
    //   var id = "id" + productData.id;
    //   dbData[id] = productData;
    //   dbData = JSON.stringify(dbData);

    //   fs.writeFile('./db/products.js', dbData, function(err){

    //     if (err) {
    //       return cb(err);
    //     }
    //     return cb();
    //   });
    // });
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
    var productId = data;

    db.query('SELECT * FROM products WHERE products.id=' + productId)
    .then(function(product){
      if (product[0].id == productId){
        return db.query('DELETE FROM products WHERE products.id=$1', [productId])
      }
      else {
        console.log('Error: Product ' + productId + ' does not exist');
      }
    })
    .catch(function(error){
      console.error(error, 'this is an error inside the model');
    })
  };


  return {
    all : _all,
    add: _add,
    getById: _getById,
    editById: _editById,
    deleteById: _deleteById
  }
})();