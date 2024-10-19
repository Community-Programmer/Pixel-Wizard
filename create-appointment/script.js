const mentors = [
  {
    id: 1,
    name: "Dr. Emily Smith",
    expertise: "Machine Learning, Data Science",
    availableSlots: [
      { date: "2023-05-20", times: ["10:00", "14:00", "16:00"] },
      { date: "2023-05-21", times: ["11:00", "15:00"] },
    ],
  },
  {
    id: 2,
    name: "Prof. Michael Johnson",
    expertise: "Web Development, Cloud Computing",
    availableSlots: [
      { date: "2023-05-20", times: ["09:00", "13:00"] },
      { date: "2023-05-21", times: ["11:00", "15:00"] },
      { date: "2023-05-22", times: ["10:00", "14:00", "16:00"] },
    ],
  },
];

const mentorSelect = document.getElementById("mentorSelect");
const appointmentDate = document.getElementById("appointmentDate");
const timeSlots = document.getElementById("timeSlots");
const submitButton = document.getElementById("submitButton");
const appointmentForm = document.getElementById("appointmentForm");
const progressSteps = document.querySelectorAll(".progress-step");

// Populate mentor options
mentors.forEach((mentor) => {
  const option = document.createElement("option");
  option.value = mentor.id;
  option.textContent = mentor.name;
  mentorSelect.appendChild(option);
});

function displayMentorInfo(mentorId) {
  const mentor = mentors.find((m) => m.id == mentorId);
  const mentorInfoDiv = document.getElementById("mentorInfo");
  if (mentor) {
    mentorInfoDiv.innerHTML = `
                    <h3>${mentor.name}</h3>
                    <p>Expertise: ${mentor.expertise}</p>
                    <p>Available dates: ${mentor.availableSlots
                      .map((slot) => slot.date)
                      .join(", ")}</p>
                `;
    mentorInfoDiv.style.display = "block";
  } else {
    mentorInfoDiv.style.display = "none";
  }
}

mentorSelect.addEventListener("change", function () {
  appointmentDate.disabled = false;
  appointmentDate.value = "";
  timeSlots.innerHTML = "";
  updateDateOptions();
  updateProgressBar(1);
  displayMentorInfo(this.value);
});

appointmentDate.addEventListener("change", function () {
  updateTimeOptions();
  updateProgressBar(2);
});

function updateDateOptions() {
  const selectedMentor = mentors.find((m) => m.id == mentorSelect.value);

  if (selectedMentor) {
    const dates = selectedMentor.availableSlots.map((slot) => slot.date);
    appointmentDate.min = dates[0];
    appointmentDate.max = dates[dates.length - 1];
  }
}

function updateTimeOptions() {
  const selectedMentor = mentors.find((m) => m.id == mentorSelect.value);
  const selectedDate = appointmentDate.value;

  if (selectedMentor && selectedDate) {
    const slot = selectedMentor.availableSlots.find(
      (s) => s.date === selectedDate
    );
    if (slot) {
      timeSlots.innerHTML = "";
      slot.times.forEach((time) => {
        const timeSlot = document.createElement("div");
        timeSlot.classList.add("time-slot");
        timeSlot.textContent = time;
        timeSlot.addEventListener("click", function () {
          document
            .querySelectorAll(".time-slot")
            .forEach((ts) => ts.classList.remove("selected"));
          this.classList.add("selected");
          submitButton.disabled = false;
          updateProgressBar(3);
        });
        timeSlots.appendChild(timeSlot);
      });
    }
  }
}

function updateProgressBar(step) {
  progressSteps.forEach((stepElement, index) => {
    if (index < step) {
      stepElement.classList.add("completed");
      stepElement.classList.add("active");
    } else if (index === step) {
      stepElement.classList.add("active");
      stepElement.classList.remove("completed");
    } else {
      stepElement.classList.remove("active");
      stepElement.classList.remove("completed");
    }
  });
}

appointmentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedTimeSlot = document.querySelector(".time-slot.selected");
  if (!selectedTimeSlot) {
    alert("Please select a time slot");
    return;
  }
  const appointmentData = {
    mentor: mentorSelect.options[mentorSelect.selectedIndex].text,
    date: appointmentDate.value,
    time: selectedTimeSlot.textContent,
    notes: document.getElementById("appointmentNotes").value,
  };
  console.log("Appointment scheduled:", appointmentData);

  // Populate and show success page
  document.getElementById("successMentor").textContent = appointmentData.mentor;
  document.getElementById("successDate").textContent = appointmentData.date;
  document.getElementById("successTime").textContent = appointmentData.time;
  document.getElementById("successNotes").textContent =
    appointmentData.notes || "None";

  document.querySelector(".container").style.display = "none";
  document.getElementById("successPage").style.display = "flex";
});

// Add event listener for "Schedule Another Appointment" button
document
  .getElementById("newAppointmentBtn")
  .addEventListener("click", function () {
    document.querySelector(".container").style.display = "block";
    document.getElementById("successPage").style.display = "none";
    appointmentForm.reset();
    appointmentDate.disabled = true;
    timeSlots.innerHTML = "";
    submitButton.disabled = true;
    updateProgressBar(0);
    document.getElementById("mentorInfo").style.display = "none";
  });
