document.addEventListener("DOMContentLoaded", () => {
  const channelButtons = document.querySelectorAll(".channel-btn");
  const chatTitle = document.querySelector(".chat-title");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendBtn");
  const chatMessages = document.getElementById("chatMessages");
  const themeToggle = document.getElementById("themeToggle");
  const mentorsList = document.getElementById("mentorsList");
  const newChannelBtn = document.getElementById("newChannelBtn");
  const newChannelModal = document.getElementById("newChannelModal");
  const newChannelForm = document.getElementById("newChannelForm");
  const newDmBtn = document.getElementById("newDmBtn");
  const newDmModal = document.getElementById("newDmModal");
  const newDmForm = document.getElementById("newDmForm");
  const emojiBtn = document.getElementById("emojiBtn");
  const emojiPicker = document.getElementById("emojiPicker");
  const attachBtn = document.getElementById("attachBtn");
  const voiceCallBtn = document.getElementById("voiceCallBtn");
  const videoCallBtn = document.getElementById("videoCallBtn");
  const searchBtn = document.getElementById("searchBtn");
  const toggleChatInputBtn = document.getElementById("toggleChatInput");
  const chatInput = document.getElementById("chatInput");

  let currentUser = "You";
  let isDarkMode = false;

  // Channel switching
  channelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id !== "newChannelBtn") {
        channelButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        chatTitle.textContent = `#${button.dataset.channel}`;
      }
    });
  });

  // Sending messages
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      const newMessage = createMessageElement(currentUser, message);
      chatMessages.appendChild(newMessage);
      messageInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate a response after a short delay
      setTimeout(() => {
        const botMessage = createMessageElement(
          "Bot",
          "Thanks for your message! A mentor will respond soon."
        );
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }

  function createMessageElement(sender, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    if (sender === currentUser) {
      messageDiv.classList.add("outgoing");
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.innerHTML = `
              <img src="/placeholder.svg?height=40&width=40" alt="${sender}" class="message-avatar">
              <div class="message-content">
                  <div class="message-header">
                      <span class="message-sender">${sender}</span>
                      <span class="message-time">${currentTime}</span>
                  </div>
                  <div class="message-body">${content}</div>
              </div>
          `;
    return messageDiv;
  }

  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeToggle.textContent = isDarkMode ? "☀️" : "🌓";
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
              <img src="/placeholder.svg?height=40&width=40" alt="${mentor.name}" class="mentor-avatar">
              <div class="mentor-info">
                  <p class="mentor-name">${mentor.name}</p>
                  <p class="mentor-status ${mentor.status}">${mentor.status}</p>
              </div>
          `;
    mentorsList.appendChild(mentorElement);
  });

  // New Channel Modal
  newChannelBtn.addEventListener("click", () => {
    newChannelModal.style.display = "block";
  });

  newChannelForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const channelName = document.getElementById("newChannelName").value.trim();
    if (channelName) {
      addNewChannel(channelName);
      newChannelModal.style.display = "none";
      document.getElementById("newChannelName").value = "";
    }
  });

  function addNewChannel(channelName) {
    const newChannel = document.createElement("button");
    newChannel.classList.add("channel-btn");
    newChannel.dataset.channel = channelName.toLowerCase().replace(/\s+/g, "-");
    newChannel.innerHTML = `
              <svg class="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              ${channelName}
          `;
    newChannel.addEventListener("click", () => {
      channelButtons.forEach((btn) => btn.classList.remove("active"));
      newChannel.classList.add("active");
      chatTitle.textContent = `#${channelName}`;
    });
    document.querySelector(".channels").insertBefore(newChannel, newChannelBtn);
  }

  // New DM Modal
  newDmBtn.addEventListener("click", () => {
    newDmModal.style.display = "block";
  });

  newDmForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dmName = document.getElementById("newDmName").value.trim();
    if (dmName) {
      addNewDirectMessage(dmName);
      newDmModal.style.display = "none";
      document.getElementById("newDmName").value = "";
    }
  });

  function addNewDirectMessage(dmName) {
    const newDm = document.createElement("button");
    newDm.classList.add("dm-btn");
    newDm.innerHTML = `
              <svg class="dm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
              </svg>
              ${dmName}
          `;
    newDm.addEventListener("click", () => {
      channelButtons.forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".dm-btn")
        .forEach((btn) => btn.classList.remove("active"));
      newDm.classList.add("active");
      chatTitle.textContent = dmName;
    });
    document.querySelector(".direct-messages").insertBefore(newDm, newDmBtn);
  }

  // Close modals
  document.querySelectorAll(".close-modal").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      newChannelModal.style.display = "none";
      newDmModal.style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target === newChannelModal) {
      newChannelModal.style.display = "none";
    }
    if (e.target === newDmModal) {
      newDmModal.style.display = "none";
    }
  });
  // Emoji picker
  const emojis = ["😀", "😂", "😍", "🤔", "👍", "👎", "🎉", "🔥", "💯", "❤️"];
  emojis.forEach((emoji) => {
    const emojiButton = document.createElement("button");
    emojiButton.classList.add("emoji-btn");
    emojiButton.textContent = emoji;
    emojiButton.addEventListener("click", () => {
      messageInput.value += emoji;
      emojiPicker.style.display = "none";
    });
    emojiPicker.appendChild(emojiButton);
  });

  emojiBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    emojiPicker.style.display =
      emojiPicker.style.display === "none" ? "block" : "none";
  });

  // Close emoji picker when clicking outside
  document.addEventListener("click", (e) => {
    if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
      emojiPicker.style.display = "none";
    }
  });

  // Attach file (placeholder functionality)
  attachBtn.addEventListener("click", () => {
    alert("File attachment functionality would be implemented here.");
  });

  // Voice call (placeholder functionality)
  voiceCallBtn.addEventListener("click", () => {
    alert("Voice call functionality would be implemented here.");
  });

  // Video call (placeholder functionality)
  videoCallBtn.addEventListener("click", () => {
    alert("Video call functionality would be implemented here.");
  });

  // Search messages (placeholder functionality)
  searchBtn.addEventListener("click", () => {
    alert("Message search functionality would be implemented here.");
  });
});
