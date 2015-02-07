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
var upload = document.getElementById("upload");
var photoFile = undefined;

if(userID === undefined) location = "/login";

form.onsubmit = function(e) {
	e.preventDefault();
	
	var name = document.getElementById("name").value;
	var price = document.getElementById("price").value;
	var description = document.getElementById("description").value;

	if(photoFile === undefined) {
		alert("You forgot to select a photo!");
		return;
	}

	var item = {
		name: name,
		price: price,
		description: description,
		user: userID,
		image: photoFile
	};

	var itemID = parseAPI.listItem(item, function(itemID) {
		if(itemID)
			location = "/";
	});
}

upload.onclick = function(e) {
	e.preventDefault();

	var fileSelect = document.getElementById("file");
	var file = fileSelect.files[0];
	var name = "listPhoto." + (fileSelect.value.split("."))[1];

	parseAPI.uploadImage(file, name, function(parseFile) {
		photoFile = parseFile;

		var imgSec = document.getElementById("image");
		imgSec.innerHTML = '<img src="' + photoFile.url() + '" />' + imgSec.innerHTML;
	});
}
