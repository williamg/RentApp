window.onload = function() {

	// SUCH HACKY VERY BAD
	if(document.getElementsByTagName("form").length > 0) {
	var form = document.getElementsByTagName("form")[0];
	var del = document.getElementById("delete");
	var id = document.getElementById("id").value;
	var check = document.getElementById("check");
	var photoFile = undefined;

	var imageForm = document.getElementsByTagName("form")[1];
	var upload = document.getElementById("upload");


	form.onsubmit = function(e) {
		e.preventDefault();
		
		var name = document.getElementById("name").value;
		var price = document.getElementById("price").value;
		var description = document.getElementById("description").value;

		var item = {
			id: id,
			name: name,
			price: price,
			description: description,
			image: photoFile
		};

		parseAPI.updateItem(item);
		document.title = name;
	};

	del.onclick = function() {
		parseAPI.deleteItem(id);
		location = "/";
	};

	check.onclick = function() {
		parseAPI.toggleCheckout(id, function() {

			if(check.innerHTML == "Check out")
				check.innerHTML = "Check in";
			else check.innerHTML = "Check out";

		});
	};

	upload.onclick = function(e) {
		e.preventDefault();

		var fileSelect = document.getElementById("file");
		var file = fileSelect.files[0];
		var name = "listPhoto." + (fileSelect.value.split("."))[1];

		parseAPI.uploadImage(file, name, function(parseFile) {
			photoFile = parseFile;

			var img = document.getElementsByTagName("img")[0];
			img.src = photoFile.url();

		});
	};

	} else {
		var reviewBtn = document.getElementById("review");

		reviewBtn.onclick = function() {
			var review = document.getElementsByTagName("textarea")[0].value
			var itemID = document.getElementById("content").getAttribute("data-id");
			parseAPI.postReview(itemID, review, function() {
				location.reload();
			});
		};
	}

};
