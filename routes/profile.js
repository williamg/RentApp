var parseAPI = require('../public/js/parseAPI.js');
/*
 * GET home page.
 */

exports.index = function(req, res){
  var userID = req.query.id;
  parseAPI.itemsOfUser(userID, function(collection) {
	if(collection == undefined)
		return;
	
	parseAPI.getUser(userID, function(user) {
			res.render('profile', { title: "Profile", items: collection, user: user,  userID: userID});
		});
	});
};
