var parseAPI  = {
	createUser: function(user) {
		var userObj = new Parse.User();
		userObj.set("name", user.name);
		userObj.set("username", user.email);
		userObj.set("password", user.password);
		userObj.set("email", user.email);

		userObj.signUp(null, {
			success: function(user) {
				document.cookie="userID=" + user.id + "; expires=10000";
				return user.id;
			},
			error: function(user, error) {
			   alert("Error: " + error.code + " " + error.message);
			   return undefined;
			}
		});
	},
	
	loginUser: function(user, callback) {
		Parse.User.logIn(user.email, user.password, {
			success: function(user) {
				console.log(user.id);
				document.cookie="userID=" + user.id + "; expires=10000";
				callback(user.id);
			},
			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	getUserEmail: function(userID, callback) {
		var query = new Parse.Query(Parse.User);
		query.get(userID, {
			success: function(user) {
				callback(user.attributes.email);
			},
			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	listItem: function(item, callback) {
		var Item = Parse.Object.extend("Item");
		var itemObj = new Item();

		itemObj.set("name", item.name);
		itemObj.set("namelist", item.name.toLowerCase().split(" "));
		itemObj.set("price", item.price);
		itemObj.set("description", item.description);
		itemObj.set("user", item.user);
		itemObj.set("rented", false);

		itemObj.save(null, {
			success: function(item) {
				callback(item.id);
			},
			error: function(item, error) {
				alert("Error: " + error.code + " " + error.message);
				callback(undefined);
			},
		});
	},

	toggleCheckout: function(itemID, callback) {
		this.getItem(itemID, function(itemObj) {
			itemObj.set("rented", !itemObj.attributes.rented);
			itemObj.save();

			callback();
		});
	},

	itemsOfUser: function(userID, callback) {
		var Item = Parse.Object.extend("Item");
		var ItemCollection = Parse.Collection.extend({
			model: Item,
			query: (new Parse.Query(Item)).equalTo("user", userID)
		});
		var items = new ItemCollection();
		items.fetch({
			success: function(collection) {
				callback(collection.models);
			 },
			error: function(collection, error) {
				alert("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	getItem: function(itemID, callback) {
		var Item = Parse.Object.extend("Item");
		var query = new Parse.Query(Item);
		query.get(itemID, {
			success: function(item) {
				callback(item);
			},
			error: function(item) {
				alert("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	updateItem: function(item) {
		this.getItem(item.id, function(itemObj) {
			itemObj.set("name", item.name);
			itemObj.set("price", item.price);
			itemObj.set("description", item.description);
			itemObj.save();
		});
	},

	deleteItem: function(itemID) {
		this.getItem(itemID, function(itemObj) {
			itemObj.destroy({
				success: function() {},
				error: function() {
					alert("Error: " + error.code + " " + error.message);
					callback(undefined);

				}
			});
		});
	},

	getListings: function(searchQuery, callback) {
		var Item = Parse.Object.extend("Item");
		var items;
		if(searchQuery === undefined) {
			var AllItems = Parse.Collection.extend({
				model: Item,
				query: (new Parse.Query(Item).equalTo("rented", "false");
			});
			items = new AllItems();
		} else {
			var MatchingItems = Parse.Collection.extend({
				model: Item,
				query: (new Parse.Query(Item).containsAll("namelist", searchQuery.split(" ")).equalTo("rented", "false")
			});
			items = new MatchingItems();
		}

		items.fetch({
			success: function(collection) {
				callback(collection.models);
			},
			error: function(collection, error) {
				alert("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

}

if(typeof window === 'undefined') {
	Parse = require("parse").Parse;
	module.exports = parseAPI;
}

Parse.initialize("Tn3zdIeNZveir6giGyxWoMmW4PK2KGOk1tsZYg5D", "SEOr0YmRGbxa4dTqn5ifEXn5my5Uz2KWAJ2J9wG2");
