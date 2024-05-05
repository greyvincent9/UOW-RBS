/*=============== HOME ===============*/

// Set Date
const datePicker = document.getElementById("searchDate");
var today = new Date();
var formattedDate = today.toISOString().split("T")[0];
datePicker.value = formattedDate;
datePicker.min = formattedDate;
let maxDate = new Date();
maxDate.setDate(today.getDate() + 20);

let formattedMaxDate = maxDate.toISOString().split("T")[0];

datePicker.max = formattedMaxDate;

/*=============== SELECT ROOM ===============*/
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
	var jsonText, room;
	// Checking for status
	if (this.readyState == 4 && this.status == 200) {
		// if successful
		jsonText = http.responseText;
		room = JSON.parse(jsonText);

		// empty var to add incoming data
		var output = "";
		console.log(room);

		// display(room);

		// Home Location Select
		addSelectOption(room);
	}
};

function addSelectOption(room) {
	var locationSelect = document.getElementById("search-location-input");
	var uniqueLocations = [];

	for (let i = 0; i < room.length; i++) {
		let roomLocation = room[i].location;

		// Check location
		if (!uniqueLocations.includes(roomLocation)) {
			uniqueLocations.push(roomLocation);
		}
	}
	console.log(uniqueLocations);
	uniqueLocations.sort();
	console.log(uniqueLocations);
	for (let j = 0; j < uniqueLocations.length; j++) {
		var locationE = document.createElement("option");
		console.log("hello");
		locationE.innerText = uniqueLocations[j];
		locationSelect.appendChild(locationE);
	}
}

// }

// Set Location Options

function display(room) {
	var totalPrice = 0;
	var searchResultColDiv = document.getElementById("searchResultColumn");

	// for each room, display

	for (let i = 0; i < room.length; i++) {
		// for each rom create a div
		var roomDiv = document.createElement("div");
		roomDiv.className = "room";

		var img = new Image();
		img.src = room[i].image;
		img.alt = "room image";
		roomDiv.appendChild(img);

		var roomDescriptionSecondColDiv = document.createElement("div");
		roomDescriptionSecondColDiv.className = "roomDescriptionSecondCol";

		// Room Name
		var roomName = document.createElement("h1");
		roomName.textContent = room[i].name;
		roomDescriptionSecondColDiv.appendChild(roomName);

		// Room Description Container
		var roomDescriptionContainer = document.createElement("div");
		roomDescriptionContainer.id = "roomDescriptionContainer";

		// Location
		var roomDescriptionDiv = document.createElement("div");
		roomDescriptionDiv.className = "roomDescription";
		var locationIcon = document.createElement("span");
		locationIcon.className = "material-icons";
		locationIcon.textContent = " location_on ";

		roomDescriptionDiv.appendChild(locationIcon);

		var locationText = document.createElement("span");
		locationText.innerHTML = "Location: " + room[i].location;

		roomDescriptionDiv.appendChild(locationText);

		roomDescriptionContainer.appendChild(roomDescriptionDiv);

		// Capacity
		roomDescriptionDiv = document.createElement("div");
		roomDescriptionDiv.className = "roomDescription";
		var capacityIcon = document.createElement("span");
		capacityIcon.className = "material-icons";
		capacityIcon.textContent = " group ";

		roomDescriptionDiv.appendChild(capacityIcon);

		var capacityText = document.createElement("span");
		capacityText.innerHTML =
			"Capacity: Up to " + room[i].capacity + " people";

		roomDescriptionDiv.appendChild(capacityText);

		roomDescriptionContainer.appendChild(roomDescriptionDiv);

		// Cost
		roomDescriptionDiv = document.createElement("div");
		roomDescriptionDiv.className = "roomDescription";
		var priceIcon = document.createElement("span");
		priceIcon.className = "material-icons";
		priceIcon.textContent = " attach_money ";

		roomDescriptionDiv.appendChild(priceIcon);

		var priceText = document.createElement("span");
		priceText.innerHTML = "Price: $" + room[i].price + "/hour";

		roomDescriptionDiv.appendChild(priceText);

		roomDescriptionContainer.appendChild(roomDescriptionDiv);
		roomDescriptionSecondColDiv.appendChild(roomDescriptionContainer);

		roomDiv.appendChild(roomDescriptionSecondColDiv);

		searchResultColDiv.appendChild(roomDiv);
	}
}
