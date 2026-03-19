const BRIEFS_DIR = "../briefs/";
const SHORT_TOKEN_LENGTH = 12;
const SHORT_TOKEN_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const $ = (id) => document.getElementById(id);
const esc = (v) => String(v ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const briefIdInput = $("briefIdInput");
const briefLoadStatus = $("briefLoadStatus");
const loadBriefBtn = $("loadBriefBtn");
const createPackageBtn = $("createPackageBtn");
const applyBoardConfigBtn = $("applyBoardConfigBtn");
const boardConfigGrid = $("boardConfigGrid");
const columnCountInput = $("columnCountInput");
const stbyZone = $("stbyZone");
const boardGrid = $("boardGrid");
const logList = $("logList");

const newPkgName = $("newPkgName");
const newPkgTask = $("newPkgTask");
const newPkgAircraft = $("newPkgAircraft");
const newPkgCount = $("newPkgCount");
const newPkgLoadout = $("newPkgLoadout");
const newPkgFreq = $("newPkgFreq");

const STATUS_OPTIONS = ["START", "TAXI", "HOLD", "T/O", "EN VOL", "CHECK-IN", "ON STATION", "RTB", "LANDED"];

let draggedPackageId = null;

const state = {
  briefId: "",
  packages: [],
  columns: [
    { id: "col_1", title: "GROUND", freq: "121.800" },
    { id: "col_2", title: "TOWER", freq: "118.700" },
    { id: "col_3", title: "DEPARTURE", freq: "251.000" },
    { id: "col_4", title: "CONTROL", freq: "305.000" }
  ],
  logs: []
};

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function sanitizeShortToken(v) {
  return String(v || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, SHORT_TOKEN_LENGTH);
}

function nowLabel() {
  const d = new Date();
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function addLog(text) {
  state.logs.unshift({
    id: uid("log"),
    time: nowLabel(),
    text
  });
  state.logs = state.logs.slice(0, 150);
  renderLogs();
}

function randomColor() {
  return `#${[0, 0, 0].map(() => Math.floor(100 + Math.random() * 156).toString(16).padStart(2, "0")).join("")}`;
}

function createPackage(data = {}) {
  return {
    id: data.id || uid("pkg"),
    name: String(data.name || "").trim() || "PACKAGE",
    task: String(data.task || "").trim() || "--",
    aircraft: String(data.aircraft || "").trim() || "--",
    count: Number.isFinite(+data.count) && +data.count > 0 ? +data.count : 1,
    loadout: String(data.loadout || "").trim() || "--",
    freq: String(data.freq || "").trim() || "--",
    status: String(data.status || "").trim() || "START",
    leader: String(data.leader || "").trim() || "--",
    base: String(data.base || "").trim() || "--",
    destination: String(data.destination || "").trim() || "--",
    intra: String(data.intra || "").trim() || "--",
    color: data.color || randomColor(),
    alert: !!data.alert,
    zoneId: data.zoneId || "stby",
    editing: false
  };
}

function toBase64UrlBytes(v) {
  const base64 = String(v || "").trim()
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(String(v || "").trim().length / 4) * 4, "=");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

function decodeBriefToken(token) {
  try {
    const decoded = JSON.parse(new TextDecoder().decode(toBase64UrlBytes(token)));
    const pkgs = Array.isArray(decoded?.pk) ? decoded.pk : [];

    return pkgs.map((p) => createPackage({
      id: p.i || uid("pkg"),
      name: p.n || "PACKAGE",
      task: p.tk || "--",
      aircraft: p.a || "--",
      count: (Array.isArray(p.pl) ? p.pl.filter(Boolean).length : 0) + (p.ld ? 1 : 0) || 1,
      loadout: p.ato?.wp || "--",
      freq: p.f || "--",
      leader: p.ld || "--",
      base: p.b || "--",
      destination: p.d || "--",
      intra: p.f || "--",
      status: "START",
      color: p.c || randomColor(),
      zoneId: "stby"
    }));
  } catch {
    return null;
  }
}

async function resolvePackagesFromBriefId(briefId) {
  const clean = sanitizeShortToken(briefId);
  if (!clean || clean.length !== SHORT_TOKEN_LENGTH) {
    throw new Error("Brief ID invalide");
  }

  const res = await fetch(`${BRIEFS_DIR}${clean}.json?ts=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Brief introuvable (${res.status})`);
  }

  const data = await res.json();
  const token = String(data?.token || "").trim();
  if (!token) {
    throw new Error("Token absent");
  }

  const packages = decodeBriefToken(token);
  if (!packages) {
    throw new Error("Token briefing invalide");
  }

  return packages;
}

function renderBoardConfigInputs() {
  const count = Math.max(1, Math.min(8, +columnCountInput.value || 1));

  while (state.columns.length < count) {
    state.columns.push({
      id: uid("col"),
      title: `COL ${state.columns.length + 1}`,
      freq: "--"
    });
  }

  if (state.columns.length > count) {
    const removed = state.columns.splice(count);
    const fallbackZone = "stby";
    state.packages.forEach((pkg) => {
      if (removed.some((c) => c.id === pkg.zoneId)) {
        pkg.zoneId = fallbackZone;
      }
    });
  }

  boardConfigGrid.innerHTML = state.columns.map((col, index) => `
    <div class="mini-card">
      <div class="mini-label">Colonne ${index + 1}</div>
      <input type="text" value="${esc(col.title)}" data-column-field="${col.id}:title" placeholder="Titre colonne" />
      <input type="text" value="${esc(col.freq)}" data-column-field="${col.id}:freq" placeholder="Fréquence radio" />
    </div>
  `).join("");
}

function packageCardHtml(pkg) {
  return `
    <article class="package-card ${pkg.alert ? "is-alert" : ""} ${pkg.editing ? "is-editing" : ""}" draggable="true" data-package-id="${pkg.id}" style="--package-color:${esc(pkg.color)}">
      <div class="package-head">
        <div class="package-title-wrap">
          <h3 class="package-name">${esc(pkg.name)}</h3>
          <div class="package-task">${esc(pkg.task)}</div>
        </div>

        <label class="package-alert-toggle">
          <input type="checkbox" data-alert-toggle="${pkg.id}" ${pkg.alert ? "checked" : ""} />
          Alerte
        </label>
      </div>

      <div class="package-grid">
        <div class="package-data">
          <div class="package-data-label">Aircraft</div>
          <div class="package-data-value">${esc(pkg.aircraft)}</div>
        </div>
        <div class="package-data">
          <div class="package-data-label">Nombre</div>
          <div class="package-data-value">${esc(pkg.count)}</div>
        </div>
        <div class="package-data">
          <div class="package-data-label">Armement</div>
          <div class="package-data-value">${esc(pkg.loadout)}</div>
        </div>
        <div class="package-data">
          <div class="package-data-label">Fréquence</div>
          <div class="package-data-value">${esc(pkg.freq)}</div>
        </div>
        <div class="package-data">
          <div class="package-data-label">Statut</div>
          <div class="package-data-value">${esc(pkg.status)}</div>
        </div>
        <div class="package-data">
          <div class="package-data-label">Base</div>
          <div class="package-data-value">${esc(pkg.base)}</div>
        </div>
      </div>

      <div class="package-footer">
        <div class="package-status">${esc(pkg.status)}</div>
        <div class="package-actions">
          <button class="package-btn" type="button" data-edit-package="${pkg.id}">${pkg.editing ? "Fermer" : "Editer"}</button>
        </div>
      </div>

      <div class="package-edit-panel">
        <div class="package-edit-grid">
          <input type="text" value="${esc(pkg.aircraft)}" data-package-field="${pkg.id}:aircraft" placeholder="Appareil" />
          <input type="number" min="1" value="${esc(pkg.count)}" data-package-field="${pkg.id}:count" placeholder="Nombre" />
          <input type="text" value="${esc(pkg.loadout)}" data-package-field="${pkg.id}:loadout" placeholder="Armement" />
          <input type="text" value="${esc(pkg.freq)}" data-package-field="${pkg.id}:freq" placeholder="Fréquence" />
          <select data-package-field="${pkg.id}:status">
            ${STATUS_OPTIONS.map((status) => `<option value="${esc(status)}"${status === pkg.status ? " selected" : ""}>${esc(status)}</option>`).join("")}
          </select>
          <input type="text" value="${esc(pkg.destination)}" data-package-field="${pkg.id}:destination" placeholder="Destination" />
        </div>
      </div>
    </article>
  `;
}

function renderStby() {
  const stbyPackages = state.packages.filter((pkg) => pkg.zoneId === "stby");

  stbyZone.innerHTML = stbyPackages.length
    ? stbyPackages.map(packageCardHtml).join("")
    : `<div class="empty-state">Aucun package en attente.</div>`;
}

function renderBoard() {
  boardGrid.style.gridTemplateColumns = `repeat(${Math.max(1, state.columns.length)}, minmax(0,1fr))`;

  boardGrid.innerHTML = state.columns.map((col) => {
    const packages = state.packages.filter((pkg) => pkg.zoneId === col.id);

    return `
      <section class="board-column">
        <div class="board-column-head">
          <h3 class="board-column-title">${esc(col.title || "--")}</h3>
          <div class="board-column-freq">${esc(col.freq || "--")}</div>
        </div>
        <div class="board-column-drop dropzone" data-zone-id="${col.id}">
          ${packages.length ? packages.map(packageCardHtml).join("") : `<div class="empty-state">Aucun package dans cette colonne.</div>`}
        </div>
      </section>
    `;
  }).join("");
}

function renderLogs() {
  logList.innerHTML = state.logs.length
    ? state.logs.map((log) => `
      <article class="log-item">
        <div class="log-time">${esc(log.time)}</div>
        <div class="log-text">${esc(log.text)}</div>
      </article>
    `).join("")
    : `<div class="empty-state">Aucune action enregistrée.</div>`;
}

function renderAll() {
  renderBoardConfigInputs();
  renderStby();
  renderBoard();
  renderLogs();
  bindDragAndDrop();
}

function bindDragAndDrop() {
  document.querySelectorAll("[data-package-id]").forEach((card) => {
    card.addEventListener("dragstart", () => {
      draggedPackageId = card.dataset.packageId;
    });

    card.addEventListener("dragend", () => {
      draggedPackageId = null;
      document.querySelectorAll(".dropzone").forEach((zone) => zone.classList.remove("is-over"));
    });
  });

  document.querySelectorAll(".dropzone").forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("is-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("is-over");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("is-over");

      if (!draggedPackageId) return;

      const pkg = state.packages.find((p) => p.id === draggedPackageId);
      if (!pkg) return;

      const previousZone = pkg.zoneId;
      const targetZone = zone.dataset.zoneId;
      if (!targetZone || previousZone === targetZone) return;

      pkg.zoneId = targetZone;

      const fromLabel = previousZone === "stby"
        ? "STBY"
        : state.columns.find((c) => c.id === previousZone)?.title || "Colonne";
      const toLabel = targetZone === "stby"
        ? "STBY"
        : state.columns.find((c) => c.id === targetZone)?.title || "Colonne";

      addLog(`${pkg.name} déplacé de ${fromLabel} vers ${toLabel}`);
      renderAll();
    });
  });
}

function createManualPackage() {
  const pkg = createPackage({
    name: newPkgName.value || "PACKAGE",
    task: newPkgTask.value || "--",
    aircraft: newPkgAircraft.value || "--",
    count: +newPkgCount.value || 1,
    loadout: newPkgLoadout.value || "--",
    freq: newPkgFreq.value || "--",
    status: "START",
    zoneId: "stby"
  });

  state.packages.unshift(pkg);
  addLog(`${pkg.name} créé manuellement en STBY`);

  newPkgName.value = "";
  newPkgTask.value = "";
  newPkgAircraft.value = "";
  newPkgCount.value = "";
  newPkgLoadout.value = "";
  newPkgFreq.value = "";

  renderAll();
}

async function loadBriefPackages() {
  const briefId = sanitizeShortToken(briefIdInput.value);
  briefIdInput.value = briefId;

  try {
    briefLoadStatus.textContent = "Chargement...";
    const packages = await resolvePackagesFromBriefId(briefId);

    state.briefId = briefId;
    state.packages = packages.map((pkg) => ({ ...pkg, zoneId: "stby" }));
    briefLoadStatus.textContent = `${packages.length} package(s) chargé(s)`;

    addLog(`Brief ${briefId} chargé : ${packages.length} package(s) importé(s)`);
    renderAll();
  } catch (err) {
    briefLoadStatus.textContent = `Erreur : ${err.message}`;
    addLog(`Echec chargement brief ${briefId || "--"} : ${err.message}`);
  }
}

function applyBoardConfig() {
  renderBoardConfigInputs();
  addLog(`Configuration tableau mise à jour (${state.columns.length} colonne(s))`);
  renderAll();
}

boardConfigGrid.addEventListener("input", (e) => {
  const t = e.target;
  if (!t.dataset.columnField) return;

  const [colId, field] = t.dataset.columnField.split(":");
  const col = state.columns.find((c) => c.id === colId);
  if (!col) return;

  col[field] = t.value;
});

document.addEventListener("click", (e) => {
  const alertToggle = e.target.closest("[data-alert-toggle]");
  if (alertToggle) return;

  const editBtn = e.target.closest("[data-edit-package]");
  if (editBtn) {
    const pkg = state.packages.find((p) => p.id === editBtn.dataset.editPackage);
    if (!pkg) return;
    pkg.editing = !pkg.editing;
    addLog(`${pkg.name} ${pkg.editing ? "ouvert en édition" : "fermé en édition"}`);
    renderAll();
  }
});

document.addEventListener("change", (e) => {
  const t = e.target;

  if (t.dataset.alertToggle) {
    const pkg = state.packages.find((p) => p.id === t.dataset.alertToggle);
    if (!pkg) return;

    pkg.alert = !!t.checked;
    addLog(`${pkg.name} ${pkg.alert ? "passé en ALERTE" : "retiré de l'ALERTE"}`);
    renderAll();
    return;
  }

  if (t.dataset.packageField) {
    const [pkgId, field] = t.dataset.packageField.split(":");
    const pkg = state.packages.find((p) => p.id === pkgId);
    if (!pkg) return;

    let value = t.value;
    if (field === "count") value = Math.max(1, +value || 1);

    const oldValue = pkg[field];
    pkg[field] = value;

    addLog(`${pkg.name} : ${field} modifié (${oldValue} → ${value})`);
    renderAll();
  }
});

loadBriefBtn.addEventListener("click", loadBriefPackages);
createPackageBtn.addEventListener("click", createManualPackage);
applyBoardConfigBtn.addEventListener("click", applyBoardConfig);
columnCountInput.addEventListener("change", applyBoardConfig);

renderAll();
