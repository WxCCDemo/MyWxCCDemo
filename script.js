document.addEventListener('DOMContentLoaded', function () {
  const paneContainer = document.getElementById('contact-pane-container');
  const handle = document.getElementById('contact-us-handle');

  let paneOpen = false;
  let inactivityTimer = null;
  const INACTIVITY_DURATION = 60000; // 1 minute in milliseconds

  function openPane() {
    paneOpen = true;
    paneContainer.classList.add('open');
    paneContainer.classList.remove('closed');
    paneContainer.setAttribute('aria-expanded', 'true');
    handle.setAttribute('aria-expanded', 'true');
    startInactivityTimer();
  }

  function closePane() {
    paneOpen = false;
    paneContainer.classList.remove('open');
    paneContainer.classList.add('closed');
    paneContainer.setAttribute('aria-expanded', 'false');
    handle.setAttribute('aria-expanded', 'false');
    stopInactivityTimer();
  }

  function togglePane() {
    if (paneOpen) {
      closePane();
    } else {
      openPane();
    }
  }

  function startInactivityTimer() {
    stopInactivityTimer();
    inactivityTimer = setTimeout(closePane, INACTIVITY_DURATION);
  }

  function stopInactivityTimer() {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }

  // Toggle panel via handle
  if (handle && paneContainer) {
    handle.addEventListener('click', function (e) {
      togglePane();
      e.stopPropagation();
    });

    // Auto-close on outside click
    document.addEventListener('click', function (e) {
      if (!paneContainer.contains(e.target) && paneOpen) {
        closePane();
      }
    });

    // Reset inactivity timer on user interaction
    ['mousemove', 'keydown', 'touchstart'].forEach(eventName => {
      paneContainer.addEventListener(eventName, () => {
        if (paneOpen) startInactivityTimer();
      });
    });
  }
});
