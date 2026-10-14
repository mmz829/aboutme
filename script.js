(() => {
  const data = SITE_DATA;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GAUGE_LEN = 16;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const str = (s) => `<span class="c-str">"${esc(s)}"</span>`;
  const key = (s) => `<span class="c-key">${esc(s)}</span>`;
  const cm = (s) => `<span class="c-comment">${esc(s)}</span>`;
  const kw = (s) => `<span class="c-kw">${s}</span>`;

  const hash = (s) => {
    let h = 0;
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h.toString(16).padStart(7, "0").slice(0, 7);
  };

  // README.md
  const aa = [
    "   ∧＿∧",
    "  ( ･ω･)  < hello, world!",
    "  ( つ旦O",
    "  と＿)＿)",
  ];
  const readme = [
    `<span class="c-h1"><span class="c-mark"># </span>${esc(data.profile.name)}</span>`,
    "",
    `<span class="c-text">${esc(data.profile.job)} / たまにコードで遊ぶ人</span>`,
    "",
    ...aa.map((l) => `<span class="c-aa">${esc(l)}</span>`),
    "",
    `<span id="typing"></span><span class="cursor">▍</span>`,
  ];

  // profile.json
  const { comment, ...fields } = data.profile;
  const keys = Object.keys(fields);
  const profile = [
    "{",
    ...keys.map((k, i) => {
      const v = fields[k];
      const val = Array.isArray(v) ? `[${v.map(str).join(", ")}]` : str(v);
      return `  <span class="c-key">"${esc(k)}"</span>: ${val}${i < keys.length - 1 ? "," : ""}`;
    }),
    "}",
  ];
  if (comment) profile.push(cm(`// ${comment}`));

  // skill.ts
  const nameWidth = Math.max(...data.skills.flatMap((c) => c.items.map((s) => s.name.length)));
  const skill = [
    `${kw("export const")} skills = {`,
    ...data.skills.flatMap((cat) => [
      `  ${cm(`// ${cat.category}`)}`,
      ...cat.items.map((s) =>
        `  ${key(s.name)}:${" ".repeat(nameWidth - s.name.length + 1)}<span class="gauge" data-level="${Number(s.level)}"></span> <span class="c-num pct">0</span>,`),
    ]),
    "};",
  ];

  // career.log
  const career = [
    cm("$ git log --oneline"),
    "",
    ...data.career.flatMap((c, i) => [
      `<span class="c-hash">${hash(c.title + c.date)}</span> ${i === 0 ? kw("(HEAD -> main) ") : ""}<span class="c-text">${esc(c.title)}</span>`,
      `        ${cm(`${c.date} · ${c.role}`)}`,
      `        <span class="c-text">${esc(c.desc)}</span>`,
      "",
    ]),
    cm("(END)"),
  ];

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
      ${f.lines.map((l, n) => `<div class="line"><span class="ln">${n + 1}</span><span class="lc">${l}</span></div>`).join("")}
    </section>`).join("");

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
    ["c-kw", "const "],
    ["", "name = "],
    ["c-str", `"${data.profile.name}"`],
    ["", ";"],
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

  // gauges
  const renderGauge = (el, value) => {
    const filled = Math.round((value / 100) * GAUGE_LEN);
    el.innerHTML = `[${"█".repeat(filled)}<span class="empty">${"░".repeat(GAUGE_LEN - filled)}</span>]`;
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
})();
