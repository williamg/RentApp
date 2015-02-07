var parseAPI = require('../public/js/parseAPI.js');
/*
 * GET home page.
 */

exports.index = function(req, res){
  var userID = req.query.id;
  parseAPI.itemsOfUser(userID, function(collection) {
	if(collection == undefined)
		return;

	console.log(collection);
	res.render('profile', { title: "Profile", items: collection, userID: userID});
  });
};
