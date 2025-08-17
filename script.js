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


// ===== START Proactive Messaging (Independent Left Sidebar) =====
document.addEventListener("DOMContentLoaded", function () {
  // Create offcanvas container
  const proactiveSidebar = document.createElement("div");
  proactiveSidebar.className =
    "offcanvas custom-offcanvas offcanvas-start";
  proactiveSidebar.id = "notificationOffcanvasIndependent";
  proactiveSidebar.setAttribute("tabindex", "-1");
  proactiveSidebar.setAttribute("aria-labelledby", "proactiveSidebarLabel");
  proactiveSidebar.setAttribute("data-bs-backdrop", "false");

  // Offcanvas content
  proactiveSidebar.innerHTML = `
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="proactiveSidebarLabel">Proactive Messaging</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form>
        <!-- Name field -->
        <div class="mb-3">
          <label for="proactiveName" class="form-label">Name</label>
          <input type="text" class="form-control" id="proactiveName" placeholder="Enter Name or Select">
        </div>

        <!-- Phone field -->
        <div class="mb-3">
          <label for="proactivePhone" class="form-label">Phone</label>
          <input type="tel" class="form-control" id="proactivePhone" placeholder="Enter or Select Phone">
        </div>

        <!-- Message Type field -->
        <div class="mb-3">
          <label for="proactiveType" class="form-label">Message Type</label>
          <select class="form-select" id="proactiveType">
            <option selected>Select Message Type</option>
            <option value="welcome">Welcome</option>
            <option value="reminder">Reminder</option>
            <option value="promotion">Promotion</option>
          </select>
        </div>

        <!-- Submit -->
        <button type="submit" class="btn btn-primary w-100">Send Message</button>
      </form>
    </div>
  `;

  // Add to body
  document.body.appendChild(proactiveSidebar);

  // Floating trigger button (with custom icon)
  const proactiveTrigger = document.createElement("button");
  proactiveTrigger.id = "notificationSidebarIconTrigger";
  proactiveTrigger.setAttribute("data-bs-toggle", "offcanvas");
  proactiveTrigger.setAttribute("data-bs-target", "#notificationOffcanvasIndependent");
  proactiveTrigger.setAttribute("aria-controls", "notificationOffcanvasIndependent");
  proactiveTrigger.innerHTML = `<img src="https://raw.githubusercontent.com/WxCCDemo/MyWxCCDemo/refs/heads/main/assets/informationicon.png" alt="Info Icon">`;

  document.body.appendChild(proactiveTrigger);
});
// ===== END Proactive Messaging (Independent Left Sidebar) =====
