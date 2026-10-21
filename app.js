const STORAGE_KEY = "vision-logbook-v1";
const NOTE_KEY = "vision-logbook-note-v1";
const EXAM_LAST_KEY = "vision-logbook-exam-last-v1";
const EXAM_RECENT_KEY = "vision-logbook-exam-recent-v1";

const ORG = "广东省人民医院眼科";

const seedRecords = [
  {id:"r-001",date:"2026-10-18",type:"住院",status:"已完成",patientNo:"2026101807",name:"林女士",gender:"女",age:68,eye:"OU 双眼",diagnosis:"年龄相关性白内障",chiefComplaint:"双眼视物模糊半年，右眼较重。",exams:["视力","眼压","裂隙灯","眼底"],examDetails:"OD 0.3 / OS 0.5，矫正视力 OD 0.5 / OS 0.8；眼压 14 / 15 mmHg。双眼晶状体核性混浊。",treatment:"手术治疗",surgeryName:"超声乳化白内障吸除 + IOL 植入术",surgeryDate:"2026-10-19",anesthesia:"局麻",role:"助手",postop:"术后第 1 天，角膜轻度水肿，前房清，眼压正常。",followupDate:"2026-10-26",readmission:"否",notes:"术前宣教完整，术后按时点眼。",tags:["手术","教学"]},
  {id:"r-002",date:"2026-10-16",type:"门诊",status:"待复诊",patientNo:"门诊-4318",name:"周先生",gender:"男",age:57,eye:"OS 左眼",diagnosis:"原发性开角型青光眼",chiefComplaint:"左眼视物模糊，偶有眼胀。",exams:["眼压","视野","OCT"],examDetails:"OS 眼压 24 mmHg；视野 MD -8.42 dB，弓形缺损；RNFL 变薄。",treatment:"药物治疗",surgeryName:"",surgeryDate:"",anesthesia:"未记录",role:"未记录",postop:"",followupDate:"2026-11-02",readmission:"未记录",notes:"调整为前列腺素类滴眼液，观察眼压反应。",tags:["随访"]},
  {id:"r-003",date:"2026-10-11",type:"急诊",status:"已完成",patientNo:"急诊-0912",name:"陈女士",gender:"女",age:34,eye:"OD 右眼",diagnosis:"角膜异物",chiefComplaint:"右眼异物感、流泪 4 小时，工作时飞入金属屑。",exams:["视力","裂隙灯"],examDetails:"OD 裸眼视力 0.8，角膜 7 点位见浅层金属异物，前房清。",treatment:"其他",surgeryName:"裂隙灯下角膜异物取出",surgeryDate:"2026-10-11",anesthesia:"表面麻醉",role:"主刀",postop:"取出顺利，予抗生素滴眼液，次日复查。",followupDate:"2026-10-12",readmission:"否",notes:"已完成破伤风相关询问。",tags:["急诊","外伤"]},
  {id:"r-004",date:"2026-09-29",type:"住院",status:"已完成",patientNo:"2026092915",name:"赵先生",gender:"男",age:62,eye:"OD 右眼",diagnosis:"孔源性视网膜脱离",chiefComplaint:"右眼视野缺损伴闪光感 3 天。",exams:["视力","眼底","超声/UBM"],examDetails:"OD 视力 0.05，颞下方视网膜脱离累及黄斑，裂孔位于 11 点。",treatment:"手术治疗",surgeryName:"玻璃体切割 + 眼内气体填充",surgeryDate:"2026-09-30",anesthesia:"全麻",role:"助手",postop:"术后第 7 天视网膜复位，眼压 16 mmHg，继续俯卧位。",followupDate:"2026-10-21",readmission:"否",notes:"已向患者说明体位及气体注意事项。",tags:["手术","典型病例"]},
  {id:"r-005",date:"2026-09-18",type:"门诊",status:"已完成",patientNo:"门诊-3942",name:"王女士",gender:"女",age:45,eye:"OU 双眼",diagnosis:"糖尿病视网膜病变",chiefComplaint:"糖尿病 8 年，复查眼底。",exams:["视力","眼底","OCT"],examDetails:"双眼散在微血管瘤及点状出血，黄斑 OCT 未见明显水肿。",treatment:"观察",surgeryName:"",surgeryDate:"",anesthesia:"未记录",role:"未记录",postop:"",followupDate:"2026-12-18",readmission:"未记录",notes:"建议控制血糖，半年复查眼底及 OCT。",tags:["慢病"]},
  {id:"r-006",date:"2026-08-27",type:"住院",status:"已完成",patientNo:"2026082711",name:"刘先生",gender:"男",age:71,eye:"OS 左眼",diagnosis:"黄斑前膜",chiefComplaint:"左眼视物变形、视力下降半年。",exams:["视力","眼底","OCT"],examDetails:"OS 视力 0.25，OCT 示黄斑前膜伴中心凹结构紊乱。",treatment:"手术治疗",surgeryName:"玻璃体切割 + 黄斑前膜剥除",surgeryDate:"2026-08-28",anesthesia:"局麻",role:"观摩",postop:"术后 1 月视物变形减轻，视力 0.4，黄斑结构逐步恢复。",followupDate:"2026-11-28",readmission:"否",notes:"术中剥膜过程值得复盘。",tags:["手术","教学"]}
];

const titles = {
  dashboard: ["总览", "病例总览", "把每次接诊留下来，之后还能按诊断和日期回看。"],
  timeline: ["病例时间线", "病例时间线", "按就诊日期浏览门诊、急诊、住院与随访记录。"],
  diagnosis: ["诊断索引", "诊断索引", "按诊断聚合病例，快速回看同类疾病的临床路径。"],
  surgery: ["手术与随访", "手术与随访", "手术参与、术后恢复和下次复诊放在同一个视图。"],

};

const TYPE_CLASS = { "门诊": "outpatient", "急诊": "emergency", "住院": "inpatient", "随访": "followup" };

const SEGMENTS = [
  { key: "lid", label: "眼睑泪器", options: ["正常", "睑内翻", "睑外翻", "倒睫", "上睑下垂", "眼睑红肿", "泪道冲洗通畅", "泪道阻塞"] },
  { key: "conj", label: "结膜", options: ["正常", "轻度充血", "混合充血", "结膜下出血", "滤泡增生", "乳头增生", "翼状胬肉"] },
  { key: "cornea", label: "角膜", options: ["透明", "上皮缺损", "角膜水肿", "角膜混浊", "角膜瘢痕", "角膜溃疡", "KP(+)"] },
  { key: "ac", label: "前房", options: ["深浅正常，房闪(-)", "浅前房", "房闪(+)", "前房积血", "前房积脓", "纤维素性渗出"] },
  { key: "iris", label: "虹膜瞳孔", options: ["瞳孔圆，对光反射存在", "瞳孔散大", "瞳孔后粘连", "虹膜新生血管", "瞳孔区机化膜"] },
  { key: "lens", label: "晶状体", options: ["皮质、核透明，位置正", "皮质性混浊", "核性混浊", "后囊下混浊", "人工晶体位正", "晶体半脱位"] },
  { key: "vitreous", label: "玻璃体", options: ["透明", "玻璃体混浊", "玻璃体积血", "玻璃体后脱离", "增殖膜"] },
  { key: "fundus", label: "眼底", options: ["视网膜平伏，黄斑中心凹反光存在", "黄斑水肿", "视网膜脱离", "视网膜出血", "硬性渗出", "视盘边界清、色淡红", "视盘水肿", "C/D 扩大", "RNFL 变薄"] }
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

let records = readRecords();
let currentView = "dashboard";
let timelineFilter = "全部";
let dateFilter = "";
let yearFilter = "全部";
let selectedDetailId = "";
let noteTimer;
let toastTimer;
let examState = emptyExam();

function emptyExam() {
  return { vision: { od: "", os: "", corrOd: "", corrOs: "" }, refraction: { od: "", os: "" }, iop: { od: "", os: "" }, segments: {}, extra: "" };
}
function cloneExam(state) { return JSON.parse(JSON.stringify(state || emptyExam())); }

function readRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seedRecords;
  } catch (error) { return seedRecords; }
}
function saveRecords() { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function readJson(key, fallback) {
  try {
    const raw = JSON.parse(localStorage.getItem(key));
    return raw == null ? fallback : raw;
  } catch (error) { return fallback; }
}
function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* 本机存储不可用时忽略 */ }
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>'"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c];
  });
}
function formatDate(value, long) {
  if (!value) return "未记录";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", long ? { year: "numeric", month: "long", day: "numeric" } : { month: "2-digit", day: "2-digit" }).format(d);
}
function dateValue(value) { return value ? new Date(value + "T00:00:00").getTime() : 0; }
function eyeLabel(value) { const v = String(value == null ? "" : value).trim(); return v ? v.replace(/\s*(右眼|左眼|双眼)$/, "") : "未明确"; }
function monthLabel(value) {
  if (!value) return "未记录日期";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return "未记录日期";
  return d.getFullYear() + "年" + (d.getMonth() + 1) + "月";
}
function isSurgery(r) { return r.treatmentType ? r.treatmentType === "手术治疗" : Boolean(r.surgeryName || r.treatment === "手术治疗"); }
function todayIso() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400);
}

/* ---------------- 专科查体快捷录入 ---------------- */

function renderSegments() {
  $("#examSegments").innerHTML = SEGMENTS.map(function (group) {
    const picked = examState.segments[group.key] || [];
    const chips = group.options.map(function (option) {
      const on = picked.indexOf(option) >= 0 ? " active" : "";
      return '<button type="button" class="chip' + on + '" data-seg="' + group.key + '" data-val="' + escapeHtml(option) + '">' + escapeHtml(option) + "</button>";
    }).join("");
    return '<div class="seg-group"><span class="seg-label">' + group.label + '</span><div class="seg-chips">' + chips + "</div></div>";
  }).join("");
}

function renderExamRecent() {
  const recents = readJson(EXAM_RECENT_KEY, []);
  const box = $("#examRecent");
  if (!Array.isArray(recents) || !recents.length) { box.innerHTML = ""; return; }
  box.innerHTML = recents.map(function (text) {
    return '<button type="button" class="chip" data-recent="' + escapeHtml(text) + '">＋ ' + escapeHtml(text) + "</button>";
  }).join("");
}

function renderExamInputs() {
  $("#examVisionOd").value = examState.vision.od;
  $("#examVisionOs").value = examState.vision.os;
  $("#examVisionCorrOd").value = examState.vision.corrOd;
  $("#examVisionCorrOs").value = examState.vision.corrOs;
  $("#examIopOd").value = examState.iop.od;
  $("#examRefractionOd").value = (examState.refraction || {}).od || "";
  $("#examRefractionOs").value = (examState.refraction || {}).os || "";
  $("#examIopOs").value = examState.iop.os;
}

function collectExamInputs() {
  examState.vision = {
    od: $("#examVisionOd").value.trim(),
    os: $("#examVisionOs").value.trim(),
    corrOd: $("#examVisionCorrOd").value.trim(),
    corrOs: $("#examVisionCorrOs").value.trim()
  };
  examState.refraction = { od: $("#examRefractionOd").value.trim(), os: $("#examRefractionOs").value.trim() };
  examState.iop = { od: $("#examIopOd").value.trim(), os: $("#examIopOs").value.trim() };
  examState.extra = $("#examDetails").value.trim();
}

function eyePrefix() {
  const eye = $("#recordEye").value;
  if (eye === "OD 右眼") return "右眼 ";
  if (eye === "OS 左眼") return "左眼 ";
  return "";
}
function joinPair(a, b) {
  if (a && b) return "OD " + a + " / OS " + b;
  if (a) return "OD " + a;
  if (b) return "OS " + b;
  return "";
}

function composeExamText() {
  const parts = [];
  const vision = joinPair(examState.vision.od, examState.vision.os);
  if (vision) parts.push("裸眼视力 " + vision);
  const corrected = joinPair(examState.vision.corrOd, examState.vision.corrOs);
  if (corrected) parts.push("矫正视力 " + corrected);
  const refraction = joinPair((examState.refraction || {}).od, (examState.refraction || {}).os);
  if (refraction) parts.push("验光 " + refraction);
  const iop = joinPair(examState.iop.od, examState.iop.os);
  if (iop) parts.push("眼压 " + iop + " mmHg");
  const prefix = "";
  SEGMENTS.forEach(function (group) {
    const picked = examState.segments[group.key] || [];
    if (picked.length) parts.push(prefix + group.label + "：" + picked.join("、"));
  });
  if (examState.extra) parts.push(examState.extra);
  return parts.join("；");
}

function loadExamFromRecord(record) {
  const quick = record && record.examQuick;
  if (quick && typeof quick === "object") {
    examState = emptyExam();
    examState.vision = Object.assign(examState.vision, quick.vision || {});
    examState.iop = Object.assign(examState.iop, quick.iop || {});
    examState.refraction = Object.assign(emptyExam().refraction, quick.refraction || {});
    examState.segments = cloneExam({ segments: quick.segments || {} }).segments;
    examState.extra = quick.extra || "";
  } else {
    examState = emptyExam();
    examState.extra = record ? (record.examDetails || "") : "";
  }
  renderExamInputs();
  renderSegments();
  $("#examDetails").value = examState.extra;
}

function applyExamNormal() {
  collectExamInputs();
  SEGMENTS.forEach(function (group) { examState.segments[group.key] = [group.options[0]]; });
  renderSegments();
  toast("已按常规查体填入，可按需修改");
}

function applyLastExam() {
  const last = readJson(EXAM_LAST_KEY, null);
  if (!last || typeof last !== "object") { toast("还没有可套用的查体记录"); return; }
  collectExamInputs();
  examState.vision = Object.assign(emptyExam().vision, last.vision || {});
  examState.iop = Object.assign(emptyExam().iop, last.iop || {});
  examState.refraction = Object.assign(emptyExam().refraction, last.refraction || {});
  examState.segments = cloneExam({ segments: last.segments || {} }).segments;
  renderExamInputs();
  renderSegments();
  toast("已套用上次查体");
}

function clearExam() {
  examState = emptyExam();
  renderExamInputs();
  renderSegments();
  $("#examDetails").value = "";
  toast("已清空查体内容");
}

function rememberExam() {
  writeJson(EXAM_LAST_KEY, { vision: examState.vision, refraction: examState.refraction, iop: examState.iop, segments: examState.segments });
  const extra = (examState.extra || "").trim();
  if (extra) {
    const recents = readJson(EXAM_RECENT_KEY, []);
    const list = Array.isArray(recents) ? recents.filter(function (t) { return t !== extra; }) : [];
    list.unshift(extra);
    writeJson(EXAM_RECENT_KEY, list.slice(0, 6));
  }
}

/* ---------------- 列表与检索 ---------------- */

function getFilteredRecords(type, sort) {
  type = type || timelineFilter;
  sort = sort || "latest";
  const query = $("#globalSearch").value.trim().toLowerCase();
  const list = records.filter(function (r) {
    const haystack = [r.name, r.patientNo, r.diagnosis, r.notes, r.chiefComplaint, r.surgeryName, r.examDetails, r.auxExam, r.postopExam, r.surgeon, r.attendingDoctor, r.generalAdmission, r.generalAfter, (r.secondaryDiagnoses || []).join(" ")].concat(r.tags || []).join(" ").toLowerCase();
    const typeMatch = type === "全部" || r.type === type || (type === "随访" && r.followupDate) || (type === "疑难" && Boolean(r.difficult));
    const dateMatch = !dateFilter || r.date === dateFilter;
    return typeMatch && dateMatch && (!query || haystack.indexOf(query) >= 0);
  });
  list.sort(function (a, b) {
    if (sort === "name") return String(a.name || "").localeCompare(String(b.name || ""), "zh-CN");
    return sort === "oldest" ? dateValue(a.date) - dateValue(b.date) : dateValue(b.date) - dateValue(a.date);
  });
  return list;
}

function setView(view) {
  currentView = view;
  const meta = titles[view] || titles.dashboard;
  $("#viewEyebrow").textContent = meta[0] + " · " + ORG;
  $("#pageTitle").textContent = meta[1];
  if ($("#pageSubtitle")) $("#pageSubtitle").textContent = meta[2];
  $$(".nav-item").forEach(function (b) { b.classList.toggle("active", b.dataset.view === view); });
  $("#dashboardView").classList.toggle("hidden", view !== "dashboard");
  $("#timelineView").classList.toggle("hidden", view !== "timeline");
  $("#diagnosisView").classList.toggle("hidden", view !== "diagnosis");
  $("#surgeryView").classList.toggle("hidden", view !== "surgery");

  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function doctorTone(name) {
  const key = String(name || "").trim();
  if (!key) return 0;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 10007;
  return hash % 6;
}
function doctorChip(label, toneName) {
  return '<span class="record-doctor doc-c' + doctorTone(toneName || label) + '">' + escapeHtml(label) + "</span>";
}
function recordRow(r) {
  const statusClass = r.status === "待复诊" ? "pending" : r.status === "进行中" ? "progress" : "";
  const typeClass = TYPE_CLASS[r.type] || "outpatient";
  const surgery = isSurgery(r) ? '<span class="badge-surgery">手术</span>' : '<span class="badge-conservative">保守</span>';
  const attending = String(r.attendingDoctor || "").trim();
  const leadSurgeon = String(r.surgeon || "").trim();
  const doctorParts = [];
  if (attending && leadSurgeon && attending !== leadSurgeon) {
    doctorParts.push(doctorChip(attending, attending));
    doctorParts.push(doctorChip("主刀：" + leadSurgeon, leadSurgeon));
  } else if (attending) doctorParts.push(doctorChip(attending, attending));
  else if (leadSurgeon) doctorParts.push(doctorChip(leadSurgeon, leadSurgeon));
  const doctorLine = doctorParts.length ? '<span class="record-doctors">' + doctorParts.join("") + "</span>" : "";

  const difficult = r.difficult ? '<span class="badge-difficult">疑难</span>' : "";
  return '<button class="record-row type-accent-' + typeClass + '" type="button" data-open-record="' + escapeHtml(r.id) + '">' +
    '<span class="record-date">' + formatDate(r.date) + '</span>' +
    '<span class="record-main"><span class="record-title"><span class="type-badge type-' + typeClass + '">' + escapeHtml(r.type) + '</span><strong>' + escapeHtml(r.name) + '</strong></span>' +
    '<span class="record-sub"><span>' + escapeHtml(r.diagnosis || "未记录诊断") + '</span><span>·</span><span>' + escapeHtml(r.patientNo || "无病案号") + "</span>" + doctorLine + '</span></span>' +
    '<span class="record-side">' + difficult + '<span class="eye-badge">' + escapeHtml(eyeLabel(r.eye)) + "</span>" + surgery +
    '<span class="status-badge ' + statusClass + '">' + escapeHtml(r.status || "已完成") + "</span></span></button>";
}

function emptyState(title, msg) {
  return '<div class="empty-state"><strong>' + title + "</strong><span>" + (msg || "还没有符合条件的记录") + '</span><br><button class="text-btn" data-open-new type="button">新增一条记录 →</button></div>';
}

function diagnosisSummary() {
  const groups = new Map();
  records.forEach(function (r) {
    const name = r.diagnosis || "未分类诊断";
    if (!groups.has(name)) groups.set(name, { name: name, records: [], patients: new Set(), recent: 0 });
    const g = groups.get(name);
    g.records.push(r);
    g.patients.add(r.patientNo || r.name);
    g.recent = Math.max(g.recent, dateValue(r.date));
  });
  return Array.from(groups.values());
}

/* ---------------- 渲染 ---------------- */

function renderMetrics() {
  $("#metricPatients").textContent = new Set(records.map(function (r) { return r.patientNo || r.name; })).size;
  $("#metricRecords").textContent = records.length;
  $("#metricSurgeries").textContent = records.filter(isSurgery).length;
  const pendingFollowups = followupBuckets().pending;
  const today = new Date();
  const end = new Date(today.getTime() + 30 * 86400000);
  const start = new Date(today.toDateString());
  const soonCount = pendingFollowups.filter(function (r) {
    if (!r.followupDate) return false;
    const d = new Date(r.followupDate + "T00:00:00");
    return d >= start && d <= end;
  }).length;
  $("#metricFollowups").textContent = pendingFollowups.length;
  $("#metricFollowupCaption").textContent = pendingFollowups.length ? (soonCount ? "30 天内 " + soonCount + " 人 · 点开看名单" : "待随访 · 点开看名单") : "暂无待随访";
  $("#allCount").textContent = records.length;
}

function renderDashboard() {
  const recent = getFilteredRecords("全部").slice(0, 6);
  $("#recentList").innerHTML = recent.length ? recent.map(recordRow).join("") : emptyState("暂时没有病例", "先新增一条病例记录");
  const groups = diagnosisSummary().sort(function (a, b) { return b.records.length - a.records.length; }).slice(0, 5);
  $("#diagnosisMini").innerHTML = groups.length
    ? groups.map(function (g) { return '<div class="diagnosis-mini-row"><strong>' + escapeHtml(g.name) + "</strong><span>" + g.records.length + " 例</span></div>"; }).join("")
    : emptyState("暂无诊断");
}

function renderTimeline() {
  const list = getFilteredRecords(timelineFilter, $("#sortSelect").value);
  if (!list.length) {
    $("#timelineList").innerHTML = emptyState("没有匹配病例", "可以尝试清空搜索或切换分类");
  } else {
    const groups = new Map();
    list.forEach(function (r) {
      const k = monthLabel(r.date);
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(r);
    });
    $("#timelineList").innerHTML = Array.from(groups.entries()).map(function (entry) {
      return '<div class="timeline-month"><div class="month-label">' + entry[0] + '</div><div class="timeline-stack">' + entry[1].map(recordRow).join("") + "</div></div>";
    }).join("");
  }
  $$("[data-type-filter]").forEach(function (b) { b.classList.toggle("active", b.dataset.typeFilter === timelineFilter); });
  const keyword = $("#globalSearch").value.trim();
  if ($("#allCount")) $("#allCount").textContent = keyword && timelineFilter === "全部" ? list.length : records.length;
}

function renderDiagnosis() {
  let groups = diagnosisSummary();
  const q = $("#globalSearch").value.trim().toLowerCase();
  if (q) {
    groups = groups.filter(function (g) {
      return g.name.toLowerCase().indexOf(q) >= 0 || g.records.some(function (r) { return String(r.name || "").toLowerCase().indexOf(q) >= 0; });
    });
  }
  const sort = $("#diagnosisSort").value;
  if (sort === "recent") groups.sort(function (a, b) { return b.recent - a.recent; });
  else if (sort === "alpha") groups.sort(function (a, b) { return a.name.localeCompare(b.name, "zh-CN"); });
  else groups.sort(function (a, b) { return b.records.length - a.records.length; });
  $("#diagnosisGrid").innerHTML = groups.length
    ? groups.map(function (g) {
        return '<button class="diagnosis-card" data-diagnosis="' + escapeHtml(g.name) + '" type="button">' +
          '<span class="diagnosis-card-top"><span><span class="section-kicker">诊断</span><h3>' + escapeHtml(g.name) + '</h3></span><strong class="diagnosis-card-count">' + g.records.length + "</strong></span>" +
          '<span class="diagnosis-card-bottom"><span><b>' + g.patients.size + "</b> 位患者</span><span><b>" + g.records.filter(isSurgery).length + "</b> 例手术</span><span>" + formatDate(new Date(g.recent).toISOString().slice(0, 10)) + "</span></span></button>";
      }).join("")
    : emptyState("暂无诊断索引", "病例保存后会自动归类");
}

function patientKeyOf(r) {
  return String(r.name || "").trim() + "|" + String(r.patientNo || "").trim();
}
function followupHint(value) {
  if (!value) return "待安排";
  const days = Math.round((dateValue(value) - dateValue(todayIso())) / 86400000);
  const label = formatDate(value);
  if (days === 0) return label + " · 今天";
  if (days > 0) return label + " · 还有 " + days + " 天";
  return label + " · 已逾期 " + Math.abs(days) + " 天";
}
function followupPendingCard(r) {
  return '<div class="followup-row"><button class="followup-item is-pending" data-open-record="' + escapeHtml(r.id) + '" type="button"><span class="followup-top"><strong>' + escapeHtml(r.name) + " · " + escapeHtml(r.diagnosis || "未记录诊断") + '</strong><span class="followup-date">' + escapeHtml(followupHint(r.followupDate)) + '</span></span><span class="followup-meta">' + escapeHtml(eyeLabel(r.eye)) + " · " + escapeHtml(r.surgeryName || r.treatment || "随访") + '</span><span class="followup-result">' + escapeHtml(r.postop || "尚未补充术后恢复") + '</span></button><button class="followup-action" data-quick-followup="' + escapeHtml(r.id) + '" type="button">记录随访</button></div>';
}
function followupBuckets() {
  const todayVal = dateValue(todayIso());
  const groups = new Map();
  records.forEach(function (r) {
    if (!(r.type === "随访" || r.followupDate || r.postop || r.status === "待复诊")) return;
    const key = patientKeyOf(r);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  });
  const pending = [];
  const done = [];
  groups.forEach(function (list) {
    let followupRecord = null;
    let upcomingCase = null;
    let doneCase = null;
    let looseCase = null;
    list.forEach(function (r) {
      if (r.type === "随访") {
        if (!followupRecord || dateValue(r.date) > dateValue(followupRecord.date)) followupRecord = r;
        return;
      }
      if (r.followupDate && dateValue(r.followupDate) >= todayVal) {
        if (!upcomingCase || dateValue(r.followupDate) < dateValue(upcomingCase.followupDate)) upcomingCase = r;
        return;
      }
      if (r.postop) {
        if (!doneCase || dateValue(r.date) > dateValue(doneCase.date)) doneCase = r;
        return;
      }
      if (!looseCase || dateValue(r.followupDate || r.date) < dateValue(looseCase.followupDate || looseCase.date)) looseCase = r;
    });
    const followupUpcoming = followupRecord && followupRecord.followupDate && dateValue(followupRecord.followupDate) >= todayVal ? followupRecord : null;
    if (followupUpcoming) pending.push(followupUpcoming);
    else if (followupRecord) done.push(followupRecord);
    else if (upcomingCase) pending.push(upcomingCase);
    else if (doneCase) done.push(doneCase);
    else if (looseCase) pending.push(looseCase);
  });
  pending.sort(function (a, b) { return dateValue(a.followupDate || a.date) - dateValue(b.followupDate || b.date); });
  done.sort(function (a, b) { return dateValue(b.date) - dateValue(a.date); });
  return { pending: pending, done: done };
}
function renderSurgery() {
  const surgeries = records.filter(isSurgery).sort(function (a, b) { return dateValue(b.surgeryDate || b.date) - dateValue(a.surgeryDate || a.date); });
  const buckets = followupBuckets();
  const pendingList = buckets.pending;
  const doneList = buckets.done;
  $("#surgeryCountLabel").textContent = surgeries.length + " 例";
  $("#followupCountLabel").textContent = doneList.length + " 人";
  if ($("#pendingFollowupCountLabel")) $("#pendingFollowupCountLabel").textContent = pendingList.length + " 人";
  $("#surgeryList").innerHTML = surgeries.length ? surgeries.map(recordRow).join("") : emptyState("还没有手术病例");
  if ($("#pendingFollowupList")) $("#pendingFollowupList").innerHTML = pendingList.length
    ? pendingList.map(followupPendingCard).join("")
    : emptyState("没有待随访病人", "录入病例时填写「下次随访」日期，随访后就自动移到下面的随访记录");
  $("#followupList").innerHTML = doneList.length
    ? doneList.map(function (r) {
        return '<button class="followup-item" data-open-record="' + escapeHtml(r.id) + '" type="button"><span class="followup-top"><strong>' + escapeHtml(r.name) + " · " + escapeHtml(r.diagnosis) + '</strong><span class="followup-date">' + (r.followupDate ? formatDate(r.followupDate) : formatDate(r.date)) + '</span></span><span class="followup-meta">' + escapeHtml(eyeLabel(r.eye)) + " · " + escapeHtml(r.surgeryName || r.treatment || "随访") + '</span><span class="followup-result">' + escapeHtml(r.postop || "尚未补充术后恢复") + "</span></button>";
      }).join("")
    : emptyState("还没有已完成的随访");
}

function renderDateFilterChip() {
  const chip = $("#dateFilterChip");
  if (!chip) return;
  chip.classList.toggle("hidden", !dateFilter);
  chip.textContent = dateFilter ? formatDate(dateFilter, true) + "  ×" : "日期";
}
function weekdayLabel(value) {
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(d);
}
function renderDateIndex() {
  const box = $("#dateIndexList");
  if (!box) return;
  const list = getFilteredRecords("全部").filter(function (r) { return r.date; });
  const years = Array.from(new Set(list.map(function (r) { return r.date.slice(0, 4); }))).sort().reverse();
  $("#yearTabs").innerHTML = ['<button class="filter-tab' + (yearFilter === "全部" ? " active" : "") + '" data-year="全部" type="button">全部年份</button>']
    .concat(years.map(function (y) { return '<button class="filter-tab' + (yearFilter === y ? " active" : "") + '" data-year="' + y + '" type="button">' + y + ' 年</button>'; }))
    .join("");
  const scoped = yearFilter === "全部" ? list : list.filter(function (r) { return r.date.slice(0, 4) === yearFilter; });
  if (!scoped.length) { box.innerHTML = emptyState("暂无日期记录", "新增病例后会自动出现在这里"); return; }
  const byMonth = new Map();
  scoped.forEach(function (r) {
    const key = r.date.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, new Map());
    const days = byMonth.get(key);
    if (!days.has(r.date)) days.set(r.date, []);
    days.get(r.date).push(r);
  });
  const months = Array.from(byMonth.keys()).sort().reverse();
  box.innerHTML = months.map(function (monthKey) {
    const days = Array.from(byMonth.get(monthKey).entries()).sort(function (a, b) { return a[0] < b[0] ? 1 : -1; });
    const total = days.reduce(function (n, e) { return n + e[1].length; }, 0);
    const label = monthKey.slice(0, 4) + " 年 " + Number(monthKey.slice(5, 7)) + " 月 · " + total + " 例";
    const dayCards = days.map(function (entry) {
      const day = entry[0];
      const items = entry[1];
      const types = Array.from(new Set(items.map(function (r) { return r.type; }))).join(" · ");
      return '<div class="date-day"><button class="date-day-head" data-day="' + day + '" type="button"><span class="date-day-num">' + Number(day.slice(8, 10)) + '</span><span class="date-day-meta">' + weekdayLabel(day) + " · " + items.length + " 例 · " + escapeHtml(types) + '</span></button><div class="date-day-list">' + items.map(recordRow).join("") + "</div></div>";
    }).join("");
    return '<div class="date-month"><div class="month-label">' + label + '</div><div class="date-days">' + dayCards + "</div></div>";
  }).join("");
}
function renderAll() {
  renderMetrics();
  renderDashboard();
  renderTimeline();
  renderDiagnosis();
  renderSurgery();

  renderDateFilterChip();
}

/* ---------------- 表单 ---------------- */

function setField(id, value) {
  const e = document.getElementById(id);
  if (e) e.value = value == null ? "" : value;
}

function openForm(record) {
  record = record || null;
  $("#recordForm").reset();
  $("#recordId").value = record ? record.id : "";
  $("#modalTitle").textContent = record ? "编辑病例记录" : "新增病例记录";
  setField("encounterDate", record ? record.date : todayIso());
  setField("encounterType", record ? record.type : "门诊");
  setField("recordStatus", record ? record.status : "进行中");
  setField("recordEye", record ? record.eye : "OU"); $("#recordDifficult").checked = Boolean(record && record.difficult);
  setField("patientName", record ? record.name : "");
  setField("patientNo", record ? record.patientNo : "");
  setField("patientGender", record ? record.gender : "女");
  setField("patientAge", record ? record.age : "");
  setField("recordDiagnosis", record ? record.diagnosis : "");
  setField("chiefComplaint", record ? record.chiefComplaint : "");
  setField("treatment", record ? record.treatment : "观察");
  setField("recordTags", record ? (record.tags || []).join(", ") : "");
  setField("surgeryName", record ? record.surgeryName : "");
  setField("surgeryDate", record ? record.surgeryDate : "");
  setField("anesthesia", record ? record.anesthesia : "未记录");
  setField("surgeryRole", record ? record.role : "未记录");
  setField("postop", record ? record.postop : "");
  setField("followupDate", record ? record.followupDate : "");
  setField("readmission", record ? record.readmission : "未记录");
  setField("recordNotes", record ? record.notes : "");
  const exams = record ? (record.exams || []) : [];
  $$("[data-exam]").forEach(function (c) { c.checked = exams.indexOf(c.value) >= 0; });
  loadExamFromRecord(record);
  renderExamRecent();
  $("#recordModal").classList.remove("hidden");
  $("#recordModal").setAttribute("aria-hidden", "false");
  setTimeout(function () { $("#patientName").focus(); }, 30);
}

function closeForm() {
  $("#recordModal").classList.add("hidden");
  $("#recordModal").setAttribute("aria-hidden", "true");
}

function handleSubmit(event) {
  event.preventDefault();
  collectExamInputs();
  const existing = $("#recordId").value;
  const record = {
    id: existing || "r-" + Date.now().toString(36),
    date: $("#encounterDate").value,
    type: $("#encounterType").value,
    status: $("#recordStatus").value,
    patientNo: $("#patientNo").value.trim(),
    name: $("#patientName").value.trim(),
    gender: $("#patientGender").value,
    age: $("#patientAge").value ? Number($("#patientAge").value) : "",
    eye: $("#recordEye").value, difficult: Boolean($("#recordDifficult").checked),
    diagnosis: $("#recordDiagnosis").value.trim(),
    chiefComplaint: $("#chiefComplaint").value.trim(),
    exams: $$("[data-exam]").filter(function (c) { return c.checked; }).map(function (c) { return c.value; }),
    examQuick: cloneExam(examState),
    examDetails: composeExamText(),
    treatment: $("#treatment").value,
    surgeryName: $("#surgeryName").value.trim(),
    surgeryDate: $("#surgeryDate").value,
    anesthesia: $("#anesthesia").value,
    role: $("#surgeryRole").value,
    postop: $("#postop").value.trim(),
    followupDate: $("#followupDate").value,
    readmission: $("#readmission").value,
    notes: $("#recordNotes").value.trim(),
    tags: $("#recordTags").value.split(/[,，、\s]+/).filter(Boolean)
  };
  if (!record.date || !record.name || !record.diagnosis) {
    toast("就诊日期、姓名、主要诊断为必填");
    return;
  }
  if (existing) {
    const index = records.findIndex(function (r) { return r.id === existing; });
    if (index >= 0) records[index] = Object.assign({}, records[index], record);
    else records.unshift(record);
  } else {
    records.unshift(record);
  }
  saveRecords();
  rememberExam();
  renderExamRecent();
  closeForm();
  renderAll();
  toast(existing ? "记录已更新" : "记录已保存");
}

/* ---------------- 详情 ---------------- */

function detailRow(label, value) {
  return '<div class="detail-row"><span class="detail-label">' + label + "</span><span>" + escapeHtml(value || "未记录") + "</span></div>";
}

function openDetail(id) {
  const r = records.find(function (x) { return x.id === id; });
  if (!r) return;
  selectedDetailId = id;
  $("#detailTitle").textContent = (r.name || "病例") + " · " + (r.diagnosis || "未记录诊断");
  const tags = (r.tags || []).length ? (r.tags || []).join("、") : "未记录";
  $("#detailContent").innerHTML =
    '<div class="detail-section"><h3>就诊信息</h3>' +
      detailRow("就诊日期", formatDate(r.date, true)) +
      detailRow("就诊类型", r.type) +
      detailRow("病例状态", r.status) +
      detailRow("眼别", eyeLabel(r.eye)) +
      detailRow("主管医生", r.attendingDoctor) +
      detailRow("疑难病例", r.difficult ? "是" : "否") +
    "</div>" +
    '<div class="detail-section"><h3>患者与诊断</h3>' +
      detailRow("姓名", r.name) +
      detailRow("病案号", r.patientNo) +
      detailRow("性别 / 年龄", (r.gender || "未记录") + " / " + (r.age === "" || r.age == null ? "未记录" : r.age + " 岁")) +
      detailRow("主要诊断", r.diagnosis) +
      detailRow("主诉", r.chiefComplaint) +
    "</div>" +
    '<div class="detail-section"><h3>专科查体</h3>' +
      detailRow("检查项目", (r.exams || []).join("、")) +
      detailRow("查体所见", r.examDetails) +
    "</div>" +
    '<div class="detail-section"><h3>处理与随访</h3>' +
      detailRow("治疗类型", r.treatmentType || (isSurgery(r) ? "手术治疗" : "保守治疗")) +
      detailRow("治疗方式", r.treatment) +
      detailRow("手术 / 操作", r.surgeryName) +
      detailRow("手术日期", r.surgeryDate ? formatDate(r.surgeryDate, true) : "") +
      detailRow("参与角色", r.role) +
      detailRow("麻醉方式", r.anesthesia) +
      detailRow("术后恢复", r.postop) +
      detailRow("下次随访", r.followupDate ? formatDate(r.followupDate, true) : "") +
      detailRow("是否再次入院", r.readmission) +
      detailRow("标签", tags) +
      detailRow("备注", r.notes) +
    "</div>";
  $("#detailModal").classList.remove("hidden");
  $("#detailModal").setAttribute("aria-hidden", "false");
}

function closeDetail() {
  $("#detailModal").classList.add("hidden");
  $("#detailModal").setAttribute("aria-hidden", "true");
}

function deleteRecord() {
  const r = records.find(function (x) { return x.id === selectedDetailId; });
  if (!r) return;
  if (!window.confirm("删除这条病例记录？此操作不可撤销。")) return;
  records = records.filter(function (x) { return x.id !== selectedDetailId; });
  saveRecords();
  closeDetail();
  renderAll();
  toast("记录已删除");
}

/* ---------------- 其他 ---------------- */

function exportData() {
  const payload = { org: ORG, exportedAt: new Date().toISOString(), count: records.length, records: records };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "眼科病例册_广东省人民医院眼科_" + todayIso() + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  toast("已导出 " + records.length + " 条记录");
}

function initNote() {
  const saved = localStorage.getItem(NOTE_KEY) || "";
  $("#quickNote").value = saved;
  $("#noteSavedAt").textContent = saved ? "已保存" : "—";
  $("#quickNote").addEventListener("input", function () {
    clearTimeout(noteTimer);
    noteTimer = setTimeout(function () {
      localStorage.setItem(NOTE_KEY, $("#quickNote").value);
      const d = new Date();
      $("#noteSavedAt").textContent = "已保存 " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    }, 500);
  });
}

function renderDateStamp() {
  const d = new Date();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  $("#headerDay").textContent = String(d.getDate()).padStart(2, "0");
  $("#headerMonth").textContent = months[d.getMonth()];
  $("#headerYear").textContent = d.getFullYear();
}

function bindEvents() {
  $$(".nav-item").forEach(function (b) { b.addEventListener("click", function () { setView(b.dataset.view); }); });
  $("#addRecordBtn").addEventListener("click", function () { openForm(null); });
  $("#exportBtn").addEventListener("click", exportData);
  $("#closeModal").addEventListener("click", closeForm);
  $("#cancelModal").addEventListener("click", closeForm);
  $("#recordForm").addEventListener("submit", handleSubmit);
  $("#closeDetail").addEventListener("click", closeDetail);
  $("#editDetail").addEventListener("click", function () {
    const r = records.find(function (x) { return x.id === selectedDetailId; });
    if (r) { closeDetail(); openForm(r); }
  });
  $("#deleteDetail").addEventListener("click", deleteRecord);
  $("#globalSearch").addEventListener("input", function () {
    const q = $("#globalSearch").value.trim();
    if (q) {
      timelineFilter = "全部";
      dateFilter = "";
      if ($("#datePick")) $("#datePick").value = "";
      if (typeof renderDateFilterChip === "function") renderDateFilterChip();
      if (currentView !== "timeline") { setView("timeline"); return; }
    }
    renderAll();
  });
  $("#sortSelect").addEventListener("change", renderTimeline);
  $("#diagnosisSort").addEventListener("change", renderDiagnosis);
  $("#examNormalAll").addEventListener("click", applyExamNormal);
  bindRoundThree();
  $("#examApplyLast").addEventListener("click", applyLastExam);
  $("#examClearExam").addEventListener("click", clearExam);

  $("#examSegments").addEventListener("click", function (event) {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    const key = chip.dataset.seg;
    const value = chip.dataset.val;
    const picked = examState.segments[key] || [];
    examState.segments[key] = picked.indexOf(value) >= 0 ? picked.filter(function (v) { return v !== value; }) : picked.concat(value);
    chip.classList.toggle("active");
  });

  $("#examRecent").addEventListener("click", function (event) {
    const chip = event.target.closest("[data-recent]");
    if (!chip) return;
    const box = $("#examDetails");
    const text = chip.dataset.recent;
    box.value = box.value.trim() ? box.value.trim().replace(/[；;]$/, "") + "；" + text : text;
    collectExamInputs();
  });

  document.addEventListener("click", function (event) {
    const openBtn = event.target.closest("[data-open-record]");
    if (openBtn) { openDetail(openBtn.dataset.openRecord); return; }
    const dayBtn = event.target.closest("[data-day]");
    if (dayBtn) { dateFilter = dayBtn.dataset.day; timelineFilter = "全部"; setView("timeline"); return; }
    const yearBtn = event.target.closest("[data-year]");
    if (yearBtn) { yearFilter = yearBtn.dataset.year; renderDateIndex(); return; }
    if (event.target.closest("[data-clear-date]")) { dateFilter = ""; if ($("#datePick")) $("#datePick").value = ""; renderAll(); return; }
    const goBtn = event.target.closest("[data-go-view]");
    if (goBtn) { setView(goBtn.dataset.goView); return; }
    if (event.target.closest("[data-open-new]")) { openForm(null); return; }
    const diagnosisBtn = event.target.closest("[data-diagnosis]");
    if (diagnosisBtn) {
      $("#globalSearch").value = diagnosisBtn.dataset.diagnosis;
      timelineFilter = "全部";
      setView("timeline");
      toast("已按诊断筛选：" + diagnosisBtn.dataset.diagnosis);
      return;
    }
    if (event.target.classList.contains("modal-backdrop")) {
      closeForm();
      closeDetail();
    }
  });

  $$("[data-type-filter]").forEach(function (b) {
    b.addEventListener("click", function () {
      timelineFilter = b.dataset.typeFilter;
      dateFilter = "";
      renderDateFilterChip();
      renderTimeline();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { closeForm(); closeDetail(); }
    if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      event.preventDefault();
      $("#globalSearch").focus();
    }
  });
}

/* ---------------- 第三轮：次要诊断 / 治疗类型 / 术后查体 / 辅助检查附件 ---------------- */

const FILE_DB = "vision-logbook-files";
const FILE_STORE = "files";
let pendingFiles = [];
let removedFiles = [];
let currentExistingFiles = [];
let postSegments = { segments: {} };
let secondaryDiagnoses = [];

function openDb() {
  return new Promise(function (resolve, reject) {
    if (!window.indexedDB) { reject(new Error("浏览器不支持本地文件存储")); return; }
    const req = indexedDB.open(FILE_DB, 1);
    req.onupgradeneeded = function () {
      const db = req.result;
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        const store = db.createObjectStore(FILE_STORE, { keyPath: "id" });
        store.createIndex("recordId", "recordId", { unique: false });
      }
    };
    req.onsuccess = function () { resolve(req.result); };
    req.onerror = function () { reject(req.error || new Error("本地数据库打开失败")); };
  });
}
function idbPut(value) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(FILE_STORE, "readwrite");
      tx.objectStore(FILE_STORE).put(value);
      tx.oncomplete = function () { resolve(true); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}
function idbGet(id) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(FILE_STORE, "readonly");
      const req = tx.objectStore(FILE_STORE).get(id);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
    });
  });
}
function idbByRecord(recordId) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const out = [];
      const tx = db.transaction(FILE_STORE, "readonly");
      const req = tx.objectStore(FILE_STORE).index("recordId").openCursor(IDBKeyRange.only(recordId));
      req.onsuccess = function () { const cursor = req.result; if (cursor) { out.push(cursor.value); cursor.continue(); } else { resolve(out); } };
      req.onerror = function () { reject(req.error); };
    });
  });
}
function idbDelete(id) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(FILE_STORE, "readwrite");
      tx.objectStore(FILE_STORE).delete(id);
      tx.oncomplete = function () { resolve(true); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}
function readAsDataUrl(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () { resolve(reader.result); };
    reader.onerror = function () { reject(reader.error || new Error("文件读取失败")); };
    reader.readAsDataURL(file);
  });
}
function prepareFile(file) {
  if (!/^image\//.test(file.type) || /tif/.test(file.type)) {
    return readAsDataUrl(file).then(function (url) { return { dataUrl: url, type: file.type }; });
  }
  return new Promise(function (resolve) {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = function () {
      const max = 1600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);
      resolve({ dataUrl: canvas.toDataURL("image/jpeg", 0.72), type: "image/jpeg" });
    };
    img.onerror = function () {
      URL.revokeObjectURL(objectUrl);
      readAsDataUrl(file).then(function (url) { resolve({ dataUrl: url, type: file.type }); });
    };
    img.src = objectUrl;
  });
}
function sizeLabel(size) {
  const bytes = Number(size) || 0;
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  return Math.max(1, Math.round(bytes / 1024)) + " KB";
}
function renderAttachList() {
  const box = $("#attachList");
  if (!box) return;
  const parts = [];
  currentExistingFiles.forEach(function (file) {
    parts.push('<div class="attach-item"><span class="attach-meta"><span class="attach-name">' + escapeHtml(file.name) + '</span><span class="attach-size">' + escapeHtml(sizeLabel(file.size)) + '</span></span><span class="attach-actions"><button type="button" data-drop-existing="' + escapeHtml(file.id) + '">移除</button></span></div>');
  });
  pendingFiles.forEach(function (file, index) {
    parts.push('<div class="attach-item"><span class="attach-meta"><span class="attach-name">' + escapeHtml(file.name) + '</span><span class="attach-size">待上传 · ' + escapeHtml(sizeLabel(file.size)) + '</span></span><span class="attach-actions"><button type="button" data-drop-pending="' + index + '">取消</button></span></div>');
  });
  box.innerHTML = parts.join("");
}
function onAttachPick(event) {
  Array.from(event.target.files || []).forEach(function (file) {
    if (file.size > 8 * 1024 * 1024 && !/^image\//.test(file.type)) { toast("「" + file.name + "」超过 8MB，建议压缩后再传"); return; }
    pendingFiles.push(file);
  });
  event.target.value = "";
  renderAttachList();
}
function onAttachAction(event) {
  const dropExisting = event.target.closest("[data-drop-existing]");
  if (dropExisting) {
    const id = dropExisting.dataset.dropExisting;
    currentExistingFiles = currentExistingFiles.filter(function (file) { return file.id !== id; });
    if (removedFiles.indexOf(id) < 0) removedFiles.push(id);
    renderAttachList();
    return;
  }
  const dropPending = event.target.closest("[data-drop-pending]");
  if (dropPending) { pendingFiles.splice(Number(dropPending.dataset.dropPending), 1); renderAttachList(); }
}
function savePendingFiles(recordId) {
  const jobs = pendingFiles.map(function (file) {
    return prepareFile(file).then(function (prepared) {
      return idbPut({
        id: "f-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
        recordId: recordId,
        name: file.name,
        type: prepared.type || file.type,
        size: Math.round((prepared.dataUrl.length - 22) * 0.75),
        dataUrl: prepared.dataUrl,
        createdAt: new Date().toISOString()
      });
    });
  });
  const drops = removedFiles.map(function (id) { return idbDelete(id); });
  return Promise.all(jobs.concat(drops)).then(function () { pendingFiles = []; removedFiles = []; });
}
function openStoredFile(id, download) {
  idbGet(id).then(function (file) {
    if (!file) { toast("附件不存在"); return; }
    if (download) {
      const link = document.createElement("a");
      link.href = file.dataUrl;
      link.download = file.name || "附件";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    fetch(file.dataUrl).then(function (res) { return res.blob(); }).then(function (blob) {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    }).catch(function () { toast("附件打开失败"); });
  }).catch(function () { toast("附件读取失败"); });
}
function renderDetailAttachments(files) {
  const box = $("#detailAttachments");
  if (!box) return;
  if (!files.length) { box.innerHTML = '<p class="attach-empty">尚无附件</p>'; return; }
  box.innerHTML = files.map(function (file) {
    return '<div class="attach-item"><span class="attach-meta"><span class="attach-name">' + escapeHtml(file.name) + '</span><span class="attach-size">' + escapeHtml(sizeLabel(file.size)) + '</span></span><span class="attach-actions"><button type="button" data-view-file="' + escapeHtml(file.id) + '">查看</button><button type="button" data-save-file="' + escapeHtml(file.id) + '">下载</button></span></div>';
  }).join("");
}

function renderSecondary() {
  const box = $("#secondaryList");
  if (!box) return;
  box.innerHTML = secondaryDiagnoses.map(function (name, index) {
    return '<span class="tag-item">' + escapeHtml(name) + '<button type="button" data-drop-secondary="' + index + '" title="删除">×</button></span>';
  }).join("");
}
function addSecondaryDiagnosis() {
  const input = $("#secondaryInput");
  if (!input) return;
  String(input.value || "").split(/[,，、;；]+/).forEach(function (part) {
    const value = part.trim();
    if (value && secondaryDiagnoses.indexOf(value) < 0) secondaryDiagnoses.push(value);
  });
  input.value = "";
  renderSecondary();
}

function postExamSegmentParts() {
  const parts = [];
  SEGMENTS.forEach(function (group) {
    const picked = postSegments.segments[group.key] || [];
    if (picked.length) parts.push(group.label + "：" + picked.join("、"));
  });
  return parts;
}
function composePostExamText() {
  const parts = [];
  const uc = $("#postVisionUc") ? $("#postVisionUc").value.trim() : "";
  const corr = $("#postVisionCorr") ? $("#postVisionCorr").value.trim() : "";
  const refraction = $("#postRefraction") ? $("#postRefraction").value.trim() : "";
  const iopOd = $("#postIopOd") ? $("#postIopOd").value.trim() : "";
  const iopOs = $("#postIopOs") ? $("#postIopOs").value.trim() : "";
  const extra = $("#postExtra") ? $("#postExtra").value.trim() : "";
  if (uc) parts.push("裸眼视力 " + uc);
  if (corr) parts.push("矫正视力 " + corr);
  if (refraction) parts.push("验光 " + refraction);
  if (iopOd || iopOs) parts.push("眼压 OD " + (iopOd || "—") + "、OS " + (iopOs || "—") + " mmHg");
  parts.push.apply(parts, postExamSegmentParts());
  if (extra) parts.push("术后补充：" + extra);
  return parts.join("；");
}
function renderPostSegments() {
  const box = $("#postSegments");
  if (!box) return;
  box.innerHTML = SEGMENTS.map(function (group) {
    const picked = postSegments.segments[group.key] || [];
    return '<div class="seg-group"><span class="seg-label">' + escapeHtml(group.label) + '</span><span class="seg-chips">' + group.options.map(function (option) {
      const on = picked.indexOf(option) >= 0 ? " active" : "";
      return '<button type="button" class="chip' + on + '" data-post-key="' + group.key + '" data-val="' + escapeHtml(option) + '">' + escapeHtml(option) + "</button>";
    }).join("") + "</span></div>";
  }).join("");
}
function applyPostNormalAll() {
  SEGMENTS.forEach(function (group) { postSegments.segments[group.key] = [group.options[0]]; });
  renderPostSegments();
  toast("术后查体已按常规填入");
}
function clearPostExam() {
  ["#postVisionUc", "#postVisionCorr", "#postRefraction", "#postIopOd", "#postIopOs", "#postExtra"].forEach(function (sel) { if ($(sel)) $(sel).value = ""; });
  postSegments = { segments: {} };
  renderPostSegments();
  toast("已清空术后查体");
}
function showPostSection() {
  const box = $("#postExamSection");
  if (!box) return;
  const isSurgeryType = $("#treatmentType") && $("#treatmentType").value === "手术治疗";
  box.classList.toggle("hidden", !isSurgeryType && !composePostExamText());
  updatePostEyeHint();
}
function updatePostEyeHint() {
  const hint = $("#postEyeHint");
  if (!hint) return;
  const eye = $("#recordEye") ? $("#recordEye").value : "";
  hint.textContent = (!eye || eye === "未明确") ? "术眼" : "术眼 · " + eyeLabel(eye);
}

function extraDetailHtml(r) {
  let html = "";
  if (r.surgeon) html += detailRow("主刀医师", r.surgeon);
  if ((r.secondaryDiagnoses || []).length) html += detailRow("次要诊断", r.secondaryDiagnoses.join("、"));
  html += detailRow("辅助检查", r.auxExam || "未记录");
  html += detailRow("术后查体", r.postopExam || "未记录");
  const generalSection = '<div class="detail-section"><h3>全身情况</h3>' + detailRow("入院时", r.generalAdmission || "未记录") + detailRow("术后 / 保守治疗后", r.generalAfter || "未记录") + "</div>";
  return generalSection + '<div class="detail-section"><h3>手术与检查</h3>' + html + '<div class="attach-block"><span class="field-label">辅助检查附件</span><div id="detailAttachments" class="attach-list"><p class="attach-empty">读取中…</p></div></div></div>';
}

const baseOpenForm = openForm;
openForm = function (record) {
  baseOpenForm(record);
  const r = record || {};
  if ($("#treatmentType")) $("#treatmentType").value = r.treatmentType || (isSurgery(r) ? "手术治疗" : "保守治疗");
  if ($("#attendingDoctor")) $("#attendingDoctor").value = r.attendingDoctor || "";
  if ($("#surgeon")) $("#surgeon").value = r.surgeon || "";
  if ($("#auxExam")) $("#auxExam").value = r.auxExam || "";
  if ($("#generalAdmission")) $("#generalAdmission").value = r.generalAdmission || "";
  if ($("#generalAfter")) $("#generalAfter").value = r.generalAfter || "";
  secondaryDiagnoses = Array.isArray(r.secondaryDiagnoses) ? r.secondaryDiagnoses.slice() : [];
  const post = r.examQuickPost || {};
  postSegments = { segments: Object.assign({}, post.segments || {}) };
  setField("postVisionUc", post.visionUc || post.vision || "");
  setField("postVisionCorr", post.visionCorr || "");
  setField("postRefraction", post.refraction || "");
  setField("postIopOd", post.iopOd || "");
  setField("postIopOs", post.iopOs || "");
  setField("postExtra", post.extra || "");
  pendingFiles = [];
  removedFiles = [];
  currentExistingFiles = [];
  renderSecondary();
  renderPostSegments();
  renderAttachList();
  showPostSection();
  if (r.id) {
    idbByRecord(r.id).then(function (files) { currentExistingFiles = files; renderAttachList(); }).catch(function () {});
  }
};

const baseHandleSubmit = handleSubmit;
handleSubmit = async function (event) {
  const beforeIds = records.map(function (r) { return r.id; });
  const beforeMap = {};
  records.forEach(function (r) { beforeMap[r.id] = JSON.stringify(r); });
  baseHandleSubmit(event);
  const knownId = $("#recordId") ? $("#recordId").value : "";
  let target = records.filter(function (r) { return r.id === knownId; })[0];
  if (!target) target = records.filter(function (r) { return beforeIds.indexOf(r.id) < 0; })[0];
  if (!target) target = records.filter(function (r) { return beforeMap[r.id] !== JSON.stringify(r); })[0];
  if (!target) return;
  target.secondaryDiagnoses = secondaryDiagnoses.slice();
  target.treatmentType = $("#treatmentType") ? $("#treatmentType").value : (isSurgery(target) ? "手术治疗" : "保守治疗");
  target.attendingDoctor = $("#attendingDoctor") ? $("#attendingDoctor").value.trim() : "";
  target.surgeon = $("#surgeon") ? $("#surgeon").value.trim() : "";
  target.auxExam = $("#auxExam") ? $("#auxExam").value.trim() : "";
  target.generalAdmission = $("#generalAdmission") ? $("#generalAdmission").value.trim() : "";
  target.generalAfter = $("#generalAfter") ? $("#generalAfter").value.trim() : "";
  target.examQuickPost = {
    visionUc: $("#postVisionUc") ? $("#postVisionUc").value.trim() : "",
    visionCorr: $("#postVisionCorr") ? $("#postVisionCorr").value.trim() : "",
    refraction: $("#postRefraction") ? $("#postRefraction").value.trim() : "",
    iopOd: $("#postIopOd") ? $("#postIopOd").value.trim() : "",
    iopOs: $("#postIopOs") ? $("#postIopOs").value.trim() : "",
    segments: Object.assign({}, postSegments.segments),
    extra: $("#postExtra") ? $("#postExtra").value.trim() : ""
  };
  target.postopExam = composePostExamText();
  target.attachCount = Number(target.attachCount) || 0;
  saveRecords();
  try {
    await savePendingFiles(target.id);
    const files = await idbByRecord(target.id);
    target.attachCount = files.length;
    saveRecords();
  } catch (err) {
    toast("附件保存失败：" + ((err && err.message) || "浏览器不支持本地文件存储"));
  }
  pendingFiles = [];
  removedFiles = [];
  renderAll();
};

const baseOpenDetail = openDetail;
openDetail = function (id) {
  baseOpenDetail(id);
  const r = records.filter(function (x) { return x.id === id; })[0];
  const box = $("#detailContent");
  if (!r || !box) return;
  box.insertAdjacentHTML("beforeend", extraDetailHtml(r));
  idbByRecord(id).then(function (files) { renderDetailAttachments(files); }).catch(function () { renderDetailAttachments([]); });
};

const baseDeleteRecord = deleteRecord;
deleteRecord = function () {
  const id = selectedDetailId;
  baseDeleteRecord();
  if (id) {
    idbByRecord(id).then(function (files) {
      return Promise.all(files.map(function (file) { return idbDelete(file.id); }));
    }).catch(function () {});
  }
};

function bindRoundThree() {
  $$(".metric-card").forEach(function (card, index) {
    card.classList.add("metric-link");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    const openFollowup = index === 3;
    const openSurgery = index === 2;
    card.setAttribute("title", openFollowup ? "点开看还有哪些病人待随访" : (openSurgery ? "点开查看手术记录与随访名单" : "点开查看全部病例，并按日期筛选"));
    const openAll = function () {
      if (openFollowup || openSurgery) {
        setView("surgery");
        const anchor = $("#pendingFollowupList");
        if (openFollowup) {
          const left = anchor ? anchor.querySelectorAll(".followup-item").length : 0;
          toast(left ? "待随访 " + left + " 人，已在下方「待随访病人」列出" : "目前没有待随访病人");
          if (anchor) window.setTimeout(function () { anchor.scrollIntoView({ behavior: "smooth", block: "start" }); }, 260);
        } else {
          toast("已打开手术记录，下方是待随访病人与随访记录");
        }
        return;
      }
      dateFilter = "";
      if ($("#datePick")) $("#datePick").value = "";
      timelineFilter = "全部";
      setView("timeline");
      toast("已打开全部病例，可选定日期只看一天");
    };
    card.addEventListener("click", openAll);
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openAll(); }
    });
  });
  if ($("#datePick")) {
    $("#datePick").addEventListener("change", function () {
      dateFilter = $("#datePick").value || "";
      renderAll();
    });
  }
  if ($("#postSegments")) {
    $("#postSegments").addEventListener("click", function (event) {
      const chip = event.target.closest("[data-post-key]");
      if (!chip) return;
      const key = chip.dataset.postKey;
      const value = chip.dataset.val;
      const picked = postSegments.segments[key] || [];
      const index = picked.indexOf(value);
      if (index >= 0) picked.splice(index, 1);
      else picked.push(value);
      postSegments.segments[key] = picked;
      renderPostSegments();
    });
  }
  if ($("#postNormalAll")) $("#postNormalAll").addEventListener("click", applyPostNormalAll);
  if ($("#postClearExam")) $("#postClearExam").addEventListener("click", clearPostExam);
  if ($("#treatmentType")) $("#treatmentType").addEventListener("change", showPostSection);
  if ($("#recordEye")) $("#recordEye").addEventListener("change", updatePostEyeHint);
  if ($("#attachInput")) $("#attachInput").addEventListener("change", onAttachPick);
  if ($("#attachList")) $("#attachList").addEventListener("click", onAttachAction);
  if ($("#addSecondaryBtn")) $("#addSecondaryBtn").addEventListener("click", addSecondaryDiagnosis);
  if ($("#secondaryInput")) {
    $("#secondaryInput").addEventListener("keydown", function (event) {
      if (event.key === "Enter") { event.preventDefault(); addSecondaryDiagnosis(); }
    });
  }
  if ($("#secondaryList")) {
    $("#secondaryList").addEventListener("click", function (event) {
      const button = event.target.closest("[data-drop-secondary]");
      if (!button) return;
      secondaryDiagnoses.splice(Number(button.dataset.dropSecondary), 1);
      renderSecondary();
    });
  }
  document.addEventListener("click", function (event) {
    const viewFile = event.target.closest("[data-view-file]");
    if (viewFile) { openStoredFile(viewFile.dataset.viewFile, false); return; }
    const saveFile = event.target.closest("[data-save-file]");
    if (saveFile) { openStoredFile(saveFile.dataset.saveFile, true); return; }
    const quick = event.target.closest("[data-quick-followup]");
    if (!quick) return;
    const src = records.filter(function (x) { return String(x.id) === String(quick.dataset.quickFollowup); })[0];
    if (!src) return;
    openForm(null);
    if ($("#patientName")) $("#patientName").value = src.name || "";
    if ($("#patientNo")) $("#patientNo").value = src.patientNo || "";
    if ($("#patientGender")) $("#patientGender").value = src.gender || "未记录";
    if ($("#patientAge")) $("#patientAge").value = src.age === 0 || src.age ? String(src.age) : "";
    if ($("#recordEye")) $("#recordEye").value = src.eye || "OD";
    if ($("#encounterType")) $("#encounterType").value = "随访";
    if ($("#recordDiagnosis")) $("#recordDiagnosis").value = src.diagnosis || "";
    if ($("#attendingDoctor")) $("#attendingDoctor").value = src.attendingDoctor || "";
    if ($("#recordStatus")) $("#recordStatus").value = "已完成";
    if ($("#followupDate")) $("#followupDate").value = "";
    if ($("#encounterDate")) $("#encounterDate").value = todayIso();
    if ($("#generalAdmission")) $("#generalAdmission").value = src.generalAdmission || "";
    if ($("#generalAfter")) $("#generalAfter").value = src.generalAfter || "";
    if (typeof updatePostEyeHint === "function") updatePostEyeHint();
    toast("已按「随访」录入 " + (src.name || "该病人") + "，填好本次随访情况后保存");
  });
}

function init() {
  renderDateStamp();
  initNote();
  bindEvents();
  setView("dashboard");
}

document.addEventListener("DOMContentLoaded", init);

/* ---------------- 导入 / 同步（电脑导出 JSON → 这台设备导入） ---------------- */
function importRecordsFromFile(file) {
  const reader = new FileReader();
  reader.onload = function () {
    let list = [];
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      list = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.records) ? parsed.records : []);
    } catch (error) {
      toast("导入失败：文件不是有效的 JSON");
      return;
    }
    const clean = list.filter(function (item) { return item && typeof item === "object" && item.id; });
    if (!clean.length) { toast("导入失败：文件里没有找到病例记录"); return; }
    let added = 0;
    let updated = 0;
    clean.forEach(function (item) {
      const index = records.findIndex(function (row) { return row.id === item.id; });
      if (index >= 0) { records[index] = Object.assign({}, records[index], item); updated += 1; }
      else { records.push(item); added += 1; }
    });
    saveRecords();
    renderAll();
    toast("已导入 " + clean.length + " 条：新增 " + added + "，更新 " + updated);
  };
  reader.onerror = function () { toast("导入失败：文件读不出来"); };
  reader.readAsText(file);
}

(function initImportSync() {
  function bind() {
    const button = $("#importBtn");
    const input = $("#importFile");
    if (!button || !input) return;
    button.addEventListener("click", function () { input.click(); });
    input.addEventListener("change", function (event) {
      const file = event.target.files && event.target.files[0];
      if (file) importRecordsFromFile(file);
      event.target.value = "";
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();