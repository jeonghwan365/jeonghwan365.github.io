/*
 * data.js의 내용을 읽어 화면을 그립니다.
 * 내용을 바꾸려면 이 파일이 아니라 data.js를 고치세요.
 */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 도구 ---------- */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "text") node.textContent = v;
        else if (k === "class") node.className = v;
        else if (k === "style") node.setAttribute("style", v);
        else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function parseYM(s) {
    var p = String(s).split("-");
    return { y: parseInt(p[0], 10), m: parseInt(p[1], 10) };
  }
  function ymDiff(a, b) {
    var A = parseYM(a), B = parseYM(b);
    return (A.y - B.y) * 12 + (A.m - B.m);
  }
  function ymAdd(s, n) {
    var p = parseYM(s);
    var t = p.y * 12 + (p.m - 1) + n;
    return Math.floor(t / 12) + "-" + pad(t % 12 + 1);
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtYM(s) { var p = parseYM(s); return p.y + "." + pad(p.m); }

  var now = new Date();
  var todayYM = now.getFullYear() + "-" + pad(now.getMonth() + 1);
  var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  function isFuture(ym) { return ymDiff(ym, todayYM) > 0; }

  function fmtPeriod(item) {
    if (!item.end || item.end === item.start) return fmtYM(item.start);
    if (isFuture(item.end)) return fmtYM(item.start) + " – 현재";
    var a = parseYM(item.start), b = parseYM(item.end);
    var tail = a.y === b.y ? pad(b.m) : fmtYM(item.end);
    return fmtYM(item.start) + " – " + tail;
  }

  var trackById = {};
  D.tracks.forEach(function (t) { trackById[t.id] = t; });

  function colorVar(item) {
    return item.track ? "var(--t-" + item.track + ")" : "var(--muted)";
  }
  function trackLabel(item) {
    return item.track ? trackById[item.track].label : "이정표";
  }

  var items = D.items.slice().sort(function (a, b) {
    return ymDiff(a.start, b.start);
  });
  var itemById = {};
  items.forEach(function (it) { itemById[it.id] = it; });

  /* ---------- 초안 안내 ---------- */

  function countTodos() {
    var n = 0;
    if (!D.profile.intro && D.profile.introTodo) n++;
    (D.profile.links || []).forEach(function (l) { if (!l.href && l.todo) n++; });
    items.forEach(function (it) { if (it.todo) n++; });
    return n;
  }

  function renderDraftBanner() {
    var n = countTodos();
    var banner = document.getElementById("draft-banner");
    if (!n) return;
    banner.textContent = "초안입니다. 작성 필요 항목이 " + n + "개 남아 있습니다. data.js의 todo를 채우면 이 안내가 사라집니다.";
    banner.hidden = false;
  }

  function todoBox(text) {
    return el("div", { class: "todo" }, [el("strong", { text: "작성 필요" }), " " + text]);
  }

  /* ---------- 머리 ---------- */

  function renderProfile() {
    var P = D.profile;
    document.title = P.name + " | " + P.role;
    document.getElementById("profile-name").textContent = P.name;
    document.getElementById("profile-role").textContent = P.role;

    var intro = document.getElementById("profile-intro");
    if (P.intro) intro.appendChild(el("p", { text: P.intro }));
    else if (P.introTodo) intro.appendChild(todoBox(P.introTodo));

    var facts = document.getElementById("profile-facts");
    (P.facts || []).forEach(function (f) {
      facts.appendChild(el("dt", { text: f.label }));
      facts.appendChild(el("dd", { text: f.value }));
    });

    var links = document.getElementById("profile-links");
    (P.links || []).forEach(function (l) {
      if (l.href) {
        var external = /^https?:/.test(l.href);
        links.appendChild(el("li", null, [
          el("a", { href: l.href, target: external ? "_blank" : null, rel: external ? "noopener" : null, text: l.label })
        ]));
      } else if (l.todo) {
        links.appendChild(el("li", null, [
          l.label + " ",
          el("span", { class: "todo-inline", text: "작성 필요: " + l.todo })
        ]));
      }
    });
  }

  /* ---------- 범례(트랙별로 보기) ---------- */

  var focusTrack = null;

  function renderLegend() {
    var legend = document.getElementById("legend");
    D.tracks.forEach(function (t) {
      legend.appendChild(el("button", {
        type: "button",
        "data-track": t.id,
        "aria-pressed": "false",
        style: "--c: var(--t-" + t.id + ")",
        onclick: function () { setFocus(focusTrack === t.id ? null : t.id); }
      }, [el("span", { class: "swatch", "aria-hidden": "true" }), t.label + "만 보기"]));
    });
  }

  function setFocus(trackId) {
    focusTrack = trackId;
    document.querySelectorAll("#legend button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-track") === trackId));
    });
    document.querySelectorAll(".tl-item").forEach(function (n) {
      var t = n.getAttribute("data-track");
      n.classList.toggle("is-dimmed", !!trackId && t !== trackId);
    });
    document.querySelectorAll(".rec").forEach(function (n) {
      var t = n.getAttribute("data-track");
      n.hidden = !!trackId && t !== trackId;
    });
  }

  /* ---------- 타임라인 ---------- */

  var tl = document.getElementById("tl");
  var range = {
    start: D.timeline.start,
    end: ymDiff(D.timeline.end, ymAdd(todayYM, 2)) >= 0 ? D.timeline.end : ymAdd(todayYM, 2)
  };
  var months = ymDiff(range.end, range.start) + 1;
  var todayPos = ymDiff(todayYM, range.start) + (now.getDate() - 1) / daysInMonth;

  var trackCells = {};
  var overlay, markerCell, axisCell;
  var firstLayout = true;

  var measureCtx = document.createElement("canvas").getContext("2d");
  function textWidth(text, weight) {
    measureCtx.font = (weight || 500) + " 12px 'IBM Plex Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
    return Math.ceil(measureCtx.measureText(text).width);
  }

  function buildTimeline() {
    tl.style.setProperty("--months", months);

    tl.appendChild(el("div", { class: "tl-label is-head", "aria-hidden": "true" }));
    markerCell = el("div", { class: "tl-cell tl-markers" });
    tl.appendChild(markerCell);

    tl.appendChild(el("div", { class: "tl-label is-head", "aria-hidden": "true" }));
    axisCell = el("div", { class: "tl-cell tl-axis", "aria-hidden": "true" });
    tl.appendChild(axisCell);

    D.tracks.forEach(function (t, i) {
      if (i > 0) tl.appendChild(el("div", { class: "tl-row-sep", "aria-hidden": "true" }));
      /* '학업·어학'처럼 가운뎃점이 있으면 좁은 화면에서 그 자리에서 줄을 바꿉니다 */
      var labelText = el("span");
      t.label.split("·").forEach(function (part, j, arr) {
        labelText.appendChild(el("span", { class: "tl-label-part", text: part + (j < arr.length - 1 ? "·" : "") }));
      });
      tl.appendChild(el("div", { class: "tl-label", style: "--c: var(--t-" + t.id + ")" }, [
        el("span", { class: "swatch", "aria-hidden": "true" }), labelText
      ]));
      var cell = el("div", { class: "tl-cell tl-track", "data-track": t.id });
      trackCells[t.id] = cell;
      tl.appendChild(cell);
    });

    overlay = el("div", { class: "tl-overlay", "aria-hidden": "true" });
    tl.appendChild(overlay);
  }

  function layoutTimeline() {
    var labelEl = tl.querySelector(".tl-label");
    var labelW = labelEl ? labelEl.offsetWidth : 112;
    var chartW = tl.clientWidth - labelW;
    if (chartW <= 0) return;
    var mw = chartW / months;

    overlay.innerHTML = "";
    axisCell.innerHTML = "";
    markerCell.innerHTML = "";
    Object.keys(trackCells).forEach(function (k) { trackCells[k].innerHTML = ""; });

    /* 격자와 축 */
    for (var i = 0; i <= months; i++) {
      var ym = ymAdd(range.start, i);
      var m = parseYM(ym).m;
      if (i < months) {
        if (m % 3 === 1) {
          overlay.appendChild(el("div", { class: "tl-gridline" + (m === 1 ? " is-year" : ""), style: "left:" + (i * mw) + "px" }));
        }
        if (m === 1 || i === 0) {
          axisCell.appendChild(el("span", { class: "tl-year", style: "left:" + (i * mw) + "px", text: String(parseYM(ym).y) }));
        } else if (m % 3 === 1) {
          axisCell.appendChild(el("span", { class: "tl-month", style: "left:" + ((i + 0.5) * mw) + "px", text: m + "월" }));
        }
      }
    }

    /* 오늘 이후는 빗금 */
    if (todayPos > 0 && todayPos < months) {
      overlay.appendChild(el("div", { class: "tl-future", style: "left:" + (todayPos * mw) + "px" }));
    }

    /* 세로 표식: 이정표(전역 등), 졸업 예정, 오늘 */
    items.filter(function (it) { return it.kind === "milestone"; }).forEach(function (it) {
      var x = (ymDiff(it.start, range.start) + 0.5) * mw;
      overlay.appendChild(el("div", { class: "tl-vline", style: "left:" + x + "px" }));
      markerCell.appendChild(el("button", {
        type: "button",
        class: "tl-chip",
        style: "left:" + x + "px",
        "aria-label": it.title + ", " + fmtPeriod(it) + ". 기록 보기",
        onclick: function () { openRecord(it.id, true); },
        text: it.short
      }));
    });

    var grad = D.timeline.graduation;
    if (grad) {
      var gx = (ymDiff(grad.date, range.start) + 0.5) * mw;
      overlay.appendChild(el("div", { class: "tl-vline is-planned", style: "left:" + gx + "px" }));
      markerCell.appendChild(el("span", { class: "tl-chip is-planned", style: "left:" + gx + "px", text: grad.label }));
    }

    if (todayPos > 0 && todayPos < months) {
      var tx = todayPos * mw;
      overlay.appendChild(el("div", { class: "tl-vline is-today", style: "left:" + tx + "px" }));
      markerCell.appendChild(el("span", { class: "tl-chip is-today", style: "left:" + tx + "px", text: "오늘" }));
    }

    /* 가장자리 표식이 차트 밖으로 잘리지 않게 안쪽으로 밀어 넣습니다 */
    markerCell.querySelectorAll(".tl-chip").forEach(function (chip) {
      var x = parseFloat(chip.style.left);
      var half = chip.offsetWidth / 2;
      var edge = 4;
      if (x - half < edge) chip.style.left = (edge + half) + "px";
      else if (x + half > chartW - edge) chip.style.left = (chartW - edge - half) + "px";
    });

    /* 트랙별 항목 배치: 겹치면 아래 줄로 내립니다 */
    var laneH = parseFloat(getComputedStyle(tl).getPropertyValue("--lane-h")) || 30;
    var GAP = 10;
    var order = 0;

    D.tracks.forEach(function (t) {
      var lanes = [];
      var trackItems = items.filter(function (it) { return it.track === t.id && it.kind !== "milestone"; });

      trackItems.forEach(function (it) {
        var startIdx = ymDiff(it.start, range.start);
        var weight = it.featured ? 700 : 500;
        var lw = textWidth(it.short, it.kind === "period" ? 600 : weight);
        var node, extStart, extEnd, left;

        if (it.kind === "period") {
          var endIdx = ymDiff(it.end || it.start, range.start);
          var x0 = startIdx * mw + 1;
          var x1 = (endIdx + 1) * mw - 1;
          var w = Math.max(6, x1 - x0);
          var inside = lw + 16 <= w;
          left = x0;
          extStart = x0;
          extEnd = inside ? x1 : x0 + w + 8 + lw;

          var bar = el("span", { class: "tl-bar", style: "width:" + w + "px" });
          var cut = todayPos * mw - x0;
          if (cut > 0 && cut < w) bar.appendChild(el("span", { class: "planned", style: "left:" + cut + "px" }));

          node = el("button", {
            type: "button",
            class: "tl-item is-period" + (it.featured ? " is-featured" : "") + (inside ? "" : " label-out"),
            "data-track": t.id
          }, [
            bar,
            el("span", { class: "tl-text", style: inside ? "padding-left:8px; width:" + w + "px" : "padding-left:" + (w + 6) + "px", text: it.short })
          ]);
        } else {
          var ds = it.featured ? 13 : 10;
          var cx = (startIdx + 0.5) * mw;
          left = cx - ds / 2;
          extStart = cx - ds;
          extEnd = left + ds + 8 + lw;
          node = el("button", {
            type: "button",
            class: "tl-item is-point" + (it.featured ? " is-featured" : ""),
            "data-track": t.id
          }, [
            el("span", { class: "tl-diamond", "aria-hidden": "true" }),
            el("span", { class: "tl-label-text", text: it.short })
          ]);
        }

        var lane = 0;
        while (lane < lanes.length && lanes[lane] + GAP > extStart) lane++;
        lanes[lane] = extEnd;

        node.style.left = left + "px";
        node.style.top = (6 + lane * laneH + (laneH - 22) / 2) + "px";
        node.style.setProperty("--c", colorVar(it));
        node.style.setProperty("--d", (order++ * 0.06) + "s");
        node.setAttribute("aria-label", it.title + ", " + fmtPeriod(it) + ". 기록 보기");
        node.addEventListener("click", function () { openRecord(it.id, true); });
        trackCells[t.id].appendChild(node);
      });

      trackCells[t.id].style.height = (12 + Math.max(1, lanes.length) * laneH) + "px";
    });

    if (focusTrack) setFocus(focusTrack);

    if (firstLayout) {
      firstLayout = false;
      if (!reduceMotion) {
        tl.classList.add("is-entering");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { tl.classList.remove("is-entering"); });
        });
      }
    }
  }

  /* ---------- 기록 ---------- */

  function renderLedger() {
    var ledger = document.getElementById("ledger");
    items.forEach(function (it) {
      var bodyId = "rec-body-" + it.id;
      var headId = "rec-head-" + it.id;

      var head = el("button", {
        type: "button",
        class: "rec-head",
        id: headId,
        "aria-expanded": "false",
        "aria-controls": bodyId,
        onclick: function () { toggleRecord(it.id); }
      }, [
        el("span", { class: "rec-date", text: fmtPeriod(it) }),
        el("span", { class: "rec-title" }, [
          it.title,
          it.featured ? el("span", { class: "rec-badge", text: "대표 경험" }) : null
        ]),
        el("span", { class: "rec-track" }, [el("span", { class: "swatch", "aria-hidden": "true" }), trackLabel(it)]),
        el("span", { class: "rec-chev", "aria-hidden": "true" })
      ]);

      var body = el("div", { class: "rec-body", id: bodyId, role: "region", "aria-labelledby": headId, hidden: true });

      var meta = el("dl", { class: "rec-meta" });
      meta.appendChild(el("dt", { text: "시기" }));
      meta.appendChild(el("dd", { text: fmtPeriod(it) }));
      (it.meta || []).forEach(function (m) {
        meta.appendChild(el("dt", { text: m.label }));
        meta.appendChild(el("dd", { text: m.value }));
      });
      body.appendChild(meta);

      (it.summary || []).forEach(function (s) { body.appendChild(el("p", { text: s })); });

      if (it.role && it.role.length) {
        body.appendChild(el("h3", { text: "내가 한 일" }));
        body.appendChild(el("ul", null, it.role.map(function (r) { return el("li", { text: r }); })));
      }

      if (it.todo) body.appendChild(todoBox(it.todo));

      if (it.document) body.appendChild(renderDocument(it.document));

      var li = el("li", {
        class: "rec" + (it.featured ? " is-featured" : ""),
        id: it.id,
        "data-track": it.track || "",
        style: "--c: " + colorVar(it)
      }, [head, body]);
      ledger.appendChild(li);
    });
  }

  function renderDocument(doc) {
    var wrap = el("div");
    var panel = el("div", { class: "doc-panel", hidden: true });
    var loaded = false;

    var btn = el("button", {
      type: "button",
      class: "doc-toggle",
      "aria-expanded": "false",
      onclick: function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        btn.textContent = doc.label + (open ? " 접기" : " 펼치기");
        panel.hidden = !open;
        if (open && !loaded) { loaded = true; loadDocument(doc, panel); }
      },
      text: doc.label + " 펼치기"
    });

    wrap.appendChild(btn);
    wrap.appendChild(panel);
    return wrap;
  }

  function loadDocument(doc, panel) {
    function showMissing() {
      panel.appendChild(todoBox("원문 파일이 아직 없습니다. " + doc.file + " 위치에 파일을 넣으면 여기에 표시됩니다."));
    }
    function showFrame() {
      panel.appendChild(el("iframe", { class: "doc-frame", src: doc.file, title: doc.label, loading: "lazy" }));
      panel.appendChild(el("p", { class: "doc-links" }, [
        el("a", { href: doc.file, target: "_blank", rel: "noopener", text: "새 탭에서 열기" })
      ]));
    }
    if (!window.fetch || location.protocol === "file:") {
      showFrame();
      return;
    }
    fetch(doc.file, { method: "HEAD" }).then(function (r) {
      if (r.ok) showFrame(); else showMissing();
    }).catch(showMissing);
  }

  function setExpanded(id, open) {
    var head = document.getElementById("rec-head-" + id);
    var body = document.getElementById("rec-body-" + id);
    if (!head || !body) return;
    head.setAttribute("aria-expanded", String(open));
    body.hidden = !open;
  }

  function toggleRecord(id) {
    var head = document.getElementById("rec-head-" + id);
    setExpanded(id, head.getAttribute("aria-expanded") !== "true");
  }

  function openRecord(id, scroll) {
    var li = document.getElementById(id);
    if (!li) return;
    if (li.hidden) setFocus(null);
    setExpanded(id, true);
    if (scroll) li.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    li.classList.remove("is-flash");
    void li.offsetWidth;
    li.classList.add("is-flash");
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  }

  /* ---------- 바닥 ---------- */

  function renderFooter() {
    var f = document.getElementById("footer");
    if (D.footer && D.footer.note) {
      f.appendChild(el("p", null, [
        D.footer.note + " ",
        D.footer.repo ? el("a", { href: D.footer.repo, target: "_blank", rel: "noopener", text: "저장소 보기" }) : null
      ]));
    }
    if (D.updated) {
      var u = parseYM(D.updated);
      f.appendChild(el("p", { text: "마지막 수정 " + u.y + "년 " + u.m + "월" }));
    }
  }

  /* ---------- 시작 ---------- */

  renderDraftBanner();
  renderProfile();
  renderLegend();
  buildTimeline();
  renderLedger();
  renderFooter();

  /* 글꼴이 준비된 뒤 배치해야 글자 폭 계산이 맞습니다 (최대 0.8초 대기) */
  var started = false;
  function firstRender() {
    if (started) return;
    started = true;
    layoutTimeline();
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(firstRender);
    setTimeout(firstRender, 800);
  } else {
    firstRender();
  }

  var pending = false;
  function onResize() {
    if (!started || pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; layoutTimeline(); });
  }
  if (window.ResizeObserver) new ResizeObserver(onResize).observe(document.getElementById("tl-scroll"));
  else window.addEventListener("resize", onResize);

  if (location.hash.length > 1) {
    var id = decodeURIComponent(location.hash.slice(1));
    if (itemById[id]) openRecord(id, true);
  }
})();
