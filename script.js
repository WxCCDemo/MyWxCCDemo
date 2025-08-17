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
  // Insert sidebar if missing
  if (!document.getElementById("notificationSidebarIndependent")) {
    const sidebarHtml = `
      <div class="contact-sidebar" id="notificationSidebarIndependent" aria-expanded="false">
        <div class="sidebar-header" id="notificationToggleIndependent" tabindex="0" role="button" aria-label="Toggle Notification Sidebar Independent" style="background-color:#0a4e8a; cursor:pointer; user-select:none; padding: 10px 15px; color:#fff; font-weight:600;">
          Notification
        </div>
        <div class="contact-links p-3">
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
    document.body.insertAdjacentHTML("beforeend", sidebarHtml);
  }

  // Insert icon if missing
  if (!document.getElementById("notificationSidebarIconTrigger")) {
    const iconHtml = `
      <button id="notificationSidebarIconTrigger" aria-label="Toggle Notification Sidebar" style="
        position: fixed; top: 40%; left: 10px; z-index: 1060;
        width: 44px; height: 44px; border-radius: 50%; border: none;
        background: transparent; display: flex; align-items: center; justify-content: center;
        font-size: 24px; color: #0a4e8a; cursor: pointer; user-select: none;
      ">
        <span style="font-family:sans-serif; font-weight:bold;">i</span>
      </button>
    `;
    document.body.insertAdjacentHTML("beforeend", iconHtml);
  }

  // Get references after insertion
  const sidebarInd = document.getElementById("notificationSidebarIndependent");
  const iconTrigger = document.getElementById("notificationSidebarIconTrigger");
  const nameSelectInd = document.getElementById("nameSelectIndependent");
  const phoneInputInd = document.getElementById("phoneInputIndependent");
  const messageTypeSelectInd = document.getElementById("messageTypeSelectIndependent");
  const formInd = document.getElementById("notificationFormIndependent");
  const formStatusInd = document.getElementById("formStatusIndependent");

  // Toggle sidebar visibility
  let expandedInd = false;
  function toggleSidebarInd() {
    expandedInd = !expandedInd;
    sidebarInd.classList.toggle("expanded", expandedInd);
    sidebarInd.setAttribute("aria-expanded", expandedInd);
  }

  // Icon click & keyboard handlers
  iconTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSidebarInd();
  });
  iconTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSidebarInd();
    }
  });

  // Close sidebar when clicking outside (except icon)
  document.addEventListener("click", (e) => {
    if (
      expandedInd &&
      !sidebarInd.contains(e.target) &&
      e.target !== iconTrigger
    ) {
      toggleSidebarInd();
    }
  });

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
