document.addEventListener("DOMContentLoaded", () => {
  const channelButtons = document.querySelectorAll(".channel-btn");
  const chatHeader = document.querySelector(".chat-header h2");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendBtn");
  const channelSidebar = document.getElementById("channelSidebar");
  const mentorsSidebar = document.getElementById("mentorsSidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const mentorsToggle = document.getElementById("mentorsToggle");
  const channelToggle = document.getElementById("channelToggle");
  const closeMentors = document.getElementById("closeMentors");
  const chatMessages = document.getElementById("chatMessages");
  const newChannelBtn = document.getElementById("newChannelBtn");
  const newChannelModal = document.getElementById("newChannelModal");
  const createChannelBtn = document.getElementById("createChannelBtn");
  const newChannelName = document.getElementById("newChannelName");
  const closeModal = document.querySelector(".close-modal");
  const themeToggle = document.getElementById("themeToggle");
  const emojiBtn = document.getElementById("emojiBtn");
  const emojiPicker = document.getElementById("emojiPicker");
  const attachBtn = document.getElementById("attachBtn");
  const findMentorsBtn = document.getElementById("findMentorsBtn");
  const mentorsList = document.getElementById("mentorsList");

  let currentUser = "You";
  let isDarkMode = false;

  // Channel switching
  channelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      channelButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      chatHeader.textContent = `#${button.dataset.channel}`;
      if (window.innerWidth <= 768) {
        channelSidebar.classList.remove("active");
      }
    });
  });

  // Sending messages
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      const newMessage = document.createElement("div");
      newMessage.classList.add("message", "outgoing");
      newMessage.innerHTML = `
                <div class="message-content">
                    <p><strong>${currentUser}:</strong> ${message}</p>
                </div>
            `;
      chatMessages.appendChild(newMessage);
      messageInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate a response after a short delay
      setTimeout(() => {
        const responseMessage = document.createElement("div");
        responseMessage.classList.add("message");
        responseMessage.innerHTML = `
                    <div class="message-content">
                        <p><strong>Bot:</strong> Thanks for your message! A mentor will respond soon.</p>
                    </div>
                `;
        chatMessages.appendChild(responseMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }

  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Mobile menu toggles
  sidebarToggle.addEventListener("click", () => {
    channelSidebar.classList.toggle("active");
    mentorsSidebar.classList.remove("active");
  });

  mentorsToggle.addEventListener("click", () => {
    mentorsSidebar.classList.toggle("active");
    channelSidebar.classList.remove("active");
  });

  channelToggle.addEventListener("click", () => {
    channelSidebar.classList.remove("active");
  });

  closeMentors.addEventListener("click", () => {
    mentorsSidebar.classList.remove("active");
  });

  // New channel modal
  newChannelBtn.addEventListener("click", () => {
    newChannelModal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    newChannelModal.style.display = "none";
  });

  createChannelBtn.addEventListener("click", () => {
    const channelName = newChannelName.value.trim();
    if (channelName) {
      const newChannel = document.createElement("button");
      newChannel.classList.add("channel-btn");
      newChannel.dataset.channel = channelName
        .toLowerCase()
        .replace(/\s+/g, "-");
      newChannel.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="channel-icon"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                ${channelName}
            `;
      newChannel.addEventListener("click", () => {
        channelButtons.forEach((btn) => btn.classList.remove("active"));
        newChannel.classList.add("active");
        chatHeader.textContent = `#${channelName}`;
      });
      document
        .querySelector(".channels")
        .insertBefore(newChannel, newChannelBtn);
      newChannelModal.style.display = "none";
      newChannelName.value = "";
    }
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
  });

  // Emoji picker
  const emojis = ["😀", "😂", "😍", "🤔", "👍", "👎", "🎉", "🔥", "💯", "❤️"];
  emojis.forEach((emoji) => {
    const emojiButton = document.createElement("button");
    emojiButton.textContent = emoji;
    emojiButton.addEventListener("click", () => {
      messageInput.value += emoji;
      emojiPicker.style.display = "none";
    });
    emojiPicker.appendChild(emojiButton);
  });

  emojiBtn.addEventListener("click", () => {
    emojiPicker.style.display =
      emojiPicker.style.display === "none" ? "block" : "none";
  });

  // Attach file (placeholder functionality)
  attachBtn.addEventListener("click", () => {
    alert("File attachment functionality would be implemented here.");
  });

  // Find mentors (placeholder functionality)
  findMentorsBtn.addEventListener("click", () => {
    alert("Find mentors functionality would be implemented here.");
  });

  // Populate mentors list
  const mentors = [
    { name: "Emma Brown", status: "online" },
    { name: "Michael Lee", status: "offline" },
    { name: "Sarah Davis", status: "online" },
    { name: "John Smith", status: "online" },
    { name: "Lisa Wang", status: "offline" },
  ];

  mentors.forEach((mentor) => {
    const mentorElement = document.createElement("div");
    mentorElement.classList.add("mentor");
    mentorElement.innerHTML = `
            <img src="/placeholder.svg?height=40&width=40" alt="${mentor.name}" class="avatar">
            <div class="mentor-info">
                <p class="mentor-name">${mentor.name}</p>
                <p class="mentor-status ${mentor.status}">${mentor.status}</p>
            </div>
        `;
    mentorsList.appendChild(mentorElement);
  });

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === newChannelModal) {
      newChannelModal.style.display = "none";
    }
  });

  // User menu toggle
  const userMenu = document.querySelector(".user-menu");
  const userDropdown = document.querySelector(".user-dropdown");
  userMenu.addEventListener("click", () => {
    userDropdown.style.display =
      userDropdown.style.display === "none" ? "block" : "none";
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!userMenu.contains(e.target)) {
      userDropdown.style.display = "none";
    }
    if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
      emojiPicker.style.display = "none";
    }
  });

  // Voice and video call buttons (placeholder functionality)
  const voiceCallBtn = document.getElementById("voiceCallBtn");
  const videoCallBtn = document.getElementById("videoCallBtn");

  voiceCallBtn.addEventListener("click", () => {
    alert("Voice call functionality would be implemented here.");
  });

  videoCallBtn.addEventListener("click", () => {
    alert("Video call functionality would be implemented here.");
  });

  // Search messages (placeholder functionality)
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", () => {
    alert("Message search functionality would be implemented here.");
  });
});
