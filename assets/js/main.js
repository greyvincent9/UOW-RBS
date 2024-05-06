/*=============== HOME ===============*/

// Set Date
var currentPage = window.location.pathname;

if (currentPage === "/index.html" || currentPage === "/viewRoom.html") {
	const datePicker = document.getElementById("searchDate");
	var today = new Date();
	var formattedDate = today.toISOString().split("T")[0];
	datePicker.value = formattedDate;
	datePicker.min = formattedDate;
	let maxDate = new Date();
	maxDate.setDate(today.getDate() + 20);

	let formattedMaxDate = maxDate.toISOString().split("T")[0];

	datePicker.max = formattedMaxDate;
}

/*=============== PAGE INDICATIOR ===============*/
console.log(currentPage);

if (currentPage === "/viewRoom.html") {
	document.getElementById("reviewPageIndicator").style.opacity = "40%";
	document.getElementById("paymentPageIndicator").style.opacity = "40%";
} else if (currentPage === "/reviewPage.html") {
	console.log(currentPage);
	document.getElementById("roomPageIndicator").style.opacity = "40%";
	document.getElementById("paymentPageIndicator").style.opacity = "40%";
} else if (currentPage === "/payment.html") {
	console.log(currentPage);
	document.getElementById("roomPageIndicator").style.opacity = "40%";
	document.getElementById("reviewPageIndicator").style.opacity = "40%";
}

/*=============== PAGE INDICATIOR ===============*/

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

		display(room);

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
const roomCardTemplate = document.querySelector("#roomCardTemplate");
const roomPageContainer = document.querySelector("#viewRoomPageContainer");
const date = new Date();
const formattedD = date.toISOString().split("T")[0];

fetch("./room.json")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((room) => {
			const roomCard = roomCardTemplate.content.cloneNode(true);
			const img = roomCard.querySelector("img");
			const roomName = roomCard.querySelector(".roomName");
			const roomCapacity = roomCard.querySelector(".roomCapacity");
			const roomLocation = roomCard.querySelector(".roomLocation");
			const roomPrice = roomCard.querySelector(".roomPrice");
			const timeSlot = roomCard.querySelector(".timeSlot");

			img.src = room.image;
			img.alt = "room image";
			roomName.textContent = room.name;
			roomLocation.textContent = room.location;
			roomCapacity.textContent = room.capacity;
			roomPrice.textContent = room.price + ".00";

			var timings = Object.keys(room.availability[formattedD]);
			console.log("this is: " + timings);
			const roomDescriptionThirdCol = roomCard.querySelector(
				".roomDescriptionThirdCol"
			);

			timings.forEach((timing) => {
				if (!timing.booked) {
					/* 
					const clonedButton = roomCard.querySelector(".timeSlot");

					// // Set the button text to the timing
					// clonedButton.textContent = timing;
					clonedButton.textContent = timing;
					// Append the cloned button to the roomDescriptionThirdCol element
					roomDescriptionThirdCol.appendChild(clonedButton);*/
					const button = document.createElement("button");
				}
			});

			roomPageContainer.append(roomCard);
			console.log(img);
		});
	});

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
