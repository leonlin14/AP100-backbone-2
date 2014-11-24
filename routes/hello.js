
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('hello');
};

exports.hi = function(req, res){
  res.render('hi');
};