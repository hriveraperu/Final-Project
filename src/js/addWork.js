import { openModal } from "./time.js";

function saveJobInfo(day) {
    const jobName = document.getElementById('jobName').value;
    const customer = document.getElementById('customer').value;
    const country = document.getElementById('countrySelect').value;
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);

    // Create an object to represent the job information
    const jobInfo = {
        day: day,
        jobName: jobName,
        customer: customer,
        country: country,
        hours: hours,
        minutes: minutes
    };

    // Get the saved job information from local storage or initialize an empty array
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

    // Check if there is an existing job for the current day
    const existingJobIndex = savedJobs.findIndex(job => job.day === day);

    // If an existing job is found, update it; otherwise, add the new job information to the array
    if (existingJobIndex !== -1) {
        savedJobs[existingJobIndex] = jobInfo;
    } else {
        savedJobs.push(jobInfo);
    }

    // Save the updated array back to local storage
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));

    // Update the date box with the saved job information
    updateDateBox(day, jobInfo);
    loadSavedJobs();
}

function updateDateBox(day, jobInfo) {
    const dateBox = document.querySelector(`.${day} .date-box:last-child`);

    if (jobInfo) {
        dateBox.innerHTML = `
            <p>${jobInfo.jobName}</p>
            <p>${jobInfo.customer}</p>
            <p>${jobInfo.country}</p>
            <p>${jobInfo.hours} hours ${jobInfo.minutes} minutes</p>
            <button class="delete-job-btn" data-day="${day}" data-job="${jobInfo.jobName}">Delete</button>
        `;
    } else {
        dateBox.innerHTML = ''; // Clear the date box content if there's no job information
    }
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-job-btn')) {
        const day = event.target.getAttribute('data-day');
        const jobName = event.target.getAttribute('data-job');
        deleteJob(day, jobName);
    }
});

// Function to delete a job from local storage and update the date box
function deleteJob(day, jobName) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    savedJobs = savedJobs.filter(job => !(job.day === day && job.jobName === jobName));
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    loadSavedJobs(); // Update the date boxes after deleting the job
}

// Event listener for the "Save" button in the modal
const saveBtn = document.querySelector('.modal-form button[type="submit"]');
saveBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const day = document.querySelector('.modal-form .day-input').value;
    saveJobInfo(day);
    closeModal(); // Close the modal after saving the job information
});

// Load saved job information from local storage and populate the date boxes
function loadSavedJobs() {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

    // Loop through each day element and find the corresponding job information (if any)
    document.querySelectorAll('.monday, .tuesday, .wednesday, .thursday, .friday').forEach(dayElement => {
        const day = dayElement.classList[0];
        const jobInfo = savedJobs.find(job => job.day === day);
        updateDateBox(day, jobInfo);
    });
}

// Load saved jobs when the page loads
loadSavedJobs();

document.querySelectorAll('.monday, .tuesday, .wednesday, .thursday, .friday').forEach(dayElement => {
  dayElement.addEventListener('click', () => {
      const day = dayElement.classList[0];
      openModal(day); // Pass the day value here
  });
});