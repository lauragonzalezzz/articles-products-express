function validation(reqObj){
  return function(req, res, next){
    for (key in reqObj){
      if (!req.body.hasOwnProperty(key) || typeof req.body[key] !== reqObj[key]){
        return res.send({"success" : false, "error" : "does not have property " + key});
      }
    }
    next();
    }
  };

module.exports = validation;