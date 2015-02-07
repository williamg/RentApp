function getUserID() {
	var obj = document.cookie.split(";");

	for(var i = 0; i < obj.length; i++) {
		if(obj[i].indexOf("userID") >= 0) {
			var pair = obj[i].split("=");
			return pair[1];
		}
	}


	return undefined;
}

var userID = getUserID();
var form = document.getElementsByTagName("form")[0];

if(userID === undefined) location = "/login";

form.onsubmit = function(e) {
	e.preventDefault();
	
	var name = document.getElementById("name").value;
	var price = document.getElementById("price").value;
	var description = document.getElementById("description").value;

	var item = {
		name: name,
		price: price,
		description: description,
		user: userID
	};

	var itemID = parseAPI.listItem(item, function(itemID) {
		if(itemID)
			location = "/";
	});
}

