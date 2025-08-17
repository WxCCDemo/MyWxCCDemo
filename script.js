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


/* ===== START Notification Sidebar (Left Aligned, Independent) ===== */
/* This section styles the Bootstrap Offcanvas component for the left sidebar */
#notificationOffcanvasIndependent {
  top: 40%; /* Custom vertical positioning */
  left: 0px; /* Ensures it starts from the left edge */
  width: 260px; /* Width of the sidebar content */
  box-shadow: 2px 2px 12px rgba(33, 37, 41, 0.11); /* Shadow for depth */
  border-radius: 0 10px 10px 0; /* Rounded on the right exposed side when open */
  background-color: white; /* Ensure background is white */
  /* Bootstrap's .offcanvas-start and .show classes handle transform and transition */
}

/* Ensure the entire offcanvas is truly hidden when not shown */
/* This overrides any partial visibility due to previous custom transforms */
#notificationOffcanvasIndependent.offcanvas-start:not(.show) {
    transform: translateX(-100%) !important; /* Move fully off-screen */
    visibility: hidden !important; /* Ensure it's not visible at all */
}

/* This ensures the offcanvas slides fully into view when shown */
#notificationOffcanvasIndependent.offcanvas-start.show {
    transform: translateX(0) !important;
    visibility: visible !important;
}

/* Styling for the fixed "i" icon trigger on the left */
#notificationSidebarIconTrigger {
  position: fixed;
  top: 50%; /* Center vertically, similar to right sidebar handle */
  left: 0px; /* Positioned at the absolute left edge */
  transform: translateY(-50%); /* For perfect vertical centering */
  z-index: 1060; /* Higher z-index to be above the sidebar when closed */
  width: 60px; /* Width of the button/tab */
  height: 48px; /* Height of the button/tab */
  border-radius: 0 10px 10px 0; /* Rounded on the right side */
  border: none;
  background-color: #053566; /* Dark blue to match sidebar headers */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 2px 2px 12px rgba(33,37,41,0.11); /* Consistent shadow */
  color: #fff; /* White icon color */
  font-size: 24px; /* Size for the SVG icon */
  transition: background-color 0.3s ease; /* Smooth hover effect */
  padding: 0; /* Remove default button padding */
}

/* Hover effect for the fixed "i" icon */
#notificationSidebarIconTrigger:hover {
  background-color: #074075; /* Slightly darker on hover */
}

#notificationSidebarIconTrigger svg {
    display: block; /* Ensure SVG takes full space and is centered */
}

/* Remove styling for the now unused integrated handle */
/* The following section is removed as the handle is no longer part of the sliding sidebar */
/*
.notification-offcanvas-handle { ... }
.notification-offcanvas-handle .handle-text { ... }
.notification-offcanvas-handle svg { ... }
.notification-offcanvas-handle:hover { ... }
.notification-offcanvas-handle:hover .handle-text { ... }
.notification-offcanvas-handle:hover svg { ... }
*/

/* No longer needed as we're not using the left-aligned .contact-sidebar directly for the tab behavior */
/*
.contact-sidebar.left-aligned { ... }
.contact-sidebar.left-aligned.expanded { ... }
.sidebar-header.left-aligned-header { ... }
.contact-sidebar.left-aligned.expanded .left-aligned-header { ... }
.sidebar-header.left-aligned-header svg { ... }
.sidebar-header.left-aligned-header .header-text { ... }
.sidebar-header.left-aligned-header:hover .header-text { ... }
*/

/* General styling for contact links within the sidebar - applies to both */
/* (This section is kept as it applies to the content inside the sidebar forms) */
.contact-sidebar .contact-links {
  padding: 12px 0 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.contact-sidebar .contact-link {
  background-color: #ffffff;
  color: #000000 !important;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, color 0.3s;
  text-decoration: none !important;
  border: none;
  outline: none;
  box-shadow: 0 1px 4px rgba(33, 37, 41, 0.07);
  margin: 0 10px;
}
.contact-sidebar .contact-link:hover,
.contact-sidebar .contact-link:focus {
  background-color: #e2e6ea;
  color: #000000 !important;
}
.contact-sidebar .contact-link img {
  width: 28px;
  height: 28px;
  margin-right: 12px;
}
/* ===== END Notification Sidebar (Left Aligned, Independent) ===== */
