document.addEventListener('DOMContentLoaded', function () {
  const paneContainer = document.getElementById('contact-pane-container');
  const handle = document.getElementById('contact-us-handle');

  let paneOpen = false;
  let inactivityTimer = null;

  // Duration of inactivity before auto-closing (ms)
  const INACTIVITY_DURATION = 60000; // 1 minute

  // Opens the pane visually and logically
  function openPane() {
    paneOpen = true;
    paneContainer.classList.add('open');
    paneContainer.classList.remove('closed');
    paneContainer.setAttribute('aria-expanded', 'true');
    handle.setAttribute('aria-expanded', 'true');
    startInactivityTimer(); // Begin countdown
  }

  // Closes the pane visually and logically
  function closePane() {
    paneOpen = false;
    paneContainer.classList.remove('open');
    paneContainer.classList.add('closed');
    paneContainer.setAttribute('aria-expanded', 'false');
    handle.setAttribute('aria-expanded', 'false');
    stopInactivityTimer();
  }

  // Toggle logic based on state
  function togglePane() {
    if (paneOpen) {
      closePane();
    } else {
      openPane();
    }
  }

  // Starts the inactivity countdown
  function startInactivityTimer() {
    stopInactivityTimer(); // Prevent duplicate timers
    inactivityTimer = setTimeout(closePane, INACTIVITY_DURATION);
  }

  // Clears the current inactivity timer if any
  function stopInactivityTimer() {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }

  // Event: Clicking the handle toggles panel
  if (handle && paneContainer) {
    handle.addEventListener('click', function (e) {
      togglePane();
      e.stopPropagation();
    });

    // Auto-close if background area is clicked while pane is open
    document.addEventListener('click', function (e) {
      if (!paneContainer.contains(e.target) && paneOpen) {
        closePane();
      }
    });

    // Listen for user activity inside the panel to reset the timer
    ['mousemove', 'keydown', 'touchstart'].forEach(eventName => {
      paneContainer.addEventListener(eventName, () => {
        if (paneOpen) startInactivityTimer();
      });
    });
  }
});
