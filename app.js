(() => {
  const p = window.PROFILE;
  const el = (tag, text, cls) => { const n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (cls) n.className = cls; return n; };
  const safeUrl = value => { if (!value) return null; try { const u = new URL(value, location.href); return ["https:", "http:", "file:"].includes(u.protocol) ? u.href : null; } catch { return null; } };
  const link = (text, url, cls) => { const href = safeUrl(url); if (!href) return null; const a = el("a", text, cls); a.href = href; if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; } return a; };
  document.querySelectorAll("[data-field]").forEach(n => { n.textContent = p[n.dataset.field] || ""; });
  document.title = `${p.name} | Academic Homepage`;
  document.getElementById("year").textContent = new Date().getFullYear();
  const email = document.getElementById("email-link"); email.textContent = p.email; email.href = `mailto:${p.email}`;
  p.links.forEach(item => { const a = link(item.label, item.url); if (a) document.getElementById("social-links").append(a); });
  const cv = safeUrl(p.cv); if (cv) { const a = document.getElementById("cv-link"); a.href = cv; a.hidden = false; }
  ["Large Models", "Biomedical Machine Learning", "Cancer Drug Response Prediction", "Drug–Target Interaction Prediction"].forEach(t => document.getElementById("research-list").append(el("li", t)));
  p.publications.forEach(item => {
    const article = el("article", undefined, "publication"); article.append(el("h3", item.title));
    const authors = el("p"); const pieces = item.authors.split(p.name);
    pieces.forEach((part, i) => { if (i) authors.append(el("strong", p.name)); authors.append(document.createTextNode(part)); });
    article.append(authors, el("p", `${item.venue}, ${item.year}.`, "venue")); const a = link("[Paper]", item.url, "paper-link"); if (a) article.append(a);
    document.getElementById("publication-list").append(article);
  });
  p.projects.forEach(item => { const article = el("article", undefined, "project"); article.append(el("h3", item.title), el("p", item.description)); const a = link("[Code]", item.url, "code-link"); if (a) article.append(a); document.getElementById("project-list").append(article); });
})();
