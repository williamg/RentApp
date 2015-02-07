
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('register', { title: "Register" });
};

exports.confirm = function(req, res){
	res.render('confirm', { title: "Confirm" });
}
