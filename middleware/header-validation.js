function headerVal(req, res, next){
  return function(req, res, next){
    console.log('heelo');
    if (req.headers.hasOwnProperty('version') && req.headers['version'] === '1.0'){
      next();
    }
    else {
      res.send({"success" : false});
    };
  };
};

module.exports = headerVal;