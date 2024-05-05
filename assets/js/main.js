/// Sort By Button Function
document.addEventListener("click", (e) => {
	const isDropdownButton = e.target.matches("[data-dropdown-button]");

	if (!isDropdownButton && e.target.closest("[data-dropdown]") != null)
		return;

	let currentDropdown;
	if (isDropdownButton) {
		currentDropdown = e.target.closest("[data-dropdown]");
		currentDropdown.classList.toggle("active");
	}

	document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
		if (dropdown === currentDropdown) return;
		dropdown.classList.remove("active");
	});
});

// Load JSON
var http = new XMLHttpRequest();
http.open("GET", "room.json", true);
http.send();
http.onload = function () {
	// Checking for status
	if (this.readyState == 4 && this.status == 200) {
		// if successful
		var jsonText = http.responseText;
		var room = JSON.parse(jsonText);

		// empty var to add incoming data
		var output = "";
		console.log(room);
		display(room);
	}
};

// Need a function to process the JSON data
//

const rooms = JSON.parse();
