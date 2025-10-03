# Changelog

Všechny významné změny v tomto projektu budou dokumentovány v tomto souboru.

Formát je založen na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
a tento projekt dodržuje [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-03

### Přidáno
- Základní portfolio stránka s responzivním designem
- Dynamické načítání projektů z JSON souboru
- Dark theme s custom properties
- SVG podpora s inline renderingem
- Redirect funkcionalita pro projekty
- Cache busting pro optimalizaci
- Centralizovaná správa verzí přes VERSION soubor
- Automatické zobrazování verze v footeru
- Česká lokalizace
- MIT licence

### Technické detaily
- Použití moderních webových standardů (HTML5, CSS3, ES6+)
- Optimalizace pro výkon s minimálními závislostmi
- Pouze externí závislost: Google Fonts (Special Elite, Montserrat)
- Validní JSON struktura pro data
- Cross-browser kompatibilita
- GitHub Pages deployment

### Struktura projektu
```
/
├─ index.html # Hlavní HTML soubor
├─ styles.css # CSS styly s custom properties
├─ script.js # JavaScript funkcionalita
├─ projects.json # Data pro dynamické načítání
├─ VERSION # Verze a datum release
├─ assets/ # Statické soubory (favicon, obrázky)
├─ README.md # Dokumentace projektu
├─ Changelog.md # Historie změn
└─ LICENSE # MIT licence
```

### Použití
1. Naklonujte nebo stáhněte projekt
2. Upravte `projects.json` podle vašich potřeb
3. Přizpůsobte obsah v `index.html`
4. Upravte styly v `styles.css` podle vašeho designu
5. Deploy na GitHub Pages nebo jakýkoliv webový server

### Kompatibilita
- Moderní prohlížeče (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Mobilní zařízení (iOS Safari 12+, Chrome Mobile 60+)
- Responzivní design pro všechny velikosti obrazovek