// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if(mobileMenu){

  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Mentor carousel
const mentorSlides = document.querySelectorAll(".mentor-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let currentSlide = 0;

function showSlide(n) {
  mentorSlides[currentSlide].style.display = "none";
  currentSlide = (n + mentorSlides.length) % mentorSlides.length;
  mentorSlides[currentSlide].style.display = "block";
}

prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

// Initialize the first slide
showSlide(0);

// Simple testimonial carousel
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showNextTestimonial() {
  testimonials[currentTestimonial].classList.remove("active");
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add("active");
}

setInterval(showNextTestimonial, 5000); // Change testimonial every 5 seconds

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// NAvbar
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navList = document.querySelector(".nav-list");
  const dropdownItems = document.querySelectorAll(".has-dropdown");

  mobileMenuToggle.addEventListener("click", function () {
    navList.classList.toggle("show");
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.classList.toggle("active");
        const dropdownArrow = this.querySelector(".dropdown-arrow");
        dropdownArrow.textContent = this.classList.contains("active")
          ? "▲"
          : "▼";
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navList.classList.remove("show");
      dropdownItems.forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".dropdown-arrow").textContent = "▼";
      });
    }
  });
});

//chatbot funtction

document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.querySelector(".chat-container");
  const openChatBtn = document.getElementById("openChat");
  const closeChat = document.getElementById("closeChat");
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const sendMessage = document.getElementById("sendMessage");
  const suggestedQuestion1 = document.getElementById("suggestedQuestion1");
  const suggestedQuestion2 = document.getElementById("suggestedQuestion2");

  const botResponses = {
    hello: "Hello! How can I assist you today?",
    hi: "Hi there! What can I help you with?",
    "how are you": "I'm doing well, thank you for asking. How can I help you?",
    bye: "Goodbye! Feel free to come back if you have more questions.",
    "thank you": "You're welcome! Is there anything else I can help you with?",
    thanks: "You're welcome! Is there anything else I can help you with?",
    mentor:
      "SLIET is a platform that connects students with experienced mentors. Would you like to know more about finding a mentor or the benefits of mentorship?",
    "find a mentor":
      "To find a mentor on SLIET, follow these steps:\n1. Create an account and complete your profile\n2. Browse available mentors in your field of interest\n3. Send a connection request to mentors you'd like to work with\n4. Once accepted, schedule your first mentoring session",
    "benefits of mentorship":
      "Mentorship offers numerous benefits, including:\n- Gaining industry insights and knowledge\n- Developing new skills and improving existing ones\n- Expanding your professional network\n- Receiving guidance on career decisions\n- Building confidence and self-awareness",
    "how does SLIET work":
      "SLIET works by:\n1. Matching students with experienced mentors based on their field of interest\n2. Facilitating communication and scheduling of mentoring sessions\n3. Providing resources and tools for effective mentorship\n4. Tracking progress and gathering feedback to improve the mentoring experience",
    default:
      "I'm sorry, I don't have a specific answer for that. Can you try rephrasing your question or ask about finding a mentor or the benefits of mentorship?",
  };

  function addMessage(message, isUser = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(isUser ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    for (const key in botResponses) {
      if (lowerCaseMessage.includes(key)) {
        return botResponses[key];
      }
    }
    return botResponses["default"];
  }

  function sendUserMessage() {
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, true);
      userInput.value = "";

      setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse);
      }, 500);
    }
  }

  openChatBtn.addEventListener("click", () => {
    console.log('clicked')
    chatContainer.classList.add("active");
    openChatBtn.style.display = "none";
    addMessage("Hello! I'm the SLIET Assistant. How can I help you today?");
  });

  closeChat.addEventListener("click", () => {
    chatContainer.classList.remove("active");
    openChatBtn.style.display = "block";
  });

  sendMessage.addEventListener("click", sendUserMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendUserMessage();
    }
  });

  suggestedQuestion1.addEventListener("click", () => {
    addMessage(suggestedQuestion1.textContent, true);
    setTimeout(() => {
      addMessage(botResponses["find a mentor"]);
    }, 500);
  });

  suggestedQuestion2.addEventListener("click", () => {
    addMessage(suggestedQuestion2.textContent, true);
    setTimeout(() => {
      addMessage(botResponses["benefits of mentorship"]);
    }, 500);
  });

  // Typing indicator
  let typingTimer;
  userInput.addEventListener("input", () => {
    clearTimeout(typingTimer);
    sendMessage.textContent = "Typing...";
    typingTimer = setTimeout(() => {
      sendMessage.textContent = "Send";
    }, 1000);
  });

  // Animated ellipsis for bot typing
  function animateBotTyping() {
    let dots = "";
    const typingElement = document.createElement("div");
    typingElement.classList.add("message", "bot-message", "bot-typing");
    chatMessages.appendChild(typingElement);

    const typingAnimation = setInterval(() => {
      dots = dots.length < 3 ? dots + "." : "";
      typingElement.textContent = `Typing${dots}`;
    }, 500);

    return {
      element: typingElement,
      animation: typingAnimation,
    };
  }

  // Enhance sendUserMessage function
  function sendUserMessage() {
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, true);
      userInput.value = "";

      const botTyping = animateBotTyping();

      setTimeout(() => {
        clearInterval(botTyping.animation);
        botTyping.element.remove();
        const botResponse = getBotResponse(message);
        addMessage(botResponse);
      }, 1500);
    }
  }
});
