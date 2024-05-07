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

// View Room Page -- Load JSON

//=============================================================================//

var cart = [];
const urlParams = new URLSearchParams(window.location.search);
const selectedLocation = urlParams.get("location");
const selectedDate = urlParams.get("date");
const selectedCapacity = urlParams.get("capacity");
const datePicker = document.getElementById("searchDate");

if (currentPage === "/index.html") {
	const datePicker = document.getElementById("searchDate");
	var today = new Date();
	var formattedDate = today.toISOString().split("T")[0];
	datePicker.value = formattedDate;
	datePicker.min = formattedDate;
	let maxDate = new Date();
	maxDate.setDate(today.getDate() + 20);

	let formattedMaxDate = maxDate.toISOString().split("T")[0];

	datePicker.max = formattedMaxDate;
} else if (currentPage === "/viewRoom.html") {
	searchLocationInput = document.getElementById("search-location-input");
	searchCapacityInput = document.getElementById("search-capacity-input");

	if (selectedLocation.value !== "") {
		searchLocationInput.value = selectedLocation;
		console.log(selectedLocation);
	}

	if (selectedCapacity.value !== "") {
		selectedCapacity.value = selectedCapacity;
	}
	datePicker.value = urlParams.get("date");
	fetchAvailableRooms(selectedLocation, selectedDate, selectedCapacity);
} else if (currentPage === "/reviewPage.html") {
	const cartContainer = document.getElementById("cartContainer");
	var newDiv = document.createElement("div");
	const copy = sessionStorage.cart;
	console.log(copy);
}

const timeSlotButtons = document.querySelectorAll(".timeSlot");
timeSlotButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		timeSlotButtons.forEach((f) =>
			f != e.target ? f.classList.remove("active") : ""
		);
		e.target.classList.toggle("active");
	});
});

// Select time slot
// When time slot button is selected, bookingTime and roomId is stored
// as a variable.

var selectedRoom = {
	roomId: "",
	roomName: "",
	roomLocation: "",
	roomCapacity: "",
	roomPrice: "",
	bookingTime: "",
	bookingDate: "",
};

function selectTime(key, time) {
	selectedRoom.roomId = key;
	selectedRoom.roomName = rooms[key].name;
	selectedRoom.roomLocation = rooms[key].location;
	selectedRoom.roomCapacity = rooms[key].capacity;
	selectedRoom.roomPrice = rooms[key].price;
	selectedRoom.bookingTime = time;
	selectedRoom.bookingDate = urlParams.get("date");
	console.log("bookingTime: ");
}

// Add to Cart Function
function addToCart() {
	// Create a copy of selectedRoom
	const selectedRoomCopy = Object.assign({}, selectedRoom);
	var isInCart = false;

	// Check if Brother has selected a room or null
	if (selectedRoomCopy.roomId === "" || selectedRoomCopy.roomId === null) {
		alert("Brother, please select a room...");
	} else {
		// Room has been selected
		// Check if selected room is already in cart
		// If same, error
		if (cart.length === 0) {
			cart.push(selectedRoomCopy);
		} else {
			cart.forEach((item) => {
				if (item.roomId === selectedRoomCopy.roomId) {
					// if roomId is same, check room timing
					if (item.bookingTime === selectedRoomCopy.bookingTime) {
						isInCart = true;
					}
				}
			});
			if (isInCart) {
				alert("Brother, you have added this in cart already");
			} else {
				cart.push(selectedRoomCopy);
				localStorage.cart = cart;
			}
		}
	}
	console.log(cart);
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
	rooms.forEach((room) => {
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

		// Fix timing
		console.log(typeof room.availability);

		timings = Object.keys(room.availability[selectedDate]);

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
				timeSlotButton.setAttribute(
					"onclick",
					`selectTime('${room.id}','${time}')`
				);

				timeSlotButton.className = "timeSlot";
				timeSlotButton.textContent = time + " PM";
				roomDescriptionThirdCol.appendChild(timeSlotButton);
			} else {
				var timeSlotButton = document.createElement("button");

				timeSlotButton.setAttribute(
					"onclick",
					`selectTime('${room.id}','${time}')`
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

	return rooms;
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
