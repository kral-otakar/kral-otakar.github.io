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

function card(project){
  const li = el("li", { class: "card" });
  const a  = el("a", { href: project.href, target: "_blank", rel: "noopener" });

  // volitelný obrázek (pokud v JSONu přidáš "img")
  if (project.img) {
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
  // cache-bust: ať se ti po commitu hned načte aktuální JSON
  const url = `${DATA_URL}?t=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("projects.json musí být pole objektů");
  return data;
}

async function bootstrap(){
  document.getElementById("year").textContent = new Date().getFullYear();

  const list = document.getElementById("projects");
  const err  = document.getElementById("error");

  try {
    const projects = await loadProjects();

    // Jednoduše vypiš v pořadí, ve kterém jsou v JSONu (žádné míchání)
    for (const p of projects) {
      if (!p?.title || !p?.href) continue; // minimální validace
      list.appendChild( card(p) );
    }

    if (!projects.length){
      list.innerHTML = "<li class='card'><a><h3>Není co zobrazit</h3><p>Přidej prosím projekty do projects.json.</p></a></li>";
    }

  } catch (e) {
    console.error(e);
    err.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
