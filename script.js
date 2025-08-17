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

// ===== START Notification Sidebar Icon Trigger (Left Aligned) =====

// Insert icon button HTML for left trigger
if (!document.getElementById("notificationSidebarIconTrigger")) {
  const iconHtml = `
    <button id="notificationSidebarIconTrigger"
            aria-label="Open Notification Sidebar"
            style="
              position: fixed;
              top: 40%;
              left: 10px;
              z-index: 1060;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              border: none;
              background: #0a4e8a;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 2px 2px 10px rgba(0,0,0,.14);
              cursor: pointer;">
      <img src="../assets/notification-icon.png" alt="Notification" style="width:26px;height:26px;">
    </button>
  `;
  document.body.insertAdjacentHTML("beforeend", iconHtml);
}

// Notification sidebar toggle logic
const sidebarInd = document.getElementById("notificationSidebarIndependent");
const iconTrigger = document.getElementById("notificationSidebarIconTrigger");

// Handle icon button click for opening/closing sidebar
let expandedInd = false;
function toggleSidebarInd() {
  expandedInd = !expandedInd;
  sidebarInd.classList.toggle("expanded", expandedInd);
  sidebarInd.setAttribute("aria-expanded", expandedInd);
}

// Open panel when icon clicked
iconTrigger.addEventListener("click", toggleSidebarInd);
iconTrigger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleSidebarInd();
  }
});

// Optionally, clicking anywhere outside sidebar closes it
document.addEventListener("click", function(e) {
  if (
    expandedInd &&
    !sidebarInd.contains(e.target) &&
    e.target !== iconTrigger
  ) {
    toggleSidebarInd();
  }
});
// ===== END Notification Sidebar Icon Trigger (Left Aligned) =====
