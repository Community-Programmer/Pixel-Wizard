// Sample appointment data
const appointments = [
  {
    id: 1,
    mentor: "Dr. Emily Smith",
    date: "2023-05-20",
    time: "10:00 AM",
    status: "scheduled",
    notes: "Discuss machine learning project",
  },
  {
    id: 2,
    mentor: "Prof. Michael Johnson",
    date: "2023-05-22",
    time: "2:00 PM",
    status: "pending",
    notes: "Review cloud architecture design",
  },
  {
    id: 3,
    mentor: "Dr. Sarah Lee",
    date: "2023-05-18",
    time: "11:00 AM",
    status: "cancelled",
    notes: "Cancel because of time conflicts",
  },
];

const appointmentsContainer = document.getElementById("appointmentsContainer");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function renderAppointments(appointmentsToRender) {
  appointmentsContainer.innerHTML = "";

  if (appointmentsToRender.length === 0) {
    appointmentsContainer.innerHTML = `
              <div class="empty-state">
                  <h2>No appointments found</h2>
                  <p>You don't have any appointments matching your search or filter criteria.</p>
                  <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
              </div>
          `;
    return;
  }

  appointmentsToRender.forEach((appointment) => {
    const appointmentCard = document.createElement("div");
    appointmentCard.className = "appointment-card";
    appointmentCard.innerHTML = `
              <h2>${appointment.mentor}</h2>
              <div class="appointment-details">
                  <p><strong>Date:</strong> ${appointment.date}</p>
                  <p><strong>Time:</strong> ${appointment.time}</p>
                  <p><strong>Status:</strong> <span class="status-badge status-${appointment.status}">${appointment.status}</span></p>
                  <p><strong>Notes:</strong> ${appointment.notes}</p>
              </div>
              <div class="appointment-actions">
                  <button class="btn btn-secondary" onclick="editAppointment(${appointment.id})">Edit</button>
                  <button class="btn btn-primary" onclick="cancelAppointment(${appointment.id})">Cancel</button>
              </div>
          `;
    appointmentsContainer.appendChild(appointmentCard);
  });
}

function filterAppointments() {
  const searchTerm = searchInput.value.toLowerCase();
  const statusValue = statusFilter.value;

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.mentor.toLowerCase().includes(searchTerm) ||
      appointment.notes.toLowerCase().includes(searchTerm);
    const matchesStatus =
      statusValue === "all" || appointment.status === statusValue;
    return matchesSearch && matchesStatus;
  });

  renderAppointments(filteredAppointments);
}

function resetFilters() {
  searchInput.value = "";
  statusFilter.value = "all";
  filterAppointments();
}

function editAppointment(id) {
  alert(`Editing appointment ${id}`);
  // Implement edit functionality here
}

function cancelAppointment(id) {
  const appointmentIndex = appointments.findIndex((app) => app.id === id);
  if (appointmentIndex !== -1) {
    appointments[appointmentIndex].status = "cancelled";
    filterAppointments();
  }
}

searchInput.addEventListener("input", filterAppointments);
statusFilter.addEventListener("change", filterAppointments);

// Initial render
renderAppointments(appointments);
