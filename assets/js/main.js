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
		name: "Room 104",
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

var cart = [];
var bookings = [];

/* ========================= Check what page it is on ============================== */
const urlParams = new URLSearchParams(window.location.search);
const selectedLocation = urlParams.get("location");
const selectedDate = urlParams.get("date");
const selectedCapacity = urlParams.get("capacity");
const datePicker = document.getElementById("searchDate");
var currentPage = window.location.pathname;
// fetchAvailableRooms(selectedLocation, selectedDate, selectedCapacity);

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
	}

	if (selectedCapacity.value !== "") {
		selectedCapacity.value = selectedCapacity;
	}

	datePicker.value = urlParams.get("date");
	fetchAvailableRooms(selectedLocation, selectedDate, selectedCapacity);
} else if (currentPage === "/reviewPage.html") {
	const cartContainer = document.getElementById("cartContainer");
	var newDiv = document.createElement("div");
}

/*=============== HOME ===============*/
// Submit Search Button

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

/*=============== SELECT ROOM PAGE ===============*/
// Call this when viewRoom.html is loaded
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
		const roomDescriptionThirdCol = roomCard.querySelector(
			".roomDescriptionThirdCol"
		);

		// Need a function to check available time with current date and time
		// if current time has past available time, don't show invalid time slots
		const availableTime = [];

		if (
			room.availability[selectedDate] === null ||
			room.availability[selectedDate] === undefined
		) {
			console.log("ew");
		} else {
			timings = Object.keys(room.availability[selectedDate]);
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
		}
		console.log("can you reach me?");

		availableTime.forEach((time) => {
			if (time.split(":", 1) < 7 || time.split(":", 1) == 12) {
				var timeSlotButton = document.createElement("button");
				timeSlotButton.setAttribute(
					"onclick",
					`selectTime('${room.id}','${time}')`
				);

				timeSlotButton.className = "timeSlot";
				timeSlotButton.type = "button";
				timeSlotButton.textContent = time + " PM";
				roomDescriptionThirdCol.appendChild(timeSlotButton);
			} else {
				var timeSlotButton = document.createElement("button");

				timeSlotButton.setAttribute(
					"onclick",
					`selectTime('${room.id}','${time}')`
				);

				timeSlotButton.className = "timeSlot";
				timeSlotButton.type = "button";
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

const timeSlotButtons = document.querySelectorAll(".timeSlot");
const continueContainer = document.getElementById("continueContainer");

timeSlotButtons.forEach((button) => {
	isContinue = false;
	button.addEventListener("click", (e) => {
		timeSlotButtons.forEach((f) =>
			f != e.target ? f.classList.remove("active") : ""
		);
		e.target.classList.toggle("active");

		// Check if any button is active
		const isActive = Array.from(timeSlotButtons).some((btn) =>
			btn.classList.contains("active")
		);

		// Toggle display of the "hello" div based on the presence of the "active" class

		continueContainer.style.display = isActive ? "block" : "none";
	});
});

// Select time slot
// When time slot button is selected, bookingTime and roomId is stored
// as a variable.

var selectedRoom = {
	roomId: "",
	image: "",
	roomName: "",
	roomLocation: "",
	roomCapacity: "",
	roomPrice: "",
	bookingTime: "",
	bookingDate: "",
};

function selectTime(id, time) {
	selectedRoom.roomId = id;
	selectedRoom.image = rooms[id - 1].image;

	// optional?
	selectedRoom.roomName = rooms[id - 1].name;
	selectedRoom.roomLocation = rooms[id - 1].location;
	selectedRoom.roomCapacity = rooms[id - 1].capacity;
	selectedRoom.roomPrice = rooms[id - 1].price;
	selectedRoom.bookingTime = time;
	selectedRoom.bookingDate = urlParams.get("date");
	console.log("bookingTime: " + selectedRoom.bookingTime);
}

// Add to Cart Function
function addToCart() {
	const selectedRoomCopy = Object.assign({}, selectedRoom);
	const roomId = selectedRoomCopy.roomId;
	const roomImage = selectedRoomCopy.image;
	const roomName = selectedRoomCopy.roomName;
	const roomLocation = selectedRoomCopy.roomLocation;
	const roomCapacity = selectedRoomCopy.roomCapacity;
	const roomPrice = selectedRoomCopy.roomPrice;
	const bookingTime = selectedRoomCopy.bookingTime;
	const bookingDate = selectedRoomCopy.bookingDate;

	// Use sessionStorage to store cart items
	console.log("selectedroomcopy", selectedRoomCopy);

	// Check if selectedRoomCopy is empty
	if (selectedRoomCopy.roomId === "") {
		alert("Please select a room");
	} else {
		var isInCart = false;
		// Check if cart is empty
		// If cart is empty, just add
		if (cart.length === 0) {
			alert("pushing to cart");
			cart.push(selectedRoomCopy);
			console.log(cart);
		} else {
			cart.forEach((item) => {
				if (selectedRoomCopy.roomId === item.roomId) {
					if (selectedRoomCopy.bookingTime === item.bookingTime) {
						isInCart = true;
						alert("Brother, room is already in cart");
						console.log(cart);
					}
				}
			});
			if (!isInCart) {
				alert("pushing to cart");
				cart.push(selectedRoomCopy);
				console.log(cart);
			}
		}
	}
}

function continueToReviewPage() {
	// Push cart data into sessionStorage as string
	console.log(sessionStorage);
	console.log(cart);
	sessionStorage.setItem("cart", JSON.stringify(cart));
	console.log("session Storage", sessionStorage.getItem("cart"));
	console.log("cart in session storage", cart);

	// window.location.href = `reviewPage.html?roomId=${roomId}&roomImage=${roomImage}&roomName=${roomName}&roomLocation=${roomLocation}&roomCapacity=${roomCapacity}&roomPrice=${roomPrice}&bookingTime=${bookingTime}&bookingDate=${bookingDate}`;
	window.location.href = "reviewPage.html";
}

/*=============== REVIEW BOOKING PAGE ===============*/

if (currentPage === "/reviewPage.html") {
	console.log("session Storage", sessionStorage.getItem("cart"));
	let urlParams = new URLSearchParams(window.location.search);

	let roomId = urlParams.get("roomId");
	let roomImage = urlParams.get("roomImage");
	let roomName = urlParams.get("roomName");
	let roomLocation = urlParams.get("roomLocation");
	let roomCapacity = urlParams.get("roomCapacity");
	let roomPrice = urlParams.get("roomPrice");
	let bookingTime = urlParams.get("bookingTime");
	let bookingDate = urlParams.get("bookingDate");

	let previousDate = urlParams.get("bookingDate");
	const modifyButton = document.getElementById("modifyButton");
	modifyButton.addEventListener("click", (e) => {
		window.location.href = `viewRoom.html?location=${roomLocation}&date=${previousDate}&capacity=${roomCapacity}`;
	});

	const parts = bookingDate.split("-");
	bookingDate = parts[2] + "-" + parts[1] + "-" + parts[0];

	console.log(bookingTime.split(":", 1));
	// Check Time
	if (bookingTime.split(":", 1) < 7 || bookingTime.split(":", 1) == 12) {
		bookingTime = bookingTime + " PM";
	} else {
		bookingTime = bookingTime + " AM";
	}

	var endTime = parseInt(bookingTime.split(":", 1)[0]) + 1;
	if (endTime === 13) {
		endTime = 1;
	}
	endTime = String(endTime);
	endTime = String(endTime.padStart(2, "0")); // Ensure two digits with leading zero
	endTime = endTime + ":00"; // Ensure two digits with leading zero

	if (endTime.split(":", 1) < 7 || endTime.split(":", 1) == 12) {
		endTime = endTime + " PM";
	} else {
		endTime = endTime + " AM";
	}

	console.log(endTime);

	const selectedRoomImage = document.getElementById("selectedRoomImage");
	const selectedRoomName = document.getElementById("selectedRoomName");
	const selectedRoomLocation = document.getElementById(
		"selectedRoomLocation"
	);
	const selectedRoomCapacity = document.getElementById(
		"selectedRoomCapacity"
	);
	const selectedRoomDate = document.getElementById("selectedRoomDate");
	const selectedRoomTime = document.getElementById("selectedRoomTime");
	const reviewBookingSubtotal = document.getElementById(
		"reviewBookingSubtotal"
	);
	const reviewBookingTaxes = document.getElementById("reviewBookingTaxes");
	const reviewTotalAmount = document.getElementById("reviewTotalAmount");

	selectedRoomImage.src = roomImage;
	selectedRoomName.textContent = roomName;
	selectedRoomLocation.textContent = roomLocation;
	selectedRoomCapacity.textContent = "Up to " + roomCapacity + " people";
	selectedRoomDate.textContent = bookingDate;
	selectedRoomTime.textContent = bookingTime + " - " + endTime;

	roomPrice = parseFloat(roomPrice);
	const taxAmount = roomPrice * 0.09;
	console.log(taxAmount);
	reviewBookingSubtotal.textContent = "$" + String(roomPrice) + ".00";
	reviewBookingTaxes.textContent = "$" + String(taxAmount);
	reviewTotalAmount.textContent = "$" + String(roomPrice) + ".00";

	// Checkout button
	const checkoutButton = document.getElementById("checkoutButton");
	checkoutButton.addEventListener("click", (e) => {
		window.location.href = `payment.html?roomId=${roomId}&roomImage=${roomImage}&roomName=${roomName}&roomLocation=${roomLocation}&roomCapacity=${roomCapacity}&roomPrice=${roomPrice}&bookingTime=${bookingTime}&bookingDate=${bookingDate}`;
	});
}

/*=============== PAYMENT ===============*/
if (currentPage === "/payment.html") {
	const completePurchaseButton = document.getElementById(
		"completePurchaseButton"
	);
	completePurchaseButton.addEventListener("click", (e) => {
		let urlParams = new URLSearchParams(window.location.search);

		let roomId = urlParams.get("roomId");
		let roomImage = urlParams.get("roomImage");
		let roomName = urlParams.get("roomName");
		let roomLocation = urlParams.get("roomLocation");
		let roomCapacity = urlParams.get("roomCapacity");
		let roomPrice = urlParams.get("roomPrice");
		let bookingTime = urlParams.get("bookingTime");
		let bookingDate = urlParams.get("bookingDate");

		// Add in final total price

		window.location.href = `orderConfirmation.html?roomId=${roomId}&roomImage=${roomImage}&roomName=${roomName}&roomLocation=${roomLocation}&roomCapacity=${roomCapacity}&roomPrice=${roomPrice}&bookingTime=${bookingTime}&bookingDate=${bookingDate}`;
	});
}
