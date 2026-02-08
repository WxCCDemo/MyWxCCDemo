const states = [
  { key: "requested", label: "Preparing OTP", value: 20, badge: "Requested" },
  { key: "sent", label: "OTP Sent", value: 50, badge: "Sent" },
  { key: "entered", label: "OTP Entered", value: 75, badge: "Entered" },
  { key: "verified", label: "OTP Verified", value: 100, badge: "Verified", complete: true }
];

let stateIndex = 0;

const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const progressValue = document.getElementById("progressValue");
const badge = document.getElementById("badge");
const hint = document.getElementById("hint");

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
    : "This panel will update automatically when the OTP status changes.";
}

function nextState() {
  stateIndex = Math.min(stateIndex + 1, states.length - 1);
  updateUI();
}

function resetState() {
  stateIndex = 0;
  updateUI();
}

const simulate = document.getElementById("simulate");
const reset = document.getElementById("reset");

simulate.addEventListener("click", nextState);
reset.addEventListener("click", resetState);

updateUI();
