## kral-otakar.github.io

Osobní landing page s náhodným výběrem projektů (GitHub Pages).  
Statická, rychlá, bez frameworku. Data projektů jsou v `projects.json`.

### Struktura
```
/
├─ index.html
├─ styles.css
├─ script.js
├─ projects.json
├─ assets/ # obrázky, favicony (volitelně)
├─ README.md
└─ LICENSE
```

### Funkce

- **Dark, elegant UI** (Playfair Display + Inter + JetBrains Mono).
- **Responzivní grid** projektových karet.
- **Náhodný výběr** projektů při každém načtení + button „Zamíchat“.
- **Data oddělená v `projects.json`** (title, href, desc, tags).
- Lehké **cache-busting** pro CSS/JS i JSON.

### Jak upravit projekty

Otevři `projects.json` a uprav/rozšiř pole objektů:

```json
[
  {
    "title": "Lightroom Portfolio",
    "href": "https://kral-otakar.github.io/lightroom-portfolio/",
    "desc": "Výstavní galerie z LR Classic.",
    "tags": ["photo", "portfolio"]
  }
]
```

### Licence

MIT – viz soubor LICENSE.
Autor
© 2025 Král Otakar

### raw data
https://raw.githubusercontent.com/kral-otakar/kral-otakar.github.io/refs/heads/master/index.html
https://raw.githubusercontent.com/kral-otakar/kral-otakar.github.io/refs/heads/master/styles.css
https://raw.githubusercontent.com/kral-otakar/kral-otakar.github.io/refs/heads/master/script.js
https://raw.githubusercontent.com/kral-otakar/kral-otakar.github.io/refs/heads/master/projects.json 
