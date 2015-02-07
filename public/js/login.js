var form = document.getElementsByTagName("form")[0];

form.onsubmit = function(e) {
	e.preventDefault();
	
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	var user = {
		email: email,
		password: password
	};

	var userID = parseAPI.loginUser(user, function(userID) {
		console.log(userID);

		if(userID) {
			var expiry = new Date();
			expiry.setTime(expiry.getTime() + 1000000);
			document.cookie="userID=" + userID + "; expires=" + expiry.toUTCString();
			console.log(document.cookie);

			window.location = "/";
		}
	});
}

