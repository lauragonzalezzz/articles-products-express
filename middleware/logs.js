function logModule(req, res, next){
  var date = new Date().toString();
  var index = date.indexOf('2016') + 4;
  date = date.slice(0, index);

  var log = {
    "method" : req.method,
    "url" : req.url,
    "headers" : req.headers,
    "date" : date
  }

  next();
};

module.exports = logModule;