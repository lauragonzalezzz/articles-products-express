var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

function logModule(req, res, next){
  var date = new Date().toString();
  var splicePoint = date.lastIndexOf(':') + 3;
  date = date.slice(0, splicePoint);

  var log = {
    "date" : date,
    "method" : req.method,
    "url" : req.url,
    "headers" : req.headers
  }
  log = JSON.stringify(log, null, 2);
  var index = date.indexOf(':');
  var logDate = date.slice(0, index -3)
  logDate = logDate.split(' ').join('-');

  fs.appendFile('./logs/' + logDate + '.log', log, function(err){
    if (err){
      return res.send({"success" : false, "error" : "Could not write to log date file" });
    }
    next();
  });
};

module.exports = logModule;