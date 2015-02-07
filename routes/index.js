var parseAPI = require("../public/js/parseAPI.js");
/*
 * GET home page.
 */

exports.index = function(req, res){
	var searchQuery = req.query.query;
	console.log(searchQuery);
	var listings = parseAPI.getListings(searchQuery, function(listings) {
		var userID = req.cookies.userID;
		res.render('index', { title: 'SITE NAME', userID: userID, listings: listings });
	});
};
