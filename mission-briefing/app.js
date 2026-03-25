const appShell = document.getElementById("appShell");
const modeSwitch = document.getElementById("modeSwitch");
const modeValue = document.getElementById("modeValue");

const newMissionBtn = document.getElementById("newMissionBtn");
const copyUrlBtn = document.getElementById("copyUrlBtn");
const copyMissionIdBtn = document.getElementById("copyMissionIdBtn");
const copyMissionIdBtnBottom = document.getElementById("copyMissionIdBtnBottom");
const pasteMissionIdBtn = document.getElementById("pasteMissionIdBtn");
const copyTokenBtn = document.getElementById("copyTokenBtn");
const pasteTokenBtnBottom = document.getElementById("pasteTokenBtnBottom");
const publishMissionBtn = document.getElementById("publishMissionBtn");
const loadMizBtn = document.getElementById("loadMizBtn");
const exportKneeboardBtn = document.getElementById("exportKneeboardBtn");
const topbarActionsBtn = document.getElementById("topbarActionsBtn");
const topbarActionsDropdown = document.getElementById("topbarActionsDropdown");
const topbarActionItems = Array.from(document.querySelectorAll("[data-topbar-action]"));

const mizImportModal = document.getElementById("mizImportModal");
const mizImportBackdrop = document.getElementById("mizImportBackdrop");
const mizImportCloseBtn = document.getElementById("mizImportCloseBtn");
const mizFileInput = document.getElementById("mizFileInput");
const mizDropzone = document.getElementById("mizDropzone");
const mizFileMeta = document.getElementById("mizFileMeta");
const mizMissionTextInput = document.getElementById("mizMissionTextInput");
const mizImportStatus = document.getElementById("mizImportStatus");
const mizValidateFileBtn = document.getElementById("mizValidateFileBtn");
const mizCoalitionRedBtn = document.getElementById("mizCoalitionRedBtn");
const mizCoalitionBlueBtn = document.getElementById("mizCoalitionBlueBtn");
const mizBackToFileBtn = document.getElementById("mizBackToFileBtn");
const mizBackToCoalitionBtn = document.getElementById("mizBackToCoalitionBtn");
const mizGroupHeading = document.getElementById("mizGroupHeading");
const mizGroupList = document.getElementById("mizGroupList");
const mizSelectAllGroupsBtn = document.getElementById("mizSelectAllGroupsBtn");
const mizClearGroupsBtn = document.getElementById("mizClearGroupsBtn");
const mizImportGroupsBtn = document.getElementById("mizImportGroupsBtn");
const kneeboardExportModal = document.getElementById("kneeboardExportModal");
const kneeboardExportBackdrop = document.getElementById("kneeboardExportBackdrop");
const kneeboardExportCloseBtn = document.getElementById("kneeboardExportCloseBtn");
const kneeboardPackageSelect = document.getElementById("kneeboardPackageSelect");
const kneeboardCoordsFormatSelect = document.getElementById("kneeboardCoordsFormatSelect");
const kneeboardPackageMeta = document.getElementById("kneeboardPackageMeta");
const kneeboardExportCancelBtn = document.getElementById("kneeboardExportCancelBtn");
const kneeboardExportConfirmBtn = document.getElementById("kneeboardExportConfirmBtn");

const missionIdDisplay = document.getElementById("missionIdDisplay");
const tokenOutput = document.getElementById("tokenOutput");

const packageGrid = document.getElementById("packageGrid");
const addPackageBtn = document.getElementById("addPackageBtn");
const packageCardTemplate = document.getElementById("packageCardTemplate");
const airfieldGrid = document.getElementById("airfieldGrid");
const addAirfieldBtn = document.getElementById("addAirfieldBtn");
const airfieldEmptyState = document.getElementById("airfieldEmptyState");
const atoGrid = document.getElementById("atoGrid");
const atoEmptyState = document.getElementById("atoEmptyState");
const updateAtoBtn = document.getElementById("updateAtoBtn");
const acoGrid = document.getElementById("acoGrid");
const acoEmptyState = document.getElementById("acoEmptyState");
const updateAcoBtn = document.getElementById("updateAcoBtn");
const acoOverviewBands = document.getElementById("acoOverviewBands");
const timelineEmptyState = document.getElementById("timelineEmptyState");
const updateTimelineBtn = document.getElementById("updateTimelineBtn");
const timelineVisual = document.getElementById("timelineVisual");
const timelineChrono = document.getElementById("timelineChrono");
const timelineEditor = document.getElementById("timelineEditor");
const timelineSummary = document.getElementById("timelineSummary");

const STORAGE_PREFIX = "warroom_mission_";
const URL_PARAM_NAME = "mission";
const WEATHER_MAX_ALTITUDE = 45000;
const ACO_MAX_ALTITUDE = 40000;
const KNEEBOARD_EXPORT_WIDTH = 1536;
const KNEEBOARD_EXPORT_HEIGHT = 2048;
const TIMELINE_DEFAULT_EVENT_LABELS = [
  { key: "startTime", label: "STEP", noteField: "" },
  { key: "launchTime", label: "TAKEOFF", noteField: "launchDetails" }
];

const PACKAGE_RANDOM_COLORS = [
  "#58c7ff",
  "#7df0b7",
  "#ffd36a",
  "#ff8f6b",
  "#d88cff",
  "#80e5ff",
  "#f06f9b",
  "#9bff8a",
  "#ffe066",
  "#7cb8ff"
];

const PACKAGE_TASK_OPTIONS = [
  "CAP","BARCAP","DCA","OCA","TARCAP","HAVCAP","RESCAP","MIGCAP","SWEEP",
  "CAS","SCAR","AI","BAI","DEEP","STRIKE","PRECISION STRIKE","PGSTRIKE","DEAD","SEAD",
  "XCAS","FAC(A)","JTAC-COORD","RECCE","BDA","SAR","CSAR","PR","SOF INFIL/EXFIL","SARD",
  "SHOW OF FORCE","AAR","TANKER","AT","AIRLIFT","STRATEGIC AIRLIFT","TACTICAL AIRLIFT",
  "CASEVAC","MEDEVAC","RE-SUPPLY","CARGO DROP","CDS","ESCORT","FTR-ESCORT","STRIKE-ESCORT",
  "SOF-ESCORT","AAR-ESCORT","AWACS"
];

const PACKAGE_NAME_OPTIONS = [
  "AMBER",
  "AQUA",
  "AZURE",
  "BRONZE",
  "COBALT",
  "CORAL",
  "CRIMSON",
  "EMERALD",
  "FUCHSIA",
  "GOLD",
  "INDIGO",
  "IVORY",
  "JADE",
  "KHAKI",
  "LILAC",
  "MAGENTA",
  "MAROON",
  "NAVY",
  "OLIVE",
  "ONYX",
  "PEARL",
  "PLUM",
  "RUBY",
  "SALMON",
  "SABLE",
  "SAPPHIRE",
  "SCARLET",
  "SILVER",
  "TURQUOISE"
];

const ATO_ROUTE_DEFAULTS = [
  { wp: "WP1", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" },
  { wp: "WP2", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" },
  { wp: "IP", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" },
  { wp: "TGT", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" },
  { wp: "EP", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" },
  { wp: "WP6", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" }
];

const ATO_COMM_DEFAULTS = [
  { name: "DEPART", description: "Departure", freq: "" },
  { name: "ARRIVAL", description: "Arrival", freq: "" },
  { name: "DIVERT", description: "Divert", freq: "" }
];

const ATO_COMM_PRIMARY_ORDER = ["DEPART", "ARRIVAL", "DIVERT"];
const ATO_SUPPORT_PRIMARY_ORDER = ["C2", "AWACS", "TANKER", "ESCORT", "SEAD", "PACKAGE"];

const defaultMissionData = {
  operationName: "",
  mapName: "",
  dateInGame: "",
  dateIRL: "",
  startTime: "",
  totTime: "",
  endTime: "",
  status: "DRAFT",
  weatherArea: "ICAO CODE",
  weatherValidTime: "",
  weather: {
    temperatureC: "",
    qnhInHg: "",
    qnhHpa: "",
    windDirection: "",
    windSpeed: "",
    windGust: "",
    fogEnabled: "NO",
    fogBase: "",
    fogTop: "",
    layers: [
      { cover: "", base: "", top: "" },
      { cover: "", base: "", top: "" },
      { cover: "", base: "", top: "" }
    ]
  },
  airfields: [],
  packages: [],
  atos: [],
  acos: [],
  timelinePackages: []
};

const fieldDefinitions = {
  operationName: {
    viewSelector: '[data-field="operationName"]',
    input: document.getElementById("operationNameInput"),
    fallback: "--"
  },
  mapName: {
    viewSelector: '[data-field="mapName"]',
    input: document.getElementById("mapNameInput"),
    fallback: "--"
  },
  dateInGame: {
    viewSelector: '[data-field="dateInGame"]',
    input: document.getElementById("dateInGameInput"),
    fallback: "--/--/----",
    formatter: formatDate
  },
  dateIRL: {
    viewSelector: '[data-field="dateIRL"]',
    input: document.getElementById("dateIRLInput"),
    fallback: "--/--/----",
    formatter: formatDate
  },
  startTime: {
    viewSelector: '[data-field="startTime"]',
    input: document.getElementById("startTimeInput"),
    fallback: "--:--L",
    formatter: formatTimeLocal
  },
  totTime: {
    viewSelector: '[data-field="totTime"]',
    input: document.getElementById("totTimeInput"),
    fallback: "--:--L",
    formatter: formatTimeLocal
  },
  endTime: {
    viewSelector: '[data-field="endTime"]',
    input: document.getElementById("endTimeInput"),
    fallback: "--:--L",
    formatter: formatTimeLocal
  },
  status: {
    viewSelector: '[data-field="status"]',
    input: document.getElementById("statusInput"),
    fallback: "DRAFT"
  },
  weatherArea: {
    viewSelector: '[data-field="weatherArea"]',
    input: document.getElementById("weatherAreaInput"),
    fallback: "ICAO CODE"
  },
  weatherValidTime: {
    viewSelector: '[data-field="weatherValidTime"]',
    input: document.getElementById("weatherValidTimeInput"),
    fallback: "VALID --:--Z",
    formatter: formatWeatherValidTime
  }
};

Object.values(fieldDefinitions).forEach((config) => {
  config.viewElement = document.querySelector(config.viewSelector);
});

const weatherInputs = {
  temperatureC: document.getElementById("weatherTempInput"),
  qnhInHg: document.getElementById("weatherQnhInhgInput"),
  windDirection: document.getElementById("weatherWindDirInput"),
  windSpeed: document.getElementById("weatherWindSpeedInput"),
  windGust: document.getElementById("weatherWindGustInput"),
  fogEnabled: document.getElementById("weatherFogEnabledInput"),
  fogBase: document.getElementById("weatherFogBaseInput"),
  fogTop: document.getElementById("weatherFogTopInput"),
  layers: [
    {
      cover: document.getElementById("weatherLayer1CoverInput"),
      base: document.getElementById("weatherLayer1BaseInput"),
      top: document.getElementById("weatherLayer1TopInput")
    },
    {
      cover: document.getElementById("weatherLayer2CoverInput"),
      base: document.getElementById("weatherLayer2BaseInput"),
      top: document.getElementById("weatherLayer2TopInput")
    },
    {
      cover: document.getElementById("weatherLayer3CoverInput"),
      base: document.getElementById("weatherLayer3BaseInput"),
      top: document.getElementById("weatherLayer3TopInput")
    }
  ]
};

const weatherView = {
  tempDisplay: document.getElementById("weatherTempDisplay"),
  qnhInhgDisplay: document.getElementById("weatherQnhInhgDisplay"),
  qnhHpaDisplay: document.getElementById("weatherQnhHpaDisplay"),

  windArrow: document.getElementById("weatherWindArrow"),
  windMain: document.getElementById("weatherWindMain"),
  windGust: document.getElementById("weatherWindGust"),
  windOrigin: document.getElementById("weatherWindOrigin"),

  fogVisual: document.getElementById("weatherFogVisual"),
  fogSummary: document.getElementById("weatherFogSummary"),
  fogDescDisplay: document.getElementById("weatherFogDescDisplay"),

  layers: [
    {
      visual: document.getElementById("weatherLayer1Visual"),
      summary: document.getElementById("weatherLayer1Summary")
    },
    {
      visual: document.getElementById("weatherLayer2Visual"),
      summary: document.getElementById("weatherLayer2Summary")
    },
    {
      visual: document.getElementById("weatherLayer3Visual"),
      summary: document.getElementById("weatherLayer3Summary")
    }
  ]
};

let currentMissionId = "";
let currentMissionData = deepClone(defaultMissionData);
const mizImportState = {
  step: 1,
  file: null,
  pastedMissionText: "",
  parsedMission: null,
  selectedCoalition: "",
  selectedGroupIds: new Set(),
  loading: false
};

/* =========================================================
   HELPERS GENERIQUES
========================================================= */

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function setText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toIntOrFallback(value, fallback = 0) {
  const num = Number.parseInt(String(value), 10);
  return Number.isFinite(num) ? num : fallback;
}

function toFloatOrFallback(value, fallback = 0) {
  const normalized = String(value).replace(",", ".");
  const num = Number.parseFloat(normalized);
  return Number.isFinite(num) ? num : fallback;
}

function sanitizeDigits(value, maxLength = 10) {
  return String(value || "").replace(/\D/g, "").slice(0, maxLength);
}

function sanitizeTimeInput(value) {
  return sanitizeDigits(value, 4);
}

function sanitizeDecimalInput(value, maxLength = 5) {
  return String(value || "")
    .replace(",", ".")
    .replace(/[^0-9.]/g, "")
    .replace(/^(\d*\.\d*).*$/, "$1")
    .slice(0, maxLength);
}

function sanitizeUpperText(value, maxLength = 80) {
  return String(value || "").replace(/\s+/g, " ").trim().toUpperCase().slice(0, maxLength);
}

function sanitizeUpperTextLive(value, maxLength = 80) {
  return String(value || "").replace(/\s+/g, " ").toUpperCase().slice(0, maxLength);
}

function sanitizeFreeText(value, maxLength = 120) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeMultilineText(value, maxLength = 400) {
  return String(value || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .slice(0, maxLength);
}

function formatDate(value) {
  if (!value) return "--/--/----";

  const parts = value.split("-");
  if (parts.length !== 3) return "--/--/----";

  const [year, month, day] = parts;
  if (!year || !month || !day) return "--/--/----";

  return `${day}/${month}/${year}`;
}

function formatTimeLocal(value) {
  const digits = sanitizeTimeInput(value);

  if (digits.length < 4) return "--:--L";

  const hh = digits.slice(0, 2);
  const mm = digits.slice(2, 4);

  return `${hh}:${mm}L`;
}

function formatWeatherValidTime(value) {
  const digits = sanitizeTimeInput(value);

  if (digits.length < 4) return "VALID --:--L";

  const hh = digits.slice(0, 2);
  const mm = digits.slice(2, 4);

  return `VALID ${hh}:${mm}L`;
}

function normalizeMissionStatus(value = "") {
  return String(value || "").trim().toUpperCase() === "PLANNED" ? "PLANNED" : "DRAFT";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function timeDigitsToMinutes(value) {
  const digits = sanitizeTimeInput(value);
  if (digits.length < 4) return null;

  const hours = Number.parseInt(digits.slice(0, 2), 10);
  const minutes = Number.parseInt(digits.slice(2, 4), 10);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours > 23 || minutes > 59) return null;

  return (hours * 60) + minutes;
}

function minutesToTimeDigits(totalMinutes) {
  if (!Number.isFinite(totalMinutes)) return "";

  const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hours = String(Math.floor(normalized / 60)).padStart(2, "0");
  const minutes = String(normalized % 60).padStart(2, "0");
  return `${hours}${minutes}`;
}

function formatTimelineTime(value) {
  return formatTimeLocal(value);
}

function formatDistanceNm(value) {
  const text = sanitizeFreeText(value, 20);
  if (!text) return "--";
  return /\bnm\b/i.test(text) ? text : `${text} nm`;
}

function formatFlightDuration(value) {
  const digits = sanitizeTimeInput(value);
  if (digits.length < 4) return "--:--";
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
}

function formatTimelineOffset(value, referenceValue) {
  const minutes = timeDigitsToMinutes(value);
  const referenceMinutes = timeDigitsToMinutes(referenceValue);

  if (minutes === null || referenceMinutes === null) return "T ---";

  const delta = minutes - referenceMinutes;
  if (delta === 0) return "T";

  const sign = delta < 0 ? "-" : "+";
  const absolute = Math.abs(delta);
  const hours = Math.floor(absolute / 60);
  const mins = absolute % 60;

  if (hours > 0) {
    return `T${sign}${hours}h${String(mins).padStart(2, "0")}`;
  }

  return `T${sign}${mins}m`;
}

function formatFeet(value) {
  const num = Number.parseInt(value, 10);
  if (!Number.isFinite(num)) return "--";
  return num.toLocaleString("fr-FR").replace(/\u202f/g, " ");
}

function percentFromAltitude(altitudeFeet) {
  const safeAlt = clamp(altitudeFeet, 0, WEATHER_MAX_ALTITUDE);
  return (safeAlt / WEATHER_MAX_ALTITUDE) * 100;
}

function generateUid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function getRandomPackageColor() {
  return PACKAGE_RANDOM_COLORS[Math.floor(Math.random() * PACKAGE_RANDOM_COLORS.length)];
}

function normalizeTaskValue(value) {
  const normalized = sanitizeUpperText(value || "", 40);
  return PACKAGE_TASK_OPTIONS.includes(normalized) ? normalized : "";
}

function normalizePackageNameValue(value) {
  const normalized = sanitizeUpperText(value || "", 24);
  return PACKAGE_NAME_OPTIONS.includes(normalized) ? normalized : "";
}

function setContentEditableTextPreserveCaret(element, transformFn) {
  if (!element) return;

  const selection = window.getSelection();
  const isFocused = document.activeElement === element;
  const rawText = element.textContent || "";
  const transformed = transformFn(rawText);

  if (rawText === transformed) return;

  let caretOffset = rawText.length;

  if (selection && isFocused && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(element);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preRange.toString().length;
  }

  element.textContent = transformed;

  if (selection && isFocused) {
    const safeOffset = Math.min(caretOffset, transformed.length);
    const newRange = document.createRange();
    const textNode = element.firstChild || element;
    newRange.setStart(textNode, textNode.nodeType === Node.TEXT_NODE ? safeOffset : 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
}

/* =========================================================
   CONVERSIONS QNH
========================================================= */

function hpaToInHg(hpa) {
  const value = Number(hpa);
  if (!Number.isFinite(value) || value <= 0) return "";
  return (value * 0.029529983071445).toFixed(2);
}

function inHgToHpa(inHg) {
  const value = Number(inHg);
  if (!Number.isFinite(value) || value <= 0) return "";
  return String(Math.round(value / 0.029529983071445));
}

function normalizeQnhPair(qnhInHgValue, qnhHpaValue) {
  let qnhInHg = sanitizeDecimalInput(qnhInHgValue || "", 5);
  let qnhHpa = sanitizeDigits(qnhHpaValue || "", 4);

  if (qnhInHg) {
    qnhHpa = inHgToHpa(toFloatOrFallback(qnhInHg, 0));
  } else if (qnhHpa) {
    qnhInHg = hpaToInHg(toIntOrFallback(qnhHpa, 0));
  }

  return { qnhInHg, qnhHpa };
}

/* =========================================================
   IMPORT MIZ
========================================================= */

function resetMizImportState() {
  mizImportState.step = 1;
  mizImportState.file = null;
  mizImportState.pastedMissionText = "";
  mizImportState.parsedMission = null;
  mizImportState.selectedCoalition = "";
  mizImportState.selectedGroupIds = new Set();
  mizImportState.loading = false;
}

function setMizImportStatus(message) {
  if (mizImportStatus) {
    mizImportStatus.textContent = message;
  }
}

function updateMizFileMeta() {
  if (!mizFileMeta) return;

  if (!mizImportState.file) {
    mizFileMeta.textContent = "Import texte uniquement";
    return;
  }

  const sizeMb = (mizImportState.file.size / (1024 * 1024)).toFixed(2);
  mizFileMeta.textContent = `${mizImportState.file.name}\n${sizeMb} MB`;
}

function getMizMissionTextValue() {
  return String(mizMissionTextInput?.value || "").trim();
}

function syncMizTextState() {
  mizImportState.pastedMissionText = getMizMissionTextValue();
}

function updateMizStepUi() {
  const step = mizImportState.step;

  document.querySelectorAll("[data-miz-step-pill]").forEach((node) => {
    node.classList.toggle("is-active", String(step) === node.dataset.mizStepPill);
  });

  document.querySelectorAll("[data-miz-step-panel]").forEach((node) => {
    node.classList.toggle("is-active", String(step) === node.dataset.mizStepPanel);
  });
}

function openMizImportModal() {
  if (!mizImportModal) return;

  resetMizImportState();
  if (mizMissionTextInput) {
    mizMissionTextInput.value = "";
  }
  updateMizFileMeta();
  updateMizStepUi();
  renderMizCoalitionCounts();
  renderMizGroupList();
  setMizImportStatus("En attente du texte `mission = { ... }`.");
  mizImportModal.classList.add("is-open");
  mizImportModal.setAttribute("aria-hidden", "false");
}

function closeMizImportModal() {
  if (!mizImportModal) return;

  mizImportModal.classList.remove("is-open");
  mizImportModal.setAttribute("aria-hidden", "true");
  if (mizFileInput) {
    mizFileInput.value = "";
  }
  if (mizMissionTextInput) {
    mizMissionTextInput.value = "";
  }
  resetMizImportState();
}

function goToMizStep(step) {
  mizImportState.step = clamp(Number(step) || 1, 1, 3);
  updateMizStepUi();

  if (mizImportState.step === 2) {
    renderMizCoalitionCounts();
  }

  if (mizImportState.step === 3) {
    renderMizGroupList();
  }
}

function ensureMizLibrariesAvailable() {
  if (!window.luaparse) {
    throw new Error("La bibliotheque d'import LuaParse n'est pas disponible.");
  }
}

async function readFileAsText(file) {
  return file.text();
}

function getLuaAssignmentValue(ast, identifierName) {
  if (!ast?.body) return null;

  for (const statement of ast.body) {
    if (!statement) continue;

    if (statement.type === "AssignmentStatement") {
      const index = statement.variables.findIndex(
        (variable) => variable?.type === "Identifier" && variable.name === identifierName
      );

      if (index >= 0) {
        return statement.init?.[index] || null;
      }
    }

    if (statement.type === "LocalStatement") {
      const index = statement.variables.findIndex(
        (variable) => variable?.type === "Identifier" && variable.name === identifierName
      );

      if (index >= 0) {
        return statement.init?.[index] || null;
      }
    }
  }

  return null;
}

function getLuaKeyValue(node) {
  if (!node) return "";

  if (node.type === "Identifier") return node.name;
  if (node.type === "StringLiteral") return node.value || "";
  if (node.type === "NumericLiteral") return String(node.value);
  if (node.type === "BooleanLiteral") return node.value ? "true" : "false";

  return String(evaluateLuaNode(node));
}

function evaluateLuaNode(node) {
  if (!node) return null;

  switch (node.type) {
    case "StringLiteral":
      return node.value || "";

    case "NumericLiteral":
      return Number(node.value);

    case "BooleanLiteral":
      return Boolean(node.value);

    case "NilLiteral":
      return null;

    case "UnaryExpression": {
      const argument = evaluateLuaNode(node.argument);
      if (node.operator === "-") {
        return -Number(argument || 0);
      }
      return argument;
    }

    case "BinaryExpression": {
      const left = Number(evaluateLuaNode(node.left) || 0);
      const right = Number(evaluateLuaNode(node.right) || 0);

      switch (node.operator) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          return right === 0 ? 0 : left / right;
        default:
          return null;
      }
    }

    case "TableConstructorExpression": {
      const output = {};
      let implicitIndex = 1;

      (node.fields || []).forEach((field) => {
        if (!field) return;

        if (field.type === "TableKeyString") {
          output[field.key?.name || ""] = evaluateLuaNode(field.value);
          return;
        }

        if (field.type === "TableKey") {
          output[getLuaKeyValue(field.key)] = evaluateLuaNode(field.value);
          return;
        }

        if (field.type === "TableValue") {
          output[String(implicitIndex)] = evaluateLuaNode(field.value);
          implicitIndex += 1;
        }
      });

      return output;
    }

    default:
      return null;
  }
}

function tableValues(value) {
  if (!value || typeof value !== "object") return [];

  return Object.keys(value)
    .sort((left, right) => {
      const leftNum = Number(left);
      const rightNum = Number(right);
      const leftIsNum = Number.isFinite(leftNum);
      const rightIsNum = Number.isFinite(rightNum);

      if (leftIsNum && rightIsNum) return leftNum - rightNum;
      if (leftIsNum) return -1;
      if (rightIsNum) return 1;
      return left.localeCompare(right);
    })
    .map((key) => value[key])
    .filter((entry) => entry !== undefined && entry !== null);
}

function getNested(source, path, fallback = null) {
  const value = path.reduce((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[key];
  }, source);

  return value === undefined ? fallback : value;
}

function metersToFeet(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  return String(Math.round(numeric * 3.28084));
}

function metersPerSecondToKnots(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  return String(Math.round(numeric * 1.94384));
}

function radiansToDegrees(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  if (Math.abs(numeric) > (Math.PI * 2) + 0.01) {
    return Math.round(((numeric % 360) + 360) % 360);
  }
  return Math.round((((numeric * 180) / Math.PI) % 360 + 360) % 360);
}

function secondsToTimeDigits(totalSeconds) {
  const numeric = Number(totalSeconds);
  if (!Number.isFinite(numeric)) return "";

  const normalizedSeconds = ((Math.round(numeric) % 86400) + 86400) % 86400;
  const hours = Math.floor(normalizedSeconds / 3600);
  const minutes = Math.floor((normalizedSeconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}`;
}

function mmHgToInHg(mmHg) {
  const numeric = Number(mmHg);
  if (!Number.isFinite(numeric) || numeric <= 0) return "";
  return (numeric / 25.4).toFixed(2);
}

function mmHgToHpa(mmHg) {
  const numeric = Number(mmHg);
  if (!Number.isFinite(numeric) || numeric <= 0) return "";
  return String(Math.round(numeric * 1.33322));
}

function inferCloudCoverFromDensity(density) {
  const numeric = Number(density);
  if (!Number.isFinite(numeric) || numeric <= 0) return "";
  if (numeric <= 2) return "FEW";
  if (numeric <= 5) return "SCT";
  if (numeric <= 8) return "BKN";
  return "OVC";
}

function formatMissionDate(dateTable) {
  const year = sanitizeDigits(String(dateTable?.Year || dateTable?.year || ""), 4);
  const month = sanitizeDigits(String(dateTable?.Month || dateTable?.month || ""), 2).padStart(2, "0");
  const day = sanitizeDigits(String(dateTable?.Day || dateTable?.day || ""), 2).padStart(2, "0");

  if (!year || month === "00" || day === "00") return "";
  return `${year}-${month}-${day}`;
}

function formatMissionFrequency(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return "";

  if (numeric >= 1000000) {
    return (numeric / 1000000).toFixed(3);
  }

  if (numeric >= 1000) {
    return (numeric / 1000).toFixed(3);
  }

  return numeric.toFixed(3);
}

function prettifyLoadoutToken(rawValue) {
  return String(rawValue || "")
    .replace(/[{}]/g, "")
    .replace(/^weapons\./i, "")
    .replace(/^pylon_/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function extractUnitPayloadSummary(unit) {
  const pylons = tableValues(getNested(unit, ["payload", "pylons"], {}));
  const counts = new Map();

  pylons.forEach((pylon) => {
    const token = prettifyLoadoutToken(pylon?.CLSID || pylon?.clsid || "");
    if (!token) return;
    counts.set(token, (counts.get(token) || 0) + 1);
  });

  const summary = Array.from(counts.entries())
    .map(([name, count]) => `${count}x ${name}`)
    .join(", ");

  const payload = getNested(unit, ["payload"], {});
  const noteParts = [
    payload?.fuel ? `Fuel ${payload.fuel}` : "",
    payload?.chaff ? `Chaff ${payload.chaff}` : "",
    payload?.flare ? `Flare ${payload.flare}` : "",
    payload?.gun ? `Gun ${payload.gun}` : ""
  ].filter(Boolean);

  return {
    summary: sanitizeFreeText(summary, 120),
    note: sanitizeFreeText(noteParts.join(" · "), 120)
  };
}

function extractWaypointTaskIds(point) {
  const tasks = tableValues(getNested(point, ["task", "params", "tasks"], {}));
  return tasks
    .map((task) => sanitizeUpperText(task?.id || "", 40))
    .filter(Boolean);
}

function buildRouteRows(pointsTable) {
  const points = tableValues(pointsTable);

  return points.map((point, index) => {
    const name = sanitizeUpperText(point?.NAME || point?.name || "", 24);
    const action = sanitizeUpperText(point?.action || "", 24);
    const eta = Number(point?.ETA);
    const taskIds = extractWaypointTaskIds(point);
    const descriptorParts = [action].filter(Boolean);

    return {
      wp: sanitizeUpperText(name || `WP${index + 1}`, 24),
      desc: sanitizeFreeText(descriptorParts.join(" · ") || `Waypoint ${index + 1}`, 120),
      coords: "",
      alt: metersToFeet(point?.alt) ? `${metersToFeet(point?.alt)} FT` : "",
      spd: metersPerSecondToKnots(point?.speed) ? `${metersPerSecondToKnots(point?.speed)} KT` : "",
      etaSeconds: Number.isFinite(eta) ? eta : null,
      name,
      action,
      taskIds
    };
  });
}

function pickTargetWaypoint(routeRows) {
  if (!Array.isArray(routeRows) || routeRows.length === 0) return null;

  const priorityMatch = routeRows.find((row) => {
    const haystack = `${row.name} ${row.action} ${(row.taskIds || []).join(" ")}`;
    return /(TGT|TARGET|STRIKE|BOMB|ATTACK|SEAD|DEAD|IP|CAS)/i.test(haystack);
  });

  if (priorityMatch) return priorityMatch;
  if (routeRows.length >= 3) return routeRows[Math.min(2, routeRows.length - 1)];
  return routeRows[routeRows.length - 1] || null;
}

function inferDepartureLabel(group, routeRows) {
  const firstPoint = routeRows[0] || null;
  const airdromeId = getNested(group, ["route", "points", "1", "airdromeId"], "");
  const helipadId = getNested(group, ["route", "points", "1", "helipadId"], "");

  return sanitizeUpperText(
    firstPoint?.name || (airdromeId ? `AB ${airdromeId}` : "") || (helipadId ? `FARP ${helipadId}` : "") || "DEP",
    24
  );
}

function inferDestinationLabel(group, routeRows) {
  const points = tableValues(getNested(group, ["route", "points"], {}));
  const lastPoint = routeRows[routeRows.length - 1] || null;
  const lastRawPoint = points[points.length - 1] || {};
  const airdromeId = lastRawPoint?.airdromeId || "";
  const helipadId = lastRawPoint?.helipadId || "";

  return sanitizeUpperText(
    lastPoint?.name || (airdromeId ? `AB ${airdromeId}` : "") || (helipadId ? `FARP ${helipadId}` : "") || "RTB",
    24
  );
}

function mapImportedTask(taskValue) {
  const normalized = sanitizeUpperText(taskValue || "", 40);
  if (!normalized) return "";
  if (PACKAGE_TASK_OPTIONS.includes(normalized)) return normalized;

  const aliasMap = new Map([
    ["GROUND ATTACK", "STRIKE"],
    ["PINPOINT STRIKE", "PRECISION STRIKE"],
    ["AFAC", "FAC(A)"],
    ["ANTISHIP STRIKE", "STRIKE"],
    ["TRANSPORT", "AIRLIFT"],
    ["REFUELING", "TANKER"]
  ]);

  return aliasMap.get(normalized) || "";
}

function isLikelyAirUnit(unit) {
  if (!unit || typeof unit !== "object") return false;

  const type = sanitizeUpperText(unit?.type || unit?.unitType || "", 40);
  if (!type) return false;

  return !/(SHIP|TANK|TRUCK|APC|IFV|SAM|AAA|INFANTRY|SOLDIER|STATIC|FORTIFICATION)/i.test(type);
}

function isLikelyAirGroup(group) {
  if (!group || typeof group !== "object") return false;

  const units = tableValues(group?.units);
  if (!units.length) return false;

  return units.some(isLikelyAirUnit);
}

function collectAirGroupsDeep(source, categoryHint = "", visited = new Set(), results = []) {
  if (!source || typeof source !== "object" || visited.has(source)) {
    return results;
  }

  visited.add(source);

  if (source.group && typeof source.group === "object") {
    const nextHint = sanitizeUpperText(source.name || source.category || categoryHint || "", 24).toLowerCase();

    tableValues(source.group).forEach((group) => {
      if (isLikelyAirGroup(group)) {
        results.push({
          category: nextHint === "helicopter" ? "helicopter" : "plane",
          group
        });
      }
    });
  }

  Object.entries(source).forEach(([key, value]) => {
    if (!value || typeof value !== "object") return;
    const nextHint = ["plane", "helicopter"].includes(String(key).toLowerCase()) ? String(key).toLowerCase() : categoryHint;
    collectAirGroupsDeep(value, nextHint, visited, results);
  });

  return results;
}

function collectExplicitCountryAirGroups(country) {
  const results = [];

  ["plane", "helicopter"].forEach((category) => {
    const groups = tableValues(getNested(country, [category, "group"], {}));
    groups.forEach((group) => {
      if (!group || typeof group !== "object") return;

      const units = tableValues(group?.units);
      if (!units.length) return;

      // On truste le chemin DCS explicite: si le groupe est dans plane/helicopter,
      // on le garde sauf si les unites sont manifestement non aeriennes.
      const hasAirLikeUnit = units.some((unit) => isLikelyAirUnit(unit));
      if (!hasAirLikeUnit && category === "plane") return;

      results.push({ category, group });
    });
  });

  return results;
}

function buildImportedGroupsForCoalition(mission, coalitionName) {
  const coalition = getNested(mission, ["coalition", coalitionName], {});
  const countries = tableValues(coalition?.country);
  const groups = [];
  const seenGroupNames = new Set();

  countries.forEach((country, countryIndex) => {
    const airGroups = [
      ...collectExplicitCountryAirGroups(country),
      ...collectAirGroupsDeep(country)
    ];

    airGroups.forEach(({ category, group }, groupIndex) => {
      const units = tableValues(group?.units);
      if (!units.length) return;

      const leaderUnit = units[0];
      const canonicalName = sanitizeUpperText(group?.name || leaderUnit?.name || `GROUP_${groupIndex + 1}`, 80);
      if (seenGroupNames.has(canonicalName)) return;
      seenGroupNames.add(canonicalName);

      const route = buildRouteRows(getNested(group, ["route", "points"], {}));
      const payload = extractUnitPayloadSummary(leaderUnit);
      const task = mapImportedTask(group?.task || "");
      const frequency = formatMissionFrequency(group?.frequency || leaderUnit?.frequency || "");
      const targetWaypoint = pickTargetWaypoint(route);

      groups.push({
        id: sanitizeUpperText(
          `${coalitionName}_${countryIndex + 1}_${category}_${groupIndex + 1}_${group?.name || leaderUnit?.name || "GROUP"}`,
          80
        ),
        coalition: coalitionName,
        category,
        rawName: sanitizeFreeText(group?.name || leaderUnit?.name || "Group", 80),
        task,
        aircraftType: sanitizeUpperText(leaderUnit?.type || leaderUnit?.unitType || "", 24),
        aircraftCount: String(units.length),
        leader: sanitizeFreeText(leaderUnit?.name || "", 40),
        wingmen: sanitizeMultilineText(
          units
            .slice(1)
            .map((unit, index) => `${index + 2}. ${sanitizeFreeText(unit?.name || "", 40)}`)
            .filter(Boolean)
            .join("\n"),
          400
        ),
        departure: inferDepartureLabel(group, route),
        destination: inferDestinationLabel(group, route),
        groupStartSeconds: Number.isFinite(Number(group?.start_time)) ? Number(group.start_time) : null,
        intra: sanitizeFreeText(frequency, 20),
        route,
        loadout: payload.summary,
        loadoutNote: payload.note,
        targetName: sanitizeUpperText(targetWaypoint?.name || "", 48),
        targetDetails: sanitizeFreeText(targetWaypoint?.desc || "", 120),
        launchTime: "",
        totTime: "",
        recoveryTime: ""
      });
    });
  });

  return groups;
}

function getImportedGroupBaseName(rawName) {
  const normalized = sanitizeFreeText(String(rawName || "").trim(), 80);
  if (!normalized) return "";
  return normalized.replace(/-\d+$/i, "").trim();
}

function getImportedGroupSequence(rawName) {
  const match = String(rawName || "").trim().match(/-(\d+)$/);
  return match ? Number(match[1]) : null;
}

function consolidateImportedGroups(groups) {
  const sourceGroups = Array.isArray(groups) ? groups : [];
  const buckets = new Map();

  sourceGroups.forEach((group, index) => {
    const rawName = sanitizeFreeText(group?.rawName || "", 80);
    const baseName = getImportedGroupBaseName(rawName) || rawName || `GROUP ${index + 1}`;
    const bucketKey = sanitizeUpperText(baseName, 80);
    const sequence = getImportedGroupSequence(rawName);

    if (!buckets.has(bucketKey)) {
      buckets.set(bucketKey, []);
    }

    buckets.get(bucketKey).push({
      index,
      sequence,
      baseName,
      group
    });
  });

  return Array.from(buckets.values())
    .sort((left, right) => left[0].index - right[0].index)
    .map((bucket) => {
      if (bucket.length === 1) {
        return bucket[0].group;
      }

      const representative = bucket.find((entry) => entry.sequence === 1)
        || [...bucket].sort((left, right) => {
          const leftRank = Number.isFinite(left.sequence) ? left.sequence : Number.MAX_SAFE_INTEGER;
          const rightRank = Number.isFinite(right.sequence) ? right.sequence : Number.MAX_SAFE_INTEGER;
          return leftRank - rightRank || left.index - right.index;
        })[0];

      const totalAircraftCount = bucket.reduce((sum, entry) => {
        const count = Number.parseInt(entry.group?.aircraftCount || "0", 10);
        return sum + (Number.isFinite(count) ? count : 0);
      }, 0);

      const representativeWingmen = String(representative.group?.wingmen || "")
        .split(/\r?\n/)
        .map((line) => line.replace(/^\s*\d+\.\s*/, "").trim())
        .filter(Boolean);

      const groupedWingmen = bucket
        .filter((entry) => entry !== representative)
        .sort((left, right) => left.index - right.index)
        .map((entry) => sanitizeFreeText(entry.group?.leader || "", 40))
        .filter(Boolean);

      const mergedWingmen = [...representativeWingmen, ...groupedWingmen]
        .map((name, index) => `${index + 2}. ${name}`)
        .join("\n");

      return {
        ...representative.group,
        id: sanitizeUpperText(`${representative.group.id}_${representative.baseName}`, 80),
        rawName: representative.baseName,
        aircraftCount: String(Math.max(totalAircraftCount, 1)),
        wingmen: sanitizeMultilineText(mergedWingmen, 400)
      };
    });
}

function findMatchingBrace(sourceText, openingBraceIndex) {
  if (openingBraceIndex < 0 || sourceText[openingBraceIndex] !== "{") return -1;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = openingBraceIndex; index < sourceText.length; index += 1) {
    const char = sourceText[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === "\"") {
        inString = false;
      }

      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function extractLuaBlockAfterMarker(sourceText, marker, startIndex = 0) {
  const markerIndex = sourceText.indexOf(marker, startIndex);
  if (markerIndex < 0) return null;

  const braceIndex = sourceText.indexOf("{", markerIndex);
  if (braceIndex < 0) return null;

  const endIndex = findMatchingBrace(sourceText, braceIndex);
  if (endIndex < 0) return null;

  return {
    markerIndex,
    braceIndex,
    endIndex,
    text: sourceText.slice(braceIndex, endIndex + 1)
  };
}

function extractTopLevelLuaTableEntries(tableText) {
  const entries = [];
  if (!tableText || tableText[0] !== "{") return entries;

  let index = 1;

  while (index < tableText.length - 1) {
    const keyMatch = tableText.slice(index).match(/^\s*\[(\d+)\]\s*=\s*/);
    if (!keyMatch) {
      index += 1;
      continue;
    }

    const entryStart = index + keyMatch[0].length;
    if (tableText[entryStart] !== "{") {
      index = entryStart;
      continue;
    }

    const entryEnd = findMatchingBrace(tableText, entryStart);
    if (entryEnd < 0) break;

    entries.push({
      key: keyMatch[1],
      text: tableText.slice(entryStart, entryEnd + 1)
    });

    index = entryEnd + 1;
  }

  return entries;
}

function extractLuaStringField(blockText, fieldName) {
  const match = blockText.match(new RegExp(`\\["${fieldName}"\\]\\s*=\\s*"([^"]*)"`, "i"));
  return match ? match[1] : "";
}

function extractLuaNumberField(blockText, fieldName) {
  const match = blockText.match(new RegExp(`\\["${fieldName}"\\]\\s*=\\s*(-?\\d+(?:\\.\\d+)?)`, "i"));
  return match ? Number(match[1]) : null;
}

function getLuaTopLevelFieldValueStart(blockText, fieldName) {
  const text = String(blockText || "");
  const fieldKey = `["${fieldName}"]`;
  const startBrace = text.indexOf("{");
  if (startBrace < 0) return -1;

  let depth = 0;
  let inString = false;

  for (let index = startBrace; index < text.length; index += 1) {
    const char = text[index];
    const previous = text[index - 1];

    if (inString) {
      if (char === "\"" && previous !== "\\") {
        inString = false;
      }
      continue;
    }

    if (char === "-" && text[index + 1] === "-") {
      while (index < text.length && text[index] !== "\n") {
        index += 1;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth <= 0) break;
      continue;
    }

    if (depth !== 1) continue;
    if (!text.startsWith(fieldKey, index)) continue;

    let cursor = index + fieldKey.length;
    while (/\s/.test(text[cursor] || "")) cursor += 1;
    if (text[cursor] !== "=") continue;
    cursor += 1;
    while (/\s/.test(text[cursor] || "")) cursor += 1;
    return cursor;
  }

  return -1;
}

function extractLuaTopLevelStringField(blockText, fieldName) {
  const valueStart = getLuaTopLevelFieldValueStart(blockText, fieldName);
  if (valueStart < 0 || blockText[valueStart] !== "\"") return "";

  let value = "";
  for (let index = valueStart + 1; index < blockText.length; index += 1) {
    const char = blockText[index];
    const previous = blockText[index - 1];
    if (char === "\"" && previous !== "\\") {
      return value;
    }
    value += char;
  }

  return "";
}

function extractLuaTopLevelNumberField(blockText, fieldName) {
  const valueStart = getLuaTopLevelFieldValueStart(blockText, fieldName);
  if (valueStart < 0) return null;

  const match = String(blockText || "").slice(valueStart).match(/^-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function extractLuaWaypointTaskIds(pointText) {
  const taskBlock = extractLuaBlockAfterMarker(pointText, '["task"]');
  const paramsBlock = extractLuaBlockAfterMarker(taskBlock?.text || "", '["params"]');
  const tasksBlock = extractLuaBlockAfterMarker(paramsBlock?.text || "", '["tasks"]');
  const taskEntries = extractTopLevelLuaTableEntries(tasksBlock?.text || "");

  return taskEntries
    .map((entry) => sanitizeUpperText(extractLuaTopLevelStringField(entry.text, "id"), 40))
    .filter(Boolean);
}

function buildRouteRowsFromLuaText(groupText) {
  const routeBlock = extractLuaBlockAfterMarker(groupText, '["route"]');
  const pointsBlock = extractLuaBlockAfterMarker(routeBlock?.text || "", '["points"]');
  const pointEntries = extractTopLevelLuaTableEntries(pointsBlock?.text || "");

  return pointEntries.map((entry, index) => {
    const pointText = entry.text;
    const name = sanitizeUpperText(
      extractLuaTopLevelStringField(pointText, "NAME") || extractLuaTopLevelStringField(pointText, "name"),
      24
    );
    const action = sanitizeUpperText(extractLuaTopLevelStringField(pointText, "action"), 24);
    const eta = extractLuaTopLevelNumberField(pointText, "ETA");
    const altitudeMeters = extractLuaTopLevelNumberField(pointText, "alt");
    const speedMetersPerSecond = extractLuaTopLevelNumberField(pointText, "speed");
    const taskIds = extractLuaWaypointTaskIds(pointText);
    const descriptorParts = [action].filter(Boolean);

    return {
      wp: sanitizeUpperText(name || `WP${index + 1}`, 24),
      desc: sanitizeFreeText(descriptorParts.join(" · ") || `Waypoint ${index + 1}`, 120),
      coords: "",
      alt: metersToFeet(altitudeMeters) ? `${metersToFeet(altitudeMeters)} FT` : "",
      spd: metersPerSecondToKnots(speedMetersPerSecond) ? `${metersPerSecondToKnots(speedMetersPerSecond)} KT` : "",
      etaSeconds: Number.isFinite(eta) ? eta : null,
      name,
      action,
      taskIds
    };
  });
}

function buildImportedGroupFromLuaText(groupText, coalitionName, category, countryIndex, groupIndex) {
  const unitsBlock = extractLuaBlockAfterMarker(groupText, '["units"]');
  const unitEntries = extractTopLevelLuaTableEntries(unitsBlock?.text || "");
  if (!unitEntries.length) return null;

  const leaderUnitText = unitEntries[0].text;
  const leaderType = extractLuaTopLevelStringField(leaderUnitText, "type");
  const leaderName = extractLuaTopLevelStringField(leaderUnitText, "name");
  const groupName = extractLuaTopLevelStringField(groupText, "name");
  const groupTask = extractLuaTopLevelStringField(groupText, "task");
  const groupFrequency = extractLuaTopLevelNumberField(groupText, "frequency");
  const groupStartSeconds = extractLuaTopLevelNumberField(groupText, "start_time");
  const route = buildRouteRowsFromLuaText(groupText);
  const targetWaypoint = pickTargetWaypoint(route);
  if (!leaderType) return null;

  return {
    id: sanitizeUpperText(`${coalitionName}_${countryIndex}_${category}_${groupIndex}_${groupName || leaderName || "GROUP"}`, 80),
    coalition: coalitionName,
    category,
    rawName: sanitizeFreeText(groupName || leaderName || `Group ${groupIndex}`, 80),
    task: mapImportedTask(groupTask),
    aircraftType: sanitizeUpperText(leaderType, 24),
    aircraftCount: String(unitEntries.length),
    leader: sanitizeFreeText(leaderName, 40),
    wingmen: sanitizeMultilineText(
      unitEntries
        .slice(1)
        .map((entry, index) => `${index + 2}. ${sanitizeFreeText(extractLuaTopLevelStringField(entry.text, "name"), 40)}`)
        .filter(Boolean)
        .join("\n"),
      400
    ),
    departure: inferDepartureLabel({}, route),
    destination: inferDestinationLabel({ route: { points: {} } }, route),
    groupStartSeconds: Number.isFinite(groupStartSeconds) ? groupStartSeconds : null,
    intra: sanitizeFreeText(formatMissionFrequency(groupFrequency), 20),
    route,
    loadout: "",
    loadoutNote: "",
    targetName: sanitizeUpperText(targetWaypoint?.name || "", 48),
    targetDetails: sanitizeFreeText(targetWaypoint?.desc || "", 120),
    launchTime: "",
    totTime: "",
    recoveryTime: ""
  };
}

function extractImportedGroupsFromMissionText(rawText, coalitionName) {
  const text = String(rawText || "");
  const missionCoalitionBlock = extractLuaBlockAfterMarker(text, '["coalition"]');
  if (!missionCoalitionBlock) return [];

  const coalitionBlock = extractLuaBlockAfterMarker(missionCoalitionBlock.text, `["${coalitionName}"]`);
  if (!coalitionBlock) return [];

  const countryBlock = extractLuaBlockAfterMarker(coalitionBlock.text, '["country"]');
  if (!countryBlock) return [];

  const countryEntries = extractTopLevelLuaTableEntries(countryBlock.text);
  const groups = [];
  const seenNames = new Set();

  countryEntries.forEach((countryEntry, countryIndex) => {
    ["plane", "helicopter"].forEach((category) => {
      const categoryBlock = extractLuaBlockAfterMarker(countryEntry.text, `["${category}"]`);
      if (!categoryBlock) return;

      const groupsBlock = extractLuaBlockAfterMarker(categoryBlock.text, '["group"]');
      if (!groupsBlock) return;

      extractTopLevelLuaTableEntries(groupsBlock.text).forEach((groupEntry, groupIndex) => {
        const parsedGroup = buildImportedGroupFromLuaText(
          groupEntry.text,
          coalitionName,
          category,
          countryIndex + 1,
          groupIndex + 1
        );

        if (!parsedGroup) return;

        const dedupeKey = sanitizeUpperText(parsedGroup.rawName || parsedGroup.leader || parsedGroup.id, 80);
        if (seenNames.has(dedupeKey)) return;
        seenNames.add(dedupeKey);
        groups.push(parsedGroup);
      });
    });
  });

  return groups;
}

function extractMissionTextMetadata(rawText) {
  const text = String(rawText || "");
  const theatre = extractLuaTopLevelStringField(text, "theatre");
  const startTime = extractLuaTopLevelNumberField(text, "start_time");
  const dateBlock = extractLuaBlockAfterMarker(text, '["date"]');
  const year = extractLuaTopLevelNumberField(dateBlock?.text || "", "Year");
  const month = extractLuaTopLevelNumberField(dateBlock?.text || "", "Month");
  const day = extractLuaTopLevelNumberField(dateBlock?.text || "", "Day");

  return {
    theatre: sanitizeUpperText(theatre, 24),
    startTime: Number.isFinite(startTime) ? startTime : null,
    dateInGame: year && month && day
      ? `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      : ""
  };
}

function extractImportedWeatherFromMissionText(rawText, missionFallback = {}) {
  const weatherBlock = extractLuaBlockAfterMarker(rawText, '["weather"]');
  const fallbackWeather = getNested(missionFallback, ["weather"], {});
  if (!weatherBlock && !fallbackWeather) {
    return extractImportedWeather(missionFallback);
  }

  const seasonBlock = extractLuaBlockAfterMarker(weatherBlock?.text || "", '["season"]');
  const windBlock = extractLuaBlockAfterMarker(weatherBlock?.text || "", '["wind"]');
  const groundWindBlock = extractLuaBlockAfterMarker(windBlock?.text || "", '["atGround"]');
  const cloudsBlock = extractLuaBlockAfterMarker(weatherBlock?.text || "", '["clouds"]');
  const fogBlock = extractLuaBlockAfterMarker(weatherBlock?.text || "", '["fog"]');

  const mergedMission = {
    weather: {
      ...fallbackWeather,
      qnh: extractLuaTopLevelNumberField(weatherBlock?.text || "", "qnh") ?? fallbackWeather?.qnh,
      season: {
        ...(fallbackWeather?.season || {}),
        temperature: extractLuaTopLevelNumberField(seasonBlock?.text || "", "temperature") ?? getNested(fallbackWeather, ["season", "temperature"], "")
      },
      wind: {
        ...(fallbackWeather?.wind || {}),
        atGround: {
          ...(getNested(fallbackWeather, ["wind", "atGround"], {}) || {}),
          dir: extractLuaTopLevelNumberField(groundWindBlock?.text || "", "dir") ?? getNested(fallbackWeather, ["wind", "atGround", "dir"], ""),
          speed: extractLuaTopLevelNumberField(groundWindBlock?.text || "", "speed") ?? getNested(fallbackWeather, ["wind", "atGround", "speed"], "")
        }
      },
      clouds: {
        ...(fallbackWeather?.clouds || {}),
        density: extractLuaTopLevelNumberField(cloudsBlock?.text || "", "density") ?? getNested(fallbackWeather, ["clouds", "density"], ""),
        base: extractLuaTopLevelNumberField(cloudsBlock?.text || "", "base") ?? getNested(fallbackWeather, ["clouds", "base"], ""),
        thickness: extractLuaTopLevelNumberField(cloudsBlock?.text || "", "thickness") ?? getNested(fallbackWeather, ["clouds", "thickness"], "")
      },
      fog: {
        ...(fallbackWeather?.fog || {}),
        visibility: extractLuaTopLevelNumberField(fogBlock?.text || "", "visibility") ?? getNested(fallbackWeather, ["fog", "visibility"], ""),
        thickness: extractLuaTopLevelNumberField(fogBlock?.text || "", "thickness") ?? getNested(fallbackWeather, ["fog", "thickness"], "")
      }
    }
  };

  return extractImportedWeather(mergedMission);
}

function buildImportedMissionModelFromLuaText(rawText, sourceName, missionFallback = {}) {
  const metadata = extractMissionTextMetadata(rawText);
  const startTimeSeconds = Number.isFinite(metadata.startTime) ? metadata.startTime : Number(missionFallback?.start_time);
  const blueGroups = consolidateImportedGroups(
    extractImportedGroupsFromMissionText(rawText, "blue")
      .map((group) => applyImportedMissionTiming(group, startTimeSeconds))
  );
  const redGroups = consolidateImportedGroups(
    extractImportedGroupsFromMissionText(rawText, "red")
      .map((group) => applyImportedMissionTiming(group, startTimeSeconds))
  );

  return {
    mission: missionFallback,
    fileName: sourceName,
    title: sanitizeFreeText(missionFallback?.name || sourceName.replace(/\.(miz|lua|txt|json)$/i, ""), 80),
    theatre: metadata.theatre || sanitizeUpperText(missionFallback?.theatre || "", 24),
    dateInGame: metadata.dateInGame || formatMissionDate(missionFallback?.date),
    startTime: secondsToTimeDigits(startTimeSeconds),
    weatherValidTime: secondsToTimeDigits(startTimeSeconds),
    weather: extractImportedWeatherFromMissionText(rawText, missionFallback),
    coalitions: {
      red: redGroups,
      blue: blueGroups
    }
  };
}

function parseMissionLua(luaText) {
  const ast = window.luaparse.parse(luaText, {
    comments: false,
    scope: false,
    luaVersion: "5.1"
  });

  const missionNode = getLuaAssignmentValue(ast, "mission");
  if (!missionNode) {
    throw new Error("Impossible de trouver la table `mission` dans le fichier.");
  }

  const mission = evaluateLuaNode(missionNode);
  if (!mission || typeof mission !== "object") {
    throw new Error("Le contenu `mission` n'a pas pu etre interprete.");
  }

  return mission;
}

function parseMissionTextWithDcsMissionParserFallback(missionString) {
  let text = String(missionString || "");

  const rules = [
    (value) => value.replace(/mission = /g, ""),
    (value) => value.replace(/\["(.*)"\] =/g, (_, p1) => `"${p1}":`),
    (value) => value.replace(/\[(\d*)\] = (\n *{)/g, (_, p1, p2) => `"${p1}0":${p2}`),
    (value) => value.replace(/\[(\d*)\] =/g, (_, p1) => `"${p1}":`),
    (value) => value.replace(/( -- end of \["*([\d\w /]*)"*\])/g, (_, p1, p2) => `"${p2}1": "${String(p1).replace(/"/g, '\\"')}",`),
    (value) => value.replace(/(,)(\n *})/g, (_, __, p2) => p2),
    (value) => value.replace(/-- end of mission/g, "")
  ];

  rules.forEach((rule) => {
    text = rule(text);
  });

  return JSON.parse(text);
}

/* =========================================================
   AIRFIELDS
========================================================= */

function createDefaultAirfield() {
  return {
    id: generateUid("af"),
    icao: "",
    vhf: "",
    uhf: "",
    runway: "",
    ilsFreq: "",
    ilsCourse: "",
    ilsRunway: "",
    beacon: "",
    notes: ""
  };
}

function normalizeAirfieldData(airfield = {}) {
  return {
    id: airfield.id || generateUid("af"),
    icao: sanitizeUpperText(airfield.icao || "", 8),
    vhf: sanitizeFreeText(airfield.vhf || "", 20),
    uhf: sanitizeFreeText(airfield.uhf || "", 20),
    runway: sanitizeUpperText(airfield.runway || "", 20),
    ilsFreq: sanitizeFreeText(airfield.ilsFreq || "", 20),
    ilsCourse: sanitizeDigits(String(airfield.ilsCourse || ""), 3),
    ilsRunway: sanitizeUpperText(airfield.ilsRunway || "", 20),
    beacon: sanitizeUpperText(airfield.beacon || "", 24),
    notes: sanitizeFreeText(airfield.notes || "", 120)
  };
}

function normalizeAirfieldsArray(airfields) {
  if (!Array.isArray(airfields)) return [];
  return airfields.map(normalizeAirfieldData);
}

function getCurrentAirfieldsFromDom() {
  const cards = airfieldGrid ? Array.from(airfieldGrid.querySelectorAll(".airfield-card")) : [];
  return cards.map((card) => normalizeAirfieldData({
    id: card.dataset.airfieldId,
    icao: card.querySelector('[data-airfield-input="icao"]')?.value,
    vhf: card.querySelector('[data-airfield-input="vhf"]')?.value,
    uhf: card.querySelector('[data-airfield-input="uhf"]')?.value,
    runway: card.querySelector('[data-airfield-input="runway"]')?.value,
    ilsFreq: card.querySelector('[data-airfield-input="ilsFreq"]')?.value,
    ilsCourse: card.querySelector('[data-airfield-input="ilsCourse"]')?.value,
    ilsRunway: card.querySelector('[data-airfield-input="ilsRunway"]')?.value,
    beacon: card.querySelector('[data-airfield-input="beacon"]')?.value,
    notes: card.querySelector('[data-airfield-input="notes"]')?.value
  }));
}

function getAirfieldMap(airfields = getCurrentAirfieldsFromDom()) {
  return new Map(
    normalizeAirfieldsArray(airfields)
      .filter((airfield) => airfield.icao)
      .map((airfield) => [airfield.icao, airfield])
  );
}

function populateAirfieldSelect(select, currentValue = "", options = getCurrentAirfieldsFromDom(), placeholder = "Select airfield") {
  if (!select) return;

  const normalizedOptions = normalizeAirfieldsArray(options);
  const normalizedValue = sanitizeUpperText(currentValue || "", 8);
  const optionValues = new Set(normalizedOptions.map((airfield) => airfield.icao).filter(Boolean));

  const rows = [`<option value="">${placeholder}</option>`];
  normalizedOptions.forEach((airfield) => {
    if (!airfield.icao) return;
    rows.push(`<option value="${escapeHtml(airfield.icao)}">${escapeHtml(airfield.icao)}</option>`);
  });

  if (normalizedValue && !optionValues.has(normalizedValue)) {
    rows.push(`<option value="${escapeHtml(normalizedValue)}">${escapeHtml(normalizedValue)}</option>`);
  }

  select.innerHTML = rows.join("");
  select.value = normalizedValue;
}

function formatAirfieldLine(code = "", options = getCurrentAirfieldsFromDom()) {
  const normalizedCode = sanitizeUpperText(code || "", 8);
  if (!normalizedCode) return "--";

  const airfield = getAirfieldMap(options).get(normalizedCode);
  if (!airfield) return normalizedCode;

  const parts = [
    airfield.vhf ? `VHF ${airfield.vhf}` : "",
    airfield.uhf ? `UHF ${airfield.uhf}` : "",
    airfield.runway ? `RWY ${airfield.runway}` : "",
    airfield.ilsFreq || airfield.ilsCourse || airfield.ilsRunway
      ? `ILS ${formatAirfieldIlsDisplay(airfield, " / ")}`
      : "",
    airfield.beacon ? `BCN ${airfield.beacon}` : "",
    airfield.notes || ""
  ].filter(Boolean);

  return [normalizedCode, ...parts].join(" · ");
}

function buildAirfieldMetaMarkup(code = "", options = getCurrentAirfieldsFromDom()) {
  const normalizedCode = sanitizeUpperText(code || "", 8);
  if (!normalizedCode) {
    return `<div class="ato-airfield-meta-line">Aucune donnée.</div>`;
  }

  const airfield = getAirfieldMap(options).get(normalizedCode);
  if (!airfield) {
    return `<div class="ato-airfield-meta-line">${escapeHtml(normalizedCode)}</div>`;
  }

  const rows = [
    { label: "RADIO", value: [airfield.vhf ? `VHF ${airfield.vhf}` : "", airfield.uhf ? `UHF ${airfield.uhf}` : ""].filter(Boolean).join(" · ") },
    { label: "RWY", value: airfield.runway || "" },
    { label: "ILS", value: formatAirfieldIlsDisplay(airfield, " / ") },
    { label: "BCN", value: airfield.beacon || "" },
    { label: "NOTES", value: airfield.notes || "" }
  ].filter((row) => row.value);

  return rows.length
    ? rows.map((row) => `
      <div class="ato-airfield-meta-line">
        <span class="ato-airfield-meta-key">${escapeHtml(row.label)}</span>
        <span class="ato-airfield-meta-value">${escapeHtml(row.value)}</span>
      </div>
    `).join("")
    : `<div class="ato-airfield-meta-line">Aucune donnée.</div>`;
}

function formatAirfieldDetailValue(value, prefix = "") {
  const text = String(value || "").trim();
  if (!text) return "--";
  return prefix ? `${prefix} ${text}` : text;
}

function formatAirfieldIlsDisplay(airfield = {}, separator = " · ") {
  return [
    airfield.ilsRunway ? `RWY ${airfield.ilsRunway}` : "",
    airfield.ilsFreq || "",
    airfield.ilsCourse ? `${airfield.ilsCourse}°` : ""
  ].filter(Boolean).join(separator);
}

function createAirfieldCard(airfieldData = {}) {
  const airfield = normalizeAirfieldData(airfieldData);
  const card = document.createElement("article");
  card.className = "airfield-card is-collapsed";
  card.dataset.airfieldId = airfield.id;
  card.innerHTML = `
    <div class="airfield-card-head">
      <button class="airfield-card-toggle" data-airfield-action="toggle" type="button" aria-expanded="false">
        <div>
          <div class="airfield-card-kicker">Airfield</div>
          <div class="airfield-card-title" data-airfield-view="icao">----</div>
        </div>
      </button>
      <div class="airfield-card-actions">
        <button class="mini-action-btn package-delete-btn" data-airfield-action="delete" type="button">Retirer</button>
      </div>
    </div>
    <div class="airfield-card-grid">
      <label class="airfield-field airfield-field-icao">
        <span class="data-label">ICAO</span>
        <div class="airfield-field-value" data-airfield-view="icaoDetail">----</div>
        <div class="edit-field"><input class="field-input" data-airfield-input="icao" type="text" placeholder="LTFM" /></div>
      </label>
      <label class="airfield-field">
        <span class="data-label">Runway</span>
        <div class="airfield-field-value" data-airfield-view="runway">--</div>
        <div class="edit-field"><input class="field-input" data-airfield-input="runway" type="text" placeholder="04/22" /></div>
      </label>
      <label class="airfield-field">
        <span class="data-label">VHF</span>
        <div class="airfield-field-value" data-airfield-view="vhf">--</div>
        <div class="edit-field"><input class="field-input" data-airfield-input="vhf" type="text" placeholder="123.000" /></div>
      </label>
      <label class="airfield-field">
        <span class="data-label">UHF</span>
        <div class="airfield-field-value" data-airfield-view="uhf">--</div>
        <div class="edit-field"><input class="field-input" data-airfield-input="uhf" type="text" placeholder="250.000" /></div>
      </label>
      <label class="airfield-field airfield-field-wide">
        <span class="data-label">ILS</span>
        <div class="airfield-field-value" data-airfield-view="ils">--</div>
        <div class="airfield-inline-grid edit-field">
          <input class="field-input" data-airfield-input="ilsFreq" type="text" placeholder="110.30" />
          <input class="field-input field-input-time" data-airfield-input="ilsCourse" type="text" inputmode="numeric" maxlength="3" placeholder="044" />
          <input class="field-input" data-airfield-input="ilsRunway" type="text" placeholder="RWY 04" />
        </div>
      </label>
      <label class="airfield-field">
        <span class="data-label">Beacon</span>
        <div class="airfield-field-value" data-airfield-view="beacon">--</div>
        <div class="edit-field"><input class="field-input" data-airfield-input="beacon" type="text" placeholder="TACAN / NDB / VOR" /></div>
      </label>
      <label class="airfield-field airfield-field-wide">
        <span class="data-label">Notes</span>
        <div class="airfield-field-value airfield-field-value-muted" data-airfield-view="notes">--</div>
        <div class="edit-field"><input class="field-input" data-airfield-input="notes" type="text" placeholder="Infos utiles" /></div>
      </label>
    </div>
  `;

  const inputs = Array.from(card.querySelectorAll("[data-airfield-input]"));
  const title = card.querySelector('[data-airfield-view="icao"]');
  const viewFields = {
    icaoDetail: card.querySelector('[data-airfield-view="icaoDetail"]'),
    runway: card.querySelector('[data-airfield-view="runway"]'),
    vhf: card.querySelector('[data-airfield-view="vhf"]'),
    uhf: card.querySelector('[data-airfield-view="uhf"]'),
    ils: card.querySelector('[data-airfield-view="ils"]'),
    beacon: card.querySelector('[data-airfield-view="beacon"]'),
    notes: card.querySelector('[data-airfield-view="notes"]')
  };

  const refresh = () => {
    const current = normalizeAirfieldData({
      id: card.dataset.airfieldId,
      icao: card.querySelector('[data-airfield-input="icao"]')?.value,
      vhf: card.querySelector('[data-airfield-input="vhf"]')?.value,
      uhf: card.querySelector('[data-airfield-input="uhf"]')?.value,
      runway: card.querySelector('[data-airfield-input="runway"]')?.value,
      ilsFreq: card.querySelector('[data-airfield-input="ilsFreq"]')?.value,
      ilsCourse: card.querySelector('[data-airfield-input="ilsCourse"]')?.value,
      ilsRunway: card.querySelector('[data-airfield-input="ilsRunway"]')?.value,
      beacon: card.querySelector('[data-airfield-input="beacon"]')?.value,
      notes: card.querySelector('[data-airfield-input="notes"]')?.value
    });

    card.dataset.airfieldId = current.id;
    inputs.forEach((input) => {
      const key = input.dataset.airfieldInput;
      input.value = current[key] || "";
    });

    if (title) title.textContent = current.icao || "----";
    if (viewFields.icaoDetail) viewFields.icaoDetail.textContent = current.icao || "----";
    if (viewFields.runway) viewFields.runway.textContent = formatAirfieldDetailValue(current.runway, "RWY");
    if (viewFields.vhf) viewFields.vhf.textContent = formatAirfieldDetailValue(current.vhf);
    if (viewFields.uhf) viewFields.uhf.textContent = formatAirfieldDetailValue(current.uhf);
    if (viewFields.ils) {
      viewFields.ils.textContent = formatAirfieldIlsDisplay(current, " · ") || "--";
    }
    if (viewFields.beacon) viewFields.beacon.textContent = formatAirfieldDetailValue(current.beacon);
    if (viewFields.notes) viewFields.notes.textContent = current.notes || "--";
    refreshAirfieldDependentUi();
    saveCurrentMission();
  };

  inputs.forEach((input) => {
    input.value = airfield[input.dataset.airfieldInput] || "";
    if (input.dataset.airfieldInput === "icao") {
      input.addEventListener("input", () => {
        input.value = sanitizeUpperText(input.value, 8);
      });
    }
    if (input.dataset.airfieldInput === "ilsCourse") {
      input.addEventListener("input", () => {
        input.value = sanitizeDigits(input.value, 3);
      });
    }
    input.addEventListener("change", refresh);
    input.addEventListener("blur", refresh);
  });

  card.querySelector('[data-airfield-action="delete"]')?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    card.remove();
    if (airfieldEmptyState) {
      airfieldEmptyState.style.display = airfieldGrid?.children.length ? "none" : "";
    }
    refreshAirfieldDependentUi();
    saveCurrentMission();
  });

  card.querySelector('[data-airfield-action="toggle"]')?.addEventListener("click", (event) => {
    event.preventDefault();

    const cards = airfieldGrid ? Array.from(airfieldGrid.querySelectorAll(".airfield-card")) : [card];
    const currentIndex = cards.indexOf(card);
    const pairStartIndex = currentIndex >= 0 ? currentIndex - (currentIndex % 2) : -1;
    const pairedCards = pairStartIndex >= 0 ? cards.slice(pairStartIndex, pairStartIndex + 2) : [card];
    const willExpand = card.classList.contains("is-collapsed");

    pairedCards.forEach((pairedCard) => {
      pairedCard.classList.toggle("is-collapsed", !willExpand);
      pairedCard
        .querySelector('[data-airfield-action="toggle"]')
        ?.setAttribute("aria-expanded", String(willExpand));
    });
  });

  if (title) title.textContent = airfield.icao || "----";
  if (viewFields.icaoDetail) viewFields.icaoDetail.textContent = airfield.icao || "----";
  if (viewFields.runway) viewFields.runway.textContent = formatAirfieldDetailValue(airfield.runway, "RWY");
  if (viewFields.vhf) viewFields.vhf.textContent = formatAirfieldDetailValue(airfield.vhf);
  if (viewFields.uhf) viewFields.uhf.textContent = formatAirfieldDetailValue(airfield.uhf);
  if (viewFields.ils) {
    viewFields.ils.textContent = formatAirfieldIlsDisplay(airfield, " · ") || "--";
  }
  if (viewFields.beacon) viewFields.beacon.textContent = formatAirfieldDetailValue(airfield.beacon);
  if (viewFields.notes) viewFields.notes.textContent = airfield.notes || "--";
  return card;
}

function renderAirfields(airfields = []) {
  if (!airfieldGrid) return;
  airfieldGrid.innerHTML = "";
  const normalized = normalizeAirfieldsArray(airfields);
  normalized.forEach((airfield) => airfieldGrid.appendChild(createAirfieldCard(airfield)));
  if (airfieldEmptyState) {
    airfieldEmptyState.style.display = normalized.length ? "none" : "";
  }
}

function addAirfield() {
  if (!airfieldGrid) return;
  airfieldGrid.appendChild(createAirfieldCard(createDefaultAirfield()));
  if (airfieldEmptyState) {
    airfieldEmptyState.style.display = "none";
  }
  refreshAirfieldDependentUi();
  saveCurrentMission();
}

function extractImportedWeather(mission) {
  const weather = getNested(mission, ["weather"], {});
  const qnhMmHg = weather?.qnh || "";
  const qnhInHg = mmHgToInHg(qnhMmHg);
  const qnhHpa = mmHgToHpa(qnhMmHg);
  const rawWindDir = radiansToDegrees(getNested(weather, ["wind", "atGround", "dir"], ""));
  const windDir = rawWindDir === ""
    ? ""
    : String((Number(rawWindDir) + 180) % 360);
  const windSpeed = metersPerSecondToKnots(getNested(weather, ["wind", "atGround", "speed"], ""));
  const clouds = weather?.clouds || {};
  const cloudBaseFt = metersToFeet(clouds?.base);
  const cloudTopFt = clouds?.base !== undefined && clouds?.thickness !== undefined
    ? metersToFeet(Number(clouds.base) + Number(clouds.thickness))
    : "";
  const fog = weather?.fog || {};
  const fogTopFt = metersToFeet(fog?.thickness);

  return normalizeWeatherData({
    temperatureC: sanitizeDigits(String(getNested(weather, ["season", "temperature"], "")), 3),
    qnhInHg,
    qnhHpa,
    windDirection: sanitizeDigits(String(windDir), 3),
    windSpeed: sanitizeDigits(String(windSpeed), 3),
    windGust: "",
    fogEnabled: Number(fog?.visibility || 0) > 0 ? "YES" : "NO",
    fogBase: Number(fog?.visibility || 0) > 0 ? "0" : "",
    fogTop: Number(fog?.visibility || 0) > 0 ? sanitizeDigits(String(fogTopFt), 5) : "",
    layers: [
      {
        cover: inferCloudCoverFromDensity(clouds?.density),
        base: sanitizeDigits(String(cloudBaseFt), 5),
        top: sanitizeDigits(String(cloudTopFt), 5)
      },
      { cover: "", base: "", top: "" },
      { cover: "", base: "", top: "" }
    ]
  });
}

function applyImportedMissionTiming(importedGroup, missionStartSeconds) {
  const missionAbsolute = Number.isFinite(missionStartSeconds) ? missionStartSeconds : null;
  const firstWaypoint = importedGroup.route[0] || null;
  const groupStartSeconds = Number.isFinite(importedGroup.groupStartSeconds) ? importedGroup.groupStartSeconds : null;
  const launchOffset = Number.isFinite(firstWaypoint?.etaSeconds)
    ? firstWaypoint.etaSeconds
    : groupStartSeconds;
  const launchAbsolute = missionAbsolute !== null && Number.isFinite(launchOffset)
    ? missionAbsolute + launchOffset
    : missionAbsolute;
  const targetWaypoint = pickTargetWaypoint(importedGroup.route);
  const lastTimedWaypoint = [...importedGroup.route].reverse().find((row) => Number.isFinite(row.etaSeconds));
  const pushWaypointIndex = importedGroup.route.findIndex((row) => row === targetWaypoint) - 1;
  const pushWaypoint = pushWaypointIndex >= 0 ? importedGroup.route[pushWaypointIndex] : null;

  return {
    ...importedGroup,
    launchTime: launchAbsolute !== null ? secondsToTimeDigits(launchAbsolute) : "",
    totTime: missionAbsolute !== null && Number.isFinite(targetWaypoint?.etaSeconds)
      ? secondsToTimeDigits(missionAbsolute + targetWaypoint.etaSeconds)
      : "",
    recoveryTime: missionAbsolute !== null && Number.isFinite(lastTimedWaypoint?.etaSeconds)
      ? secondsToTimeDigits(missionAbsolute + lastTimedWaypoint.etaSeconds)
      : "",
    pushTime: missionAbsolute !== null && Number.isFinite(pushWaypoint?.etaSeconds)
      ? secondsToTimeDigits(missionAbsolute + pushWaypoint.etaSeconds)
      : ""
  };
}

function buildImportedMissionModel(mission, fileName) {
  const startTimeSeconds = Number(mission?.start_time);
  const blueGroups = consolidateImportedGroups(
    buildImportedGroupsForCoalition(mission, "blue")
      .map((group) => applyImportedMissionTiming(group, startTimeSeconds))
  );
  const redGroups = consolidateImportedGroups(
    buildImportedGroupsForCoalition(mission, "red")
      .map((group) => applyImportedMissionTiming(group, startTimeSeconds))
  );

  return {
    mission,
    fileName,
    title: sanitizeFreeText(mission?.name || fileName.replace(/\.(miz|lua|txt|json)$/i, ""), 80),
    theatre: sanitizeUpperText(mission?.theatre || "", 24),
    dateInGame: formatMissionDate(mission?.date),
    startTime: secondsToTimeDigits(startTimeSeconds),
    weatherValidTime: secondsToTimeDigits(startTimeSeconds),
    weather: extractImportedWeather(mission),
    coalitions: {
      red: redGroups,
      blue: blueGroups
    }
  };
}

async function parseMizFile(file) {
  const fileName = String(file?.name || "mission").trim();
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith(".json")) {
    const text = await readFileAsText(file);
    const parsed = JSON.parse(text);

    if (parsed?.coalitions?.red || parsed?.coalitions?.blue) {
      return parsed;
    }

    return buildImportedMissionModel(parsed, fileName);
  }

  const text = await readFileAsText(file);
  const trimmed = String(text || "").trim();

  if (!trimmed.includes("mission") || !trimmed.includes("coalition")) {
    throw new Error("Le fichier fourni ne ressemble pas au fichier `mission` DCS.");
  }

  let mission = null;

  try {
    mission = parseMissionLua(trimmed);
  } catch (primaryError) {
    console.warn("LuaParse a echoue, tentative via fallback dcs-mission-parser.", primaryError);
    mission = parseMissionTextWithDcsMissionParserFallback(trimmed);
  }

  return buildImportedMissionModel(mission, fileName);
}

function parseMissionTextInput(rawText, sourceName = "mission.lua") {
  const trimmed = String(rawText || "").trim();

  if (!trimmed) {
    throw new Error("Le texte colle est vide.");
  }

  if (!trimmed.includes("mission") || !trimmed.includes("coalition")) {
    throw new Error("Le texte colle ne ressemble pas au fichier `mission` DCS.");
  }

  ensureMizLibrariesAvailable();

  let mission = null;

  try {
    mission = parseMissionLua(trimmed);
  } catch (primaryError) {
    console.warn("LuaParse a echoue sur le texte colle, tentative via fallback dcs-mission-parser.", primaryError);
    mission = parseMissionTextWithDcsMissionParserFallback(trimmed);
  }

  const parsedModel = buildImportedMissionModel(mission, sourceName);
  if ((parsedModel.coalitions.red.length + parsedModel.coalitions.blue.length) > 0) {
    return parsedModel;
  }

  console.warn("Le parseur mission complet n'a trouve aucun groupe, bascule sur l'analyse textuelle directe.");
  return buildImportedMissionModelFromLuaText(trimmed, sourceName, mission);
}

function renderMizCoalitionCounts() {
  const parsed = mizImportState.parsedMission;
  const redCount = parsed?.coalitions?.red?.length || 0;
  const blueCount = parsed?.coalitions?.blue?.length || 0;

  document.querySelectorAll("[data-miz-coalition-count]").forEach((node) => {
    const coalition = node.dataset.mizCoalitionCount;
    const count = coalition === "red" ? redCount : blueCount;
    node.textContent = `${count} groupe${count > 1 ? "s" : ""}`;
  });
}

function renderMizGroupList() {
  if (!mizGroupList || !mizGroupHeading) return;

  const coalition = mizImportState.selectedCoalition;
  const groups = mizImportState.parsedMission?.coalitions?.[coalition] || [];

  mizGroupHeading.textContent = `Coalition selectionnee : ${coalition ? coalition.toUpperCase() : "--"}`;
  mizGroupList.innerHTML = "";

  if (!groups.length) {
    const empty = document.createElement("div");
    empty.className = "miz-group-empty";
    empty.textContent = "Aucun groupe aerien n'a ete trouve pour cette coalition.";
    mizGroupList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  groups.forEach((group) => {
    const wrapper = document.createElement("label");
    wrapper.className = "miz-group-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = mizImportState.selectedGroupIds.has(group.id);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        mizImportState.selectedGroupIds.add(group.id);
      } else {
        mizImportState.selectedGroupIds.delete(group.id);
      }
    });

    const main = document.createElement("div");
    main.className = "miz-group-main";

    const title = document.createElement("div");
    title.className = "miz-group-title";
    title.textContent = group.rawName.toUpperCase();

    const meta = document.createElement("div");
    meta.className = "miz-group-meta";
    meta.textContent = [
      group.task || "TASK --",
      `${group.aircraftCount || "--"} x ${group.aircraftType || "TYPE --"}`,
      group.departure ? `DEP ${group.departure}` : "",
      group.destination ? `RTB ${group.destination}` : ""
    ].filter(Boolean).join(" · ");

    const submeta = document.createElement("div");
    submeta.className = "miz-group-submeta";
    submeta.textContent = [
      group.intra ? `INTRA ${group.intra}` : "",
      group.loadout ? `LOADOUT ${group.loadout}` : "",
      group.route.length ? `${group.route.length} waypoints` : ""
    ].filter(Boolean).join(" · ") || "Aucune donnee supplementaire.";

    main.append(title, meta, submeta);
    wrapper.append(checkbox, main);
    fragment.appendChild(wrapper);
  });

  mizGroupList.appendChild(fragment);
}

async function validateSelectedMizFile() {
  syncMizTextState();
  const pastedText = mizImportState.pastedMissionText;
  const hasPastedText = Boolean(pastedText);

  if (!hasPastedText) {
    alert("Collez le texte `mission = { ... }` avant de continuer.");
    return;
  }

  mizImportState.loading = true;
  setMizImportStatus("Analyse du texte colle en cours (`mission = { ... }`)...");

  try {
    mizImportState.parsedMission = parseMissionTextInput(pastedText, "mission-pasted.lua");
    console.info("[MIZ IMPORT] Groupes detectes", {
      red: mizImportState.parsedMission?.coalitions?.red?.length || 0,
      blue: mizImportState.parsedMission?.coalitions?.blue?.length || 0,
      source: "pasted-text"
    });
    mizImportState.selectedCoalition = "";
    mizImportState.selectedGroupIds = new Set();

    const redCount = mizImportState.parsedMission.coalitions.red.length;
    const blueCount = mizImportState.parsedMission.coalitions.blue.length;

    if (redCount === 0 && blueCount === 0) {
      setMizImportStatus(
        "Mission chargee mais aucun groupe aerien n'a ete detecte.\nVerifiez que vous avez bien colle le texte complet `mission = { ... }`."
      );
    } else {
      setMizImportStatus(
        `Mission chargee : ${mizImportState.parsedMission.title}\nTheatre : ${mizImportState.parsedMission.theatre || "--"} · Rouge : ${redCount} · Bleu : ${blueCount}`
      );
    }
    goToMizStep(2);
  } catch (error) {
    console.error("Echec d'import mission :", error);
    setMizImportStatus(`Import impossible : ${error.message || "erreur inconnue"}`);
    alert(`Import mission impossible.\n${error.message || "Erreur inconnue."}`);
  } finally {
    mizImportState.loading = false;
  }
}

function chooseMizCoalition(coalition) {
  const groups = mizImportState.parsedMission?.coalitions?.[coalition] || [];
  mizImportState.selectedCoalition = coalition;
  mizImportState.selectedGroupIds = new Set(groups.map((group) => group.id));
  goToMizStep(3);
}

function buildImportedAcoFromPackage(pkg, importedGroup) {
  const aco = createDefaultAco(pkg);
  const routeAltitudes = importedGroup.route
    .map((row) => Number.parseInt(String(row.alt || "").replace(/\D/g, ""), 10))
    .filter(Number.isFinite);
  const mainAltitude = routeAltitudes.length
    ? routeAltitudes[Math.floor(routeAltitudes.length / 2)]
    : null;

  aco.inherited = buildInheritedAcoData(pkg);
  aco.floorAltitude = mainAltitude ? String(Math.max(mainAltitude - 2000, 500)) : "";
  aco.transitAltitude = mainAltitude ? String(mainAltitude) : "";
  aco.ceilingAltitude = mainAltitude ? String(mainAltitude + 2000) : "";
  aco.airspaceArea = sanitizeUpperText(importedGroup.targetName || importedGroup.rawName, 40);
  aco.notes = sanitizeMultilineText(
    [
      importedGroup.departure ? `DEP ${importedGroup.departure}` : "",
      importedGroup.destination ? `RTB ${importedGroup.destination}` : ""
    ].filter(Boolean).join("\n"),
    400
  );
  return normalizeAcoData(aco);
}

function buildImportedAtoFromPackage(pkg, importedGroup, importedOverview) {
  const ato = createDefaultAto(pkg);
  ato.inherited = buildInheritedAtoData(pkg);
  ato.inherited.operationName = sanitizeUpperText(importedOverview.operationName || "", 48);
  ato.inherited.startTime = sanitizeTimeInput(importedOverview.startTime || "");
  ato.inherited.totTime = sanitizeTimeInput(importedOverview.totTime || "");
  ato.primaryTask = importedGroup.task || "";
  ato.targetName = sanitizeUpperText(importedGroup.targetName || importedGroup.rawName, 48);
  ato.targetDetails = sanitizeFreeText(importedGroup.targetDetails || "", 120);
  ato.launchTime = sanitizeTimeInput(importedGroup.launchTime || "");
  ato.totTime = sanitizeTimeInput(importedGroup.totTime || importedOverview.totTime || "");
  ato.recoveryTime = sanitizeTimeInput(importedGroup.recoveryTime || "");
  ato.pushTime = sanitizeTimeInput(importedGroup.pushTime || "");
  ato.launchDetails = sanitizeFreeText(importedGroup.departure || "", 120);
  ato.recoveryDetails = sanitizeFreeText(importedGroup.destination || "", 120);
  ato.loadout = sanitizeFreeText(importedGroup.loadout || "", 120);
  ato.loadoutNote = sanitizeFreeText(importedGroup.loadoutNote || "", 120);
  ato.route = importedGroup.route.map((row) => sanitizeAtoRouteRow(row));
  ato.comm = getDefaultAtoComm().map((row) => ({ ...row }));
  ato.supportTiles = getDefaultAtoSupportTiles().map((tile) => ({ ...tile }));

  return normalizeAtoData(ato);
}

function importSelectedMizGroups() {
  const coalition = mizImportState.selectedCoalition;
  const parsed = mizImportState.parsedMission;

  if (!coalition || !parsed) {
    alert("Aucune coalition chargee.");
    return;
  }

  const importedGroups = (parsed.coalitions[coalition] || [])
    .filter((group) => mizImportState.selectedGroupIds.has(group.id));

  if (!importedGroups.length) {
    alert("Selectionnez au moins un groupe a importer.");
    return;
  }

  const operationName = sanitizeUpperText(parsed.title || parsed.fileName.replace(/\.(miz|lua|txt|json)$/i, ""), 48);
  const overviewTot = importedGroups.find((group) => group.totTime)?.totTime || parsed.startTime || "";
  const overview = {
    operationName,
    mapName: sanitizeUpperText(parsed.theatre || "", 24),
    dateInGame: parsed.dateInGame || "",
    dateIRL: new Date().toISOString().slice(0, 10),
    startTime: parsed.startTime || "",
    totTime: overviewTot,
    endTime: importedGroups.find((group) => group.recoveryTime)?.recoveryTime || "",
    status: "PLANNED",
    weatherArea: sanitizeUpperText(parsed.theatre || "DCS", 24),
    weatherValidTime: parsed.weatherValidTime || ""
  };

  const packageNamePool = [...PACKAGE_NAME_OPTIONS];
  const packages = importedGroups.map((group, index) => {
    const pkg = normalizePackageData({
      ...createDefaultPackage(),
      callsign: group.rawName,
      packageName: packageNamePool[index % packageNamePool.length] || "",
      mission: group.task,
      aircraftCount: group.aircraftCount,
      aircraftType: group.aircraftType,
      departure: group.departure,
      leader: group.leader,
      wingmen: group.wingmen,
      intra: group.intra,
      destination: group.destination
    });

    return pkg;
  });

  const atos = packages.map((pkg, index) => buildImportedAtoFromPackage(pkg, importedGroups[index], overview));
  const acos = packages.map((pkg, index) => buildImportedAcoFromPackage(pkg, importedGroups[index]));

  applyBriefingPayload({
    ...overview,
    weather: parsed.weather,
    packages,
    atos,
    acos,
    timelinePackages: []
  }, currentMissionId || "");

  updateTimelineFromAtos();
  closeMizImportModal();
}

/* =========================================================
   MISSION ID / STORAGE
========================================================= */

function generateMissionId(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function getStorageKey(missionId) {
  return `${STORAGE_PREFIX}${missionId}`;
}

function getUniqueMissionId() {
  let missionId = generateMissionId(12);

  while (localStorage.getItem(getStorageKey(missionId))) {
    missionId = generateMissionId(12);
  }

  return missionId;
}

function getUrlMissionId() {
  const url = new URL(window.location.href);
  return (url.searchParams.get(URL_PARAM_NAME) || "").trim().toUpperCase();
}

function setUrlMissionId(missionId) {
  const url = new URL(window.location.href);

  if (missionId) {
    url.searchParams.set(URL_PARAM_NAME, missionId);
  } else {
    url.searchParams.delete(URL_PARAM_NAME);
  }

  window.history.replaceState({}, "", url.toString());
}

function encodeMissionPayload(payload) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  } catch (error) {
    console.error("Impossible d'encoder le briefing.", error);
    return "";
  }
}

function decodeMissionPayload(token) {
  try {
    const normalizedToken = String(token || "").trim();
    if (!normalizedToken) return null;
    return JSON.parse(decodeURIComponent(escape(atob(normalizedToken))));
  } catch (error) {
    console.error("Impossible de décoder le briefing.", error);
    return null;
  }
}

/* =========================================================
   OVERVIEW
========================================================= */

function collectOverviewDataFromInputs() {
  return {
    operationName: fieldDefinitions.operationName.input.value.trim(),
    mapName: fieldDefinitions.mapName.input.value.trim(),
    dateInGame: fieldDefinitions.dateInGame.input.value.trim(),
    dateIRL: fieldDefinitions.dateIRL.input.value.trim(),
    startTime: sanitizeTimeInput(fieldDefinitions.startTime.input.value),
    totTime: sanitizeTimeInput(fieldDefinitions.totTime.input.value),
    endTime: sanitizeTimeInput(fieldDefinitions.endTime.input.value),
    status: normalizeMissionStatus(fieldDefinitions.status.input.value),
    weatherArea: fieldDefinitions.weatherArea.input.value.trim() || "ICAO CODE",
    weatherValidTime: sanitizeTimeInput(fieldDefinitions.weatherValidTime.input.value)
  };
}

function applyOverviewDataToInputs(data) {
  fieldDefinitions.operationName.input.value = data.operationName || "";
  fieldDefinitions.mapName.input.value = data.mapName || "";
  fieldDefinitions.dateInGame.input.value = data.dateInGame || "";
  fieldDefinitions.dateIRL.input.value = data.dateIRL || "";
  fieldDefinitions.startTime.input.value = data.startTime || "";
  fieldDefinitions.totTime.input.value = data.totTime || "";
  fieldDefinitions.endTime.input.value = data.endTime || "";
  fieldDefinitions.status.input.value = normalizeMissionStatus(data.status || "DRAFT");
  fieldDefinitions.weatherArea.input.value = data.weatherArea || "ICAO CODE";
  fieldDefinitions.weatherValidTime.input.value = sanitizeTimeInput(data.weatherValidTime || "");
}

function updateViewField(config) {
  const viewEl = config.viewElement;
  if (!viewEl || !config.input) return;

  const rawValue = config === fieldDefinitions.status
    ? normalizeMissionStatus(config.input.value)
    : config.input.value.trim();
  const displayValue = rawValue
    ? (typeof config.formatter === "function" ? config.formatter(rawValue) : rawValue)
    : config.fallback;

  viewEl.textContent = displayValue;

  if (config === fieldDefinitions.status) {
    viewEl.classList.toggle("status-value-draft", displayValue === "DRAFT");
    viewEl.classList.toggle("status-value-planned", displayValue === "PLANNED");
  }
}

function refreshAllViewFields() {
  Object.values(fieldDefinitions).forEach(updateViewField);
}

/* =========================================================
   WEATHER
========================================================= */

function getDefaultWeather() {
  return deepClone(defaultMissionData.weather);
}

function normalizeLayer(layer, fallbackLayer) {
  const source = layer || {};
  const fallback = fallbackLayer || { cover: "", base: "", top: "" };

  return {
    cover: String(source.cover || fallback.cover || "").toUpperCase(),
    base: sanitizeDigits(source.base || fallback.base || "", 5),
    top: sanitizeDigits(source.top || fallback.top || "", 5)
  };
}

function normalizeWeatherData(weatherData) {
  const defaults = getDefaultWeather();
  const source = weatherData || {};
  const qnhPair = normalizeQnhPair(source.qnhInHg || defaults.qnhInHg, source.qnhHpa || defaults.qnhHpa);

  return {
    temperatureC: sanitizeDigits(source.temperatureC || defaults.temperatureC, 3),
    qnhInHg: qnhPair.qnhInHg,
    qnhHpa: qnhPair.qnhHpa,
    windDirection: sanitizeDigits(source.windDirection || defaults.windDirection, 3),
    windSpeed: sanitizeDigits(source.windSpeed || defaults.windSpeed, 3),
    windGust: sanitizeDigits(source.windGust || defaults.windGust, 3),
    fogEnabled: String(source.fogEnabled || defaults.fogEnabled || "NO").toUpperCase() === "YES" ? "YES" : "NO",
    fogBase: sanitizeDigits(source.fogBase || defaults.fogBase, 5),
    fogTop: sanitizeDigits(source.fogTop || defaults.fogTop, 5),
    layers: defaults.layers.map((defaultLayer, index) =>
      normalizeLayer(source.layers?.[index], defaultLayer)
    )
  };
}

function collectWeatherDataFromInputs() {
  return normalizeWeatherData({
    temperatureC: weatherInputs.temperatureC?.value,
    qnhInHg: weatherInputs.qnhInHg?.value,
    windDirection: weatherInputs.windDirection?.value,
    windSpeed: weatherInputs.windSpeed?.value,
    windGust: weatherInputs.windGust?.value,
    fogEnabled: weatherInputs.fogEnabled?.value,
    fogBase: weatherInputs.fogBase?.value,
    fogTop: weatherInputs.fogTop?.value,
    layers: weatherInputs.layers.map((layer) => ({
      cover: layer.cover?.value,
      base: layer.base?.value,
      top: layer.top?.value
    }))
  });
}

function applyWeatherDataToInputs(weatherData) {
  const normalized = normalizeWeatherData(weatherData);

  if (weatherInputs.temperatureC) weatherInputs.temperatureC.value = normalized.temperatureC;
  if (weatherInputs.qnhInHg) weatherInputs.qnhInHg.value = normalized.qnhInHg;
  if (weatherInputs.windDirection) weatherInputs.windDirection.value = normalized.windDirection;
  if (weatherInputs.windSpeed) weatherInputs.windSpeed.value = normalized.windSpeed;
  if (weatherInputs.windGust) weatherInputs.windGust.value = normalized.windGust;
  if (weatherInputs.fogEnabled) weatherInputs.fogEnabled.value = normalized.fogEnabled;
  if (weatherInputs.fogBase) weatherInputs.fogBase.value = normalized.fogBase;
  if (weatherInputs.fogTop) weatherInputs.fogTop.value = normalized.fogTop;

  normalized.layers.forEach((layerData, index) => {
    const inputs = weatherInputs.layers[index];
    if (!inputs) return;

    if (inputs.cover) inputs.cover.value = layerData.cover;
    if (inputs.base) inputs.base.value = layerData.base;
    if (inputs.top) inputs.top.value = layerData.top;
  });
}

function getLayerDensityClass(cover) {
  switch (String(cover || "").toUpperCase()) {
    case "FEW":
      return "layer-density-few";
    case "BKN":
      return "layer-density-bkn";
    case "OVC":
      return "layer-density-ovc";
    case "SCT":
    default:
      return "layer-density-sct";
  }
}

function getLayerSummary(layer) {
  if (!layer.cover || !layer.base || !layer.top) return "--";
  return `${layer.cover} | ${formatFeet(layer.base)} ft / ${formatFeet(layer.top)} ft`;
}

function getFogSummary(weather) {
  if (weather.fogEnabled !== "YES") return "No";
  if (!weather.fogBase || !weather.fogTop) return "Yes";
  return `${formatFeet(weather.fogBase)} ft / ${formatFeet(weather.fogTop)} ft`;
}

function getFogDescription(weather) {
  if (weather.fogEnabled !== "YES") return "--";
  if (!weather.fogBase || !weather.fogTop) return "Brouillard actif";
  return `PLANCHER ${formatFeet(weather.fogBase)} ft · PLAFOND ${formatFeet(weather.fogTop)} ft`;
}

function getWindArrowForDirection(direction) {
  const normalized = ((direction % 360) + 360) % 360;

  if (normalized >= 337.5 || normalized < 22.5) return "↑";
  if (normalized < 67.5) return "↗";
  if (normalized < 112.5) return "→";
  if (normalized < 157.5) return "↘";
  if (normalized < 202.5) return "↓";
  if (normalized < 247.5) return "↙";
  if (normalized < 292.5) return "←";
  return "↖";
}

function updateWeatherVisuals() {
  const weather = collectWeatherDataFromInputs();

  const tempLabel = weather.temperatureC ? `${weather.temperatureC}°C` : "--°C";
  const qnhInHgLabel = weather.qnhInHg ? `${weather.qnhInHg} inHg` : "--.-- inHg";
  const qnhHpaLabel = weather.qnhHpa ? `${weather.qnhHpa} hPa` : "---- hPa";

  setText(weatherView.tempDisplay, tempLabel);
  setText(weatherView.qnhInhgDisplay, qnhInHgLabel);
  setText(weatherView.qnhHpaDisplay, qnhHpaLabel);

  const windDir = weather.windDirection ? toIntOrFallback(weather.windDirection, 0) : null;
  const windSpeed = weather.windSpeed ? String(weather.windSpeed).padStart(2, "0") : "--";
  const windGust = weather.windGust ? String(weather.windGust).padStart(2, "0") : "--";

  setText(
    weatherView.windMain,
    `${windDir === null ? "---" : String(windDir).padStart(3, "0")}° / ${windSpeed} kts`
  );
  setText(weatherView.windGust, `Gust ${windGust} kts`);
  setText(weatherView.windOrigin, "Origine du vent");
  setText(weatherView.windArrow, getWindArrowForDirection(windDir ?? 0));

  setText(weatherView.fogSummary, getFogSummary(weather));
  setText(weatherView.fogDescDisplay, getFogDescription(weather));

  if (weatherView.fogVisual) {
    const hasFog = weather.fogEnabled === "YES" && weather.fogBase && weather.fogTop;
    weatherView.fogVisual.classList.toggle("is-empty", !hasFog);
    weatherView.fogVisual.style.display = hasFog ? "block" : "none";

    if (hasFog) {
      const fogBase = toIntOrFallback(weather.fogBase, 0);
      const fogTop = toIntOrFallback(weather.fogTop, 0);
      const lowerAlt = Math.min(fogBase, fogTop);
      const upperAlt = Math.max(fogBase, fogTop);
      const bottomPercent = percentFromAltitude(lowerAlt);
      const topPercent = percentFromAltitude(upperAlt);
      const heightPercent = Math.max(topPercent - bottomPercent, 3);

      weatherView.fogVisual.style.bottom = `${bottomPercent}%`;
      weatherView.fogVisual.style.height = `${heightPercent}%`;
    } else {
      weatherView.fogVisual.style.bottom = "0%";
      weatherView.fogVisual.style.height = "0%";
    }
  }

  weather.layers.forEach((layer, index) => {
    const view = weatherView.layers[index];
    if (!view) return;

    const hasLayer = !!(layer.cover && layer.base && layer.top);

    setText(view.summary, getLayerSummary(layer));

    if (!view.visual) return;

    view.visual.classList.remove(
      "layer-density-few",
      "layer-density-sct",
      "layer-density-bkn",
      "layer-density-ovc"
    );

    if (!hasLayer) {
      view.visual.classList.add("is-empty");
      view.visual.style.bottom = "0%";
      view.visual.style.height = "0%";
      return;
    }

    const base = toIntOrFallback(layer.base, 0);
    const top = toIntOrFallback(layer.top, 0);
    const lowerAlt = Math.min(base, top);
    const upperAlt = Math.max(base, top);
    const bottomPercent = percentFromAltitude(lowerAlt);
    const topPercent = percentFromAltitude(upperAlt);
    const heightPercent = Math.max(topPercent - bottomPercent, 4);

    view.visual.classList.remove("is-empty");
    view.visual.classList.add(getLayerDensityClass(layer.cover));
    view.visual.style.bottom = `${bottomPercent}%`;
    view.visual.style.height = `${heightPercent}%`;
  });
}

/* =========================================================
   PACKAGES
========================================================= */

function createDefaultPackage() {
  return {
    id: generateUid("pkg"),
    color: getRandomPackageColor(),
    callsign: "",
    packageName: "",
    mission: "",
    aircraftCount: "",
    aircraftType: "",
    departure: "",
    leader: "",
    wingmen: "",
    intra: "",
    destination: ""
  };
}

function normalizePackageData(pkg = {}) {
  return {
    id: pkg.id || generateUid("pkg"),
    color: /^#[0-9a-fA-F]{6}$/.test(String(pkg.color || "")) ? String(pkg.color) : getRandomPackageColor(),
    callsign: sanitizeUpperText(pkg.callsign || "", 24),
    packageName: normalizePackageNameValue(pkg.packageName || ""),
    mission: normalizeTaskValue(pkg.mission || ""),
    aircraftCount: sanitizeDigits(pkg.aircraftCount || "", 2),
    aircraftType: sanitizeUpperText(pkg.aircraftType || "", 24),
    departure: sanitizeUpperText(pkg.departure || "", 24),
    leader: sanitizeFreeText(pkg.leader || "", 40),
    wingmen: sanitizeMultilineText(pkg.wingmen || "", 400),
    intra: sanitizeFreeText(pkg.intra || "", 20),
    destination: sanitizeUpperText(pkg.destination || "", 24)
  };
}

function normalizePackagesArray(packages) {
  if (!Array.isArray(packages)) return [];
  return packages.map(normalizePackageData);
}

function getPackageFieldValue(card, fieldName) {
  const fields = card._packageFields;

  if (fieldName === "mission") {
    const missionSelect = fields?.missionSelect || card.querySelector('[data-package-input="missionSelect"]');
    return missionSelect ? missionSelect.value : "";
  }

  if (fieldName === "packageName") {
    const packageNameSelect = fields?.packageNameSelect || card.querySelector('[data-package-input="packageNameSelect"]');
    return packageNameSelect ? packageNameSelect.value : "";
  }

  if (fieldName === "departure") {
    const departureSelect = fields?.departureSelect || card.querySelector('[data-package-input="departureSelect"]');
    const departureView = fields?.departureView || card.querySelector('[data-package-view="departure"]');
    return departureSelect ? departureSelect.value : (departureView ? (departureView.textContent || "").trim() : "");
  }

  if (fieldName === "destination") {
    const destinationSelect = fields?.destinationSelect || card.querySelector('[data-package-input="destinationSelect"]');
    const destinationView = fields?.destinationView || card.querySelector('[data-package-view="destination"]');
    return destinationSelect ? destinationSelect.value : (destinationView ? (destinationView.textContent || "").trim() : "");
  }

  if (fieldName === "wingmen") {
    const wingmenBuilder = fields?.wingmenBuilder || card.querySelector('[data-package-input="wingmenBuilder"]');
    const wingmenView = fields?.wingmenView || card.querySelector('[data-package-view="wingmen"]');
    if (wingmenBuilder) {
      const compiled = Array.from(wingmenBuilder.querySelectorAll(".package-wingmen-input"))
        .map((input, index) => {
          const name = sanitizeFreeText(input.value, 40);
          return name ? `${index + 2}. ${name}` : "";
        })
        .filter(Boolean)
        .join("\n");
      return compiled;
    }
    return wingmenView ? (wingmenView.textContent || "").trim() : "";
  }

  const el = fields?.[fieldName] || card.querySelector(`[data-package-input="${fieldName}"]`);
  if (!el) return "";

  if (fieldName === "color" && "value" in el) {
    return el.value;
  }

  return (el.textContent || "").trim();
}

function getCurrentPackagesFromDom() {
  const cards = packageGrid ? Array.from(packageGrid.querySelectorAll(".package-card")) : [];

  return cards.map((card) => normalizePackageData({
    id: card.dataset.packageId,
    color: getPackageFieldValue(card, "color"),
    callsign: getPackageFieldValue(card, "callsign"),
    packageName: getPackageFieldValue(card, "packageName"),
    mission: getPackageFieldValue(card, "mission"),
    aircraftCount: getPackageFieldValue(card, "aircraftCount"),
    aircraftType: getPackageFieldValue(card, "aircraftType"),
    departure: getPackageFieldValue(card, "departure"),
    leader: getPackageFieldValue(card, "leader"),
    wingmen: getPackageFieldValue(card, "wingmen"),
    intra: getPackageFieldValue(card, "intra"),
    destination: getPackageFieldValue(card, "destination")
  }));
}

function syncPackageTaskView(card) {
  const missionSelect = card._packageFields?.missionSelect;
  const missionView = card._packageFields?.missionView;

  if (!missionSelect || !missionView) return;

  const missionValue = normalizeTaskValue(missionSelect.value);
  missionSelect.value = missionValue;
  missionView.textContent = missionValue || "TASK";
}

function syncPackageNameView(card) {
  const packageNameSelect = card._packageFields?.packageNameSelect;
  const packageNameView = card._packageFields?.packageNameView;

  if (!packageNameSelect || !packageNameView) return;

  const packageNameValue = normalizePackageNameValue(packageNameSelect.value);
  packageNameSelect.value = packageNameValue;
  packageNameView.textContent = packageNameValue || "PACKAGE";
}

function sanitizePackageFieldElement(fieldName, element) {
  if (!element) return;

  switch (fieldName) {
    case "callsign":
      element.textContent = sanitizeUpperText(element.textContent, 24);
      break;
    case "packageName":
      element.textContent = sanitizeUpperText(element.textContent, 24);
      break;
    case "aircraftCount":
      element.textContent = sanitizeDigits(element.textContent, 2);
      break;
    case "aircraftType":
      element.textContent = sanitizeUpperText(element.textContent, 24);
      break;
    case "leader":
      element.textContent = sanitizeFreeText(element.textContent, 40);
      break;
    case "wingmen":
      element.textContent = sanitizeMultilineText(element.textContent, 400);
      break;
    case "intra":
      element.textContent = sanitizeFreeText(element.textContent, 20);
      break;
    default:
      break;
  }
}

function bindPackageEditableBehavior(card, fieldName, element) {
  if (!element) return;

  if (fieldName === "wingmen") {
    element.addEventListener("input", () => {
      saveCurrentMission();
    });

    element.addEventListener("blur", () => {
      sanitizePackageFieldElement(fieldName, element);
      saveCurrentMission();
    });

    return;
  }

  const liveUpperFields = new Set(["callsign", "packageName", "aircraftType"]);
  const liveDigitFields = new Set(["aircraftCount"]);

  if (liveUpperFields.has(fieldName)) {
    element.addEventListener("input", () => {
      setContentEditableTextPreserveCaret(element, (text) => sanitizeUpperText(text,  fieldName === "callsign" ? 24 : fieldName === "packageName" ? 24 : 24));
      saveCurrentMission();
    });
  } else if (liveDigitFields.has(fieldName)) {
    element.addEventListener("input", () => {
      setContentEditableTextPreserveCaret(element, (text) => sanitizeDigits(text, 2));
      saveCurrentMission();
    });
  } else {
    element.addEventListener("input", () => {
      saveCurrentMission();
    });
  }

  element.addEventListener("blur", () => {
    sanitizePackageFieldElement(fieldName, element);
    saveCurrentMission();
  });
}

function parseWingmenList(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/^\s*\d+\.\s*/, "").trim())
    .filter(Boolean)
    .map((name) => sanitizeFreeText(name, 40));
}

function syncWingmenBuilderOutput(card) {
  const builder = card._packageFields?.wingmenBuilder;
  const view = card._packageFields?.wingmenView;
  if (!builder || !view) return;

  const compiled = Array.from(builder.querySelectorAll(".package-wingmen-input"))
    .map((input, index) => {
      input.value = sanitizeFreeText(input.value, 40);
      const indexLabel = input.closest(".package-wingmen-builder-row")?.querySelector(".package-wingmen-index");
      if (indexLabel) indexLabel.textContent = `${index + 2}.`;
      return input.value ? `${index + 2}. ${input.value}` : "";
    })
    .filter(Boolean)
    .join("\n");

  view.textContent = compiled;
}

function createWingmanBuilderRow(card, name = "") {
  const row = document.createElement("div");
  row.className = "package-wingmen-builder-row";
  row.innerHTML = `
    <span class="package-wingmen-index">2.</span>
    <input class="field-input package-wingmen-input" type="text" placeholder="Wingman" value="${sanitizeFreeText(name, 40)}" />
    <button class="mini-action-btn package-delete-btn" type="button">Retirer</button>
  `;

  const input = row.querySelector(".package-wingmen-input");
  const removeBtn = row.querySelector(".package-delete-btn");

  const sync = () => {
    syncWingmenBuilderOutput(card);
    saveCurrentMission();
  };

  input.addEventListener("input", sync);
  input.addEventListener("change", sync);

  removeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    row.remove();
    if (card._packageFields?.wingmenBuilder && !card._packageFields.wingmenBuilder.children.length) {
      card._packageFields.wingmenBuilder.appendChild(createWingmanBuilderRow(card, ""));
    }
    sync();
  });

  return row;
}

function renderWingmenBuilder(card, wingmenValue = "") {
  const builder = card._packageFields?.wingmenBuilder;
  if (!builder) return;

  builder.innerHTML = "";
  const names = parseWingmenList(wingmenValue);
  const rows = names.length ? names : [""];
  rows.forEach((name) => builder.appendChild(createWingmanBuilderRow(card, name)));
  syncWingmenBuilderOutput(card);
}

function createPackageCard(packageData) {
  if (!packageCardTemplate) return null;

  const pkg = normalizePackageData(packageData);
  const fragment = packageCardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".package-card");

  if (!card) return null;

  card.dataset.packageId = pkg.id;
  card.style.setProperty("--package-accent", pkg.color);

  const fields = {
    color: card.querySelector('[data-package-input="color"]'),
    callsign: card.querySelector('[data-package-input="callsign"]'),
    packageNameSelect: card.querySelector('[data-package-input="packageNameSelect"]'),
    packageNameView: card.querySelector('[data-package-view="packageName"]'),
    missionSelect: card.querySelector('[data-package-input="missionSelect"]'),
    missionView: card.querySelector('[data-package-view="mission"]'),
    aircraftCount: card.querySelector('[data-package-input="aircraftCount"]'),
    aircraftType: card.querySelector('[data-package-input="aircraftType"]'),
    departureView: card.querySelector('[data-package-view="departure"]'),
    departureSelect: card.querySelector('[data-package-input="departureSelect"]'),
    leader: card.querySelector('[data-package-input="leader"]'),
    wingmenView: card.querySelector('[data-package-view="wingmen"]'),
    wingmenBuilder: card.querySelector('[data-package-input="wingmenBuilder"]'),
    intra: card.querySelector('[data-package-input="intra"]'),
    destinationView: card.querySelector('[data-package-view="destination"]'),
    destinationSelect: card.querySelector('[data-package-input="destinationSelect"]')
  };
  card._packageFields = fields;

  function applyCardData(normalizedPkg) {
    if (fields.color) fields.color.value = normalizedPkg.color;
    if (fields.callsign) fields.callsign.textContent = normalizedPkg.callsign;
    if (fields.packageNameSelect) fields.packageNameSelect.value = normalizedPkg.packageName;
    if (fields.missionSelect) fields.missionSelect.value = normalizedPkg.mission;
    if (fields.aircraftCount) fields.aircraftCount.textContent = normalizedPkg.aircraftCount;
    if (fields.aircraftType) fields.aircraftType.textContent = normalizedPkg.aircraftType;
    if (fields.departureView) fields.departureView.textContent = normalizedPkg.departure || "LOCATION";
    populateAirfieldSelect(fields.departureSelect, normalizedPkg.departure, getCurrentAirfieldsFromDom(), "Departure");
    if (fields.leader) fields.leader.textContent = normalizedPkg.leader;
    if (fields.wingmenView) fields.wingmenView.textContent = normalizedPkg.wingmen;
    renderWingmenBuilder(card, normalizedPkg.wingmen);
    if (fields.intra) fields.intra.textContent = normalizedPkg.intra;
    if (fields.destinationView) fields.destinationView.textContent = normalizedPkg.destination || "DESTINATION";
    populateAirfieldSelect(fields.destinationSelect, normalizedPkg.destination, getCurrentAirfieldsFromDom(), "Destination");

    syncPackageNameView(card);
    syncPackageTaskView(card);
    card.style.setProperty("--package-accent", normalizedPkg.color);
  }

  applyCardData(pkg);

  [
    ["callsign", fields.callsign],
    ["aircraftCount", fields.aircraftCount],
    ["aircraftType", fields.aircraftType],
    ["leader", fields.leader],
    ["intra", fields.intra]
  ].forEach(([fieldName, element]) => {
    bindPackageEditableBehavior(card, fieldName, element);
  });

  [fields.departureSelect, fields.destinationSelect].forEach((select) => {
    if (!select) return;
    const sync = () => {
      const normalized = normalizePackageData({
        id: card.dataset.packageId,
        color: getPackageFieldValue(card, "color"),
        callsign: getPackageFieldValue(card, "callsign"),
        packageName: getPackageFieldValue(card, "packageName"),
        mission: getPackageFieldValue(card, "mission"),
        aircraftCount: getPackageFieldValue(card, "aircraftCount"),
        aircraftType: getPackageFieldValue(card, "aircraftType"),
        departure: getPackageFieldValue(card, "departure"),
        leader: getPackageFieldValue(card, "leader"),
        wingmen: getPackageFieldValue(card, "wingmen"),
        intra: getPackageFieldValue(card, "intra"),
        destination: getPackageFieldValue(card, "destination")
      });
      applyCardData(normalized);
      saveCurrentMission();
    };
    select.addEventListener("change", sync);
    select.addEventListener("blur", sync);
  });

  const addWingmanBtn = card.querySelector('[data-package-action="add-wingman"]');
  if (addWingmanBtn) {
    addWingmanBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      fields.wingmenBuilder?.appendChild(createWingmanBuilderRow(card, ""));
      syncWingmenBuilderOutput(card);
      saveCurrentMission();
    });
  }

  if (fields.missionSelect) {
    fields.missionSelect.addEventListener("input", () => {
      fields.missionSelect.value = normalizeTaskValue(fields.missionSelect.value);
      syncPackageTaskView(card);
      saveCurrentMission();
    });

    fields.missionSelect.addEventListener("change", () => {
      fields.missionSelect.value = normalizeTaskValue(fields.missionSelect.value);
      syncPackageTaskView(card);
      saveCurrentMission();
    });
  }

  if (fields.packageNameSelect) {
    fields.packageNameSelect.addEventListener("input", () => {
      fields.packageNameSelect.value = normalizePackageNameValue(fields.packageNameSelect.value);
      syncPackageNameView(card);
      saveCurrentMission();
    });

    fields.packageNameSelect.addEventListener("change", () => {
      fields.packageNameSelect.value = normalizePackageNameValue(fields.packageNameSelect.value);
      syncPackageNameView(card);
      saveCurrentMission();
    });
  }

  if (fields.color) {
    fields.color.addEventListener("input", () => {
      const colorValue = /^#[0-9a-fA-F]{6}$/.test(fields.color.value) ? fields.color.value : getRandomPackageColor();
      fields.color.value = colorValue;
      card.style.setProperty("--package-accent", colorValue);
      saveCurrentMission();
    });

    fields.color.addEventListener("change", () => {
      const colorValue = /^#[0-9a-fA-F]{6}$/.test(fields.color.value) ? fields.color.value : getRandomPackageColor();
      fields.color.value = colorValue;
      card.style.setProperty("--package-accent", colorValue);
      saveCurrentMission();
    });
  }

  const randomBtn = card.querySelector('[data-package-action="random-color"]');
  if (randomBtn) {
    randomBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (fields.color) {
        fields.color.value = getRandomPackageColor();
        card.style.setProperty("--package-accent", fields.color.value);
      }

      saveCurrentMission();
    });
  }

  const deleteBtn = card.querySelector('[data-package-action="delete"]');
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      card.remove();
      saveCurrentMission();
    });
  }

  updatePackageEditability(card);
  return card;
}

function renderPackages(packages = []) {
  if (!packageGrid) return;

  packageGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  normalizePackagesArray(packages).forEach((pkg) => {
    const card = createPackageCard(pkg);
    if (card) fragment.appendChild(card);
  });

  packageGrid.appendChild(fragment);
}

function addPackage() {
  if (!packageGrid) return;

  const card = createPackageCard(createDefaultPackage());
  if (!card) return;

  packageGrid.appendChild(card);
  updatePackageEditability(card);
  saveCurrentMission();
}

/* =========================================================
   ATO
========================================================= */

function getDefaultAtoRoute() {
  return ATO_ROUTE_DEFAULTS.map((row) => ({ ...row }));
}

function getDefaultAtoComm() {
  return ATO_COMM_DEFAULTS.map((row) => ({ ...row }));
}

function getDefaultAtoSupportTiles() {
  return [
    { title: "C2", description: "", freq: "" },
    { title: "AWACS", description: "", freq: "" },
    { title: "TANKER", description: "", freq: "" },
    { title: "ESCORT", description: "", freq: "" },
    { title: "SEAD", description: "", freq: "" },
    { title: "PACKAGE", description: "", freq: "" }
  ];
}

function createDefaultAto(packageData = {}) {
  const pkg = normalizePackageData(packageData);

  return {
    id: generateUid("ato"),
    packageId: pkg.id || "",
    collapsed: true,
    inherited: {
      color: pkg.color,
      callsign: pkg.callsign,
      packageName: pkg.packageName,
      mission: pkg.mission,
      aircraftCount: pkg.aircraftCount,
      aircraftType: pkg.aircraftType,
      leader: pkg.leader,
      wingmen: pkg.wingmen,
      intra: pkg.intra,
      departure: pkg.departure,
      destination: pkg.destination,
      operationName: "",
      startTime: "",
      totTime: "",
      weatherSummary: "--"
    },
    atoDay: "",
    opord: "",
    primaryTask: "",
    primaryTaskNote: "",
    secondaryTask: "",
    secondaryTaskNote: "",
    packageSupport: "",
    targetName: "",
    targetDetails: "",
    stepTime: "",
    launchTime: "",
    totTime: "",
    recoveryTime: "",
    launchDetails: "",
    recoveryDetails: "",
    packageFrequencyNote: "",
    configNote: "",
    fuelPlan: "",
    fuelNote: "",
    loadout: "",
    loadoutNote: "",
    divert: "",
    diverts: [],
    divertNote: "",
    threats: "",
    roe: "",
    emcon: "",
    abortCriteria: "",
    pushTime: "",
    pushNote: "",
    pushNet: "",
    pushNlt: "",
    totNote: "",
    totNet: "",
    totNlt: "",
    iffModes: "",
    iffNote: "",
    datalink: "",
    datalinkNote: "",
    laser: "",
    laserNote: "",
    authentication: "",
    authenticationReply: "",
    supportEscort: "",
    supportEscortNote: "",
    supportSead: "",
    supportSeadNote: "",
    supportTanker: "",
    supportTankerNote: "",
    supportC2: "",
    supportC2Note: "",
    totalDistance: "",
    estFlightTime: "",
    comm: getDefaultAtoComm(),
    supportTiles: getDefaultAtoSupportTiles(),
    route: getDefaultAtoRoute(),
    pilotNotes: "",
    commanderNotes: ""
  };
}

function sanitizeAtoTime(value) {
  return sanitizeTimeInput(value);
}

function formatZuluTime(value) {
  const digits = sanitizeTimeInput(value);
  if (digits.length < 4) return "--:--Z";
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}Z`;
}

function formatShortTime(value) {
  const digits = sanitizeTimeInput(value);
  if (digits.length < 4) return "--:--";
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
}

function sanitizeAtoValue(fieldName, value) {
  const text = String(value || "");

  if (fieldName === "atoDay") {
    return sanitizeDigits(text, 3);
  }

  if (["stepTime", "launchTime", "totTime", "recoveryTime", "pushTime", "pushNet", "pushNlt", "totNet", "totNlt"].includes(fieldName)) {
    return sanitizeAtoTime(text);
  }

  if ([
    "opord",
    "targetName",
    "divert",
    "iffModes",
    "datalink",
    "laser",
    "authentication",
    "authenticationReply",
    "supportEscort",
    "supportSead",
    "supportTanker",
    "supportC2"
  ].includes(fieldName)) {
    return sanitizeUpperText(text, 48);
  }

  if ([
    "primaryTask",
    "secondaryTask",
    "packageSupport",
    "launchDetails",
    "recoveryDetails",
    "packageFrequencyNote",
    "configNote",
    "fuelPlan",
    "fuelNote",
    "loadout",
    "loadoutNote",
    "divertNote",
    "pushNote",
    "pushNet",
    "pushNlt",
    "totNote",
    "totNet",
    "totNlt",
    "iffNote",
    "datalinkNote",
    "laserNote",
    "supportEscortNote",
    "supportSeadNote",
    "supportTankerNote",
    "supportC2Note",
    "targetDetails",
    "totalDistance"
  ].includes(fieldName)) {
    return sanitizeFreeText(text, 120);
  }

  if (fieldName === "estFlightTime") {
    return sanitizeTimeInput(text);
  }

  if ([
    "primaryTaskNote",
    "secondaryTaskNote",
    "threats",
    "roe",
    "emcon",
    "abortCriteria",
    "pilotNotes",
    "commanderNotes"
  ].includes(fieldName)) {
    return sanitizeMultilineText(text, 500);
  }

  return sanitizeFreeText(text, 120);
}

function normalizeAtoDiverts(diverts = [], legacyDivert = "") {
  const source = Array.isArray(diverts) && diverts.length
    ? diverts
    : (legacyDivert ? [legacyDivert] : []);

  return source
    .map((entry) => sanitizeUpperText(entry || "", 8))
    .filter(Boolean);
}

function sanitizeAtoRouteRow(row = {}, fallback = {}) {
  return {
    wp: sanitizeUpperText(row.wp || fallback.wp || "", 24),
    time: sanitizeTimeInput(row.time || fallback.time || ""),
    dist: sanitizeFreeText(row.dist || fallback.dist || "", 20),
    desc: sanitizeFreeText(row.desc || fallback.desc || "", 120),
    coords: sanitizeMultilineText(row.coords || fallback.coords || "", 180),
    alt: sanitizeFreeText(row.alt || fallback.alt || "", 20),
    spd: sanitizeFreeText(row.spd || fallback.spd || "", 20),
    hdg: sanitizeDigits(String(row.hdg || fallback.hdg || ""), 3),
    beacon: sanitizeUpperText(row.beacon || fallback.beacon || "", 24),
    etaSeconds: Number.isFinite(Number(row.etaSeconds)) ? Number(row.etaSeconds) : null
  };
}

function parseAtoRouteCoordinatesDisplay(value) {
  const lines = sanitizeMultilineText(value || "", 180)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    lldm: lines[0] || "",
    dd: lines[1] || "",
    mgrs: lines[2] || ""
  };
}

function parseDecimalCoordinatePair(value = "") {
  const text = String(value || "").trim();
  if (!text) return null;

  const normalized = text
    .replace(/,/g, " ")
    .replace(/;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const matches = normalized.match(/[-+]?\d+(?:\.\d+)?/g);
  if (!matches || matches.length < 2) return null;

  const lat = Number(matches[0]);
  const lon = Number(matches[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;

  return { lat, lon };
}

function parseDegreeMinuteCoordinatePair(value = "") {
  const text = String(value || "").toUpperCase().trim();
  if (!text) return null;

  const regex = /([NS])\s*(\d{1,2})[^0-9]+(\d{1,2}(?:\.\d+)?)\D+([EW])\s*(\d{1,3})[^0-9]+(\d{1,2}(?:\.\d+)?)/;
  const match = text.match(regex);
  if (!match) return null;

  const [, latHem, latDegRaw, latMinRaw, lonHem, lonDegRaw, lonMinRaw] = match;
  const latDeg = Number(latDegRaw);
  const latMin = Number(latMinRaw);
  const lonDeg = Number(lonDegRaw);
  const lonMin = Number(lonMinRaw);
  if (![latDeg, latMin, lonDeg, lonMin].every(Number.isFinite)) return null;

  const lat = (latDeg + (latMin / 60)) * (latHem === "S" ? -1 : 1);
  const lon = (lonDeg + (lonMin / 60)) * (lonHem === "W" ? -1 : 1);
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;

  return { lat, lon };
}

function getAtoRouteLatLon(row = {}) {
  const coords = parseAtoRouteCoordinatesDisplay(row.coords || "");
  return (
    parseDecimalCoordinatePair(coords.dd) ||
    parseDegreeMinuteCoordinatePair(coords.lldm) ||
    parseDecimalCoordinatePair(coords.lldm) ||
    null
  );
}

function getDistanceNmBetweenLatLon(start, end) {
  if (!start || !end) return null;

  const earthRadiusNm = 3440.065;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const dLat = toRadians(end.lat - start.lat);
  const dLon = toRadians(end.lon - start.lon);
  const lat1 = toRadians(start.lat);
  const lat2 = toRadians(end.lat);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusNm * c;
}

function getAtoLegDistanceNm(route = [], index = 0) {
  if (!Array.isArray(route) || index <= 0) return null;
  const previous = getAtoRouteLatLon(route[index - 1]);
  const current = getAtoRouteLatLon(route[index]);
  return getDistanceNmBetweenLatLon(previous, current);
}

function parseDistanceNmNumber(value) {
  const text = String(value || "").trim();
  if (!text) return null;

  const match = text.match(/[-+]?\d+(?:[.,]\d+)?/);
  if (!match) return null;

  const numeric = Number(match[0].replace(",", "."));
  return Number.isFinite(numeric) ? numeric : null;
}

function formatDistanceNmCompact(value) {
  if (!Number.isFinite(value)) return "--";
  return String(Math.round(value));
}

function getAtoTotalRouteDistanceNm(route = []) {
  if (!Array.isArray(route) || route.length < 2) return null;

  let total = 0;
  let hasLeg = false;

  for (let index = 1; index < route.length; index += 1) {
    const legDistance = getAtoLegDistanceNm(route, index);
    if (!Number.isFinite(legDistance)) continue;
    total += legDistance;
    hasLeg = true;
  }

  return hasLeg ? total : null;
}

function getAtoLastLegDistanceNm(route = []) {
  if (!Array.isArray(route) || route.length < 2) return null;

  for (let index = route.length - 1; index > 0; index -= 1) {
    const legDistance = getAtoLegDistanceNm(route, index);
    if (Number.isFinite(legDistance)) {
      return legDistance;
    }
  }

  return null;
}

function getAtoRouteLegDistanceNm(route = [], index = 0, row = null) {
  const manualDistance = parseDistanceNmNumber(row?.dist || "");
  if (Number.isFinite(manualDistance)) {
    return manualDistance;
  }

  return getAtoLegDistanceNm(route, index);
}

function getAtoRouteCumulativeDistanceNm(route = [], index = 0) {
  if (!Array.isArray(route) || index < 0) return null;

  let total = 0;
  let hasDistance = false;

  for (let currentIndex = 0; currentIndex <= index; currentIndex += 1) {
    const legDistance = getAtoRouteLegDistanceNm(route, currentIndex, route[currentIndex]);
    if (!Number.isFinite(legDistance)) continue;
    total += legDistance;
    hasDistance = true;
  }

  return hasDistance ? total : null;
}

function getAtoTotalDistanceNm(data = {}) {
  const route = Array.isArray(data.route) ? data.route : [];
  const manualTotalDistance = parseDistanceNmNumber(data.totalDistance);
  if (Number.isFinite(manualTotalDistance)) {
    return manualTotalDistance;
  }

  const cumulativeDistance = getAtoRouteCumulativeDistanceNm(route, route.length - 1);
  return Number.isFinite(cumulativeDistance) ? cumulativeDistance : null;
}

function getAtoDistancePair(data = {}) {
  const route = Array.isArray(data.route) ? data.route : [];
  const lastLegDistance = getAtoLastLegDistanceNm(route);

  return {
    lastLegDistance,
    totalDistance: getAtoTotalDistanceNm(data)
  };
}

function formatAtoDistancePair(data = {}, includeUnit = false) {
  const { lastLegDistance, totalDistance } = getAtoDistancePair(data);
  const formatted = `${formatDistanceNmCompact(lastLegDistance)}/${formatDistanceNmCompact(totalDistance)}`;
  return includeUnit ? `${formatted} nm` : formatted;
}

function sanitizeAtoCommRow(row = {}, fallback = {}) {
  return {
    name: sanitizeUpperText(row.name || fallback.name || "", 24),
    description: sanitizeFreeText(row.description || fallback.description || "", 60),
    freq: sanitizeFreeText(row.freq || fallback.freq || "", 40)
  };
}

function getAirfieldCommFrequency(code = "", airfields = getCurrentAirfieldsFromDom()) {
  const normalizedCode = sanitizeUpperText(code || "", 8);
  if (!normalizedCode) return "";

  const airfield = getAirfieldMap(airfields).get(normalizedCode);
  if (!airfield) return "";

  return [
    airfield.vhf ? `VHF ${airfield.vhf}` : "",
    airfield.uhf ? `UHF ${airfield.uhf}` : ""
  ].filter(Boolean).join(" · ");
}

function formatCommFrequencyDisplay(value = "") {
  const text = String(value || "").trim();
  if (!text) return "--";
  return text.split("·").map((part) => part.trim()).filter(Boolean).join("\n");
}

function isDerivedAtoCommName(name = "") {
  const normalized = sanitizeUpperText(name || "", 24);
  return normalized === "DEPART"
    || normalized === "ARRIVAL"
    || /^DIVERT(?:\s+\d+)?$/.test(normalized);
}

function buildDerivedAtoCommRows(atoData, airfields = getCurrentAirfieldsFromDom()) {
  const ato = normalizeAtoData(atoData);
  const departureCode = ato.launchDetails || ato.inherited.departure || "";
  const arrivalCode = ato.recoveryDetails || ato.inherited.destination || "";
  const divertCodes = ato.diverts.filter(Boolean);

  const rows = [
    sanitizeAtoCommRow({
      name: "DEPART",
      description: departureCode || "Departure",
      freq: getAirfieldCommFrequency(departureCode, airfields)
    }),
    sanitizeAtoCommRow({
      name: "ARRIVAL",
      description: arrivalCode || "Arrival",
      freq: getAirfieldCommFrequency(arrivalCode, airfields)
    })
  ];

  divertCodes.forEach((code, index) => {
    rows.push(sanitizeAtoCommRow({
      name: divertCodes.length > 1 ? `DIVERT ${index + 1}` : "DIVERT",
      description: code || "Divert",
      freq: getAirfieldCommFrequency(code, airfields)
    }));
  });

  if (!divertCodes.length) {
    rows.push(sanitizeAtoCommRow({
      name: "DIVERT",
      description: "Divert",
      freq: ""
    }));
  }

  return rows;
}

function syncAtoCommWithAirfields(atoData, airfields = getCurrentAirfieldsFromDom()) {
  const ato = normalizeAtoData(atoData);
  const extras = ato.comm.filter((row) => !isDerivedAtoCommName(row?.name || ""));
  return {
    ...ato,
    comm: [
      ...buildDerivedAtoCommRows(ato, airfields),
      ...extras
    ]
  };
}

function sanitizeAtoSupportTile(tile = {}, fallback = {}) {
  return {
    title: sanitizeUpperText(tile.title || fallback.title || "", 24),
    description: sanitizeFreeText(tile.description || fallback.description || "", 120),
    freq: sanitizeFreeText(tile.freq || fallback.freq || "", 16)
  };
}

function ensurePrimarySupportTiles(tiles = []) {
  const normalizedTiles = Array.isArray(tiles) ? tiles.map((tile) => sanitizeAtoSupportTile(tile)) : [];
  const existingTitles = new Set(normalizedTiles.map((tile) => tile.title).filter(Boolean));
  const completed = [...normalizedTiles];

  ATO_SUPPORT_PRIMARY_ORDER.forEach((title) => {
    if (!existingTitles.has(title)) {
      completed.push(sanitizeAtoSupportTile({ title, description: "", freq: "" }));
    }
  });

  return completed;
}

function getLegacyAtoSupportTiles(ato = {}) {
  return [
    ato.supportC2 || ato.supportC2Note ? { title: "C2", description: ato.supportC2Note || "", freq: ato.supportC2 || "" } : null,
    ato.supportAwacs || ato.supportAwacsNote ? { title: "AWACS", description: ato.supportAwacsNote || "", freq: ato.supportAwacs || "" } : null,
    ato.supportEscort || ato.supportEscortNote ? { title: "ESCORT", description: ato.supportEscortNote || "", freq: ato.supportEscort || "" } : null,
    ato.supportSead || ato.supportSeadNote ? { title: "SEAD", description: ato.supportSeadNote || "", freq: ato.supportSead || "" } : null,
    ato.supportTanker || ato.supportTankerNote ? { title: "TANKER", description: ato.supportTankerNote || "", freq: ato.supportTanker || "" } : null
  ]
    .filter(Boolean)
    .map((tile) => sanitizeAtoSupportTile(tile));
}

function getInheritedWeatherSummary() {
  const weather = collectWeatherDataFromInputs();
  const parts = [];

  if (weather.layers[0]?.cover && weather.layers[0]?.base) {
    parts.push(`${weather.layers[0].cover} ${formatFeet(weather.layers[0].base)} ft`);
  }

  if (weather.windDirection || weather.windSpeed) {
    parts.push(`${weather.windDirection || "---"}/${weather.windSpeed || "--"} kts`);
  }

  if (weather.qnhInHg) {
    parts.push(`QNH ${weather.qnhInHg}`);
  }

  return parts.join(" · ") || "--";
}

function buildInheritedAtoData(packageData) {
  const pkg = normalizePackageData(packageData);
  const overview = collectOverviewDataFromInputs();

  return {
    color: pkg.color,
    callsign: pkg.callsign,
    packageName: pkg.packageName,
    mission: pkg.mission,
    aircraftCount: pkg.aircraftCount,
    aircraftType: pkg.aircraftType,
    leader: pkg.leader,
    wingmen: pkg.wingmen,
    intra: pkg.intra,
    departure: pkg.departure,
    destination: pkg.destination,
    operationName: sanitizeUpperText(overview.operationName || "", 48),
    startTime: overview.startTime || "",
    totTime: overview.totTime || "",
    weatherSummary: getInheritedWeatherSummary()
  };
}

function normalizeAtoData(ato = {}) {
  const defaults = createDefaultAto();
  const inheritedSource = ato.inherited || {};
  const routeSource = Array.isArray(ato.route) && ato.route.length > 0 ? ato.route : defaults.route;

  return {
    ...defaults,
    ...ato,
    packageId: ato.packageId || "",
    collapsed: typeof ato.collapsed === "boolean" ? ato.collapsed : true,
    inherited: {
      ...defaults.inherited,
      color: /^#[0-9a-fA-F]{6}$/.test(String(inheritedSource.color || "")) ? inheritedSource.color : defaults.inherited.color,
      callsign: sanitizeUpperText(inheritedSource.callsign || "", 24),
      packageName: normalizePackageNameValue(inheritedSource.packageName || ""),
      mission: normalizeTaskValue(inheritedSource.mission || ""),
      aircraftCount: sanitizeDigits(inheritedSource.aircraftCount || "", 2),
      aircraftType: sanitizeUpperText(inheritedSource.aircraftType || "", 24),
      leader: sanitizeFreeText(inheritedSource.leader || "", 40),
      wingmen: sanitizeMultilineText(inheritedSource.wingmen || "", 400),
      intra: sanitizeFreeText(inheritedSource.intra || "", 20),
      departure: sanitizeUpperText(inheritedSource.departure || "", 24),
      destination: sanitizeUpperText(inheritedSource.destination || "", 24),
      operationName: sanitizeUpperText(inheritedSource.operationName || "", 48),
      startTime: sanitizeTimeInput(inheritedSource.startTime || ""),
      totTime: sanitizeTimeInput(inheritedSource.totTime || ""),
      weatherSummary: sanitizeFreeText(inheritedSource.weatherSummary || "", 140)
    },
    atoDay: sanitizeDigits(ato.atoDay || "", 3),
    opord: sanitizeAtoValue("opord", ato.opord),
    primaryTask: sanitizeAtoValue("primaryTask", ato.primaryTask),
    primaryTaskNote: sanitizeAtoValue("primaryTaskNote", ato.primaryTaskNote),
    secondaryTask: sanitizeAtoValue("secondaryTask", ato.secondaryTask),
    secondaryTaskNote: sanitizeAtoValue("secondaryTaskNote", ato.secondaryTaskNote),
    packageSupport: sanitizeAtoValue("packageSupport", ato.packageSupport),
    targetName: sanitizeAtoValue("targetName", ato.targetName),
    targetDetails: sanitizeAtoValue("targetDetails", ato.targetDetails),
    stepTime: sanitizeAtoValue("stepTime", ato.stepTime),
    launchTime: sanitizeAtoValue("launchTime", ato.launchTime),
    totTime: sanitizeAtoValue("totTime", ato.totTime),
    recoveryTime: sanitizeAtoValue("recoveryTime", ato.recoveryTime),
    launchDetails: sanitizeAtoValue("launchDetails", ato.launchDetails),
    recoveryDetails: sanitizeAtoValue("recoveryDetails", ato.recoveryDetails),
    packageFrequencyNote: sanitizeAtoValue("packageFrequencyNote", ato.packageFrequencyNote),
    configNote: sanitizeAtoValue("configNote", ato.configNote),
    fuelPlan: sanitizeAtoValue("fuelPlan", ato.fuelPlan),
    fuelNote: sanitizeAtoValue("fuelNote", ato.fuelNote),
    loadout: sanitizeAtoValue("loadout", ato.loadout),
    loadoutNote: sanitizeAtoValue("loadoutNote", ato.loadoutNote),
    divert: sanitizeAtoValue("divert", ato.divert),
    diverts: normalizeAtoDiverts(ato.diverts, ato.divert),
    divertNote: sanitizeAtoValue("divertNote", ato.divertNote),
    threats: sanitizeAtoValue("threats", ato.threats),
    roe: sanitizeAtoValue("roe", ato.roe),
    emcon: sanitizeAtoValue("emcon", ato.emcon),
    abortCriteria: sanitizeAtoValue("abortCriteria", ato.abortCriteria),
    pushTime: sanitizeAtoValue("pushTime", ato.pushTime),
    pushNote: sanitizeAtoValue("pushNote", ato.pushNote),
    pushNet: sanitizeAtoValue("pushNet", ato.pushNet),
    pushNlt: sanitizeAtoValue("pushNlt", ato.pushNlt),
    totNote: sanitizeAtoValue("totNote", ato.totNote),
    totNet: sanitizeAtoValue("totNet", ato.totNet),
    totNlt: sanitizeAtoValue("totNlt", ato.totNlt),
    iffModes: sanitizeAtoValue("iffModes", ato.iffModes),
    iffNote: sanitizeAtoValue("iffNote", ato.iffNote),
    datalink: sanitizeAtoValue("datalink", ato.datalink),
    datalinkNote: sanitizeAtoValue("datalinkNote", ato.datalinkNote),
    laser: sanitizeAtoValue("laser", ato.laser),
    laserNote: sanitizeAtoValue("laserNote", ato.laserNote),
    authentication: sanitizeAtoValue("authentication", ato.authentication),
    authenticationReply: sanitizeAtoValue("authenticationReply", ato.authenticationReply),
    supportEscort: sanitizeAtoValue("supportEscort", ato.supportEscort),
    supportEscortNote: sanitizeAtoValue("supportEscortNote", ato.supportEscortNote),
    supportSead: sanitizeAtoValue("supportSead", ato.supportSead),
    supportSeadNote: sanitizeAtoValue("supportSeadNote", ato.supportSeadNote),
    supportTanker: sanitizeAtoValue("supportTanker", ato.supportTanker),
    supportTankerNote: sanitizeAtoValue("supportTankerNote", ato.supportTankerNote),
    supportC2: sanitizeAtoValue("supportC2", ato.supportC2),
    supportC2Note: sanitizeAtoValue("supportC2Note", ato.supportC2Note),
    totalDistance: sanitizeAtoValue("totalDistance", ato.totalDistance),
    estFlightTime: sanitizeAtoValue("estFlightTime", ato.estFlightTime),
    comm: (
      Array.isArray(ato.comm) && ato.comm.length
        ? ato.comm
        : defaults.comm
    ).map((row, index) => sanitizeAtoCommRow(row, defaults.comm[index] || { name: `NET ${index + 1}`, description: "", freq: "" })),
    supportTiles: ensurePrimarySupportTiles((
      Array.isArray(ato.supportTiles) && ato.supportTiles.length
        ? ato.supportTiles
        : getLegacyAtoSupportTiles(ato).length
          ? getLegacyAtoSupportTiles(ato)
          : defaults.supportTiles
    )).map((tile) => sanitizeAtoSupportTile(tile)),
    route: routeSource.map((row, index) => sanitizeAtoRouteRow(row, { wp: `WP${index + 1}`, desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" })),
    pilotNotes: sanitizeAtoValue("pilotNotes", ato.pilotNotes),
    commanderNotes: sanitizeAtoValue("commanderNotes", ato.commanderNotes)
  };
}

function normalizeAtosArray(atos) {
  if (!Array.isArray(atos)) return [];
  return atos.map(normalizeAtoData);
}

function syncSingleAtoFromPackage(existingAto, packageData) {
  const ato = normalizeAtoData(existingAto || createDefaultAto(packageData));
  ato.packageId = packageData.id || "";
  ato.inherited = buildInheritedAtoData(packageData);
  if (!ato.totTime) {
    ato.totTime = ato.inherited.totTime || "";
  }
  return ato;
}

function buildAtoCardsFromPackages(existingAtos = []) {
  const existingByPackageId = new Map(
    normalizeAtosArray(existingAtos)
      .filter((ato) => ato.packageId)
      .map((ato) => [ato.packageId, ato])
  );

  return getCurrentPackagesFromDom().map((pkg) => syncSingleAtoFromPackage(existingByPackageId.get(pkg.id), pkg));
}

function buildAtoAirfieldSummaryLines(atoData, airfields = getCurrentAirfieldsFromDom()) {
  const ato = normalizeAtoData(atoData);
  const lines = [];

  if (ato.launchDetails || ato.inherited.departure) {
    lines.push(`DEP  ${formatAirfieldLine(ato.launchDetails || ato.inherited.departure, airfields)}`);
  }

  if (ato.recoveryDetails || ato.inherited.destination) {
    lines.push(`ARR  ${formatAirfieldLine(ato.recoveryDetails || ato.inherited.destination, airfields)}`);
  }

  if (ato.diverts.length) {
    ato.diverts.forEach((code, index) => {
      lines.push(`DIV${String(index + 1).padStart(2, "0")}  ${formatAirfieldLine(code, airfields)}`);
    });
  }

  return lines;
}

function createAtoDivertRow(card, value = "", airfields = getCurrentAirfieldsFromDom()) {
  const row = document.createElement("div");
  row.className = "ato-divert-row";
  row.innerHTML = `
    <select class="field-input field-select" data-role="divert-select"></select>
    <button class="mini-action-btn package-delete-btn" type="button">Retirer</button>
  `;

  const select = row.querySelector('[data-role="divert-select"]');
  const removeBtn = row.querySelector(".package-delete-btn");

  populateAirfieldSelect(select, value, airfields, "Divert");

  const sync = () => {
    card._atoData = collectAtoDataFromCard(card);
    updateAtoCardViews(card);
    saveCurrentMission();
  };

  select.addEventListener("change", sync);
  select.addEventListener("blur", sync);
  removeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    row.remove();
    sync();
  });

  return row;
}

function renderAtoDivertRows(card, airfields = getCurrentAirfieldsFromDom()) {
  const builder = card?._atoFields?.statics?.divertBuilder;
  if (!builder) return;

  const values = normalizeAtoData(card._atoData || {}).diverts;
  builder.innerHTML = "";
  const rows = values.length ? values : [""];
  rows.forEach((value) => builder.appendChild(createAtoDivertRow(card, value, airfields)));
}

function bindAtoAirfieldCardControls(card, airfields = getCurrentAirfieldsFromDom()) {
  if (!card) return;

  const data = normalizeAtoData(card._atoData || {});
  Array.from(card.querySelectorAll('[data-role="ato-airfield-select"]')).forEach((select) => {
    const kind = select.dataset.kind || "";
    const index = Number(select.dataset.index || -1);
    const currentValue = kind === "launchDetails"
      ? (data.launchDetails || data.inherited.departure)
      : kind === "recoveryDetails"
        ? (data.recoveryDetails || data.inherited.destination)
        : (Number.isInteger(index) && index >= 0 ? (data.diverts[index] || "") : "");

    populateAirfieldSelect(select, currentValue, airfields, kind === "launchDetails" ? "Departure" : kind === "recoveryDetails" ? "Arrival" : "Divert");

    if (select.dataset.bound === "true") return;
    const commit = () => {
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    };
    select.addEventListener("change", commit);
    select.addEventListener("blur", commit);
    select.dataset.bound = "true";
  });

  Array.from(card.querySelectorAll('[data-role="remove-divert-card"]')).forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      button.closest(".ato-airfield-card")?.remove();
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    });
    button.dataset.bound = "true";
  });
}

function refreshPackageAirfieldControls(card, airfields = getCurrentAirfieldsFromDom()) {
  if (!card?._packageFields) return;
  const departure = getPackageFieldValue(card, "departure");
  const destination = getPackageFieldValue(card, "destination");
  populateAirfieldSelect(card._packageFields.departureSelect, departure, airfields, "Departure");
  populateAirfieldSelect(card._packageFields.destinationSelect, destination, airfields, "Destination");
  if (card._packageFields.departureView) {
    card._packageFields.departureView.textContent = departure || "LOCATION";
  }
  if (card._packageFields.destinationView) {
    card._packageFields.destinationView.textContent = destination || "DESTINATION";
  }
}

function refreshAtoAirfieldControls(card, airfields = getCurrentAirfieldsFromDom()) {
  if (!card?._atoFields) return;
  bindAtoAirfieldCardControls(card, airfields);
}

function refreshAirfieldDependentUi() {
  const airfields = getCurrentAirfieldsFromDom();

  if (packageGrid) {
    Array.from(packageGrid.querySelectorAll(".package-card")).forEach((card) => {
      refreshPackageAirfieldControls(card, airfields);
    });
  }

  if (atoGrid) {
    Array.from(atoGrid.querySelectorAll(".ato-card")).forEach((card) => {
      if (!card._atoData) return;
      card._atoData = collectAtoDataFromCard(card);
      refreshAtoAirfieldControls(card, airfields);
      updateAtoCardViews(card);
    });
  }
}

function createAtoCardTemplate() {
  const template = document.createElement("template");

  template.innerHTML = `
    <article class="ato-card is-collapsed">
      <div class="ato-card-toggle" role="button" tabindex="0" aria-expanded="false">
        <div class="ato-card-head">
          <div class="ato-eyebrow">Air Tasking Order · Flight Card</div>
          <h3 class="ato-title" data-ato-static="callsign">FLIGHT</h3>
          <div class="ato-subtitle" data-ato-static="subtitle"></div>
        </div>
        <div class="ato-summary-grid ato-summary-grid--header ato-summary-grid--header-compact">
          <div class="ato-head-box">
            <div class="ato-head-label">Task</div>
            <div class="ato-head-value" data-ato-static="mission">TASK</div>
            <div class="ato-head-sub" data-ato-static="departureHeader">DEP --</div>
          </div>
          <div class="ato-head-box">
            <div class="ato-head-label">Primary Freq</div>
            <div class="ato-head-value" data-ato-static="packageFreq"></div>
            <div class="ato-head-sub ato-head-sub-stack" data-ato-static="packageFreqSub"></div>
          </div>
        </div>
        <div class="ato-card-actions">
          <span class="ato-card-chevron" data-ato-static="chevron">+</span>
        </div>
      </div>

      <div class="ato-card-body">
        <div class="ato-board">
          <div class="ato-overview-layout">
            <div class="ato-overview-column">
              <section class="ato-section">
                <div class="ato-section-header"><h4 class="ato-section-title">Infos Package</h4><span class="ato-mini-tag">Mission Core</span></div>
                <div class="ato-kv-grid">
                  <div class="ato-kv"><div class="ato-k">Leader</div><div class="ato-v" data-ato-static="lead">--</div></div>
                  <div class="ato-kv ato-kv-tot"><div class="ato-k">TOT</div><div class="ato-s ato-s-micro" data-ato-static="totNetHeader">NET --:--</div><div class="ato-v" data-ato-static="totTime">--:--Z</div><div class="ato-s ato-s-muted" data-ato-static="totNltHeader">NLT --:--</div></div>
                  <div class="ato-kv"><div class="ato-k">Target</div><div class="ato-v ato-editable-view" data-ato-view="targetName">--</div><div class="ato-s ato-editable-view" data-ato-view="targetDetails">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="targetName" type="text" placeholder="Target" /><input class="field-input" data-ato-input="targetDetails" type="text" placeholder="Target detail" /></div></div>
                  <div class="ato-kv"><div class="ato-k">Fuel Mngmt</div><div class="ato-v ato-editable-view" data-ato-view="fuelPlan">Joker --</div><div class="ato-s ato-editable-view" data-ato-view="fuelNote">Bingo --</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="fuelPlan" type="text" placeholder="Joker" /><input class="field-input" data-ato-input="fuelNote" type="text" placeholder="Bingo" /></div></div>
                </div>
              </section>

              <section class="ato-section">
                <div class="ato-section-header"><h4 class="ato-section-title">Ident</h4><span class="ato-mini-tag">Codes / IDs</span></div>
                <div class="ato-mission-data-grid">
                  <div class="ato-mission-tile"><div class="ato-k">IFF</div><div class="ato-v" data-ato-static="iffModesBlock">MODE 1 --\nMODE 3 --</div><div class="ato-edit-field ato-edit-field-stack ato-ident-input-grid"><label class="ato-ident-input-row"><span class="ato-ident-input-label">MODE 1</span><input class="field-input" data-role="iff-mode1-input" type="text" placeholder="4012" /></label><label class="ato-ident-input-row"><span class="ato-ident-input-label">MODE 3</span><input class="field-input" data-role="iff-mode3-input" type="text" placeholder="1254" /></label></div></div>
                  <div class="ato-mission-tile"><div class="ato-k">Datalink</div><div class="ato-v ato-editable-view" data-ato-view="datalink">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="datalink" type="text" placeholder="Datalink" /></div></div>
                  <div class="ato-mission-tile"><div class="ato-k">Laser Code</div><div class="ato-v ato-editable-view" data-ato-view="laser">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="laser" type="text" placeholder="Laser code" /></div></div>
                </div>
              </section>
            </div>

            <section class="ato-section ato-section-airfield">
              <div class="ato-section-header"><h4 class="ato-section-title">Airfield</h4><span class="ato-mini-tag">DEP / ARR / DIVERT</span></div>
              <div class="ato-airfield-grid" data-ato-static="airfieldCards"></div>
              <div class="ato-route-toolbar ato-route-toolbar-airfield">
                <button class="mini-action-btn" data-ato-action="add-divert" type="button">Add Divert</button>
              </div>
            </section>
          </div>

          <section class="ato-section ato-section-full">
            <div class="ato-section-header"><h4 class="ato-section-title">Timeline</h4><span class="ato-mini-tag">Critical Times</span></div>
            <div class="ato-kv-grid ato-kv-grid-5">
              <div class="ato-kv ato-kv-timeline ato-kv-timeline-step"><div class="ato-k">STEP</div><div class="ato-v ato-editable-view" data-ato-view="stepTime">--</div><div class="ato-edit-field"><input class="field-input field-input-time" data-ato-input="stepTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /></div></div>
              <div class="ato-kv ato-kv-timeline ato-kv-timeline-mid"><div class="ato-k">T/O</div><div class="ato-v ato-editable-view" data-ato-view="launchTime">--</div><div class="ato-s" data-ato-static="takeoffIcao">DEP --</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input field-input-time" data-ato-input="launchTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /></div></div>
              <div class="ato-kv ato-kv-tot ato-kv-timeline ato-kv-timeline-stack"><div class="ato-k">PUSH</div><div class="ato-s ato-s-micro ato-editable-view" data-ato-view="pushNet">--</div><div class="ato-v ato-editable-view" data-ato-view="pushTime">--</div><div class="ato-s ato-s-muted ato-editable-view" data-ato-view="pushNlt">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input field-input-time" data-ato-input="pushTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /><input class="field-input field-input-time" data-ato-input="pushNet" type="text" inputmode="numeric" maxlength="4" placeholder="NET" /><input class="field-input field-input-time" data-ato-input="pushNlt" type="text" inputmode="numeric" maxlength="4" placeholder="NLT" /></div></div>
              <div class="ato-kv ato-kv-tot ato-kv-timeline ato-kv-timeline-stack"><div class="ato-k">TOT</div><div class="ato-s ato-s-micro ato-editable-view" data-ato-view="totNet">--</div><div class="ato-v ato-editable-view" data-ato-view="totTime">--</div><div class="ato-s ato-s-muted ato-editable-view" data-ato-view="totNlt">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input field-input-time" data-ato-input="totTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /><input class="field-input field-input-time" data-ato-input="totNet" type="text" inputmode="numeric" maxlength="4" placeholder="NET" /><input class="field-input field-input-time" data-ato-input="totNlt" type="text" inputmode="numeric" maxlength="4" placeholder="NLT" /></div></div>
              <div class="ato-kv ato-kv-timeline ato-kv-timeline-mid"><div class="ato-k">LAND</div><div class="ato-v ato-editable-view" data-ato-view="recoveryTime">--</div><div class="ato-s" data-ato-static="arrivalIcao">ARR --</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input field-input-time" data-ato-input="recoveryTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /></div></div>
            </div>
          </section>

          <section class="ato-section ato-section-full">
            <div class="ato-section-header"><h4 class="ato-section-title">Route / Profile</h4><span class="ato-mini-tag">Ingress / Egress</span></div>
            <div class="ato-route-main">
              <div class="ato-route-header">
                <div class="ato-route-header-cell">WP</div>
                <div class="ato-route-header-cell ato-route-header-cell-right">TIME</div>
                <div class="ato-route-header-cell ato-route-header-cell-right">DIST</div>
                <div class="ato-route-header-cell ato-route-header-cell-right">SPEED</div>
                <div class="ato-route-header-cell ato-route-header-cell-right">HDG</div>
                <div class="ato-route-header-cell ato-route-header-cell-right">BEACON</div>
                <div class="ato-route-header-cell ato-route-header-cell-right">ALT</div>
                <div class="ato-route-header-cell">DESC</div>
                <div class="ato-route-header-cell">COORD</div>
              </div>
              <div class="ato-route" data-ato-static="routeList"></div>
              <div class="ato-route-toolbar">
                <button class="mini-action-btn" data-ato-action="add-route" type="button">Add Waypoint</button>
              </div>
            </div>
            <div class="ato-kv-grid" style="margin-top:14px;">
              <div class="ato-kv">
                <div class="ato-k">Distance</div>
                <div class="ato-v ato-editable-view" data-ato-view="totalDistanceDetail">--</div>
                <div class="ato-edit-field"><input class="field-input" data-ato-input="totalDistance" type="text" placeholder="Total distance" /></div>
              </div>
              <div class="ato-kv">
                <div class="ato-k">EST Flight Time</div>
                <div class="ato-v ato-editable-view" data-ato-view="estFlightTimeDetail">--</div>
                <div class="ato-edit-field"><input class="field-input" data-ato-input="estFlightTime" type="text" placeholder="Estimated flight time" /></div>
              </div>
            </div>
          </section>

          <section class="ato-section ato-section-full">
            <div class="ato-section-header"><h4 class="ato-section-title">Comm Plan</h4><span class="ato-mini-tag">C2 / Radios</span></div>
            <div class="ato-comm-grid">
              <div class="ato-comm-card ato-comm-card-primary">
                <div class="ato-editable-view">
                  <div class="ato-comm-name">INTRA-FLIGHT</div>
                  <div class="ato-comm-desc ato-comm-desc-empty" data-ato-static="intraFreqMeta"></div>
                  <div class="ato-comm-freq" data-ato-static="intraFreqRows">PFREQ --</div>
                </div>
                <div class="ato-edit-field" style="margin-top:10px;">
                  <input class="field-input" data-ato-input="packageFrequencyNote" type="text" placeholder="Secondary freq" />
                </div>
              </div>
              <div class="ato-comm-grid-host" data-ato-static="commList"></div>
            </div>
            <div class="ato-route-toolbar">
              <button class="mini-action-btn" data-ato-action="add-comm" type="button">Add Comm Tile</button>
            </div>
            <div class="ato-section-header" style="margin-top:18px;"><h4 class="ato-section-title">Support Nets</h4><span class="ato-mini-tag">Tiles</span></div>
            <div class="ato-support-grid" data-ato-static="supportList"></div>
            <div class="ato-route-toolbar">
              <button class="mini-action-btn" data-ato-action="add-support" type="button">Add Tile</button>
            </div>
          </section>

        </div>
      </div>
    </article>
  `;

  return template;
}

const atoCardTemplate = createAtoCardTemplate();

function collectAtoViewElements(card) {
  return Array.from(card.querySelectorAll("[data-ato-view]")).reduce((acc, node) => {
    acc[node.dataset.atoView] = node;
    return acc;
  }, {});
}

function collectAtoInputElements(card) {
  return Array.from(card.querySelectorAll("[data-ato-input]")).reduce((acc, node) => {
    acc[node.dataset.atoInput] = node;
    return acc;
  }, {});
}

function getAtoCrewMembers(inherited) {
  const members = [];

  if (inherited.leader) {
    members.push({ role: "Lead", name: inherited.leader, meta: `${inherited.callsign || "FLIGHT"} 1-1` });
  }

  sanitizeMultilineText(inherited.wingmen || "", 400)
    .split("\n")
    .filter(Boolean)
    .forEach((name, index) => {
      members.push({ role: "Wingman", name, meta: `${inherited.callsign || "FLIGHT"} 1-${index + 2}` });
    });

  return members;
}

function getAtoTakeoffTime(data) {
  return data.launchTime || data.inherited.startTime || "";
}

function getAtoStepTime(data) {
  return data.stepTime || data.inherited.startTime || "";
}

function parseAtoIffModes(value = "") {
  const text = String(value || "").trim();
  if (!text) return { mode1: "--", mode3: "--" };

  const compact = text.replace(/\s+/g, " ");
  const mode1Match = compact.match(/(?:M1|MODE\s*1)\s*[:/-]?\s*([A-Z0-9]+)/i);
  const mode3Match = compact.match(/(?:M3|MODE\s*3)\s*[:/-]?\s*([A-Z0-9]+)/i);
  const slashParts = compact.split(/[|/]/).map((part) => part.trim()).filter(Boolean);

  return {
    mode1: mode1Match?.[1] || slashParts[0] || "--",
    mode3: mode3Match?.[1] || slashParts[1] || "--"
  };
}

function buildAtoAirfieldCardsMarkup(atoData, airfields = getCurrentAirfieldsFromDom()) {
  const ato = normalizeAtoData(atoData);
  const depCode = ato.launchDetails || ato.inherited.departure || "";
  const arrCode = ato.recoveryDetails || ato.inherited.destination || "";
  const divertCodes = ato.diverts.filter(Boolean);
  const cards = [
    { label: "DEP", code: depCode, kind: "launchDetails" },
    { label: "ARR", code: arrCode, kind: "recoveryDetails" },
    ...divertCodes.map((code, index) => ({ label: `DIVERT ${index + 1}`, code, kind: "divert", index }))
  ];

  return cards.length
    ? cards.map((entry) => `
      <div class="ato-airfield-card">
        <div class="ato-airfield-card-top">
          <div class="ato-airfield-card-label">${escapeHtml(entry.label)}</div>
          ${entry.kind === "divert" ? '<button class="mini-action-btn package-delete-btn" data-role="remove-divert-card" type="button">Retirer</button>' : ""}
        </div>
        <div class="ato-airfield-card-title">${escapeHtml(entry.code || "--")}</div>
        <div class="ato-airfield-card-meta">${buildAirfieldMetaMarkup(entry.code, airfields)}</div>
        <div class="edit-field" style="margin-top:10px;">
          <select class="field-input field-select" data-role="ato-airfield-select" data-kind="${escapeHtml(entry.kind)}" data-index="${entry.index ?? ""}"></select>
        </div>
      </div>
    `).join("")
    : `<div class="ato-airfield-card"><div class="ato-airfield-card-label">AIRFIELD</div><div class="ato-airfield-card-title">--</div><div class="ato-airfield-card-meta">Aucune donnée.</div></div>`;
}

function getAtoRouteDisplayZuluTime(startTime, row = {}) {
  const manualTime = sanitizeTimeInput(row?.time || "");
  if (manualTime) {
    return formatZuluTime(manualTime);
  }

  const missionStartMinutes = timeDigitsToMinutes(startTime);
  if (missionStartMinutes === null || !Number.isFinite(row?.etaSeconds)) {
    return "--:--Z";
  }

  return formatZuluTime(secondsToTimeDigits((missionStartMinutes * 60) + row.etaSeconds));
}

function getAtoRouteEditableTimeValue(startTime, row = {}) {
  const manualTime = sanitizeTimeInput(row?.time || "");
  if (manualTime) return manualTime;

  const missionStartMinutes = timeDigitsToMinutes(startTime);
  if (missionStartMinutes === null || !Number.isFinite(row?.etaSeconds)) {
    return "";
  }

  return secondsToTimeDigits((missionStartMinutes * 60) + row.etaSeconds);
}

function getAtoRouteDisplayDistance(route = [], index = 0, row = {}) {
  const legDistance = getAtoRouteLegDistanceNm(route, index, row);
  const cumulativeDistance = getAtoRouteCumulativeDistanceNm(route, index);
  return `${formatDistanceNmCompact(legDistance)}/${formatDistanceNmCompact(cumulativeDistance)}`;
}

function createAtoRouteRowElement(routeRow, index, route, startTime, onChange, onRemove) {
  const row = sanitizeAtoRouteRow(routeRow, { wp: `WP${index + 1}`, time: "", dist: "", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" });
  const coordsDisplay = parseAtoRouteCoordinatesDisplay(row.coords);
  const wrapper = document.createElement("div");
  wrapper.className = "ato-route-row";
  wrapper.dataset.etaSeconds = Number.isFinite(row.etaSeconds) ? String(row.etaSeconds) : "";
  wrapper.innerHTML = `
    <div class="ato-editable-view ato-route-wp" data-role="wp-view">${row.wp || "--"}</div>
    <div class="ato-editable-view ato-route-time" data-role="time-view">${getAtoRouteDisplayZuluTime(startTime, row)}</div>
    <div class="ato-editable-view ato-route-dist" data-role="dist-view">${getAtoRouteDisplayDistance(route, index, row)}</div>
    <div class="ato-editable-view ato-route-spd" data-role="spd-view">${row.spd || "--"}</div>
    <div class="ato-editable-view ato-route-hdg" data-role="hdg-view">${row.hdg || "--"}</div>
    <div class="ato-editable-view ato-route-beacon" data-role="beacon-view">${row.beacon || "--"}</div>
    <div class="ato-editable-view ato-route-alt" data-role="alt-view">${row.alt || "--"}</div>
    <div class="ato-editable-view ato-route-desc" data-role="desc-view">${row.desc || "--"}</div>
    <div class="ato-editable-view ato-route-coords" data-role="coords-view">
      <div class="ato-route-coords-ddm">${coordsDisplay.lldm || "--"}</div>
      <div class="ato-route-coords-dd">${coordsDisplay.dd || "--"}</div>
      <div class="ato-route-coords-mgrs">${coordsDisplay.mgrs || "--"}</div>
    </div>
    <div class="ato-edit-field ato-edit-field-stack ato-section-full">
      <input class="field-input" data-role="wp-input" type="text" placeholder="WP" value="${row.wp}" />
      <input class="field-input field-input-time" data-role="time-input" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" value="${getAtoRouteEditableTimeValue(startTime, row)}" />
      <input class="field-input" data-role="dist-input" type="text" placeholder="Distance" value="${row.dist || ""}" />
      <input class="field-input" data-role="spd-input" type="text" placeholder="Speed" value="${row.spd}" />
      <input class="field-input" data-role="hdg-input" type="text" placeholder="Heading" value="${row.hdg}" />
      <input class="field-input" data-role="beacon-input" type="text" placeholder="Beacon" value="${row.beacon}" />
      <input class="field-input" data-role="alt-input" type="text" placeholder="Altitude" value="${row.alt}" />
      <input class="field-input" data-role="desc-input" type="text" placeholder="Description" value="${row.desc}" />
      <textarea class="ato-textarea" data-role="coords-input" placeholder="LL DM&#10;DD&#10;MGRS">${row.coords}</textarea>
      <button class="mini-action-btn package-delete-btn" data-role="remove-route" type="button">Remove Waypoint</button>
    </div>
  `;

  const wpInput = wrapper.querySelector('[data-role="wp-input"]');
  const descInput = wrapper.querySelector('[data-role="desc-input"]');
  const coordsInput = wrapper.querySelector('[data-role="coords-input"]');
  const altInput = wrapper.querySelector('[data-role="alt-input"]');
  const spdInput = wrapper.querySelector('[data-role="spd-input"]');
  const hdgInput = wrapper.querySelector('[data-role="hdg-input"]');
  const beaconInput = wrapper.querySelector('[data-role="beacon-input"]');
  const timeInput = wrapper.querySelector('[data-role="time-input"]');
  const distInput = wrapper.querySelector('[data-role="dist-input"]');
  const removeBtn = wrapper.querySelector('[data-role="remove-route"]');

  [wpInput, timeInput, distInput, descInput, coordsInput, altInput, spdInput, hdgInput, beaconInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      if (input === wpInput) {
        input.value = sanitizeUpperTextLive(input.value, 24);
      } else if (input === timeInput) {
        input.value = sanitizeTimeInput(input.value);
      } else if (input === distInput) {
        input.value = sanitizeFreeText(input.value, 20);
      } else if (input === hdgInput) {
        input.value = sanitizeDigits(input.value, 3);
      } else if (input === beaconInput) {
        input.value = sanitizeUpperTextLive(input.value, 24);
      }
    });
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onRemove();
    });
  }

  return wrapper;
}

function renderAtoRouteRows(card) {
  const routeList = card._atoFields?.statics?.routeList;
  if (!routeList) return;

  routeList.innerHTML = "";
  card._atoRouteRows = [];

  card._atoData.route.forEach((routeRow, index) => {
    const element = createAtoRouteRowElement(
      routeRow,
      index,
      card._atoData.route,
      getAtoStepTime(card._atoData),
      () => {
        card._atoData = collectAtoDataFromCard(card);
        updateAtoCardViews(card);
        saveCurrentMission();
      },
      () => {
        card._atoData.route.splice(index, 1);
        if (card._atoData.route.length === 0) {
          card._atoData.route.push({ wp: "WP1", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" });
        }
        renderAtoRouteRows(card);
        card._atoData = collectAtoDataFromCard(card);
        updateAtoCardViews(card);
        saveCurrentMission();
      }
    );

    routeList.appendChild(element);
    card._atoRouteRows.push(element);
  });
}

function createAtoSupportTileElement(tile, index, onChange, onRemove) {
  const item = sanitizeAtoSupportTile(tile, { title: `TILE ${index + 1}`, description: "", freq: "" });
  const wrapper = document.createElement("div");
  wrapper.className = "ato-support-card";
  wrapper.innerHTML = `
    <div class="ato-editable-view">
      <div class="ato-comm-name">${item.title || "--"}</div>
      <div class="ato-comm-desc">${item.description || "--"}</div>
      <div class="ato-comm-freq">${item.freq || "--"}</div>
    </div>
    <div class="ato-edit-field ato-edit-field-stack">
      <input class="field-input" data-role="title-input" type="text" placeholder="Title" value="${item.title}" />
      <input class="field-input" data-role="description-input" type="text" placeholder="Description" value="${item.description}" />
      <input class="field-input" data-role="freq-input" type="text" placeholder="Frequency" value="${item.freq}" />
      <button class="mini-action-btn package-delete-btn" data-role="remove-support" type="button">Remove Tile</button>
    </div>
  `;

  const titleInput = wrapper.querySelector('[data-role="title-input"]');
  const descriptionInput = wrapper.querySelector('[data-role="description-input"]');
  const freqInput = wrapper.querySelector('[data-role="freq-input"]');
  const removeBtn = wrapper.querySelector('[data-role="remove-support"]');

  [titleInput, descriptionInput, freqInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      if (input === titleInput) {
        input.value = sanitizeUpperText(input.value, 24);
      }
    });
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onRemove();
    });
  }

  return wrapper;
}

function createAtoCommTileElement(tile, index, onChange, onRemove) {
  const item = sanitizeAtoCommRow(tile, { name: `NET ${index + 1}`, description: "", freq: "" });
  const wrapper = document.createElement("div");
  wrapper.className = "ato-comm-card";
  wrapper.innerHTML = `
    <div class="ato-editable-view">
      <div class="ato-comm-name">${item.name || "--"}</div>
      <div class="ato-comm-desc">${item.description || "--"}</div>
      <div class="ato-comm-freq">${escapeHtml(formatCommFrequencyDisplay(item.freq || "--"))}</div>
    </div>
    <div class="ato-edit-field ato-edit-field-stack">
      <input class="field-input" data-role="name-input" type="text" placeholder="Name" value="${item.name}" />
      <input class="field-input" data-role="description-input" type="text" placeholder="Description" value="${item.description}" />
      <input class="field-input" data-role="freq-input" type="text" placeholder="Frequency" value="${item.freq}" />
      <button class="mini-action-btn package-delete-btn" data-role="remove-comm" type="button">Remove Tile</button>
    </div>
  `;

  const nameInput = wrapper.querySelector('[data-role="name-input"]');
  const descriptionInput = wrapper.querySelector('[data-role="description-input"]');
  const freqInput = wrapper.querySelector('[data-role="freq-input"]');
  const removeBtn = wrapper.querySelector('[data-role="remove-comm"]');

  [nameInput, descriptionInput, freqInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      if (input === nameInput) {
        input.value = sanitizeUpperText(input.value, 24);
      }
    });
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onRemove();
    });
  }

  return wrapper;
}

function renderAtoCommTiles(card) {
  const commList = card._atoFields?.statics?.commList;
  if (!commList) return;

  card._atoData = syncAtoCommWithAirfields(card._atoData, getCurrentAirfieldsFromDom());
  commList.innerHTML = "";
  card._atoCommRows = [];
  const supportNames = new Set(ATO_SUPPORT_PRIMARY_ORDER);
  const orderedComm = [...card._atoData.comm]
    .filter((tile) => !supportNames.has(sanitizeUpperText(tile?.name || "", 24)))
    .sort((left, right) => {
      const leftName = sanitizeUpperText(left?.name || "", 24);
      const rightName = sanitizeUpperText(right?.name || "", 24);
      const leftIndex = ATO_COMM_PRIMARY_ORDER.indexOf(leftName);
      const rightIndex = ATO_COMM_PRIMARY_ORDER.indexOf(rightName);
      const leftRank = leftIndex === -1 ? 999 : leftIndex;
      const rightRank = rightIndex === -1 ? 999 : rightIndex;
      return leftRank - rightRank || leftName.localeCompare(rightName);
    });

  orderedComm.forEach((tile, index) => {
    const element = createAtoCommTileElement(
      tile,
      index,
      () => {
        card._atoData = collectAtoDataFromCard(card);
        updateAtoCardViews(card);
        saveCurrentMission();
      },
      () => {
        const removeIndex = card._atoData.comm.indexOf(tile);
        if (removeIndex >= 0) {
          card._atoData.comm.splice(removeIndex, 1);
        }
        renderAtoCommTiles(card);
        card._atoData = collectAtoDataFromCard(card);
        updateAtoCardViews(card);
        saveCurrentMission();
      }
    );

    commList.appendChild(element);
    card._atoCommRows.push(element);
  });
}

function renderAtoSupportTiles(card) {
  const supportList = card._atoFields?.statics?.supportList;
  if (!supportList) return;

  supportList.innerHTML = "";
  card._atoSupportRows = [];
  const orderedSupport = [...card._atoData.supportTiles].sort((left, right) => {
    const leftName = sanitizeUpperText(left?.title || "", 24);
    const rightName = sanitizeUpperText(right?.title || "", 24);
    const leftIndex = ATO_SUPPORT_PRIMARY_ORDER.indexOf(leftName);
    const rightIndex = ATO_SUPPORT_PRIMARY_ORDER.indexOf(rightName);
    const leftRank = leftIndex === -1 ? 999 : leftIndex;
    const rightRank = rightIndex === -1 ? 999 : rightIndex;
    return leftRank - rightRank || leftName.localeCompare(rightName);
  });

  orderedSupport.forEach((tile, index) => {
    const element = createAtoSupportTileElement(
      tile,
      index,
      () => {
        card._atoData = collectAtoDataFromCard(card);
        updateAtoCardViews(card);
        saveCurrentMission();
      },
      () => {
        const removeIndex = card._atoData.supportTiles.indexOf(tile);
        if (removeIndex >= 0) {
          card._atoData.supportTiles.splice(removeIndex, 1);
        }
        renderAtoSupportTiles(card);
        card._atoData = collectAtoDataFromCard(card);
        updateAtoCardViews(card);
        saveCurrentMission();
      }
    );

    supportList.appendChild(element);
    card._atoSupportRows.push(element);
  });
}

function updateAtoCardViews(card) {
  if (!card?._atoFields) return;

  const data = normalizeAtoData(card._atoData || {});
  const { views, statics } = card._atoFields;
  const inherited = data.inherited;
  const airfields = getCurrentAirfieldsFromDom();
  const iffModes = parseAtoIffModes(data.iffModes);

  card._atoData = data;
  card.style.setProperty("--ato-accent", inherited.color || getRandomPackageColor());
  card.classList.toggle("is-collapsed", data.collapsed);

  if (card._atoToggle) {
    card._atoToggle.setAttribute("aria-expanded", String(!data.collapsed));
  }

  setText(statics.callsign, inherited.callsign || "FLIGHT");
  setText(statics.mission, inherited.mission || "TASK");
  setText(statics.totTime, formatZuluTime(data.totTime));
  setText(
    statics.subtitle,
    `${inherited.packageName || "--"} · ${inherited.aircraftCount || "--"} aircraft · ${inherited.aircraftType || "--"}`
  );
  setText(statics.lead, inherited.leader || "--");
  setText(statics.departureHeader, `DEP ${data.launchDetails || inherited.departure || "--"}`);
  setText(statics.packageFreq, inherited.intra || "--");
  setText(statics.packageFreqSub, `SEC FREQ\n${data.packageFrequencyNote || "--"}`);
  setText(statics.takeoffIcao, `DEP ${data.launchDetails || inherited.departure || "--"}`);
  setText(statics.arrivalIcao, `ARR ${data.recoveryDetails || inherited.destination || "--"}`);
  setText(statics.intraFreqMeta, " ");
  if (statics.intraFreqRows) {
    statics.intraFreqRows.innerHTML = [
      `<div class="ato-comm-radio-line"><span class="ato-comm-radio-key ato-comm-radio-key-primary">PFREQ</span><span class="ato-comm-radio-value ato-comm-radio-value-primary">${escapeHtml(inherited.intra || "--")}</span></div>`,
      `<div class="ato-comm-radio-line"><span class="ato-comm-radio-key">SFREQ</span><span class="ato-comm-radio-value">${escapeHtml(data.packageFrequencyNote || "--")}</span></div>`
    ].join("");
  }
  setText(statics.totNetHeader, `NET ${formatShortTime(data.totNet)}`);
  setText(statics.totNltHeader, `NLT ${formatShortTime(data.totNlt)}`);
  setText(statics.iffModesBlock, `MODE 1 ${iffModes.mode1}\nMODE 3 ${iffModes.mode3}`);
  setText(statics.chevron, data.collapsed ? "+" : "−");
  renderAtoCommTiles(card);
  renderAtoRouteRows(card);
  renderAtoSupportTiles(card);
  if (statics.airfieldCards) {
    statics.airfieldCards.innerHTML = buildAtoAirfieldCardsMarkup(data, airfields);
  }
  refreshAtoAirfieldControls(card, airfields);

  const crewMembers = getAtoCrewMembers(inherited);
  if (statics.crewList) {
    statics.crewList.innerHTML = crewMembers.length
      ? crewMembers.map((member) => `
        <div class="ato-crew-row">
          <div class="ato-crew-role">${member.role}</div>
          <div>
            <div class="ato-v">${member.name}</div>
            <div class="ato-s">${member.meta}</div>
          </div>
        </div>
      `).join("")
      : `<div class="ato-crew-row"><div class="ato-crew-role">Flight</div><div><div class="ato-v">Aucun équipage</div><div class="ato-s">Complète le package pour alimenter cet ATO.</div></div></div>`;
  }

  Object.entries(views).forEach(([fieldName, node]) => {
    if (!node) return;

    if (["stepTime", "launchTime", "totTime", "recoveryTime", "pushTime"].includes(fieldName)) {
      if (fieldName === "stepTime") {
        setText(node, formatZuluTime(getAtoStepTime(data)));
        return;
      }
      setText(node, formatZuluTime(data[fieldName]));
      return;
    }

    if (["pushNet", "pushNlt", "totNet", "totNlt"].includes(fieldName)) {
      setText(node, formatShortTime(data[fieldName]));
      return;
    }

    if (fieldName === "divertSummary") {
      setText(node, data.diverts.join("\n") || "--");
      return;
    }

    if (fieldName === "totalDistanceDetail") {
      setText(node, formatDistanceNm(getAtoTotalDistanceNm(data)));
      return;
    }

    if (fieldName === "estFlightTimeDetail") {
      setText(node, formatFlightDuration(data.estFlightTime));
      return;
    }

    if (fieldName === "fuelPlan") {
      setText(node, `Joker ${data.fuelPlan || "--"}`);
      return;
    }

    if (fieldName === "fuelNote") {
      setText(node, `Bingo ${data.fuelNote || "--"}`);
      return;
    }

    setText(node, data[fieldName] || "--");
  });
}

function collectAtoDataFromCard(card) {
  const data = normalizeAtoData(card._atoData || {});
  const inputs = card._atoFields?.inputs || {};

  Object.entries(inputs).forEach(([fieldName, input]) => {
    if (!input) return;
    data[fieldName] = sanitizeAtoValue(fieldName, input.value);
  });

  const iffMode1Input = card.querySelector('[data-role="iff-mode1-input"]');
  const iffMode3Input = card.querySelector('[data-role="iff-mode3-input"]');
  if (iffMode1Input || iffMode3Input) {
    const mode1 = sanitizeUpperText(iffMode1Input?.value || "", 12);
    const mode3 = sanitizeUpperText(iffMode3Input?.value || "", 12);
    data.iffModes = [mode1 ? `M1 ${mode1}` : "", mode3 ? `M3 ${mode3}` : ""].filter(Boolean).join(" / ");
  }

  const depSelect = card.querySelector('[data-role="ato-airfield-select"][data-kind="launchDetails"]');
  const arrSelect = card.querySelector('[data-role="ato-airfield-select"][data-kind="recoveryDetails"]');
  if (depSelect) data.launchDetails = sanitizeUpperText(depSelect.value || "", 8);
  if (arrSelect) data.recoveryDetails = sanitizeUpperText(arrSelect.value || "", 8);

  data.diverts = Array.from(card.querySelectorAll('[data-role="ato-airfield-select"][data-kind="divert"], [data-role="divert-select"]'))
    .map((select) => sanitizeUpperText(select.value || "", 8))
    .filter(Boolean);
  data.divert = data.diverts[0] || "";

  data.route = (card._atoRouteRows || []).map((rowElement, index) => sanitizeAtoRouteRow({
    wp: rowElement.querySelector('[data-role="wp-input"]')?.value,
    time: rowElement.querySelector('[data-role="time-input"]')?.value,
    dist: rowElement.querySelector('[data-role="dist-input"]')?.value,
    desc: rowElement.querySelector('[data-role="desc-input"]')?.value,
    coords: rowElement.querySelector('[data-role="coords-input"]')?.value,
    alt: rowElement.querySelector('[data-role="alt-input"]')?.value,
    spd: rowElement.querySelector('[data-role="spd-input"]')?.value,
    hdg: rowElement.querySelector('[data-role="hdg-input"]')?.value,
    beacon: rowElement.querySelector('[data-role="beacon-input"]')?.value,
    etaSeconds: Number(rowElement.dataset.etaSeconds)
  }, { wp: `WP${index + 1}`, time: "", dist: "", desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" }));

  data.comm = (card._atoCommRows || []).map((rowElement, index) => sanitizeAtoCommRow({
    name: rowElement.querySelector('[data-role="name-input"]')?.value,
    description: rowElement.querySelector('[data-role="description-input"]')?.value,
    freq: rowElement.querySelector('[data-role="freq-input"]')?.value
  }, { name: `NET ${index + 1}`, description: "", freq: "" }));

  data.supportTiles = (card._atoSupportRows || []).map((rowElement, index) => sanitizeAtoSupportTile({
    title: rowElement.querySelector('[data-role="title-input"]')?.value,
    description: rowElement.querySelector('[data-role="description-input"]')?.value,
    freq: rowElement.querySelector('[data-role="freq-input"]')?.value
  }, { title: `TILE ${index + 1}`, description: "", freq: "" }));

  return normalizeAtoData(data);
}

function atoShouldSanitizeOnInput(fieldName) {
  return [
    "stepTime",
    "launchTime",
    "totTime",
    "recoveryTime",
    "pushTime",
    "pushNet",
    "pushNlt",
    "totNet",
    "totNlt",
    "atoDay",
    "estFlightTime"
  ].includes(fieldName);
}

function createAtoCard(atoData) {
  if (!atoCardTemplate) return null;

  const ato = normalizeAtoData(atoData);
  const fragment = atoCardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".ato-card");

  if (!card) return null;

  card.dataset.atoId = ato.id;
  card.dataset.packageId = ato.packageId || "";
  card._atoData = ato;
  card._atoToggle = card.querySelector(".ato-card-toggle");
  card._atoFields = {
    views: collectAtoViewElements(card),
    inputs: collectAtoInputElements(card),
    statics: {
      callsign: card.querySelector('[data-ato-static="callsign"]'),
      mission: card.querySelector('[data-ato-static="mission"]'),
      totTime: card.querySelector('[data-ato-static="totTime"]'),
      subtitle: card.querySelector('[data-ato-static="subtitle"]'),
      lead: card.querySelector('[data-ato-static="lead"]'),
      departureHeader: card.querySelector('[data-ato-static="departureHeader"]'),
      packageFreq: card.querySelector('[data-ato-static="packageFreq"]'),
      packageFreqSub: card.querySelector('[data-ato-static="packageFreqSub"]'),
      takeoffTime: card.querySelector('[data-ato-static="takeoffTime"]'),
      takeoffIcao: card.querySelector('[data-ato-static="takeoffIcao"]'),
      arrivalIcao: card.querySelector('[data-ato-static="arrivalIcao"]'),
      commList: card.querySelector('[data-ato-static="commList"]'),
      routeList: card.querySelector('[data-ato-static="routeList"]'),
      crewList: card.querySelector('[data-ato-static="crewList"]'),
      intraFreqMeta: card.querySelector('[data-ato-static="intraFreqMeta"]'),
      intraFreqRows: card.querySelector('[data-ato-static="intraFreqRows"]'),
      supportList: card.querySelector('[data-ato-static="supportList"]'),
      airfieldCards: card.querySelector('[data-ato-static="airfieldCards"]'),
      totNetHeader: card.querySelector('[data-ato-static="totNetHeader"]'),
      totNltHeader: card.querySelector('[data-ato-static="totNltHeader"]'),
      iffModesBlock: card.querySelector('[data-ato-static="iffModesBlock"]'),
      chevron: card.querySelector('[data-ato-static="chevron"]')
    }
  };

  Object.entries(card._atoFields.inputs).forEach(([fieldName, input]) => {
    if (!input) return;
    input.value = ato[fieldName] || "";

    const commit = () => {
      input.value = sanitizeAtoValue(fieldName, input.value);
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    };

    input.addEventListener("input", () => {
      if (atoShouldSanitizeOnInput(fieldName)) {
        input.value = sanitizeAtoValue(fieldName, input.value);
      }
    });

    input.addEventListener("change", commit);
    input.addEventListener("blur", commit);
  });

  const iffMode1Input = card.querySelector('[data-role="iff-mode1-input"]');
  const iffMode3Input = card.querySelector('[data-role="iff-mode3-input"]');
  const iffModes = parseAtoIffModes(ato.iffModes);
  if (iffMode1Input) iffMode1Input.value = iffModes.mode1 === "--" ? "" : iffModes.mode1;
  if (iffMode3Input) iffMode3Input.value = iffModes.mode3 === "--" ? "" : iffModes.mode3;
  [iffMode1Input, iffMode3Input].forEach((input) => {
    if (!input) return;
    const commit = () => {
      input.value = sanitizeUpperText(input.value, 12);
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    };
    input.addEventListener("input", () => {
      input.value = sanitizeUpperText(input.value, 12);
    });
    input.addEventListener("change", commit);
    input.addEventListener("blur", commit);
  });

  refreshAtoAirfieldControls(card, getCurrentAirfieldsFromDom());

  const toggleCard = () => {
    card._atoData = { ...collectAtoDataFromCard(card), collapsed: !card._atoData.collapsed };
    updateAtoCardViews(card);
    saveCurrentMission();
  };

  if (card._atoToggle) {
    card._atoToggle.addEventListener("click", toggleCard);
    card._atoToggle.addEventListener("keydown", (event) => {
      if (event.target !== card._atoToggle) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });
  }

  const addCommBtn = card.querySelector('[data-ato-action="add-comm"]');
  if (addCommBtn) {
    addCommBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      card._atoData.comm.push({ name: `NET ${card._atoData.comm.length + 1}`, description: "", freq: "" });
      renderAtoCommTiles(card);
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    });
  }

  const addRouteBtn = card.querySelector('[data-ato-action="add-route"]');
  if (addRouteBtn) {
    addRouteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextIndex = card._atoData.route.length + 1;
      card._atoData.route.push({ wp: `WP${nextIndex}`, desc: "", coords: "", alt: "", spd: "", hdg: "", beacon: "" });
      renderAtoRouteRows(card);
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    });
  }

  const addSupportBtn = card.querySelector('[data-ato-action="add-support"]');
  if (addSupportBtn) {
    addSupportBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      card._atoData.supportTiles.push({ title: `TILE ${card._atoData.supportTiles.length + 1}`, description: "", freq: "" });
      renderAtoSupportTiles(card);
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    });
  }

  const addDivertBtn = card.querySelector('[data-ato-action="add-divert"]');
  if (addDivertBtn) {
    addDivertBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const host = card._atoFields?.statics?.airfieldCards;
      if (!host) return;
      const wrapper = document.createElement("div");
      wrapper.className = "ato-airfield-card";
      wrapper.innerHTML = `
        <div class="ato-airfield-card-top">
          <div class="ato-airfield-card-label">DIVERT</div>
          <button class="mini-action-btn package-delete-btn" data-role="remove-divert-card" type="button">Retirer</button>
        </div>
        <div class="ato-airfield-card-title">--</div>
        <div class="ato-airfield-card-meta">Sélectionne un ICAO.</div>
        <div class="edit-field" style="margin-top:10px;">
          <select class="field-input field-select" data-role="ato-airfield-select" data-kind="divert"></select>
        </div>
      `;
      host.appendChild(wrapper);
      bindAtoAirfieldCardControls(card, getCurrentAirfieldsFromDom());
    });
  }

  updateAtoCardViews(card);
  return card;
}

function renderAtos(atos = []) {
  if (!atoGrid) return;

  atoGrid.innerHTML = "";
  const normalizedAtos = normalizeAtosArray(atos);

  if (atoEmptyState) {
    atoEmptyState.classList.toggle("is-hidden", normalizedAtos.length > 0);
  }

  const fragment = document.createDocumentFragment();
  normalizedAtos.forEach((ato) => {
    const card = createAtoCard(ato);
    if (card) fragment.appendChild(card);
  });

  atoGrid.appendChild(fragment);
}

function getCurrentAtosFromDom() {
  const cards = atoGrid ? Array.from(atoGrid.querySelectorAll(".ato-card")) : [];
  return cards.map((card) => collectAtoDataFromCard(card));
}

function updateAtoPackageLinks() {
  const atos = buildAtoCardsFromPackages(getCurrentAtosFromDom());
  renderAtos(atos);
  saveCurrentMission();
}

/* =========================================================
   ACO
========================================================= */

function createDefaultAco(packageData = {}) {
  const pkg = normalizePackageData(packageData);

  return {
    id: generateUid("aco"),
    packageId: pkg.id || "",
    collapsed: true,
    inherited: {
      color: pkg.color,
      callsign: pkg.callsign,
      packageName: pkg.packageName,
      mission: pkg.mission,
      departure: pkg.departure,
      destination: pkg.destination,
      intra: pkg.intra,
      operationName: ""
    },
    floorAltitude: "",
    transitAltitude: "",
    ceilingAltitude: "",
    airspaceArea: "",
    nfz: "",
    notes: ""
  };
}

function sanitizeAcoAltitude(value) {
  return sanitizeDigits(value, 5);
}

function sanitizeAcoValue(fieldName, value) {
  const text = String(value || "");

  if (["floorAltitude", "transitAltitude", "ceilingAltitude"].includes(fieldName)) {
    return sanitizeAcoAltitude(text);
  }

  if (["airspaceArea", "nfz"].includes(fieldName)) {
    return sanitizeUpperText(text, 40);
  }

  if (fieldName === "notes") {
    return sanitizeMultilineText(text, 400);
  }

  return sanitizeFreeText(text, 120);
}

function buildInheritedAcoData(packageData) {
  const pkg = normalizePackageData(packageData);
  const overview = collectOverviewDataFromInputs();

  return {
    color: pkg.color,
    callsign: pkg.callsign,
    packageName: pkg.packageName,
    mission: pkg.mission,
    departure: pkg.departure,
    destination: pkg.destination,
    intra: pkg.intra,
    operationName: sanitizeUpperText(overview.operationName || "", 48)
  };
}

function normalizeAcoData(aco = {}) {
  const defaults = createDefaultAco();
  const inheritedSource = aco.inherited || {};

  return {
    ...defaults,
    ...aco,
    packageId: aco.packageId || "",
    collapsed: typeof aco.collapsed === "boolean" ? aco.collapsed : true,
    inherited: {
      ...defaults.inherited,
      color: /^#[0-9a-fA-F]{6}$/.test(String(inheritedSource.color || "")) ? inheritedSource.color : defaults.inherited.color,
      callsign: sanitizeUpperText(inheritedSource.callsign || "", 24),
      packageName: normalizePackageNameValue(inheritedSource.packageName || ""),
      mission: normalizeTaskValue(inheritedSource.mission || ""),
      departure: sanitizeUpperText(inheritedSource.departure || "", 24),
      destination: sanitizeUpperText(inheritedSource.destination || "", 24),
      intra: sanitizeFreeText(inheritedSource.intra || "", 20),
      operationName: sanitizeUpperText(inheritedSource.operationName || "", 48)
    },
    floorAltitude: sanitizeAcoValue("floorAltitude", aco.floorAltitude),
    transitAltitude: sanitizeAcoValue("transitAltitude", aco.transitAltitude),
    ceilingAltitude: sanitizeAcoValue("ceilingAltitude", aco.ceilingAltitude),
    airspaceArea: sanitizeAcoValue("airspaceArea", aco.airspaceArea),
    nfz: sanitizeAcoValue("nfz", aco.nfz),
    notes: sanitizeAcoValue("notes", aco.notes)
  };
}

function normalizeAcosArray(acos) {
  if (!Array.isArray(acos)) return [];
  return acos.map(normalizeAcoData);
}

function syncSingleAcoFromPackage(existingAco, packageData) {
  const aco = normalizeAcoData(existingAco || createDefaultAco(packageData));
  aco.packageId = packageData.id || "";
  aco.inherited = buildInheritedAcoData(packageData);
  return aco;
}

function buildAcoCardsFromPackages(existingAcos = []) {
  const existingByPackageId = new Map(
    normalizeAcosArray(existingAcos)
      .filter((aco) => aco.packageId)
      .map((aco) => [aco.packageId, aco])
  );

  return getCurrentPackagesFromDom().map((pkg) => syncSingleAcoFromPackage(existingByPackageId.get(pkg.id), pkg));
}

function percentFromAcoAltitude(value) {
  const safe = clamp(toIntOrFallback(value, 0), 0, ACO_MAX_ALTITUDE);
  return (safe / ACO_MAX_ALTITUDE) * 100;
}

function formatAcoAltitude(value) {
  if (!value) return "--";
  return `${formatFeet(value)} ft`;
}

function createAcoCardTemplate() {
  const template = document.createElement("template");
  template.innerHTML = `
    <article class="aco-card is-collapsed">
      <div class="aco-card-toggle" role="button" tabindex="0" aria-expanded="false">
        <div class="aco-card-head">
          <div class="aco-eyebrow">Airspace Control Order · Package Airspace</div>
          <div class="aco-title-row">
            <h3 class="aco-title" data-aco-static="callsign">PACKAGE</h3>
          </div>
          <div class="aco-title-row aco-title-row-secondary">
            <span class="aco-pill" data-aco-static="mission">TASK</span>
            <span class="aco-pill aco-pill-warning" data-aco-static="airspaceArea">--</span>
          </div>
          <div class="aco-subtitle" data-aco-static="subtitle"></div>
        </div>
        <div class="ato-card-actions">
          <span class="aco-card-chevron" data-aco-static="chevron">+</span>
        </div>
      </div>

      <div class="aco-card-body">
        <div class="aco-data-grid">
          <div class="aco-kv"><div class="aco-k">Floor</div><div class="aco-v aco-editable-view" data-aco-view="floorAltitude">--</div><div class="aco-edit-field"><input class="field-input" data-aco-input="floorAltitude" type="text" inputmode="numeric" maxlength="5" placeholder="Floor ft" /></div></div>
          <div class="aco-kv"><div class="aco-k">Ceiling</div><div class="aco-v aco-editable-view" data-aco-view="ceilingAltitude">--</div><div class="aco-edit-field"><input class="field-input" data-aco-input="ceilingAltitude" type="text" inputmode="numeric" maxlength="5" placeholder="Ceiling ft" /></div></div>
          <div class="aco-kv"><div class="aco-k">Transit</div><div class="aco-v aco-editable-view" data-aco-view="transitAltitude">--</div><div class="aco-edit-field"><input class="field-input" data-aco-input="transitAltitude" type="text" inputmode="numeric" maxlength="5" placeholder="Transit ft" /></div></div>
          <div class="aco-kv"><div class="aco-k">Area</div><div class="aco-v aco-editable-view" data-aco-view="airspaceArea">--</div><div class="aco-edit-field"><input class="field-input" data-aco-input="airspaceArea" type="text" placeholder="Area" /></div></div>
          <div class="aco-kv"><div class="aco-k">NFZ</div><div class="aco-v aco-editable-view" data-aco-view="nfz">--</div><div class="aco-edit-field"><input class="field-input" data-aco-input="nfz" type="text" placeholder="No Fly Zone" /></div></div>
          <div class="aco-kv"><div class="aco-k">Notes</div><div class="aco-v aco-editable-view" data-aco-view="notes">--</div><div class="aco-edit-field"><textarea class="ato-textarea" data-aco-input="notes" placeholder="Airspace notes"></textarea></div></div>
        </div>
      </div>
    </article>
  `;

  return template;
}

const acoCardTemplate = createAcoCardTemplate();

function collectAcoViewElements(card) {
  return Array.from(card.querySelectorAll("[data-aco-view]")).reduce((acc, node) => {
    acc[node.dataset.acoView] = node;
    return acc;
  }, {});
}

function collectAcoInputElements(card) {
  return Array.from(card.querySelectorAll("[data-aco-input]")).reduce((acc, node) => {
    acc[node.dataset.acoInput] = node;
    return acc;
  }, {});
}

function updateAcoCardViews(card) {
  if (!card?._acoFields) return;

  const data = normalizeAcoData(card._acoData || {});
  const { views, statics } = card._acoFields;
  const inherited = data.inherited;

  card._acoData = data;
  card.style.setProperty("--aco-accent", inherited.color || getRandomPackageColor());
  card.classList.toggle("is-collapsed", data.collapsed);

  if (card._acoToggle) {
    card._acoToggle.setAttribute("aria-expanded", String(!data.collapsed));
  }

  setText(statics.callsign, inherited.callsign || "PACKAGE");
  setText(statics.mission, inherited.mission || "TASK");
  setText(statics.airspaceArea, data.airspaceArea || "--");
  setText(statics.subtitle, `Package ${inherited.packageName || "--"} · Mission ${inherited.operationName || inherited.mission || "--"}`);
  setText(statics.chevron, data.collapsed ? "+" : "−");

  Object.entries(views).forEach(([fieldName, node]) => {
    if (!node) return;

    if (["floorAltitude", "transitAltitude", "ceilingAltitude"].includes(fieldName)) {
      setText(node, formatAcoAltitude(data[fieldName]));
      return;
    }

    setText(node, data[fieldName] || "--");
  });
}

function collectAcoDataFromCard(card) {
  const data = normalizeAcoData(card._acoData || {});
  const inputs = card._acoFields?.inputs || {};

  Object.entries(inputs).forEach(([fieldName, input]) => {
    if (!input) return;
    data[fieldName] = sanitizeAcoValue(fieldName, input.value);
  });

  return normalizeAcoData(data);
}

function createAcoCard(acoData) {
  if (!acoCardTemplate) return null;

  const aco = normalizeAcoData(acoData);
  const fragment = acoCardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".aco-card");

  if (!card) return null;

  card.dataset.acoId = aco.id;
  card.dataset.packageId = aco.packageId || "";
  card._acoData = aco;
  card._acoToggle = card.querySelector(".aco-card-toggle");
  card._acoFields = {
    views: collectAcoViewElements(card),
    inputs: collectAcoInputElements(card),
    statics: {
      callsign: card.querySelector('[data-aco-static="callsign"]'),
      mission: card.querySelector('[data-aco-static="mission"]'),
      airspaceArea: card.querySelector('[data-aco-static="airspaceArea"]'),
      subtitle: card.querySelector('[data-aco-static="subtitle"]'),
      chevron: card.querySelector('[data-aco-static="chevron"]')
    }
  };

  Object.entries(card._acoFields.inputs).forEach(([fieldName, input]) => {
    input.value = aco[fieldName] || "";

    const sync = () => {
      input.value = sanitizeAcoValue(fieldName, input.value);
      card._acoData = collectAcoDataFromCard(card);
      updateAcoCardViews(card);
      saveCurrentMission();
    };

    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
  });

  const toggleCard = () => {
    card._acoData = { ...collectAcoDataFromCard(card), collapsed: !card._acoData.collapsed };
    updateAcoCardViews(card);
    saveCurrentMission();
  };

  if (card._acoToggle) {
    card._acoToggle.addEventListener("click", toggleCard);
    card._acoToggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });
  }

  updateAcoCardViews(card);
  return card;
}

function renderAcoOverviewChart(acos = []) {
  if (!acoOverviewBands) return;

  acoOverviewBands.innerHTML = "";

  normalizeAcosArray(acos).forEach((aco) => {
    const inherited = aco.inherited;
    const floor = toIntOrFallback(aco.floorAltitude, 0);
    const ceiling = toIntOrFallback(aco.ceilingAltitude, 0);
    const lower = Math.min(floor, ceiling);
    const upper = Math.max(floor, ceiling);

    const band = document.createElement("div");
    band.className = "aco-overview-band";
    band.style.setProperty("--aco-band-color", inherited.color || getRandomPackageColor());
    band.style.bottom = `${percentFromAcoAltitude(lower)}%`;
    band.style.height = `${Math.max(percentFromAcoAltitude(upper) - percentFromAcoAltitude(lower), 5)}%`;
    band.innerHTML = `
      <span class="aco-overview-band-name">${inherited.callsign || "PACKAGE"}</span>
      <span class="aco-overview-band-range">${formatFeet(lower)} ft → ${formatFeet(upper)} ft</span>
    `;
    acoOverviewBands.appendChild(band);
  });
}

function renderAcos(acos = []) {
  if (!acoGrid) return;

  acoGrid.innerHTML = "";
  const normalizedAcos = normalizeAcosArray(acos);
  renderAcoOverviewChart(normalizedAcos);

  if (acoEmptyState) {
    acoEmptyState.classList.toggle("is-hidden", normalizedAcos.length > 0);
  }

  const fragment = document.createDocumentFragment();
  normalizedAcos.forEach((aco) => {
    const card = createAcoCard(aco);
    if (card) fragment.appendChild(card);
  });

  acoGrid.appendChild(fragment);
}

function getCurrentAcosFromDom() {
  const cards = acoGrid ? Array.from(acoGrid.querySelectorAll(".aco-card")) : [];
  return cards.map((card) => collectAcoDataFromCard(card));
}

function updateAcoPackageLinks() {
  const acos = buildAcoCardsFromPackages(getCurrentAcosFromDom());
  renderAcos(acos);
  saveCurrentMission();
}

/* =========================================================
   TIMELINE
========================================================= */

function createDefaultTimelineEvent(source = "manual") {
  return {
    id: generateUid("tle"),
    time: "",
    label: source === "auto" ? "STEP" : "EVENT",
    note: "",
    source: source === "manual" ? "manual" : "auto"
  };
}

function sanitizeTimelineEventValue(fieldName, value) {
  const text = String(value || "");

  if (fieldName === "time") {
    return sanitizeTimeInput(text);
  }

  if (fieldName === "label") {
    return sanitizeUpperText(text, 32);
  }

  if (fieldName === "note") {
    return sanitizeFreeText(text, 80);
  }

  return sanitizeFreeText(text, 80);
}

function normalizeTimelineEvent(event = {}) {
  return {
    id: event.id || generateUid("tle"),
    time: sanitizeTimelineEventValue("time", event.time),
    label: sanitizeTimelineEventValue("label", event.label || "EVENT") || "EVENT",
    note: sanitizeTimelineEventValue("note", event.note),
    source: event.source === "manual" ? "manual" : "auto"
  };
}

function buildInheritedTimelineData(atoData = {}) {
  const ato = normalizeAtoData(atoData);
  return {
    color: ato.inherited.color,
    callsign: ato.inherited.callsign,
    mission: ato.inherited.mission,
    packageName: ato.inherited.packageName,
    operationName: ato.inherited.operationName
  };
}

function buildTimelineWaypointEventsFromAto(atoData = {}) {
  const ato = normalizeAtoData(atoData);
  const missionStartSeconds = timeDigitsToMinutes(ato.inherited.startTime);
  if (missionStartSeconds === null) return [];

  return ato.route
    .map((row, index) => {
      if (index === 0) return null;
      if (!Number.isFinite(row.etaSeconds)) return null;

      const label = sanitizeUpperText(row.wp || `WP${index + 1}`, 32);
      const note = sanitizeFreeText(row.desc || "", 80);

      return normalizeTimelineEvent({
        id: `${ato.packageId || ato.id}_wp_${index + 1}`,
        time: secondsToTimeDigits((missionStartSeconds * 60) + row.etaSeconds),
        label,
        note,
        source: "auto"
      });
    })
    .filter(Boolean);
}

function buildAutoTimelineEventsFromAto(atoData = {}) {
  const ato = normalizeAtoData(atoData);

  const fixedEvents = TIMELINE_DEFAULT_EVENT_LABELS
    .map(({ key, label, noteField }) => {
      const time = key === "startTime" ? ato.inherited.startTime : ato[key];
      if (!time) return null;

      return normalizeTimelineEvent({
        id: `${ato.packageId || ato.id}_${key}`,
        time,
        label,
        note: noteField ? ato[noteField] || "" : "",
        source: "auto"
      });
    })
    .filter(Boolean);
  const waypointEvents = buildTimelineWaypointEventsFromAto(ato);

  return [...fixedEvents, ...waypointEvents];
}

function createDefaultTimelinePackage(atoData = {}) {
  const ato = normalizeAtoData(atoData);
  return {
    id: generateUid("tlp"),
    packageId: ato.packageId || "",
    collapsed: true,
    inherited: buildInheritedTimelineData(ato),
    events: buildAutoTimelineEventsFromAto(ato)
  };
}

function normalizeTimelinePackage(pkg = {}) {
  const defaults = createDefaultTimelinePackage();
  const inherited = pkg.inherited || {};

  return {
    ...defaults,
    ...pkg,
    id: pkg.id || generateUid("tlp"),
    packageId: pkg.packageId || "",
    collapsed: typeof pkg.collapsed === "boolean" ? pkg.collapsed : false,
    inherited: {
      ...defaults.inherited,
      color: /^#[0-9a-fA-F]{6}$/.test(String(inherited.color || "")) ? inherited.color : defaults.inherited.color,
      callsign: sanitizeUpperText(inherited.callsign || "", 24),
      mission: normalizeTaskValue(inherited.mission || ""),
      packageName: normalizePackageNameValue(inherited.packageName || ""),
      operationName: sanitizeUpperText(inherited.operationName || "", 48)
    },
    events: Array.isArray(pkg.events)
      ? pkg.events.map(normalizeTimelineEvent).sort((left, right) => {
        const leftMinutes = timeDigitsToMinutes(left.time);
        const rightMinutes = timeDigitsToMinutes(right.time);

        if (leftMinutes === null && rightMinutes === null) return left.label.localeCompare(right.label);
        if (leftMinutes === null) return 1;
        if (rightMinutes === null) return -1;
        if (leftMinutes !== rightMinutes) return leftMinutes - rightMinutes;
        return left.label.localeCompare(right.label);
      })
      : []
  };
}

function normalizeTimelinePackagesArray(packages) {
  if (!Array.isArray(packages)) return [];
  return packages.map(normalizeTimelinePackage);
}

function syncSingleTimelinePackage(existingTimelinePackage, atoData) {
  const ato = normalizeAtoData(atoData);
  const existing = normalizeTimelinePackage(existingTimelinePackage || createDefaultTimelinePackage(ato));
  const manualEvents = existing.events.filter((event) => event.source === "manual");

  return normalizeTimelinePackage({
    ...existing,
    packageId: ato.packageId || "",
    inherited: buildInheritedTimelineData(ato),
    events: [
      ...buildAutoTimelineEventsFromAto(ato),
      ...manualEvents
    ]
  });
}

function buildTimelinePackagesFromAtos(existingTimelinePackages = []) {
  const existingByPackageId = new Map(
    normalizeTimelinePackagesArray(existingTimelinePackages)
      .filter((pkg) => pkg.packageId)
      .map((pkg) => [pkg.packageId, pkg])
  );

  return getCurrentAtosFromDom().map((ato) => syncSingleTimelinePackage(existingByPackageId.get(ato.packageId), ato));
}

function flattenTimelineEvents(timelinePackages = []) {
  return normalizeTimelinePackagesArray(timelinePackages).flatMap((pkg) =>
    pkg.events
      .filter((event) => timeDigitsToMinutes(event.time) !== null)
      .map((event) => ({
        ...event,
        packageId: pkg.packageId,
        inherited: pkg.inherited,
        minutes: timeDigitsToMinutes(event.time)
      }))
  ).sort((left, right) => {
    if (left.minutes !== right.minutes) return left.minutes - right.minutes;
    return left.inherited.callsign.localeCompare(right.inherited.callsign);
  });
}

function getTimelineWindow(timelinePackages = []) {
  const overview = collectOverviewDataFromInputs();
  const events = flattenTimelineEvents(timelinePackages);
  const eventMinutes = events.map((event) => event.minutes);
  const overviewStart = timeDigitsToMinutes(overview.startTime);
  const overviewEnd = timeDigitsToMinutes(overview.endTime);
  const reference = overview.totTime || "";

  let start = overviewStart;
  let end = overviewEnd;

  if (start === null) {
    start = eventMinutes.length > 0 ? Math.max(Math.min(...eventMinutes) - 10, 0) : 60;
  }

  if (end === null) {
    end = eventMinutes.length > 0 ? Math.min(Math.max(...eventMinutes) + 10, 1439) : start + 180;
  }

  if (end <= start) {
    end = Math.min(start + 180, 1439);
  }

  return {
    start,
    end,
    reference,
    events
  };
}

function getTimelineEventLeftPercent(minutes, windowStart, windowEnd) {
  if (!Number.isFinite(minutes)) return 0;
  const span = Math.max(windowEnd - windowStart, 1);
  return clamp(((minutes - windowStart) / span) * 100, 0, 100);
}

function getTimelineEventLeftPx(minutes, windowStart, pixelsPerMinute, gutter = 0) {
  if (!Number.isFinite(minutes)) return gutter;
  return gutter + Math.max((minutes - windowStart) * pixelsPerMinute, 0);
}

function getTimelineRequiredPixelsPerMinute(timelinePackages = []) {
  const cardWidth = 150;
  const gap = 18;
  let required = 7;

  normalizeTimelinePackagesArray(timelinePackages).forEach((pkg) => {
    const eventMinutes = pkg.events
      .map((event) => timeDigitsToMinutes(event.time))
      .filter((minutes) => minutes !== null)
      .sort((left, right) => left - right);

    for (let index = 1; index < eventMinutes.length; index += 1) {
      const delta = eventMinutes[index] - eventMinutes[index - 1];
      if (delta > 0) {
        required = Math.max(required, (cardWidth + gap) / delta);
      }
    }
  });

  return required;
}

function renderTimelineVisual(timelinePackages = []) {
  if (!timelineVisual || !timelineSummary) return;

  const normalizedPackages = normalizeTimelinePackagesArray(timelinePackages);
  const windowData = getTimelineWindow(normalizedPackages);
  const markerMinutes = Array.from(new Set(windowData.events.map((event) => event.minutes)));
  const spanMinutes = Math.max(windowData.end - windowData.start, 1);
  const TIMELINE_EVENT_CARD_WIDTH = 150;
  const TIMELINE_EVENT_HALF_WIDTH = TIMELINE_EVENT_CARD_WIDTH / 2;
  const TIMELINE_LABEL_WIDTH = 110;
  const TIMELINE_LABEL_GAP = 12;
  const TIMELINE_SCALE_OFFSET = TIMELINE_LABEL_WIDTH + TIMELINE_LABEL_GAP;
  const TIMELINE_SCALE_HEIGHT = 52;
  const TIMELINE_AXIS_OFFSET = 44;
  const TIMELINE_LANE_HEIGHT = 112;
  const TIMELINE_LANES_GAP = 6;
  const TIMELINE_TRACK_SIDE_PADDING = TIMELINE_EVENT_HALF_WIDTH + 8;
  const endPadding = 24;
  const pixelsPerMinute = getTimelineRequiredPixelsPerMinute(normalizedPackages);
  const trackWidth = Math.max(1100, Math.ceil(spanMinutes * pixelsPerMinute));

  timelineSummary.textContent = `Fenêtre : ${formatTimelineTime(minutesToTimeDigits(windowData.start))} → ${formatTimelineTime(minutesToTimeDigits(windowData.end))} · Référence : TOT ${formatTimelineTime(windowData.reference)}`;

  if (normalizedPackages.length === 0) {
    timelineVisual.innerHTML = "";
    return;
  }

  const markers = markerMinutes.map((minutes) => {
      const left = TIMELINE_SCALE_OFFSET + TIMELINE_TRACK_SIDE_PADDING + getTimelineEventLeftPx(minutes, windowData.start, pixelsPerMinute);
      const timeText = formatTimelineTime(minutesToTimeDigits(minutes));
      const offsetText = formatTimelineOffset(minutesToTimeDigits(minutes), windowData.reference);

      return `
      <div class="timeline-scale-marker" style="left:${left}px;">
        <div class="timeline-scale-time">${timeText}</div>
        <div class="timeline-scale-offset">${offsetText}</div>
      </div>
    `;
  }).join("");

  const lanes = normalizedPackages.map((pkg, laneIndex) => {
    const events = pkg.events
      .map((event) => ({ ...event, minutes: timeDigitsToMinutes(event.time) }))
      .filter((event) => event.minutes !== null)
      .sort((left, right) => left.minutes - right.minutes);

    const gridLines = markerMinutes.map((minutes) => {
      const left = TIMELINE_TRACK_SIDE_PADDING + getTimelineEventLeftPx(minutes, windowData.start, pixelsPerMinute);
      return `<div class="timeline-track-line" style="left:${left}px;"></div>`;
    }).join("");

    const eventPills = events.map((event) => {
      const centerLeft = TIMELINE_TRACK_SIDE_PADDING + getTimelineEventLeftPx(event.minutes, windowData.start, pixelsPerMinute);
      const top = 44;
      const axisDistanceFromTrackTop =
        (TIMELINE_SCALE_HEIGHT - TIMELINE_AXIS_OFFSET) +
        (laneIndex * (TIMELINE_LANE_HEIGHT + TIMELINE_LANES_GAP));
      const stemTop = -axisDistanceFromTrackTop;
      const stemHeight = top + Math.abs(stemTop);
      const stemZIndex = 20 - laneIndex;
      const cardZIndex = 40 - laneIndex;
      const note = event.note ? `<div class="timeline-event-note">${event.note}</div>` : "";

      return `
        <div class="timeline-event-stem" style="left:${centerLeft}px; top:${stemTop}px; height:${stemHeight}px; z-index:${stemZIndex}; --timeline-event-color:${pkg.inherited.color || getRandomPackageColor()};"></div>
        <div class="timeline-event" style="left:${centerLeft - TIMELINE_EVENT_HALF_WIDTH}px; top:${top}px; z-index:${cardZIndex}; --timeline-event-color:${pkg.inherited.color || getRandomPackageColor()};">
          <div class="timeline-event-call">${pkg.inherited.callsign || "PACKAGE"}</div>
          <div class="timeline-event-label">${event.label}</div>
          <div class="timeline-event-time">${formatTimelineTime(event.time)}</div>
          ${note}
        </div>
      `;
    }).join("");

    return `
      <div class="timeline-lane">
        <div class="timeline-lane-label" style="color:${pkg.inherited.color || getRandomPackageColor()};">${pkg.inherited.callsign || "PACKAGE"}</div>
        <div class="timeline-lane-track">
          ${gridLines}
          ${eventPills}
        </div>
      </div>
    `;
  }).join("");

  timelineVisual.innerHTML = `
    <div class="timeline-board" style="width:${TIMELINE_SCALE_OFFSET + TIMELINE_TRACK_SIDE_PADDING + trackWidth + TIMELINE_TRACK_SIDE_PADDING + endPadding}px;">
      <div class="timeline-scale">
        ${markers}
        <div class="timeline-scale-axis" style="left:${TIMELINE_SCALE_OFFSET + TIMELINE_TRACK_SIDE_PADDING}px; right:${TIMELINE_TRACK_SIDE_PADDING + endPadding}px;"></div>
      </div>
      <div class="timeline-lanes">${lanes}</div>
    </div>
  `;
}

function renderTimelineChronology(timelinePackages = []) {
  if (!timelineChrono) return;

  const events = flattenTimelineEvents(timelinePackages);

  if (events.length === 0) {
    timelineChrono.innerHTML = `<div class="timeline-chrono-empty">Aucun événement horodaté à afficher.</div>`;
    return;
  }

  const reference = collectOverviewDataFromInputs().totTime || "";
  const groupedEvents = events.reduce((acc, event) => {
    const key = event.time;
    if (!acc.has(key)) acc.set(key, []);
    acc.get(key).push(event);
    return acc;
  }, new Map());

  timelineChrono.innerHTML = Array.from(groupedEvents.entries()).map(([time, items]) => `
    <article class="timeline-chrono-row">
      <div class="timeline-chrono-time">
        <div class="timeline-chrono-main">${formatTimelineTime(time)}</div>
        <div class="timeline-chrono-offset">${formatTimelineOffset(time, reference)}</div>
      </div>
      <div class="timeline-chrono-events">
        ${items.map((event) => `
          <div class="timeline-chrono-event">
            <span class="timeline-chrono-callsign" style="color:${event.inherited.color || getRandomPackageColor()};">${event.inherited.callsign || "PACKAGE"}</span>
            <span class="timeline-chrono-label">${event.label}</span>
            ${event.note ? `<span class="timeline-chrono-note">${event.note}</span>` : ""}
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function refreshTimelineViews() {
  const timelinePackages = getCurrentTimelinePackagesFromDom();
  renderTimelineVisual(timelinePackages);
  renderTimelineChronology(timelinePackages);
}

function updateTimelineEventRow(row, event, inherited) {
  const timeView = row.querySelector('[data-role="time-view"]');
  const labelView = row.querySelector('[data-role="label-view"]');
  const noteView = row.querySelector('[data-role="note-view"]');

  setText(timeView, formatTimelineTime(event.time));
  setText(labelView, event.label || "EVENT");
  setText(noteView, event.note || "--");
  row.querySelectorAll('[data-role="source-tag"]').forEach((tag) => {
    setText(tag, event.source === "manual" ? "Manual" : "ATO");
  });

  row.style.setProperty("--timeline-row-color", inherited.color || getRandomPackageColor());
}

function createTimelineEventRow(card, event, index) {
  const inherited = card._timelineData.inherited;
  const row = document.createElement("div");
  row.className = "timeline-package-row";
  row.dataset.eventId = event.id;
  row.innerHTML = `
    <div class="timeline-package-row-view">
      <div class="timeline-package-row-time" data-role="time-view">--:--L</div>
      <div class="timeline-package-row-main">
        <div class="timeline-package-row-label" data-role="label-view">EVENT</div>
        <div class="timeline-package-row-note" data-role="note-view">--</div>
      </div>
      <span class="timeline-source-tag" data-role="source-tag">ATO</span>
    </div>
    <div class="timeline-package-row-edit">
      <input class="field-input field-input-time" data-field="time" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" />
      <input class="field-input" data-field="label" type="text" placeholder="Label" />
      <input class="field-input" data-field="note" type="text" placeholder="Note" />
      <span class="timeline-source-tag" data-role="source-tag">ATO</span>
      <button class="mini-action-btn timeline-delete-btn" type="button"${event.source === "auto" ? " disabled" : ""}>Retirer</button>
    </div>
  `;

  row._eventIndex = index;
  row._eventData = normalizeTimelineEvent(event);

  row.querySelectorAll("[data-field]").forEach((input) => {
    const fieldName = input.dataset.field;
    input.value = row._eventData[fieldName] || "";
    input.disabled = row._eventData.source === "auto";

    const sync = () => {
      input.value = sanitizeTimelineEventValue(fieldName, input.value);
      row._eventData[fieldName] = input.value;
      card._timelineData.events[row._eventIndex] = normalizeTimelineEvent(row._eventData);
      updateTimelineEventRow(row, card._timelineData.events[row._eventIndex], inherited);
      refreshTimelineViews();
      saveCurrentMission();
    };

    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
  });

  const deleteBtn = row.querySelector(".timeline-delete-btn");
  if (deleteBtn && row._eventData.source === "manual") {
    deleteBtn.addEventListener("click", () => {
      card._timelineData.events.splice(row._eventIndex, 1);
      renderTimelinePackageEventRows(card);
      refreshTimelineViews();
      saveCurrentMission();
    });
  }

  updateTimelineEventRow(row, row._eventData, inherited);
  return row;
}

function renderTimelinePackageEventRows(card) {
  const rowsHost = card.querySelector("[data-timeline-events]");
  if (!rowsHost) return;

  card._timelineData = normalizeTimelinePackage(card._timelineData || {});
  rowsHost.innerHTML = "";

  card._timelineData.events.forEach((event, index) => {
    rowsHost.appendChild(createTimelineEventRow(card, event, index));
  });
}

function createTimelinePackageCard(timelinePackageData) {
  const timelinePackage = normalizeTimelinePackage(timelinePackageData);
  const card = document.createElement("article");
  card.className = `timeline-package-card${timelinePackage.collapsed ? " is-collapsed" : ""}`;
  card._timelineData = timelinePackage;

  card.innerHTML = `
    <div class="timeline-package-head" style="--timeline-package-color:${timelinePackage.inherited.color || getRandomPackageColor()};" role="button" tabindex="0" aria-expanded="${String(!timelinePackage.collapsed)}">
      <div class="timeline-package-head-main">
        <div class="timeline-package-eyebrow">Timeline · Package Events</div>
        <div class="timeline-package-title-row">
          <h3 class="timeline-package-title">${timelinePackage.inherited.callsign || "PACKAGE"}</h3>
          <span class="timeline-package-pill">${timelinePackage.inherited.mission || "TASK"}</span>
        </div>
        <div class="timeline-package-subtitle">Package ${timelinePackage.inherited.packageName || "--"} · Mission ${timelinePackage.inherited.operationName || timelinePackage.inherited.mission || "--"}</div>
      </div>
      <div class="timeline-package-actions">
        <span class="timeline-package-chevron">${timelinePackage.collapsed ? "+" : "−"}</span>
      </div>
    </div>
    <div class="timeline-package-body">
      <div class="timeline-package-toolbar">
        <button class="mini-action-btn timeline-package-add" type="button">Ajouter un timing</button>
      </div>
      <div data-timeline-events></div>
    </div>
  `;

  const head = card.querySelector(".timeline-package-head");
  const addButton = card.querySelector(".timeline-package-add");
  if (addButton) {
    addButton.addEventListener("click", () => {
      card._timelineData.events.push(createDefaultTimelineEvent("manual"));
      renderTimelinePackageEventRows(card);
      refreshTimelineViews();
      saveCurrentMission();
    });
  }

  const toggleCard = () => {
    card._timelineData.collapsed = !card._timelineData.collapsed;
    card.classList.toggle("is-collapsed", card._timelineData.collapsed);
    if (head) {
      head.setAttribute("aria-expanded", String(!card._timelineData.collapsed));
    }
    const chevron = card.querySelector(".timeline-package-chevron");
    if (chevron) {
      chevron.textContent = card._timelineData.collapsed ? "+" : "−";
    }
    saveCurrentMission();
  };

  if (head) {
    head.addEventListener("click", toggleCard);
    head.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });
  }

  renderTimelinePackageEventRows(card);
  return card;
}

function renderTimelineEditor(timelinePackages = []) {
  if (!timelineEditor) return;

  timelineEditor.innerHTML = "";
  const fragment = document.createDocumentFragment();

  normalizeTimelinePackagesArray(timelinePackages).forEach((timelinePackage) => {
    fragment.appendChild(createTimelinePackageCard(timelinePackage));
  });

  timelineEditor.appendChild(fragment);
}

function renderTimeline(timelinePackages = []) {
  const normalizedPackages = normalizeTimelinePackagesArray(timelinePackages);

  if (timelineEmptyState) {
    timelineEmptyState.classList.toggle("is-hidden", normalizedPackages.length > 0);
  }

  renderTimelineEditor(normalizedPackages);
  renderTimelineVisual(normalizedPackages);
  renderTimelineChronology(normalizedPackages);
}

function getCurrentTimelinePackagesFromDom() {
  const cards = timelineEditor ? Array.from(timelineEditor.querySelectorAll(".timeline-package-card")) : [];
  return cards.map((card) => normalizeTimelinePackage(card._timelineData || {}));
}

function updateTimelineFromAtos() {
  const timelinePackages = buildTimelinePackagesFromAtos(getCurrentTimelinePackagesFromDom());
  renderTimeline(timelinePackages);
  saveCurrentMission();
}

/* =========================================================
   PAYLOAD / SAVE / LOAD
========================================================= */

function buildMissionPayload() {
  return {
    missionId: currentMissionId,
    updatedAt: new Date().toISOString(),
    briefing: {
      ...collectOverviewDataFromInputs(),
      weather: collectWeatherDataFromInputs(),
      airfields: getCurrentAirfieldsFromDom(),
      packages: getCurrentPackagesFromDom(),
      atos: getCurrentAtosFromDom(),
      acos: getCurrentAcosFromDom(),
      timelinePackages: getCurrentTimelinePackagesFromDom()
    }
  };
}

function updatePublicationPanel() {
  missionIdDisplay.textContent = currentMissionId || "------------";
  tokenOutput.value = encodeMissionPayload(buildMissionPayload());
}

function saveCurrentMission() {
  if (!currentMissionId) return;

  currentMissionData = {
    ...collectOverviewDataFromInputs(),
    weather: collectWeatherDataFromInputs(),
    airfields: getCurrentAirfieldsFromDom(),
    packages: getCurrentPackagesFromDom(),
    atos: getCurrentAtosFromDom(),
    acos: getCurrentAcosFromDom(),
    timelinePackages: getCurrentTimelinePackagesFromDom()
  };

  const payload = buildMissionPayload();

  localStorage.setItem(getStorageKey(currentMissionId), JSON.stringify(payload));
  updatePublicationPanel();
}

async function fetchMissionPayloadFromServer(missionId) {
  const briefPathCandidates = [
    `../briefs/${missionId}.json`,
    `../BRIEFS/${missionId}.json`
  ];

  let response = null;
  let lastStatus = "";

  for (const candidate of briefPathCandidates) {
    const currentResponse = await fetch(candidate, {
      method: "GET",
      cache: "no-store"
    });

    if (currentResponse.ok) {
      response = currentResponse;
      break;
    }

    lastStatus = `HTTP ${currentResponse.status}`;
  }

  if (!response) {
    throw new Error(lastStatus || "Brief introuvable.");
  }

  const payload = await response.json();
  const token = String(payload?.token || "").trim();

  if (token) {
    const decodedPayload = decodeMissionPayload(token);
    if (!decodedPayload?.briefing) {
      throw new Error("Token mission invalide.");
    }
    return decodedPayload;
  }

  return payload;
}

function applyStoredMissionPayload(payload, missionId) {
  const briefing = payload?.briefing || deepClone(defaultMissionData);

  currentMissionId = missionId;
  currentMissionData = {
    ...deepClone(defaultMissionData),
    ...briefing,
    weather: normalizeWeatherData(briefing.weather),
    airfields: normalizeAirfieldsArray(briefing.airfields),
    packages: normalizePackagesArray(briefing.packages),
    atos: normalizeAtosArray(briefing.atos),
    acos: normalizeAcosArray(briefing.acos),
    timelinePackages: normalizeTimelinePackagesArray(briefing.timelinePackages)
  };

  applyOverviewDataToInputs(currentMissionData);
  applyWeatherDataToInputs(currentMissionData.weather);
  renderAirfields(currentMissionData.airfields);
  renderPackages(currentMissionData.packages);
  renderAtos(currentMissionData.atos);
  renderAcos(currentMissionData.acos);
  renderTimeline(currentMissionData.timelinePackages);

  refreshAllViewFields();
  updateWeatherVisuals();
  setUrlMissionId(currentMissionId);
  updatePublicationPanel();
}

async function loadMissionById(missionId) {
  const normalizedId = String(missionId || "").trim().toUpperCase();

  if (!/^[A-Z0-9]{12}$/.test(normalizedId)) {
    alert("Mission ID invalide. Format attendu : 12 caractères alphanumériques.");
    return false;
  }

  try {
    const serverPayload = await fetchMissionPayloadFromServer(normalizedId);
    applyStoredMissionPayload(serverPayload, normalizedId);
    localStorage.setItem(getStorageKey(normalizedId), JSON.stringify(serverPayload));
    return true;
  } catch (serverError) {
    const storedRaw = localStorage.getItem(getStorageKey(normalizedId));

    if (!storedRaw) {
      console.error("Erreur de chargement mission :", serverError);
      alert(`Aucune mission trouvée pour ${normalizedId}.`);
      return false;
    }

    try {
      const storedPayload = JSON.parse(storedRaw);
      applyStoredMissionPayload(storedPayload, normalizedId);
      return true;
    } catch (localError) {
      console.error("Erreur de chargement mission :", serverError, localError);
      alert("Impossible de charger cette mission.");
      return false;
    }
  }
}

function applyBriefingPayload(briefing, missionId = "") {
  currentMissionId = missionId || getUniqueMissionId();
  currentMissionData = {
    ...deepClone(defaultMissionData),
    ...(briefing || {}),
    weather: normalizeWeatherData(briefing?.weather),
    airfields: normalizeAirfieldsArray(briefing?.airfields),
    packages: normalizePackagesArray(briefing?.packages),
    atos: normalizeAtosArray(briefing?.atos),
    acos: normalizeAcosArray(briefing?.acos),
    timelinePackages: normalizeTimelinePackagesArray(briefing?.timelinePackages)
  };

  applyOverviewDataToInputs(currentMissionData);
  applyWeatherDataToInputs(currentMissionData.weather);
  renderAirfields(currentMissionData.airfields);
  renderPackages(currentMissionData.packages);
  renderAtos(currentMissionData.atos);
  renderAcos(currentMissionData.acos);
  renderTimeline(currentMissionData.timelinePackages);

  refreshAllViewFields();
  updateWeatherVisuals();
  setUrlMissionId(currentMissionId);
  saveCurrentMission();
}

function promptAndLoadToken() {
  const enteredToken = window.prompt("Colle le token complet du briefing :");

  if (enteredToken === null) return;

  const payload = decodeMissionPayload(enteredToken);
  if (!payload?.briefing) {
    alert("Token invalide ou illisible.");
    return;
  }

  const missionIdFromToken = String(payload.missionId || "").trim().toUpperCase();
  applyBriefingPayload(payload.briefing, /^[A-Z0-9]{12}$/.test(missionIdFromToken) ? missionIdFromToken : "");
}

function createNewMission() {
  currentMissionId = getUniqueMissionId();
  currentMissionData = deepClone(defaultMissionData);

  applyOverviewDataToInputs(currentMissionData);
  applyWeatherDataToInputs(currentMissionData.weather);
  renderAirfields(currentMissionData.airfields);
  renderPackages(currentMissionData.packages);
  renderAtos(currentMissionData.atos);
  renderAcos(currentMissionData.acos);
  renderTimeline(currentMissionData.timelinePackages);

  refreshAllViewFields();
  updateWeatherVisuals();
  setUrlMissionId(currentMissionId);
  saveCurrentMission();
}

/* =========================================================
   CLIPBOARD / EXPORT
========================================================= */

function copyText(text, successMessage) {
  if (!text) return;

  navigator.clipboard.writeText(text)
    .then(() => {
      console.info(successMessage);
    })
    .catch((error) => {
      console.error("Échec de copie :", error);
      alert("Impossible de copier dans le presse-papiers.");
    });
}

function copyCurrentUrl() {
  copyText(window.location.href, "URL copiée.");
}

function copyCurrentMissionId() {
  if (!currentMissionId) {
    alert("Aucun Mission ID disponible.");
    return;
  }

  copyText(currentMissionId, "Mission ID copié.");
}

function copyCurrentToken() {
  if (!tokenOutput.value) {
    alert("Aucun token disponible.");
    return;
  }

  copyText(tokenOutput.value, "Token copié.");
}

async function promptAndLoadMissionId() {
  const enteredId = window.prompt("Collez le Mission ID (12 caractères alphanumériques) :");

  if (enteredId === null) return;

  const normalizedId = enteredId.trim().toUpperCase();
  if (!normalizedId) return;

  setUrlMissionId(normalizedId);
  await loadMissionById(normalizedId);
}

function downloadJsonFile(filename, content) {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(blobUrl);
}

function publishMission() {
  if (!currentMissionId) {
    alert("Aucun Mission ID disponible.");
    return;
  }

  saveCurrentMission();

  const token = encodeMissionPayload(buildMissionPayload());
  if (!token) {
    alert("Impossible de générer le token de mission.");
    return;
  }

  const filename = `${currentMissionId}.json`;
  const jsonContent = JSON.stringify({ token }, null, 2);

  downloadJsonFile(filename, jsonContent);
}

function downloadCanvasPng(canvas, filename) {
  if (!canvas) return;

  const safeName = String(filename || "kneeboard.png").replace(/[\\/:*?"<>|]+/g, "-");

  if (canvas.toBlob) {
    canvas.toBlob((blob) => {
      if (!blob) {
        alert("Impossible de generer l'image du kneeboard.");
        return;
      }

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = safeName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    }, "image/png");
    return;
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = safeName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function getAvailableAtosForExport() {
  return normalizeAtosArray(getCurrentAtosFromDom())
    .filter((ato) => ato.packageId || ato.inherited.callsign || ato.inherited.packageName);
}

function formatKneeboardPackageOption(atoData = {}) {
  const ato = normalizeAtoData(atoData);
  const parts = [
    ato.inherited.callsign || "PACKAGE",
    ato.inherited.mission || "TASK",
    ato.inherited.packageName ? `PKG ${ato.inherited.packageName}` : ""
  ].filter(Boolean);
  return parts.join(" · ");
}

function getSelectedKneeboardAto() {
  const packageId = kneeboardPackageSelect?.value || "";
  const atos = getAvailableAtosForExport();
  return atos.find((ato) => ato.packageId === packageId) || atos[0] || null;
}

function updateKneeboardPackageMeta() {
  if (!kneeboardPackageMeta) return;

  const ato = getSelectedKneeboardAto();
  const coordFormat = kneeboardCoordsFormatSelect?.value === "mgrs"
    ? "MGRS"
    : kneeboardCoordsFormatSelect?.value === "dd"
      ? "DD"
      : "LL DM";
  if (!ato) {
    kneeboardPackageMeta.textContent = "Aucun package ATO disponible.";
    return;
  }

  kneeboardPackageMeta.textContent = [
    `${ato.inherited.callsign || "PACKAGE"} · ${ato.inherited.mission || "TASK"}`,
    `Package ${ato.inherited.packageName || "--"} · ${ato.inherited.aircraftCount || "--"} x ${ato.inherited.aircraftType || "--"}`,
    `DEP ${ato.launchDetails || ato.inherited.departure || "--"} · TGT ${ato.targetName || "--"} · RTB ${ato.recoveryDetails || ato.inherited.destination || "--"}`,
    `Route coords exportees en ${coordFormat}`
  ].join("\n");
}

function syncKneeboardPackageOptions(preferredPackageId = "") {
  if (!kneeboardPackageSelect) return;

  const atos = getAvailableAtosForExport();
  kneeboardPackageSelect.innerHTML = "";

  atos.forEach((ato) => {
    const option = document.createElement("option");
    option.value = ato.packageId || ato.id;
    option.textContent = formatKneeboardPackageOption(ato);
    kneeboardPackageSelect.appendChild(option);
  });

  const targetValue = atos.find((ato) => (ato.packageId || ato.id) === preferredPackageId)
    ? preferredPackageId
    : atos[0]?.packageId || atos[0]?.id || "";

  kneeboardPackageSelect.value = targetValue;
  kneeboardExportConfirmBtn.disabled = atos.length === 0;
  updateKneeboardPackageMeta();
}

function openKneeboardExportModal() {
  const atos = getAvailableAtosForExport();
  if (!atos.length) {
    alert("Aucun package ATO disponible a exporter.");
    return;
  }

  syncKneeboardPackageOptions(kneeboardPackageSelect?.value || atos[0].packageId || atos[0].id);
  kneeboardExportModal?.classList.add("is-open");
  kneeboardExportModal?.setAttribute("aria-hidden", "false");
}

function closeKneeboardExportModal() {
  kneeboardExportModal?.classList.remove("is-open");
  kneeboardExportModal?.setAttribute("aria-hidden", "true");
}

function drawRoundedRectPath(ctx, x, y, width, height, radius = 24) {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function fillRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.save();
  ctx.fillStyle = fillStyle;
  drawRoundedRectPath(ctx, x, y, width, height, radius);
  ctx.fill();
  ctx.restore();
}

function strokeRoundedRect(ctx, x, y, width, height, radius, strokeStyle, lineWidth = 1) {
  ctx.save();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  drawRoundedRectPath(ctx, x, y, width, height, radius);
  ctx.stroke();
  ctx.restore();
}

function trimCanvasText(ctx, text, maxWidth) {
  const source = String(text || "").trim();
  if (!source) return "";
  if (ctx.measureText(source).width <= maxWidth) return source;

  let output = source;
  while (output.length > 1 && ctx.measureText(`${output}...`).width > maxWidth) {
    output = output.slice(0, -1);
  }

  return `${output}...`;
}

function wrapCanvasText(ctx, text, maxWidth, maxLines = Infinity) {
  const paragraphs = String(text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim());
  const lines = [];

  paragraphs.forEach((paragraph) => {
    if (!paragraph) {
      lines.push("");
      return;
    }

    const words = paragraph.split(/\s+/);
    let currentLine = "";

    words.forEach((word) => {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth) {
        currentLine = candidate;
        return;
      }

      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        lines.push(trimCanvasText(ctx, word, maxWidth));
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }
  });

  if (lines.length <= maxLines) {
    return lines;
  }

  const trimmed = lines.slice(0, Math.max(maxLines, 1));
  trimmed[trimmed.length - 1] = trimCanvasText(ctx, trimmed[trimmed.length - 1], maxWidth);
  return trimmed;
}

function drawCanvasTextBlock(ctx, text, x, y, maxWidth, options = {}) {
  const {
    font = '400 28px "Segoe UI", Arial, sans-serif',
    color = "#eaf4ff",
    lineHeight = 38,
    maxLines = Infinity,
    textAlign = "left"
  } = options;

  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "top";
  ctx.textAlign = textAlign;

  const lines = wrapCanvasText(ctx, text, maxWidth, maxLines);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + (index * lineHeight));
  });
  ctx.restore();

  return y + (lines.length * lineHeight);
}

function drawKneeboardSection(ctx, x, y, width, height, title, accentColor) {
  fillRoundedRect(ctx, x, y, width, height, 28, "rgba(10, 21, 34, 0.88)");
  strokeRoundedRect(ctx, x, y, width, height, 28, "rgba(160, 205, 255, 0.16)", 2);
  ctx.save();
  ctx.fillStyle = accentColor;
  ctx.fillRect(x + 24, y + 22, 92, 6);
  ctx.font = '800 28px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#f3f8ff";
  ctx.textBaseline = "top";
  ctx.fillText(title, x + 24, y + 44);
  ctx.restore();
}

function drawKneeboardKeyValueList(ctx, items, x, y, width, accentColor) {
  let cursorY = y;

  items.forEach(({ key, value }) => {
    ctx.save();
    ctx.font = '800 21px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = accentColor;
    ctx.textBaseline = "top";
    ctx.fillText(key, x, cursorY);
    ctx.restore();

    cursorY = drawCanvasTextBlock(ctx, value || "--", x, cursorY + 28, width, {
      font: '500 27px "Segoe UI", Arial, sans-serif',
      color: "#e8f3ff",
      lineHeight: 34,
      maxLines: 2
    }) + 16;
  });
}

function drawKneeboardTwoColumnKeyValueList(ctx, items, x, y, width, accentColor, options = {}) {
  const {
    gap = 26,
    rowHeight = 68,
    rowGap = 0,
    keyFont = '800 17px "Segoe UI", Arial, sans-serif',
    valueFont = '600 18px "Segoe UI", Arial, sans-serif',
    valueLineHeight = 20,
    valueMaxLines = 2,
    keyValueGap = 24
  } = options;
  const columnWidth = Math.max((width - gap) / 2, 120);
  const rows = [];

  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }

  let cursorY = y;

  rows.forEach((rowItems) => {
    const rowHeights = rowItems.map(({ value }) => {
      ctx.save();
      ctx.font = valueFont;
      const lines = wrapCanvasText(ctx, value || "--", columnWidth, valueMaxLines);
      ctx.restore();
      return Math.max(rowHeight, keyValueGap + (lines.length * valueLineHeight));
    });
    const effectiveRowHeight = Math.max(...rowHeights, rowHeight);

    rowItems.forEach(({ key, value }, column) => {
      const itemX = x + (column * (columnWidth + gap));

      ctx.save();
      ctx.font = keyFont;
      ctx.fillStyle = accentColor;
      ctx.textBaseline = "top";
      ctx.fillText(key, itemX, cursorY);
      ctx.restore();

      drawCanvasTextBlock(ctx, value || "--", itemX, cursorY + keyValueGap, columnWidth, {
        font: valueFont,
        color: "#e8f3ff",
        lineHeight: valueLineHeight,
        maxLines: valueMaxLines
      });
    });

    cursorY += effectiveRowHeight + rowGap;
  });
}

function drawKneeboardMultiColumnList(ctx, items, x, y, width, options = {}) {
  const {
    columns = 3,
    gap = 22,
    rowHeight = 52,
    font = '500 15px "Segoe UI", Arial, sans-serif',
    color = "#e8f2ff",
    lineHeight = 18,
    maxLines = 2
  } = options;

  const safeColumns = Math.max(columns, 1);
  const columnWidth = Math.max((width - (gap * (safeColumns - 1))) / safeColumns, 120);

  items.forEach((item, index) => {
    const column = index % safeColumns;
    const row = Math.floor(index / safeColumns);
    const itemX = x + (column * (columnWidth + gap));
    const itemY = y + (row * rowHeight);

    drawCanvasTextBlock(ctx, item || "--", itemX, itemY, columnWidth, {
      font,
      color,
      lineHeight,
      maxLines
    });
  });
}

function drawKneeboardCommPlanTiles(ctx, items, x, y, width, accentColor) {
  const {
    columns,
    gap,
    tileHeight,
    titleFont,
    bodyFont,
    lineHeight,
    tileWidth,
    safeColumns
  } = getKneeboardCommPlanLayout(items.length, width);

  items.forEach((item, index) => {
    const column = index % safeColumns;
    const row = Math.floor(index / safeColumns);
    const tileX = x + (column * (tileWidth + gap));
    const tileY = y + (row * (tileHeight + gap));
    const title = item?.title || "--";
    const lines = [item?.description || "", item?.freq || ""].filter(Boolean).join("\n");

    fillRoundedRect(ctx, tileX, tileY, tileWidth, tileHeight, 16, "rgba(255,255,255,0.035)");
    strokeRoundedRect(ctx, tileX, tileY, tileWidth, tileHeight, 16, "rgba(160,205,255,0.12)", 1);

    ctx.save();
    ctx.font = titleFont;
    ctx.fillStyle = accentColor;
    ctx.textBaseline = "top";
    ctx.fillText(trimCanvasText(ctx, title, tileWidth - 20), tileX + 12, tileY + 10);
    ctx.restore();

    drawCanvasTextBlock(ctx, lines || "--", tileX + 12, tileY + 28, tileWidth - 24, {
      font: bodyFont,
      color: "#e8f2ff",
      lineHeight,
      maxLines: 2
    });
  });
}

function getKneeboardTwoColumnListHeight(itemCount = 0, options = {}) {
  const {
    rowHeight = 68,
    rowGap = 0,
    columns = 2
  } = options;
  const safeCount = Math.max(itemCount, 1);
  const safeColumns = Math.max(columns, 1);
  const rows = Math.ceil(safeCount / safeColumns);
  return (rows * rowHeight) + (Math.max(0, rows - 1) * rowGap);
}

function measureKneeboardTwoColumnListHeight(ctx, items, width, options = {}) {
  const {
    gap = 26,
    rowHeight = 68,
    rowGap = 0,
    valueFont = '600 18px "Segoe UI", Arial, sans-serif',
    valueLineHeight = 20,
    valueMaxLines = 2,
    keyValueGap = 24
  } = options;
  const columnWidth = Math.max((width - gap) / 2, 120);
  let totalHeight = 0;

  for (let index = 0; index < items.length; index += 2) {
    const rowItems = items.slice(index, index + 2);
    const effectiveRowHeight = Math.max(
      ...rowItems.map(({ value }) => {
        ctx.save();
        ctx.font = valueFont;
        const lines = wrapCanvasText(ctx, value || "--", columnWidth, valueMaxLines);
        ctx.restore();
        return Math.max(rowHeight, keyValueGap + (lines.length * valueLineHeight));
      }),
      rowHeight
    );

    totalHeight += effectiveRowHeight;
    if (index + 2 < items.length) {
      totalHeight += rowGap;
    }
  }

  return totalHeight || rowHeight;
}

function getKneeboardCommPlanLayout(count = 0, width = 0) {
  const safeCount = Math.max(count, 1);
  const columns = 4;
  const gap = 14;
  const tileHeight = 56;
  const titleFont = '800 12px "Segoe UI", Arial, sans-serif';
  const bodyFont = '500 12px "Segoe UI", Arial, sans-serif';
  const lineHeight = 14;
  const safeColumns = Math.max(columns, 1);
  const tileWidth = Math.max((width - (gap * (safeColumns - 1))) / safeColumns, 140);
  const rows = Math.ceil(safeCount / safeColumns);
  const contentHeight = rows * tileHeight + Math.max(0, rows - 1) * gap;

  return { columns, gap, tileHeight, titleFont, bodyFont, lineHeight, tileWidth, safeColumns, rows, contentHeight };
}

function getKneeboardRouteTableMetrics(width) {
  const columns = {
    wp: 90,
    time: 88,
    dist: 72,
    spd: 68,
    hdg: 50,
    beacon: 60,
    alt: 68,
    coords: 236
  };
  const desc = width
    - columns.wp
    - columns.time
    - columns.dist
    - columns.spd
    - columns.hdg
    - columns.beacon
    - columns.alt
    - columns.coords;

  const starts = {};
  let cursor = 0;

  Object.entries(columns).forEach(([key, value]) => {
    starts[key] = cursor;
    cursor += value;
  });
  starts.desc = cursor;

  return {
    columns: { ...columns, desc },
    starts,
    centers: {
      wp: starts.wp + (columns.wp / 2),
      time: starts.time + (columns.time / 2),
      dist: starts.dist + (columns.dist / 2),
      spd: starts.spd + (columns.spd / 2),
      hdg: starts.hdg + (columns.hdg / 2),
      beacon: starts.beacon + (columns.beacon / 2),
      alt: starts.alt + (columns.alt / 2),
      coords: starts.coords + (columns.coords / 2),
      desc: starts.desc + (desc / 2)
    }
  };
}

function drawKneeboardRouteRow(ctx, {
  x,
  y,
  width,
  rowHeight,
  wp,
  time,
  dist,
  spd,
  hdg,
  beacon,
  alt,
  coords,
  desc,
  metrics,
  accentColor,
  isEven
}) {
  const tableMetrics = metrics || getKneeboardRouteTableMetrics(width);
  const { columns, centers, starts } = tableMetrics;

  fillRoundedRect(ctx, x, y, width, rowHeight, 12, isEven ? "rgba(255,255,255,0.028)" : "rgba(255,255,255,0.05)");

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = '700 14px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#eef6ff";
  ctx.fillStyle = accentColor;
  ctx.fillText(trimCanvasText(ctx, wp || "--", columns.wp - 12), x + centers.wp, y + (rowHeight / 2));
  ctx.fillStyle = "#eef6ff";
  ctx.fillText(trimCanvasText(ctx, time || "--:--L", columns.time - 12), x + centers.time, y + (rowHeight / 2));
  ctx.fillText(trimCanvasText(ctx, dist || "--", columns.dist - 12), x + centers.dist, y + (rowHeight / 2));
  ctx.fillText(trimCanvasText(ctx, spd || "--", columns.spd - 12), x + centers.spd, y + (rowHeight / 2));
  ctx.fillText(trimCanvasText(ctx, hdg || "--", columns.hdg - 10), x + centers.hdg, y + (rowHeight / 2));
  ctx.fillText(trimCanvasText(ctx, beacon || "--", columns.beacon - 10), x + centers.beacon, y + (rowHeight / 2));
  ctx.fillText(trimCanvasText(ctx, alt || "--", columns.alt - 10), x + centers.alt, y + (rowHeight / 2));
  ctx.restore();

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = '600 12px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#d3e5fb";
  ctx.fillText(trimCanvasText(ctx, coords || "--", columns.coords - 14), x + centers.coords, y + (rowHeight / 2));
  ctx.restore();

  drawCanvasTextBlock(ctx, desc || "--", x + centers.desc, y + 6, columns.desc - 14, {
    font: '600 12px "Segoe UI", Arial, sans-serif',
    color: "#e7f2ff",
    lineHeight: 14,
    maxLines: 2,
    textAlign: "center"
  });
}

function getAtoRouteDisplayTime(atoData, row) {
  const ato = normalizeAtoData(atoData);
  const manualTime = sanitizeTimeInput(row?.time || "");
  if (manualTime) {
    return formatTimeLocal(manualTime);
  }

  const missionStartMinutes = timeDigitsToMinutes(ato.inherited.startTime);
  if (missionStartMinutes === null || !Number.isFinite(row?.etaSeconds)) {
    return "--:--L";
  }

  return formatTimeLocal(secondsToTimeDigits((missionStartMinutes * 60) + row.etaSeconds));
}

function getAtoRouteDisplayDistanceForExport(route = [], index = 0, row = {}) {
  const legDistance = getAtoRouteLegDistanceNm(route, index, row);
  const cumulativeDistance = getAtoRouteCumulativeDistanceNm(route, index);
  return `${formatDistanceNmCompact(legDistance)}/${formatDistanceNmCompact(cumulativeDistance)}`;
}

function buildKneeboardCommPlanItems(atoData = {}) {
  const ato = syncAtoCommWithAirfields(normalizeAtoData(atoData), getCurrentAirfieldsFromDom());
  const items = [];
  const primary = ato.inherited.intra || "--";
  const secondary = ato.packageFrequencyNote || "--";

  items.push({
    title: "INTRA-FLIGHT",
    description: `PFREQ ${primary}`,
    freq: `SFREQ ${secondary}`
  });

  ato.comm
    .filter((row) => row.name || row.freq || row.description)
    .forEach((row) => {
      items.push({
        title: row.name || "NET",
        description: row.description || "",
        freq: row.freq || ""
      });
    });

  ato.supportTiles
    .filter((tile) => tile.title || tile.description || tile.freq)
    .forEach((tile) => {
      items.push({
        title: tile.title || "SUPPORT",
        description: tile.description || "",
        freq: tile.freq || ""
      });
    });

  return items;
}

function formatKneeboardIffValue(atoData = {}) {
  const iff = parseAtoIffModes(normalizeAtoData(atoData).iffModes);
  return `MODE 1 ${iff.mode1} · MODE 3 ${iff.mode3}`;
}

function formatKneeboardAirfieldNotes(atoData = {}) {
  const ato = normalizeAtoData(atoData);
  const airfields = getCurrentAirfieldsFromDom();
  const rows = [];

  const pushRow = (label, code) => {
    if (!code) return;
    rows.push(`${label} ${code}`);
    const details = formatAirfieldLine(code, airfields)
      .replace(new RegExp(`^${sanitizeUpperText(code, 8)}\\s*·?\\s*`), "")
      .split(" · ")
      .filter(Boolean);
    details.forEach((detail) => rows.push(`- ${detail}`));
  };

  pushRow("DEP", ato.launchDetails || ato.inherited.departure || "");
  pushRow("ARR", ato.recoveryDetails || ato.inherited.destination || "");
  ato.diverts.forEach((code, index) => pushRow(`DIVERT ${index + 1}`, code));

  return rows.join("\n") || "--";
}

function buildKneeboardAirfieldTileItems(atoData = {}) {
  const ato = normalizeAtoData(atoData);
  const airfields = getCurrentAirfieldsFromDom();
  const airfieldMap = getAirfieldMap(airfields);
  const items = [];

  const pushItem = (title, code) => {
    if (!code) return;
    const normalizedCode = sanitizeUpperText(code, 8);
    const airfield = airfieldMap.get(normalizedCode);
    const details = airfield
      ? [
          airfield.runway ? `RWY ${airfield.runway}` : "",
          airfield.ilsFreq || airfield.ilsCourse || airfield.ilsRunway
            ? `ILS ${formatAirfieldIlsDisplay(airfield, " / ")}`
            : "",
          airfield.beacon ? `BCN ${airfield.beacon}` : "",
          airfield.notes || ""
        ].filter(Boolean).join(" · ")
      : "";
    items.push({
      title,
      code: normalizedCode,
      details: details || "--"
    });
  };

  pushItem("DEP", ato.launchDetails || ato.inherited.departure || "");
  pushItem("ARR", ato.recoveryDetails || ato.inherited.destination || "");
  ato.diverts.forEach((code, index) => pushItem(`DIVERT ${index + 1}`, code));

  return items;
}

function drawKneeboardAirfieldTiles(ctx, items, x, y, width, accentColor) {
  const { columns, gap, safeColumns, tileWidth, tileHeight } = getKneeboardAirfieldLayout(items.length, width);

  items.forEach((item, index) => {
    const column = index % safeColumns;
    const row = Math.floor(index / safeColumns);
    const tileX = x + (column * (tileWidth + gap));
    const tileY = y + (row * (tileHeight + gap));

    fillRoundedRect(ctx, tileX, tileY, tileWidth, tileHeight, 16, "rgba(255,255,255,0.035)");
    strokeRoundedRect(ctx, tileX, tileY, tileWidth, tileHeight, 16, "rgba(160,205,255,0.12)", 1);

    ctx.save();
    ctx.font = '800 13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = accentColor;
    ctx.textBaseline = "top";
    ctx.fillText(trimCanvasText(ctx, item.title || "--", tileWidth - 24), tileX + 12, tileY + 10);
    ctx.font = '800 16px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = "#eef6ff";
    ctx.fillText(trimCanvasText(ctx, item.code || "--", tileWidth - 24), tileX + 12, tileY + 30);
    ctx.restore();

    drawCanvasTextBlock(ctx, item.details || "--", tileX + 12, tileY + 52, tileWidth - 24, {
      font: '500 11px "Segoe UI", Arial, sans-serif',
      color: "#d7e6f8",
      lineHeight: 13,
      maxLines: 5
    });
  });
}

function getKneeboardAirfieldLayout(count = 0, width = 0) {
  const safeCount = Math.max(count, 1);
  const columns = 2;
  const gap = 16;
  const safeColumns = Math.max(columns, 1);
  const tileWidth = Math.max((width - (gap * (safeColumns - 1))) / safeColumns, 120);
  const tileHeight = 116;
  const rows = Math.ceil(safeCount / safeColumns);
  const contentHeight = rows * tileHeight + Math.max(0, rows - 1) * gap;

  return { columns, gap, safeColumns, tileWidth, tileHeight, rows, contentHeight };
}

function getKneeboardLayoutMetrics({
  canvasHeight,
  margin,
  contentWidth,
  airfieldItemCount,
  commPlanItemCount,
  missionDataItemCount = 6,
  executionItemCount = 6,
  topListContentHeight = null
}) {
  const topSectionY = 268;
  const topSectionContentY = 352;
  const sectionHeaderOffset = topSectionContentY - topSectionY;
  const topSectionBaseHeight = 324;
  const topListHeight = Math.max(
    Number.isFinite(topListContentHeight)
      ? topListContentHeight
      : getKneeboardTwoColumnListHeight(missionDataItemCount, { rowHeight: 62 }),
    Number.isFinite(topListContentHeight)
      ? topListContentHeight
      : getKneeboardTwoColumnListHeight(executionItemCount, { rowHeight: 62 })
  );
  const airfieldLayout = getKneeboardAirfieldLayout(airfieldItemCount, 376);
  const topSectionContentHeight = Math.max(topListHeight, airfieldLayout.contentHeight);
  const topSectionHeight = Math.max(topSectionBaseHeight, sectionHeaderOffset + topSectionContentHeight + 28);

  const commPlanLayout = getKneeboardCommPlanLayout(commPlanItemCount, contentWidth - 56);
  const commSectionBaseHeight = 302;
  const commSectionHeight = Math.max(commSectionBaseHeight, 84 + commPlanLayout.contentHeight + 28);
  const commSectionY = canvasHeight - margin - commSectionHeight + 2;

  const routeSectionY = topSectionY + topSectionHeight + 32;
  const routeSectionHeight = Math.max(420, commSectionY - 32 - routeSectionY);
  const routeContentTop = routeSectionY + 84;
  const routeContentBottom = routeSectionY + routeSectionHeight - 24;
  const routeAvailableHeight = Math.max(120, routeContentBottom - routeContentTop);
  const routeHeaderHeight = 72;
  const routeFooterHeight = 44;
  const routeRowStride = 50;
  const routeRowsHeight = Math.max(0, routeAvailableHeight - routeHeaderHeight - routeFooterHeight);
  const routePageSize = Math.max(1, Math.floor(routeRowsHeight / routeRowStride));

  return {
    topSectionY,
    topSectionHeight,
    routeSectionY,
    routeSectionHeight,
    routeContentTop,
    routePageSize,
    commSectionY,
    commSectionHeight
  };
}

function getAtoRouteCoordinateForFormat(row = {}, coordFormat = "lldm") {
  const coords = parseAtoRouteCoordinatesDisplay(row.coords || "");
  if (coordFormat === "dd") {
    return coords.dd || coords.lldm || coords.mgrs || "--";
  }

  if (coordFormat === "mgrs") {
    return coords.mgrs || coords.lldm || coords.dd || "--";
  }

  return coords.lldm || coords.dd || coords.mgrs || "--";
}

function isMeaningfulAtoRouteRow(row = {}, index = 0) {
  const normalizedWp = sanitizeUpperText(row.wp || "", 24);
  return Boolean(
    sanitizeTimeInput(row.time || "") ||
    sanitizeFreeText(row.dist || "", 20) ||
    Number.isFinite(row.etaSeconds) ||
    sanitizeFreeText(row.desc || "", 120) ||
    sanitizeMultilineText(row.coords || "", 180) ||
    sanitizeFreeText(row.alt || "", 20) ||
    sanitizeFreeText(row.spd || "", 20) ||
    sanitizeDigits(String(row.hdg || ""), 3) ||
    sanitizeUpperText(row.beacon || "", 24) ||
    (normalizedWp && normalizedWp !== `WP${index + 1}`)
  );
}

function renderKneeboardToCanvas(atoData, options = {}) {
  const ato = normalizeAtoData(atoData);
  const overview = collectOverviewDataFromInputs();
  const coordFormat = options.coordFormat === "mgrs"
    ? "mgrs"
    : options.coordFormat === "dd"
      ? "dd"
      : "lldm";
  const canvas = document.createElement("canvas");
  canvas.width = KNEEBOARD_EXPORT_WIDTH;
  canvas.height = KNEEBOARD_EXPORT_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const accentColor = ato.inherited.color || "#58c7ff";
  const margin = 72;
  const contentWidth = canvas.width - (margin * 2);
  const routeRows = ato.route.filter(isMeaningfulAtoRouteRow);
  const routePageSize = Number.isFinite(options.routePageSize) && options.routePageSize > 0
    ? options.routePageSize
    : 15;
  const routePageIndex = Number.isFinite(options.routePageIndex) && options.routePageIndex >= 0
    ? options.routePageIndex
    : 0;
  const routePageCount = Number.isFinite(options.routePageCount) && options.routePageCount > 0
    ? options.routePageCount
    : Math.max(1, Math.ceil(routeRows.length / routePageSize));
  const routeStart = routePageIndex * routePageSize;
  const visibleRouteRows = routeRows.slice(routeStart, routeStart + routePageSize);
  const commPlanItems = buildKneeboardCommPlanItems(ato);
  const airfieldTileItems = buildKneeboardAirfieldTileItems(ato);
  const missionDataItems = [
    { key: "LEADER", value: ato.inherited.leader || "--" },
    { key: "AIRCRAFT", value: `${ato.inherited.aircraftCount || "--"} x ${ato.inherited.aircraftType || "--"}` },
    { key: "TARGET", value: [ato.targetName, ato.targetDetails].filter(Boolean).join(" · ") || "--" },
    { key: "IFF", value: formatKneeboardIffValue(ato).replace(" · ", "\n") },
    { key: "DATALINK", value: ato.datalink || "--" },
    { key: "LASER", value: ato.laser || "--" }
  ];
  const executionItems = [
    { key: "STEP", value: formatZuluTime(getAtoStepTime(ato)) },
    { key: "TAKEOFF", value: formatZuluTime(ato.launchTime) },
    { key: "PUSH", value: `${formatZuluTime(ato.pushTime)}\nNET ${formatShortTime(ato.pushNet)}\nNLT ${formatShortTime(ato.pushNlt)}` },
    { key: "TOT", value: `${formatZuluTime(ato.totTime)}\nNET ${formatShortTime(ato.totNet)}\nNLT ${formatShortTime(ato.totNlt)}` },
    { key: "LAND", value: formatZuluTime(ato.recoveryTime) },
    { key: "FUEL", value: `BINGO ${ato.fuelNote || "--"}\nJOKER ${ato.fuelPlan || "--"}` }
  ];
  const topListOptions = {
    rowHeight: 62,
    keyFont: '800 16px "Segoe UI", Arial, sans-serif',
    valueFont: '600 16px "Segoe UI", Arial, sans-serif',
    valueLineHeight: 18,
    valueMaxLines: 3,
    rowGap: 10
  };

  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, "#08131f");
  bgGradient.addColorStop(.5, "#0b1d2e");
  bgGradient.addColorStop(1, "#08111b");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const flareGradient = ctx.createRadialGradient(canvas.width * .82, 140, 20, canvas.width * .82, 140, 520);
  flareGradient.addColorStop(0, "rgba(125,240,183,0.18)");
  flareGradient.addColorStop(1, "rgba(125,240,183,0)");
  ctx.fillStyle = flareGradient;
  ctx.fillRect(0, 0, canvas.width, 560);

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let y = 0; y < canvas.height; y += 96) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  ctx.restore();

  fillRoundedRect(ctx, margin, 54, contentWidth, 180, 34, "rgba(8, 19, 31, 0.82)");
  strokeRoundedRect(ctx, margin, 54, contentWidth, 180, 34, "rgba(160,205,255,0.18)", 2);

  ctx.save();
  ctx.fillStyle = accentColor;
  ctx.fillRect(margin + 32, 86, 220, 8);
  ctx.font = '900 54px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#f4fbff";
  ctx.fillText(trimCanvasText(ctx, ato.inherited.callsign || "PACKAGE", 520), margin + 32, 140);
  ctx.textAlign = "right";
  ctx.font = '800 24px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#a7c0dd";
  ctx.fillText(formatDate(overview.dateInGame), margin + contentWidth - 32, 102);
  ctx.restore();

  drawCanvasTextBlock(
    ctx,
    [ato.inherited.mission || "TASK", ato.targetName || "TARGET --", ato.inherited.packageName ? `PKG ${ato.inherited.packageName}` : ""]
      .filter(Boolean)
      .join(" · "),
    margin + 32,
    176,
    860,
    {
      font: '700 22px "Segoe UI", Arial, sans-serif',
      color: "#d7e6f8",
      lineHeight: 26,
      maxLines: 1
    }
  );

  ctx.save();
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.font = '700 20px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#eaf4ff";
  ctx.fillText(
    overview.dateInGame ? `${formatDate(overview.dateInGame)} · ${formatTimeLocal(overview.startTime)}` : formatTimeLocal(overview.startTime),
    margin + contentWidth - 32,
    138
  );
  ctx.fillText(overview.mapName || "--", margin + contentWidth - 32, 162);
  ctx.restore();

  const layoutMetrics = getKneeboardLayoutMetrics({
    canvasHeight: canvas.height,
    margin,
    contentWidth,
    airfieldItemCount: airfieldTileItems.length,
    commPlanItemCount: commPlanItems.length,
    missionDataItemCount: missionDataItems.length,
    executionItemCount: executionItems.length,
    topListContentHeight: Math.max(
      measureKneeboardTwoColumnListHeight(ctx, missionDataItems, 400, topListOptions),
      measureKneeboardTwoColumnListHeight(ctx, executionItems, 400, topListOptions)
    )
  });

  drawKneeboardSection(ctx, margin, layoutMetrics.topSectionY, 448, layoutMetrics.topSectionHeight, "MISSION DATA", accentColor);
  drawKneeboardSection(ctx, margin + 472, layoutMetrics.topSectionY, 448, layoutMetrics.topSectionHeight, "EXECUTION", accentColor);
  drawKneeboardSection(ctx, margin + 944, layoutMetrics.topSectionY, 448, layoutMetrics.topSectionHeight, "AIRFIELD", accentColor);
  drawKneeboardSection(ctx, margin, layoutMetrics.routeSectionY, contentWidth, layoutMetrics.routeSectionHeight, "ROUTE", accentColor);
  drawKneeboardSection(ctx, margin, layoutMetrics.commSectionY, contentWidth, layoutMetrics.commSectionHeight, "COMM PLAN", accentColor);

  drawKneeboardTwoColumnKeyValueList(ctx, missionDataItems, margin + 24, layoutMetrics.topSectionY + 84, 400, accentColor, topListOptions);

  drawKneeboardTwoColumnKeyValueList(ctx, executionItems, margin + 496, layoutMetrics.topSectionY + 84, 400, accentColor, topListOptions);

  drawCanvasTextBlock(
    ctx,
    `PRIMARY ${ato.inherited.intra || "--"} · SEC ${ato.packageFrequencyNote || "--"}`,
    margin + 32,
    204,
    860,
    {
      font: '700 17px "Segoe UI", Arial, sans-serif',
      color: "#9fd3ff",
      lineHeight: 20,
      maxLines: 1
    }
  );

  const tableX = margin + 24;
  const tableY = layoutMetrics.routeContentTop;
  const tableWidth = contentWidth - 48;
  const routeTableMetrics = getKneeboardRouteTableMetrics(tableWidth);
  const rowHeight = 50;

  fillRoundedRect(ctx, tableX, tableY, tableWidth, 56, 16, "rgba(88,199,255,0.12)");
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = '800 13px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#eff7ff";
  ctx.textBaseline = "middle";
  ctx.fillText("WP", tableX + routeTableMetrics.centers.wp, tableY + 28);
  ctx.fillText("TIME", tableX + routeTableMetrics.centers.time, tableY + 28);
  ctx.fillText("DIST", tableX + routeTableMetrics.centers.dist, tableY + 28);
  ctx.fillText("SPD", tableX + routeTableMetrics.centers.spd, tableY + 28);
  ctx.fillText("HDG", tableX + routeTableMetrics.centers.hdg, tableY + 28);
  ctx.fillText("BCN", tableX + routeTableMetrics.centers.beacon, tableY + 28);
  ctx.fillText("ALT", tableX + routeTableMetrics.centers.alt, tableY + 28);
  ctx.fillText(coordFormat === "mgrs" ? "MGRS" : coordFormat === "dd" ? "DD" : "LL DM", tableX + routeTableMetrics.centers.coords, tableY + 28);
  ctx.fillText("DESCRIPTION", tableX + routeTableMetrics.centers.desc, tableY + 28);
  ctx.restore();

  visibleRouteRows.forEach((row, index) => {
    const top = tableY + 72 + (index * rowHeight);
    drawKneeboardRouteRow(ctx, {
      x: tableX,
      y: top,
      width: tableWidth,
      rowHeight: 42,
      wp: row.wp || `WP${routeStart + index + 1}`,
      time: getAtoRouteDisplayTime(ato, row),
      dist: getAtoRouteDisplayDistanceForExport(routeRows, routeStart + index, row),
      spd: row.spd || "--",
      hdg: row.hdg || "--",
      beacon: row.beacon || "--",
      alt: row.alt || "--",
      coords: getAtoRouteCoordinateForFormat(row, coordFormat),
      desc: row.desc || "--",
      metrics: routeTableMetrics,
      accentColor,
      isEven: index % 2 === 0
    });
  });

  if (routePageCount > 1) {
    const routeEnd = Math.min(routeStart + visibleRouteRows.length, routeRows.length);
    drawCanvasTextBlock(
      ctx,
      `WP ${routeStart + 1}-${routeEnd} · PAGE ${routePageIndex + 1}/${routePageCount}`,
      tableX + 6,
      tableY + 72 + (visibleRouteRows.length * rowHeight) + 16,
      tableWidth - 24,
      {
        font: '600 20px "Segoe UI", Arial, sans-serif',
        color: "#9cb7d6",
        lineHeight: 28,
        maxLines: 1
      }
    );
  }

  if (airfieldTileItems.length) {
    drawKneeboardAirfieldTiles(ctx, airfieldTileItems, margin + 968, layoutMetrics.topSectionY + 84, 376, accentColor);
  } else {
    drawCanvasTextBlock(
      ctx,
      "Aucun airfield specifique.",
      margin + 968,
      layoutMetrics.topSectionY + 84,
      376,
      {
        font: '500 15px "Segoe UI", Arial, sans-serif',
        color: "#e8f2ff",
        lineHeight: 19,
        maxLines: 6
      }
    );
  }

  if (commPlanItems.length) {
    drawKneeboardCommPlanTiles(ctx, commPlanItems, margin + 28, layoutMetrics.commSectionY + 92, contentWidth - 56, accentColor);
  } else {
    drawCanvasTextBlock(ctx, "Aucun comm plan declare.", margin + 28, layoutMetrics.commSectionY + 92, contentWidth - 56, {
      font: '500 16px "Segoe UI", Arial, sans-serif',
      color: "#e8f2ff",
      lineHeight: 21,
      maxLines: 3
    });
  }

  ctx.save();
  ctx.textAlign = "right";
  ctx.font = '700 18px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#88a7c7";
  ctx.fillText("Generated by WAR ROOM", canvas.width - margin, canvas.height - 34);
  ctx.restore();

  return canvas;
}

function exportSelectedKneeboard() {
  const ato = getSelectedKneeboardAto();
  if (!ato) {
    alert("Aucun package selectionne.");
    return;
  }

  const coordFormat = kneeboardCoordsFormatSelect?.value || "lldm";
  const normalizedAto = normalizeAtoData(ato);
  const routeRows = normalizedAto.route.filter(isMeaningfulAtoRouteRow);
  const commPlanItems = buildKneeboardCommPlanItems(normalizedAto);
  const airfieldTileItems = buildKneeboardAirfieldTileItems(normalizedAto);
  const missionDataItems = [
    { key: "LEADER", value: normalizedAto.inherited.leader || "--" },
    { key: "AIRCRAFT", value: `${normalizedAto.inherited.aircraftCount || "--"} x ${normalizedAto.inherited.aircraftType || "--"}` },
    { key: "TARGET", value: [normalizedAto.targetName, normalizedAto.targetDetails].filter(Boolean).join(" · ") || "--" },
    { key: "IFF", value: formatKneeboardIffValue(normalizedAto).replace(" · ", "\n") },
    { key: "DATALINK", value: normalizedAto.datalink || "--" },
    { key: "LASER", value: normalizedAto.laser || "--" }
  ];
  const executionItems = [
    { key: "STEP", value: formatZuluTime(getAtoStepTime(normalizedAto)) },
    { key: "TAKEOFF", value: formatZuluTime(normalizedAto.launchTime) },
    { key: "PUSH", value: `${formatZuluTime(normalizedAto.pushTime)}\nNET ${formatShortTime(normalizedAto.pushNet)}\nNLT ${formatShortTime(normalizedAto.pushNlt)}` },
    { key: "TOT", value: `${formatZuluTime(normalizedAto.totTime)}\nNET ${formatShortTime(normalizedAto.totNet)}\nNLT ${formatShortTime(normalizedAto.totNlt)}` },
    { key: "LAND", value: formatZuluTime(normalizedAto.recoveryTime) },
    { key: "FUEL", value: `BINGO ${normalizedAto.fuelNote || "--"}\nJOKER ${normalizedAto.fuelPlan || "--"}` }
  ];
  const topListOptions = {
    rowHeight: 62,
    keyFont: '800 16px "Segoe UI", Arial, sans-serif',
    valueFont: '600 16px "Segoe UI", Arial, sans-serif',
    valueLineHeight: 18,
    valueMaxLines: 3,
    rowGap: 10
  };
  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d");
  const layoutMetrics = getKneeboardLayoutMetrics({
    canvasHeight: KNEEBOARD_EXPORT_HEIGHT,
    margin: 72,
    contentWidth: KNEEBOARD_EXPORT_WIDTH - (72 * 2),
    airfieldItemCount: airfieldTileItems.length,
    commPlanItemCount: commPlanItems.length,
    missionDataItemCount: missionDataItems.length,
    executionItemCount: executionItems.length,
    topListContentHeight: measureCtx
      ? Math.max(
          measureKneeboardTwoColumnListHeight(measureCtx, missionDataItems, 400, topListOptions),
          measureKneeboardTwoColumnListHeight(measureCtx, executionItems, 400, topListOptions)
        )
      : null
  });
  const routePageSize = layoutMetrics.routePageSize;
  const routePageCount = Math.max(1, Math.ceil(routeRows.length / routePageSize));
  const baseFilename = `${sanitizeUpperText(normalizedAto.inherited.callsign || "PACKAGE", 24).replace(/\s+/g, "_")}_KNEEBOARD`;

  for (let pageIndex = 0; pageIndex < routePageCount; pageIndex += 1) {
    const canvas = renderKneeboardToCanvas(normalizedAto, {
      coordFormat,
      routePageIndex: pageIndex,
      routePageSize,
      routePageCount
    });
    if (!canvas) {
      alert("Impossible de construire le kneeboard.");
      return;
    }

    const filename = routePageCount > 1
      ? `${baseFilename}_P${String(pageIndex + 1).padStart(2, "0")}.png`
      : `${baseFilename}.png`;
    downloadCanvasPng(canvas, filename);
  }
}

function shouldUseCompactTopbarActions() {
  return window.innerWidth <= 980;
}

function closeTopbarActionsMenu() {
  if (topbarActionsDropdown) {
    topbarActionsDropdown.hidden = true;
  }

  if (topbarActionsBtn) {
    topbarActionsBtn.setAttribute("aria-expanded", "false");
  }
}

function toggleTopbarActionsMenu() {
  if (!topbarActionsDropdown || !topbarActionsBtn || !shouldUseCompactTopbarActions()) {
    closeTopbarActionsMenu();
    return;
  }

  const willOpen = topbarActionsDropdown.hidden;
  topbarActionsDropdown.hidden = !willOpen;
  topbarActionsBtn.setAttribute("aria-expanded", String(willOpen));
}

function triggerActionFeedback(element) {
  if (!element) return;
  element.classList.remove("is-feedback");
  void element.offsetWidth;
  element.classList.add("is-feedback");
  window.setTimeout(() => {
    element.classList.remove("is-feedback");
  }, 700);
}

function handleTopbarAction(action) {
  switch (action) {
    case "new":
      createNewMission();
      break;
    case "load":
      openMizImportModal();
      break;
    case "kneeboard":
      openKneeboardExportModal();
      break;
    case "url":
      copyCurrentUrl();
      break;
    case "copy-id":
      copyCurrentMissionId();
      break;
    case "paste-id":
      promptAndLoadMissionId();
      break;
    case "menu":
      window.location.href = "../index.html";
      break;
    default:
      break;
  }
}

/* =========================================================
   UI / MODE / COLLAPSE
========================================================= */

function updatePackageEditability(scope = document) {
  const editableNodes = scope.querySelectorAll(".package-editable");
  const isEdition = appShell.classList.contains("mode-edition");

  editableNodes.forEach((node) => {
    node.setAttribute("contenteditable", isEdition ? "true" : "false");
  });
}

function setMode(isEdition) {
  appShell.classList.toggle("mode-edition", isEdition);
  appShell.classList.toggle("mode-briefing", !isEdition);

  modeValue.textContent = isEdition ? "Edition" : "Briefing";
  modeSwitch.setAttribute("aria-pressed", String(isEdition));

  updatePackageEditability(document);
}

function bindField(config) {
  if (!config.input) return;

  const sync = () => {
    if (
      config === fieldDefinitions.startTime ||
      config === fieldDefinitions.totTime ||
      config === fieldDefinitions.endTime ||
      config === fieldDefinitions.weatherValidTime
    ) {
      config.input.value = sanitizeTimeInput(config.input.value);
    }

    updateViewField(config);
    saveCurrentMission();
  };

  config.input.addEventListener("input", sync);
  config.input.addEventListener("change", sync);

  sync();
}

function bindWeatherInputs() {
  const numericSanitizers = new Map([
    [weatherInputs.temperatureC, 3],
    [weatherInputs.windDirection, 3],
    [weatherInputs.windSpeed, 3],
    [weatherInputs.windGust, 3],
    [weatherInputs.fogBase, 5],
    [weatherInputs.fogTop, 5],
    [weatherInputs.layers[0].base, 5],
    [weatherInputs.layers[0].top, 5],
    [weatherInputs.layers[1].base, 5],
    [weatherInputs.layers[1].top, 5],
    [weatherInputs.layers[2].base, 5],
    [weatherInputs.layers[2].top, 5]
  ]);

  const syncWeather = () => {
    numericSanitizers.forEach((maxLength, input) => {
      if (input) {
        input.value = sanitizeDigits(input.value, maxLength);
      }
    });

    if (weatherInputs.qnhInHg) {
      weatherInputs.qnhInHg.value = sanitizeDecimalInput(weatherInputs.qnhInHg.value, 5);
    }

    weatherInputs.layers.forEach((layer) => {
      if (layer.cover) {
        layer.cover.value = String(layer.cover.value || "").toUpperCase();
      }
    });

    updateWeatherVisuals();
    saveCurrentMission();
  };

  if (weatherInputs.qnhInHg) {
    weatherInputs.qnhInHg.addEventListener("input", syncWeather);
    weatherInputs.qnhInHg.addEventListener("change", syncWeather);
  }

  const standardInputs = [
    weatherInputs.temperatureC,
    weatherInputs.windDirection,
    weatherInputs.windSpeed,
    weatherInputs.windGust,
    weatherInputs.fogEnabled,
    weatherInputs.fogBase,
    weatherInputs.fogTop,
    ...weatherInputs.layers.flatMap((layer) => [
      layer.cover,
      layer.base,
      layer.top
    ])
  ];

  standardInputs.forEach((input) => {
    if (!input) return;
    input.addEventListener("input", syncWeather);
    input.addEventListener("change", syncWeather);
  });

  syncWeather();
}

function stopEventPropagationOnProtectedElements() {
  const protectedSelector = [
    ".edit-field-inline",
    ".edit-field",
    ".ato-edit-field",
    ".panel-action-btn",
    ".mini-action-btn",
    ".package-color-input"
  ].join(",");

  [
    "click",
    "keydown",
    "mousedown",
    "mouseup",
    "pointerdown",
    "pointerup",
    "touchstart",
    "touchend"
  ].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      if (event.target.closest(protectedSelector)) {
        event.stopPropagation();
      }
    });
  });
}

function setupCollapsibleSection({
  panelId,
  toggleId,
  chevronId,
  contentId,
  expandedSymbol = "−",
  collapsedSymbol = "+"
}) {
  const panel = document.getElementById(panelId);
  const toggle = document.getElementById(toggleId);
  const chevron = document.getElementById(chevronId);
  const content = document.getElementById(contentId);

  if (!panel || !toggle || !chevron || !content) return;

  const togglePanel = () => {
    const isCollapsed = panel.classList.toggle("is-collapsed");
    toggle.setAttribute("aria-expanded", String(!isCollapsed));
    chevron.textContent = isCollapsed ? collapsedSymbol : expandedSymbol;
  };

  toggle.addEventListener("click", togglePanel);
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePanel();
    }
  });
}

function syncTopbarScrolledState() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  if (!shouldUseCompactTopbarActions()) {
    closeTopbarActionsMenu();
  }
}

function bindMizImportUi() {
  if (!loadMizBtn) return;

  loadMizBtn.addEventListener("click", openMizImportModal);
  mizImportCloseBtn?.addEventListener("click", closeMizImportModal);
  mizImportBackdrop?.addEventListener("click", closeMizImportModal);
  mizBackToFileBtn?.addEventListener("click", () => goToMizStep(1));
  mizBackToCoalitionBtn?.addEventListener("click", () => goToMizStep(2));
  mizValidateFileBtn?.addEventListener("click", validateSelectedMizFile);
  mizCoalitionRedBtn?.addEventListener("click", () => chooseMizCoalition("red"));
  mizCoalitionBlueBtn?.addEventListener("click", () => chooseMizCoalition("blue"));
  mizImportGroupsBtn?.addEventListener("click", importSelectedMizGroups);

  mizSelectAllGroupsBtn?.addEventListener("click", () => {
    const groups = mizImportState.parsedMission?.coalitions?.[mizImportState.selectedCoalition] || [];
    mizImportState.selectedGroupIds = new Set(groups.map((group) => group.id));
    renderMizGroupList();
  });

  mizClearGroupsBtn?.addEventListener("click", () => {
    mizImportState.selectedGroupIds = new Set();
    renderMizGroupList();
  });

  mizFileInput?.addEventListener("change", () => {
    const [file] = Array.from(mizFileInput.files || []);
    if (!file) return;

    mizImportState.file = file;
    if (mizMissionTextInput) {
      mizMissionTextInput.value = "";
    }
    mizImportState.pastedMissionText = "";
    updateMizFileMeta();
    setMizImportStatus(`Fichier pret : ${file.name}`);
  });

  mizMissionTextInput?.addEventListener("input", () => {
    syncMizTextState();
    if (mizImportState.pastedMissionText) {
      mizImportState.file = null;
      if (mizFileInput) {
        mizFileInput.value = "";
      }
      updateMizFileMeta();
      setMizImportStatus("Texte `mission` pret a etre analyse.");
      return;
    }

    setMizImportStatus("En attente du texte `mission = { ... }`.");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mizImportModal?.classList.contains("is-open")) {
      closeMizImportModal();
    }
  });
}

function bindKneeboardExportUi() {
  exportKneeboardBtn?.addEventListener("click", openKneeboardExportModal);
  kneeboardExportCloseBtn?.addEventListener("click", closeKneeboardExportModal);
  kneeboardExportBackdrop?.addEventListener("click", closeKneeboardExportModal);
  kneeboardExportCancelBtn?.addEventListener("click", closeKneeboardExportModal);
  kneeboardPackageSelect?.addEventListener("change", updateKneeboardPackageMeta);
  kneeboardCoordsFormatSelect?.addEventListener("change", updateKneeboardPackageMeta);
  kneeboardExportConfirmBtn?.addEventListener("click", () => {
    exportSelectedKneeboard();
    closeKneeboardExportModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && kneeboardExportModal?.classList.contains("is-open")) {
      closeKneeboardExportModal();
    }
  });
}

/* =========================================================
   INIT
========================================================= */

Object.values(fieldDefinitions).forEach(bindField);
bindWeatherInputs();

modeSwitch.addEventListener("click", () => {
  const nextEditionState = !appShell.classList.contains("mode-edition");
  setMode(nextEditionState);
});

window.addEventListener("scroll", syncTopbarScrolledState, { passive: true });
syncTopbarScrolledState();
bindMizImportUi();
bindKneeboardExportUi();

topbarActionsBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleTopbarActionsMenu();
});

topbarActionItems.forEach((button) => {
  button.addEventListener("click", () => {
    triggerActionFeedback(button);
    handleTopbarAction(button.dataset.topbarAction || "");
    closeTopbarActionsMenu();
  });
});

[
  newMissionBtn,
  loadMizBtn,
  exportKneeboardBtn,
  copyUrlBtn,
  copyMissionIdBtn,
  pasteMissionIdBtn,
  topbarActionsBtn
].forEach((button) => {
  button?.addEventListener("click", () => {
    triggerActionFeedback(button);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".topbar-actions-menu")) {
    closeTopbarActionsMenu();
  }
});

window.addEventListener("resize", syncTopbarScrolledState);

newMissionBtn.addEventListener("click", createNewMission);
copyUrlBtn.addEventListener("click", copyCurrentUrl);
copyMissionIdBtn.addEventListener("click", copyCurrentMissionId);

if (copyMissionIdBtnBottom) {
  copyMissionIdBtnBottom.addEventListener("click", copyCurrentMissionId);
}

pasteMissionIdBtn.addEventListener("click", promptAndLoadMissionId);
copyTokenBtn.addEventListener("click", copyCurrentToken);

if (pasteTokenBtnBottom) {
  pasteTokenBtnBottom.addEventListener("click", promptAndLoadToken);
}

publishMissionBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  publishMission();
});

if (addPackageBtn) {
  addPackageBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addPackage();
  });
}

if (addAirfieldBtn) {
  addAirfieldBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addAirfield();
  });
}

if (updateAtoBtn) {
  updateAtoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateAtoPackageLinks();
  });
}

if (updateAcoBtn) {
  updateAcoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateAcoPackageLinks();
  });
}

if (updateTimelineBtn) {
  updateTimelineBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateTimelineFromAtos();
  });
}

setupCollapsibleSection({
  panelId: "weatherPanel",
  toggleId: "weatherToggle",
  chevronId: "weatherChevron",
  contentId: "weatherContent"
});

setupCollapsibleSection({
  panelId: "airfieldPanel",
  toggleId: "airfieldToggle",
  chevronId: "airfieldChevron",
  contentId: "airfieldContent"
});

setupCollapsibleSection({
  panelId: "packagePanel",
  toggleId: "packageToggle",
  chevronId: "packageChevron",
  contentId: "packageContent"
});

setupCollapsibleSection({
  panelId: "publicationPanel",
  toggleId: "publicationToggle",
  chevronId: "publicationChevron",
  contentId: "publicationContent"
});

setupCollapsibleSection({
  panelId: "atoPanel",
  toggleId: "atoToggle",
  chevronId: "atoChevron",
  contentId: "atoContent"
});

setupCollapsibleSection({
  panelId: "acoPanel",
  toggleId: "acoToggle",
  chevronId: "acoChevron",
  contentId: "acoContent"
});

setupCollapsibleSection({
  panelId: "timelinePanel",
  toggleId: "timelineToggle",
  chevronId: "timelineChevron",
  contentId: "timelineContent"
});

setMode(false);

(async function initializeMission() {
  const missionIdFromUrl = getUrlMissionId();

  if (missionIdFromUrl) {
    const loaded = await loadMissionById(missionIdFromUrl);
    if (loaded) {
      return;
    }
  }

  createNewMission();
})();

stopEventPropagationOnProtectedElements();
