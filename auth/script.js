document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password");
  const signupLink = document.getElementById("signupLink");
  const forgotPassword = document.getElementById("forgotPassword");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const closeModal = document.querySelector(".close");

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
  });

  // Form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    // Simple validation
    if (email === "user@example.com" && password === "password") {
      showModal("Success", "Login successful!");
    } else {
      showModal("Error", "Invalid email or password");
      loginForm.classList.add("shake");
      setTimeout(() => loginForm.classList.remove("shake"), 500);
    }
  });

  // Sign up link
  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    showModal("Sign Up", "Sign up functionality would be implemented here.");
  });

  // Forgot password link
  forgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    showModal(
      "Forgot Password",
      "Password reset functionality would be implemented here."
    );
  });

  // Social login buttons
  document.querySelectorAll(".social-button").forEach((button) => {
    button.addEventListener("click", () => {
      const provider = button.classList.contains("google")
        ? "Google"
        : "GitHub";
      showModal(
        "Social Login",
        `${provider} login functionality would be implemented here.`
      );
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Show modal function
  function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "block";
  }

  backgroundImage.addEventListener("mouseleave", () => {
    backgroundImage.style.transform = "scale(1) translate(0, 0)";
  });

  // Email validation
  emailInput.addEventListener("blur", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailInput.style.borderColor = "red";
    } else {
      emailInput.style.borderColor = "green";
    }
  });

  // Password strength indicator
  passwordInput.addEventListener("input", () => {
    const strength = calculatePasswordStrength(passwordInput.value);
    updatePasswordStrength(strength);
  });

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

    const existingIndicator = passwordInput.parentNode.querySelector(
      ".strength-indicator"
    );
    if (existingIndicator) {
      existingIndicator.remove();
    }
    passwordInput.parentNode.appendChild(strengthIndicator);
  }
});
