
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('register', { title: "Register" });
};

exports.confirm = function(req, res){
	var userID = req.query.userID;

//	parseAPI.confirmUser(userID);

	res.cookie('userID', userID, { maxAge: 900000, httpOnly: true});
	res.redirect("/");
}
