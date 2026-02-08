const API_URL = "https://asia-southeast1-mywxccotp-486810.cloudfunctions.net/otpApi";
const API_KEY = "OTP_DEMO_2026_SECRET";
const POLL_MS = 5000;

const states = [
  { key: "requested", label: "Preparing OTP", value: 20, badge: "Requested" },
  { key: "sent", label: "OTP Sent", value: 50, badge: "Sent" },
  { key: "entered", label: "OTP Entered", value: 75, badge: "Entered" },
  { key: "verified", label: "OTP Verified", value: 100, badge: "Verified", complete: true }
];

let stateIndex = 0;
let pollingTimer = null;

const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const progressValue = document.getElementById("progressValue");
const badge = document.getElementById("badge");
const hint = document.getElementById("hint");

function normalizeBool(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1" || value.toLowerCase() === "yes";
  }
  return false;
}

function mapStatusToState(data) {
  const status = (data.SC_OTP_Status || "").toString().trim().toUpperCase();
  if (status.includes("VERIFY") || status.includes("AUTH")) return "verified";
  if (status.includes("ENTER")) return "entered";
  if (status.includes("SENT")) return "sent";

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

  document.querySelectorAll(".step").forEach((step, index) => {
    step.classList.remove("is-active", "is-complete");

    if (index < stateIndex) {
      step.classList.add("is-complete");
    } else if (index === stateIndex) {
      step.classList.add("is-active");
    }
  });

  hint.textContent = current.complete
    ? "OTP verified. The call can be routed back to the same agent."
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

async function poll() {
  const params = new URLSearchParams(window.location.search);
  const interactionId = params.get("interactionId");

  if (!interactionId) {
    hint.textContent = "Missing interactionId in the URL. Example: ?interactionId=abc123";
    return;
  }

  try {
    const data = await fetchStatus(interactionId);
    const stateKey = mapStatusToState(data);
    setStateByKey(stateKey);
  } catch (err) {
    hint.textContent = "Waiting for OTP status...";
  }
}

function startPolling() {
  if (pollingTimer) return;
  poll();
  pollingTimer = setInterval(poll, POLL_MS);
}

updateUI();
startPolling();
