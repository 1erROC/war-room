const $ = (id) => document.getElementById(id);
const esc = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const boardGrid = $("boardGrid");
const missionIdInput = $("missionIdInput");
const loadMissionBtn = $("loadMissionBtn");
const createPackageBtn = $("createPackageBtn");
const addSectorBtn = $("addSectorBtn");
const removeSectorBtn = $("removeSectorBtn");
const clockBox = $("clockBox");
const gameClockDisplay = $("gameClockDisplay");
const gameClockInput = $("gameClockInput");
const syncGameClockBtn = $("syncGameClockBtn");
const selectedStripLabel = $("selectedStripLabel");
const selectedStripMeta = $("selectedStripMeta");
const selectedStripRoute = $("selectedStripRoute");
const selectedStripNotes = $("selectedStripNotes");
const notesActionBtn = $("notesActionBtn");
const editStripActionBtn = $("editStripActionBtn");
const controlActionBtn = $("controlActionBtn");
const emergencyActionBtn = $("emergencyActionBtn");
const deleteActionBtn = $("deleteActionBtn");

let draggedStripId = null;
let modalState = null;
const BRIEFS_DIR = "../briefs/";
const SHORT_TOKEN_LENGTH = 12;

const state = {
  columns: [
    { id: "parking", title: "Parking", label: "Ready strips / ramp", freq: "243.000" },
    { id: "ground", title: "Ground", label: "Taxi / startup / push", freq: "121.800" },
    { id: "tower", title: "Tower", label: "Line-up / departure", freq: "118.700" },
    { id: "departure", title: "Departure", label: "Initial control", freq: "251.000" },
    { id: "control", title: "Control", label: "Mission flow / recovery", freq: "305.000" }
  ],
  strips: [],
  selectedStripId: null,
  gameClockStartSeconds: 8 * 3600,
  gameClockSyncedAt: Date.now()
};

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function randomAccent() {
  const accents = ["#6ab7ff", "#7df0b7", "#ffd36a", "#ff82b1", "#9ea7ff", "#9be3ff"];
  return accents[Math.floor(Math.random() * accents.length)];
}

function makeStrip(data = {}) {
  return {
    id: data.id || uid("strip"),
    callsign: String(data.callsign || "").trim() || "NEWPKG",
    count: String(data.count || "").trim() || "2",
    aircraft: String(data.aircraft || "").trim() || "F16C",
    mission: String(data.mission || "").trim() || "CAP",
    squawk: String(data.squawk || "").trim() || "0000",
    altitude: String(data.altitude || "").trim() || "FL000",
    loadout: String(data.loadout || "").trim() || "--",
    origin: String(data.origin || "").trim() || "BASE",
    destination: String(data.destination || "").trim() || "TARGET",
    freq: String(data.freq || "").trim() || "000.000",
    notes: String(data.notes || "").trim(),
    zoneId: data.zoneId || state.columns[0].id,
    emergency: !!data.emergency,
    accent: data.accent || randomAccent(),
    lastActionAt: Number.isFinite(data.lastActionAt) ? data.lastActionAt : Date.now()
  };
}

function touchStrip(strip) {
  if (!strip) return;
  strip.lastActionAt = Date.now();
}

function getColumnTitle(columnId) {
  return state.columns.find((column) => column.id === columnId)?.title || "Secteur";
}

function formatElapsed(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function secondsFromTimeString(value) {
  const [hours = "0", minutes = "0", seconds = "0"] = String(value || "00:00:00").split(":");
  return ((+hours || 0) * 3600) + ((+minutes || 0) * 60) + (+seconds || 0);
}

function formatClockSeconds(totalSeconds) {
  const normalized = ((Math.floor(totalSeconds) % 86400) + 86400) % 86400;
  const hours = String(Math.floor(normalized / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((normalized % 3600) / 60)).padStart(2, "0");
  const seconds = String(normalized % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function seedStrips() {
  state.strips = [];
  state.selectedStripId = null;
}

function sanitizeShortToken(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, SHORT_TOKEN_LENGTH);
}

function toBase64UrlBytes(value) {
  const base64 = String(value || "")
    .trim()
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(String(value || "").trim().length / 4) * 4, "=");

  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}

function decodeBriefToken(token) {
  try {
    const decoded = JSON.parse(new TextDecoder().decode(toBase64UrlBytes(token)));
    const packages = Array.isArray(decoded?.pk) ? decoded.pk : [];

    return packages.map((pkg) =>
      makeStrip({
        callsign: pkg.n || "PACKAGE",
        count: String((Array.isArray(pkg.pl) ? pkg.pl.filter(Boolean).length : 0) + (pkg.ld ? 1 : 0) || 1),
        aircraft: pkg.a || "F16C",
        mission: pkg.tk || "CAP",
        squawk: pkg.sq || "0000",
        altitude: pkg.aco?.ce || pkg.aco?.fl || "FL000",
        loadout: pkg.ato?.wp || "--",
        origin: pkg.b || "BASE",
        destination: pkg.d || "TARGET",
        freq: pkg.f || "000.000",
        notes: "",
        zoneId: "parking",
        emergency: false,
        accent: pkg.c || randomAccent()
      })
    );
  } catch {
    return null;
  }
}

async function loadMissionPackages() {
  const missionId = sanitizeShortToken(missionIdInput?.value || "");
  if (missionIdInput) missionIdInput.value = missionId;
  if (!missionId || missionId.length !== SHORT_TOKEN_LENGTH) return;

  try {
    const response = await fetch(`${BRIEFS_DIR}${missionId}.json?ts=${Date.now()}`, {
      cache: "no-store"
    });

    if (!response.ok) return;

    const data = await response.json();
    const token = String(data?.token || "").trim();
    if (!token) return;

    const strips = decodeBriefToken(token);
    if (!strips) return;

    state.strips = strips;
    state.selectedStripId = state.strips[0]?.id || null;
    renderBoard();
  } catch {
    // Silence for now: UI remains unchanged if load fails.
  }
}

function getSelectedStrip() {
  return state.strips.find((strip) => strip.id === state.selectedStripId) || null;
}

function stripHtml(strip) {
  return `
    <article
      class="strip ${strip.emergency ? "is-emergency" : ""} ${strip.id === state.selectedStripId ? "is-selected" : ""}"
      data-strip-id="${strip.id}"
      draggable="true"
      style="--strip-accent:${esc(strip.accent)}"
    >
      <div class="strip-row strip-row-top">
        <div class="strip-select-wrap">
          <button class="strip-select-btn ${strip.id === state.selectedStripId ? "is-selected" : ""}" type="button" data-select-strip="${strip.id}" aria-label="Selectionner strip"></button>
        </div>

        <label class="strip-block strip-block-primary">
          <div class="strip-big">${esc(strip.callsign)}</div>
          <div class="strip-primary-subline">
            <div class="strip-inline-input strip-inline-input-count">${esc(strip.count)}</div>
            <div class="strip-inline-input strip-inline-input-aircraft">${esc(strip.aircraft)}</div>
            <div class="strip-inline-input strip-inline-input-task">${esc(strip.mission)}</div>
          </div>
        </label>

        <label class="strip-block strip-block-radio">
          <div class="strip-big strip-code">${esc(strip.freq)}</div>
          <div class="strip-small strip-code">${esc(strip.squawk)}</div>
        </label>

        <label class="strip-block">
          <span class="strip-label">Armement</span>
          <div class="strip-mid">${esc(strip.loadout)}</div>
        </label>

        <label class="strip-block strip-block-altitude">
          <span class="strip-label">Altitude</span>
          <div class="strip-big strip-code">${esc(strip.altitude)}</div>
        </label>
      </div>

      <div class="strip-row strip-row-meta">
        <div class="strip-meta-pill" data-strip-timer="${strip.id}">${esc(formatElapsed(Date.now() - strip.lastActionAt))}</div>
      </div>
    </article>
  `;
}

function columnHtml(column) {
  const strips = state.strips.filter((strip) => strip.zoneId === column.id);

  return `
    <section class="board-column">
      <header class="board-column-head">
        <div class="board-column-head-row">
          <input class="board-column-title-input" type="text" value="${esc(column.title)}" data-column-field="${column.id}:title" />
          <button class="board-column-delete-btn" type="button" data-delete-column="${column.id}" aria-label="Supprimer secteur">X</button>
        </div>
      </header>

      <div class="board-column-subhead">
        <input class="board-column-label-input" type="text" value="${esc(column.label)}" data-column-field="${column.id}:label" />
        <input class="board-column-freq-input" type="text" value="${esc(column.freq)}" data-column-field="${column.id}:freq" />
      </div>

      <div class="board-column-body" data-column-drop="${column.id}">
        ${
          strips.length
            ? strips.map(stripHtml).join("")
            : '<div class="empty-lane"></div>'
        }
      </div>
    </section>
  `;
}

function renderBoard() {
  boardGrid.style.gridTemplateColumns = `repeat(${state.columns.length}, minmax(0, 1fr))`;
  boardGrid.innerHTML = state.columns.map(columnHtml).join("");
  renderSelectedStripBar();
  bindDragAndDrop();
  syncBoardRhythm();
}

function syncBoardRhythm() {
  const sampleStrip = boardGrid.querySelector(".strip");
  const columnBody = boardGrid.querySelector(".board-column-body");

  if (!sampleStrip || !columnBody) return;

  const stripHeight = sampleStrip.getBoundingClientRect().height;
  const styles = window.getComputedStyle(columnBody);
  const gap = parseFloat(styles.rowGap || styles.gap || "0") || 0;
  const rhythm = Math.round(stripHeight + (gap / 2));
  const firstLine = Math.round(stripHeight + gap + (gap / 2));

  document.documentElement.style.setProperty("--strip-height", `${Math.round(stripHeight)}px`);
  document.documentElement.style.setProperty("--strip-gap", `${Math.round(gap)}px`);
  document.documentElement.style.setProperty("--strip-first-line", `${firstLine}px`);
  document.documentElement.style.setProperty("--strip-rhythm", `${rhythm}px`);
}

function renderSelectedStripBar() {
  const strip = getSelectedStrip();
  const actionsBar = document.querySelector(".board-actions-bar");

  if (!strip) {
    actionsBar?.classList.remove("is-emergency");
    if (selectedStripLabel) selectedStripLabel.textContent = "Aucune";
    if (selectedStripMeta) selectedStripMeta.textContent = "--";
    if (selectedStripRoute) selectedStripRoute.textContent = "--";
    if (selectedStripNotes) selectedStripNotes.textContent = "Aucune note.";
    notesActionBtn?.setAttribute("disabled", "true");
    editStripActionBtn?.setAttribute("disabled", "true");
    controlActionBtn?.setAttribute("disabled", "true");
    emergencyActionBtn?.setAttribute("disabled", "true");
    deleteActionBtn?.setAttribute("disabled", "true");
    if (emergencyActionBtn) emergencyActionBtn.classList.remove("is-active");
    return;
  }

  if (selectedStripLabel) {
    selectedStripLabel.textContent = `${strip.callsign} · ${getColumnTitle(strip.zoneId)}`;
  }

  if (selectedStripMeta) {
    selectedStripMeta.textContent = `${strip.count} ACFT · ${strip.aircraft} · ${strip.mission} · ${strip.freq} · SQWK ${strip.squawk} · ${strip.altitude}`;
  }

  if (selectedStripRoute) {
    selectedStripRoute.textContent = `${strip.origin} -> ${strip.destination} · ${strip.loadout}`;
  }

  if (selectedStripNotes) {
    selectedStripNotes.textContent = strip.notes || "Aucune note.";
  }

  actionsBar?.classList.toggle("is-emergency", strip.emergency);

  notesActionBtn?.removeAttribute("disabled");
  editStripActionBtn?.removeAttribute("disabled");
  controlActionBtn?.removeAttribute("disabled");
  emergencyActionBtn?.removeAttribute("disabled");
  deleteActionBtn?.removeAttribute("disabled");

  if (emergencyActionBtn) {
    emergencyActionBtn.classList.toggle("is-active", strip.emergency);
  }
}

function ensureModalRoot() {
  let root = document.getElementById("modalRoot");
  if (root) return root;
  root = document.createElement("div");
  root.id = "modalRoot";
  document.body.append(root);
  return root;
}

function openModal(config) {
  modalState = config;
  renderModal();
}

function closeModal() {
  const shouldRefreshBoard = !!modalState && (modalState.type === "edit" || modalState.type === "notes");
  modalState = null;
  renderModal();
  if (shouldRefreshBoard) {
    renderBoard();
  }
}

function renderModal() {
  const root = ensureModalRoot();

  if (!modalState) {
    root.innerHTML = "";
    return;
  }

  root.innerHTML = `
    <div class="modal-backdrop" data-close-modal="backdrop">
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="${esc(modalState.title)}">
        <div class="modal-head">
          <h2 class="modal-title">${esc(modalState.title)}</h2>
          <button class="modal-close" type="button" data-close-modal="button">X</button>
        </div>
        <div class="modal-body">
          ${modalState.body}
        </div>
      </div>
    </div>
  `;
}

function openCtrlModal(stripId) {
  const strip = state.strips.find((item) => item.id === stripId);
  if (!strip) return;

  openModal({
    type: "ctrl",
    stripId,
    title: `Transferer ${strip.callsign}`,
    body: `
      <div class="modal-option-grid">
        ${state.columns
          .map(
            (column) => `
              <button class="modal-option-btn ${column.id === strip.zoneId ? "is-current" : ""}" type="button" data-ctrl-target="${strip.id}:${column.id}">
                <span class="modal-option-title">${esc(column.title)}</span>
                <span class="modal-option-subtitle">${esc(column.freq)}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `
  });
}

function openEditStripModal(stripId) {
  const strip = state.strips.find((item) => item.id === stripId);
  if (!strip) return;

  openModal({
    type: "edit",
    stripId,
    title: `Modifier ${strip.callsign}`,
    body: `
      <div class="modal-edit-grid">
        <label class="modal-field">
          <span class="modal-field-label">Indicatif</span>
          <input class="modal-field-input" type="text" value="${esc(strip.callsign)}" data-modal-strip-field="${strip.id}:callsign" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Nombre</span>
          <input class="modal-field-input" type="text" value="${esc(strip.count)}" data-modal-strip-field="${strip.id}:count" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Appareil</span>
          <input class="modal-field-input" type="text" value="${esc(strip.aircraft)}" data-modal-strip-field="${strip.id}:aircraft" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Mission</span>
          <input class="modal-field-input" type="text" value="${esc(strip.mission)}" data-modal-strip-field="${strip.id}:mission" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Frequence</span>
          <input class="modal-field-input" type="text" value="${esc(strip.freq)}" data-modal-strip-field="${strip.id}:freq" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Squawk</span>
          <input class="modal-field-input" type="text" value="${esc(strip.squawk)}" data-modal-strip-field="${strip.id}:squawk" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Armement</span>
          <input class="modal-field-input" type="text" value="${esc(strip.loadout)}" data-modal-strip-field="${strip.id}:loadout" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Altitude</span>
          <input class="modal-field-input" type="text" value="${esc(strip.altitude)}" data-modal-strip-field="${strip.id}:altitude" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Origine</span>
          <input class="modal-field-input" type="text" value="${esc(strip.origin)}" data-modal-strip-field="${strip.id}:origin" />
        </label>
        <label class="modal-field">
          <span class="modal-field-label">Destination</span>
          <input class="modal-field-input" type="text" value="${esc(strip.destination)}" data-modal-strip-field="${strip.id}:destination" />
        </label>
        <label class="modal-field modal-field-span-2">
          <span class="modal-field-label">Note</span>
          <textarea class="modal-field-textarea" data-modal-strip-field="${strip.id}:notes">${esc(strip.notes)}</textarea>
        </label>
      </div>
      <div class="modal-confirm-row">
        <button class="modal-option-btn" type="button" data-close-modal="cancel">
          <span class="modal-option-title">Fermer</span>
        </button>
      </div>
    `
  });
}

function openNotesModal(stripId) {
  const strip = state.strips.find((item) => item.id === stripId);
  if (!strip) return;

  openModal({
    type: "notes",
    stripId,
    title: `Notes ${strip.callsign}`,
    body: `
      <div class="modal-notes-layout">
        <p class="modal-text">Ajoute ou modifie les notes operateur pour cette strip selectionnee.</p>
        <label class="modal-field">
          <span class="modal-field-label">Notes</span>
          <textarea class="modal-field-textarea modal-field-textarea-large" data-modal-strip-field="${strip.id}:notes">${esc(strip.notes)}</textarea>
        </label>
      </div>
      <div class="modal-confirm-row">
        <button class="modal-option-btn modal-option-btn--danger" type="button" data-clear-notes="${strip.id}">
          <span class="modal-option-title">Clear notes</span>
        </button>
        <button class="modal-option-btn" type="button" data-close-modal="cancel">
          <span class="modal-option-title">Fermer</span>
        </button>
      </div>
    `
  });
}

function openDeleteModal(stripId) {
  const strip = state.strips.find((item) => item.id === stripId);
  if (!strip) return;

  openModal({
    type: "delete",
    stripId,
    title: `Supprimer ${strip.callsign}`,
    body: `
      <p class="modal-text">Confirmer la suppression definitive de cette strip ?</p>
      <div class="modal-confirm-row">
        <button class="modal-option-btn" type="button" data-close-modal="cancel">
          <span class="modal-option-title">Annuler</span>
        </button>
        <button class="modal-option-btn modal-option-btn--danger" type="button" data-confirm-delete="${strip.id}">
          <span class="modal-option-title">Supprimer</span>
        </button>
      </div>
    `
  });
}

function bindDragAndDrop() {
  document.querySelectorAll("[data-strip-id]").forEach((stripNode) => {
    stripNode.addEventListener("dragstart", () => {
      draggedStripId = stripNode.dataset.stripId;
    });

    stripNode.addEventListener("dragend", () => {
      draggedStripId = null;
      document.querySelectorAll("[data-column-drop]").forEach((zone) => zone.classList.remove("is-over"));
    });
  });

  document.querySelectorAll("[data-column-drop]").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("is-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("is-over");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-over");

      if (!draggedStripId) return;

      const strip = state.strips.find((item) => item.id === draggedStripId);
      if (!strip) return;

      strip.zoneId = zone.dataset.columnDrop;
      state.selectedStripId = strip.id;
      touchStrip(strip);
      renderBoard();
    });
  });
}

function createStrip() {
  const firstColumnId = state.columns[0]?.id || "sector_1";
  state.strips.unshift(makeStrip({
    callsign: `NEW${String(state.strips.length + 1).padStart(2, "0")}`,
    count: "2",
    aircraft: "F16C",
    mission: "CAP",
    squawk: "0000",
    altitude: "FL000",
    loadout: "--",
    origin: "BASE",
    destination: "TARGET",
    freq: "000.000",
    notes: "",
    zoneId: firstColumnId,
    emergency: false
  }));
  state.selectedStripId = state.strips[0].id;
  renderBoard();
}

function addSector() {
  const nextIndex = state.columns.length + 1;
  state.columns.push({
    id: uid("sector"),
    title: `Sector ${nextIndex}`,
    label: "Custom flow",
    freq: "---.---"
  });
  renderBoard();
}

function removeSector() {
  if (state.columns.length <= 1) return;

  const removed = state.columns.pop();
  const fallbackId = state.columns[state.columns.length - 1].id;

  state.strips.forEach((strip) => {
    if (strip.zoneId === removed.id) {
      strip.zoneId = fallbackId;
      touchStrip(strip);
    }
  });

  renderBoard();
}

function removeSpecificSector(columnId) {
  if (state.columns.length <= 1) return;

  const columnIndex = state.columns.findIndex((column) => column.id === columnId);
  if (columnIndex === -1) return;

  const fallbackColumn = state.columns[columnIndex - 1] || state.columns[columnIndex + 1];
  if (!fallbackColumn) return;

  state.columns.splice(columnIndex, 1);

  state.strips.forEach((strip) => {
    if (strip.zoneId === columnId) {
      strip.zoneId = fallbackColumn.id;
      touchStrip(strip);
    }
  });

  renderBoard();
}

function updateClock() {
  if (!clockBox) return;
  clockBox.textContent = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function updateGameClock() {
  if (!gameClockDisplay) return;
  const elapsedSeconds = Math.floor((Date.now() - state.gameClockSyncedAt) / 1000);
  gameClockDisplay.textContent = formatClockSeconds(state.gameClockStartSeconds + elapsedSeconds);
}

function updateStripTimers() {
  document.querySelectorAll("[data-strip-timer]").forEach((node) => {
    const strip = state.strips.find((item) => item.id === node.dataset.stripTimer);
    if (!strip) return;
    node.textContent = formatElapsed(Date.now() - strip.lastActionAt);
  });
  renderSelectedStripBar();
}

function handleFieldInput(target) {
  const [stripId, field] = target.dataset.stripField.split(":");
  const strip = state.strips.find((item) => item.id === stripId);
  if (!strip) return;
  strip[field] = target.value;
  state.selectedStripId = strip.id;
  touchStrip(strip);
  renderSelectedStripBar();
}

function handleModalFieldInput(target) {
  const [stripId, field] = target.dataset.modalStripField.split(":");
  const strip = state.strips.find((item) => item.id === stripId);
  if (!strip) return;
  strip[field] = target.value;
  state.selectedStripId = strip.id;
  touchStrip(strip);
  renderSelectedStripBar();
}

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.dataset.columnField) {
    const [columnId, field] = target.dataset.columnField.split(":");
    const column = state.columns.find((item) => item.id === columnId);
    if (!column) return;
    column[field] = target.value;
    return;
  }

  if (target.dataset.modalStripField) {
    handleModalFieldInput(target);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.matches('[data-close-modal="backdrop"]')) {
    closeModal();
    return;
  }

  const closeTarget = event.target.closest('[data-close-modal="button"], [data-close-modal="cancel"]');
  if (closeTarget) {
    closeModal();
    return;
  }

  const selectBtn = event.target.closest("[data-select-strip]");
  if (selectBtn) {
    state.selectedStripId = selectBtn.dataset.selectStrip;
    renderBoard();
    return;
  }

  const deleteColumnBtn = event.target.closest("[data-delete-column]");
  if (deleteColumnBtn) {
    removeSpecificSector(deleteColumnBtn.dataset.deleteColumn);
    return;
  }

  const ctrlBtn = event.target.closest("[data-open-ctrl]");
  if (ctrlBtn) {
    openCtrlModal(ctrlBtn.dataset.openCtrl);
    return;
  }

  const emergencyBtn = event.target.closest("[data-toggle-emergency]");
  if (emergencyBtn) {
    const strip = state.strips.find((item) => item.id === emergencyBtn.dataset.toggleEmergency);
    if (!strip) return;
    strip.emergency = !strip.emergency;
    state.selectedStripId = strip.id;
    touchStrip(strip);
    renderBoard();
    return;
  }

  const deleteBtn = event.target.closest("[data-open-delete]");
  if (deleteBtn) {
    openDeleteModal(deleteBtn.dataset.openDelete);
    return;
  }

  const ctrlChoice = event.target.closest("[data-ctrl-target]");
  if (ctrlChoice) {
    const [stripId, columnId] = ctrlChoice.dataset.ctrlTarget.split(":");
    const strip = state.strips.find((item) => item.id === stripId);
    if (!strip) return;
    strip.zoneId = columnId;
    state.selectedStripId = strip.id;
    touchStrip(strip);
    closeModal();
    renderBoard();
    return;
  }

  const confirmDelete = event.target.closest("[data-confirm-delete]");
  if (confirmDelete) {
    state.strips = state.strips.filter((strip) => strip.id !== confirmDelete.dataset.confirmDelete);
    if (state.selectedStripId === confirmDelete.dataset.confirmDelete) {
      state.selectedStripId = state.strips[0]?.id || null;
    }
    closeModal();
    renderBoard();
    return;
  }

  const clearNotesBtn = event.target.closest("[data-clear-notes]");
  if (clearNotesBtn) {
    const strip = state.strips.find((item) => item.id === clearNotesBtn.dataset.clearNotes);
    if (!strip) return;
    strip.notes = "";
    state.selectedStripId = strip.id;
    touchStrip(strip);
    openNotesModal(strip.id);
    renderSelectedStripBar();
  }
});

notesActionBtn?.addEventListener("click", () => {
  const strip = getSelectedStrip();
  if (!strip) return;
  openNotesModal(strip.id);
});

editStripActionBtn?.addEventListener("click", () => {
  const strip = getSelectedStrip();
  if (!strip) return;
  openEditStripModal(strip.id);
});

controlActionBtn?.addEventListener("click", () => {
  const strip = getSelectedStrip();
  if (!strip) return;
  openCtrlModal(strip.id);
});

emergencyActionBtn?.addEventListener("click", () => {
  const strip = getSelectedStrip();
  if (!strip) return;
  strip.emergency = !strip.emergency;
  touchStrip(strip);
  renderBoard();
});

deleteActionBtn?.addEventListener("click", () => {
  const strip = getSelectedStrip();
  if (!strip) return;
  openDeleteModal(strip.id);
});

createPackageBtn?.addEventListener("click", createStrip);
addSectorBtn?.addEventListener("click", addSector);
removeSectorBtn?.addEventListener("click", removeSector);
syncGameClockBtn?.addEventListener("click", () => {
  state.gameClockStartSeconds = secondsFromTimeString(gameClockInput?.value || "00:00:00");
  state.gameClockSyncedAt = Date.now();
  updateGameClock();
});
loadMissionBtn?.addEventListener("click", loadMissionPackages);

seedStrips();
updateClock();
updateGameClock();
setInterval(updateClock, 1000);
setInterval(updateGameClock, 1000);
setInterval(updateStripTimers, 1000);
renderBoard();
