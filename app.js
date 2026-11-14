const DONE_KEY = "niayesh-class-done";
const BEST_KEY = "niayesh-class-best";
const LAST_KEY = "niayesh-class-last";
const DRAFT_KEY = "niayesh-class-drafts";

const state = {
  view: "home",
  track: "html",
  lessonId: "html-1",
  playKind: "html",
  examIndex: 0,
  examScore: 0,
  examAnswers: [],
  examLocked: false,
  examFeedback: null
};

const drafts = loadDrafts();
const done = new Set(loadDone());
let sqlPromise = null;
let pyPromise = null;
let cssToken = 0;

const app = document.getElementById("app");
const topMeta = document.getElementById("topMeta");

document.body.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-act]");
  if (!btn) return;
  const act = btn.dataset.act;
  if (act === "home") showHome();
  if (act === "continue") resume();
  if (act === "guide") showGuide(btn.dataset.id || (state.guide || "html"));
  if (act === "track") openTrack(btn.dataset.id);
  if (act === "lesson") openLesson(btn.dataset.id);
  if (act === "check") checkCurrent();
  if (act === "run") runPlay();
  if (act === "solution") showSolution();
  if (act === "hint") showHint();
  if (act === "exam") startExam();
  if (act === "exam-submit") submitExam();
  if (act === "exam-next") nextExam();
  if (act === "play") openPlay(btn.dataset.kind || "html");
  if (act === "play-kind") openPlay(btn.dataset.kind);
});

document.body.addEventListener("input", (event) => {
  if (event.target.id !== "code") return;
  drafts[draftKey()] = event.target.value;
  saveDrafts();
});

function draftKey() {
  if (state.view === "lesson") return state.lessonId;
  if (state.view === "exam") return "exam:" + COURSE.exam[state.examIndex].id;
  return "play:" + state.playKind;
}

function loadDrafts() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}"); }
  catch (error) { return {}; }
}

function saveDrafts() {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts)); }
  catch (error) { /* private mode */ }
}

function loadLast() {
  try { return localStorage.getItem(LAST_KEY) || ""; }
  catch (error) { return ""; }
}

function saveLast(id) {
  try { localStorage.setItem(LAST_KEY, id); }
  catch (error) { /* private mode */ }
}

function loadDone() {
  try { return JSON.parse(localStorage.getItem(DONE_KEY) || "[]"); }
  catch (error) { return []; }
}

function saveDone() {
  try { localStorage.setItem(DONE_KEY, JSON.stringify([...done])); }
  catch (error) { /* private mode */ }
}

function bestScore() {
  try { return Number(localStorage.getItem(BEST_KEY) || 0); }
  catch (error) { return 0; }
}

function saveBest(score) {
  try {
    if (score > bestScore()) localStorage.setItem(BEST_KEY, String(score));
  } catch (error) { /* private mode */ }
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function lessonById(id) {
  return COURSE.lessons.find((item) => item.id === id);
}

function trackLessons(track) {
  return COURSE.lessons.filter((item) => item.track === track);
}

function progressNumbers() {
  const total = COURSE.lessons.length;
  const finished = COURSE.lessons.filter((item) => done.has(item.id)).length;
  return { finished, total };
}

function paintChrome() {
  const numbers = progressNumbers();
  const bar = document.getElementById("topBar");
  if (bar) bar.style.width = (numbers.total ? (numbers.finished / numbers.total) * 100 : 0) + "%";
  document.querySelectorAll(".dock button").forEach((btn) => {
    const act = btn.dataset.act;
    const on = (act === "home" && state.view === "home") ||
      (act === "guide" && state.view === "guide") ||
      (act === "exam" && (state.view === "exam" || state.view === "result")) ||
      (act === "continue" && state.view === "lesson");
    btn.classList.toggle("on", on);
  });
}

function resume() {
  const saved = lessonById(loadLast());
  const next = saved || COURSE.lessons.find((item) => !done.has(item.id)) || COURSE.lessons[0];
  openLesson(next.id);
}

function showHome() {
  state.view = "home";
  const best = bestScore();
  const numbers = progressNumbers();
  const saved = lessonById(loadLast());
  const last = saved || COURSE.lessons.find((item) => !done.has(item.id)) || COURSE.lessons[0];
  topMeta.textContent = numbers.finished + " از " + numbers.total;
  const cards = COURSE.tracks.map((track) => {
    const items = trackLessons(track.id);
    const finished = items.filter((item) => done.has(item.id)).length;
    const width = items.length ? (finished / items.length) * 100 : 0;
    return '<button class="path" type="button" data-act="track" data-id="' + track.id + '"><i>' +
      escapeHtml(track.title) + '</i><span><b>' + escapeHtml(track.title) + '</b><small>' +
      escapeHtml(track.text) + '</small><span class="meter"><span style="width:' + width +
      '%"></span></span><small>' + finished + " از " + items.length + " درس</small></span></button>";
  }).join("");
  const cont = '<button class="continue" type="button" data-act="continue"><b>' +
    (numbers.finished ? "ادامه از همین‌جا" : "شروع یادگیری") + "</b><span>" +
    escapeHtml(COURSE.tracks.find((item) => item.id === last.track).title + " · " + last.title) + "</span></button>";
  app.innerHTML =
    '<section class="hero"><h1>یادگیری نیایش</h1>' +
    "<p>درس‌ها کوتاه‌اند. می‌خوانی، خودت می‌نویسی، و بررسی می‌گوید درست است یا نه. اگر ببندی، دفعه بعد از همان درس ادامه می‌دهی.</p>" +
    cont +
    '<div class="paths">' + cards + "</div>" +
    '<div class="actions"><button class="go" type="button" data-act="guide">مرجع، مثل یک برگه یادداشت</button>' +
    '<button class="ghost" type="button" data-act="play" data-kind="html">زمین بازی</button></div>' +
    (best ? "<p>بهترین نمره آزمون: " + best + " از " + COURSE.exam.length + "</p>" : "") +
    "</section>";
  paintChrome();
  window.scrollTo(0, 0);
}

function openTrack(track) {
  const items = trackLessons(track);
  const last = lessonById(loadLast());
  const resumeLesson = last && last.track === track ? last : (items.find((item) => !done.has(item.id)) || items[0]);
  state.track = track;
  openLesson(resumeLesson.id);
}

function openLesson(id) {
  const lesson = lessonById(id);
  state.view = "lesson";
  state.track = lesson.track;
  state.lessonId = id;
  saveLast(id);
  renderLesson();
}

function renderLesson() {
  const lesson = lessonById(state.lessonId);
  const track = COURSE.tracks.find((item) => item.id === lesson.track);
  const items = trackLessons(lesson.track);
  const buttons = items.map((item) => {
    const cls = "lesson-btn" + (item.id === lesson.id ? " active" : "") + (done.has(item.id) ? " done" : "");
    return '<button class="' + cls + '" type="button" data-act="lesson" data-id="' + item.id + '"><b>' +
      escapeHtml(item.title) + "</b><small>" + escapeHtml(item.level) + "</small></button>";
  }).join("");
  const code = drafts[lesson.id] != null ? drafts[lesson.id] : (lesson.starter || "");
  const place = items.findIndex((item) => item.id === lesson.id);
  topMeta.textContent = (place + 1) + " از " + items.length;
  app.innerHTML =
    '<div class="layout"><aside class="side"><h2>' + escapeHtml(track.title) + '</h2><div class="lessons">' +
    buttons + '</div></aside><section class="panel">' + lessonBody(lesson) +
    editorBlock(lesson, code, true) + pager(items, place) + "</section></div>";
  paintChrome();
  window.scrollTo(0, 0);
}

function pager(items, place) {
  const prev = items[place - 1];
  const next = items[place + 1];
  return '<div class="pager">' +
    (prev ? '<button class="ghost" type="button" data-act="lesson" data-id="' + prev.id + '">درس قبلی</button>' : "<span></span>") +
    '<span class="pager-mid">' + (place + 1) + " / " + items.length + "</span>" +
    (next ? '<button class="go" type="button" data-act="lesson" data-id="' + next.id + '">درس بعدی</button>' : "<span></span>") +
    "</div>";
}

function showGuide(id) {
  state.view = "guide";
  state.guide = id;
  const section = COURSE.guide.find((item) => item.id === id) || COURSE.guide[0];
  topMeta.textContent = "مرجع";
  const chips = COURSE.guide.map((item) =>
    '<button class="' + (item.id === section.id ? "go" : "ghost") + '" type="button" data-act="guide" data-id="' +
    item.id + '">' + escapeHtml(item.title) + "</button>"
  ).join("");
  const rows = section.rows.map((row) => "<tr><td>" + escapeHtml(row[0]) + "</td><td>" + escapeHtml(row[1]) + "</td></tr>").join("");
  app.innerHTML = '<section class="panel"><h2>مرجع</h2><p>' + escapeHtml(section.intro) +
    '</p><div class="chips">' + chips + '</div><table class="compare"><tbody>' + rows + "</tbody></table></section>";
  paintChrome();
  window.scrollTo(0, 0);
}

function lessonBody(lesson) {
  let html = '<span class="level">' + escapeHtml(lesson.level) + "</span><h2>" + escapeHtml(lesson.title) + "</h2>";
  (lesson.paragraphs || []).forEach((p) => { html += "<p>" + escapeHtml(p) + "</p>"; });
  if (lesson.compare) html += compareTable(lesson.compare);
  if (lesson.kind === "sql") html += schemaBlock();
  if (lesson.example) html += "<h3>نمونه</h3><pre>" + escapeHtml(lesson.example) + "</pre>";
  html += "<h3>نوبت تو</h3><p>" + escapeHtml(lesson.task) + "</p>";
  return html;
}

function editorBlock(lesson, code, withHelp) {
  if (lesson.kind === "choice") {
    const options = lesson.options.map((text, index) =>
      '<label class="option"><input type="radio" name="choice" value="' + index + '"> ' + escapeHtml(text) + "</label>"
    ).join("");
    return options + '<div class="row"><button class="go" type="button" data-act="check">بررسی جواب</button>' +
      (withHelp ? helpButtons() : "") + '</div><div id="result" class="result" hidden></div><pre id="solutionBox" hidden></pre>';
  }
  const preview = lesson.kind === "html" || lesson.kind === "css"
    ? '<h3>پیش‌نمایش</h3><iframe class="preview" id="preview" title="پیش‌نمایش" sandbox="allow-scripts"></iframe>'
    : "";
  return '<textarea id="code" spellcheck="false" aria-label="کد">' + escapeHtml(code) + "</textarea>" +
    '<div class="row"><button class="go" type="button" data-act="check">بررسی جواب</button>' +
    (withHelp ? helpButtons() : "") + "</div>" + preview +
    '<div id="result" class="result" hidden></div><pre id="solutionBox" hidden></pre>';
}

function helpButtons() {
  return '<button class="ghost" type="button" data-act="hint">راهنما</button>' +
    '<button class="ghost" type="button" data-act="solution">جواب نمونه</button>';
}

function schemaBlock() {
  return "<h3>students</h3>" + tableHtml(COURSE.sample.students.columns, COURSE.sample.students.rows) +
    "<h3>courses</h3>" + tableHtml(COURSE.sample.courses.columns, COURSE.sample.courses.rows);
}

function tableHtml(columns, rows) {
  const head = columns.map((col) => "<th>" + escapeHtml(col) + "</th>").join("");
  const body = rows.map((row) => "<tr>" + row.map((cell) => "<td>" + escapeHtml(cell) + "</td>").join("") + "</tr>").join("");
  return '<table class="schema"><thead><tr>' + head + "</tr></thead><tbody>" + body + "</tbody></table>";
}

function compareTable(rows) {
  const body = rows.map((row) =>
    "<tr><td>" + escapeHtml(row.topic) + "</td><td>" + escapeHtml(row.mysql) + "</td><td>" + escapeHtml(row.postgres) + "</td></tr>"
  ).join("");
  return '<table class="compare"><thead><tr><th>موضوع</th><th>MySQL</th><th>PostgreSQL</th></tr></thead><tbody>' +
    body + "</tbody></table>";
}

function showHint() {
  const lesson = lessonById(state.lessonId);
  paintResult({ ok: false, message: lesson.hint || "" }, false);
}

function showSolution() {
  const lesson = lessonById(state.lessonId);
  const box = document.getElementById("solutionBox");
  if (!box) return;
  box.hidden = false;
  box.textContent = lesson.solution || "";
}

async function checkCurrent() {
  const lesson = lessonById(state.lessonId);
  const button = document.querySelector("[data-act='check']");
  if (button) button.disabled = true;
  paintResult({ ok: false, message: "دارم بررسی می‌کنم..." }, false);
  try {
    const result = await grade(lesson, readAnswer(lesson));
    paintResult(result, true);
    if (result.ok) markDone(lesson.id);
  } catch (error) {
    paintResult({ ok: false, message: "اجرا نشد.\n" + error.message }, true);
  } finally {
    if (button) button.disabled = false;
  }
}

function readAnswer(item) {
  if (item.kind === "choice") {
    const picked = document.querySelector('input[name="choice"]:checked');
    return picked ? Number(picked.value) : null;
  }
  const box = document.getElementById("code");
  return box ? box.value : "";
}

function markDone(id) {
  done.add(id);
  saveDone();
  const btn = document.querySelector('[data-act="lesson"][data-id="' + id + '"]');
  if (btn) btn.classList.add("done");
}

function paintResult(result, keepClass) {
  const box = document.getElementById("result");
  if (!box) return;
  box.hidden = false;
  box.className = "result" + (keepClass ? (result.ok ? " ok" : " bad") : "");
  box.textContent = result.message || "";
  if (result.rows) {
    const table = document.createElement("div");
    table.innerHTML = tableHtml(result.columns || [], result.rows);
    box.appendChild(table);
  }
}

async function grade(item, answer) {
  if (item.kind === "choice") return gradeChoice(item, answer);
  if (!String(answer || "").trim()) return { ok: false, message: "اول جواب را بنویس." };
  if (item.kind === "html") return gradeHtml(item, answer);
  if (item.kind === "css") return gradeCss(item, answer);
  if (item.kind === "python") return gradePython(item, answer);
  if (item.kind === "sql") return gradeSql(item, answer);
  return { ok: false, message: "این تمرین قابل اجرا نیست." };
}

function gradeChoice(item, answer) {
  if (answer == null) return { ok: false, message: "یکی از گزینه‌ها را انتخاب کن." };
  if (answer === item.answer) return { ok: true, message: "درست بود." };
  return { ok: false, message: "این گزینه نبود. جواب: " + item.options[item.answer] };
}

function gradeHtml(item, code) {
  showHtmlPreview(code);
  const doc = new DOMParser().parseFromString(code, "text/html");
  for (const rule of item.rules || []) {
    let nodes = [];
    try { nodes = [...doc.querySelectorAll(rule.sel)]; }
    catch (error) { return { ok: false, message: rule.hint }; }
    if (rule.text) {
      nodes = nodes.filter((node) => node.textContent.replace(/\s+/g, " ").includes(rule.text));
    }
    if (nodes.length < (rule.count || 1)) return { ok: false, message: rule.hint };
  }
  return { ok: true, message: "درست نوشته‌ای. پیش‌نمایش پایین صفحه همان چیزی است که ساختی." };
}

function showHtmlPreview(code) {
  const frame = document.getElementById("preview");
  if (!frame) return;
  const doc = /<html[\s>]/i.test(code) ? code : "<!DOCTYPE html><html><body>" + code + "</body></html>";
  frame.srcdoc = doc;
}

function cssSafe(css) {
  return String(css).replace(/<\/(style|script)/gi, "<\\/$1");
}

function gradeCss(item, css) {
  const missing = (item.sourceIncludes || []).find((bit) => !css.includes(bit));
  if (missing) return { ok: false, message: "در کدت این را پیدا نکردم: " + missing };
  if (!item.styles || !item.styles.length) {
    showCssPreview(css, item.fixture || "");
    return { ok: true, message: "درست بود. قطعه‌هایی که این درس می‌خواست در کدت هست." };
  }
  return checkComputed(css, item);
}

function showCssPreview(css, fixture) {
  const frame = document.getElementById("preview");
  if (!frame) return;
  frame.srcdoc = "<!DOCTYPE html><html><head><style>" + cssSafe(css) + "</style></head><body>" + fixture + "</body></html>";
}

function checkComputed(css, item) {
  const frame = document.getElementById("preview");
  const token = ++cssToken;
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      window.removeEventListener("message", onMsg);
      resolve({ ok: false, message: "پیش‌نمایش جواب نداد. یک بار دیگر بررسی را بزن." });
    }, 2500);
    function onMsg(event) {
      if (!event.data || event.data.type !== "css-check" || event.data.token !== token) return;
      clearTimeout(timer);
      window.removeEventListener("message", onMsg);
      const failed = (event.data.out || []).find((row) => !row.ok);
      if (failed) resolve({ ok: false, message: failed.hint });
      else resolve({ ok: true, message: "درست بود. سبک کارت همان چیزی شد که درس خواسته بود." });
    }
    window.addEventListener("message", onMsg);
    const rules = JSON.stringify(item.styles || []);
    const probe = "<script>const rules = " + rules + "; const out = rules.map((rule) => {" +
      "const el = document.querySelector(rule.selector); if (!el) return {ok:false, hint:rule.hint};" +
      "const value = getComputedStyle(el)[rule.prop] || '';" +
      "let ok = true; if (rule.equals && value !== rule.equals) ok = false;" +
      "if (rule.twoTracks && value.trim().split(/\\s+/).length < 2) ok = false;" +
      "return {ok, hint:rule.hint, value};" +
      "}); parent.postMessage({type:'css-check', token:" + token + ", out}, '*');<\/script>";
    frame.srcdoc = "<!DOCTYPE html><html><head><style>" + cssSafe(css) + "</style></head><body>" +
      (item.fixture || "") + probe + "</body></html>";
  });
}

async function gradePython(item, code) {
  const py = await loadPython();
  const chunks = [];
  py.setStdout({ batched: (text) => chunks.push(text) });
  py.setStdin({ stdin: () => "\n" });
  const guard = "import sys\n_steps = {'n': 0}\n" +
    "def _trace(frame, event, arg):\n" +
    "    _steps['n'] += 1\n" +
    "    if _steps['n'] > 200000:\n" +
    "        raise RuntimeError('too-long')\n" +
    "    return _trace\n" +
    "sys.settrace(_trace)\n";
  const script = guard + (item.prelude || "") + code + (item.append || "") + "\nsys.settrace(None)\n";
  try {
    await py.runPythonAsync(script);
  } catch (error) {
    const text = String(error);
    if (text.includes("too-long")) {
      return { ok: false, message: "برنامه خیلی طول کشید. احتمالاً یک حلقه تمام نمی‌شود." };
    }
    return { ok: false, message: "Python این خطا را داد:\n" + text };
  }
  const got = norm(chunks.map((chunk) => chunk.replace(/\n$/g, "")).join("\n"));
  const expect = norm(item.expect || "");
  if (got === expect) return { ok: true, message: "درست بود.\nخروجی:\n" + got };
  return { ok: false, message: "خروجی این شد:\n" + (got || "(خالی)") + "\n\nباید این می‌شد:\n" + expect };
}

function norm(value) {
  return String(value).replace(/\r/g, "").trim().split("\n").map((line) => line.trim()).filter(Boolean).join("\n");
}

function loadPython() {
  if (!pyPromise) {
    pyPromise = (async () => {
      if (!window.loadPyodide) {
        await loadScript("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js", 40000);
      }
      return loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    })().catch((error) => {
      pyPromise = null;
      throw new Error("موتور Python دانلود نشد. اینترنت این صفحه را چک کن و دوباره بزن.");
    });
  }
  return pyPromise;
}

function loadScript(src, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = () => { clearTimeout(timer); reject(new Error("network")); };
    document.head.appendChild(script);
  });
}

async function gradeSql(item, code) {
  const SQL = await loadSql();
  const db = new SQL.Database();
  try {
    db.exec(COURSE.seed);
    db.exec(code);
    const checked = db.exec(item.followedBy || lastSelect(code) || code);
    if (!checked.length) return { ok: false, message: "کوئری ردیفی برنگرداند." };
    const result = checked[checked.length - 1];
    const rows = result.values;
    if (sameRows(rows, item.expectRows || [])) {
      return { ok: true, message: "درست بود. نتیجه:", columns: result.columns, rows };
    }
    return {
      ok: false,
      message: "نتیجه با جواب درس یکی نیست. نتیجه تو این است:",
      columns: result.columns,
      rows
    };
  } catch (error) {
    return { ok: false, message: "این کوئری اجرا نشد.\n" + error.message };
  } finally {
    db.close();
  }
}

function lastSelect(code) {
  const parts = String(code).split(";").map((part) => part.trim()).filter(Boolean);
  for (let i = parts.length - 1; i >= 0; i -= 1) {
    if (/^select\b/i.test(parts[i])) return parts[i];
  }
  return "";
}

function sameRows(got, expect) {
  if (got.length !== expect.length) return false;
  for (let i = 0; i < got.length; i += 1) {
    if (got[i].length !== expect[i].length) return false;
    for (let j = 0; j < got[i].length; j += 1) {
      if (String(got[i][j]) !== String(expect[i][j])) return false;
    }
  }
  return true;
}

function loadSql() {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      if (!window.initSqlJs) await loadScript("vendor/sql-wasm.js", 20000);
      return initSqlJs({ locateFile: (file) => "vendor/" + file });
    })().catch((error) => {
      sqlPromise = null;
      throw new Error("موتور پایگاه‌داده باز نشد.");
    });
  }
  return sqlPromise;
}

function startExam() {
  state.view = "exam";
  state.examIndex = 0;
  state.examScore = 0;
  state.examAnswers = [];
  state.examLocked = false;
  state.examFeedback = null;
  renderExam();
}

function renderExam() {
  if (state.examIndex >= COURSE.exam.length) return renderExamResult();
  const item = COURSE.exam[state.examIndex];
  topMeta.textContent = "آزمون " + (state.examIndex + 1) + " از " + COURSE.exam.length;
  const code = drafts["exam:" + item.id] != null ? drafts["exam:" + item.id] : (item.starter || "");
  let body = "<h2>" + escapeHtml(item.title) + "</h2><p>" + escapeHtml(item.prompt) + "</p>";
  if (item.kind === "sql") body += schemaBlock();
  if (item.kind === "choice") {
    body += item.options.map((text, index) =>
      '<label class="option"><input type="radio" name="choice" value="' + index + '"' +
      (state.examLocked ? " disabled" : "") + "> " + escapeHtml(text) + "</label>"
    ).join("");
  } else if (state.examLocked) {
    body += "<pre>" + escapeHtml(code) + "</pre>";
  } else {
    body += '<textarea id="code" spellcheck="false">' + escapeHtml(code) + "</textarea>";
    if (item.kind === "html" || item.kind === "css") {
      body += '<iframe class="preview" id="preview" title="پیش‌نمایش" sandbox="allow-scripts"></iframe>';
    }
  }
  body += '<div class="row">';
  if (!state.examLocked) body += '<button class="go" type="button" data-act="exam-submit">ثبت جواب</button>';
  else body += '<button class="go" type="button" data-act="exam-next">' +
    (state.examIndex + 1 === COURSE.exam.length ? "دیدن نمره" : "بعدی") + "</button>";
  body += '<button class="ghost" type="button" data-act="home">برگشت به کلاس</button></div>';
  if (state.examFeedback) {
    body += '<div class="result ' + (state.examFeedback.ok ? "ok" : "bad") + '">' +
      escapeHtml(state.examFeedback.message) + "</div>";
  }
  app.innerHTML = '<section class="panel">' + body + "</section>";
  paintChrome();
  window.scrollTo(0, 0);
}

async function submitExam() {
  if (state.examLocked) return;
  const item = COURSE.exam[state.examIndex];
  const answer = readAnswer(item);
  const button = document.querySelector("[data-act='exam-submit']");
  if (button) button.disabled = true;
  try {
    const result = await grade(item, answer);
    if (result.ok) state.examScore += 1;
    state.examAnswers.push({ id: item.id, title: item.title, ok: result.ok });
    state.examFeedback = { ok: result.ok, message: result.ok ? "درست بود." : result.message };
    state.examLocked = true;
    renderExam();
  } catch (error) {
    state.examFeedback = { ok: false, message: error.message };
    state.examLocked = true;
    state.examAnswers.push({ id: item.id, title: item.title, ok: false });
    renderExam();
  }
}

function nextExam() {
  state.examIndex += 1;
  state.examLocked = false;
  state.examFeedback = null;
  renderExam();
}

function renderExamResult() {
  const total = COURSE.exam.length;
  saveBest(state.examScore);
  const percent = Math.round((state.examScore / total) * 100);
  let line = "خوب پیش رفتی. هر سوالی که غلط شد را در درس همان بخش یک بار دیگر بنویس.";
  if (percent >= 80) line = "آفرین نیایش. این آزمون را خوب نوشتی.";
  if (percent < 50) line = "اشکال ندارد. برگرد سر درس‌ها و وقتی آماده شدی دوباره امتحان بده.";
  const misses = state.examAnswers.filter((item) => !item.ok).map((item) =>
    '<div class="miss">' + escapeHtml(item.title) + "</div>"
  ).join("");
  state.view = "result";
  topMeta.textContent = "نتیجه آزمون";
  app.innerHTML = '<section class="hero"><h1>نمره آزمون</h1><div class="score">' +
    state.examScore + " از " + total + "</div><p>" + line + "</p>" +
    (misses ? "<h2>این‌ها را دوباره ببین</h2>" + misses : "<p>همه را درست نوشتی.</p>") +
    '<div class="actions"><button class="go" type="button" data-act="exam">آزمون دوباره</button>' +
    '<button class="ghost" type="button" data-act="home">برگشت به درس‌ها</button></div></section>';
  paintChrome();
}

function openPlay(kind) {
  state.view = "play";
  state.playKind = kind || "html";
  renderPlay();
}

function renderPlay() {
  const titles = { html: "زمین بازی HTML", css: "زمین بازی CSS", python: "زمین بازی Python", sql: "زمین بازی SQL" };
  topMeta.textContent = "آزاد بنویس";
  const code = drafts[draftKey()] || "";
  const preview = state.playKind === "html" || state.playKind === "css"
    ? '<iframe class="preview" id="preview" title="پیش‌نمایش" sandbox="allow-scripts"></iframe>' : "";
  const kinds = ["html", "css", "python", "sql"].map((kind) =>
    '<button class="' + (kind === state.playKind ? "go" : "ghost") + '" type="button" data-act="play-kind" data-kind="' +
    kind + '">' + kind + "</button>"
  ).join("");
  app.innerHTML = '<section class="panel"><h2>' + titles[state.playKind] + "</h2>" +
    "<p>این‌جا نمره ندارد. هر چه بنویسی اجرا می‌شود تا ببینی چه شکلی می‌شود.</p>" +
    '<div class="row">' + kinds + "</div>" +
    (state.playKind === "sql" ? schemaBlock() : "") +
    '<textarea id="code" spellcheck="false">' + escapeHtml(code) + "</textarea>" +
    '<div class="row"><button class="go" type="button" data-act="run">اجرا</button>' +
    '<button class="ghost" type="button" data-act="home">برگشت</button></div>' +
    preview + '<div id="result" class="result" hidden></div></section>';
  paintChrome();
}

async function runPlay() {
  const code = document.getElementById("code").value;
  const fake = {
    kind: state.playKind,
    fixture: "<div class=\"t\">نیایش</div><div class=\"box\"></div><div class=\"card\"></div>",
    styles: [],
    rules: [],
    expect: "\u0000never\u0000",
    expectRows: null
  };
  paintResult({ ok: false, message: "در حال اجرا..." }, false);
  try {
    if (state.playKind === "html") {
      showHtmlPreview(code);
      paintResult({ ok: true, message: "پیش‌نمایش ساخته شد." }, true);
      return;
    }
    if (state.playKind === "css") {
      showCssPreview(code, fake.fixture);
      paintResult({ ok: true, message: "پیش‌نمایش ساخته شد." }, true);
      return;
    }
    if (state.playKind === "python") {
      const result = await gradePython({ expect: "" }, code);
      const text = result.message.split("\n\nباید این می‌شد:")[0].replace(/^خروجی این شد:\n/, "").replace(/^درست بود\.\nخروجی:\n/, "");
      paintResult({ ok: !result.message.startsWith("Python") && !result.message.startsWith("برنامه خیلی"), message: text || result.message }, true);
      return;
    }
    const SQL = await loadSql();
    const db = new SQL.Database();
    try {
      db.exec(COURSE.seed);
      const out = db.exec(code);
      if (!out.length) {
        paintResult({ ok: true, message: "اجرا شد. این دستور ردیفی برنگرداند." }, true);
        return;
      }
      const last = out[out.length - 1];
      paintResult({ ok: true, message: "نتیجه:", columns: last.columns, rows: last.values }, true);
    } finally {
      db.close();
    }
  } catch (error) {
    paintResult({ ok: false, message: error.message }, true);
  }
}

showHome();
