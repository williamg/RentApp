function authed() {
	var cookies = document.cookie;
	return cookies.indexOf("userID=") >= 0;
}

window.onload = function() {
	if(!authed()) location = "/login";

	var searchBox = document.getElementById("searchbox");
	var searchButton = document.getElementById("searchbutton");

	searchButton.onclick = function() {
		if(searchBox.value != "") {
			location = "/?query=" + searchBox.value.toLowerCase();
		}
	}
}
