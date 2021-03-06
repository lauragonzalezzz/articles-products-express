function headerVal(req, res, next){
  return function(req, res, next){
    if (req.headers.hasOwnProperty('version') && req.headers['version'] === '1.0'){
      next();
    }
    else {
      res.send({"success" : false, "error" : "Needs version header"});
    };
  };
};

module.exports = headerVal;