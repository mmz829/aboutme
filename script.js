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
  const key = (s) => `<span class="c-key">${esc(s)}</span>`;
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
    `<span class="c-h1"><span class="c-mark"># </span>${esc(data.profile.name)}</span>`,
    "",
    `<span class="c-text">はじめまして、${esc(data.profile.name)}です。</span>`,
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
      return [`<div class="track" data-title="${esc(label)}" data-src="${esc(src)}" data-start="${start}"><div class="pf-row pf-song"><span class="pf-key">${esc(k)}</span><span class="pf-val"><button type="button" class="track-btn">${playSvg}</button><span class="track-name">${esc(label)}</span></span></div><div class="track-panel"><div class="track-panel-inner"><div class="track-controls"><span class="track-time">0:00</span><div class="track-bar"><span class="track-bar-fill"></span></div><span class="track-dur">0:00</span><span class="track-vol"><button type="button" class="track-mute" aria-label="ミュート">${speakerSvg("high")}</button><input class="track-volume" type="range" min="0" max="1" step="0.05" value="0.3" aria-label="音量" style="--vol:30%"></span></div></div></div></div>`];
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
    return `<div class="tl-item${i === 0 ? " latest" : ""}">
      <p class="tl-date">${esc(c.date)}</p>
      <h3 class="tl-title">${esc(c.title)}</h3>
      ${work ? `<p class="tl-work">${esc(work.split(", ").join(" / "))}</p>` : ""}
      ${tags ? `<ul class="tl-tags">${tags}</ul>` : ""}
    </div>`;
  });

  const files = [
    { id: "top", name: "README.md", icon: "M↓", lines: readme },
    { id: "profile", name: "profile.json", icon: "{}", lines: profile },
    { id: "skill", name: "skill.ts", icon: "TS", lines: skill },
    { id: "career", name: "career.log", icon: "≡", lines: career },
  ];

  const titles = { profile: ["//", "PROFILE", "わたしについて"], skill: ["//", "SKILL", "できること"], career: ["//", "CAREER", "これまでのこと"] };
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

  // smooth scroll can stop short of the last file, so trust the click until the user scrolls
  document.querySelectorAll("[data-id]").forEach((a) => a.addEventListener("click", () => {
    lockedId = a.dataset.id;
    setActive(lockedId);
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
  audio.volume = 0.3;
  let resume = false;
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
  const resetTrack = () => {
    resume = false;
    track.classList.remove("is-playing");
    setTrackBtn(false);
    track.querySelector(".track-bar-fill").style.width = "0";
    track.querySelector(".track-time").textContent = "0:00";
    track.querySelector(".track-dur").textContent = "0:00";
  };
  const cueStart = () => {
    const start = Number(track.dataset.start) || 0;
    if (!resume && start > 0 && audio.duration > start + 20) audio.currentTime = start;
  };
  audio.addEventListener("loadedmetadata", cueStart);
  audio.addEventListener("timeupdate", paintProgress);
  audio.addEventListener("ended", resetTrack);
  const playTrack = () => {
    track.classList.add("is-playing");
    setTrackBtn(true);
    if (audio.src !== track.dataset.src) audio.src = track.dataset.src;
    else cueStart();
    audio.play().catch(() => resetTrack());
  };
  if (track) {
    setTrackBtn(false);
    track.querySelector(".track-btn").addEventListener("click", () => {
      if (track.classList.contains("is-playing")) {
        resume = true;
        audio.pause();
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
      if (!track.classList.contains("is-playing")) playTrack();
      else paintProgress();
    });
    const volInput = track.querySelector(".track-volume");
    const muteBtn = track.querySelector(".track-mute");
    let savedVol = audio.volume;
    const paintVol = () => {
      const v = audio.volume;
      volInput.value = String(v);
      volInput.style.setProperty("--vol", `${v * 100}%`);
      const mode = v === 0 ? "mute" : v < 0.45 ? "low" : "high";
      muteBtn.innerHTML = speakerSvg(mode);
      muteBtn.setAttribute("aria-pressed", v === 0 ? "true" : "false");
      muteBtn.setAttribute("aria-label", v === 0 ? "ミュート解除" : "ミュート");
    };
    volInput.addEventListener("input", (e) => {
      audio.volume = Number(e.currentTarget.value);
      if (audio.volume > 0) savedVol = audio.volume;
      paintVol();
    });
    muteBtn.addEventListener("click", () => {
      if (audio.volume > 0) {
        savedVol = audio.volume;
        audio.volume = 0;
      } else {
        audio.volume = savedVol || 0.3;
      }
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

  const skillObserver = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    gauges.forEach((g, i) => animateGauge(g, i * 100));
    skillObserver.disconnect();
  }, { threshold: 0.3 });
  skillObserver.observe(document.getElementById("skill"));

  // career reveal
  if (!reduceMotion) {
    const careerObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("shown");
        careerObserver.unobserve(e.target);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".tl-item").forEach((el) => {
      el.classList.add("reveal");
      careerObserver.observe(el);
    });
  }
})();
