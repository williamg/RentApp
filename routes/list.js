
/*
 * GET home page.
 */

exports.index = function(req, res){
	var userID = req.cookies.userID;
  res.render('list', { title: 'List an Item', userID: userID });
};
