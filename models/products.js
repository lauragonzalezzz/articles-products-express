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

    return db.query('INSERT INTO products (name, price, inventory) values ($1, $2, $3)', [productData.name, productData.price, productData.inventory])
    .catch(function(err){
        console.error(err);
      });
  };

  _getById = function(data){
    var idNum = data;
    return db.query('SELECT * FROM products WHERE id =$1', [idNum]);
  };

  _editById = function(data){
    var updatedData = data;

    return db.none('UPDATE products SET name=$1, price=$2, inventory=$3 WHERE name=$4', [updatedData.name, updatedData.price, updatedData.inventory, updatedData.name])
    .catch(function(err){
        console.error(err);
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