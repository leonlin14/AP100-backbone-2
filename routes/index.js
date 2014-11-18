
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hello' });
};
/*
exports.post = function(req, res){
  res.render('post', { title: 'Hello' });
};
*/