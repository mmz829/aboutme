(() => {
  const data = SITE_DATA;
  const themeBtn = document.getElementById("theme-btn");
  const applyTheme = (theme) => {
    const dark = theme !== "light";
    document.documentElement.dataset.theme = dark ? "rose" : "light";
    themeBtn.setAttribute("aria-checked", dark ? "true" : "false");
    themeBtn.setAttribute("aria-label", dark ? "ライトテーマに切り替え" : "ダークテーマに切り替え");
  };
  applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GAUGE_LEN = 16;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const cm = (s) => `<span class="c-comment">${esc(s)}</span>`;
  const kw = (s) => `<span class="c-kw">${s}</span>`;

  // README.md
  const aa = [
    "╲⠀╲ ⋆⠀╲         ╲",
    "   ╲⠀╲     ☾⋆.˚ ⠀ ╲ ⋆｡",
    "      ☆⠀ ╲⠀⠀ ⊹   ⠀.   ☆",
    "          ∧＿∧    ⊹ ⠀⠀ ★",
    "         ( ･ω･)ﾉ  < hello, world!",
    "         (つ  /",
    "          しーＪ",
  ];
  const readme = [
    `<span class="c-h1"><span class="c-mark"># </span>aboutme</span>`,
    "",
    `<span class="c-text">はじめまして！</span>`,
    `<span class="c-text">見に来てくださってありがとうございます。</span>`,
    "",
    ...aa.map((l) => {
      const html = esc(l)
        .replace(/[☆★⋆⊹☾˚｡.]+/g, (m) => `<span class="aa-star">${m}</span>`)
        .replace(/╲/g, `<span class="aa-tail">╲</span>`)        .replace(/&lt; hello, world!/, (m) => `<span class="aa-say">${m}</span>`);
      return `<span class="c-aa">${html}</span>`;
    }),
    "",
    `<span id="typing"></span><span class="cursor">▍</span>`,
  ];

  // profile.json
  const safeUrl = (value) => {
    try {
      const u = new URL(String(value || "").trim());
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
    } catch {
      return "";
    }
  };
  const playSvg = `<svg class="track-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M4.4 3.4v9.2l7.2-4.6z"/></svg>`;
  const pauseSvg = `<svg class="track-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M4.6 3.4h2.2v9.2H4.6zM9.2 3.4h2.2v9.2H9.2z"/></svg>`;
  const speakerSvg = (mode) => {
    const body = `<path fill="currentColor" d="M1.6 6.15h2.35L7.7 3.15v9.7L3.95 9.85H1.6z"/>`;
    const low = `<path fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" d="M9.5 6.35a2.3 2.3 0 010 3.3"/>`;
    const high = `<path fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" d="M11.35 4.55a4.7 4.7 0 010 6.9"/>`;
    const mute = `<path fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" d="M10 6.15l3.7 3.7M13.7 6.15L10 9.85"/>`;
    const waves = mode === "mute" ? mute : mode === "low" ? low : `${low}${high}`;
    return `<svg viewBox="0 0 16 16" aria-hidden="true">${body}${waves}</svg>`;
  };
  const { comment, ...fields } = data.profile;
  const profile = Object.entries(fields).flatMap(([k, v]) => {
    if (k === "song") {
      const src = v && safeUrl(v.src);
      if (!src) return [];
      const label = `${v.artist || ""} - ${v.title || ""}`.trim();
      const start = Math.max(0, Number(v.start) || 0);
      return [`<div class="track" data-title="${esc(label)}" data-src="${esc(src)}" data-start="${start}"><div class="pf-row pf-song"><span class="pf-key">${esc(k)}</span><span class="pf-val"><button type="button" class="track-btn">${playSvg}</button><span class="track-name">${esc(label)}</span></span></div><div class="track-panel"><div class="track-panel-inner"><div class="track-controls"><span class="track-time">0:00</span><div class="track-bar"><span class="track-bar-fill"></span></div><span class="track-dur">0:00</span><span class="track-vol"><button type="button" class="track-mute" aria-label="ミュート">${speakerSvg("high")}</button><input class="track-volume" type="range" min="0" max="1" step="0.05" value="0.2" aria-label="音量" style="--vol:20%"></span></div></div></div></div>`];
    }
    const val = esc(Array.isArray(v) ? v.join(k === "likes" ? ", " : " / ") : v);
    return [`<div class="pf-row"><span class="pf-key">${esc(k)}</span><span class="pf-val">${val}</span></div>`];
  });
  if (comment) profile.push("", cm(`// ${comment}`));

  // skill.ts
  const nameWidth = Math.max(...data.skills.flatMap((c) => c.items.map((s) => s.name.length)));
  const skill = [
    `${kw("export const")} skills = {`,
    ...data.skills.flatMap((cat) => [
      `  ${cm(`// ${cat.category}`)}`,
      ...cat.items.map((s) =>
        `  <span class="c-skill">${esc(s.name)}</span>:${" ".repeat(nameWidth - s.name.length + 1)}<span class="gauge" data-level="${Number(s.level)}"></span> <span class="c-num pct">0</span>,`),
    ]),
    "};",
  ];

  // career.log
  const career = data.career.map((c, i) => {
    const { 使用技術など: tech = "", 担当業務: work = "" } = c.details;
    const tags = tech.split(", ").filter(Boolean).map((t) => `<li>${esc(t)}</li>`).join("");
    const dateHtml = esc(c.date).replace(
      /^(\S+)\s+-\s+(\S+)$/,
      '<span>$1</span><span class="tl-sep"> - </span><span class="tl-gap" aria-hidden="true">x</span><span>$2</span>',
    );
    return `<div class="tl-item${i === 0 ? " latest" : ""}">
      <p class="tl-date">${dateHtml}</p>
      <h3 class="tl-title">${esc(c.title)}</h3>
      ${work ? `<p class="tl-work">${esc(work.split(", ").join(" / "))}</p>` : ""}
      ${tags ? `<ul class="tl-tags">${tags}</ul>` : ""}
    </div>`;
  });

  const works = [`<div class="work-grid">${data.works.map((w, i) => {
    const year = w.year ? `<span class="work-year">${esc(w.year)}</span>` : "";
    const mark = w.wip ? `<span class="cursor">▍</span> ` : "";
    const inner = `<span class="work-preview" aria-hidden="true"></span><span class="work-head"><span class="work-title">${mark}${esc(w.title)}</span>${year}</span>`;
    return w.wip
      ? `<div class="work-slot is-wip">${inner}</div>`
      : `<button type="button" class="work-slot" data-work="${i}" aria-haspopup="dialog">${inner}</button>`;
  }).join("")}</div>`];

  const files = [
    { id: "top", name: "README.md", icon: "M↓", lines: readme },
    { id: "profile", name: "profile.json", icon: "{}", lines: profile },
    { id: "skill", name: "skill.ts", icon: "TS", lines: skill },
    { id: "career", name: "career.log", icon: "≡", lines: career },
    { id: "works", name: "works.py", icon: "py", lines: works },
  ];

  const titles = { profile: ["//", "PROFILE", "わたしについて"], skill: ["//", "SKILL", "できること"], career: ["//", "CAREER", "これまでのこと"], works: ["//", "WORKS", "つくったもの"] };
  files.forEach((f) => {
    const t = titles[f.id];
    if (!t) return;
    f.lines.unshift(
      `<span class="c-title"><span class="c-mark">${t[0]} </span>${t[1]}</span> ${cm(t[2])}`,
      "",
    );
  });

  document.getElementById("files").innerHTML = files.map((f) => `
    <section class="file" id="${f.id}">
      ${f.lines.map((l, n) => `<div class="line"><span class="ln">${n + 1}</span><span class="lc">${l}</span></div>`).join("")}    </section>`).join("");

  const link = (f, cls) => `<a href="#${f.id}" class="${cls}" data-id="${f.id}"><span class="icon">${f.icon}</span>${f.name}</a>`;
  document.getElementById("tree").innerHTML = files.map((f) => `<li>${link(f, "")}</li>`).join("");
  document.getElementById("tabs").innerHTML = files.map((f) => link(f, "tab")).join("");

  const workModal = document.getElementById("work-modal");
  const workModalPanel = workModal.querySelector(".work-modal-panel");
  const workModalTitle = document.getElementById("work-modal-title");
  const workModalYear = document.getElementById("work-modal-year");
  const workModalNote = document.getElementById("work-modal-note");
  const workModalTags = document.getElementById("work-modal-tags");
  const workModalPreview = document.getElementById("work-modal-preview");
  const workModalClose = document.getElementById("work-modal-close");
  let workModalReturn = null;
  const closeWork = () => {
    if (workModal.hidden) return;
    workModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (workModalReturn) workModalReturn.focus();
  };
  const openWork = (index) => {
    const w = data.works[index];
    if (!w) return;
    workModalTitle.textContent = w.title;
    workModalYear.textContent = w.year || "";
    workModalYear.hidden = !w.year;
    workModalNote.textContent = w.note ? `// ${w.note}` : "";
    workModalNote.hidden = !w.note;
    const tags = Array.isArray(w.tags) ? w.tags : [];
    workModalTags.innerHTML = tags.map((t) => `<li>${esc(t)}</li>`).join("");
    workModalTags.hidden = tags.length === 0;
    workModalPreview.classList.toggle("is-wip", !!w.wip);
    workModalReturn = document.activeElement;
    workModal.hidden = false;
    document.body.classList.add("modal-open");
    workModalClose.focus();
  };
  document.querySelectorAll("[data-work]").forEach((btn) => {
    btn.addEventListener("click", () => openWork(Number(btn.dataset.work)));
  });
  workModalClose.addEventListener("click", closeWork);
  document.getElementById("work-modal-backdrop").addEventListener("click", closeWork);
  document.addEventListener("keydown", (e) => {
    if (workModal.hidden) return;
    if (e.key === "Escape") closeWork();
    if (e.key !== "Tab") return;
    const items = [...workModalPanel.querySelectorAll("button, a[href]")];
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // active file
  const statusFile = document.getElementById("status-file");
  const setActive = (id) => {
    document.querySelectorAll("[data-id]").forEach((a) => a.classList.toggle("active", a.dataset.id === id));
    statusFile.textContent = files.find((f) => f.id === id).name;
  };
  let lockedId = null;
  const updateActive = () => {
    if (lockedId) return;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let current = files[0].id;
    if (atBottom) {
      current = files[files.length - 1].id;
    } else {
      files.forEach((f) => {
        if (document.getElementById(f.id).getBoundingClientRect().top <= window.innerHeight * 0.4) current = f.id;
      });
    }
    setActive(current);
  };
  window.addEventListener("scroll", updateActive, { passive: true });

  const toTop = document.getElementById("to-top");
  const syncToTop = () => {
    const on = window.scrollY > 280;
    toTop.classList.toggle("is-on", on);
    toTop.toggleAttribute("inert", !on);
  };
  window.addEventListener("scroll", syncToTop, { passive: true });
  syncToTop();
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  const sidebarBtn = document.getElementById("sidebar-btn");
  const sidebar = document.getElementById("sidebar");
  const sidebarMq = window.matchMedia("(max-width: 640px)");
  const setSidebar = (open) => {
    const show = open && sidebarMq.matches;
    document.body.classList.toggle("sidebar-open", show);
    sidebarBtn.setAttribute("aria-expanded", show ? "true" : "false");
    sidebarBtn.setAttribute("aria-label", show ? "ファイル一覧を閉じる" : "ファイル一覧を開く");
    if (sidebarMq.matches) sidebar.toggleAttribute("inert", !show);
    else sidebar.removeAttribute("inert");
  };
  sidebarBtn.addEventListener("click", () => setSidebar(!document.body.classList.contains("sidebar-open")));
  document.getElementById("sidebar-backdrop").addEventListener("click", () => setSidebar(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setSidebar(false); });
  sidebarMq.addEventListener("change", () => setSidebar(false));
  setSidebar(false);

  // smooth scroll can stop short of the last file, so trust the click until the user scrolls
  document.querySelectorAll("[data-id]").forEach((a) => a.addEventListener("click", () => {
    lockedId = a.dataset.id;
    setActive(lockedId);
    if (a.closest(".sidebar")) setSidebar(false);
    const release = () => { lockedId = null; };
    setTimeout(() => window.addEventListener("wheel", release, { once: true }), 0);
    setTimeout(() => window.addEventListener("touchmove", release, { once: true }), 0);
  }));

  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
  updateActive();

  // typing
  const typingEl = document.getElementById("typing");
  const parts = [
    ["c-comment", "↓ scroll to see more"],
  ];
  if (reduceMotion) {
    typingEl.innerHTML = parts.map(([c, t]) => `<span class="${c}">${esc(t)}</span>`).join("");
  } else {
    let p = 0, i = 0, current = null;
    const tick = () => {
      if (p >= parts.length) return;
      if (i === 0) {
        current = document.createElement("span");
        current.className = parts[p][0];
        typingEl.appendChild(current);
      }
      current.textContent += parts[p][1][i++];
      if (i >= parts[p][1].length) { p++; i = 0; }
      setTimeout(tick, 70 + Math.random() * 80);
    };
    setTimeout(tick, 600);
  }

  // song
  const track = document.querySelector(".track");
  const audio = new Audio();
  audio.preload = "none";
  audio.crossOrigin = "anonymous";
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");
  audio.style.cssText = "position:fixed;left:-9999px;width:1px;height:1px";
  document.body.appendChild(audio);
  let resume = false;
  let level = 0.2;
  audio.volume = level;
  let savedVol = level;
  let ctx = null;
  let gain = null;
  const volumeLocked = (() => {
    const before = audio.volume;
    audio.volume = before > 0.5 ? before - 0.1 : before + 0.1;
    const locked = audio.volume === before;
    audio.volume = before;
    return locked;
  })();
  const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const useGain = volumeLocked || isiOS;
  let armCue = false;
  const clock = (sec) => {
    if (!Number.isFinite(sec)) return "0:00";
    return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
  };
  const setTrackBtn = (playing) => {
    const btn = track.querySelector(".track-btn");
    btn.innerHTML = playing ? pauseSvg : playSvg;
    btn.setAttribute("aria-pressed", playing ? "true" : "false");
    btn.setAttribute("aria-label", `${track.dataset.title}を${playing ? "一時停止" : "再生"}`);
  };
  const paintProgress = () => {
    const duration = audio.duration;
    const ratio = duration ? audio.currentTime / duration : 0;
    track.querySelector(".track-bar-fill").style.width = `${ratio * 100}%`;
    track.querySelector(".track-time").textContent = clock(audio.currentTime);
    track.querySelector(".track-dur").textContent = clock(duration);
  };
  const applyLevel = () => {
    audio.muted = level === 0;
    if (!useGain) {
      audio.volume = level;
      return;
    }
    if (!gain) return;
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(level, now);
    gain.gain.value = level;
  };
  const ensureGraph = () => {
    if (!useGain || ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const next = new AC();
    const node = next.createGain();
    node.gain.value = level;
    next.createMediaElementSource(audio).connect(node).connect(next.destination);
    ctx = next;
    gain = node;
  };
  const resetTrack = () => {
    resume = false;
    armCue = false;
    audio.pause();
    track.classList.remove("is-playing");
    setTrackBtn(false);
    track.querySelector(".track-bar-fill").style.width = "0";
    track.querySelector(".track-time").textContent = "0:00";
    track.querySelector(".track-dur").textContent = "0:00";
    applyLevel();
  };
  const tryCue = () => {
    if (!armCue || audio.dataset.started !== "1") return;
    if (!Number.isFinite(audio.duration) || audio.duration === 0) return;
    const start = Number(track.dataset.start) || 0;
    armCue = false;
    if (start > 0 && audio.duration > start + 20 && audio.currentTime < 1) audio.currentTime = start;
    applyLevel();
  };
  audio.addEventListener("playing", () => {
    audio.dataset.started = "1";
    tryCue();
  });
  audio.addEventListener("durationchange", tryCue);
  audio.addEventListener("timeupdate", paintProgress);
  audio.addEventListener("ended", resetTrack);
  const playTrack = () => {
    const start = Number(track.dataset.start) || 0;
    track.classList.add("is-playing");
    setTrackBtn(true);
    if (audio.dataset.loaded !== track.dataset.src) {
      audio.dataset.started = "";
      audio.src = track.dataset.src;
      audio.dataset.loaded = track.dataset.src;
    }
    ensureGraph();
    if (ctx?.state === "suspended") ctx.resume();
    armCue = !resume && start > 0;
    const pending = audio.play();
    if (pending) pending.catch(() => resetTrack());
  };
  if (track) {
    setTrackBtn(false);
    track.querySelector(".track-btn").addEventListener("click", () => {
      if (track.classList.contains("is-playing")) {
        resume = true;
        armCue = false;
        audio.pause();
        applyLevel();
        track.classList.remove("is-playing");
        setTrackBtn(false);
        return;
      }
      playTrack();
    });
    track.querySelector(".track-bar").addEventListener("click", (e) => {
      if (!audio.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      audio.currentTime = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1) * audio.duration;
      resume = true;
      armCue = false;
      applyLevel();
      if (!track.classList.contains("is-playing")) playTrack();
      else paintProgress();
    });
    const volInput = track.querySelector(".track-volume");
    const muteBtn = track.querySelector(".track-mute");
    const paintVol = () => {
      volInput.value = String(level);
      volInput.style.setProperty("--vol", `${level * 100}%`);
      const mode = level === 0 ? "mute" : level < 0.45 ? "low" : "high";
      muteBtn.innerHTML = speakerSvg(mode);
      muteBtn.setAttribute("aria-pressed", level === 0 ? "true" : "false");
      muteBtn.setAttribute("aria-label", level === 0 ? "ミュート解除" : "ミュート");
    };
    const onVol = (e) => {
      level = Number(e.currentTarget.value);
      if (level > 0) savedVol = level;
      armCue = false;
      applyLevel();
      paintVol();
    };
    volInput.addEventListener("input", onVol);
    volInput.addEventListener("change", onVol);
    muteBtn.addEventListener("click", () => {
      if (level > 0) {
        savedVol = level;
        level = 0;
      } else {
        level = savedVol || 0.2;
      }
      armCue = false;
      applyLevel();
      paintVol();
    });
    paintVol();
  }

  // gauges
  const renderGauge = (el, value) => {
    const filled = Math.round((value / 100) * GAUGE_LEN);
    el.innerHTML = `[${"█".repeat(filled)}<span class="empty">${"╱".repeat(GAUGE_LEN - filled)}</span>]`;
    el.nextElementSibling.textContent = Math.round(value);
  };
  const gauges = document.querySelectorAll(".gauge");
  gauges.forEach((g) => renderGauge(g, 0));

  const animateGauge = (el, delay) => {
    const target = Number(el.dataset.level);
    if (reduceMotion) return renderGauge(el, target);
    setTimeout(() => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / 1200, 1);
        renderGauge(el, target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
  };

  const viewportHeight = () => window.visualViewport?.height || window.innerHeight;
  const inView = (el, inset = 0) => {
    const r = el.getBoundingClientRect();
    return r.bottom > inset && r.top < viewportHeight() - inset;
  };
  let gaugesStarted = false;
  const startGauges = () => {
    if (gaugesStarted || !inView(document.getElementById("skill"), 24)) return;
    gaugesStarted = true;
    gauges.forEach((g, i) => animateGauge(g, i * 100));
  };
  const revealCareer = () => {
    document.querySelectorAll(".tl-item.reveal:not(.shown)").forEach((el) => {
      if (inView(el, 20)) el.classList.add("shown");
    });
  };
  const checkInView = () => {
    startGauges();
    revealCareer();
  };

  if (reduceMotion) {
    gauges.forEach((g) => renderGauge(g, Number(g.dataset.level)));
  } else {
    document.querySelectorAll(".tl-item").forEach((el) => el.classList.add("reveal"));
    window.addEventListener("scroll", checkInView, { passive: true });
    window.addEventListener("resize", checkInView);
    window.visualViewport?.addEventListener("scroll", checkInView);
    window.visualViewport?.addEventListener("resize", checkInView);
    requestAnimationFrame(() => requestAnimationFrame(checkInView));
  }
})();
