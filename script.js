// Pomocná funkce pro načítání JSON
async function fetchJson(url){
  const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Minimalistický klient: načti JSON a vykresli karty.

const DATA_URL = "projects.json";  // když dáš do podsložky, změň cestu

function el(tag, attrs = {}, html = ""){
  const e = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k.startsWith("data-")) e.setAttribute(k, v);
    else if (k === "href") e.setAttribute("href", v);
    else e[k] = v;
  }
  if (html) e.innerHTML = html;
  return e;
}

// Pomocná async funkce pro vytvoření karty s podporou inline SVG
async function card(project){
  const li = el("li", { class: "card" });
  const a  = el("a", { href: project.href, target: "_blank", rel: "noopener" });

  // Pokud je obrázek SVG, načti a vlož inline
  if (project.img && project.img.endsWith('.svg')) {
    try {
      const res = await fetch(project.img);
      const svgText = await res.text();
      // Vytvoř dočasný element a vlož SVG jako HTML
      const wrapper = document.createElement('div');
      wrapper.className = "svg-wrapper";
      wrapper.style.color = `var(--${project.svgColor || 'accent'})`;
      wrapper.innerHTML = svgText;
      a.appendChild(wrapper);
    } catch (e) {
      // Pokud selže, fallback na placeholder
      const placeholder = el("div", { class: "img-placeholder" });
      a.appendChild(placeholder);
    }
  } else if (project.img) {
    // Ostatní obrázky jako <img>
    const img = el("img", { src: project.img, alt: project.title });
    a.appendChild(img);
  } else {
    const placeholder = el("div", { class: "img-placeholder" });
    a.appendChild(placeholder);
  }

  const h3 = el("h3", {}, project.title);
  const p  = el("p", {}, project.desc || "");
  a.appendChild(h3);
  a.appendChild(p);

  li.appendChild(a);
  return li;
}

async function loadProjects(){
  // Použij fetchJson pro konzistenci
  const data = await fetchJson(DATA_URL);
  if (!Array.isArray(data)) throw new Error("projects.json must be array of objects");
  return data;
}  

async function init(){
  document.getElementById("year").textContent = new Date().getFullYear();

  // Načte verzi a datum z VERSION souboru
  try {
    const versionData = await fetchJson("VERSION");
    const versionEl = document.getElementById("version");
    const releaseDateEl = document.getElementById("release-date");
    
    if (versionEl && versionData.version) {
      versionEl.textContent = `v${versionData.version}`;
    }
    
    if (releaseDateEl && versionData.releaseDate) {
      const date = new Date(versionData.releaseDate);
      releaseDateEl.textContent = date.toLocaleDateString('cs-CZ');
    }
  } catch (e) {
    console.warn("Nepodařilo se načíst VERSION soubor:", e);
    // Fallback na výchozí hodnoty
    const versionEl = document.getElementById("version");
    const releaseDateEl = document.getElementById("release-date");
    if (versionEl) versionEl.textContent = "v1.0.0";
    if (releaseDateEl) releaseDateEl.textContent = new Date().toLocaleDateString('cs-CZ');
  }

  const list = document.getElementById("projects");
  const err  = document.getElementById("error");

  try {
    const projects = await loadProjects();

    // Jednoduše vypiš v pořadí, ve kterém jsou v JSONu (žádné míchání)
    for (const p of projects) {
      if (!p?.title || !p?.href) continue; // minimální validace
      const cardEl = await card(p); // Vytvářej karty asynchronně (kvůli SVG)
      list.appendChild(cardEl);
    }

    if (!projects.length){
      list.innerHTML = "<li class='card'><a><h3>Nothing to see there</h3><p>Add cards to projects.json.</p></a></li>";
    }

    // přesměrování podle URL parametru
    handleRedirect(projects);


  } catch (e) {
    console.error(e);
    err.hidden = false;
  }
}

// funkce pro přesměrování
function handleRedirect(projects) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  if (id) {
    const project = projects.find(p => p.id == id);
    if (project && project.href && project.href !== '#') {
      // Zobrazit zprávu o přesměrování
      showRedirectMessage(project.title);
      
      // Přesměrovat po 2 sekundách
      setTimeout(() => {
        window.location.href = project.href;
      }, 3000);
    }
  }
}

// Funkce pro zobrazení zprávy o přesměrování
function showRedirectMessage(title) {
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  message.innerHTML = `
    <h3 style="margin: 0 0 10px; color: var(--text); font-size: 14px; ">Taking you to ${title}</h3>
    <p style="margin: 0; color: var(--muted); font-size: 12px; ">Please wait...</p>
  `;
  document.body.appendChild(message);
}

// inicializace (ceka na DOM)
document.addEventListener("DOMContentLoaded", init);
