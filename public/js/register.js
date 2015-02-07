var form = document.getElementsByTagName("form")[0];

form.onsubmit = function(e) {
	e.preventDefault();
	
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var passwordConfirm = document.getElementById("confirm").value;
	var photo = document.getElementById("profpic");

	if (password != passwordConfirm) {
		alert("Passwords don't match!");
		return;
	}

	var file = photo.files[0];
	var fname = "listPhoto." + (photo.value.split("."))[1];
	var photoFile;

	parseAPI.uploadImage(file, fname, function(parseFile) {

		var user = {
			name: name,
			email: email,
			password: password,
			photo: parseFile
		};

		// createUser should return the ID of the newly created user
		var userID = parseAPI.createUser(user, function() {
			var expiry = new Date();
			expire = (expiry.getTime() + 10*24*60*60*1000);
			document.cookie="userID=" + user.id + "; expires=" + expiry.toUTCString();
			location="/confirm";
		});

	});
}

