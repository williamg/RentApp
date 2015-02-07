function authed() {
	var cookies = document.cookie;
	return cookies.indexOf("userID=") >= 0;
}

window.onload = function() {
	if(!authed()) location = "/login";

	var searchBox = document.getElementById("searchbox");
	var searchButton = document.getElementById("searchbutton");
	var logout = document.getElementById("logout");

	searchButton.onclick = function() {
		if(searchBox.value != "") {
			location = "/?query=" + searchBox.value.toLowerCase();
		}
	}

	logout.onclick = function() {
		document.cookie = "userID=NA; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		window.location="/login";
	}
}
