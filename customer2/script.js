// ==========================================================
// [1] Live Chat Widget Loader (Updated for APAC2 Region)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const liveChatContainer = document.getElementById("live-chat-container");
  if (!liveChatContainer) return;

  // Create widget container
  const widgetDiv = document.createElement("div");
  widgetDiv.id = "divicw";
  widgetDiv.setAttribute("data-bind", "A0993777-C0CF-4DE8-BF2D-57859A20A5A7");
  widgetDiv.setAttribute("data-org", "");
  liveChatContainer.appendChild(widgetDiv);

  // Webex Engage (IMI) Widget Loader
  var i = {
    t: function (t) {
      var e = "https://attachments.apac2.webexengage.com/widget/js/imichatinit.js";
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
        '<iframe id="tls_al_frm" frameborder="0" style="overflow:hidden;height:208px;width:394px;position:fixed;right:48px;bottom:12px;z-index:99999;display:none;"></iframe>'
      );
      var e = document.getElementById("tls_al_frm");
      var o = e.contentWindow || (e.contentDocument.document || e.contentDocument);
      o.document.open();
      o.document.write(
        '<!doctype html><html><head><meta charset="utf-8"><title>Untitled Document</title><style>body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:#99a0b0;font-size:14px;}.popover__content{background-color:#fbfbfe;padding:1.5rem;border-radius:5px;width:300px;box-shadow:0 2px 5px 0 rgba(0,0,0,0.26);position:relative;}.popover__message{font-weight:600;color:#56627c;font-size:16px;}.pull-left{float:left;}.clearfix{clear:both;}.hdr-txt{width:218px;margin-top:3px;}.para-txt a{text-decoration:none;color:#005cde;}.close-btn{position:absolute;right:15px;top:15px;}.close-btn a{text-decoration:none;font-weight:400;color:#56627c;font-size:16px;}</style></head><body><div class="popover__content"><div class="close-btn"><a href="#" onclick="closeTLSAlert();">X</a></div><div class="popover__message"><div class="pull-left hdr-txt">This browser version is not supported on LiveChat.</div></div><div class="clearfix"></div><p class="para-txt">Please update your browser to the latest version and re-open the website to access the widget.</p></div><script>function closeTLSAlert(){window.parent.postMessage({key:"close_tls_alert",value:"close_tls_alert",action:"close_tls_alert"},"*");}<\/script></body></html>'
      );
      o.document.close();
      e.style.display = "block";
      window.addEventListener("message", function (t) {
        if (t.data.action == "close_tls_alert") {
          i.s();
        }
      });
    },
    s: function () {
      var t = document.getElementById("tls_al_frm");
      if (t) t.remove();
    },
  };
  i.t(function (t) {});
});

// ==========================================================
// [2] Contact Sidebar Toggle (Unchanged)
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

  const tooltipTriggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggers.forEach((el) => new bootstrap.Tooltip(el));
});

// ==========================================================
// [3] Independent Notification Sidebar (Unchanged)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  // existing proactive message code unchanged...
});
