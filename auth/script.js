document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameInput = document.getElementById("name");
  const studentCheckbox = document.querySelector(".student input");
  const teacherCheckbox = document.querySelector(".teacher input");
  const togglePassword = document.querySelector(".toggle-password");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const closeModal = document.querySelector(".close");

  // Toggle password visibility
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      togglePassword.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
    });
  }

  // Form submission (Login)
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;

      // Retrieve user data using the email as the key
      const storedUserData = localStorage.getItem(email);
      if (storedUserData) {
        const { password: storedPassword } = JSON.parse(storedUserData);

        // Validate user credentials
        if (password === storedPassword) {
          showModal("Success", "Login successful! Redirecting...");
          setTimeout(() => {
            window.location.href = "/home/index.html";
          }, 2000);
        } else {
          showModal("Error", "Invalid email or password.");
          loginForm.classList.add("shake");
          setTimeout(() => loginForm.classList.remove("shake"), 500);
        }
      } else {
        showModal("Error", "Invalid email or password.");
        loginForm.classList.add("shake");
        setTimeout(() => loginForm.classList.remove("shake"), 500);
      }
    });
  }

  // Form submission (Signup)
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const role = studentCheckbox.checked ? "Student" : teacherCheckbox.checked ? "Teacher" : null;

      if (!role) {
        showModal("Error", "Please select either Student or Teacher.");
        return;
      }

      if (!name || !email || !password) {
        showModal("Error", "Please fill out all the fields.");
        return;
      }

      if (localStorage.getItem(email)) {
        showModal("Error", "Email is already registered.");
        return;
      }

      saveUserData(name, email, password, role);
      showModal("Success", "Sign up successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/auth/login.html";
      }, 2000);
      signupForm.reset(); // Reset the form after successful signup
    });
  }

  // Save user data in local storage
  function saveUserData(name, email, password, role) {
    const userData = {
      name: name,
      email: email,
      password: password,
      role: role,
    };
    localStorage.setItem(email, JSON.stringify(userData)); 
    console.log("User data saved:", userData);
  }

  // Show modal function
  function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "block";
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Email validation
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailInput.style.borderColor = emailRegex.test(emailInput.value) ? "green" : "red";
    });
  }

  // Password strength indicator
  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      const strength = calculatePasswordStrength(passwordInput.value);
      updatePasswordStrength(strength);
    });
  }

  function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  }

  function updatePasswordStrength(strength) {
    const strengthIndicator = document.createElement("div");
    strengthIndicator.className = "strength-indicator";
    strengthIndicator.style.height = "4px";
    strengthIndicator.style.marginTop = "4px";
    strengthIndicator.style.transition = "all 0.3s ease";

    const colors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71"];
    strengthIndicator.style.backgroundColor = colors[strength];
    strengthIndicator.style.width = `${(strength + 1) * 25}%`;

    const existingIndicator = passwordInput.parentNode.querySelector(".strength-indicator");
    if (existingIndicator) {
      existingIndicator.remove();
    }
    passwordInput.parentNode.appendChild(strengthIndicator);
  }
});
