var parseAPI = require("../public/js/parseAPI.js");
/*
 * GET home page.
 */

exports.index = function(req, res){
	var searchQuery = req.query.query;
	parseAPI.getListings(searchQuery, function(listings) {
		if(listings === undefined) {
			res.redirect("/login");
			return;
		}
		var userID = req.cookies.userID;
		console.log(userID);
		parseAPI.getUser(userID, function(user) {
			if(user === undefined || !user.attributes.emailVerified) {
				res.redirect("/login");
				return;
			}

			res.render('index', { title: 'ShareIt!', userID: userID, listings: listings });

		});

	});
};
