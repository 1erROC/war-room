
const BRIEFS_DIR = "../briefs/";

const $ = (id) => document.getElementById(id);
const esc = (v) => String(v ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const appShell = $("appShell");
const modeSwitch = $("modeSwitch");
const modeValue = $("modeValue");
const newBriefBtn = $("newBriefBtn");
const copyUrlBtn = $("copyUrlBtn");
const copyTokenBtn = $("copyTokenBtn");
const pasteTokenBtn = $("pasteTokenBtn");
const publishBriefBtn = $("publishBriefBtn");
const shortTokenPreview = $("shortTokenPreview");
const longTokenPreview = $("longTokenPreview");
const briefFilePreview = $("briefFilePreview");
const addPackageBtn = $("addPackageBtn");
const loadAtoBtn = $("loadAtoBtn");
const loadAcoBtn = $("loadAcoBtn");

const packagesView = $("packagesView");
const packagesEditor = $("packagesEditor");
const atoView = $("atoView");
const atoEditor = $("atoEditor");
const acoEditor = $("acoEditor");

const timelineViews = {
  shell: $("timelineShell"),
  canvas: $("timelineCanvas"),
  list: $("timelineListView"),
  window: $("timelineViewWindow"),
  ref: $("timelineRefView"),
  editor: $("timelineEditor")
};

const weatherViews = {
  temp: $("tempView"),
  qnhInHg: $("qnhInHgView"),
  qnhHpa: $("qnhHpaView"),
  windDir: $("windDirView"),
  windSpeed: $("windSpeedView"),
  windGust: $("windGustView"),
  windArrow: $("windArrowView"),
  axis: $("altitudeAxis"),
  summaries: [$("layer1Summary"), $("layer2Summary"), $("layer3Summary")],
  layers: [$("cloudLayer1"), $("cloudLayer2"), $("cloudLayer3")]
};

const acoViews = {
  axis: $("acoAltitudeAxis"),
  lanes: $("acoLanes"),
  cards: $("acoCardsView")
};

const FIELD_DEF = {
  opName: ["opNameInput", "opNameView", "--"],
  map: ["mapInput", "mapView", "--"],
  dateGame: ["dateGameInput", "dateGameView", "--/--/----"],
  dateIrl: ["dateIrlInput", "dateIrlView", "--/--/----"],
  start: ["startInput", "startView", "--:--L"],
  tot: ["totInput", "totView", "--:--L"],
  end: ["endInput", "endView", "--:--L"],
  status: ["statusInput", "statusView", "Draft"],
  temp: ["tempInput"],
  qnh: ["qnhInput"],
  windDir: ["windDirInput"],
  windSpeed: ["windSpeedInput"],
  windGust: ["windGustInput"],
  layer1Type: ["layer1TypeInput"],
  layer1Base: ["layer1BaseInput"],
  layer1Top: ["layer1TopInput"],
  layer2Type: ["layer2TypeInput"],
  layer2Base: ["layer2BaseInput"],
  layer2Top: ["layer2TopInput"],
  layer3Type: ["layer3TypeInput"],
  layer3Base: ["layer3BaseInput"],
  layer3Top: ["layer3TopInput"],
  timelineStart: ["timelineStartInput"],
  timelineEnd: ["timelineEndInput"],
  timelineZoom: ["timelineZoomInput"]
};

const fields = Object.fromEntries(
  Object.entries(FIELD_DEF).map(([k, [input, view, fallback]]) => [
    k,
    { input: $(input), view: view ? $(view) : null, fallback }
  ])
);

const TASK_OPTIONS = [
  "CAP","BARCAP","DCA","OCA","TARCAP","HAVCAP","RESCAP","MIGCAP","SWEEP",
  "CAS","SCAR","AI","BAI","DEEP","STRIKE","PRECISION STRIKE","PGSTRIKE","DEAD","SEAD",
  "XCAS","FAC(A)","JTAC-COORD","RECCE","BDA","SAR","CSAR","PR","SOF INFIL/EXFIL","SARD",
  "SHOW OF FORCE","AAR","TANKER","AT","AIRLIFT","STRATEGIC AIRLIFT","TACTICAL AIRLIFT",
  "CASEVAC","MEDEVAC","RE-SUPPLY","CARGO DROP","CDS","ESCORT","FTR-ESCORT","STRIKE-ESCORT",
  "SOF-ESCORT","AAR-ESCORT"
];

const STRIKE_TASKS = new Set(["STRIKE","PRECISION STRIKE","PGSTRIKE","DEEP","DEAD","SEAD"]);
const CLOUD_TYPES = ["few", "sct", "bkn", "ovc"];
const DEFAULT_MAX_ALT = 30000;
const TIMELINE_MIN_ZOOM = 60;
const TIMELINE_MAX_ZOOM = 220;
const SHORT_TOKEN_LENGTH = 12;
const SHORT_TOKEN_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

let currentMode = "briefing";
let packageState = [];
let currentBriefId = "";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const nOrEmpty = (v) => (v === "" || v == null ? "" : (Number.isFinite(+v) ? +v : ""));
const sanitizeTime = (v) => String(v || "").replace(/\D/g, "").slice(0, 4);
const sanitizeICAO = (v) => String(v || "").toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 8);
const sanitizeShortToken = (v) => String(v || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, SHORT_TOKEN_LENGTH);
const formatDate = (v) => (/^(\d{4})-(\d{2})-(\d{2})$/.test(String(v || "")) ? `${RegExp.$3}/${RegExp.$2}/${RegExp.$1}` : "--/--/----");
const formatTime = (v) => (sanitizeTime(v).length === 4 ? `${sanitizeTime(v).slice(0, 2)}:${sanitizeTime(v).slice(2)}L` : "--:--L");
const formatTimeNoSuffix = (v) => (sanitizeTime(v).length === 4 ? `${sanitizeTime(v).slice(0, 2)}:${sanitizeTime(v).slice(2)}` : "--:--");
const formatWindDir = (v) => String(Math.round(((+v || 0) % 360 + 360) % 360)).padStart(3, "0");
const formatAlt = (v) => Number.isFinite(+v) ? `${(+v).toLocaleString("fr-FR")} ft` : "--";
const formatAxis = (v) => Number(v).toLocaleString("fr-FR");
const inHgToHpa = (v) => Math.round((+v || 29.92) * 33.8639);
const strikeLike = (t) => STRIKE_TASKS.has(String(t || "").trim().toUpperCase());
const randColor = () => `#${[0,0,0].map(() => Math.floor(100 + Math.random() * 156).toString(16).padStart(2, "0")).join("")}`;
const uid = () => `id_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const buildTaskOptions = (selected = "") => [
  `<option value="">--</option>`,
  ...TASK_OPTIONS.map((t) => `<option value="${esc(t)}"${t === String(selected || "").toUpperCase() ? " selected" : ""}>${esc(t)}</option>`)
].join("");

const createDefaultTimelineAction = () => ({
  id: uid(),
  time: "",
  text: "",
  isT0: false,
  locked: false
});

const createDefaultAto = () => ({
  loaded: false,
  collapsed: false,
  callsign: "",
  supportedPackage: "",
  takeoff: "",
  push: "",
  tot: "",
  station: "",
  rtb: "",
  net: "",
  nlt: "",
  commSupport: "",
  remarks: "",
  target: "",
  desiredEffect: "",
  attackHeading: "",
  weaponPlan: "",
  abortCriteria: ""
});

const createDefaultAco = () => ({
  loaded: false,
  collapsed: false,
  floor: "",
  ceiling: "",
  label: "",
  notes: ""
});

const createDefaultPackage = () => ({
  id: `pkg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  name: "",
  task: "",
  aircraft: "",
  base: "",
  destination: "",
  intra: "",
  leader: "",
  players: [],
  color: randColor(),
  collapsed: false,
  ato: createDefaultAto(),
  aco: createDefaultAco(),
  timeline: { actions: [] }
});

const getEmptyState = () => ({
  opName: "",
  map: "",
  dateGame: "",
  dateIrl: "",
  start: "",
  tot: "",
  end: "",
  status: "Draft",
  temp: "",
  qnh: 29.92,
  windDir: 0,
  windSpeed: 0,
  windGust: 0,
  timelineStart: "",
  timelineEnd: "",
  timelineZoom: 100,
  layers: [{}, {}, {}],
  packages: []
});

const normalizeTimelineAction = (a = {}) => ({
  id: a.id || uid(),
  time: sanitizeTime(a.time),
  text: String(a.text || "").trim(),
  isT0: !!a.isT0,
  locked: !!a.locked
});

const normalizeAto = (a = {}) => ({
  loaded: !!a.loaded,
  collapsed: !!a.collapsed,
  callsign: String(a.callsign || "").trim(),
  supportedPackage: String(a.supportedPackage || "").trim(),
  takeoff: sanitizeTime(a.takeoff),
  push: sanitizeTime(a.push),
  tot: sanitizeTime(a.tot),
  station: sanitizeTime(a.station),
  rtb: sanitizeTime(a.rtb),
  net: sanitizeTime(a.net),
  nlt: sanitizeTime(a.nlt),
  commSupport: String(a.commSupport || "").trim(),
  remarks: String(a.remarks || "").trim(),
  target: String(a.target || "").trim(),
  desiredEffect: String(a.desiredEffect || "").trim(),
  attackHeading: String(a.attackHeading || "").trim(),
  weaponPlan: String(a.weaponPlan || "").trim(),
  abortCriteria: String(a.abortCriteria || "").trim()
});

const normalizeAco = (a = {}) => ({
  loaded: !!a.loaded,
  collapsed: !!a.collapsed,
  floor: nOrEmpty(a.floor),
  ceiling: nOrEmpty(a.ceiling),
  label: String(a.label || "").trim(),
  notes: String(a.notes || "").trim()
});

const normalizePackage = (p = {}) => ({
  id: p.id || `pkg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  name: String(p.name || "").trim(),
  task: String(p.task || "").trim().toUpperCase(),
  aircraft: String(p.aircraft || "").trim(),
  base: sanitizeICAO(p.base),
  destination: String(p.destination || "").trim(),
  intra: String(p.intra || "").trim(),
  leader: String(p.leader || "").trim(),
  players: Array.isArray(p.players) ? p.players.map((v) => String(v || "").trim()) : [],
  color: p.color || randColor(),
  collapsed: !!p.collapsed,
  ato: normalizeAto(p.ato),
  aco: normalizeAco(p.aco),
  timeline: {
    actions: Array.isArray(p.timeline?.actions) ? p.timeline.actions.map(normalizeTimelineAction) : []
  }
});

const getAircraftCount = (p) => (p.leader ? 1 : 0) + (p.players || []).filter(Boolean).length;
const formatAircraftCount = (n) => `${n} aircraft`;
const validLayers = (layers = []) => layers.filter((l) => l?.type && l.base !== "" && l.top !== "" && +l.top > +l.base);
const validAcoPackages = (pkgs = []) => pkgs.filter((p) => p?.aco?.loaded && p.aco.floor !== "" && p.aco.ceiling !== "" && +p.aco.ceiling > +p.aco.floor);

function getMaxAltitudeFromTops(tops = []) {
  if (!tops.length) return DEFAULT_MAX_ALT;
  const padded = Math.max(...tops) + 2000;
  if (padded <= 10000) return 10000;
  if (padded <= 15000) return 15000;
  if (padded <= 20000) return 20000;
  if (padded <= 25000) return 25000;
  if (padded <= 30000) return 30000;
  if (padded <= 35000) return 35000;
  if (padded <= 40000) return 40000;
  if (padded <= 45000) return 45000;
  return 50000;
}

const getWeatherMaxAlt = (layers) => getMaxAltitudeFromTops(validLayers(layers).map((l) => +l.top));
const getAcoMaxAlt = (pkgs) => getMaxAltitudeFromTops(validAcoPackages(pkgs).map((p) => +p.aco.ceiling));
const getAxisStep = (m) => m <= 10000 ? 2000 : m <= 30000 ? 5000 : 10000;

function renderAxis(target, maxAlt) {
  target.innerHTML = "";
  const step = getAxisStep(maxAlt);
  target.innerHTML = Array.from({ length: Math.floor(maxAlt / step) + 1 }, (_, i) => {
    const alt = i * step;
    return `<div class="alt-line" style="bottom:${(alt / maxAlt) * 100}%"><span>${formatAxis(alt)}</span></div>`;
  }).join("");
}

function getLayer(i) {
  return {
    type: fields[`layer${i}Type`].input.value || "",
    base: nOrEmpty(fields[`layer${i}Base`].input.value),
    top: nOrEmpty(fields[`layer${i}Top`].input.value)
  };
}

function getState() {
  return {
    opName: fields.opName.input.value.trim(),
    map: fields.map.input.value.trim(),
    dateGame: fields.dateGame.input.value || "",
    dateIrl: fields.dateIrl.input.value || "",
    start: sanitizeTime(fields.start.input.value),
    tot: sanitizeTime(fields.tot.input.value),
    end: sanitizeTime(fields.end.input.value),
    status: fields.status.input.value || "Draft",
    temp: nOrEmpty(fields.temp.input.value),
    qnh: nOrEmpty(fields.qnh.input.value),
    windDir: nOrEmpty(fields.windDir.input.value),
    windSpeed: nOrEmpty(fields.windSpeed.input.value),
    windGust: nOrEmpty(fields.windGust.input.value),
    timelineStart: sanitizeTime(fields.timelineStart.input.value),
    timelineEnd: sanitizeTime(fields.timelineEnd.input.value),
    timelineZoom: clamp(Number(fields.timelineZoom.input.value || 100), TIMELINE_MIN_ZOOM, TIMELINE_MAX_ZOOM),
    layers: [1, 2, 3].map(getLayer),
    packages: packageState.map(normalizePackage)
  };
}

function applyState(state = {}) {
  ["opName","map","dateGame","dateIrl","start","tot","end","status","temp","qnh","windDir","windSpeed","windGust","timelineStart","timelineEnd","timelineZoom"].forEach((k) => {
    fields[k].input.value = state[k] ?? "";
  });

  [1, 2, 3].forEach((i) => {
    const l = state.layers?.[i - 1] || {};
    fields[`layer${i}Type`].input.value = l.type || "";
    fields[`layer${i}Base`].input.value = l.base ?? "";
    fields[`layer${i}Top`].input.value = l.top ?? "";
  });

  fields.start.input.value = sanitizeTime(fields.start.input.value);
  fields.tot.input.value = sanitizeTime(fields.tot.input.value);
  fields.end.input.value = sanitizeTime(fields.end.input.value);
  fields.timelineStart.input.value = sanitizeTime(fields.timelineStart.input.value);
  fields.timelineEnd.input.value = sanitizeTime(fields.timelineEnd.input.value);
  fields.timelineZoom.input.value = clamp(Number(fields.timelineZoom.input.value || 100), TIMELINE_MIN_ZOOM, TIMELINE_MAX_ZOOM);

  packageState = Array.isArray(state.packages) ? state.packages.map(normalizePackage) : [];
  ensureSingleT0();
  renderState();
}

function renderOverview(state) {
  fields.opName.view.textContent = state.opName || fields.opName.fallback;
  fields.map.view.textContent = state.map || fields.map.fallback;
  fields.dateGame.view.textContent = formatDate(state.dateGame);
  fields.dateIrl.view.textContent = formatDate(state.dateIrl);
  fields.start.view.textContent = formatTime(state.start);
  fields.tot.view.textContent = formatTime(state.tot);
  fields.end.view.textContent = formatTime(state.end);
  fields.status.view.textContent = state.status || fields.status.fallback;
}

function renderLayer(layer, el, summary, maxAlt) {
  if (!layer.type || layer.base === "" || layer.top === "" || +layer.top <= +layer.base) {
    el.style.display = "none";
    el.className = "cloud-layer";
    summary.textContent = "--";
    return;
  }

  const base = clamp(+layer.base, 0, maxAlt);
  const top = clamp(+layer.top, 0, maxAlt);

  if (top <= base) {
    el.style.display = "none";
    el.className = "cloud-layer";
    summary.textContent = "--";
    return;
  }

  const type = String(layer.type).toLowerCase();
  el.style.display = "block";
  el.className = `cloud-layer ${CLOUD_TYPES.includes(type) ? type : "few"}`;
  el.style.bottom = `${(base / maxAlt) * 100}%`;
  el.style.height = `${((top - base) / maxAlt) * 100}%`;
  summary.textContent = `${layer.type} | ${formatAlt(base)} / ${formatAlt(top)}`;
}

function renderWeather(state) {
  const qnh = state.qnh !== "" ? +state.qnh : 29.92;
  const wd = state.windDir !== "" ? +state.windDir : 0;
  const ws = state.windSpeed !== "" ? +state.windSpeed : 0;
  const wg = state.windGust !== "" ? +state.windGust : 0;
  const maxAlt = getWeatherMaxAlt(state.layers || []);

  weatherViews.temp.textContent = state.temp !== "" ? state.temp : "--";
  weatherViews.qnhInHg.textContent = qnh.toFixed(2);
  weatherViews.qnhHpa.textContent = inHgToHpa(qnh);
  weatherViews.windDir.textContent = formatWindDir(wd);
  weatherViews.windSpeed.textContent = String(Math.round(ws)).padStart(2, "0");
  weatherViews.windGust.textContent = String(Math.round(wg)).padStart(2, "0");
  weatherViews.windArrow.style.transform = `rotate(${wd}deg)`;

  renderAxis(weatherViews.axis, maxAlt);
  state.layers.forEach((l, i) => renderLayer(l || {}, weatherViews.layers[i], weatherViews.summaries[i], maxAlt));
}

function renderPackagesView(packages = []) {
  if (!packages.length) {
    packagesView.innerHTML = `<div class="package-empty">Aucun package renseigné.</div>`;
    return;
  }

  packagesView.innerHTML = packages.map((p) => {
    const players = (p.players || []).filter(Boolean);
    return `
      <article class="package-item" style="--package-color:${esc(p.color || "#57c7ff")}">
        <div class="package-head">
          <h3 class="package-name">${esc(p.name || "--")}</h3>
          <div class="package-task">${esc(p.task || "--")}</div>
        </div>
        <div class="package-meta">${esc(formatAircraftCount(getAircraftCount(p)))} • ${esc(p.aircraft || "--")} • ${esc(p.base || "--")}</div>
        <div class="package-crew">
          <div class="package-leader">Leader : ${esc(p.leader || "--")}</div>
          ${players.map((n, i) => `<div class="package-member">${i + 2}. ${esc(n)}</div>`).join("")}
        </div>
        <div class="package-footer">Intra : ${esc(p.intra || "--")} • Destination : ${esc(p.destination || "--")}</div>
      </article>
    `;
  }).join("");
}

function timingViewHtml(ato, strike) {
  const cells = [
    ["Takeoff", formatTime(ato.takeoff)],
    ["Push", formatTime(ato.push)],
    ["TOT", formatTime(ato.tot)],
    ["On station", formatTime(ato.station)],
    ["RTB", formatTime(ato.rtb)]
  ];
  if (strike) cells.push(["NET", formatTime(ato.net)], ["NLT", formatTime(ato.nlt)]);

  return `
    <div class="ato-data-grid ${strike ? "five-col" : ""}">
      ${cells.map(([l, v]) => `<div class="ato-data-item"><div class="ato-data-label">${l}</div><div class="ato-data-value">${esc(v)}</div></div>`).join("")}
    </div>
  `;
}

function timingEditorHtml(ato, strike, id) {
  const cells = [
    ["takeoff", "Takeoff"],
    ["push", "Push"],
    ["tot", "TOT"],
    ["station", "On station"],
    ["rtb", "RTB"]
  ];
  if (strike) cells.push(["net", "NET"], ["nlt", "NLT"]);

  return `
    <div class="ato-editor-grid ${strike ? "five-col" : ""}">
      ${cells.map(([f, l]) => `
        <div class="mini-card">
          <div class="mini-label">${l}</div>
          <input type="text" value="${esc(ato[f] || "")}" data-ato-field="${f}" data-package-id="${id}" inputmode="numeric" maxlength="4" placeholder="HHMM" />
        </div>
      `).join("")}
    </div>
  `;
}

function missionSpecificViewHtml(pkg, ato) {
  if (!strikeLike(pkg.task)) return "";
  return `
    <section class="ato-section">
      <div class="ato-section-header"><h4 class="ato-section-title">${esc(pkg.task || "Mission")} Specific</h4><span class="ato-section-tag">Mission Specific</span></div>
      <div class="ato-section-body">
        <div class="ato-data-grid">
          ${[
            ["Target", ato.target],
            ["Desired effect", ato.desiredEffect],
            ["Attack heading", ato.attackHeading],
            ["Weapon plan", ato.weaponPlan],
            ["Abort criteria", ato.abortCriteria]
          ].map(([l, v]) => `<div class="ato-data-item"><div class="ato-data-label">${l}</div><div class="ato-data-value">${esc(v || "--")}</div></div>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function missionSpecificEditorHtml(pkg, ato) {
  if (!strikeLike(pkg.task)) return "";
  return `
    <section class="ato-section">
      <div class="ato-section-header"><h4 class="ato-section-title">${esc(pkg.task || "Mission")} Specific</h4><span class="ato-section-tag">Mission Specific</span></div>
      <div class="ato-section-body">
        <div class="ato-editor-grid">
          ${[
            ["target", "Target"],
            ["desiredEffect", "Desired effect"],
            ["attackHeading", "Attack heading"],
            ["weaponPlan", "Weapon plan"],
            ["abortCriteria", "Abort criteria"]
          ].map(([f, l]) => `
            <div class="mini-card">
              <div class="mini-label">${l}</div>
              <input type="text" value="${esc(ato[f] || "")}" data-ato-field="${f}" data-package-id="${pkg.id}" ${f === "attackHeading" ? `placeholder="270 / West-East"` : ""} />
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderAtoView(packages = []) {
  const loaded = packages.filter((p) => normalizeAto(p.ato).loaded);
  if (!loaded.length) {
    atoView.innerHTML = `<div class="ato-empty">Aucun ATO chargé. Utilise “Load ATO” dans la partie édition.</div>`;
    return;
  }

  atoView.innerHTML = loaded.map((p) => {
    const ato = normalizeAto(p.ato);
    const strike = strikeLike(p.task);

    return `
      <article class="ato-view-card ${ato.collapsed ? "is-collapsed" : ""}" style="--package-color:${esc(p.color || "#57c7ff")}">
        <div class="ato-view-head ato-toggle-head" data-toggle-ato-view="${p.id}" role="button" tabindex="0" aria-expanded="${ato.collapsed ? "false" : "true"}">
          <div class="ato-head-left">
            <div class="ato-view-title-wrap">
              <div class="ato-view-title-row"><span class="ato-color-badge"></span><h3 class="ato-view-title">${esc(p.name || "--")}</h3></div>
              <div class="ato-view-subtitle">${esc(p.task || "--")} • Leader : ${esc(p.leader || "--")}</div>
            </div>
          </div>
          <div class="ato-head-meta">
            <div class="ato-meta-box"><div class="ato-meta-label">Callsign</div><div class="ato-meta-value">${esc(ato.callsign || "--")}</div></div>
            <div class="ato-meta-box"><div class="ato-meta-label">Intra</div><div class="ato-meta-value">${esc(p.intra || "--")}</div></div>
            <div class="ato-meta-box"><div class="ato-meta-label">Task</div><div class="ato-meta-value">${esc(p.task || "--")}</div></div>
          </div>
          <span class="ato-collapse-indicator">${ato.collapsed ? "▸" : "▾"}</span>
        </div>

        <div class="ato-view-body">
          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Common</h4><span class="ato-section-tag">Common</span></div>
            <div class="ato-section-body">
              <div class="ato-data-grid">
                <div class="ato-data-item"><div class="ato-data-label">Aircraft</div><div class="ato-data-value">${esc(p.aircraft || "--")}</div></div>
                <div class="ato-data-item"><div class="ato-data-label">Supported package</div><div class="ato-data-value">${esc(ato.supportedPackage || "--")}</div></div>
                <div class="ato-data-item"><div class="ato-data-label">Départ</div><div class="ato-data-value">${esc(p.base || "--")}</div></div>
                <div class="ato-data-item"><div class="ato-data-label">Arrivée</div><div class="ato-data-value">${esc(p.destination || "--")}</div></div>
              </div>
            </div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Timing</h4><span class="ato-section-tag">Execution</span></div>
            <div class="ato-section-body">${timingViewHtml(ato, strike)}</div>
          </section>

          ${missionSpecificViewHtml(p, ato)}

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Coordination / Remarks</h4><span class="ato-section-tag">Comms</span></div>
            <div class="ato-section-body">
              <div class="ato-data-grid" style="margin-bottom:12px;">
                <div class="ato-data-item"><div class="ato-data-label">Comm support</div><div class="ato-data-value">${esc(ato.commSupport || "--")}</div></div>
                <div class="ato-data-item"><div class="ato-data-label">Package</div><div class="ato-data-value">${esc(p.name || "--")}</div></div>
              </div>
              <div class="ato-remarks-box">${esc(ato.remarks || "--")}</div>
            </div>
          </section>
        </div>
      </article>
    `;
  }).join("");
}

function renderAtoEditor(packages = []) {
  const loaded = packages.filter((p) => normalizeAto(p.ato).loaded);
  if (!loaded.length) {
    atoEditor.innerHTML = `<div class="ato-empty">Aucun ATO chargé. Clique sur “Load ATO”.</div>`;
    return;
  }

  atoEditor.innerHTML = loaded.map((p) => {
    const ato = normalizeAto(p.ato);
    const strike = strikeLike(p.task);

    return `
      <article class="ato-editor-card ${ato.collapsed ? "is-collapsed" : ""}" style="--package-color:${esc(p.color || "#57c7ff")}">
        <div class="ato-editor-head ato-toggle-head" data-toggle-ato-editor="${p.id}" role="button" tabindex="0" aria-expanded="${ato.collapsed ? "false" : "true"}">
          <div class="ato-head-left">
            <div class="ato-editor-title-wrap">
              <div class="ato-editor-title-row"><span class="ato-color-badge"></span><h3 class="ato-editor-title">${esc(p.name || "--")}</h3></div>
              <div class="ato-editor-subtitle">${esc(p.task || "--")} • Leader : ${esc(p.leader || "--")}</div>
            </div>
          </div>
          <div class="ato-head-meta">
            <div class="ato-meta-box"><div class="ato-meta-label">Base</div><div class="ato-meta-value">${esc(p.base || "--")}</div></div>
            <div class="ato-meta-box"><div class="ato-meta-label">Destination</div><div class="ato-meta-value">${esc(p.destination || "--")}</div></div>
            <div class="ato-meta-box"><div class="ato-meta-label">Intra</div><div class="ato-meta-value">${esc(p.intra || "--")}</div></div>
          </div>
          <span class="ato-collapse-indicator">${ato.collapsed ? "▸" : "▾"}</span>
        </div>

        <div class="ato-editor-body">
          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Common</h4><span class="ato-section-tag">Common</span></div>
            <div class="ato-section-body">
              <div class="ato-editor-grid">
                <div class="mini-card"><div class="mini-label">Callsign</div><input type="text" value="${esc(ato.callsign || "")}" data-ato-field="callsign" data-package-id="${p.id}" placeholder="JOKER 1" /></div>
                <div class="mini-card"><div class="mini-label">Supported package</div><input type="text" value="${esc(ato.supportedPackage || "")}" data-ato-field="supportedPackage" data-package-id="${p.id}" placeholder="VIPER / MAIN STRIKE" /></div>
              </div>
            </div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Timing</h4><span class="ato-section-tag">Execution</span></div>
            <div class="ato-section-body">${timingEditorHtml(ato, strike, p.id)}</div>
          </section>

          ${missionSpecificEditorHtml(p, ato)}

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Coordination / Remarks</h4><span class="ato-section-tag">Comms</span></div>
            <div class="ato-section-body">
              <div class="ato-editor-grid">
                <div class="mini-card"><div class="mini-label">Comm support</div><input type="text" value="${esc(ato.commSupport || "")}" data-ato-field="commSupport" data-package-id="${p.id}" placeholder="MAGIC / SHELL / JTAC" /></div>
                <div class="mini-card"><div class="mini-label">Remarks</div><textarea data-ato-field="remarks" data-package-id="${p.id}" placeholder="Notes tactiques, coordination, contraintes...">${esc(ato.remarks || "")}</textarea></div>
              </div>
            </div>
          </section>
        </div>
      </article>
    `;
  }).join("");
}

function renderAcoView(packages = []) {
  const loaded = packages.filter((p) => normalizeAco(p.aco).loaded);
  acoViews.cards.innerHTML = "";
  acoViews.lanes.innerHTML = "";
  renderAxis(acoViews.axis, getAcoMaxAlt(loaded));

  if (!loaded.length) {
    acoViews.cards.innerHTML = `<div class="aco-empty">Aucun ACO chargé. Utilise “Load ACO” dans la partie édition.</div>`;
    return;
  }

  const maxAlt = getAcoMaxAlt(loaded);

  acoViews.cards.innerHTML = loaded.map((p) => {
    const aco = normalizeAco(p.aco);
    const floor = aco.floor !== "" ? +aco.floor : null;
    const ceiling = aco.ceiling !== "" ? +aco.ceiling : null;

    return `
      <article class="aco-summary-card ${aco.collapsed ? "is-collapsed" : ""}" style="--package-color:${esc(p.color || "#57c7ff")}">
        <div class="aco-summary-head aco-summary-toggle" data-toggle-aco-view="${p.id}" role="button" tabindex="0" aria-expanded="${aco.collapsed ? "false" : "true"}">
          <h3 class="aco-summary-title">${esc(aco.label || p.name || "--")}</h3>
          <div class="aco-summary-task">${esc(p.task || "--")}</div>
          <span class="aco-collapse-indicator">${aco.collapsed ? "▸" : "▾"}</span>
        </div>
        <div class="aco-summary-body">
          <div class="aco-summary-grid">
            <div class="aco-summary-item"><div class="aco-summary-label">Package</div><div class="aco-summary-value">${esc(p.name || "--")}</div></div>
            <div class="aco-summary-item"><div class="aco-summary-label">Aircraft</div><div class="aco-summary-value">${esc(p.aircraft || "--")}</div></div>
            <div class="aco-summary-item"><div class="aco-summary-label">Plancher</div><div class="aco-summary-value">${esc(formatAlt(floor))}</div></div>
            <div class="aco-summary-item"><div class="aco-summary-label">Plafond</div><div class="aco-summary-value">${esc(formatAlt(ceiling))}</div></div>
          </div>
          ${aco.notes ? `<div class="aco-summary-item" style="margin-top:10px;"><div class="aco-summary-label">Notes</div><div class="aco-summary-value">${esc(aco.notes)}</div></div>` : ""}
        </div>
      </article>
    `;
  }).join("");

  acoViews.lanes.innerHTML = loaded.map((p) => {
    const aco = normalizeAco(p.aco);
    const floor = aco.floor !== "" ? +aco.floor : null;
    const ceiling = aco.ceiling !== "" ? +aco.ceiling : null;
    if (floor == null || ceiling == null || ceiling <= floor) return `<div class="aco-lane"></div>`;

    const safeFloor = clamp(floor, 0, maxAlt);
    const safeCeiling = clamp(ceiling, 0, maxAlt);
    const h = ((safeCeiling - safeFloor) / maxAlt) * 100;

    return `
      <div class="aco-lane">
        <div class="aco-block ${h <= 7 ? "is-thin" : ""}" style="--package-color:${esc(p.color || "#57c7ff")};bottom:${(safeFloor / maxAlt) * 100}%;height:${Math.max(h, 2.4)}%">
          <div class="aco-block-content">
            <div class="aco-block-title">${esc(aco.label || p.name || "--")}</div>
            <div class="aco-block-subtitle">${esc(formatAlt(floor))} → ${esc(formatAlt(ceiling))}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderPackagesEditor(packages = []) {
  if (!packages.length) {
    packagesEditor.innerHTML = `<div class="package-empty">Aucun package. Utilise “Ajouter package”.</div>`;
    return;
  }

  packagesEditor.innerHTML = packages.map((p, i) => {
    const players = (p.players || []).map((name, pi) => `
      <div class="player-row">
        <div class="player-index">${pi + 2}.</div>
        <input type="text" value="${esc(name || "")}" data-player-input="${i}:${pi}" placeholder="Pseudo joueur ${pi + 2}" />
        <button type="button" class="action-btn remove-btn player-remove-btn" data-remove-player="${i}:${pi}">Retirer</button>
      </div>
    `).join("");

    const summary = [
      p.task || "--",
      formatAircraftCount(getAircraftCount(p)),
      p.base || "--",
      p.destination || "--",
      p.intra || "--"
    ].join(" • ");

    return `
      <article class="package-editor-card ${p.collapsed ? "is-collapsed" : ""}" style="--package-color:${esc(p.color || "#57c7ff")}">
        <div class="package-editor-head package-toggle-head" data-toggle-package="${i}" role="button" tabindex="0" aria-expanded="${p.collapsed ? "false" : "true"}">
          <div class="package-head-left">
            <button type="button" class="package-color-dot package-color-btn" data-open-color="${i}" aria-label="Choisir la couleur du package ${i + 1}" title="Choisir la couleur"></button>
            <input type="color" value="${esc(p.color || "#57c7ff")}" data-color-input="${i}" class="package-color-input" tabindex="-1" aria-hidden="true" />
            <div class="package-editor-title-wrap">
              <div class="package-editor-label">Package ${i + 1}</div>
              <div class="package-editor-summary">${esc(summary)}</div>
            </div>
          </div>
          <span class="package-collapse-indicator">${p.collapsed ? "▸" : "▾"}</span>
        </div>

        <div class="package-editor-content">
          <div class="package-editor-grid">
            <div class="mini-card"><div class="mini-label">Nom package</div><input type="text" value="${esc(p.name || "")}" data-package-field="${i}:name" placeholder="JOKER" /></div>
            <div class="mini-card"><div class="mini-label">Task</div><select data-package-field="${i}:task">${buildTaskOptions(p.task)}</select></div>
            <div class="mini-card"><div class="mini-label">Appareil</div><input type="text" value="${esc(p.aircraft || "")}" data-package-field="${i}:aircraft" placeholder="F/A-18C" /></div>
            <div class="mini-card"><div class="mini-label">Base départ OACI</div><input type="text" value="${esc(p.base || "")}" data-package-field="${i}:base" placeholder="KLSV" /></div>
            <div class="mini-card"><div class="mini-label">Destination</div><input type="text" value="${esc(p.destination || "")}" data-package-field="${i}:destination" placeholder="CVN-71 / Kutaisi / KLSV" /></div>
            <div class="mini-card"><div class="mini-label">Fréquence intra</div><input type="text" value="${esc(p.intra || "")}" data-package-field="${i}:intra" placeholder="305.000" /></div>
            <div class="mini-card"><div class="mini-label">Leader</div><input type="text" value="${esc(p.leader || "")}" data-package-field="${i}:leader" placeholder="Seluj" /></div>
          </div>

          <div class="package-editor-toolbar">
            <button type="button" class="action-btn" data-random-color="${i}">Random color</button>
            <button type="button" class="action-btn" data-add-player="${i}">Ajouter joueur</button>
            <button type="button" class="action-btn remove-btn" data-remove-package="${i}">Supprimer package</button>
          </div>

          <div class="package-players-block">
            <div class="package-players-header"><div class="package-players-title">Roster joueurs</div></div>
            <div class="package-players-list">${players}</div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderAcoEditor(packages = []) {
  const loaded = packages.filter((p) => normalizeAco(p.aco).loaded);
  if (!loaded.length) {
    acoEditor.innerHTML = `<div class="aco-empty">Aucun ACO chargé. Clique sur “Load ACO”.</div>`;
    return;
  }

  acoEditor.innerHTML = loaded.map((p) => {
    const a = normalizeAco(p.aco);
    return `
      <article class="aco-editor-card ${a.collapsed ? "is-collapsed" : ""}" style="--package-color:${esc(p.color || "#57c7ff")}">
        <div class="aco-editor-head aco-toggle-head" data-toggle-aco-editor="${p.id}" role="button" tabindex="0" aria-expanded="${a.collapsed ? "false" : "true"}">
          <div class="aco-editor-title-wrap">
            <div class="aco-editor-title-row"><span class="ato-color-badge"></span><h3 class="aco-editor-title">${esc(p.name || "--")}</h3></div>
            <div class="aco-editor-subtitle">${esc(p.task || "--")} • ${esc(p.aircraft || "--")} • ${esc(p.base || "--")}</div>
          </div>
          <span class="ato-collapse-indicator">${a.collapsed ? "▸" : "▾"}</span>
        </div>

        <div class="aco-editor-body">
          <div class="aco-editor-grid">
            <div class="mini-card"><div class="mini-label">Label ACO</div><input type="text" value="${esc(a.label || "")}" data-aco-field="${p.id}:label" placeholder="JOKER" /></div>
            <div class="mini-card"><div class="mini-label">Notes</div><input type="text" value="${esc(a.notes || "")}" data-aco-field="${p.id}:notes" placeholder="Block CAP / Holding / Transit / Kill box" /></div>
            <div class="mini-card"><div class="mini-label">Plafond ft</div><input type="number" min="0" step="100" value="${esc(a.ceiling === "" ? "" : a.ceiling)}" data-aco-field="${p.id}:ceiling" placeholder="26000" /></div>
            <div class="mini-card"><div class="mini-label">Plancher ft</div><input type="number" min="0" step="100" value="${esc(a.floor === "" ? "" : a.floor)}" data-aco-field="${p.id}:floor" placeholder="18000" /></div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* timeline */
function sanitizeTimelineZoom(v) {
  const n = Number(v);
  return Number.isFinite(n) ? clamp(Math.round(n), TIMELINE_MIN_ZOOM, TIMELINE_MAX_ZOOM) : 100;
}

function validTimelineTime(v) {
  return sanitizeTime(v).length === 4;
}

function timeToMinutes(v) {
  const s = sanitizeTime(v);
  if (s.length !== 4) return null;
  const h = +s.slice(0, 2);
  const m = +s.slice(2);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

function minutesToHhmm(total) {
  const n = ((total % 1440) + 1440) % 1440;
  return `${String(Math.floor(n / 60)).padStart(2, "0")}${String(n % 60).padStart(2, "0")}`;
}

function timelineDuration(start, end) {
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);
  if (s == null || e == null) return null;
  return e <= s ? e + 1440 - s : e - s;
}

function timelineAbsolute(start, end, point) {
  const s = timeToMinutes(start);
  const p = timeToMinutes(point);
  const dur = timelineDuration(start, end);
  if (s == null || p == null || dur == null) return null;

  let value = p;
  if (value < s) value += 1440;
  while (value - s > dur) value -= 1440;
  return value;
}

function timelineDeltaLabel(delta) {
  if (delta == null || Number.isNaN(delta)) return "—";
  if (delta === 0) return "T-0";
  const sign = delta > 0 ? "+" : "-";
  const abs = Math.abs(delta);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h && m) return `T${sign}${h}h${String(m).padStart(2, "0")}`;
  if (h) return `T${sign}${h}h`;
  return `T${sign}${m}m`;
}

function getTimelineWindow(state) {
  const fallbackStart = validTimelineTime(state.start) ? state.start : "";
  const fallbackEnd = validTimelineTime(state.end) ? state.end : "";
  const start = validTimelineTime(state.timelineStart) ? state.timelineStart : fallbackStart;
  const end = validTimelineTime(state.timelineEnd) ? state.timelineEnd : fallbackEnd;
  return { start, end, zoom: sanitizeTimelineZoom(state.timelineZoom) };
}

function ensureTimelineDefaultsFromOverview() {
  if (!validTimelineTime(fields.timelineStart.input.value) && validTimelineTime(fields.start.input.value)) {
    fields.timelineStart.input.value = sanitizeTime(fields.start.input.value);
  }
  if (!validTimelineTime(fields.timelineEnd.input.value) && validTimelineTime(fields.end.input.value)) {
    fields.timelineEnd.input.value = sanitizeTime(fields.end.input.value);
  }
  fields.timelineZoom.input.value = sanitizeTimelineZoom(fields.timelineZoom.input.value || 100);
}

function ensureSingleT0() {
  let found = false;
  packageState.forEach((pkg) => {
    pkg.timeline ||= { actions: [] };
    pkg.timeline.actions = (pkg.timeline.actions || []).map(normalizeTimelineAction);
    pkg.timeline.actions.forEach((action) => {
      if (action.isT0) {
        if (!found) found = true;
        else action.isT0 = false;
      }
    });
  });
}

function computeTimelineData(state) {
  const win = getTimelineWindow(state);
  const { start, end, zoom } = win;
  const duration = timelineDuration(start, end);
  const validWindow = duration != null && duration > 0;

  const allActions = [];
  state.packages.forEach((pkg, pkgIndex) => {
    (pkg.timeline?.actions || []).forEach((action, actionIndex) => {
      const abs = validWindow ? timelineAbsolute(start, end, action.time) : null;
      const offset = abs != null && validWindow ? abs - timeToMinutes(start) : null;
      allActions.push({
        ...normalizeTimelineAction(action),
        pkgId: pkg.id,
        pkgName: pkg.name || `Package ${pkgIndex + 1}`,
        pkgColor: pkg.color || "#57c7ff",
        pkgTask: pkg.task || "--",
        pkgIndex,
        actionIndex,
        absolute: abs,
        offset,
        percent: validWindow && offset != null ? (offset / duration) * 100 : null
      });
    });
  });

  allActions.sort((a, b) => {
    if (a.absolute == null && b.absolute == null) return a.pkgIndex - b.pkgIndex || a.actionIndex - b.actionIndex;
    if (a.absolute == null) return 1;
    if (b.absolute == null) return -1;
    return a.absolute - b.absolute || a.pkgIndex - b.pkgIndex || a.actionIndex - b.actionIndex;
  });

  const t0 = allActions.find((a) => a.isT0) || null;
  const enriched = allActions.map((a) => ({
    ...a,
    deltaToT0: t0 && a.absolute != null && t0.absolute != null ? a.absolute - t0.absolute : null
  }));

  return { ...win, duration, validWindow, actions: enriched, t0 };
}

function chooseTimelineTickStep(duration) {
  if (!duration) return 30;
  if (duration <= 60) return 10;
  if (duration <= 180) return 15;
  if (duration <= 360) return 30;
  if (duration <= 720) return 60;
  return 120;
}

function renderTimelineView(state) {
  const data = computeTimelineData(state);

  timelineViews.window.textContent = data.validWindow
    ? `Fenêtre : ${formatTime(data.start)} → ${formatTime(data.end)}`
    : "Fenêtre : renseigne un début et une fin valides";

  timelineViews.ref.textContent = data.t0
    ? `Référence : T-0 sur ${formatTime(data.t0.time)} · ${data.t0.pkgName}`
    : "Référence : aucune";

  if (!data.validWindow) {
    timelineViews.canvas.innerHTML = `<div class="timeline-empty">Définis une fenêtre valide dans la partie Timeline pour afficher la frise.</div>`;
    timelineViews.list.innerHTML = `<div class="timeline-empty">Aucune chronologie disponible.</div>`;
    return;
  }

  const leftPad = 180;
  const rightPad = 70;
  const axisY = 110;
  const laneTop = 170;
  const laneGap = 125;
  const eventWidth = 176;
  const eventHeight = 82;

  const innerWidth = Math.max(1200, Math.round(data.duration * (data.zoom / 4)));
  const totalWidth = leftPad + innerWidth + rightPad;
  const totalHeight = Math.max(620, laneTop + Math.max(1, state.packages.length) * laneGap + 120);

  const tickStep = chooseTimelineTickStep(data.duration);
  const startMin = timeToMinutes(data.start);

  const ticks = [];
  for (let minute = 0; minute <= data.duration; minute += tickStep) {
    const left = leftPad + (minute / data.duration) * innerWidth;
    const label = formatTimeNoSuffix(minutesToHhmm(startMin + minute));
    ticks.push(`
      <div class="timeline-tick timeline-tick-missiondeck" style="left:${left}px">
        <div class="timeline-tick-label timeline-tick-label-missiondeck">${esc(label)}</div>
      </div>
    `);
  }

  if (data.duration % tickStep !== 0) {
    const left = leftPad + innerWidth;
    const label = formatTimeNoSuffix(data.end);
    ticks.push(`
      <div class="timeline-tick timeline-tick-missiondeck" style="left:${left}px">
        <div class="timeline-tick-label timeline-tick-label-missiondeck">${esc(label)}</div>
      </div>
    `);
  }

  const laneLabels = state.packages.map((pkg, index) => `
    <div class="timeline-lane-label" style="top:${laneTop + index * laneGap + 24}px;left:12px;width:${leftPad - 28}px;color:${esc(pkg.color || "#57c7ff")}">
      ${esc(pkg.name || "--")}
    </div>
  `).join("");

  const clusters = [];
  const grouped = new Map();

  data.actions.forEach((action) => {
    const key = `${action.pkgId}__${action.time}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(action);
  });

  grouped.forEach((actions, key) => {
    const first = actions[0];
    clusters.push({
      key,
      pkgId: first.pkgId,
      pkgName: first.pkgName,
      pkgColor: first.pkgColor,
      pkgIndex: first.pkgIndex,
      time: first.time,
      absolute: first.absolute,
      percent: first.percent,
      deltaToT0: first.deltaToT0,
      actions: actions.slice().sort((a, b) => a.actionIndex - b.actionIndex)
    });
  });

  clusters.sort((a, b) => (a.absolute ?? 0) - (b.absolute ?? 0) || a.pkgIndex - b.pkgIndex);

  const sameTimeGroups = new Map();
  clusters.forEach((cluster) => {
    const key = cluster.time;
    if (!sameTimeGroups.has(key)) sameTimeGroups.set(key, []);
    sameTimeGroups.get(key).push(cluster);
  });

  const horizontalOffsets = new Map();
  sameTimeGroups.forEach((items) => {
    items.sort((a, b) => a.pkgIndex - b.pkgIndex);
    const center = (items.length - 1) / 2;
    items.forEach((item, i) => {
      horizontalOffsets.set(item.key, (i - center) * 42);
    });
  });

  const placed = [];
  const verticalOffsets = new Map();
  const laneStepY = 22;
  const maxExtraLane = 4;

  clusters.forEach((cluster) => {
    const baseX = leftPad + ((cluster.percent ?? 0) / 100) * innerWidth + (horizontalOffsets.get(cluster.key) || 0);
    const baseY = laneTop + cluster.pkgIndex * laneGap;
    let chosenOffset = 0;

    for (let lane = 0; lane <= maxExtraLane; lane++) {
      const tryY = baseY + lane * laneStepY;
      const collision = placed.some((prev) => {
        const overlapX = Math.abs(baseX - prev.x) < (eventWidth - 10);
        const overlapY = Math.abs(tryY - prev.y) < (eventHeight + 8);
        return overlapX && overlapY;
      });

      if (!collision) {
        chosenOffset = lane * laneStepY;
        placed.push({ x: baseX, y: tryY });
        break;
      }

      if (lane === maxExtraLane) {
        chosenOffset = lane * laneStepY;
        placed.push({ x: baseX, y: tryY });
      }
    }

    verticalOffsets.set(cluster.key, chosenOffset);
  });

  const earliestAtTime = new Map();
  clusters.forEach((cluster) => {
    const existing = earliestAtTime.get(cluster.time);
    if (!existing || cluster.pkgIndex < existing.pkgIndex) earliestAtTime.set(cluster.time, cluster);
  });

  const eventsHtml = clusters.map((cluster) => {
    const left = leftPad + ((cluster.percent ?? 0) / 100) * innerWidth + (horizontalOffsets.get(cluster.key) || 0);
    const top = laneTop + cluster.pkgIndex * laneGap + (verticalOffsets.get(cluster.key) || 0);
    const stemTop = axisY - top;
    const stemHeight = Math.max(44, top - axisY);

    const showTimeLabel = earliestAtTime.get(cluster.time)?.key === cluster.key;
    const deltaLabel = timelineDeltaLabel(cluster.deltaToT0);

    const hasLock = cluster.actions.some((a) => a.locked);
    const textHtml = cluster.actions.length === 1
      ? esc(cluster.actions[0].text || "(sans texte)")
      : cluster.actions.map((a) => `<div style="margin-top:4px;">• ${esc(a.text || "(sans texte)")}</div>`).join("");

    return `
      <div class="timeline-event timeline-event-below" style="left:${left}px;top:${top}px;z-index:${100000 - (cluster.absolute || 0)};--package-color:${esc(cluster.pkgColor || "#57c7ff")}">
        ${showTimeLabel ? `<div class="timeline-event-time timeline-event-time-below" style="top:${stemTop - 54}px;">${esc(formatTime(cluster.time))}</div>` : ""}
        <div class="timeline-event-delta timeline-event-delta-below" style="top:${stemTop - 34}px;">${esc(deltaLabel)}</div>
        <div class="timeline-event-stem timeline-event-stem-below" style="top:${stemTop}px;height:${stemHeight}px;"></div>

        <div class="timeline-event-card">
          <div class="timeline-event-head">
            <span class="package-color-dot" style="width:10px;height:10px;box-shadow:none;"></span>
            <div class="timeline-event-title">${esc(cluster.pkgName || "--")}</div>
            <div class="timeline-event-head-right">
              <span class="timeline-event-time-inline">${esc(formatTime(cluster.time))}</span>
              ${hasLock ? `<span class="timeline-lock-badge">🔒</span>` : ""}
            </div>
          </div>
          <div class="timeline-event-text">${textHtml}</div>
        </div>
      </div>
    `;
  }).join("");

  const t0Line = data.t0 && data.t0.percent != null ? `
    <div class="timeline-t0-line timeline-t0-line-missiondeck" style="left:${leftPad + (data.t0.percent / 100) * innerWidth}px;top:${axisY - 40}px;height:${totalHeight - axisY - 40}px;">
      <div class="timeline-t0-label">T-0</div>
    </div>
  ` : "";

  timelineViews.canvas.style.width = `${totalWidth}px`;
  timelineViews.canvas.style.height = `${totalHeight}px`;
  timelineViews.canvas.innerHTML = `
    <div class="timeline-axis-line timeline-axis-line-missiondeck" style="left:${leftPad}px;right:${rightPad}px;top:${axisY}px;"></div>
    ${ticks.join("")}
    ${t0Line}
    ${laneLabels}
    ${eventsHtml || `<div class="timeline-empty" style="position:absolute;top:${axisY + 60}px;left:${leftPad}px;">Aucune action timeline renseignée.</div>`}
  `;

  if (!data.actions.length) {
    timelineViews.list.innerHTML = `<div class="timeline-empty">Aucune action timeline renseignée.</div>`;
    return;
  }

  const groupedByTime = new Map();
  data.actions.forEach((action) => {
    const key = action.time || "";
    if (!groupedByTime.has(key)) groupedByTime.set(key, []);
    groupedByTime.get(key).push(action);
  });

  timelineViews.list.innerHTML = Array.from(groupedByTime.entries()).map(([time, actions]) => {
    const first = actions[0];
    const itemsHtml = actions.map((a) => `
      <div class="timeline-list-group-entry" style="--package-color:${esc(a.pkgColor)}">
        <div class="timeline-list-package">${esc(a.pkgName)}</div>
        <div class="timeline-list-text">${esc(a.text || "(sans texte)")}</div>
        <div class="timeline-list-entry-badges">
          ${a.isT0 ? `<span class="timeline-t0-badge">T-0</span>` : ""}
          ${a.locked ? `<span class="timeline-lock-badge">🔒</span>` : ""}
        </div>
      </div>
    `).join("");

    return `
      <article class="timeline-list-item">
        <div class="timeline-list-grid timeline-list-grid-grouped">
          <div class="timeline-list-time">${esc(formatTime(time))}</div>
          <div class="timeline-list-delta">${esc(timelineDeltaLabel(first.deltaToT0))}</div>
          <div class="timeline-list-group-stack">
            ${itemsHtml}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderTimelineEditor(packages = []) {
  if (!packages.length) {
    timelineViews.editor.innerHTML = `<div class="timeline-empty">Aucun package disponible. Crée d’abord au moins un package.</div>`;
    return;
  }

  timelineViews.editor.innerHTML = packages.map((pkg, index) => {
    const actions = (pkg.timeline?.actions || []).map(normalizeTimelineAction);

    return `
      <article class="timeline-package-editor" style="--package-color:${esc(pkg.color || "#57c7ff")}">
        <div class="timeline-package-head">
          <div class="timeline-package-title-wrap">
            <span class="package-color-dot"></span>
            <div>
              <h3 class="timeline-package-title">${esc(pkg.name || `Package ${index + 1}`)}</h3>
              <div class="timeline-package-subtitle">${esc(pkg.task || "--")} • ${esc(pkg.aircraft || "--")} • ${esc(pkg.base || "--")}</div>
            </div>
          </div>
          <div>
            <button class="action-btn" type="button" data-add-timeline-action="${pkg.id}">Ajouter action</button>
          </div>
        </div>

        <div class="timeline-actions-stack">
          ${actions.length ? actions.map((action) => `
            <div class="timeline-action-row">
              <input type="text" value="${esc(action.time || "")}" data-timeline-action-field="${pkg.id}:${action.id}:time" inputmode="numeric" maxlength="4" placeholder="HHMM" />
              <input type="text" value="${esc(action.text || "")}" data-timeline-action-field="${pkg.id}:${action.id}:text" placeholder="Décollage / Push / IP / TOT / RTB..." />
              <label class="timeline-check"><input type="checkbox" ${action.isT0 ? "checked" : ""} data-timeline-action-field="${pkg.id}:${action.id}:isT0" /> T-0</label>
              <label class="timeline-check"><input type="checkbox" ${action.locked ? "checked" : ""} data-timeline-action-field="${pkg.id}:${action.id}:locked" /> Lock</label>
              <button class="action-btn remove-btn" type="button" data-remove-timeline-action="${pkg.id}:${action.id}">Retirer</button>
            </div>
          `).join("") : `<div class="timeline-action-empty">Aucune action pour ce package.</div>`}
        </div>
      </article>
    `;
  }).join("");
}

function refreshViewerOnly() {
  const s = getState();
  renderOverview(s);
  renderWeather(s);
  renderPackagesView(s.packages);
  renderAtoView(s.packages);
  renderAcoView(s.packages);
  renderTimelineView(s);
  updatePublicationUi();
  requestAnimationFrame(syncCardHeights);
}

function renderState() {
  ensureTimelineDefaultsFromOverview();
  const s = getState();
  renderOverview(s);
  renderWeather(s);
  renderPackagesView(s.packages);
  renderPackagesEditor(s.packages);
  renderAtoView(s.packages);
  renderAtoEditor(s.packages);
  renderAcoView(s.packages);
  renderAcoEditor(s.packages);
  renderTimelineView(s);
  renderTimelineEditor(s.packages);
  updatePublicationUi();
  requestAnimationFrame(syncCardHeights);
}

function syncCardHeights() {
  const left = document.querySelectorAll(".workspace > .layout-stack:first-child > .card");
  const right = document.querySelectorAll(".editor-panel > .card");
  [...left, ...right].forEach((c) => c.style.minHeight = "");
  if (currentMode !== "edit") return;

  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const h = Math.max(left[i].offsetHeight, right[i].offsetHeight);
    left[i].style.minHeight = right[i].style.minHeight = `${h}px`;
  }
}

function setMode(mode) {
  const edit = mode === "edit";
  currentMode = edit ? "edit" : "briefing";
  appShell.classList.toggle("mode-edit", edit);
  appShell.classList.toggle("mode-briefing", !edit);
  modeSwitch.classList.toggle("active", edit);
  modeSwitch.setAttribute("aria-pressed", String(edit));
  modeValue.textContent = edit ? "Edition" : "Briefing";
  requestAnimationFrame(syncCardHeights);
}

function preserveScroll(cb) {
  const active = document.activeElement;
  const s1 = typeof active?.selectionStart === "number" ? active.selectionStart : null;
  const s2 = typeof active?.selectionEnd === "number" ? active.selectionEnd : null;
  const x = window.scrollX;
  const y = window.scrollY;

  cb();

  requestAnimationFrame(() => {
    window.scrollTo(x, y);
    if (active && document.body.contains(active)) {
      active.focus({ preventScroll: true });
      if (s1 != null && s2 != null && typeof active.setSelectionRange === "function") {
        try { active.setSelectionRange(s1, s2); } catch {}
      }
    }
  });
}

function flash(btn, txt, cls = "") {
  const orig = btn.dataset.originalLabel || btn.textContent;
  btn.dataset.originalLabel = orig;
  btn.textContent = txt;
  btn.classList.remove("success", "error");
  if (cls) btn.classList.add(cls);

  setTimeout(() => {
    btn.textContent = orig;
    btn.classList.remove("success", "error");
  }, 1400);
}

async function copyToClipboard(text, btn, ok) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    flash(btn, ok, "success");
  } catch {
    flash(btn, "Echec copie", "error");
  }
}

/* publication / short id */

function randomShortToken() {
  let out = "";
  for (let i = 0; i < SHORT_TOKEN_LENGTH; i++) {
    out += SHORT_TOKEN_ALPHABET[Math.floor(Math.random() * SHORT_TOKEN_ALPHABET.length)];
  }
  return out;
}

async function briefFileExists(briefId) {
  const cleanId = sanitizeShortToken(briefId);
  if (!cleanId || cleanId.length !== SHORT_TOKEN_LENGTH) return false;

  try {
    const res = await fetch(`${BRIEFS_DIR}${cleanId}.json?ts=${Date.now()}`, {
      method: "GET",
      cache: "no-store"
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function generateUniqueBriefId() {
  for (let i = 0; i < 200; i++) {
    const candidate = randomShortToken();
    const exists = await briefFileExists(candidate);
    if (!exists && candidate !== currentBriefId) {
      return candidate;
    }
  }

  throw new Error("Impossible de générer un Brief ID unique");
}

function getBriefIdFromUrl() {
  const raw = new URL(window.location.href).searchParams.get("b") || "";
  const clean = sanitizeShortToken(raw);
  return clean.length === SHORT_TOKEN_LENGTH ? clean : "";
}

function buildShareUrl(briefId) {
  const url = new URL("./index.html", window.location.href);

  if (briefId) url.searchParams.set("b", briefId);
  else url.searchParams.delete("b");

  return url.toString();
}

function syncUrlWithBriefId(briefId) {
  const url = new URL("./index.html", window.location.href);

  if (briefId) url.searchParams.set("b", briefId);
  else url.searchParams.delete("b");

  history.replaceState(null, "", url.toString());
}

async function resolveLongTokenFromBriefId(briefId) {
  const cleanId = sanitizeShortToken(briefId);
  if (!cleanId || cleanId.length !== SHORT_TOKEN_LENGTH) {
    throw new Error("Brief ID invalide");
  }

  const res = await fetch(`${BRIEFS_DIR}${cleanId}.json?ts=${Date.now()}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Brief introuvable (${res.status})`);
  }

  const data = await res.json();
  const token = String(data?.token || "").trim();

  if (!token) {
    throw new Error("Token absent dans le fichier brief");
  }

  return token;
}

async function createNewBrief() {
  const newId = await generateUniqueBriefId();
  currentBriefId = newId;
  applyState(getEmptyState());
  syncUrlWithBriefId(currentBriefId);
  setMode("edit");
}

/* token long */

function toBase64Url(bytes) {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(v) {
  const base64 = String(v || "").trim()
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(String(v || "").trim().length / 4) * 4, "=");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

function encodeToken(data) {
  try {
    return toBase64Url(new TextEncoder().encode(JSON.stringify({
      o: data.opName || "",
      m: data.map || "",
      dg: data.dateGame || "",
      di: data.dateIrl || "",
      s: data.start || "",
      t: data.tot || "",
      e: data.end || "",
      st: data.status || "Draft",
      tp: data.temp === "" ? "" : data.temp,
      q: data.qnh === "" ? "" : data.qnh,
      wd: data.windDir === "" ? "" : data.windDir,
      ws: data.windSpeed === "" ? "" : data.windSpeed,
      wg: data.windGust === "" ? "" : data.windGust,
      ts: data.timelineStart || "",
      te: data.timelineEnd || "",
      tz: data.timelineZoom || 100,
      l: (data.layers || []).map((x) => ({ t: x.type || "", b: x.base === "" ? "" : x.base, p: x.top === "" ? "" : x.top })),
      pk: (data.packages || []).map((p) => ({
        i: p.id || "",
        n: p.name || "",
        tk: p.task || "",
        a: p.aircraft || "",
        b: p.base || "",
        d: p.destination || "",
        f: p.intra || "",
        ld: p.leader || "",
        pl: Array.isArray(p.players) ? p.players : [],
        c: p.color || "",
        cp: p.collapsed ? 1 : 0,
        ato: {
          lo: p.ato?.loaded ? 1 : 0,
          cl: p.ato?.collapsed ? 1 : 0,
          cs: p.ato?.callsign || "",
          sp: p.ato?.supportedPackage || "",
          to: p.ato?.takeoff || "",
          pu: p.ato?.push || "",
          tt: p.ato?.tot || "",
          os: p.ato?.station || "",
          rb: p.ato?.rtb || "",
          ne: p.ato?.net || "",
          nl: p.ato?.nlt || "",
          co: p.ato?.commSupport || "",
          rm: p.ato?.remarks || "",
          tg: p.ato?.target || "",
          de: p.ato?.desiredEffect || "",
          ah: p.ato?.attackHeading || "",
          wp: p.ato?.weaponPlan || "",
          ab: p.ato?.abortCriteria || ""
        },
        aco: {
          lo: p.aco?.loaded ? 1 : 0,
          cl: p.aco?.collapsed ? 1 : 0,
          fl: p.aco?.floor === "" ? "" : p.aco?.floor,
          ce: p.aco?.ceiling === "" ? "" : p.aco?.ceiling,
          la: p.aco?.label || "",
          no: p.aco?.notes || ""
        },
        tl: {
          ac: (p.timeline?.actions || []).map((a) => ({
            i: a.id || "",
            tm: a.time || "",
            tx: a.text || "",
            t0: a.isT0 ? 1 : 0,
            lk: a.locked ? 1 : 0
          }))
        }
      }))
    })));
  } catch {
    return "";
  }
}

function decodeToken(token) {
  try {
    if (!token) return null;
    const d = JSON.parse(new TextDecoder().decode(fromBase64Url(token)));
    return {
      opName: d.o || "",
      map: d.m || "",
      dateGame: d.dg || "",
      dateIrl: d.di || "",
      start: sanitizeTime(d.s),
      tot: sanitizeTime(d.t),
      end: sanitizeTime(d.e),
      status: d.st || "Draft",
      temp: d.tp ?? "",
      qnh: d.q ?? "",
      windDir: d.wd ?? "",
      windSpeed: d.ws ?? "",
      windGust: d.wg ?? "",
      timelineStart: sanitizeTime(d.ts),
      timelineEnd: sanitizeTime(d.te),
      timelineZoom: sanitizeTimelineZoom(d.tz ?? 100),
      layers: Array.isArray(d.l) ? d.l.slice(0, 3).map((x) => ({ type: x.t || "", base: x.b ?? "", top: x.p ?? "" })) : [{}, {}, {}],
      packages: Array.isArray(d.pk) ? d.pk.map((p) => ({
        id: p.i || "",
        name: p.n || "",
        task: p.tk || "",
        aircraft: p.a || "",
        base: p.b || "",
        destination: p.d || "",
        intra: p.f || "",
        leader: p.ld || "",
        players: Array.isArray(p.pl) ? p.pl : [],
        color: p.c || "",
        collapsed: !!p.cp,
        ato: {
          loaded: !!p.ato?.lo,
          collapsed: !!p.ato?.cl,
          callsign: p.ato?.cs || "",
          supportedPackage: p.ato?.sp || "",
          takeoff: sanitizeTime(p.ato?.to),
          push: sanitizeTime(p.ato?.pu),
          tot: sanitizeTime(p.ato?.tt),
          station: sanitizeTime(p.ato?.os),
          rtb: sanitizeTime(p.ato?.rb),
          net: sanitizeTime(p.ato?.ne),
          nlt: sanitizeTime(p.ato?.nl),
          commSupport: p.ato?.co || "",
          remarks: p.ato?.rm || "",
          target: p.ato?.tg || "",
          desiredEffect: p.ato?.de || "",
          attackHeading: p.ato?.ah || "",
          weaponPlan: p.ato?.wp || "",
          abortCriteria: p.ato?.ab || ""
        },
        aco: {
          loaded: !!p.aco?.lo,
          collapsed: !!p.aco?.cl,
          floor: p.aco?.fl ?? "",
          ceiling: p.aco?.ce ?? "",
          label: p.aco?.la || "",
          notes: p.aco?.no || ""
        },
        timeline: {
          actions: Array.isArray(p.tl?.ac) ? p.tl.ac.map((a) => ({
            id: a.i || uid(),
            time: sanitizeTime(a.tm),
            text: a.tx || "",
            isT0: !!a.t0,
            locked: !!a.lk
          })) : []
        }
      })) : []
    };
  } catch {
    return null;
  }
}

function updatePublicationUi() {
  const longToken = encodeToken(getState());
  shortTokenPreview.textContent = currentBriefId || "--";
  longTokenPreview.textContent = longToken || "--";
  briefFilePreview.textContent = currentBriefId ? `${currentBriefId}.json` : "--.json";
}

async function pasteTokenFromClipboard() {
  try {
    const raw = String(await navigator.clipboard.readText() || "").trim();
    if (!raw) return flash(pasteTokenBtn, "Presse-papiers vide", "error");

    const decoded = decodeToken(raw);
    if (!decoded) return flash(pasteTokenBtn, "Token invalide", "error");

    if (!currentBriefId) {
      currentBriefId = await generateUniqueBriefId();
      syncUrlWithBriefId(currentBriefId);
    }

    applyState(decoded);
    setMode("edit");
    flash(pasteTokenBtn, "Brief chargé", "success");
  } catch {
    flash(pasteTokenBtn, "Accès refusé", "error");
  }
}

function downloadTextFile(filename, content, mime = "application/json;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function publishCurrentBrief() {
  const token = encodeToken(getState());
  if (!currentBriefId || currentBriefId.length !== SHORT_TOKEN_LENGTH) {
    flash(publishBriefBtn, "Brief ID invalide", "error");
    return;
  }
  if (!token) {
    flash(publishBriefBtn, "Token vide", "error");
    return;
  }

  const payload = JSON.stringify({ token }, null, 2);
  downloadTextFile(`${currentBriefId}.json`, payload);
  flash(publishBriefBtn, "Fichier généré", "success");
}

function bindCoreFields() {
  Object.entries(fields).forEach(([key, f]) => {
    f.input.addEventListener("input", () => {
      if (["start", "tot", "end", "timelineStart", "timelineEnd"].includes(key)) {
        f.input.value = sanitizeTime(f.input.value);
      }

      if (key === "timelineZoom") {
        f.input.value = sanitizeTimelineZoom(f.input.value);
      }

      if (key === "windDir" && f.input.value !== "") {
        f.input.value = clamp(+f.input.value, 0, 360);
      }

      if ((key === "start" || key === "end") &&
          !validTimelineTime(fields.timelineStart.input.value) &&
          !validTimelineTime(fields.timelineEnd.input.value)) {
        ensureTimelineDefaultsFromOverview();
      }

      renderState();
    });

    f.input.addEventListener("change", renderState);
    f.input.addEventListener("blur", renderState);
  });
}

function findPkgById(id) {
  return packageState.find((p) => p.id === id);
}

function delegatedToggle(container, attr, path) {
  container.addEventListener("click", (e) => {
    const head = e.target.closest(`[${attr}]`);
    if (!head || e.target.closest("input,textarea,select,button")) return;
    const value = head.getAttribute(attr);

    if (path === "package") {
      const i = +value;
      if (!packageState[i]) return;
      packageState[i].collapsed = !packageState[i].collapsed;
    } else {
      const pkg = findPkgById(value);
      if (!pkg) return;
      if (!pkg[path]) pkg[path] = path === "ato" ? createDefaultAto() : createDefaultAco();
      pkg[path].collapsed = !pkg[path].collapsed;
    }

    renderState();
  });

  container.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const head = e.target.closest(`[${attr}]`);
    if (!head) return;
    e.preventDefault();
    head.click();
  });
}

function bindEditors() {
  delegatedToggle(packagesEditor, "data-toggle-package", "package");
  delegatedToggle(atoView, "data-toggle-ato-view", "ato");
  delegatedToggle(atoEditor, "data-toggle-ato-editor", "ato");
  delegatedToggle(acoViews.cards, "data-toggle-aco-view", "aco");
  delegatedToggle(acoEditor, "data-toggle-aco-editor", "aco");

  packagesEditor.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.dataset.openColor != null) {
      packagesEditor.querySelector(`[data-color-input="${btn.dataset.openColor}"]`)?.click();
      return;
    }

    if (btn.dataset.randomColor != null) {
      const i = +btn.dataset.randomColor;
      if (!packageState[i]) return;
      packageState[i].color = randColor();
      return preserveScroll(renderState);
    }

    if (btn.dataset.addPlayer != null) {
      const i = +btn.dataset.addPlayer;
      if (!packageState[i]) return;
      packageState[i].players ||= [];
      packageState[i].players.push("");
      return preserveScroll(renderState);
    }

    if (btn.dataset.removePlayer) {
      const [i, pi] = btn.dataset.removePlayer.split(":").map(Number);
      if (!packageState[i]) return;
      packageState[i].players.splice(pi, 1);
      return preserveScroll(renderState);
    }

    if (btn.dataset.removePackage != null) {
      packageState.splice(+btn.dataset.removePackage, 1);
      return preserveScroll(renderState);
    }
  });

  packagesEditor.addEventListener("input", (e) => {
    const t = e.target;

    if (t.dataset.packageField) {
      const [i, field] = t.dataset.packageField.split(":");
      if (!packageState[+i]) return;
      let val = t.value;
      if (field === "task") val = t.value = val.toUpperCase();
      if (field === "base") val = t.value = sanitizeICAO(val);
      packageState[+i][field] = val;
      return field === "task" ? preserveScroll(renderState) : refreshViewerOnly();
    }

    if (t.dataset.playerInput) {
      const [i, pi] = t.dataset.playerInput.split(":").map(Number);
      if (!packageState[i]) return;
      packageState[i].players[pi] = t.value;
      return refreshViewerOnly();
    }

    if (t.dataset.colorInput != null) {
      const i = +t.dataset.colorInput;
      if (!packageState[i]) return;
      packageState[i].color = t.value || "#57c7ff";
      return preserveScroll(renderState);
    }
  });

  packagesEditor.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.packageField || t.dataset.playerInput || t.dataset.colorInput != null) preserveScroll(renderState);
  });

  packagesEditor.addEventListener("blur", (e) => {
    const t = e.target;
    if (t.dataset.packageField || t.dataset.playerInput || t.dataset.colorInput != null) preserveScroll(renderState);
  }, true);

  atoEditor.addEventListener("input", (e) => {
    const t = e.target;
    if (!t.dataset.atoField) return;
    const pkg = findPkgById(t.dataset.packageId);
    if (!pkg) return;

    pkg.ato ||= createDefaultAto();
    let val = t.value;
    if (["takeoff", "push", "tot", "station", "rtb", "net", "nlt"].includes(t.dataset.atoField)) val = t.value = sanitizeTime(val);
    pkg.ato[t.dataset.atoField] = val;
    refreshViewerOnly();
  });

  atoEditor.addEventListener("change", (e) => e.target.dataset.atoField && preserveScroll(renderState));
  atoEditor.addEventListener("blur", (e) => e.target.dataset.atoField && preserveScroll(renderState), true);

  acoEditor.addEventListener("input", (e) => {
    const t = e.target;
    if (!t.dataset.acoField) return;
    const [id, field] = t.dataset.acoField.split(":");
    const pkg = findPkgById(id);
    if (!pkg) return;

    pkg.aco ||= createDefaultAco();
    let val = ["floor", "ceiling"].includes(field) ? nOrEmpty(t.value) : t.value;
    if (["floor", "ceiling"].includes(field)) t.value = val === "" ? "" : val;
    pkg.aco[field] = val;

    const fl = +pkg.aco.floor;
    const ce = +pkg.aco.ceiling;
    if (pkg.aco.floor !== "" && pkg.aco.ceiling !== "" && Number.isFinite(fl) && Number.isFinite(ce) && ce < fl) {
      if (field === "floor") pkg.aco.ceiling = fl;
      else pkg.aco.floor = ce;
    }

    refreshViewerOnly();
  });

  acoEditor.addEventListener("change", (e) => e.target.dataset.acoField && preserveScroll(renderState));
  acoEditor.addEventListener("blur", (e) => e.target.dataset.acoField && preserveScroll(renderState), true);

  timelineViews.editor.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.dataset.addTimelineAction) {
      const pkg = findPkgById(btn.dataset.addTimelineAction);
      if (!pkg) return;
      pkg.timeline ||= { actions: [] };
      pkg.timeline.actions.push(createDefaultTimelineAction());
      return preserveScroll(renderState);
    }

    if (btn.dataset.removeTimelineAction) {
      const [pkgId, actionId] = btn.dataset.removeTimelineAction.split(":");
      const pkg = findPkgById(pkgId);
      if (!pkg?.timeline?.actions) return;
      pkg.timeline.actions = pkg.timeline.actions.filter((a) => a.id !== actionId);
      return preserveScroll(renderState);
    }
  });

  timelineViews.editor.addEventListener("input", (e) => {
    const t = e.target;
    if (!t.dataset.timelineActionField) return;

    const [pkgId, actionId, field] = t.dataset.timelineActionField.split(":");
    const pkg = findPkgById(pkgId);
    const action = pkg?.timeline?.actions?.find((a) => a.id === actionId);
    if (!action) return;

    if (field === "time") {
      action.time = t.value = sanitizeTime(t.value);
      return refreshViewerOnly();
    }

    if (field === "text") {
      action.text = t.value;
      return refreshViewerOnly();
    }
  });

  timelineViews.editor.addEventListener("change", (e) => {
    const t = e.target;
    if (!t.dataset.timelineActionField) return;

    const [pkgId, actionId, field] = t.dataset.timelineActionField.split(":");
    const pkg = findPkgById(pkgId);
    const action = pkg?.timeline?.actions?.find((a) => a.id === actionId);
    if (!action) return;

    if (field === "isT0") {
      packageState.forEach((p) => {
        (p.timeline?.actions || []).forEach((a) => { a.isT0 = false; });
      });
      action.isT0 = !!t.checked;
      ensureSingleT0();
      return preserveScroll(renderState);
    }

    if (field === "locked") {
      action.locked = !!t.checked;
      return preserveScroll(renderState);
    }

    preserveScroll(renderState);
  });
}

async function copyCurrentUrl() {
  if (!currentBriefId) {
    flash(copyUrlBtn, "Aucun Brief ID", "error");
    return;
  }
  await copyToClipboard(buildShareUrl(currentBriefId), copyUrlBtn, "URL copiée");
}

async function copyCurrentLongToken() {
  const token = encodeToken(getState());
  if (!token) {
    flash(copyTokenBtn, "Token vide", "error");
    return;
  }
  await copyToClipboard(token, copyTokenBtn, "Token copié");
}

modeSwitch.addEventListener("click", () => setMode(currentMode === "briefing" ? "edit" : "briefing"));

newBriefBtn?.addEventListener("click", async () => {
  try {
    await createNewBrief();
    flash(newBriefBtn, "Nouveau brief", "success");
  } catch {
    flash(newBriefBtn, "Création impossible", "error");
  }
});

copyUrlBtn.addEventListener("click", copyCurrentUrl);
copyTokenBtn.addEventListener("click", copyCurrentLongToken);
pasteTokenBtn.addEventListener("click", pasteTokenFromClipboard);
publishBriefBtn?.addEventListener("click", publishCurrentBrief);

addPackageBtn?.addEventListener("click", () => {
  packageState.push(createDefaultPackage());
  preserveScroll(renderState);
});

loadAtoBtn?.addEventListener("click", () => {
  packageState = packageState.map((p) => {
    p = normalizePackage(p);
    p.ato = { ...normalizeAto(p.ato), loaded: true, callsign: p.ato.callsign || p.name || "" };
    return p;
  });
  preserveScroll(renderState);
  flash(loadAtoBtn, "ATO chargé", "success");
});

loadAcoBtn?.addEventListener("click", () => {
  packageState = packageState.map((p) => {
    p = normalizePackage(p);
    p.aco = { ...normalizeAco(p.aco), loaded: true, label: p.aco.label || p.name || "" };
    return p;
  });
  preserveScroll(renderState);
  flash(loadAcoBtn, "ACO chargé", "success");
});

window.addEventListener("resize", syncCardHeights);

bindCoreFields();
bindEditors();

async function boot() {
  const briefIdFromUrl = getBriefIdFromUrl();

  if (briefIdFromUrl) {
    currentBriefId = briefIdFromUrl;

    try {
      const longToken = await resolveLongTokenFromBriefId(briefIdFromUrl);
      const decoded = decodeToken(longToken);

      if (!decoded) {
        throw new Error("Token long invalide");
      }

      applyState(decoded);
      syncUrlWithBriefId(currentBriefId);
      setMode("briefing");
      return;
    } catch (err) {
      console.error("Erreur chargement brief publié :", err);
      applyState(getEmptyState());
      syncUrlWithBriefId(currentBriefId);
      setMode("edit");
      return;
    }
  }

  try {
    await createNewBrief();
    setMode("briefing");
  } catch (err) {
    console.error("Erreur createNewBrief :", err);
    currentBriefId = randomShortToken();
    applyState(getEmptyState());
    syncUrlWithBriefId(currentBriefId);
    setMode("briefing");
  }
}

boot();
