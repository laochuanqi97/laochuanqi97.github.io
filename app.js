(() => {
  const p = window.PROFILE;
  const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; };
  const safeUrl = value => { if (!value) return null; try { const u = new URL(value, location.href); return ["https:", "http:", "file:"].includes(u.protocol) ? u.href : null; } catch { return null; } };
  const link = (text, url, cls) => { const href = safeUrl(url); if (!href) return null; const a = el("a", cls, text); a.href = href; if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; } return a; };
  const tags = values => { const wrap = el("div", "tags"); (values || []).forEach(t => wrap.append(el("span", "tag", t))); return wrap; };
  document.querySelectorAll("[data-field]").forEach(node => { node.textContent = p[node.dataset.field] || ""; });
  document.title = `${p.name} | Biomedical AI Research`;
  document.querySelector('meta[name="description"]').content = p.intro;
  document.getElementById("year").textContent = new Date().getFullYear();
  if (!p.template) document.querySelector(".template-notice")?.remove();
  if (p.photo && safeUrl(p.photo)) {
    const img = el("img"); img.src = safeUrl(p.photo); img.alt = `${p.name} portrait`;
    img.addEventListener("load", () => document.getElementById("portrait").replaceChildren(img), { once: true });
  }
  p.keywords.forEach(t => document.getElementById("keywords").append(el("span", "", t)));
  const cv = safeUrl(p.cv); if (cv) { const a = document.getElementById("cv-link"); a.href = cv; a.hidden = false; }
  p.research.forEach((item, i) => { const card = el("article", "research-card"); card.append(el("span", "item-number", `0${i + 1}`), el("h3", "", item.title), el("p", "", item.description), tags(item.tags)); document.getElementById("research-list").append(card); });
  p.projects.forEach((item, i) => { const row = el("article", "project-row"); const visual = el("div", `project-visual visual-${i % 2}`, String(i + 1).padStart(2, "0")); visual.setAttribute("aria-hidden", "true"); const body = el("div", "project-body"); body.append(el("span", "eyebrow", item.category), el("h3", "", item.title), el("p", "", item.description), tags(item.tags)); const a = link("View code ↗", item.url, "text-link"); if (a) body.append(a); row.append(visual, body); document.getElementById("project-list").append(row); });
  const pubs = document.getElementById("publication-list");
  if (!p.publications.length) pubs.append(el("p", "empty", "New research will be shared here."));
  p.publications.forEach(item => { const row = el("article", "publication"); row.append(el("span", "pub-year", item.year), el("h3", "", item.title), el("p", "", item.authors), el("p", "pub-venue", item.venue)); const a = link("Read paper ↗", item.url, "text-link"); if (a) row.append(a); pubs.append(row); });
  if (p.email) { const a = document.getElementById("email-link"); a.textContent = `${p.email} ↗`; a.href = `mailto:${p.email}`; a.hidden = false; document.getElementById("email-placeholder").hidden = true; }
  p.links.forEach(item => { const a = link(`${item.label} ↗`, item.url, ""); if (a) document.getElementById("social-links").append(a); });
  const menu = document.querySelector(".menu"); const nav = document.getElementById("navigation");
  const closeMenu = () => { menu.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); };
  menu.addEventListener("click", () => { const open = menu.getAttribute("aria-expanded") !== "true"; menu.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
})();
