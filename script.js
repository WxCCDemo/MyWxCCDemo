// ======== 1. Live Chat Widget Loader (DO NOT REMOVE) ========
const liveChatContainer = document.getElementById('live-chat-container');

if (liveChatContainer) {
  const divicw = document.createElement("div");
  divicw.id = "divicw";
  divicw.setAttribute("data-bind", "3FBA03BF-7CDC-4DBE-97E8-F581949FC34C");
  divicw.setAttribute("data-org", "");
  liveChatContainer.appendChild(divicw);

  const i = {
    t: function () {
      const url = "https://media.imi.chat/widget/js/imichatinit.js";
      try {
        const o = new XMLHttpRequest();
        o.onreadystatechange = function () {
          if (this.readyState == 4) {
            const t = document.getElementById("divicw");
            if (this.status == 0) {
              i.o(t);
              return;
            }
            const e = document.createElement("script");
            e.innerHTML = this.responseText;
            t.parentNode.insertBefore(e, t.nextSibling);
          }
        };
        o.open("GET", url, true);
        o.send();
      } catch (e) {
        console.error(e);
      }
    },
    o: function (t) {
      t.insertAdjacentHTML(
        "afterend",
        '<iframe id="tls_al_frm" frameborder="0" style="overflow:hidden;height:208px;width:394px;position:fixed;right:48px;bottom:12px;z-index:99999;"></iframe>'
      );
    },
    s: function () {
      const t = document.getElementById("tls_al_frm");
      if (t) t.remove();
    },
  };

  i.t();
}

// ======== 2. Contact Panel Behaviour ========
document.addEventListener("DOMContentLoaded", () => {
  const pane = document.getElementById("contact-pane-container");
  const handle = document.getElementById("contact-us-handle");

  let paneOpen = false;
  let inactivityTimer = null;
  const INACTIVITY_DELAY = 60000; // 60s

  function openPane() {
    pane.classList.add("open");
    pane.classList.remove("closed");
    pane.setAttribute("aria-expanded", "true");
    paneOpen = true;
    startInactivityTimer();
  }

  function closePane() {
    pane.classList.remove("open");
    pane.classList.add("closed");
    pane.setAttribute("aria-expanded", "false");
    paneOpen = false;
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }

  function togglePane() {
    paneOpen ? closePane() : openPane();
  }

  function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (paneOpen) closePane();
    }, INACTIVITY_DELAY);
  }

  // ⇨ Toggle via tab click
  handle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePane();
  });

  // ⇨ Auto close on outside click
  document.addEventListener("click", (e) => {
    if (!pane.contains(e.target) && paneOpen) {
      closePane();
    }
  });

  // ⇨ Reset inactivity on movement
  ["mousemove", "keydown", "touchstart"].forEach((evt) => {
    pane.addEventListener(evt, () => {
      if (paneOpen) startInactivityTimer();
    });
  });

  // ⇨ Ensure default closed state
  window.addEventListener("load", () => {
    closePane();
  });
});
