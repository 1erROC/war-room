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
  { wp: "WP1", desc: "", coords: "", alt: "", spd: "" },
  { wp: "WP2", desc: "", coords: "", alt: "", spd: "" },
  { wp: "IP", desc: "", coords: "", alt: "", spd: "" },
  { wp: "TGT", desc: "", coords: "", alt: "", spd: "" },
  { wp: "EP", desc: "", coords: "", alt: "", spd: "" },
  { wp: "WP6", desc: "", coords: "", alt: "", spd: "" }
];

const ATO_COMM_DEFAULTS = [
  { name: "AWACS", freq: "", band: "UHF" },
  { name: "TANKER", freq: "", band: "UHF" },
  { name: "DEPARTURE", freq: "", band: "UHF" },
  { name: "GUARD", freq: "243.000", band: "UHF" }
];

const defaultMissionData = {
  operationName: "",
  mapName: "",
  dateInGame: "",
  dateIRL: "",
  startTime: "",
  totTime: "",
  endTime: "",
  status: "Draft",
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
    fallback: "Draft"
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

  if (ato.comm[2]) {
    ato.comm[2].freq = sanitizeFreeText(importedGroup.intra || "", 16);
    ato.comm[2].name = "PACKAGE";
  }

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
    status: "Planned",
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
    status: fieldDefinitions.status.input.value.trim() || "Draft",
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
  fieldDefinitions.status.input.value = data.status || "Draft";
  fieldDefinitions.weatherArea.input.value = data.weatherArea || "ICAO CODE";
  fieldDefinitions.weatherValidTime.input.value = sanitizeTimeInput(data.weatherValidTime || "");
}

function updateViewField(config) {
  const viewEl = config.viewElement;
  if (!viewEl || !config.input) return;

  const rawValue = config.input.value.trim();
  const displayValue = rawValue
    ? (typeof config.formatter === "function" ? config.formatter(rawValue) : rawValue)
    : config.fallback;

  viewEl.textContent = displayValue;
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
    case "departure":
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
    case "destination":
      element.textContent = sanitizeUpperText(element.textContent, 24);
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

  const liveUpperFields = new Set(["callsign", "packageName", "aircraftType", "departure", "destination"]);
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
    departure: card.querySelector('[data-package-input="departure"]'),
    leader: card.querySelector('[data-package-input="leader"]'),
    wingmenView: card.querySelector('[data-package-view="wingmen"]'),
    wingmenBuilder: card.querySelector('[data-package-input="wingmenBuilder"]'),
    intra: card.querySelector('[data-package-input="intra"]'),
    destination: card.querySelector('[data-package-input="destination"]')
  };
  card._packageFields = fields;

  function applyCardData(normalizedPkg) {
    if (fields.color) fields.color.value = normalizedPkg.color;
    if (fields.callsign) fields.callsign.textContent = normalizedPkg.callsign;
    if (fields.packageNameSelect) fields.packageNameSelect.value = normalizedPkg.packageName;
    if (fields.missionSelect) fields.missionSelect.value = normalizedPkg.mission;
    if (fields.aircraftCount) fields.aircraftCount.textContent = normalizedPkg.aircraftCount;
    if (fields.aircraftType) fields.aircraftType.textContent = normalizedPkg.aircraftType;
    if (fields.departure) fields.departure.textContent = normalizedPkg.departure;
    if (fields.leader) fields.leader.textContent = normalizedPkg.leader;
    if (fields.wingmenView) fields.wingmenView.textContent = normalizedPkg.wingmen;
    renderWingmenBuilder(card, normalizedPkg.wingmen);
    if (fields.intra) fields.intra.textContent = normalizedPkg.intra;
    if (fields.destination) fields.destination.textContent = normalizedPkg.destination;

    syncPackageNameView(card);
    syncPackageTaskView(card);
    card.style.setProperty("--package-accent", normalizedPkg.color);
  }

  applyCardData(pkg);

  [
    ["callsign", fields.callsign],
    ["aircraftCount", fields.aircraftCount],
    ["aircraftType", fields.aircraftType],
    ["departure", fields.departure],
    ["leader", fields.leader],
    ["intra", fields.intra],
    ["destination", fields.destination]
  ].forEach(([fieldName, element]) => {
    bindPackageEditableBehavior(card, fieldName, element);
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
    divertNote: "",
    threats: "",
    roe: "",
    emcon: "",
    abortCriteria: "",
    pushTime: "",
    pushNote: "",
    totNote: "",
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

function sanitizeAtoValue(fieldName, value) {
  const text = String(value || "");

  if (fieldName === "atoDay") {
    return sanitizeDigits(text, 3);
  }

  if (["launchTime", "totTime", "recoveryTime", "pushTime"].includes(fieldName)) {
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
    "totNote",
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

function sanitizeAtoRouteRow(row = {}, fallback = {}) {
  return {
    wp: sanitizeUpperText(row.wp || fallback.wp || "", 24),
    desc: sanitizeFreeText(row.desc || fallback.desc || "", 120),
    coords: sanitizeMultilineText(row.coords || fallback.coords || "", 180),
    alt: sanitizeFreeText(row.alt || fallback.alt || "", 20),
    spd: sanitizeFreeText(row.spd || fallback.spd || "", 20),
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

function sanitizeAtoCommRow(row = {}, fallback = {}) {
  return {
    name: sanitizeUpperText(row.name || fallback.name || "", 24),
    freq: sanitizeFreeText(row.freq || fallback.freq || "", 16),
    band: sanitizeUpperText(row.band || fallback.band || "", 8)
  };
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
    divertNote: sanitizeAtoValue("divertNote", ato.divertNote),
    threats: sanitizeAtoValue("threats", ato.threats),
    roe: sanitizeAtoValue("roe", ato.roe),
    emcon: sanitizeAtoValue("emcon", ato.emcon),
    abortCriteria: sanitizeAtoValue("abortCriteria", ato.abortCriteria),
    pushTime: sanitizeAtoValue("pushTime", ato.pushTime),
    pushNote: sanitizeAtoValue("pushNote", ato.pushNote),
    totNote: sanitizeAtoValue("totNote", ato.totNote),
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
    comm: getDefaultAtoComm().map((row, index) => sanitizeAtoCommRow(ato.comm?.[index], row)),
    route: routeSource.map((row, index) => sanitizeAtoRouteRow(row, { wp: `WP${index + 1}`, desc: "", coords: "", alt: "", spd: "" })),
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

function createAtoCardTemplate() {
  const template = document.createElement("template");
  const commMarkup = ATO_COMM_DEFAULTS.map((row, index) => `
    <div class="ato-comm-row">
      <div class="ato-comm-name">${row.name}</div>
      <div class="ato-editable-view ato-comm-freq" data-ato-view="commFreq${index}">--</div>
      <div class="ato-editable-view ato-comm-band" data-ato-view="commBand${index}">--</div>
      <div class="ato-edit-field ato-edit-field-stack ato-section-full">
        <input class="field-input" data-ato-input="commFreq${index}" type="text" placeholder="Frequency" />
        <input class="field-input" data-ato-input="commBand${index}" type="text" placeholder="Band" />
      </div>
    </div>
  `).join("");

  template.innerHTML = `
    <article class="ato-card is-collapsed">
      <div class="ato-card-toggle" role="button" tabindex="0" aria-expanded="false">
        <div class="ato-card-head">
          <div class="ato-eyebrow">Air Tasking Order · Flight Card</div>
          <div class="ato-title-row">
            <h3 class="ato-title" data-ato-static="callsign">FLIGHT</h3>
            <span class="ato-pill ato-pill-primary" data-ato-static="mission">TASK</span>
            <span class="ato-pill ato-pill-warning" data-ato-static="totTime">TOT --:--Z</span>
            <span class="ato-pill" data-ato-view="totalDistance">DIST --</span>
            <span class="ato-pill" data-ato-view="estFlightTime">EFT --</span>
          </div>
          <div class="ato-subtitle" data-ato-static="subtitle"></div>
        </div>
        <div class="ato-summary-grid ato-summary-grid--header">
          <div class="ato-head-box">
            <div class="ato-head-label">Aircraft</div>
            <div class="ato-head-value" data-ato-static="aircraft"></div>
            <div class="ato-head-sub" data-ato-static="lead"></div>
          </div>
          <div class="ato-head-box">
            <div class="ato-head-label">Launch / Recovery</div>
            <div class="ato-head-value" data-ato-static="launchRecovery"></div>
            <div class="ato-head-sub" data-ato-static="launchRecoverySub"></div>
            <div class="ato-edit-field ato-edit-field-stack">
              <input class="field-input field-input-time" data-ato-input="launchTime" type="text" inputmode="numeric" maxlength="4" placeholder="Launch HHMM" />
              <input class="field-input" data-ato-input="launchDetails" type="text" placeholder="Launch detail" />
            </div>
          </div>
          <div class="ato-head-box">
            <div class="ato-head-label">Package Frequency</div>
            <div class="ato-head-value" data-ato-static="packageFreq"></div>
            <div class="ato-head-sub" data-ato-static="packageFreqSub"></div>
            <div class="ato-edit-field">
              <input class="field-input" data-ato-input="packageFrequencyNote" type="text" placeholder="Frequency note" />
            </div>
          </div>
        </div>
        <div class="ato-card-actions">
          <span class="ato-card-chevron" data-ato-static="chevron">+</span>
        </div>
      </div>

      <div class="ato-card-body">
        <div class="ato-board">
          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Execution Summary</h4><span class="ato-mini-tag">Mission Core</span></div>
            <div class="ato-kv-grid">
              <div class="ato-kv"><div class="ato-k">Primary Task</div><div class="ato-v ato-editable-view" data-ato-view="primaryTask">--</div><div class="ato-s ato-editable-view" data-ato-view="primaryTaskNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="primaryTask" type="text" placeholder="Primary task" /><input class="field-input" data-ato-input="primaryTaskNote" type="text" placeholder="Task note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Secondary Task</div><div class="ato-v ato-editable-view" data-ato-view="secondaryTask">--</div><div class="ato-s ato-editable-view" data-ato-view="secondaryTaskNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="secondaryTask" type="text" placeholder="Secondary task" /><input class="field-input" data-ato-input="secondaryTaskNote" type="text" placeholder="Task note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Package</div><div class="ato-v ato-editable-view" data-ato-view="packageSupport">--</div><div class="ato-s">Inherited package data</div><div class="ato-edit-field"><input class="field-input" data-ato-input="packageSupport" type="text" placeholder="Support detail" /></div></div>
              <div class="ato-kv"><div class="ato-k">Target</div><div class="ato-v ato-editable-view" data-ato-view="targetName">--</div><div class="ato-s ato-editable-view" data-ato-view="targetDetails">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="targetName" type="text" placeholder="Target" /><input class="field-input" data-ato-input="targetDetails" type="text" placeholder="Target detail" /></div></div>
            </div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Flight / Loadout</h4><span class="ato-mini-tag">Platform</span></div>
            <div class="ato-kv-grid">
              <div class="ato-kv"><div class="ato-k">Configuration</div><div class="ato-v" data-ato-static="configuration"></div><div class="ato-s ato-editable-view" data-ato-view="configNote">--</div><div class="ato-edit-field"><input class="field-input" data-ato-input="configNote" type="text" placeholder="Configuration note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Fuel</div><div class="ato-v ato-editable-view" data-ato-view="fuelPlan">--</div><div class="ato-s ato-editable-view" data-ato-view="fuelNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="fuelPlan" type="text" placeholder="Joker" /><input class="field-input" data-ato-input="fuelNote" type="text" placeholder="Bingo" /></div></div>
              <div class="ato-kv"><div class="ato-k">Loadout</div><div class="ato-v ato-editable-view" data-ato-view="loadout">--</div><div class="ato-s ato-editable-view" data-ato-view="loadoutNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="loadout" type="text" placeholder="Loadout" /><input class="field-input" data-ato-input="loadoutNote" type="text" placeholder="Loadout note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Divert</div><div class="ato-v ato-editable-view" data-ato-view="divert">--</div><div class="ato-s ato-editable-view" data-ato-view="divertNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="divert" type="text" placeholder="Divert" /><input class="field-input" data-ato-input="divertNote" type="text" placeholder="Divert note" /></div></div>
            </div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Threat / ROE / WX</h4><span class="ato-mini-tag">Survivability</span></div>
            <ul class="ato-list ato-editable-view">
              <li><strong>Threats:</strong> <span class="ato-static-text" data-ato-view="threats">--</span></li>
              <li><strong>ROE:</strong> <span class="ato-static-text" data-ato-view="roe">--</span></li>
              <li><strong>EMCON:</strong> <span class="ato-static-text" data-ato-view="emcon">--</span></li>
              <li><strong>Abort Criteria:</strong> <span class="ato-static-text" data-ato-view="abortCriteria">--</span></li>
            </ul>
            <div class="ato-edit-field ato-edit-field-stack"><textarea class="ato-textarea" data-ato-input="threats" placeholder="Threats"></textarea><textarea class="ato-textarea" data-ato-input="roe" placeholder="ROE"></textarea><textarea class="ato-textarea" data-ato-input="emcon" placeholder="EMCON"></textarea><textarea class="ato-textarea" data-ato-input="abortCriteria" placeholder="Abort criteria"></textarea></div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Timeline</h4><span class="ato-mini-tag">Critical Times</span></div>
            <div class="ato-kv-grid ato-kv-grid-4">
              <div class="ato-kv"><div class="ato-k">Start</div><div class="ato-v" data-ato-static="startTime"></div><div class="ato-s">Inherited from briefing</div></div>
              <div class="ato-kv"><div class="ato-k">Push</div><div class="ato-v ato-editable-view" data-ato-view="pushTime">--</div><div class="ato-s ato-editable-view" data-ato-view="pushNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input field-input-time" data-ato-input="pushTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /><input class="field-input" data-ato-input="pushNote" type="text" placeholder="Push note" /></div></div>
              <div class="ato-kv"><div class="ato-k">TOT</div><div class="ato-v ato-editable-view" data-ato-view="totTime">--</div><div class="ato-s ato-editable-view" data-ato-view="totNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input field-input-time" data-ato-input="totTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /><input class="field-input" data-ato-input="totNote" type="text" placeholder="TOT note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Recovery</div><div class="ato-v ato-editable-view" data-ato-view="recoveryTime">--</div><div class="ato-s ato-editable-view" data-ato-view="recoveryDetails">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input field-input-time" data-ato-input="recoveryTime" type="text" inputmode="numeric" maxlength="4" placeholder="HHMM" /><input class="field-input" data-ato-input="recoveryDetails" type="text" placeholder="Recovery detail" /></div></div>
            </div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Mission Data</h4><span class="ato-mini-tag">Codes / IDs</span></div>
            <div class="ato-kv-grid">
              <div class="ato-kv"><div class="ato-k">IFF / Mode 1-3</div><div class="ato-v ato-editable-view" data-ato-view="iffModes">--</div><div class="ato-s ato-editable-view" data-ato-view="iffNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="iffModes" type="text" placeholder="IFF" /><input class="field-input" data-ato-input="iffNote" type="text" placeholder="IFF note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Datalink</div><div class="ato-v ato-editable-view" data-ato-view="datalink">--</div><div class="ato-s ato-editable-view" data-ato-view="datalinkNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="datalink" type="text" placeholder="Datalink" /><input class="field-input" data-ato-input="datalinkNote" type="text" placeholder="Datalink note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Laser</div><div class="ato-v ato-editable-view" data-ato-view="laser">--</div><div class="ato-s ato-editable-view" data-ato-view="laserNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="laser" type="text" placeholder="Laser" /><input class="field-input" data-ato-input="laserNote" type="text" placeholder="Laser note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Authentication</div><div class="ato-v ato-editable-view" data-ato-view="authentication">--</div><div class="ato-s ato-editable-view" data-ato-view="authenticationReply">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="authentication" type="text" placeholder="Challenge" /><input class="field-input" data-ato-input="authenticationReply" type="text" placeholder="Reply" /></div></div>
            </div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Flight Composition</h4><span class="ato-mini-tag">Players</span></div>
            <div class="ato-crew-list" data-ato-static="crewList"></div>
          </section>

          <section class="ato-section ato-section-full">
            <div class="ato-section-header"><h4 class="ato-section-title">Route / Profile</h4><span class="ato-mini-tag">Ingress / Egress</span></div>
            <div class="ato-route-main">
              <div class="ato-route" data-ato-static="routeList"></div>
              <div class="ato-route-toolbar">
                <button class="mini-action-btn" data-ato-action="add-route" type="button">Add Waypoint</button>
              </div>
            </div>
            <div class="ato-kv-grid" style="margin-top:14px;">
              <div class="ato-kv">
                <div class="ato-k">Total Distance</div>
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

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Support Matrix</h4><span class="ato-mini-tag">Dependencies</span></div>
            <div class="ato-kv-grid">
              <div class="ato-kv"><div class="ato-k">Escort</div><div class="ato-v ato-editable-view" data-ato-view="supportEscort">--</div><div class="ato-s ato-editable-view" data-ato-view="supportEscortNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="supportEscort" type="text" placeholder="Escort" /><input class="field-input" data-ato-input="supportEscortNote" type="text" placeholder="Escort note" /></div></div>
              <div class="ato-kv"><div class="ato-k">SEAD</div><div class="ato-v ato-editable-view" data-ato-view="supportSead">--</div><div class="ato-s ato-editable-view" data-ato-view="supportSeadNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="supportSead" type="text" placeholder="SEAD" /><input class="field-input" data-ato-input="supportSeadNote" type="text" placeholder="SEAD note" /></div></div>
              <div class="ato-kv"><div class="ato-k">Tanker</div><div class="ato-v ato-editable-view" data-ato-view="supportTanker">--</div><div class="ato-s ato-editable-view" data-ato-view="supportTankerNote">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="supportTanker" type="text" placeholder="Tanker" /><input class="field-input" data-ato-input="supportTankerNote" type="text" placeholder="Tanker note" /></div></div>
              <div class="ato-kv"><div class="ato-k">C2</div><div class="ato-v ato-editable-view" data-ato-view="supportC2">--</div><div class="ato-s ato-editable-view" data-ato-view="supportC2Note">--</div><div class="ato-edit-field ato-edit-field-stack"><input class="field-input" data-ato-input="supportC2" type="text" placeholder="C2" /><input class="field-input" data-ato-input="supportC2Note" type="text" placeholder="C2 note" /></div></div>
            </div>
          </section>

          <section class="ato-section">
            <div class="ato-section-header"><h4 class="ato-section-title">Comm Plan</h4><span class="ato-mini-tag">C2 / Radios</span></div>
            <div class="ato-comm-table">
              <div class="ato-comm-row"><div class="ato-comm-name">Package Common</div><div class="ato-comm-freq" data-ato-static="packageCommonFreq"></div><div class="ato-comm-band">UHF</div></div>
              <div class="ato-comm-row"><div class="ato-comm-name">Intra-flight</div><div class="ato-comm-freq" data-ato-static="intraFreq"></div><div class="ato-comm-band">UHF</div></div>
              ${commMarkup}
            </div>
          </section>

          <section class="ato-section ato-section-full">
            <div class="ato-section-header"><h4 class="ato-section-title">Pilot Notes</h4><span class="ato-mini-tag">Focus Items</span></div>
            <div class="ato-notes-body ato-editable-view" data-ato-view="pilotNotes">--</div>
            <div class="ato-edit-field"><textarea class="ato-textarea" data-ato-input="pilotNotes" placeholder="Pilot notes"></textarea></div>
          </section>

          <section class="ato-section ato-section-full">
            <div class="ato-section-header"><h4 class="ato-section-title">Commander Notes</h4><span class="ato-mini-tag">Free Text</span></div>
            <div class="ato-notes-body ato-editable-view" data-ato-view="commanderNotes">--</div>
            <div class="ato-edit-field"><textarea class="ato-textarea" data-ato-input="commanderNotes" placeholder="Commander notes"></textarea></div>
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

function createAtoRouteRowElement(routeRow, index, onChange, onRemove) {
  const row = sanitizeAtoRouteRow(routeRow, { wp: `WP${index + 1}`, desc: "", coords: "", alt: "", spd: "" });
  const coordsDisplay = parseAtoRouteCoordinatesDisplay(row.coords);
  const wrapper = document.createElement("div");
  wrapper.className = "ato-route-row";
  wrapper.dataset.etaSeconds = Number.isFinite(row.etaSeconds) ? String(row.etaSeconds) : "";
  wrapper.innerHTML = `
    <div class="ato-editable-view ato-route-wp" data-role="wp-view">${row.wp || "--"}</div>
    <div class="ato-editable-view" data-role="desc-view">${row.desc || "--"}</div>
    <div class="ato-editable-view ato-route-coords" data-role="coords-view">
      <div class="ato-route-coords-ddm">${coordsDisplay.lldm || "--"}</div>
      <div class="ato-route-coords-dd">${coordsDisplay.dd || "--"}</div>
      <div class="ato-route-coords-mgrs">${coordsDisplay.mgrs || "--"}</div>
    </div>
    <div class="ato-editable-view ato-route-alt" data-role="alt-view">${row.alt || "--"}</div>
    <div class="ato-editable-view ato-route-spd" data-role="spd-view">${row.spd || "--"}</div>
    <div class="ato-edit-field ato-edit-field-stack ato-section-full">
      <input class="field-input" data-role="wp-input" type="text" placeholder="WP" value="${row.wp}" />
      <input class="field-input" data-role="desc-input" type="text" placeholder="Description" value="${row.desc}" />
      <textarea class="ato-textarea" data-role="coords-input" placeholder="LL DM&#10;DD&#10;MGRS">${row.coords}</textarea>
      <input class="field-input" data-role="alt-input" type="text" placeholder="Altitude" value="${row.alt}" />
      <input class="field-input" data-role="spd-input" type="text" placeholder="Speed" value="${row.spd}" />
      <button class="mini-action-btn package-delete-btn" data-role="remove-route" type="button">Remove Waypoint</button>
    </div>
  `;

  const wpInput = wrapper.querySelector('[data-role="wp-input"]');
  const descInput = wrapper.querySelector('[data-role="desc-input"]');
  const coordsInput = wrapper.querySelector('[data-role="coords-input"]');
  const altInput = wrapper.querySelector('[data-role="alt-input"]');
  const spdInput = wrapper.querySelector('[data-role="spd-input"]');
  const removeBtn = wrapper.querySelector('[data-role="remove-route"]');

  [wpInput, descInput, coordsInput, altInput, spdInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => {
      if (input === wpInput) {
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

function renderAtoRouteRows(card) {
  const routeList = card._atoFields?.statics?.routeList;
  if (!routeList) return;

  routeList.innerHTML = "";
  card._atoRouteRows = [];

  card._atoData.route.forEach((routeRow, index) => {
    const element = createAtoRouteRowElement(
      routeRow,
      index,
      () => {
        card._atoData = collectAtoDataFromCard(card);
        updateAtoCardViews(card);
        saveCurrentMission();
      },
      () => {
        card._atoData.route.splice(index, 1);
        if (card._atoData.route.length === 0) {
          card._atoData.route.push({ wp: "WP1", desc: "", coords: "", alt: "", spd: "" });
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

function updateAtoCardViews(card) {
  if (!card?._atoFields) return;

  const data = normalizeAtoData(card._atoData || {});
  const { views, statics } = card._atoFields;
  const inherited = data.inherited;

  card._atoData = data;
  card.style.setProperty("--ato-accent", inherited.color || getRandomPackageColor());
  card.classList.toggle("is-collapsed", data.collapsed);

  if (card._atoToggle) {
    card._atoToggle.setAttribute("aria-expanded", String(!data.collapsed));
  }

  setText(statics.callsign, inherited.callsign || "FLIGHT");
  setText(statics.mission, inherited.mission || "TASK");
  setText(statics.totTime, `TOT ${formatZuluTime(data.totTime)}`);
  setText(statics.subtitle, `Package ${inherited.packageName || "--"} · Mission ${inherited.operationName || inherited.mission || "--"}`);
  setText(statics.aircraft, `${inherited.aircraftCount || "--"} × ${inherited.aircraftType || "--"}`);
  setText(statics.lead, `Lead: ${inherited.leader || "--"}`);
  setText(statics.launchRecovery, `T/O ${formatZuluTime(data.launchTime)}`);
  setText(
    statics.launchRecoverySub,
    `${data.launchDetails || inherited.departure || "--"} · RTB ${formatZuluTime(data.recoveryTime)}${data.recoveryDetails ? ` · ${data.recoveryDetails}` : ""}`
  );
  setText(statics.packageFreq, inherited.intra || "--");
  setText(statics.packageFreqSub, data.packageFrequencyNote || "Primary package common");
  setText(statics.configuration, `${inherited.aircraftCount || "--"} × ${inherited.aircraftType || "--"}`);
  setText(statics.startTime, formatZuluTime(inherited.startTime));
  setText(statics.packageCommonFreq, inherited.intra || "--");
  setText(statics.intraFreq, inherited.intra || "--");
  setText(statics.chevron, data.collapsed ? "+" : "−");
  renderAtoRouteRows(card);

  const crewMembers = getAtoCrewMembers(inherited);
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

  Object.entries(views).forEach(([fieldName, node]) => {
    if (!node) return;

    if (fieldName.startsWith("commFreq")) {
      setText(node, data.comm[Number(fieldName.replace("commFreq", ""))]?.freq || "--");
      return;
    }

    if (fieldName.startsWith("commBand")) {
      setText(node, data.comm[Number(fieldName.replace("commBand", ""))]?.band || "--");
      return;
    }

    if (["launchTime", "totTime", "recoveryTime", "pushTime"].includes(fieldName)) {
      setText(node, formatZuluTime(data[fieldName]));
      return;
    }

    if (fieldName === "totalDistance") {
      setText(node, `DIST ${formatDistanceNm(data.totalDistance)}`);
      return;
    }

    if (fieldName === "estFlightTime") {
      setText(node, `EFT ${formatFlightDuration(data.estFlightTime)}`);
      return;
    }

    if (fieldName === "totalDistanceDetail") {
      setText(node, formatDistanceNm(data.totalDistance));
      return;
    }

    if (fieldName === "estFlightTimeDetail") {
      setText(node, formatFlightDuration(data.estFlightTime));
      return;
    }

    setText(node, data[fieldName] || "--");
  });
}

function collectAtoDataFromCard(card) {
  const data = normalizeAtoData(card._atoData || {});
  const inputs = card._atoFields?.inputs || {};

  Object.entries(inputs).forEach(([fieldName, input]) => {
    if (!input || fieldName.startsWith("comm")) return;
    data[fieldName] = sanitizeAtoValue(fieldName, input.value);
  });

  data.route = (card._atoRouteRows || []).map((rowElement, index) => sanitizeAtoRouteRow({
    wp: rowElement.querySelector('[data-role="wp-input"]')?.value,
    desc: rowElement.querySelector('[data-role="desc-input"]')?.value,
    coords: rowElement.querySelector('[data-role="coords-input"]')?.value,
    alt: rowElement.querySelector('[data-role="alt-input"]')?.value,
    spd: rowElement.querySelector('[data-role="spd-input"]')?.value,
    etaSeconds: Number(rowElement.dataset.etaSeconds)
  }, { wp: `WP${index + 1}`, desc: "", coords: "", alt: "", spd: "" }));

  data.comm = getDefaultAtoComm().map((row, index) => sanitizeAtoCommRow({
    name: row.name,
    freq: inputs[`commFreq${index}`]?.value,
    band: inputs[`commBand${index}`]?.value
  }, row));

  return normalizeAtoData(data);
}

function atoShouldSanitizeOnInput(fieldName) {
  return [
    "launchTime",
    "totTime",
    "recoveryTime",
    "pushTime",
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
      meta: card.querySelector('[data-ato-static="meta"]'),
      aircraft: card.querySelector('[data-ato-static="aircraft"]'),
      lead: card.querySelector('[data-ato-static="lead"]'),
      launchRecovery: card.querySelector('[data-ato-static="launchRecovery"]'),
      launchRecoverySub: card.querySelector('[data-ato-static="launchRecoverySub"]'),
      packageFreq: card.querySelector('[data-ato-static="packageFreq"]'),
      packageFreqSub: card.querySelector('[data-ato-static="packageFreqSub"]'),
      configuration: card.querySelector('[data-ato-static="configuration"]'),
      startTime: card.querySelector('[data-ato-static="startTime"]'),
      routeList: card.querySelector('[data-ato-static="routeList"]'),
      crewList: card.querySelector('[data-ato-static="crewList"]'),
      packageCommonFreq: card.querySelector('[data-ato-static="packageCommonFreq"]'),
      intraFreq: card.querySelector('[data-ato-static="intraFreq"]'),
      chevron: card.querySelector('[data-ato-static="chevron"]')
    }
  };

  Object.entries(card._atoFields.inputs).forEach(([fieldName, input]) => {
    if (!input) return;

    if (fieldName.startsWith("commFreq")) input.value = ato.comm[Number(fieldName.replace("commFreq", ""))]?.freq || "";
    else if (fieldName.startsWith("commBand")) input.value = ato.comm[Number(fieldName.replace("commBand", ""))]?.band || "";
    else input.value = ato[fieldName] || "";

    const commit = () => {
      if (!fieldName.startsWith("comm")) {
        input.value = sanitizeAtoValue(fieldName, input.value);
      }
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
    };

    input.addEventListener("input", () => {
      if (atoShouldSanitizeOnInput(fieldName) && !fieldName.startsWith("comm")) {
        input.value = sanitizeAtoValue(fieldName, input.value);
      }
    });

    input.addEventListener("change", commit);
    input.addEventListener("blur", commit);
  });

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

  const addRouteBtn = card.querySelector('[data-ato-action="add-route"]');
  if (addRouteBtn) {
    addRouteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextIndex = card._atoData.route.length + 1;
      card._atoData.route.push({ wp: `WP${nextIndex}`, desc: "", coords: "", alt: "", spd: "" });
      renderAtoRouteRows(card);
      card._atoData = collectAtoDataFromCard(card);
      updateAtoCardViews(card);
      saveCurrentMission();
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
    packages: normalizePackagesArray(briefing.packages),
    atos: normalizeAtosArray(briefing.atos),
    acos: normalizeAcosArray(briefing.acos),
    timelinePackages: normalizeTimelinePackagesArray(briefing.timelinePackages)
  };

  applyOverviewDataToInputs(currentMissionData);
  applyWeatherDataToInputs(currentMissionData.weather);
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
    packages: normalizePackagesArray(briefing?.packages),
    atos: normalizeAtosArray(briefing?.atos),
    acos: normalizeAcosArray(briefing?.acos),
    timelinePackages: normalizeTimelinePackagesArray(briefing?.timelinePackages)
  };

  applyOverviewDataToInputs(currentMissionData);
  applyWeatherDataToInputs(currentMissionData.weather);
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
    maxLines = Infinity
  } = options;

  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "top";

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

function drawKneeboardTwoColumnKeyValueList(ctx, items, x, y, width, accentColor) {
  const gap = 26;
  const columnWidth = Math.max((width - gap) / 2, 120);
  const rowHeight = 68;

  items.forEach(({ key, value }, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const itemX = x + (column * (columnWidth + gap));
    const itemY = y + (row * rowHeight);

    ctx.save();
    ctx.font = '800 17px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = accentColor;
    ctx.textBaseline = "top";
    ctx.fillText(key, itemX, itemY);
    ctx.restore();

    drawCanvasTextBlock(ctx, value || "--", itemX, itemY + 24, columnWidth, {
      font: '600 18px "Segoe UI", Arial, sans-serif',
      color: "#e8f3ff",
      lineHeight: 20,
      maxLines: 2
    });
  });
}

function drawKneeboardRouteRow(ctx, {
  x,
  y,
  width,
  rowHeight,
  time,
  wp,
  coords,
  alt,
  spd,
  desc,
  accentColor,
  isEven
}) {
  const timeCol = 138;
  const wpCol = 122;
  const coordsCol = 308;
  const altCol = 122;
  const spdCol = 118;
  const descCol = width - timeCol - wpCol - coordsCol - altCol - spdCol;

  fillRoundedRect(ctx, x, y, width, rowHeight, 12, isEven ? "rgba(255,255,255,0.028)" : "rgba(255,255,255,0.05)");

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.font = '700 18px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#eef6ff";
  ctx.fillText(trimCanvasText(ctx, time || "--:--L", timeCol - 24), x + 16, y + (rowHeight / 2));
  ctx.fillStyle = accentColor;
  ctx.fillText(trimCanvasText(ctx, wp || "--", wpCol - 24), x + timeCol + 16, y + (rowHeight / 2));
  ctx.restore();

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.font = '600 14px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#d3e5fb";
  ctx.fillText(trimCanvasText(ctx, coords || "--", coordsCol - 24), x + timeCol + wpCol + 16, y + (rowHeight / 2));
  ctx.restore();

  ctx.save();
  ctx.textBaseline = "top";
  ctx.font = '600 15px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#d9e8f8";
  ctx.fillText(trimCanvasText(ctx, alt || "--", altCol - 24), x + timeCol + wpCol + coordsCol + 16, y + 10);
  ctx.fillText(trimCanvasText(ctx, spd || "--", spdCol - 24), x + timeCol + wpCol + coordsCol + altCol + 16, y + 10);
  ctx.restore();

  drawCanvasTextBlock(ctx, desc || "--", x + timeCol + wpCol + coordsCol + altCol + spdCol + 16, y + 8, descCol - 24, {
    font: '600 14px "Segoe UI", Arial, sans-serif',
    color: "#e7f2ff",
    lineHeight: 17,
    maxLines: 3
  });
}

function buildKneeboardSupportMatrixLines(atoData = {}) {
  const ato = normalizeAtoData(atoData);
  return [
    ato.supportEscort ? `ESCORT · ${[ato.supportEscort, ato.supportEscortNote].filter(Boolean).join(" · ")}` : "",
    ato.supportSead ? `SEAD · ${[ato.supportSead, ato.supportSeadNote].filter(Boolean).join(" · ")}` : "",
    ato.supportTanker ? `TANKER · ${[ato.supportTanker, ato.supportTankerNote].filter(Boolean).join(" · ")}` : "",
    ato.supportC2 ? `C2 · ${[ato.supportC2, ato.supportC2Note].filter(Boolean).join(" · ")}` : "",
    ato.packageSupport ? `PACKAGE · ${ato.packageSupport}` : ""
  ].filter(Boolean);
}

function getAtoRouteDisplayTime(atoData, row) {
  const ato = normalizeAtoData(atoData);
  const missionStartMinutes = timeDigitsToMinutes(ato.inherited.startTime);
  if (missionStartMinutes === null || !Number.isFinite(row?.etaSeconds)) {
    return "--:--L";
  }

  return formatTimeLocal(secondsToTimeDigits((missionStartMinutes * 60) + row.etaSeconds));
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
    Number.isFinite(row.etaSeconds) ||
    sanitizeFreeText(row.desc || "", 120) ||
    sanitizeMultilineText(row.coords || "", 180) ||
    sanitizeFreeText(row.alt || "", 20) ||
    sanitizeFreeText(row.spd || "", 20) ||
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
  const supportMatrixLines = buildKneeboardSupportMatrixLines(ato);

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
  ctx.fillRect(margin + 32, 92, 220, 8);
  ctx.font = '900 54px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#f4fbff";
  ctx.fillText(trimCanvasText(ctx, ato.inherited.callsign || "PACKAGE", 520), margin + 32, 146);
  ctx.textAlign = "right";
  ctx.font = '800 24px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#a7c0dd";
  ctx.fillText(formatDate(overview.dateInGame), margin + contentWidth - 32, 110);
  ctx.restore();

  drawCanvasTextBlock(
    ctx,
    [ato.inherited.mission || "TASK", ato.targetName || "TARGET --", ato.inherited.packageName ? `PKG ${ato.inherited.packageName}` : ""]
      .filter(Boolean)
      .join(" · "),
    margin + 32,
    194,
    760,
    {
      font: '700 24px "Segoe UI", Arial, sans-serif',
      color: "#d7e6f8",
      lineHeight: 30,
      maxLines: 2
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
    150
  );
  ctx.fillText(overview.mapName || "--", margin + contentWidth - 32, 174);
  ctx.restore();

  drawKneeboardSection(ctx, margin, 268, 660, 292, "MISSION DATA", accentColor);
  drawKneeboardSection(ctx, margin + 684, 268, 708, 292, "EXECUTION", accentColor);
  drawKneeboardSection(ctx, margin, 592, contentWidth, 1052, "ROUTE", accentColor);
  drawKneeboardSection(ctx, margin, 1676, 420, 302, "COMMS", accentColor);
  drawKneeboardSection(ctx, margin + 452, 1676, 420, 302, "SUPPORT MATRIX", accentColor);
  drawKneeboardSection(ctx, margin + 904, 1676, 488, 302, "NOTES", accentColor);

  drawKneeboardTwoColumnKeyValueList(ctx, [
    { key: "PACKAGE", value: ato.inherited.packageName || "--" },
    { key: "AIRCRAFT", value: `${ato.inherited.aircraftCount || "--"} x ${ato.inherited.aircraftType || "--"}` },
    { key: "LEAD", value: ato.inherited.leader || "--" },
    { key: "DEP / RTB", value: `${ato.launchDetails || ato.inherited.departure || "--"} / ${ato.recoveryDetails || ato.inherited.destination || "--"}` },
    { key: "TARGET", value: [ato.targetName, ato.targetDetails].filter(Boolean).join(" · ") || "--" }
  ], margin + 24, 352, 612, accentColor);

  drawKneeboardTwoColumnKeyValueList(ctx, [
    { key: "STEP", value: formatTimeLocal(ato.inherited.startTime) },
    { key: "TAKEOFF", value: formatTimeLocal(ato.launchTime) },
    { key: "TOT", value: formatZuluTime(ato.totTime) },
    { key: "RECOVERY", value: formatZuluTime(ato.recoveryTime) }
  ], margin + 708, 352, 660, accentColor);

  const tableX = margin + 24;
  const tableY = 676;
  const tableWidth = contentWidth - 48;
  const timeCol = 138;
  const wpCol = 122;
  const coordsCol = 308;
  const altCol = 122;
  const spdCol = 118;
  const rowHeight = 56;

  fillRoundedRect(ctx, tableX, tableY, tableWidth, 56, 16, "rgba(88,199,255,0.12)");
  ctx.save();
  ctx.font = '800 17px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#eff7ff";
  ctx.textBaseline = "middle";
  ctx.fillText("TIME", tableX + 18, tableY + 28);
  ctx.fillText("WP", tableX + timeCol + 18, tableY + 28);
  ctx.fillText(coordFormat === "mgrs" ? "MGRS" : coordFormat === "dd" ? "DD" : "LL DM", tableX + timeCol + wpCol + 18, tableY + 28);
  ctx.fillText("ALT", tableX + timeCol + wpCol + coordsCol + 18, tableY + 28);
  ctx.fillText("SPD", tableX + timeCol + wpCol + coordsCol + altCol + 18, tableY + 28);
  ctx.fillText("DESCRIPTION", tableX + timeCol + wpCol + coordsCol + altCol + spdCol + 18, tableY + 28);
  ctx.restore();

  visibleRouteRows.forEach((row, index) => {
    const top = tableY + 72 + (index * rowHeight);
    drawKneeboardRouteRow(ctx, {
      x: tableX,
      y: top,
      width: tableWidth,
      rowHeight: 48,
      time: getAtoRouteDisplayTime(ato, row),
      wp: row.wp || `WP${routeStart + index + 1}`,
      coords: getAtoRouteCoordinateForFormat(row, coordFormat),
      alt: row.alt || "--",
      spd: row.spd || "--",
      desc: row.desc || "--",
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

  const commRows = ato.comm.filter((row) => row.name || row.freq || row.band);
  let commY = 1768;
  commRows.forEach((row) => {
    ctx.save();
    ctx.font = '800 16px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = accentColor;
    ctx.textBaseline = "top";
    ctx.fillText(trimCanvasText(ctx, row.name || "--", 160), margin + 28, commY);
    ctx.font = '600 18px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = "#e8f3ff";
    ctx.fillText(trimCanvasText(ctx, `${row.freq || "--"} ${row.band || ""}`.trim(), 240), margin + 28, commY + 20);
    ctx.restore();
    commY += 44;
  });

  if (!commRows.length) {
    drawCanvasTextBlock(ctx, "Aucune frequence package renseignee.", margin + 28, 1768, 360, {
      font: '500 18px "Segoe UI", Arial, sans-serif',
      color: "#9eb9d7",
      lineHeight: 24,
      maxLines: 3
    });
  }

  drawCanvasTextBlock(
    ctx,
    supportMatrixLines.join("\n\n") || "Aucun support declare.",
    margin + 480,
    1768,
    364,
    {
      font: '500 16px "Segoe UI", Arial, sans-serif',
      color: "#e8f2ff",
      lineHeight: 21,
      maxLines: 12
    }
  );

  const notesText = [
    ato.threats ? `THREATS\n${ato.threats}` : "",
    ato.abortCriteria ? `ABORT\n${ato.abortCriteria}` : "",
    ato.pilotNotes ? `PILOT NOTES\n${ato.pilotNotes}` : "",
    ato.commanderNotes ? `COMMANDER NOTES\n${ato.commanderNotes}` : ""
  ].filter(Boolean).join("\n\n");

  drawCanvasTextBlock(
    ctx,
    notesText || "Aucune note specifique.",
    margin + 932,
    1768,
    432,
    {
      font: '500 16px "Segoe UI", Arial, sans-serif',
      color: "#e8f2ff",
      lineHeight: 20,
      maxLines: 10
    }
  );

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
  const routeRows = ato.route.filter(isMeaningfulAtoRouteRow);
  const routePageSize = 15;
  const routePageCount = Math.max(1, Math.ceil(routeRows.length / routePageSize));
  const baseFilename = `${sanitizeUpperText(ato.inherited.callsign || "PACKAGE", 24).replace(/\s+/g, "_")}_KNEEBOARD`;

  for (let pageIndex = 0; pageIndex < routePageCount; pageIndex += 1) {
    const canvas = renderKneeboardToCanvas(ato, {
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
  const topbar = document.querySelector(".topbar");
  return Boolean(topbar?.classList.contains("is-scrolled") && window.innerWidth <= 1280);
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
  topbar.classList.toggle("is-scrolled", window.scrollY > 24);
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
    handleTopbarAction(button.dataset.topbarAction || "");
    closeTopbarActionsMenu();
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
