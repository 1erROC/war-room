const briefingHeaderData = {
  callsign: "JOKER 1",
  role: "Strike",
  tot: "03:00Z",
  status: "Fragged",

  packageName: "BRONZE",
  missionName: "SCUD HUNT / OCA Strike",
  atoDay: "12",
  opord: "TRIDENT SPEAR",
  theater: "Persian Gulf",

  aircraft: "2 × F/A-18C",
  lead: "Lead: JOKER 1-1",

  launchRecovery: "T/O 02:18Z · RTB 03:47Z",
  recoveryDetail: "CVN-71 · Marshal 4",

  frequency: "305.000",
  frequencyDetail: "Primary package common · UHF",

  target: "OBJ IRON PIT",
  targetDetail: "Grid 42S XD 214 887 · Elev 4,820 ft",

  packageColor: "#7df0b7"
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "";
}

function applyStatusClass(statusValue) {
  const statusEl = document.getElementById("missionStatus");
  if (!statusEl) return;

  statusEl.classList.remove("badge-success", "badge-warning", "badge-danger", "badge-primary");

  const normalized = String(statusValue || "").trim().toLowerCase();

  if (normalized === "fragged" || normalized === "active" || normalized === "approved") {
    statusEl.classList.add("badge-success");
    return;
  }

  if (normalized === "draft" || normalized === "standby" || normalized === "planned") {
    statusEl.classList.add("badge-warning");
    return;
  }

  if (normalized === "abort" || normalized === "cancelled" || normalized === "scrubbed") {
    statusEl.classList.add("badge-danger");
    return;
  }

  statusEl.classList.add("badge-primary");
}

function applyHeaderData(data) {
  setText("missionCallsign", data.callsign);
  setText("missionRole", data.role);
  setText("missionTotBadge", `TOT ${data.tot}`);
  setText("missionStatus", data.status);

  setText("missionPackage", data.packageName);
  setText("missionName", data.missionName);
  setText("missionAtoDay", data.atoDay);
  setText("missionOpord", data.opord);
  setText("missionTheater", data.theater);
  setText("packageColorName", data.packageName);

  setText("missionAircraft", data.aircraft);
  setText("missionLead", data.lead);

  setText("missionLaunchRecovery", data.launchRecovery);
  setText("missionRecoveryDetail", data.recoveryDetail);

  setText("missionFrequency", data.frequency);
  setText("missionFrequencyDetail", data.frequencyDetail);

  setText("missionTarget", data.target);
  setText("missionTargetDetail", data.targetDetail);

  if (data.packageColor) {
    document.documentElement.style.setProperty("--package-color", data.packageColor);
  }

  applyStatusClass(data.status);
}

document.addEventListener("DOMContentLoaded", () => {
  applyHeaderData(briefingHeaderData);
});
