// =======================================
// Demo Project: Bootstrap Sidebar with Webhook Selection
// =======================================

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle logic
  const pane = document.getElementById('contact-pane-container');
  const handle = document.getElementById('contact-us-handle');

  let paneOpen = false;
  let inactivityTimer;
  const INACTIVITY_TIMEOUT = 60000; // 60 seconds

  function openPane() {
    pane.classList.add('open');
    pane.classList.remove('closed');
    pane.setAttribute('aria-expanded', 'true');
    paneOpen = true;
    resetInactivityTimer();
  }

  function closePane() {
    pane.classList.remove('open');
    pane.classList.add('closed');
    pane.setAttribute('aria-expanded', 'false');
    paneOpen = false;
    clearTimeout(inactivityTimer);
  }

  function togglePane() {
    paneOpen ? closePane() : openPane();
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (paneOpen) closePane();
    }, INACTIVITY_TIMEOUT);
  }

  handle.addEventListener('click', e => {
    e.stopPropagation();
    togglePane();
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', e => {
    if (!pane.contains(e.target) && paneOpen) {
      closePane();
    }
  });

  // Reset inactivity timer on user activity in sidebar
  ['mousemove', 'keydown', 'touchstart'].forEach(evt =>
    pane.addEventListener(evt, () => {
      if (paneOpen) resetInactivityTimer();
    }));

  // Hide sidebar on page load
  window.addEventListener('load', () => closePane());

  // Insert Notification Sidebar HTML if not already present
  if (!document.getElementById('notificationSidebar')) {
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
                <option value="us">US</option>
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
              <input class="form-control" id="phoneInput" placeholder="Enter or select phone" required />
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
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', sidebarHtml);
  }

  // Insert Sidebar Toggle Icon if not present
  if (!document.getElementById('notificationSidebarToggle')) {
    const iconHtml = `
      <button id="notificationSidebarToggle" aria-label="Toggle Notifications" class="btn btn-primary"
              data-bs-toggle="offcanvas" data-bs-target="#notificationSidebar" aria-controls="notificationSidebar">
        <img src="https://path.to/notification-icon.png" alt="Notifications" style="width:24px; height:24px;">
      </button>
    `;
    document.body.insertAdjacentHTML('beforeend', iconHtml);
  }

  const webhookSelect = document.getElementById('webhookSelect');
  const nameSelect = document.getElementById('nameSelect');
  const phoneInput = document.getElementById('phoneInput');
  const messageTypeSelect = document.getElementById('messageTypeSelect');
  const notificationForm = document.getElementById('notificationForm');
  const formStatus = document.getElementById('formStatus');

  // Mapping names to phone numbers per region
  const phoneMap = {
    sg: {
      Christopher: "6589482764",
      Shailesh: "6598350480"
    },
    us: {
      Christopher: "12025550123",
      Shailesh: "12025550124"
    }
  };

  // Update phone input when name or region changes
  function updatePhone() {
    const region = webhookSelect.value;
    const name = nameSelect.value;
    phoneInput.value = phoneMap[region][name] || "";
  }

  nameSelect.addEventListener('change', updatePhone);
  webhookSelect.addEventListener('change', () => {
    nameSelect.value = "";
    phoneInput.value = "";
  });

  // Handle form submission and send webhook
  notificationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      Name: nameSelect.value,
      Phone: phoneInput.value,
      MessageType: messageTypeSelect.value
    };

    const webhookUrls = {
      sg: 'https://hooks.sg.webexconnect.io/events/121EZ3LM7',
      us: 'https://hooks.us.webexconnect.io/events/PLI95DM'
    };

    const selectedWebhook = webhookUrls[webhookSelect.value] || webhookUrls.sg;

    formStatus.style.display = 'none';

    try {
      const response = await fetch(selectedWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      formStatus.textContent = 'Message sent!';
      formStatus.style.display = 'block';
    } catch {
      formStatus.textContent = 'Failed to send message.';
      formStatus.style.display = 'block';
    } finally {
      setTimeout(() => {
        formStatus.style.display = 'none';
        notificationForm.reset();
      }, 3000);
    }
  });

});
