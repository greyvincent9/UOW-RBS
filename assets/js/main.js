let rooms = [
	{
		id: 1,
		name: "Room 101",
		image: "/assets/img/images.jpg",
		location: "UOW Campus - Library Level 2",
		capacity: 4,
		price: 2,
		availability: {
			"2024-05-06": {
				"08:00": { booked: false },
				"09:00": { booked: true },
				"10:00": { booked: false },
				"11:00": { booked: true },
				"12:00": { booked: true },
				"01:00": { booked: false },
				"02:00": { booked: true },
				"03:00": { booked: true },
				"04:00": { booked: true },
				"05:00": { booked: true },
			},
			"2024-05-07": {
				"08:00": { booked: false },
				"09:00": { booked: false },
				"10:00": { booked: false },
				"11:00": { booked: false },
				"12:00": { booked: false },
				"01:00": { booked: false },
				"02:00": { booked: false },
				"03:00": { booked: false },
				"04:00": { booked: false },
				"05:00": { booked: false },
			},
		},
	},
	{
		id: 2,
		name: "Room 102",
		image: "/assets/img/images.jpg",
		location: "UOW Campus - Library Level 2",
		capacity: 4,
		price: 2,
		availability: {
			"2024-05-06": {
				"08:00": { booked: false },
				"09:00": { booked: false },
				"10:00": { booked: false },
				"11:00": { booked: false },
				"12:00": { booked: false },
				"01:00": { booked: false },
				"02:00": { booked: false },
				"03:00": { booked: false },
				"04:00": { booked: false },
				"05:00": { booked: false },
			},
			"2024-05-07": {
				"08:00": { booked: false },
				"09:00": { booked: false },
				"10:00": { booked: false },
				"11:00": { booked: false },
				"12:00": { booked: false },
				"01:00": { booked: false },
				"02:00": { booked: false },
				"03:00": { booked: false },
				"04:00": { booked: false },
				"05:00": { booked: false },
			},
		},
	},
	{
		id: 3,
		name: "Room 103",
		image: "/assets/img/images.jpg",
		location: "UOW Campus - Library Level 1",
		capacity: 4,
		price: 2,
		availability: {
			"2024-05-06": {
				"08:00": { booked: true },
				"09:00": { booked: true },
				"10:00": { booked: true },
				"11:00": { booked: true },
				"12:00": { booked: true },
				"01:00": { booked: true },
				"02:00": { booked: true },
				"03:00": { booked: true },
				"04:00": { booked: true },
				"05:00": { booked: true },
			},
			"2024-05-07": {
				"08:00": { booked: false },
				"09:00": { booked: false },
				"10:00": { booked: false },
				"11:00": { booked: false },
				"12:00": { booked: false },
				"01:00": { booked: false },
				"02:00": { booked: false },
				"03:00": { booked: false },
				"04:00": { booked: false },
				"05:00": { booked: false },
			},
		},
	},
	{
		id: 4,
		name: "Room 103",
		image: "/assets/img/images.jpg",
		location: "UOW Campus - Library Level 1",
		capacity: 4,
		price: 2,
		availability: {
			"2024-05-06": {
				"08:00": { booked: true },
				"09:00": { booked: true },
				"10:00": { booked: true },
				"11:00": { booked: true },
				"12:00": { booked: true },
				"01:00": { booked: true },
				"02:00": { booked: true },
				"03:00": { booked: true },
				"04:00": { booked: true },
				"05:00": { booked: true },
			},
		},
	},
];

/*=============== HOME ===============*/
// Submit Search Button
var currentPage = window.location.pathname;

function searchRoom() {
	alert("Searching...");
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

//=============================================================================//
const urlParams = new URLSearchParams(window.location.search);
const selectedLocation = urlParams.get("location");
const selectedDate = urlParams.get("date");
const selectedCapacity = urlParams.get("capacity");

var cart = [];
const selectedRoom = {
	roomId: "",
	roomName: "",
	roomLocation: "",
	roomCapacity: "",
	roomPrice: "",
	bookingTime: "",
};
console.log(selectedRoom);

fetchAvailableRooms(selectedLocation, selectedDate, selectedCapacity);

// Select time slot
// When time slot button is selected, bookingTime and roomId is stored
// as a variable.

function selectTime(key, time) {
	const bookingDate = urlParams.get("date");
	const roomId = key;
	const roomName = rooms[key].name;
	const roomLocation = rooms[key].location;
	const roomCapacity = rooms[key].capacity;
	const roomPrice = rooms[key].price;
	const bookingTime = time;
	console.log(key);

	selectedRoom.roomId = key;
	selectedRoom.roomName = roomName;
	selectedRoom.roomLocation = roomLocation;
	selectedRoom.roomCapacity = roomCapacity;
	selectedRoom.roomPrice = roomPrice;
	selectedRoom.bookingTime = bookingTime;
	console.log(selectedRoom);
}

// Add to Cart Function
function addToCart() {
	// Check if cart is empty
	if (cart.length === 0) {
		cart.push(selectedRoom);
	} else {
		cart.forEach((item) => {
			if (item.roomId === selectedRoom.roomId) {
				alert("Room has already been added to cart");
			}
		});
	}

	// Check if time slot and room is unique
}

function fetchAvailableRooms(location, date, capacity) {
	// Check if location is empty
	// Check if capacity is empty
	// if not empty, pass in the input and return results

	// Hide rooms that does not match location

	// Use Room Template
	const roomPageContainer = document.querySelector("#viewRoomPageContainer");
	const roomCardTemplate = document.querySelector(
		"[data-room-card-template]"
	);
	rooms.forEach((value, key) => {
		const roomCard = roomCardTemplate.content.cloneNode(true);
		const img = roomCard.querySelector("img");
		const roomName = roomCard.querySelector(".roomName");
		roomName.id = value.name;
		const roomCapacity = roomCard.querySelector(".roomCapacity");
		const roomLocation = roomCard.querySelector(".roomLocation");
		const roomPrice = roomCard.querySelector(".roomPrice");
		const timeSlot = roomCard.querySelector(".timeSlot");

		img.src = value.image;
		img.alt = "room image";
		roomName.textContent = value.name;
		roomLocation.textContent = value.location;
		roomCapacity.textContent = value.capacity;
		roomPrice.textContent = value.price + ".00";

		const timings = Object.keys(value.availability[selectedDate]);

		const roomDescriptionThirdCol = roomCard.querySelector(
			".roomDescriptionThirdCol"
		);

		// Need a function to check available time with current date and time
		// if current time has past available time, don't show invalid time slots
		const availableTime = [];
		timings.forEach((timing) => {
			slot = value.availability[selectedDate][timing];
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
				timeSlotButton.setAttribute("data-roomName", value.name);
				timeSlotButton.setAttribute("data-price", value.price);
				timeSlotButton.setAttribute("data-time", time);
				timeSlotButton.setAttribute(
					"onclick",
					`selectTime('${key}',' ${time}')`
				);

				timeSlotButton.className = "timeSlot";
				timeSlotButton.textContent = time + " PM";
				roomDescriptionThirdCol.appendChild(timeSlotButton);
			} else {
				var timeSlotButton = document.createElement("button");
				var dataRoomName = "data-roomName";
				timeSlotButton.setAttribute("data-roomName", value.name);
				timeSlotButton.setAttribute("data-time", time);
				timeSlotButton.setAttribute("data-price", value.price);
				timeSlotButton.setAttribute(
					"onclick",
					`selectTime('${key}',' ${time}')`
				);

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
}

//=============================================================================//
//
/*
if (currentPage === "/viewRoom.html") {
	document.addEventListener("DOMContentLoaded", function () {
		// Get URL parameters
		const urlParams = new URLSearchParams(window.location.search);
		const selectedLocation = urlParams.get("location");
		const selectedDate = urlParams.get("date");
		const selectedCapacity = urlParams.get("capacity");

		

		function addToCart(key, time) {
			console.log(key.location);
			const roomLocation = key.location;
		}

		let rooms = []; // Declare rooms variable outside of the callback

		// Function to populate rooms with data
		function populateRooms(data) {
			rooms = data.map((room) => {
				// Process each room and return the processed room object
				return {
					roomImage: room.image,
					roomName: room.name,
					roomLocation: room.location,
					roomCapacity: room.capacity,
					roomPrice: room.price,
				};
			});
			console.log(rooms);
		}

		// load json
		function fetchAvailableRooms(location, date, capacity) {
			fetch("./room.json")
				.then((res) => res.json())
				.then((data) => {
					data.forEach((value, key) => {
						populateRooms(data);
						const roomCard =
							roomCardTemplate.content.cloneNode(true);
						const img = roomCard.querySelector("img");
						const roomName = roomCard.querySelector(".roomName");
						roomName.id = value.name;
						const roomCapacity =
							roomCard.querySelector(".roomCapacity");
						const roomLocation =
							roomCard.querySelector(".roomLocation");
						const roomPrice = roomCard.querySelector(".roomPrice");
						const timeSlot = roomCard.querySelector(".timeSlot");

						img.src = value.image;
						img.alt = "room image";
						roomName.textContent = value.name;
						roomLocation.textContent = value.location;
						roomCapacity.textContent = value.capacity;
						roomPrice.textContent = value.price + ".00";

						var timings = Object.keys(
							value.availability[selectedDate]
						);

						const roomDescriptionThirdCol = roomCard.querySelector(
							".roomDescriptionThirdCol"
						);

						// Need a function to check available time with current date and time
						// if current time has past available time, don't show invalid time slots
						const availableTime = [];
						timings.forEach((timing) => {
							slot = value.availability[selectedDate][timing];
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
									value.name
								);
								timeSlotButton.setAttribute(
									"data-price",
									value.price
								);
								timeSlotButton.setAttribute("data-time", time);
								timeSlotButton.setAttribute(
									"onclick",
									`selectTime("${key}")`
								);

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
									value.name
								);
								timeSlotButton.setAttribute("data-time", time);
								timeSlotButton.setAttribute(
									"data-price",
									value.price
								);
								timeSlotButton.setAttribute(
									"onclick",
									`selectTime("${key}, ${time}")`
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
} */

// Set Location Options

// Fetch JSON and update viewRoom.html with data

// const date = new Date(); // Try date
// const formattedDateISO = date.toISOString().split("T")[0];
// Use selectedDate

// Convert this into a function instead
// Call this when viewPage.html is loaded

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
/*
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

		
	}
}); */
