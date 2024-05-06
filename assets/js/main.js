/*=============== HOME ===============*/
// Submit Search Button
var currentPage = window.location.pathname;

function searchRoom() {
	alert("1111");
	const searchLocationInput = document.getElementById(
		"search-location-input"
	);
	const searchDateInput = document.getElementById("searchDate");
	const selectedLocation = searchLocationInput.value;
	const selectedDate = searchDateInput.value;
	console.log(selectedLocation);

	// Validate selected date
	if (!selectedDate) {
		alert("Please select a date");
		return;
	}

	// Get selected capacity (optional)
	const searchCapacityInput = document.getElementById(
		"search-capacity-input"
	);
	const selectedCapacity = searchCapacityInput.value;

	// Redirect to viewRoom.html with selected date and capacity as URL parameters
	window.location.href = `viewRoom.html?location=${selectedLocation}&date=${selectedDate}&capacity=${selectedCapacity}`;
}

const datePicker = document.getElementById("searchDate");
var today = new Date();
var formattedDate = today.toISOString().split("T")[0];
datePicker.value = formattedDate;
datePicker.min = formattedDate;
let maxDate = new Date();
maxDate.setDate(today.getDate() + 20);

let formattedMaxDate = maxDate.toISOString().split("T")[0];

datePicker.max = formattedMaxDate;

// View Room Page -- Load JSON

if (currentPage === "/viewRoom.html") {
	document.addEventListener("DOMContentLoaded", function () {
		// Get URL parameters
		const urlParams = new URLSearchParams(window.location.search);
		const selectedLocation = urlParams.get("location");
		const selectedDate = urlParams.get("date");
		const selectedCapacity = urlParams.get("capacity");

		// Fetch available rooms data based on the selected date and capacity
		fetchAvailableRooms(selectedLocation, selectedDate, selectedCapacity);

		// Hide rooms that does not match location

		// load json
		function fetchAvailableRooms(location, date, capacity) {
			fetch("./room.json")
				.then((res) => res.json())
				.then((data) => {
					rooms = data.map((room) => {
						const roomCard =
							roomCardTemplate.content.cloneNode(true);
						const img = roomCard.querySelector("img");
						const roomName = roomCard.querySelector(".roomName");
						roomName.id = room.name;
						const roomCapacity =
							roomCard.querySelector(".roomCapacity");
						const roomLocation =
							roomCard.querySelector(".roomLocation");
						const roomPrice = roomCard.querySelector(".roomPrice");
						const timeSlot = roomCard.querySelector(".timeSlot");

						img.src = room.image;
						img.alt = "room image";
						roomName.textContent = room.name;
						roomLocation.textContent = room.location;
						roomCapacity.textContent = room.capacity;
						roomPrice.textContent = room.price + ".00";

						var timings = Object.keys(
							room.availability[selectedDate]
						);

						const roomDescriptionThirdCol = roomCard.querySelector(
							".roomDescriptionThirdCol"
						);

						// Need a function to check available time with current date and time
						// if current time has past available time, don't show invalid time slots
						const availableTime = [];
						timings.forEach((timing) => {
							slot = room.availability[selectedDate][timing];
							// Extract the current hours and minutes
							// let currentHours = date.getHours();
							let currentHours = 0;
							// Get time slot hour
							let timeSlotHour = timing.split(":", 1);

							// Compare the hours
							if (timeSlotHour < 8) {
								timeSlotHour = parseInt(timeSlotHour) + 12;
								// Check if time slot is later than current
								// If time slot is later and room is not booked, create button
								if (
									timeSlotHour > currentHours &&
									!slot.booked
								) {
									availableTime.push(timing);
								}
							} else if (timeSlotHour == 12) {
								if (
									timeSlotHour > currentHours &&
									!slot.booked
								) {
									availableTime.push(timing);
								}
							} else {
								if (
									timeSlotHour > currentHours &&
									!slot.booked
								) {
									availableTime.push(timing);
								}
							}
						});

						availableTime.forEach((time) => {
							if (time.split(":", 1) < 7 || time === 12) {
								var timeSlotButton =
									document.createElement("button");
								var dataRoomName = "data-roomName";
								timeSlotButton.setAttribute(
									"data-roomName",
									room.name
								);
								timeSlotButton.setAttribute(
									"data-price",
									room.price
								);
								timeSlotButton.setAttribute("data-time", time);

								timeSlotButton.className = "timeSlot";
								timeSlotButton.textContent = time + " PM";
								roomDescriptionThirdCol.appendChild(
									timeSlotButton
								);
							} else {
								var timeSlotButton =
									document.createElement("button");
								var dataRoomName = "data-roomName";
								timeSlotButton.setAttribute(
									"data-roomName",
									room.name
								);
								timeSlotButton.setAttribute("data-time", time);
								timeSlotButton.setAttribute(
									"data-price",
									room.price
								);

								timeSlotButton.className = "timeSlot";
								timeSlotButton.textContent = time + " AM";
								roomDescriptionThirdCol.appendChild(
									timeSlotButton
								);
							}
						});

						if (availableTime.length == 0) {
							var noAvailableSlot =
								document.createElement("span");
							noAvailableSlot.textContent = "No available slot";
							roomDescriptionThirdCol.style = null;
							noAvailableSlot.style.width = "200px";
							roomDescriptionThirdCol.appendChild(
								noAvailableSlot
							);
						}
						roomPageContainer.append(roomCard);
					});
				});
		}
	});
}

// Set Location Options

// Fetch JSON and update viewRoom.html with data

// Use Room Template
const roomCardTemplate = document.querySelector("#roomCardTemplate");
const roomPageContainer = document.querySelector("#viewRoomPageContainer");

// const date = new Date(); // Try date
// const formattedDateISO = date.toISOString().split("T")[0];
// Use selectedDate

// Convert this into a function instead
// Call this when viewPage.html is loaded
/*
fetch("./room.json")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((room) => {
			

			const roomCard = roomCardTemplate.content.cloneNode(true);
			const img = roomCard.querySelector("img");
			const roomName = roomCard.querySelector(".roomName");
			roomName.id = room.name;
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

			var timings = Object.keys(room.availability[formattedDateISO]);
			console.log(timings);

			const roomDescriptionThirdCol = roomCard.querySelector(
				".roomDescriptionThirdCol"
			);

			// Need a function to check available time with current date and time
			// if current time has past available time, don't show invalid time slots
			const availableTime = [];
			timings.forEach((timing) => {
				slot = room.availability[formattedDateISO][timing];
				// Extract the current hours and minutes
				// let currentHours = date.getHours();
				let currentHours = 0;
				// Get time slot hour
				let timeSlotHour = timing.split(":", 1);

				// Compare the hours
				if (timeSlotHour < 8) {
					timeSlotHour = parseInt(timeSlotHour) + 12;
					// Check if time slot is later than current
					// If time slot is later and room is not booked, create button
					if (timeSlotHour > currentHours && !slot.booked) {
						availableTime.push(timing);
					}
				} else if (timeSlotHour == 12) {
					if (timeSlotHour > currentHours && !slot.booked) {
						availableTime.push(timing);
					}
				} else {
					if (timeSlotHour > currentHours && !slot.booked) {
						availableTime.push(timing);
					}
				}
			});

			availableTime.forEach((time) => {
				if (time.split(":", 1) < 7 || time === 12) {
					var timeSlotButton = document.createElement("button");
					var dataRoomName = "data-roomName";
					timeSlotButton.setAttribute("data-roomName", room.name);
					timeSlotButton.setAttribute("data-time", time);
					timeSlotButton.className = "timeSlot";
					timeSlotButton.textContent = time + " PM";
					roomDescriptionThirdCol.appendChild(timeSlotButton);
				} else {
					var timeSlotButton = document.createElement("button");
					var dataRoomName = "data-roomName";
					timeSlotButton.setAttribute("data-roomName", room.name);
					timeSlotButton.setAttribute("data-time", time);
					timeSlotButton.className = "timeSlot";
					timeSlotButton.textContent = time + " AM";
					roomDescriptionThirdCol.appendChild(timeSlotButton);
				}
			});

			if (availableTime.length == 0) {
				var noAvailableSlot = document.createElement("span");
				noAvailableSlot.textContent = "No available slot";
				roomDescriptionThirdCol.style = null;
				noAvailableSlot.style.width = "200px";
				roomDescriptionThirdCol.appendChild(noAvailableSlot);
			}

			roomPageContainer.append(roomCard);
		});
		locations.sort();
		locations.forEach((location) => {
			const locationSelect = document.getElementById(
				"search-location-input"
			);
			var locationE = document.createElement("option");

			locationE.innerText = location;
			locationSelect.appendChild(locationE);
		});
	});
	*/

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
// Load JSON
// var http = new XMLHttpRequest();
// http.open("GET", "room.json", true);
// http.send();
// http.onload = function () {
// 	var jsonText, room;
// 	// Checking for status
// 	if (this.readyState == 4 && this.status == 200) {
// 		// if successful
// 		jsonText = http.responseText;
// 		room = JSON.parse(jsonText);

// 		// empty var to add incoming data
// 		var output = "";

// 		// Home Location Select
// 		addSelectOption(room);
// 	}
// };

// function addSelectOption(room) {
// 	var locationSelect = document.getElementById("search-location-input");
// 	var uniqueLocations = [];

// 	for (let i = 0; i < room.length; i++) {
// 		let roomLocation = room[i].location;

// 		// Check location
// 		if (!uniqueLocations.includes(roomLocation)) {
// 			uniqueLocations.push(roomLocation);
// 		}
// 	}

// 	uniqueLocations.sort();

// 	for (let j = 0; j < uniqueLocations.length; j++) {
// 		var locationE = document.createElement("option");

// 		locationE.innerText = uniqueLocations[j];
// 		locationSelect.appendChild(locationE);
// 	}
// }

// }

// Select time slot
const timeSlotButtons = document.getElementsByClassName("timeSlot");
var selectedRooms = [];
var selectedObj = {
	roomName: "",
	bookingDate: "",
	bookingTime: "",
	bookingPrice: "",
};

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("timeSlot")) {
		e.target.classList.toggle("active");

		// Store data
		const dataTimeValue = e.target.dataset.time;
		const dataRoomName = e.target.dataset.roomname;
		const dataDateValue = document.getElementById("searchDate").value;
		const dataRoomPrice = e.target.dataset.price;
		console.log("Data time value:", dataTimeValue);
		console.log("Room Name:", dataRoomName);
		console.log(dataDateValue);
		console.log(dataRoomPrice);

		selectedObj.bookingTime = dataTimeValue;
		selectedObj.roomName = dataRoomName;
		selectedObj.bookingDate = dataDateValue;
		selectedObj.price = dataRoomPrice;

		console.log(selectedRoom);
	}
});
