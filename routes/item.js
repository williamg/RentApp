var parseAPI = require("../public/js/parseAPI.js");
/*
 * GET home page.
 */

exports.index = function(req, res){
	var itemID = req.query.id;
	var item = parseAPI.getItem(itemID, function(item){
		var userID = req.cookies.userID;
		if(userID === undefined) {
			res.redirect("/login");
			return;
		}

		parseAPI.getUserEmail(item.attributes.user, function(email) {
			res.render('item', {
				title: item.attributes.name,
				belongsToUser: userID == item.attributes.user,
				item: item,
				email: email,
				userID: userID
			});
		});
		
	});
};
