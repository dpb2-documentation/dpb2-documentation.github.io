/* ============================================================
   DPB2 Documentation — shared app script
   Builds the sidebar, search filter, mobile drawer, copy buttons
   and the on-this-page table of contents.
   ============================================================ */

/* ---- Navigation definition (single source of truth) ---- */
const NAV = [
  {
    group: "Introduction",
    links: [
      { href: "index.html",        label: "Overview" },
      { href: "getting-started.html", label: "Getting Started" },
    ],
  },
  {
    group: "Core Concepts",
    links: [
      { href: "architecture.html", label: "Plugin Architecture" },
      { href: "bot-loop.html",     label: "The Bot Loop" },
    ],
  },
  {
    group: "Reference",
    links: [
      { href: "game-api.html",     label: "Game API" },
      { href: "api-discovery.html",label: "API Discovery" },
    ],
  },
  {
    group: "Practical",
    links: [
      { href: "guides.html",       label: "Patterns & Gotchas" },
      { href: "resources.html",    label: "Resources" },
    ],
  },
];

const ICONS = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  menu:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
};

/* ---- Build the page chrome ---- */
function buildChrome() {
  const current = location.pathname.split("/").pop() || "index.html";

  /* Sidebar */
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.id = "sidebar";

  let navHTML = "";
  NAV.forEach((g) => {
    navHTML += `<div class="nav-group"><div class="nav-group__title">${g.group}</div>`;
    g.links.forEach((l) => {
      const active = l.href === current ? " active" : "";
      navHTML += `<a class="nav-link${active}" href="${l.href}" data-label="${l.label.toLowerCase()}"><span class="dot"></span>${l.label}</a>`;
    });
    navHTML += `</div>`;
  });

  sidebar.innerHTML = `
    <a class="sidebar__brand" href="index.html" style="text-decoration:none">
      <div class="brand-logo">DPB</div>
      <div class="brand-text"><strong>DPB2 Docs</strong><span>DreamPoeBot 2 · PoE 2</span></div>
    </a>
    <div class="sidebar__search">
      <div class="search-box">
        ${ICONS.search}
        <input type="text" id="navSearch" placeholder="Filter pages…" autocomplete="off" spellcheck="false">
      </div>
    </div>
    <nav class="sidebar__nav" id="navList">${navHTML}</nav>
    <div class="sidebar__footer">
      <div class="footer-links">
        <a href="https://dreampoebot.com/" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Website
        </a>
        <a href="https://discord.com/invite/ZCnuudbngp" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.25.5a18.3 18.3 0 0 1 4.3 1.5c-2-1-4.6-1.7-7.45-1.7s-5.45.7-7.45 1.7c1.3-.7 2.8-1.2 4.3-1.5L8.6 3c-1.8.3-3.5.8-4.9 1.4C.9 8.9.1 13.3.5 17.6a20 20 0 0 0 6 3l.5-.7c-1-.3-2-.8-2.85-1.4.24.17.5.33.74.48a14.2 14.2 0 0 0 12.2 0l.74-.48c-.86.6-1.85 1.05-2.85 1.4l.5.7a20 20 0 0 0 6-3c.5-5-.78-9.4-2.92-13.2zM8.5 14.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>
          Discord
        </a>
      </div>
      <span>Community documentation · Unofficial</span>
    </div>
  `;

  /* Mobile top bar + overlay */
  const topbar = document.createElement("div");
  topbar.className = "topbar";
  topbar.innerHTML = `
    <button class="menu-btn" id="menuBtn" aria-label="Open menu">${ICONS.menu}</button>
    <div class="brand-text"><strong style="color:var(--heading)">DPB2 Docs</strong></div>
  `;

  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  overlay.id = "sidebarOverlay";

  const main = document.querySelector(".main");
  document.body.insertBefore(sidebar, document.body.firstChild);
  main.insertBefore(topbar, main.firstChild);
  document.body.appendChild(overlay);

  /* Search filter */
  const search = document.getElementById("navSearch");
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    document.querySelectorAll(".nav-link").forEach((a) => {
      const match = a.dataset.label.includes(q);
      a.style.display = match ? "" : "none";
    });
    document.querySelectorAll(".nav-group").forEach((g) => {
      const anyVisible = [...g.querySelectorAll(".nav-link")].some((a) => a.style.display !== "none");
      g.style.display = anyVisible ? "" : "none";
    });
  });

  /* Mobile drawer */
  const menuBtn = document.getElementById("menuBtn");
  const close = () => { sidebar.classList.remove("open"); overlay.classList.remove("show"); };
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  });
  overlay.addEventListener("click", close);
  document.querySelectorAll(".nav-link").forEach((a) => a.addEventListener("click", close));
}

/* ---- Copy buttons on code blocks ---- */
function buildCopyButtons() {
  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.parentElement.classList.contains("code-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "code-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", () => {
      const code = pre.querySelector("code") || pre;
      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1600);
      });
    });
    wrap.appendChild(btn);
  });
}

/* ---- On-this-page TOC ---- */
function buildTOC() {
  const content = document.querySelector(".content");
  if (!content || content.dataset.toc === "off") return;
  const heads = [...content.querySelectorAll("h2, h3")].filter((h) => h.id);
  if (heads.length < 2) return;

  const toc = document.createElement("nav");
  toc.className = "toc";
  let html = '<div class="toc__title">On this page</div>';
  heads.forEach((h) => {
    const lvl = h.tagName === "H3" ? " lvl-3" : "";
    html += `<a href="#${h.id}" class="${lvl.trim()}" data-target="${h.id}">${h.textContent}</a>`;
  });
  toc.innerHTML = html;
  document.body.appendChild(toc);

  /* Scroll-spy */
  const links = [...toc.querySelectorAll("a")];
  const spy = () => {
    let active = heads[0];
    const y = window.scrollY + 110;
    heads.forEach((h) => { if (h.offsetTop <= y) active = h; });
    links.forEach((l) => l.classList.toggle("active", l.dataset.target === active.id));
  };
  window.addEventListener("scroll", spy, { passive: true });
  spy();
}

/* ---- Auto-id headings without ids ---- */
function ensureHeadingIds() {
  document.querySelectorAll(".content h2, .content h3").forEach((h) => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase()
        .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildChrome();
  ensureHeadingIds();
  buildCopyButtons();
  buildTOC();
});
