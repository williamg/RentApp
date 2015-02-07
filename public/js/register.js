var form = document.getElementsByTagName("form")[0];

function sendConfirmationEmail(user, userID) {
		
}

form.onsubmit = function(e) {
	e.preventDefault();
	
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var passwordConfirm = document.getElementById("confirm").value;

	if (password != passwordConfirm) {
		alert("Passwords don't match!");
		return;
	}

	var user = {
		name: name,
		email: email,
		password: password
	};

	// createUser should return the ID of the newly created user
	var userID = parseAPI.createUser(user);
	sendConfrimationEmail(user, userID);

	console.log(user);
}

