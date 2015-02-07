var parseAPI  = {
	createUser: function(user, callback) {
		var userObj = new Parse.User();
		userObj.set("name", user.name);
		userObj.set("username", user.email);
		userObj.set("password", user.password);
		userObj.set("email", user.email);
		userObj.set("photo", user.photo);

		userObj.signUp(null, {
			success: function(user) {
				callback();
			},
			error: function(user, error) {
			   console.log("Error: " + error.code + " " + error.message);
			   callback();
			}
		});
	},
	
	loginUser: function(user, callback) {
		Parse.User.logIn(user.email, user.password, {
			success: function(user) {
				callback(user.id);
			},
			error: function(user, error) {
				console.log("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	getUser: function(userID, callback) {
		var query = new Parse.Query(Parse.User);
		query.get(userID, {
			success: function(user) {
				callback(user);
			},
			error: function(user, error) {
				console.log("Error: " + error.code + " " + error.message);
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
				console.log("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	getUserName: function(userID, callback) {
		var query = new Parse.Query(Parse.User);
		query.get(userID, {
			success: function(user) {
				callback(user.attributes.name);
			},
			error: function(user, error) {
				console.log("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	postReview: function(itemID, review, callback) {
		var Review = Parse.Object.extend("Review");
		var reviewObj = new Review();
		reviewObj.set("item", itemID);
		reviewObj.set("content", review);
		reviewObj.save(null, {
			success: function() {
				callback();
			},
			error: function(review, error) {
				console.log("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	getReviews: function(itemID, callback) {
		var Review = Parse.Object.extend("Review");
		var ReviewCollection = Parse.Collection.extend({
			model: Review,
			query: (new Parse.Query(Review)).equalTo("item", itemID)
		});
		var reviews = new ReviewCollection();
		reviews.fetch({
			success: function(collection) {
				callback(collection.models);
			 },
			error: function(collection, error) {
				console.log("Error: " + error.code + " " + error.message);
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
		itemObj.set("image", item.image);
		itemObj.set("rented", false);

		itemObj.save(null, {
			success: function(item) {
				callback(item.id);
			},
			error: function(item, error) {
				console.log("Error: " + error.code + " " + error.message);
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
				console.log("Error: " + error.code + " " + error.message);
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
			error: function(item, error) {
				console.log("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	updateItem: function(item) {
		this.getItem(item.id, function(itemObj) {
			itemObj.set("name", item.name);
			itemObj.set("price", item.price);
			itemObj.set("description", item.description);

			if(item.image !== undefined)
				itemObj.set("image", item.image);

			itemObj.save();
		});
	},

	deleteItem: function(itemID) {
		this.getItem(itemID, function(itemObj) {
			itemObj.destroy({
				success: function() {},
				error: function() {
					console.log("Error: " + error.code + " " + error.message);
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
				query: (new Parse.Query(Item).equalTo("rented", false))
			});
			items = new AllItems();
		} else {
			var MatchingItems = Parse.Collection.extend({
				model: Item,
				query: (new Parse.Query(Item).containsAll("namelist", searchQuery.split(" ")).equalTo("rented", false))
			});
			items = new MatchingItems();
		}

		items.fetch({
			success: function(collection) {
				callback(collection.models);
			},
			error: function(collection, error) {
				console.log("Error: " + error.code + " " + error.message);
				callback(undefined);
			}
		});
	},

	uploadImage: function(file, name, callback) {
		var photo = new Parse.File(name, file);
		photo.save().then(function() {
			callback(photo);
		}, function(error) {
			console.log("Error: " + error.code + " " + error.message);
			callback(undefined);
		});
	}

}

if(typeof window === 'undefined') {
	Parse = require("parse").Parse;
	module.exports = parseAPI;
}

Parse.initialize("Tn3zdIeNZveir6giGyxWoMmW4PK2KGOk1tsZYg5D", "SEOr0YmRGbxa4dTqn5ifEXn5my5Uz2KWAJ2J9wG2");
