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

  // Set the selected day in the modal form
  const dayInput = document.querySelector('.modal-form .day-input');
  dayInput.value = day;

  // Fetch and display country information for the selected day's country
  fetchCountryInfo();
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
    fetchCountryInfo(); // Update country info for the selected day
}

// Fetch country information and populate the dropdown when the page loads
async function fetchCountryInfo() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Sort the countries alphabetically by their common name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Populate the dropdown select with country names
        const countrySelect = document.getElementById('countrySelect');
        countrySelect.innerHTML = ''; // Clear previous options
        data.forEach(country => {
            const { name } = country;
            const option = document.createElement('option');
            option.value = name.common;
            option.textContent = name.common;
            countrySelect.appendChild(option);
        });

        // Update country information for the selected day's country (if applicable)
        updateCountryInfo();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch and display country information for the selected day's country
async function updateCountryInfo() {
    const dayInput = document.querySelector('.modal-form .day-input');
    const day = dayInput.value;
    const countrySelect = document.getElementById('countrySelect');
    const selectedCountry = countrySelect.value;

    if (day && selectedCountry) {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            const country = data.find(country => country.name.common === selectedCountry);

            if (country) {
                const { name, timezones, flags, region, capital, currencies } = country;
                const currencyCode = currencies ? Object.keys(currencies)[0] : 'N/A';
                const currencyName = currencies ? currencies[currencyCode].name : 'N/A';

                const countryInfoDiv = document.getElementById('countryInfo');
                countryInfoDiv.innerHTML = `
                    <img class="flag" src="${flags.png}" alt="${name.common} flag">
                    <h2 class="country">${name.common}</h2>
                    <p>Timezone: ${timezones.join(', ')}</p>
                    <p>Region: ${region}</p>
                    <p>Capital: ${capital}</p>
                    <p>Currency: ${currencyName} (${currencyCode})</p>
                    <hr>
                `;
            } else {
                console.error('Selected country not found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

// Event listener for the "countrySelect" dropdown in the modal
const countrySelectModal = document.getElementById('countrySelect');
countrySelectModal.addEventListener('change', updateCountryInfo);

// Initialize the app
firstLastDay();
updateWeekHeaders();
updateActualWeek();
fetchCountryInfo();
