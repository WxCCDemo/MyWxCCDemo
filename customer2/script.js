/* ==========================================================
   [1] Webex Engage (IMI) Live Chat Widget Loader - APAC2 Region
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const liveChatContainer = document.getElementById("live-chat-container");
  if (!liveChatContainer) return;
   
  const widgetDiv = document.createElement("div");
  widgetDiv.id = "divicw";
  widgetDiv.setAttribute("data-bind", "A0993777-C0CF-4DE8-BF2D-57859A20A5A7");
  widgetDiv.setAttribute("data-org", "");
  liveChatContainer.appendChild(widgetDiv);

  var i = {
    t: function () {
      const url = "https://attachments.apac2.webexengage.com/widget/js/imichatinit.js";
      try {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (this.readyState === 4) {
            const target = document.getElementById("divicw");
            if (this.status === 0) {
              i.o(target);
              return;
            }
            const script = document.createElement("script");
            script.innerHTML = this.responseText;
            target.parentNode.insertBefore(script, target.nextSibling);
          }
        };
        xhr.open("GET", url, true);
        xhr.send();
      } catch (error) {
        console.error("Chat widget load error:", error);
      }
    },
    o: function (target) {
      target.insertAdjacentHTML(
        "afterend",
        '<iframe id="tls_al_frm" frameborder="0" style="overflow:hidden;height:208px;width:394px;position:fixed;right:48px;bottom:12px;z-index:99999;display:none;"></iframe>'
      );
      const iframe = document.getElementById("tls_al_frm");
      const doc = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;
      doc.document.open();
      doc.document.write(`
        <!doctype html>
        <html><head><meta charset="utf-8">
        <style>
          body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:#99a0b0;font-size:14px;}
          .popover__content{background-color:#fbfbfe;padding:1.5rem;border-radius:5px;width:300px;box-shadow:0 2px 5px 0 rgba(0,0,0,0.26);}
          .popover__message{font-weight:600;color:#56627c;font-size:16px;}
          .close-btn{position:absolute;right:15px;top:15px;}
          .close-btn a{text-decoration:none;font-weight:400;color:#56627c;font-size:16px;}
        </style></head>
        <body>
          <div class="popover__content">
            <div class="close-btn"><a href="#" onclick="closeTLSAlert();">X</a></div>
            <div class="popover__message">This browser version is not supported on LiveChat.</div>
            <p>Please update your browser and re-open the site to access the widget.</p>
          </div>
          <script>function closeTLSAlert(){window.parent.postMessage({action:"close_tls_alert"},"*");}<\/script>
        </body></html>
      `);
      doc.document.close();
      iframe.style.display = "block";
      window.addEventListener("message", (event) => {
        if (event.data.action === "close_tls_alert") i.s();
      });
    },
    s: function () {
      const iframe = document.getElementById("tls_al_frm");
      if (iframe) iframe.remove();
    },
  };
  i.t();
});

/* ==========================================================
   [2] Contact Sidebar Toggle
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("contactSidebar");
  const header = document.querySelector(".sidebar-header");
  if (!sidebar || !header) return;

  function toggleSidebar() {
    sidebar.classList.toggle("expanded");
    const expanded = sidebar.classList.contains("expanded");
    sidebar.setAttribute("aria-expanded", expanded);
  }

  header.addEventListener("click", toggleSidebar);
  header.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSidebar();
    }
  });

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
});

/* ==========================================================
   [3] Proactive Messaging Sidebar (Notifications & Offers)
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("notificationOffcanvasIndependent")) return;

  const offcanvasHtml = `
    <div class="offcanvas offcanvas-start" tabindex="-1" id="notificationOffcanvasIndependent"
      aria-labelledby="notificationOffcanvasLabel" style="width:260px;">
      <div class="offcanvas-header" style="background-color:#053566;color:#fff;">
        <h5 class="offcanvas-title">Notifications & Offers</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <form id="notificationFormIndependent">
          <div class="mb-3">
            <label class="form-label fw-semibold">Select Region</label>
            <select class="form-select" id="webhookSelectIndependent">
              <option value="sg" selected>Singapore</option>
              <option value="us">USA</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Name</label>
            <select class="form-select" id="nameSelectIndependent">
              <option disabled selected>Select Name</option>
              <option value="Christopher">Christopher</option>
              <option value="Shailesh">Shailesh</option>
              <option value="Joshua">Joshua</option>
              <option value="Grace">Grace</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Phone Number</label>
            <input class="form-control" id="phoneInputIndependent" placeholder="Auto-filled" readonly />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Message Type</label>
            <select class="form-select" id="messageTypeSelectIndependent">
              <option disabled selected>Select Type</option>
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
    </div>`;
  document.body.insertAdjacentHTML("beforeend", offcanvasHtml);

  const iconHtml = `
    <button id="notificationSidebarIconTrigger" type="button"
      data-bs-toggle="offcanvas" data-bs-target="#notificationOffcanvasIndependent"
      style="position:fixed;left:20px;bottom:20px;z-index:1060;background:#fff;border:none;border-radius:50%;
             box-shadow:0 2px 6px rgba(0,0,0,0.25);width:48px;height:48px;">
      <img src="../assets/informationicon.png" alt="Info" style="width:24px;height:24px;">
    </button>`;
  document.body.insertAdjacentHTML("beforeend", iconHtml);

  const phoneLookup = {
    Christopher: "6589485304",
    Shailesh: "6598250480",
    Joshua: "6591438487",
    Grace: "6587832760",
  };

  const nameSelect = document.getElementById("nameSelectIndependent");
  const phoneInput = document.getElementById("phoneInputIndependent");
  const form = document.getElementById("notificationFormIndependent");
  const formStatus = document.getElementById("formStatusIndependent");

  nameSelect?.addEventListener("change", () => {
    phoneInput.value = phoneLookup[nameSelect.value] || "";
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const region = document.getElementById("webhookSelectIndependent").value;
    const messageType = document.getElementById("messageTypeSelectIndependent").value;
    const data = {
      Name: nameSelect.value,
      Phone: phoneInput.value,
      messageType,
    };

    const webhookUrls = {
      sg: "https://hooks.sg.webexconnect.io/events/CSWMWVJ81X",
      us: "https://hooks.us.webexconnect.io/events/K2PYR77SOP",
    };

    fetch(webhookUrls[region] || webhookUrls.sg, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(() => {
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.display = "block";
      })
      .catch(() => {
        formStatus.textContent = "Failed to send message!";
        formStatus.style.display = "block";
      })
      .finally(() => {
        setTimeout(() => (formStatus.style.display = "none"), 3000);
        form.reset();
      });
  });
});

/* ==========================================================
   [4] Video Call Button and Frame Loader
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const openVideoBtn = document.getElementById("openVideoCall");
  const openVoiceBtn = document.getElementById("openVoiceCall");
  const videoFrame = document.getElementById("videoCallFrame");

  if (!openVideoBtn || !videoFrame) return;

  openVideoBtn.addEventListener("click", () => {
    // Lazy-load the iframe source only once
      videoFrame.src = "https://univcxpro.consiliumapps.com/univcx/customerLogin?platform=wxcc&callInfo=videoCall";

    // Show the video iframe
    videoFrame.style.display = "block";
  });

  openVoiceBtn.addEventListener("click", () => {
    // Lazy-load the iframe source only once
      videoFrame.src = "https://univcxpro.consiliumapps.com/univcx/customerLogin?platform=wxcc&callInfo=voiceCall";

    // Show the video iframe
    videoFrame.style.display = "block";
  });
});

/* ==========================================================
   [5] Listen for messages coming from the call iframe
========================================================== */
    window.addEventListener("message", (event) => {
      // Optionally, check the origin for security
      // if (event.origin !== "https://your-iframe-origin.com") return;

      const data = event.data;

      if (data.type === "CallEnded") {
        console.log("Message received from iframe:", data.payload);
        const videoFrame = document.getElementById("videoCallFrame");

        // Show the video iframe
        videoFrame.style.display = "none";

        // Send a response back to the iframe
        // const iframe = document.getElementById("myIframe");
        // iframe.contentWindow.postMessage(
        //   { type: "PARENT_REPLY", payload: "Got your message!" },
        //   "*"
        // );
      }
    });

/* ==========================================================
   [5] Drag and drop module for webrtc call iframe
========================================================== */

// (function() {
//   const dragElement = document.getElementById("video-call-container");
//   let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0, dragging = false;

//   dragElement.addEventListener("mousedown", dragMouseDown);

//   function dragMouseDown(e) {
//     e.preventDefault();
//     mouseX = e.clientX;
//     mouseY = e.clientY;
//     dragging = true;
//     document.addEventListener("mousemove", elementDrag);
//     document.addEventListener("mouseup", closeDragElement);
//   }

//   function elementDrag(e) {
//     if (!dragging) return;
//     e.preventDefault();
//     offsetX = mouseX - e.clientX;
//     offsetY = mouseY - e.clientY;
//     mouseX = e.clientX;
//     mouseY = e.clientY;

//     dragElement.style.top = (dragElement.offsetTop - offsetY) + "px";
//     dragElement.style.left = (dragElement.offsetLeft - offsetX) + "px";
//     dragElement.style.right = "auto"; // remove 'right' positioning
//     dragElement.style.transform = "none"; // disable center transform after move
//   }

//   function closeDragElement() {
//     dragging = false;
//     document.removeEventListener("mousemove", elementDrag);
//     document.removeEventListener("mouseup", closeDragElement);
//   }
// })();
