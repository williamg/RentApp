var parseAPI = {
	// Creates a new user on the Parse API
	// user is a javascript object:
	// user = {name: "John Doe", email: "jdoe@email.com", password: "password"}
	createUser: function(user) {

	},

	loginUser: function(user) {

	},
};

function testObject() {
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}).then(function(object) {
	});
}

Parse.initialize("Tn3zdIeNZveir6giGyxWoMmW4PK2KGOk1tsZYg5D", "SEOr0YmRGbxa4dTqn5ifEXn5my5Uz2KWAJ2J9wG2");
testObject();
