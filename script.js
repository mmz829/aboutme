(() => {
  const data = SITE_DATA;
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
  const { comment, ...fields } = data.profile;
  const profile = Object.entries(fields).map(([k, v]) => {
    const val = esc(Array.isArray(v) ? v.join(" / ") : v);
    return `<div class="pf-row"><span class="pf-key">${esc(k)}</span><span class="pf-val">${val}</span></div>`;
  });
  if (comment) profile.push("", cm(`// ${comment}`));

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
