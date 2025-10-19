// =======================================
// [1] Live Chat Widget Loader (Do Not Remove)
// =======================================
//const liveChatContainer = document.getElementById('live-chat-container');
//if (liveChatContainer) {
//  const divicw = document.createElement("div");
//  divicw.id = "divicw";
//  divicw.setAttribute("data-bind", "3FBA03BF-7CDC-4DBE-97E8-F581949FC34C");
//  divicw.setAttribute("data-org", "");
//  liveChatContainer.appendChild(divicw);
//  const i = {
//    t: function () {
//      const url = "https://media.imi.chat/widget/js/imichatinit.js";
//      try {
//        const o = new XMLHttpRequest();
//        o.onreadystatechange = function () {
//          if (this.readyState == 4) {
//            const t = document.getElementById("divicw");
//            if (this.status == 0) {
//              i.o(t);
//              return;
//            }
//            const e = document.createElement("script");
//            e.innerHTML = this.responseText;
//            t.parentNode.insertBefore(e, t.nextSibling);
//          }
//        };
//        o.open("GET", url, true);
//        o.send();
//      } catch (e) {
//       console.error("Chat Widget Error:", e);
//     }
//    },
//    o: function (t) {
//     t.insertAdjacentHTML(
//       "afterend",
//       '<iframe id="tls_al_frm" frameborder="0" style="overflow:hidden;height:208px;width:394px;position:fixed;left:48px;bottom:12px;z-index:99999;"></iframe>'
//     );
//    },
//    s: function () {
//      const t = document.getElementById("tls_al_frm");
//      if (t) t.remove();
//    },
//  };
//  i.t();
//}
// =======================================
// [1] End Live Chat Widget Loader for DEMO1 ONLY
// =======================================
// =======================================
//  Live Chat Widget Loader for DEMO4 ONLY
// =======================================
//if (window.location.pathname.endsWith('demo4.html')) {
//  const liveChatContainer = document.getElementById('live-chat-container');
//
//  if (liveChatContainer) {
//    const divicw = document.createElement("div");
//    divicw.id = "divicw";
//    divicw.setAttribute("data-bind", "A0993777-C0CF-4DE8-BF2D-57859A20A5A7");  // Different ID as per your earlier code
//    divicw.setAttribute("data-org", "");
//    liveChatContainer.appendChild(divicw);
//
//    const i = {
//      t: function () {
//        const url = "https://attachments.apac2.webexengage.com/widget/js/imichatinit.js";
//        try {
//          const o = new XMLHttpRequest();
//          o.onreadystatechange = function () {
//            if (this.readyState == 4) {
//              const t = document.getElementById("divicw");
//              if (this.status == 0) {
//                i.o(t);
//                return;
//              }
//              const e = document.createElement("script");
//              e.innerHTML = this.responseText;
//              t.parentNode.insertBefore(e, t.nextSibling);
//            }
//          };
//          o.open("GET", url, true);
//          o.send();
//        } catch (s) {
//          console.error(s);
//        }
//      },
//      o: function (t) {
//        t.insertAdjacentHTML(
//          "afterend",
//          '<iframe id="tls_al_frm" frameborder="0" style="overflow: hidden;height: 208px;width: 394px;position: fixed;display: block;right: 48px;bottom: 12px;z-index: 99999; display:none;"></iframe>'
//        );
//      },
//      s: function () {
//        const t = document.getElementById("tls_al_frm");
//        if (t) t.remove();
//      },
//    };
//
//    i.t();
//  }
//}
// =======================================
// [2] End Live Chat Widget Loader for DEMO4 ONLY
// =======================================

// =======================================
// [2] Sidebar Toggle + Auto-Close Logic
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const pane = document.getElementById("contact-pane-container");
  const handle = document.getElementById("contact-us-handle");

  let paneOpen = false;
  let inactivityTimer = null;
  const INACTIVITY_TIMEOUT = 60000; // 60 seconds

  // Show sidebar
  function openPane() {
    pane.classList.add("open");
    pane.classList.remove("closed");
    pane.setAttribute("aria-expanded", "true");
    paneOpen = true;
    startInactivityTimer();
  }

  // Hide sidebar
  function closePane() {
    pane.classList.remove("open");
    pane.classList.add("closed");
    pane.setAttribute("aria-expanded", "false");
    paneOpen = false;
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }

  // Handle toggle click
  function togglePane() {
    paneOpen ? closePane() : openPane();
  }

  // Start/reset inactivity timer
  function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (paneOpen) {
        closePane();
      }
    }, INACTIVITY_TIMEOUT);
  }

  // Click to toggle handle
  handle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePane();
  });

  // Close when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (!pane.contains(e.target) && paneOpen) {
      closePane();
    }
  });

  // Reset timer on user activity
  ["mousemove", "keydown", "touchstart"].forEach((eventType) => {
    pane.addEventListener(eventType, () => {
      if (paneOpen) {
        startInactivityTimer();
      }
    });
  });

  // Ensure pane is closed on load
  window.addEventListener("load", () => {
    closePane();
  });
});

// ===== START Proactive Messaging (Independent Left Sidebar) =====
// ===== START Independent Notification Sidebar (Left Aligned) =====
document.addEventListener("DOMContentLoaded", () => {
  // Insert Sidebar HTML
  if (!document.getElementById("notificationOffcanvasIndependent")) {
    const offcanvasHtml = `
      <div class="offcanvas offcanvas-start" tabindex="-1" id="notificationOffcanvasIndependent" aria-labelledby="notificationOffcanvasLabel" style="width: 260px;">
        <div class="offcanvas-header" style="background-color:#053566; color:#fff;">
          <h5 class="offcanvas-title" id="notificationOffcanvasLabel">Notifications & Offers</h5>
          <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <form id="notificationFormIndependent">
            <div class="mb-3">
              <label for="webhookSelectIndependent" class="form-label fw-semibold">Select Region</label>
              <select class="form-select" id="webhookSelectIndependent" required>
                <option value="sg" selected>Singapore</option>
                <option value="us">USA</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="nameSelectIndependent" class="form-label fw-semibold">Name</label>
              <select class="form-select" id="nameSelectIndependent" required>
                <option value="" disabled selected>Select Name</option>
                <option value="Christopher">Christopher</option>
                <option value="Shailesh">Shailesh</option>
                <option value="Joshua">Joshua</option>
                <option value="Grace">Grace</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="phoneInputIndependent" class="form-label fw-semibold">Phone Number</label>
              <input class="form-control" id="phoneInputIndependent" placeholder="Enter or select phone" readonly required />
            </div>
            <div class="mb-3">
              <label for="messageTypeSelectIndependent" class="form-label fw-semibold">Message Type</label>
              <select class="form-select" id="messageTypeSelectIndependent" required>
                <option value="" disabled selected>Select Type</option>
                <option value="Notification">Notification</option>
                <option value="Offer">Offer</option>
                <option value="Reminder">Reminder</option>
                <option value="Chat">Chat</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-100">Send</button>
          </form>
          <div id="formStatusIndependent" class="mt-2 text-success" style="display:none;">Message sent!</div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", offcanvasHtml);
  }

  // Insert floating "i" icon for sidebar toggle if missing
  if (!document.getElementById("notificationSidebarIconTrigger")) {
    const iconHtml = `
      <button id="notificationSidebarIconTrigger" aria-label="Toggle Notification Sidebar" type="button" data-bs-toggle="offcanvas" data-bs-target="#notificationOffcanvasIndependent" aria-controls="notificationOffcanvasIndependent">
        <img src="https://raw.githubusercontent.com/WxCCDemo/MyWxCCDemo/refs/heads/main/assets/informationicon.png" alt="Info" style="width:24px; height:24px;">
      </button>
    `;
    document.body.insertAdjacentHTML("beforeend", iconHtml);
  }

  // Setup Form Logic
  const webhookSelectInd = document.getElementById("webhookSelectIndependent");
  const nameSelectInd = document.getElementById("nameSelectIndependent");
  const phoneInputInd = document.getElementById("phoneInputIndependent");
  const messageTypeSelectInd = document.getElementById("messageTypeSelectIndependent");
  const formInd = document.getElementById("notificationFormIndependent");
  const formStatusInd = document.getElementById("formStatusIndependent");

  const phoneLookupInd = {
    Christopher: "6589485304",
    Shailesh: "6598250480",
    Joshua: "6591438487",
    Grace: "6587832760"
  };

  // Auto-fill phone on name select change
  nameSelectInd.addEventListener("change", () => {
    phoneInputInd.value = phoneLookupInd[nameSelectInd.value] || "";
  });

  // Form submit handler with dynamic webhook URL by region
  formInd.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      Name: nameSelectInd.value,
      Phone: phoneInputInd.value,
      messageType: messageTypeSelectInd.value,
    };

    // Webhook URLs for SG and US
    const webhookUrls = {
      sg: "https://hooks.sg.webexconnect.io/events/121EZ3LMW7",
      us: "https://hooks.us.webexconnect.io/events/K2PYR77SOP"
    };

    const selectedWebhook = webhookUrls[webhookSelectInd.value] || webhookUrls.sg;

    fetch(selectedWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        formStatusInd.textContent = "Message sent successfully!";
        formStatusInd.style.display = "block";
      })
      .catch(() => {
        formStatusInd.textContent = "Message failed!";
        formStatusInd.style.display = "block";
      })
      .finally(() => {
        setTimeout(() => {
          formStatusInd.style.display = "none";
          formStatusInd.textContent = "Message sent!";
        }, 3000);
        formInd.reset();
      });
  });
});
// ===== END Independent Notification Sidebar =====
// ===== END Proactive Messaging (Independent Left Sidebar) =====
