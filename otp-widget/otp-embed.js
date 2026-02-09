class OtpStatusWidget extends HTMLElement {
  static get observedAttributes() {
    return ["interaction-id", "interactionid", "interactionId"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  readFromAttribute() {
    const raw =
      this.getAttribute("interaction-id") ||
      this.getAttribute("interactionid") ||
      this.getAttribute("interactionId") ||
      "";

    // If the desktop failed to resolve binding, it may pass literal "$STORE..."
    if (!raw || raw.startsWith("$STORE")) return "";
    return raw;
  }

  readFromDataProvider() {
    const provider = this.dataProvider;
    if (provider && typeof provider === "object" && provider.interactionId) {
      return provider.interactionId;
    }
    return "";
  }

  buildSrc() {
    const base = "https://wxccdemo.github.io/MyWxCCDemo/otp-widget/";
    const interactionId = this.readFromAttribute() || this.readFromDataProvider();
    if (!interactionId) return `${base}?embed=1`;

    const url = new URL(base);
    url.searchParams.set("interactionId", interactionId);
    url.searchParams.set("embed", "1");
    return url.toString();
  }

  render() {
    const src = this.buildSrc();
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }
      </style>
      <iframe src="${src}" title="OTP Authentication Status"></iframe>
    `;
  }
}

if (!customElements.get("otp-status-widget")) {
  customElements.define("otp-status-widget", OtpStatusWidget);
}
