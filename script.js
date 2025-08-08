// ========== [1] Live Chat Widget Bootstrapping (restored) ==========
const liveChatContainer = document.getElementById('live-chat-container');
if (liveChatContainer) {
  const divicw = document.createElement('div');
  divicw.id = 'divicw';
  divicw.setAttribute('data-bind', '3FBA03BF-7CDC-4DBE-97E8-F581949FC34C');
  divicw.setAttribute('data-org', '');
  liveChatContainer.appendChild(divicw);

  var i = {
    t: function () {
      var e = "https://media.imi.chat/widget/js/imichatinit.js";
      try {
        var o = new XMLHttpRequest();
        o.onreadystatechange = function () {
          if (this.readyState == 4) {
            var t = document.getElementById("divicw");
            if (this.status == 0) {
              i.o(t);
              return;
            }
            var e = document.createElement("script");
            e.innerHTML = this.responseText;
            t.parentNode.insertBefore(e, t.nextSibling);
          }
        };
        o.open("GET", e, true);
        o.send();
      } catch (s) {
        console.error(s);
      }
    },
    o: function (t) {
      t.insertAdjacentHTML(
        "afterend",
        `<iframe id="tls_al_frm" frameborder="0" style="overflow:hidden;height:208px;width:394px;position:fixed;display:block;right:48px;bottom:12px;z-index:99999;"></iframe>`
      );
    },
    s: function () {
      var t = document.getElementById("tls_al_frm");
      if (t) t.remove();
    },
  };
  i.t();
}

// ========== [2] Pane Toggle and Inactivity Auto-Close ==========
document.addEventListener('DOMContentLoaded', function () {
  const paneContainer = document.getElementById('contact-pane-container');
  const handle = document.getElementById('contact-us-handle');

  let paneOpen = false;
  let inactivityTimer = null;
  const INACTIVITY_TIME = 60000; // 60 seconds

  function openPane() {
    paneOpen = true;
    paneContainer.classList.add('open');
    paneContainer.classList.remove('closed');
    paneContainer.setAttribute('aria-expanded', 'true');
    startInactivityTimer();
  }

  function closePane() {
    paneOpen = false;
    paneContainer.classList.remove('open');
    paneContainer.classList.add('closed');
    paneContainer.setAttribute('aria-expanded', 'false');
    stopInactivityTimer();
  }

  function togglePane() {
    paneOpen ? closePane() : openPane();
  }

  function startInactivityTimer() {
    stopInactivityTimer(); // reset if already pending
    inactivityTimer = setTimeout(() => {
      if (paneOpen) closePane();
    }, INACTIVITY_TIME);
  }

  function stopInactivityTimer() {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }

  // Manual open/close via handle
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

  // Reset timer on user activity inside the pane
  ['mousemove', 'keydown', 'touchstart'].forEach(eventType => {
    paneContainer.addEventListener(eventType, () => {
      if (paneOpen) startInactivityTimer();
    });
  });

  // Ensure panel is reset on load
  window.addEventListener('load', () => {
    closePane();
  });
});
