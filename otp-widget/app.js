const API_URL = "https://asia-southeast1-mywxccotp-486810.cloudfunctions.net/otpApi";
const API_KEY = "OTP_DEMO_2026_SECRET";
const POLL_MS = 5000;

const states = [
  { key: "requested", label: "Preparing OTP", value: 20, badge: "Requested" },
  { key: "sent", label: "OTP Sent", value: 50, badge: "Sent" },
  { key: "entered", label: "OTP Submitted", value: 75, badge: "Submitted" },
  { key: "verified", label: "OTP Verified", value: 100, badge: "Verified", complete: true },
  { key: "failed", label: "OTP Failed", value: 100, badge: "Failed", failed: true }
];

let stateIndex = 0;
let pollingTimer = null;

const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const progressValue = document.getElementById("progressValue");
const badge = document.getElementById("badge");
const hint = document.getElementById("hint");
const meta = document.getElementById("meta");

function formatSingaporeTime(isoString) {
  if (!isoString) return "—";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-SG", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

function normalizeBool(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1" || value.toLowerCase() === "yes";
  }
  return false;
}

function mapStatusToState(data) {
  const status = (data.SC_OTP_Status || "").toString().trim().toUpperCase();
  if (status === "VERIFIED" || status === "AUTHENTICATED") return "verified";
  if (status === "FAILED" || status === "DENIED") return "failed";
  if (status === "RETRY") return "entered";
  if (status === "SENT") return "sent";

  const entered = normalizeBool(data.SC_OTP_Entered);
  const sent = normalizeBool(data.SC_OTP_Sent);

  if (entered) return "entered";
  if (sent) return "sent";
  if (data.SC_OTP_Initiated_By) return "requested";

  return "requested";
}

function updateUI() {
  const current = states[stateIndex];

  progressFill.style.width = `${current.value}%`;
  progressLabel.textContent = current.label;
  progressValue.textContent = `${current.value}%`;
  badge.textContent = current.badge;
  badge.classList.toggle("is-failed", Boolean(current.failed));
  progressFill.classList.toggle("is-failed", Boolean(current.failed));

  document.querySelectorAll(".step").forEach((step, index) => {
    step.classList.remove("is-active", "is-complete");

    if (index < stateIndex) {
      step.classList.add("is-complete");
    } else if (index === stateIndex) {
      step.classList.add("is-active");
    }
  });

  hint.textContent = current.complete
    ? "OTP verified. Privileged service actions may continue."
    : current.failed
      ? "OTP verification failed. Escalate or resend according to bank policy."
    : "This panel updates automatically with OTP status.";
}

function setStateByKey(key) {
  const idx = states.findIndex((s) => s.key === key);
  if (idx >= 0) {
    stateIndex = idx;
    updateUI();
  }
}

async function fetchStatus(interactionId) {
  const url = new URL(API_URL);
  url.searchParams.set("interactionId", interactionId);

  const res = await fetch(url.toString(), {
    headers: {
      "x-api-key": API_KEY
    }
  });

  if (!res.ok) {
    throw new Error(`Status fetch failed: ${res.status}`);
  }

  return res.json();
}

function readFrameDataProvider() {
  const frame = window.frameElement;
  if (!frame) return null;

  if (frame.dataProvider && typeof frame.dataProvider === "object") {
    return frame.dataProvider;
  }

  const attr =
    frame.getAttribute("data-provider") ||
    frame.getAttribute("dataProvider") ||
    frame.getAttribute("data-provider-json");

  if (!attr) return null;

  try {
    return JSON.parse(attr);
  } catch {
    return null;
  }
}

function getInteractionId() {
  const provider = readFrameDataProvider();
  if (provider?.interactionId) return provider.interactionId;
  const params = new URLSearchParams(window.location.search);
  return params.get("interactionId");
}

function getUrlDebug() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("interactionId") || "—";
  const query = window.location.search || "—";
  return { fromUrl, query };
}

async function poll() {
  const interactionId = getInteractionId();

  if (!interactionId) {
    hint.textContent = "Missing interactionId in the URL. Example: ?interactionId=abc123";
    const debug = getUrlDebug();
    meta.textContent = `Query: ${debug.query} | URL interactionId: ${debug.fromUrl} | API: — | Status: — | SG time: —`;
    return;
  }

  try {
    const data = await fetchStatus(interactionId);
    const stateKey = mapStatusToState(data);
    setStateByKey(stateKey);
    const status = (data.SC_OTP_Status || "—").toString();
    const apiInteractionId = data.interactionId || "—";
    const lastUpdate = formatSingaporeTime(data.updatedAt);
    const debug = getUrlDebug();
    meta.textContent = `Query: ${debug.query} | URL interactionId: ${debug.fromUrl} | API: ${apiInteractionId} | Status: ${status} | SG time: ${lastUpdate}`;
  } catch (err) {
    hint.textContent = "Waiting for OTP status...";
    const debug = getUrlDebug();
    meta.textContent = `Query: ${debug.query} | URL interactionId: ${debug.fromUrl} | API: — | Status: — | SG time: —`;
  }
}

function startPolling() {
  if (pollingTimer) return;
  poll();
  pollingTimer = setInterval(poll, POLL_MS);
}

updateUI();
startPolling();
