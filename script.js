// =======================================
// Complete script.js for demo projects:
// Bootstrap Sidebar + Notification Form with Webhook Region Selection
// =======================================

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar toggle + auto-close logic
  const pane = document.getElementById("contact-pane-container");
  const handle = document.getElementById("contact-us-handle");
  let paneOpen = false;
  let inactivityTimer = null;
  const INACTIVITY_TIMEOUT = 60000; // 60 seconds

  // Show sidebar and set ARIA attributes
  function openPane() {
    pane.classList.add("open");
    pane.classList.remove("closed");
    pane.setAttribute("aria-expanded", "true");
    paneOpen = true;
    resetInactivityTimer();
  }

  // Hide sidebar and set ARIA attributes
  function closePane() {
    pane.classList.remove("open");
    pane.classList.add("closed");
    pane.setAttribute("aria-expanded", "false");
    paneOpen = false;
    clearTimeout(inactivityTimer);
  }

  // Toggle sidebar open/close
  function togglePane() {
    paneOpen ? closePane() : openPane();
  }

  // Reset inactivity timer to auto-close sidebar after timeout
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (paneOpen) closePane();
    }, INACTIVITY_TIMEOUT);
  }

  // Event: sidebar handle click toggles sidebar
  handle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePane();
  });

  // Event: click outside sidebar closes it if open
  document.addEventListener("click", (e) => {
    if (!pane.contains(e.target) && paneOpen) closePane();
  });

  // Event: reset inactivity timer on user interaction within sidebar
  ["mousemove", "keydown", "touchstart"].forEach((evt) => {
    pane.addEventListener(evt, () => {
      if (paneOpen) resetInactivityTimer();
    });
  });

  // Close sidebar on initial page load
  window.addEventListener("load", () => closePane());

  // Insert Notification Sidebar HTML if missing
  if (!document.getElementById("notificationSidebar")) {
    const sidebarHtml = `
      <div class="offcanvas offcanvas-start" tabindex="-1" id="notificationSidebar" aria-labelledby="notificationSidebarLabel" style="width: 260px;">
        <div class="offcanvas-header" style="background-color:#053566; color:#fff;">
          <h5 class="offcanvas-title" id="notificationSidebarLabel">Notifications & Offers</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <form id="notificationForm">
            <div class="mb-3">
              <label for="webhookSelect" class="form-label fw-semibold">Select Region</label>
              <select class="form-select" id="webhookSelect" required>
                <option value="sg" selected>Singapore</option>
                <option value="us">USA</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="nameSelect" class="form-label fw-semibold">Name</label>
              <select class="form-select" id="nameSelect" required>
                <option value="" disabled selected>Select Name</option>
                <option value="Christopher">Christopher</option>
                <option value="Shailesh">Shailesh</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="phoneInput" class="form-label fw-semibold">Phone Number</label>
              <input class="form-control" id="phoneInput" placeholder="Phone Number" required readonly />
            </div>
            <div class="mb-3">
              <label for="messageTypeSelect" class="form-label fw-semibold">Message Type</label>
              <select class="form-select" id="messageTypeSelect" required>
                <option value="" disabled selected>Select Type</option>
                <option value="Notification">Notification</option>
                <option value="Offer">Offer</option>
                <option value="Reminder">Reminder</option>
                <option value="Chat">Chat</option>
              </select>
            </div>
            <button class="btn btn-primary w-100" type="submit">Send</button>
          </form>
          <div id="formStatus" class="mt-2 text-success" style="display:none;">Message sent!</div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", sidebarHtml);
  }

  // Insert Sidebar toggle button if missing
  if (!document.getElementById("notificationSidebarToggle")) {
    const toggleHtml = `
      <button id="notificationSidebarToggle" aria-label="Toggle Notifications" class="btn btn-primary"
        data-bs-toggle="offcanvas" data-bs-target="#notificationSidebar" aria-controls="notificationSidebar" style="position: fixed; bottom: 12px; left: 12px; z-index: 1050;">
        &#128276;
      </button>`;
    document.body.insertAdjacentHTML("beforeend", toggleHtml);
  }

  // Get references to all the form controls
  const webhookSelect = document.getElementById("webhookSelect");
  const nameSelect = document.getElementById("nameSelect");
  const phoneInput = document.getElementById("phoneInput");
  const messageTypeSelect = document.getElementById("messageTypeSelect");
  const notificationForm = document.getElementById("notificationForm");
  const formStatus = document.getElementById("formStatus");

  // Phone number mappings per region for Christopher and Shailesh only
  const phoneMap = {
    sg: {
      Christopher: "6589485304",
      Shailesh: "6598250480",
    },
    us: {
      Christopher: "12025550123",
      Shailesh: "12025550124",
    },
  };

  // Update phone number input based on selected region and name
  function updatePhone() {
    const region = webhookSelect.value;
    const name = nameSelect.value;
    phoneInput.value = phoneMap[region][name] || "";
  }

  // Update phone on name selection change
  nameSelect.addEventListener("change", updatePhone);

  // Reset name and phone when region changes
  webhookSelect.addEventListener("change", () => {
    nameSelect.value = "";
    phoneInput.value = "";
  });

  // Handle form submission: send data to selected webhook URL
  notificationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      Name: nameSelect.value,
      Phone: phoneInput.value,
      MessageType: messageTypeSelect.value,
    };

    const webhookUrls = {
      sg: "https://hooks.sg.webexconnect.io/events/121EZ3LMW7",
      us: "https://hooks.us.webexconnect.io/events/PLI95JDMQF",
    };

    const selectedWebhook = webhookUrls[webhookSelect.value] || webhookUrls.sg;

    formStatus.style.display = "none";

    try {
      const response = await fetch(selectedWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      formStatus.textContent = "Message sent!";
      formStatus.style.display = "block";
    } catch {
      formStatus.textContent = "Failed to send message.";
      formStatus.style.display = "block";
    } finally {
      setTimeout(() => {
        formStatus.style.display = "none";
        notificationForm.reset();
      }, 3000);
    }
  });
});
