var Item = Parse.Object.extend("Item", {
	initialize: function(attrs, options) {
		this.name = objName;
		this.price = objPrice;
		this.description = objDescription;
		this.username = user;
		this.rented = rented;
	}
	
	listItem: function(item) {
		var item = new Item();
                item.set("name", name);
                item.set("price", price);
                item.set("description", description);
                item.set("username", user);
                item.set("rented", rented);
        	
        	item.save(null, {
        		success: function(item) {
        			// item successfully saved
        		}
        		error: function(item, error) {
        			alert('Failed to add new item, with error code: ' + error.message);
        		}
        	});
	},
	
 	checkoutItem: function(itemID) {
 		
 	},
 	
 	checkinItem: function(itemID) {
 		
 	},
 	
	getItem: function(searchString) {
			
	}

	postReview: function(review, itemID) {
		
	},
	
	getReview: function(itemID) {
		
	},
});

		var user = new Parse.User();
		user.set("username", user);
    		user.set("password", password);
    		user.set("email", email);

    		user.signUp(null, {
			success: function(user) {
	        	// After user clicks link to confirm
	        	// Take user to different page
        		},
    			error: function(user, error) {
        			// Show the error message somewhere and let the user try again.
        			alert("Error: " + error.code + " " + error.message);
        		}
    		}
	
		Parse.User.logIn(user, password, {
			success: function(user) {
 			// Do stuff after successful login.
        		// Take user to different page
        		},
    			error: function(user, error) {
        			// The login failed. Check error to see why.
        		}
		}

function testObject() {
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}).then(function(object) {
	});
}

function testUser() {
	var user = new User();
	user.save({user: "student"}).then(function(object) {
	});
}

Parse.initialize("Tn3zdIeNZveir6giGyxWoMmW4PK2KGOk1tsZYg5D", "SEOr0YmRGbxa4dTqn5ifEXn5my5Uz2KWAJ2J9wG2");
testObject();
testUser();
