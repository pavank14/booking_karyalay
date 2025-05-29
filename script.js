// // === Firebase Config ===
// const firebaseConfig = {
//   apiKey: "AIzaSyBiY9bZvDl-J0g6gtp-kqiWikbeldfgixM",
//   authDomain: "hallbookingsystem-f1550.firebaseapp.com",
//   projectId: "hallbookingsystem-f1550",
//   storageBucket: "hallbookingsystem-f1550.firebasestorage.app",
//   messagingSenderId: "827165696312",
//   appId: "1:827165696312:web:8e94e87cf85bfd82f4a1cd",
//   measurementId: "G-S9M4PNGK4L"
// };

// // === Initialize Firebase ===
// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

// // === DOM Elements ===
// const marriageHallBtn = document.getElementById('marriageHallBtn');
// const banquetHallBtn = document.getElementById('banquetHallBtn');
// const monthYear = document.getElementById('monthYear');
// const calendarDates = document.getElementById('calendarDates');
// const bookingDialog = document.getElementById('bookingDialog');
// const bookingForm = document.getElementById('bookingForm');
// const markAsDateBtn = document.getElementById('markAsDateBtn');

// let selectedHall = '';
// let selectedDate = '';
// let currentBookings = {};
// let currentMonth = new Date().getMonth();
// let currentYear = new Date().getFullYear();

// // === Hall Selection ===
// marriageHallBtn.addEventListener('click', () => {
//   selectedHall = 'MarriageHall';
//   generateCalendar(currentMonth, currentYear);
// });
// banquetHallBtn.addEventListener('click', () => {
//   selectedHall = 'BanquetHall';
//   generateCalendar(currentMonth, currentYear);
// });

// // === Navigation ===
// document.getElementById('prevMonth').addEventListener('click', () => {
//   currentMonth--;
//   if (currentMonth < 0) {
//     currentMonth = 11;
//     currentYear--;
//   }
//   generateCalendar(currentMonth, currentYear);
// });

// document.getElementById('nextMonth').addEventListener('click', () => {
//   currentMonth++;
//   if (currentMonth > 11) {
//     currentMonth = 0;
//     currentYear++;
//   }
//   generateCalendar(currentMonth, currentYear);
// });

// // === Calendar Generation ===
// function generateCalendar(month, year) {
//   if (!selectedHall) return;

//   calendarDates.innerHTML = '';
//   currentBookings = {};
//   monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

//   const firstDay = new Date(year, month).getDay();
//   const daysInMonth = 32 - new Date(year, month, 32).getDate();

//   for (let i = 0; i < firstDay; i++) {
//     const blankCell = document.createElement('div');
//     calendarDates.appendChild(blankCell);
//   }

//   for (let day = 1; day <= daysInMonth; day++) {
//     const cell = document.createElement('div');
//     cell.classList.add('date-cell');
//     cell.textContent = day;
//     cell.addEventListener('click', () => handleDateClick(day));
//     calendarDates.appendChild(cell);
//   }

//   loadBookingsFromFirebase(month, year);
// }

// // === Date Click Handler ===
// function handleDateClick(day) {
//   if (!selectedHall) return;
//   selectedDate = day;
//   const booking = currentBookings[day];

//   if (booking) {
//     if (booking.status === 'booked') {
//       alert(`Date: ${selectedDate}
// Name: ${booking.name}
// Village: ${booking.village}
// Mobile: ${booking.mobile}
// Function: ${booking.function}
// Advance: ₹${booking.advance || 0}`);
//     } else if (booking.status === 'marked') {
//       fillFormWithData(booking);
//       bookingDialog.classList.remove('hidden');
//     }
//   } else {
//     bookingForm.reset();
//     bookingDialog.classList.remove('hidden');
//   }
// }

// // === Fill Form ===
// function fillFormWithData(data) {
//   document.getElementById('name').value = data.name || '';
//   document.getElementById('village').value = data.village || '';
//   document.getElementById('mobile').value = data.mobile || '';
//   document.getElementById('function').value = data.function || '';
//   document.getElementById('advance').value = data.advance || '';
// }

// // === Close Dialog ===
// function closeDialog() {
//   bookingDialog.classList.add('hidden');
// }

// // === Mark as Date (Yellow) ===
// markAsDateBtn.addEventListener('click', () => {
//   const data = getFormData();
//   data.status = 'marked';
//   saveBooking(data, 'yellow');
// });

// // === Save Booking (Red) ===
// bookingForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const data = getFormData();
//   data.status = 'booked';
//   saveBooking(data, 'red');
// });

// // === Get Form Data ===
// function getFormData() {
//   return {
//     name: document.getElementById('name').value,
//     village: document.getElementById('village').value,
//     mobile: document.getElementById('mobile').value,
//     function: document.getElementById('function').value,
//     advance: parseInt(document.getElementById('advance').value) || 0
//   };
// }

// // === Save Booking to Firebase ===
// function saveBooking(data, color) {
//   const ref = database.ref(`${selectedHall}/${currentYear}/${currentMonth + 1}/${selectedDate}`);
//   ref.set(data).then(() => {
//     bookingDialog.classList.add('hidden');
//     updateCellColor(selectedDate, color);
//     currentBookings[selectedDate] = data;
//   });
// }

// // === Update Cell Color ===
// function updateCellColor(date, color) {
//   const cells = document.querySelectorAll('.date-cell');
//   cells.forEach(cell => {
//     if (parseInt(cell.textContent) === parseInt(date)) {
//       cell.classList.remove('booked', 'marked');
//       if (color === 'red') cell.classList.add('booked');
//       else if (color === 'yellow') cell.classList.add('marked');
//     }
//   });
// }

// // === Load Bookings ===
// function loadBookingsFromFirebase(month, year) {
//   const ref = database.ref(`${selectedHall}/${year}/${month + 1}`);
//   ref.once('value', (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       currentBookings = data;
//       Object.keys(data).forEach(day => {
//         const status = data[day].status;
//         updateCellColor(day, status === 'booked' ? 'red' : 'yellow');
//       });
//     }
//   });
// }

// // === Start ===
// generateCalendar(currentMonth, currentYear);
