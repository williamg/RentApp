var parseAPI = require("../public/js/parseAPI.js");
/*
 * GET home page.
 */

exports.index = function(req, res){
	var itemID = req.query.id;
	parseAPI.getItem(itemID, function(item){
		var userID = req.cookies.userID;
		if(userID === undefined) {
			res.redirect("/login");
			return;
		}
		parseAPI.getUser(userID, function(user) {

			if(!user.attributes.emailVerified) {
				res.redirect("/login");
				return;
			}

			if(item === undefined){
				res.redirect("/");
				return;
			}

			parseAPI.getUserEmail(item.attributes.user, function(email) {
				parseAPI.getReviews(itemID, function(reviews) {
					res.render('item', {
						title: item.attributes.name,
						belongsToUser: userID == item.attributes.user,
						item: item,
						reviews: reviews,
						email: email,
						userID: userID
					});
				});
			});
			
		});
	});
};
