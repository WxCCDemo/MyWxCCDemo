// =======================================
// [1] Live Chat Widget Loader (Do Not Remove)
// =======================================
//const liveChatContainer = document.getElementById('live-chat-container');

//if (liveChatContainer) {
  //const divicw = document.createElement("div");
  //divicw.id = "divicw";
  //divicw.setAttribute("data-bind", "3FBA03BF-7CDC-4DBE-97E8-F581949FC34C");
  //divicw.setAttribute("data-org", "");
  //liveChatContainer.appendChild(divicw);

  //const i = {
    //t: function () {
      //const url = "https://media.imi.chat/widget/js/imichatinit.js";
      //try {
        //const o = new XMLHttpRequest();
        //o.onreadystatechange = function () {
          //if (this.readyState == 4) {
            //const t = document.getElementById("divicw");
            //if (this.status == 0) {
              //i.o(t);
              //return;
            //}
            //const e = document.createElement("script");
            //e.innerHTML = this.responseText;
            //t.parentNode.insertBefore(e, t.nextSibling);
          //}
        //};
        //o.open("GET", url, true);
        //o.send();
      //} catch (e) {
       // console.error("Chat Widget Error:", e);
     // }
    //},
    //o: function (t) {
     // t.insertAdjacentHTML(
      //  "afterend",
       // '<iframe id="tls_al_frm" frameborder="0" style="overflow:hidden;height:208px;width:394px;position:fixed;left:48px;bottom:12px;z-index:99999;"></iframe>'
     // );
    //},
    //s: function () {
    //  const t = document.getElementById("tls_al_frm");
     // if (t) t.remove();
    //},
 // };

  //i.t();
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

  // 👆 Click to toggle handle
  handle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePane();
  });

  // 👆 Close when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (!pane.contains(e.target) && paneOpen) {
      closePane();
    }
  });

  // 👆 Reset timer on user activity
  ["mousemove", "keydown", "touchstart"].forEach((eventType) => {
    pane.addEventListener(eventType, () => {
      if (paneOpen) {
        startInactivityTimer();
      }
    });
  });

  // ✅ Ensure pane is closed on load
  window.addEventListener("load", () => {
    closePane();
  });
});


// ===== START Independent Notification Sidebar + Icon Injection & Logic =====
document.addEventListener("DOMContentLoaded", () => {

  // Check if Bootstrap is loaded. If not, log a warning.
  if (typeof bootstrap === 'undefined') {
    console.warn('Bootstrap JavaScript is not loaded. The Offcanvas notification sidebar may not function correctly. Please ensure bootstrap.bundle.min.js is included.');
  }

  // Insert Offcanvas sidebar HTML if missing
  if (!document.getElementById("notificationOffcanvasIndependent")) {
    const offcanvasHtml = `
      <div class="offcanvas offcanvas-start" tabindex="-1" id="notificationOffcanvasIndependent" aria-labelledby="notificationOffcanvasLabel" style="width: 300px;">
        <div class="notification-offcanvas-handle" id="notificationOffcanvasHandle" tabindex="0" role="button" aria-label="Toggle Notification Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.057.435.183.435.37v.296c0 .27-.107.394-.356.474l-.45.084-.082.38 2.29-.287.082-.38-.45-.083c-.294-.057-.435-.183-.435-.37V7.23c0-.27.107-.394.356-.474z"/>
            <path d="M7.004 11.352a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"/>
          </svg>
          <span class="handle-text">Info</span>
        </div>
        <div class="offcanvas-header" style="background-color:#053566; color:#fff;">
          <h5 class="offcanvas-title" id="notificationOffcanvasLabel">Notifications & Offers</h5>
          <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <form id="notificationFormIndependent">
            <div class="mb-3">
              <label for="nameSelectIndependent" class="form-label fw-semibold">Name</label>
              <select class="form-select" id="nameSelectIndependent" required>
                <option value="" disabled selected>Select Name</option>
                <option value="Grace">Grace Loh</option>
                <option value="Shailesh">Shailesh C</option>
                <option value="Aaron">Aaron S</option>
                <option value="Prasanna">Prasanna A</option>
                <option value="Surapong">Surapong N</option>
                <option value="Kenny">Kenny L</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="phoneInputIndependent" class="form-label fw-semibold">Phone Number</label>
              <input list="phoneOptionsIndependent" class="form-control" id="phoneInputIndependent" placeholder="Enter or select phone" required />
              <datalist id="phoneOptionsIndependent">
                <option value="6587832760"></option>
                <option value="6589485304"></option>
                <option value="6598250480"></option>
                <option value="6594691615"></option>
              </datalist>
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

  // No separate icon trigger HTML needed anymore
  const notificationOffcanvas = new bootstrap.Offcanvas(document.getElementById('notificationOffcanvasIndependent'));
  const notificationOffcanvasElement = document.getElementById('notificationOffcanvasIndependent');
  const notificationOffcanvasHandle = document.getElementById('notificationOffcanvasHandle');

  // Add click listener to the new handle
  if (notificationOffcanvasHandle) {
    notificationOffcanvasHandle.addEventListener('click', () => {
      notificationOffcanvas.show();
    });
  }

  // Hide the handle when Offcanvas is shown
  notificationOffcanvasElement.addEventListener('show.bs.offcanvas', () => {
    if (notificationOffcanvasHandle) {
      notificationOffcanvasHandle.style.opacity = '0';
      notificationOffcanvasHandle.style.pointerEvents = 'none'; // Disable clicks when hidden
    }
  });

  // Show the handle when Offcanvas is hidden
  notificationOffcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
    if (notificationOffcanvasHandle) {
      notificationOffcanvasHandle.style.opacity = '1';
      notificationOffcanvasHandle.style.pointerEvents = 'auto'; // Enable clicks when visible
    }
  });


  // Get form references after insertion (rest of your form logic)
  const nameSelectInd = document.getElementById("nameSelectIndependent");
  const phoneInputInd = document.getElementById("phoneInputIndependent");
  const messageTypeSelectInd = document.getElementById("messageTypeSelectIndependent");
  const formInd = document.getElementById("notificationFormIndependent");
  const formStatusInd = document.getElementById("formStatusIndependent");

  // Prepopulate phone input from name selection
  const phoneLookupInd = {
    Grace: "6587832760",
    Shailesh: "6589485304",
    Aaron: "6598250480",
    Prasanna: "6594691615",
    Surapong: "",
    Kenny: "",
  };
  nameSelectInd.addEventListener("change", () => {
    phoneInputInd.value = phoneLookupInd[nameSelectInd.value] || "";
  });

  // Form submit handler with webhook POST
  formInd.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      Name: nameSelectInd.value,
      Phone: phoneInputInd.value,
      messageType: messageTypeSelectInd.value,
    };
    fetch("https://hooks.us.webexconnect.io/events/PLI95JDMQF", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((result) => {
        console.log("Webhook success:", result);
        formStatusInd.textContent = "Message sent successfully!";
        formStatusInd.style.display = "block";
      })
      .catch((error) => {
        console.error("Webhook error:", error);
        formStatusInd.textContent = "Message failed!";
        formStatusInd.style.display = "block";
      });
    setTimeout(() => {
      formStatusInd.style.display = "none";
      formStatusInd.textContent = "Message sent!";
    }, 3000);
    formInd.reset();
  });
});
// ===== END Independent Notification Sidebar + Icon Injection & Logic =====
