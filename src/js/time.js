import { fetchCountryInfo, fetchSelectedCountryInfo } from "./countryLoader.js";

var curr = new Date();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var mondayDay = new Date(curr);
var tuesdayDay = new Date(curr);
var wednesdayDay = new Date(curr);
var thursdayDay = new Date(curr);
var fridayDay = new Date(curr);

function firstLastDay() {
  mondayDay.setDate(curr.getDate() - curr.getDay() + 1);
  tuesdayDay.setDate(curr.getDate() - curr.getDay() + 2);
  wednesdayDay.setDate(curr.getDate() - curr.getDay() + 3);
  thursdayDay.setDate(curr.getDate() - curr.getDay() + 4);
  fridayDay.setDate(curr.getDate() - curr.getDay() + 5);
}

function updateWeekHeaders() {
  document.querySelector(".monday-day").textContent = mondayDay.getDate();
  document.querySelector(".tuesday-day").textContent = tuesdayDay.getDate();
  document.querySelector(".wednesday-day").textContent = wednesdayDay.getDate();
  document.querySelector(".thursday-day").textContent = thursdayDay.getDate();
  document.querySelector(".friday-day").textContent = fridayDay.getDate();
}

function updateActualWeek() {
  if (mondayDay.getMonth() == fridayDay.getMonth()) {
    document.querySelector(".actual-week").textContent = `from ${mondayDay.getDate()} to ${fridayDay.getDate()} of ${monthNames[curr.getMonth()]} ${curr.getFullYear()}`;
  } else {
    document.querySelector(".actual-week").textContent = `from ${mondayDay.getDate()} of ${monthNames[mondayDay.getMonth()]} to ${fridayDay.getDate()} of ${monthNames[curr.getMonth()]} ${curr.getFullYear()}`;
  }
}

// Function to open the modal
function openModal(day) {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.style.display = 'block';

  // Fetch and display country information for the selected day's country
  fetchSelectedCountryInfo(day);
}

// Function to close the modal
function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.display = 'none';
}

// Event listeners for "Previous Week" and "Today" buttons
const previousWeekBtn = document.querySelector(".previous-week-btn");
const todayBtn = document.querySelector(".today-btn");
const closeModalBtn = document.querySelector('.close-modal-btn');

previousWeekBtn.addEventListener("click", showPreviousWeek);
todayBtn.addEventListener("click", showToday);
closeModalBtn.addEventListener('click', closeModal);

// Add event listeners to "Monday" to "Friday" elements to show the modal
document.querySelectorAll('.monday, .tuesday, .wednesday, .thursday, .friday').forEach(dayElement => {
    dayElement.addEventListener('click', () => {
        openModal(dayElement.classList[0]);
    });
});

function showPreviousWeek() {


  curr.setDate(curr.getDate() - 7);
  firstLastDay();
  updateWeekHeaders();
  updateActualWeek();
}

function clearSavedJobs() {
  localStorage.removeItem('savedJobs');
}

function clearDateBoxes() {
  const dateBoxes = document.querySelectorAll('.date-box');
  dateBoxes.forEach(dateBox => {
      dateBox.innerHTML = '';
  });
}

function showToday() {
    curr = new Date();
    firstLastDay();
    updateWeekHeaders();
    updateActualWeek();
    fetchSelectedCountryInfo(); // Update country info for the selected day
}

// Fetch country information and populate the dropdown when the page loads
fetchCountryInfo();

// Call the functions to update the week headers and actual week when the page loads
firstLastDay();
updateWeekHeaders();
updateActualWeek();


// Event listener for the "countrySelect" dropdown in the modal
const countrySelectModal = document.getElementById('countrySelect');
countrySelectModal.addEventListener('change', function () {
    const day = document.querySelector('.modal-form .day-input').value;
    fetchSelectedCountryInfo(day);
});

window.addEventListener('message', event => {
  if (event.data === 'closeModal') {
      closeModal();
  }
});