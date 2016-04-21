function validation(reqObj){
  return function(req, res, next){
    console.log(req.body);
    for (key in reqObj){
      if (!req.body.hasOwnProperty(key)){
        return res.send({"success" : false, "error" : "does not have property " + key});
      }
      if (typeof req.body[key] !== reqObj[key]){
        if (isNaN(req.body[key] === true)){
          return res.send({"success" : false, "error" : key + " should be a number"})
        }
      }
    }
    next();
    }
  };

module.exports = validation;