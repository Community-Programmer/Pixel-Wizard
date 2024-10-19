// Sample data for appointments
const appointments = [
  {
    id: 1,
    student: "Alice Johnson",
    status: "Pending",
    date: "2023-05-15 10:00 AM",
    mentor: "Dr. Smith",
  },
  {
    id: 2,
    student: "Bob Williams",
    status: "Scheduled",
    date: "2023-05-16 2:00 PM",
    mentor: "Prof. Brown",
  },
  {
    id: 3,
    student: "Charlie Davis",
    status: "Cancelled",
    date: "2023-05-17 11:30 AM",
    mentor: "Dr. Wilson",
  },
  {
    id: 4,
    student: "Diana Miller",
    status: "Pending",
    date: "2023-05-18 3:00 PM",
    mentor: "Prof. Taylor",
  },
  {
    id: 5,
    student: "Ethan Moore",
    status: "Scheduled",
    date: "2023-05-19 9:30 AM",
    mentor: "Dr. Anderson",
  },
];

// Function to populate the table
function populateTable(appointmentsData) {
  const tableBody = document.getElementById("appointment-table");
  tableBody.innerHTML = "";

  appointmentsData.forEach((appointment) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.student}</td>
                <td>${appointment.status}</td>
                <td>${appointment.date}</td>
                
                <td>
                    <a href="#" class="btn btn-schedule">Schedule</a>
                    <a href="#" class="btn btn-cancel">Cancel</a>
                </td>
            `;
    tableBody.appendChild(row);
  });
}

// Function to update stats
function updateStats() {
  const scheduledCount = appointments.filter(
    (a) => a.status === "Scheduled"
  ).length;
  const pendingCount = appointments.filter(
    (a) => a.status === "Pending"
  ).length;
  const cancelledCount = appointments.filter(
    (a) => a.status === "Cancelled"
  ).length;

  document.getElementById("scheduled-count").textContent = scheduledCount;
  document.getElementById("pending-count").textContent = pendingCount;
  document.getElementById("cancelled-count").textContent = cancelledCount;
}

// Function to handle search
function handleSearch() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.student.toLowerCase().includes(searchTerm) ||
      appointment.mentor.toLowerCase().includes(searchTerm) ||
      appointment.status.toLowerCase().includes(searchTerm)
  );
  populateTable(filteredAppointments);
}

// Event listener for search button

// Event listener for search input (search as you type)
document.getElementById("search-input").addEventListener("input", handleSearch);

// Initialize the dashboard
populateTable(appointments);
updateStats();

// Add animation to stat cards
const statCards = document.querySelectorAll(".stat-card");
statCards.forEach((card) => {
  card.addEventListener("mouseover", () => {
    card.style.transform = "translateY(-10px) scale(1.05)";
  });
  card.addEventListener("mouseout", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add this to your existing <script> tag, after the existing code

// Get dialog elements
const scheduleDialog = document.getElementById("scheduleDialog");
const cancelDialog = document.getElementById("cancelDialog");

// Function to open schedule dialog
function openScheduleDialog(appointmentId) {
  scheduleDialog.style.display = "block";
  scheduleDialog.dataset.appointmentId = appointmentId;
}

// Function to open cancel dialog
function openCancelDialog(appointmentId) {
  cancelDialog.style.display = "block";
  cancelDialog.dataset.appointmentId = appointmentId;
}

// Function to close dialogs
function closeDialog() {
  scheduleDialog.style.display = "none";
  cancelDialog.style.display = "none";
}

// Event listeners for dialog buttons
document.querySelectorAll(".closeDialog").forEach((button) => {
  button.addEventListener("click", closeDialog);
});

document.getElementById("confirmSchedule").addEventListener("click", () => {
  const appointmentId = scheduleDialog.dataset.appointmentId;
  const mentor = document.getElementById("mentorSelect").value;
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;
  const notes = document.getElementById("additionalNotes").value;

  // Here you would typically send this data to your backend
  console.log(
    `Scheduling appointment ${appointmentId} with ${mentor} on ${date} at ${time}. Notes: ${notes}`
  );

  closeDialog();
});

document.getElementById("confirmCancel").addEventListener("click", () => {
  const appointmentId = cancelDialog.dataset.appointmentId;
  const reason = document.getElementById("cancellationReason").value;

  // Here you would typically send this data to your backend
  console.log(`Cancelling appointment ${appointmentId}. Reason: ${reason}`);

  closeDialog();
});

// Modify the populateTable function to add event listeners to the buttons
function populateTable(appointmentsData) {
  const tableBody = document.getElementById("appointment-table");
  tableBody.innerHTML = "";

  appointmentsData.forEach((appointment) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${appointment.id}</td>
  <td>${appointment.student}</td>
  <td>${appointment.status}</td>
  <td>${appointment.date}</td>
  
  <td>
    <button class="btn btn-schedule">Schedule</button>
    <button class="btn btn-cancel">Cancel</button>
  </td>
`;

    const scheduleButton = row.querySelector(".btn-schedule");
    const cancelButton = row.querySelector(".btn-cancel");

    scheduleButton.addEventListener("click", () =>
      openScheduleDialog(appointment.id)
    );
    cancelButton.addEventListener("click", () =>
      openCancelDialog(appointment.id)
    );

    tableBody.appendChild(row);
  });
}
let timeSlots = [];

function addTimeSlot() {
  const dateInput = document.getElementById("slotDate");
  const timeInput = document.getElementById("slotTime");

  if (dateInput.value && timeInput.value) {
    const newSlot = `${dateInput.value} ${timeInput.value}`;
    if (!timeSlots.includes(newSlot)) {
      timeSlots.push(newSlot);
      updateTimeSlotsList();
      dateInput.value = "";
      timeInput.value = "";
    } else {
      alert("This time slot already exists!");
    }
  } else {
    alert("Please select both date and time!");
  }
}

function removeTimeSlot(index) {
  timeSlots.splice(index, 1);
  updateTimeSlotsList();
}

function updateTimeSlotsList() {
  const timeSlotsList = document.getElementById("timeSlotsList");
  timeSlotsList.innerHTML = "";

  timeSlots.forEach((slot, index) => {
    const li = document.createElement("li");

    const slotInfo = document.createElement("span");
    slotInfo.textContent = slot;
    li.appendChild(slotInfo);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeTimeSlot(index);

    li.appendChild(removeButton);
    timeSlotsList.appendChild(li);
  });
}

document.getElementById("addTimeSlot").addEventListener("click", addTimeSlot);

updateTimeSlotsList();
