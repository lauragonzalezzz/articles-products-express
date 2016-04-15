function logModule(req, res, next){
  console.log('req',req.params);
  next();
};

module.exports = logModule;