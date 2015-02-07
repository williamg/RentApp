window.onload = function() {

	var form = document.getElementsByTagName("form")[0];
	var del = document.getElementById("delete");
	var id = document.getElementById("id").value;
	var check = document.getElementById("check");

	form.onsubmit = function(e) {
		e.preventDefault();
		
		var name = document.getElementById("name").value;
		var price = document.getElementById("price").value;
		var description = document.getElementById("description").value;

		var item = {
			id: id,
			name: name,
			price: price,
			description: description
		};

		parseAPI.updateItem(item);
		document.title = name;
	};

	del.onclick = function() {
		parseAPI.deleteItem(id);
		location = "/";
	}

	check.onclick = function() {
		parseAPI.toggleCheckout(id, function() {

			if(check.innerHTML == "Check out")
				check.innerHTML = "Check in";
			else check.innerHTML = "Check out";

		});
	}

};
