// ==========================================================
// [1] Live Chat Widget Loader (Updated for UOB / APAC2 Region)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const liveChatContainer = document.getElementById("live-chat-container");
  if (liveChatContainer) {
    // Inject the widget div and script
    const widgetHTML = `
      <div id="divicw" data-bind="A0993777-C0CF-4DE8-BF2D-57859A20A5A7" data-org=""></div>
      <script>
        var i = {
          t: function(t) {
            var e = "https://attachments.apac2.webexengage.com/widget/js/imichatinit.js";
            try {
              var o = new XMLHttpRequest();
              o.onreadystatechange = function() {
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
          o: function(t) {
            t.insertAdjacentHTML(
              "afterend",
              '<iframe id="tls_al_frm" frameborder="0" style="overflow:hidden;height:208px;width:394px;position:fixed;right:48px;bottom:12px;z-index:99999;display:none;"></iframe>'
            );
            var e = document.getElementById("tls_al_frm");
            var o = e.contentWindow || (e.contentDocument.document || e.contentDocument);
            o.document.open();
            o.document.write(
              '<!doctype html><html><head><meta charset="utf-8"><title>Browser Unsupported</title>' +
                '<style>body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:#99a0b0;font-size:14px;}' +
                '.popover__content{background-color:#fbfbfe;padding:1.5rem;border-radius:5px;width:300px;box-shadow:0 2px 5px 0 rgba(0,0,0,0.26);position:relative;}' +
                '.popover__message{font-weight:600;color:#56627c;font-size:16px;}.pull-left{float:left;}.clearfix{clear:both;}' +
                '.hdr-txt{width:218px;margin-top:3px;}.para-txt a{text-decoration:none;color:#005cde;}' +
                '.close-btn{position:absolute;right:15px;top:15px;}.close-btn a{text-decoration:none;font-weight:400;color:#56627c;font-size:16px;}</style>' +
                "</head><body>" +
                '<div class="popover__content">' +
                '<div class="close-btn"><a href="#" onclick="closeTLSAlert();">X</a></div>' +
                '<div class="popover__message"><div class="pull-left hdr-txt">This browser version is not supported on LiveChat.</div></div>' +
                '<div class="clearfix"></div>' +
                '<p class="para-txt">Please update your browser to the latest version and re-open the website to access the widget.</p>' +
                "</div>" +
                '<script>function closeTLSAlert(){window.parent.postMessage({key:"close_tls_alert",value:"close_tls_alert",action:"close_tls_alert"},"*");}<\/script>' +
                "</body></html>"
            );
            o.document.close();
            e.style.display = "block";
            window.addEventListener("message", function(t) {
              if (t.data.action == "close_tls_alert") {
                i.s();
              }
            });
          },
          s: function() {
            var t = document.getElementById("tls_al_frm");
            if (t) t.remove();
          },
        };
        i.t(function(t){});
      <\/script>`;
    liveChatContainer.insertAdjacentHTML("beforeend", widgetHTML);
  }
});

// ==========================================================
// [2] Contact Sidebar Toggle
// ==========================================================
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

  // Initialize Bootstrap tooltips
  const tooltipTriggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggers.forEach((el) => new bootstrap.Tooltip(el));
});

// ==========================================================
// [3] Optional: Proactive Notification Sidebar
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("notificationOffcanvasIndependent")) {
    const offcanvasHtml = `
      <div class="offcanvas offcanvas-start" tabindex="-1" id="notificationOffcanvasIndependent"
        aria-labelledby="notificationOffcanvasLabel" style="width:260px;">
        <div class="offcanvas-header" style="background-color:#053566; color:#fff;">
          <h5 class="offcanvas-title" id="notificationOffcanvasLabel">Notifications & Offers</h5>
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
        style="position:fixed;left:20px;bottom:20px;z-index:1000;border-radius:50%;background:#fff;border:none;box-shadow:0 2px 6px rgba(0,0,0,0.3);">
        <img src="../assets/informationicon.png" alt="Info" style="width:24px;height:24px;">
      </button>`;
    document.body.insertAdjacentHTML("beforeend", iconHtml);
  }

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
      sg: "https://hooks.sg.webexconnect.io/events/121EZ3LMW7",
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
