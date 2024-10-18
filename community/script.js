document.addEventListener("DOMContentLoaded", () => {
  const channelButtonsContainer = document.querySelector(".channels");
  const chatTitle = document.querySelector(".chat-title");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendBtn");
  const chatMessages = document.getElementById("chatMessages");
  const themeToggle = document.getElementById("themeToggle");
  const mentorsList = document.getElementById("mentorsList");
  const newChannelBtn = document.getElementById("newChannelBtn");
  const newChannelModal = document.getElementById("newChannelModal");
  const newChannelForm = document.getElementById("newChannelForm");

  let currentUser = "You";
  let currentChannel = "general";
  let isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

  // Load saved theme and messages on page load
  loadTheme();
  loadChannels(); // Load saved channels
  loadMessages(currentChannel); // Load messages for the current channel

  // Channel switching
  function switchChannel(channel) {
    document.querySelectorAll(".channel-btn").forEach((btn) => btn.classList.remove("active"));
    const activeButton = document.querySelector(`[data-channel="${channel}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
      chatTitle.textContent = `#${channel}`;
      currentChannel = channel;
      loadMessages(channel);
    }
  }

  // Sending messages
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      const newMessage = createMessageElement(currentUser, message);
      chatMessages.appendChild(newMessage);
      messageInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Save message to local storage
      saveMessage(currentChannel, currentUser, message);

      // Simulate a response after a short delay
      setTimeout(() => {
        const botMessage = createMessageElement("Bot", "Thanks for your message! A mentor will respond soon.");
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Save bot message to local storage
        saveMessage(currentChannel, "Bot", "Thanks for your message! A mentor will respond soon.");
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
              <img src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png" alt="${sender}" class="message-avatar">
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

  // Save messages to local storage
  function saveMessage(channel, sender, content) {
    const messages = JSON.parse(localStorage.getItem(channel)) || [];
    const messageData = {
      sender: sender,
      content: content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    messages.push(messageData);
    localStorage.setItem(channel, JSON.stringify(messages));
  }

  // Load messages from local storage
  function loadMessages(channel) {
    chatMessages.innerHTML = "";
    const messages = JSON.parse(localStorage.getItem(channel)) || [];
    messages.forEach((message) => {
      const messageElement = createMessageElement(message.sender, message.content);
      chatMessages.appendChild(messageElement);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
  }

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeToggle.textContent = isDarkMode ? "☀️" : "🌓";
    localStorage.setItem("darkMode", isDarkMode);
  });

  function loadTheme() {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      themeToggle.textContent = "🌓";
    }
  }

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
    const formattedChannel = channelName.toLowerCase().replace(/\s+/g, "-");

    // Check if channel already exists in local storage to prevent overwriting
    let channelsList = JSON.parse(localStorage.getItem("channelsList")) || [];
    if (channelsList.includes(formattedChannel)) {
      alert("Channel already exists!");
      return;
    }

    // Add new channel to the sidebar and local storage
    createChannelButton(formattedChannel);
    channelsList.push(formattedChannel);
    localStorage.setItem("channelsList", JSON.stringify(channelsList));
    localStorage.setItem(formattedChannel, JSON.stringify([]));
  }

  // Create channel button element
  function createChannelButton(channelName) {
    const newChannel = document.createElement("button");
    newChannel.classList.add("channel-btn");
    newChannel.dataset.channel = channelName;
    newChannel.innerHTML = `
              <svg class="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              ${channelName}
          `;
    newChannel.addEventListener("click", () => switchChannel(channelName));
    channelButtonsContainer.insertBefore(newChannel, newChannelBtn);
  }

  // Load saved channels from local storage on page load
  function loadChannels() {
    let channelsList = JSON.parse(localStorage.getItem("channelsList")) || ["general"];
    channelsList.forEach((channelName) => {
      createChannelButton(channelName);
    });
    switchChannel(currentChannel);
  }

  // Populate mentors list
  const mentors = [
    { name: "Dr. Birmohan Singh", status: "online" , profile: "http://sliet.ac.in/wp-content/uploads/avatars/5/6fc17d6735998f4f22a0e91fbf43b75c-bpfull.jpg" },
    { name: "Dr. Manoj Sachan", status: "offline", profile: "http://sliet.ac.in/wp-content/uploads/avatars/6/605c66bd3e3bc-bpfull.jpg" },
    { name: "Dr. Gurjinder Kaur", status: "online", profile: "http://sliet.ac.in/wp-content/uploads/avatars/14/5f2245e7a7f1bde5dee5bda48e09d411-bpfull.jpg" },
    { name: "Dr. Jagdeep Singh", status: "online", profile:"http://sliet.ac.in/wp-content/uploads/avatars/466/66f81ca30f4ff-bpfull.jpg" },
    { name: "Dr. Manminder Singh", status: "offline", profile:"http://sliet.ac.in/wp-content/uploads/avatars/16/66693282b6269-bpfull.jpg" },
  ];

  mentors.forEach((mentor) => {
    const mentorElement = document.createElement("div");
    mentorElement.classList.add("mentor");
    mentorElement.innerHTML = `
              <img src="${mentor.profile}" alt="${mentor.name}" class="mentor-avatar">
              <div class="mentor-info">
                  <p class="mentor-name">${mentor.name}</p>
                  <p class="mentor-status ${mentor.status}">${mentor.status}</p>
              </div>
          `;
    mentorsList.appendChild(mentorElement);
  });
});
