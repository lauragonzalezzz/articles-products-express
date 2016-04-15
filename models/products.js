var fs = require('fs');

module.exports = (function(data){

  _all = function(){};

  _add = function(data){
    var productData = data;
    fs.readFile('./db/products.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        res.send({'success': false});
      }
      var id = "id" + productData.id;
      dbData[id] = productData;
      dbData = JSON.stringify(dbData);

      fs.writeFile('./db/products.js', dbData, function(err){

        if (err) {
          res.send({'success': false});
        }
      });
    });
  };

  _getById = function(){};

  _editById = function(data){

    var updatedData = data;
    var updatedId = "id" + updatedData.id;

    fs.readFile('./db/products.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        return res.send({'success': false});
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
          return res.send({'success': false});
        }

      });

    });
  };

  _deleteById = function(data){
    var productId = "id" + data;
    fs.readFile('./db/products.js', function(err, data){

      var dbData = JSON.parse(data.toString());

      if (err) {
        res.send(err);
      }
      delete dbData[productId];
      dbData = JSON.stringify(dbData);

      fs.writeFile('./db/products.js', dbData, function(err){

        if (err) {
          res.send({'success': false});
        }
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