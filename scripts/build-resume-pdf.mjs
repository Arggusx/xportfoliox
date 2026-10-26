// Gera um PDF por idioma (public/<pdf> de cada idioma) a partir de src/data/resume.json.
// Uso: npm run resume:pdf  (requer Chrome ou Edge instalado)
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "src/data/resume.json"), "utf8"));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const render = (lang) => {
  const r = { ...data[lang], name: data.name, contacts: data.contacts };
  const L = r.labels;
  return `<!doctype html>
<html lang="${lang === "pt" ? "pt-BR" : "en"}"><head><meta charset="utf-8"><title>${esc(r.name)} - ${esc(r.title)}</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Segoe UI", Arial, sans-serif; color: #1e293b; font-size: 10.5pt; line-height: 1.45; }
  .page { width: 210mm; min-height: 297mm; display: grid; grid-template-columns: 62mm 1fr; }
  aside { background: #0f172a; color: #e2e8f0; padding: 16mm 8mm; }
  main { padding: 16mm 12mm 12mm 12mm; }
  h1 { font-size: 22pt; line-height: 1.1; color: #0f172a; }
  .role { color: #6366f1; font-weight: 700; font-size: 12pt; margin: 2mm 0 5mm; }
  aside h2 { font-size: 9pt; letter-spacing: .12em; text-transform: uppercase; color: #38bdf8; margin: 0 0 2.5mm; }
  aside section { margin-bottom: 8mm; }
  aside p, aside li { font-size: 9pt; word-break: break-word; }
  aside ul { list-style: none; }
  aside li { margin-bottom: 1.5mm; }
  aside .group { color: #94a3b8; font-size: 8pt; margin: 2.5mm 0 1mm; font-weight: 600; }
  aside a { color: #e2e8f0; text-decoration: none; }
  main h2 { font-size: 10.5pt; letter-spacing: .12em; text-transform: uppercase; color: #6366f1; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 1.5mm; margin: 7mm 0 3.5mm; }
  main h2:first-of-type { margin-top: 0; }
  .item { margin-bottom: 4mm; break-inside: avoid; }
  .head { display: flex; justify-content: space-between; gap: 4mm; align-items: baseline; }
  .head h3 { font-size: 11pt; color: #0f172a; }
  .period { font-size: 9pt; color: #ec4899; font-weight: 700; white-space: nowrap; }
  .sub { color: #475569; font-size: 10pt; }
  main ul { margin: 1.5mm 0 0 4.5mm; }
  main li { margin-bottom: 1mm; }
  .proj b { color: #0f172a; }
</style></head>
<body><div class="page">
  <aside>
    <section>
      <h2>${esc(L.contact)}</h2>
      <ul>
        <li><a href="mailto:${r.contacts.email}">${esc(r.contacts.email)}</a></li>
        <li>${esc(r.contacts.phone)}</li>
        <li><a href="${r.contacts.linkedinUrl}">${esc(r.contacts.linkedin)}</a></li>
        <li><a href="${r.contacts.githubUrl}">${esc(r.contacts.github)}</a></li>
        <li><a href="${r.contacts.siteUrl}">${esc(r.contacts.site)}</a></li>
      </ul>
    </section>
    <section>
      <h2>${esc(L.skills)}</h2>
      ${r.skills
        .map((g) => `<p class="group">${esc(g.group)}</p><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`)
        .join("")}
    </section>
  </aside>
  <main>
    <h1>${esc(r.name)}</h1>
    <p class="role">${esc(r.title)}</p>
    <h2>${esc(L.summary)}</h2>
    <p>${esc(r.summary)}</p>
    <h2>${esc(L.experience)}</h2>
    ${r.experience
      .map(
        (j) => `<div class="item"><div class="head"><h3>${esc(j.role)}</h3><span class="period">${esc(j.period)}</span></div>
        <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>`
      )
      .join("")}
    <h2>${esc(L.education)}</h2>
    ${r.education
      .map(
        (e) => `<div class="item"><div class="head"><h3>${esc(e.course)}</h3><span class="period">${esc(e.period)}</span></div>
        <p class="sub">${esc(e.institution)}</p></div>`
      )
      .join("")}
    <h2>${esc(L.projects)}</h2>
    <ul class="proj">${r.projects.map((p) => `<li><b>${esc(p.name)}</b> — ${esc(p.desc)}</li>`).join("")}</ul>
  </main>
</div></body></html>`;
};

const browsers = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];
const browser = browsers.find(existsSync);
if (!browser) throw new Error("Chrome/Edge não encontrado.");

const tmp = mkdtempSync(join(tmpdir(), "resume-"));

for (const lang of ["en", "pt"]) {
  const htmlPath = join(tmp, `resume-${lang}.html`);
  const out = join(root, "public", data[lang].pdf);
  writeFileSync(htmlPath, render(lang), "utf8");
  execFileSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${out}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: "ignore" });
  console.log("PDF gerado em", out);
}
