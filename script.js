// ----- Nastavení -----
const COUNT = 6;                    // kolik karet zobrazit
const DATA_URL = "projects.json";   // může být i "data/projects.json"

// Fisher–Yates shuffle
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tagPills(tags = []) {
  if (!Array.isArray(tags) || !tags.length) return "";
  return `<ul class="tags">${tags.map(t => `<li>${t}</li>`).join("")}</ul>`;
}

function showError(msg) {
  const el = document.getElementById("error");
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
}

function renderCards(projects) {
  const target = document.getElementById("projects");
  if (!target) return;
  target.innerHTML = "";

  const sample = shuffle(projects).slice(0, COUNT);
  for (const p of sample) {
    // jednoduchá validace položky
    if (!p || typeof p.href !== "string" || typeof p.title !== "string") continue;

    const li = document.createElement("li");
    li.className = "card fade-in";
    li.innerHTML = `
      <a class="card-link" href="${p.href}" target="_blank" rel="noopener">
        <div class="card-head"><h3>${p.title}</h3></div>
        <p class="desc">${p.desc ? String(p.desc) : ""}</p>
        ${tagPills(p.tags)}
        <span class="goto" aria-hidden="true">→</span>
      </a>
    `;
    target.appendChild(li);
  }
}

async function loadProjects() {
  // cache busting pro GitHub Pages (které může dlouho cachovat)
  const url = `${DATA_URL}?v=${new Date().getTime()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("projects.json musí být pole objektů");
  }
  return data;
}

async function bootstrap() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  try {
    const all = await loadProjects();
    renderCards(all);

    const btn = document.getElementById("reshuffle");
    if (btn) {
      btn.addEventListener("click", () => {
        renderCards(all);
        const grid = document.getElementById("projects");
        if (grid) {
          grid.classList.add("pulse");
          setTimeout(() => grid.classList.remove("pulse"), 400);
        }
      });
    }
  } catch (err) {
    console.error(err);
    showError(
      "Nepodařilo se načíst projects.json. Zkontroluj, že soubor existuje v kořeni repozitáře a je validní JSON. " +
      "Prozatím můžeš přejít na můj profil: https://github.com/kral-otakar"
    );
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
