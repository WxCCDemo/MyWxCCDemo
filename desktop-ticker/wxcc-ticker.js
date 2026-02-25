(function () {
  const DEFAULTS = {
    endpoint: "/api/ticker",
    pollMs: 5000,
    speedSec: 24,
    title: "Announcement",
    showWhenEmpty: false
  };

  function toBool(value, fallback) {
    if (value === null || value === undefined || value === "") return fallback;
    return String(value).toLowerCase() === "true";
  }

  function toNum(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  function safeJson(res) {
    return res.json().catch(function () {
      return {};
    });
  }

  class WxccTickerBanner extends HTMLElement {
    connectedCallback() {
      this.apiBase = this.getAttribute("apiBase") || "";
      this.endpoint = this.getAttribute("endpoint") || DEFAULTS.endpoint;
      this.pollMs = toNum(this.getAttribute("pollMs"), DEFAULTS.pollMs);
      this.speedSec = toNum(this.getAttribute("speedSec"), DEFAULTS.speedSec);
      this.title = this.getAttribute("title") || DEFAULTS.title;
      this.showWhenEmpty = toBool(this.getAttribute("showWhenEmpty"), DEFAULTS.showWhenEmpty);
      this._timer = null;

      this.render();
      this.load();
      this._timer = setInterval(this.load.bind(this), this.pollMs);
    }

    disconnectedCallback() {
      if (this._timer) clearInterval(this._timer);
    }

    async load() {
      try {
        const url = this.apiBase.replace(/\/$/, "") + this.endpoint;
        const res = await fetch(url, { method: "GET" });
        const data = await safeJson(res);

        const text = typeof data.text === "string" ? data.text.trim() : "";
        const active = data.active !== false;
        const visible = active && (text.length > 0 || this.showWhenEmpty);

        this.style.display = visible ? "block" : "none";
        this._text.textContent = text || "No active ticker message";
        this._text.style.animationDuration = this.speedSec + "s";
      } catch (err) {
        this.style.display = this.showWhenEmpty ? "block" : "none";
        this._text.textContent = "Ticker unavailable";
      }
    }

    render() {
      this.innerHTML = [
        "<style>",
        ":host{display:block;min-width:360px;width:min(56vw,860px);max-width:860px;}",
        ".wrap{display:flex;align-items:center;gap:12px;background:#ffffff;color:#0f5fff;border:1px solid #9eb8ff;border-radius:8px;padding:6px 12px;box-sizing:border-box;width:100%;}",
        ".label{font:700 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f5fff;white-space:nowrap;}",
        ".marquee{position:relative;overflow:hidden;flex:1;white-space:nowrap;}",
        ".text{display:inline-block;padding-left:100%;font:600 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f5fff;animation-name:wxccTickerMove;animation-timing-function:linear;animation-iteration-count:infinite;}",
        "@keyframes wxccTickerMove{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}",
        "</style>",
        "<div class='wrap' role='status' aria-live='polite'>",
        "  <span class='label'></span>",
        "  <div class='marquee'><span class='text'></span></div>",
        "</div>"
      ].join("");

      this._label = this.querySelector(".label");
      this._text = this.querySelector(".text");
      this._label.textContent = this.title;
    }
  }

  class WxccTickerAdmin extends HTMLElement {
    connectedCallback() {
      this.apiBase = this.getAttribute("apiBase") || "";
      this.endpoint = this.getAttribute("endpoint") || DEFAULTS.endpoint;
      this.accessToken = this.getAttribute("accessToken") || "";
      this.orgId = this.getAttribute("orgId") || "";

      this.render();
      this.bind();
      this.load();
    }

    url() {
      return this.apiBase.replace(/\/$/, "") + this.endpoint;
    }

    headersForWrite() {
      const h = { "Content-Type": "application/json" };
      if (this.accessToken) h.Authorization = "Bearer " + this.accessToken;
      return h;
    }

    async load() {
      this.setMessage("Loading...", "muted");
      try {
        const res = await fetch(this.url(), { method: "GET" });
        const data = await safeJson(res);

        this._text.value = typeof data.text === "string" ? data.text : "";
        this._active.checked = data.active !== false;
        this.setMessage("Loaded", "ok");
      } catch (err) {
        this.setMessage("Load failed", "error");
      }
    }

    async save() {
      this.setMessage("Saving...", "muted");
      try {
        const payload = {
          text: this._text.value,
          active: this._active.checked
        };

        const res = await fetch(this.url(), {
          method: "PUT",
          headers: this.headersForWrite(),
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error("HTTP " + res.status);
        }

        this.setMessage("Saved", "ok");
      } catch (err) {
        this.setMessage("Save failed", "error");
      }
    }

    bind() {
      this._save.addEventListener("click", this.save.bind(this));
      this._reload.addEventListener("click", this.load.bind(this));
    }

    setMessage(text, mode) {
      this._msg.textContent = text;
      this._msg.className = "msg " + mode;
    }

    render() {
      this.innerHTML = [
        "<style>",
        ":host{display:block;}",
        ".card{max-width:760px;padding:16px;border:1px solid #d9dde8;border-radius:10px;background:#fff;box-sizing:border-box;}",
        "h3{margin:0 0 10px;font:600 18px/1.3 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2a44}",
        ".hint{margin:0 0 12px;color:#5e6a87;font:400 12px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}",
        "textarea{width:100%;min-height:130px;box-sizing:border-box;padding:10px;border:1px solid #b7bfd3;border-radius:8px;font:400 14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}",
        ".row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:12px}",
        "button{border:0;background:#0f5fff;color:#fff;padding:8px 12px;border-radius:8px;cursor:pointer;font:600 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}",
        "button.alt{background:#6f7a96}",
        ".msg{font:500 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}",
        ".msg.ok{color:#0b7a2f}",
        ".msg.error{color:#bf2a2a}",
        ".msg.muted{color:#6f7a96}",
        "label{font:500 13px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2a44}",
        "</style>",
        "<div class='card'>",
        "  <h3>Agent Desktop Ticker</h3>",
        "  <p class='hint'>Set a message once, and all agent desktops using the ticker banner will auto-refresh.</p>",
        "  <textarea placeholder='Type ticker message'></textarea>",
        "  <div class='row'>",
        "    <label><input type='checkbox' checked> Active</label>",
        "    <button type='button'>Save</button>",
        "    <button type='button' class='alt'>Reload</button>",
        "    <span class='msg muted'>Ready</span>",
        "  </div>",
        "</div>"
      ].join("");

      this._text = this.querySelector("textarea");
      this._active = this.querySelector("input[type='checkbox']");
      this._save = this.querySelector("button");
      this._reload = this.querySelector("button.alt");
      this._msg = this.querySelector(".msg");
    }
  }

  if (!customElements.get("wxcc-ticker-banner")) {
    customElements.define("wxcc-ticker-banner", WxccTickerBanner);
  }

  if (!customElements.get("wxcc-ticker-admin")) {
    customElements.define("wxcc-ticker-admin", WxccTickerAdmin);
  }
})();
