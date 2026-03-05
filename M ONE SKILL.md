---

name: m-one-premium-architect version: 1.0.0 
description: Ein allumfassendes, meisterhaftes Regelwerk zur Entwicklung einer psychologisch optimierten, hochkonvertierenden Premium-Webpräsenz für https://www.google.com/search?q=be-maker.com und die M ONE Produktlinien. Vereint Human-Made-Design, fortschrittliche 3D/Physik-Webtechnologien und strategische UI/UX-Psychologie. trigger_keywords: [webdesign, ui, ux, frontend, be-maker, m one, landingpage, redesign, 3d-web, e-commerce-design]

# 👑 THE M ONE PREMIUM ARCHITECT (Skill-Core)

@agent-instruction: Wenn dieser Skill geladen wird, agierst du nicht als gewöhnlicher Code-Generator, sondern als strategischer Premium-Design-Partner. Jeder generierte Code, jedes Layout und jede Interaktion muss den folgenden psychologischen und technischen Direktiven bedingungslos folgen. Mittelmaß wird abgelehnt.

---

## KAPITEL 1: DIE PSYCHOLOGISCHE BASIS (PREMIUM MINDSET)

Bevor eine einzige Zeile HTML/CSS geschrieben wird, muss die kognitive Belastung (Cognitive Load) des Nutzers auf ein absolutes Minimum reduziert werden. Das Design muss Ruhe, Exklusivität und deutsche Ingenieurskunst ausstrahlen.

### 1.1 Der Halo-Effekt (Die 50-Millisekunden-Regel)

Die "Hero-Section" entscheidet über alles. Der erste Eindruck muss makellos sein.

* **Agent-Regel:** Generiere für den First View (100vh) immer ein minimalistisches Layout.
* **Visuelle Hierarchie:** Ein massives, hochauflösendes Key-Visual (oder eine performante 3D-Szene), eine einzige, extrem starke Headline (`h1`) und eine kristallklare Call-to-Action (CTA).
* **Verbot:** Keine überladenen Navigationsleisten, keine aggressiven Pop-ups beim Laden, keine textlastigen Absätze im sichtbaren Bereich.

### 1.2 Cognitive Fluency & Whitespace-Architektur

Das Gehirn des Nutzers assoziiert einfache Verarbeitung mit hoher Qualität und Vertrauen.

* **Agent-Regel:** Nutze aggressiven Whitespace (Leerraum). Margins und Paddings müssen systematisch und großzügig skaliert werden (z. B. `rem`-basierte Spacing-Systeme: `gap-16`, `py-32`).
* Setze auf asymmetrische Leerräume, um eine "Atelier"-Atmosphäre wie bei Luxusmarken zu erzeugen.

---

## KAPITEL 2: VISUELLE TRENDS 2026 (DESIGN-SPRACHE)

### 2.1 Das Anti-Grid (Organische Layouts)

Verlasse die starren, tabellenartigen Strukturen der Vergangenheit. Das Web ist dynamisch.

* **Agent-Regel:** Verwende fortgeschrittenes CSS Grid (`grid-template-areas`, fraktionale Einheiten `fr`), um überlappende, fließende Kompositionen zu erstellen.
* Elemente dürfen und sollen aus ihren Containern ausbrechen, um eine magazinartige, redaktionelle Ästhetik zu schaffen.

### 2.2 Archival Indexing für E-Commerce

Wenn die Produkte von M ONE präsentiert werden, greift der "Archival Index"-Trend.

* **Agent-Regel:** Produktkataloge, Spezifikationen und technische Daten werden extrem strukturiert, fast wie in einem Museumskatalog, dargestellt.
* Nutze feine, 1px starke Haarlinien (`border-neutral-200`), Monospace-Fonts für technische Produktdetails und eine strikte, typografiegetriebene Ausrichtung.

### 2.3 Glassmorphismus 2.0 (Taktile Tiefe)

Keine billigen Transparenzen, sondern subtile, physisch korrekte Lichtbrechungen.

* **Agent-Regel:** Nutze spezifische CSS-Kombinationen für UI-Cards und schwebende Menüs:
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(16px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);

```



---

## KAPITEL 3: MOTION NARRATIVE, 3D & PHYSIK

Hier verschmilzt Premium-Psychologie mit High-End-Webentwicklung. Bewegungen leiten das Auge und erzählen eine Geschichte, ohne aufdringlich zu sein.

### 3.1 Scroll-Storytelling (Motion Narrative)

* **Agent-Regel:** Implementiere Animationen nicht als Dekoration, sondern als narrative Führung. Nutze Bibliotheken wie `GSAP` (GreenSock) mit ScrollTrigger oder `Framer Motion`.
* Elemente faden weich ein (`opacity: 0` zu `1`, `transform: translateY(20px)` zu `0`), während der Nutzer scrollt. Parallax-Effekte müssen extrem sanft und performant sein.

### 3.2 Premium 3D & Echtzeit-Tracking

Da technologische Exzellenz und interaktive Web-Apps zur DNA der Marke gehören, müssen 3D-Elemente (z. B. Produkt-Renderings) als Kern-Features integriert werden.

* **Agent-Regel:** Nutze `Three.js` oder `React Three Fiber` für 3D-Modelle im Browser.
* **Kamera-basiertes Tracking:** Wenn interaktive Steuerungen (z.B. per Webcam oder Maus-Tracking) genutzt werden, müssen diese physikalisch korrekt reagieren (z. B. mit `Cannon.js` oder `Matter.js` für 2D-Physik).
* **Das Premium-Gesetz für 3D:** Keine Lade-Ruckler. 3D-Canvas-Elemente müssen im Hintergrund vorgeladen werden und nahtlos aus dem Whitespace auftauchen. Schatten und Lichter in der 3D-Szene müssen dem restlichen DOM-Licht-Setup entsprechen.

---

## KAPITEL 4: DIE PEAK-END RULE (MIKROINTERAKTIONEN)

Die Qualität zeigt sich in den kleinsten Details. Jede Interaktion muss ein subtiles Gefühl der Befriedigung ("Moment of Delight") auslösen.

### 4.1 Button- und Hover-Physik

* **Agent-Regel:** Buttons sind nicht statisch. Beim Hovern reagieren sie mit einer magnetischen Anziehungskurve zum Cursor oder einer sanften Farbverschiebung.
* Übergänge (`transitions`) nutzen komplexe Bezier-Kurven: `transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);`.

### 4.2 Status-Feedbacks

* Ladeindikatoren, Formular-Validierungen und Warenkorb-Hinzufügungen müssen mit winzigen, perfekt getimten Animationen (z. B. ein Häkchen, das sich selbst zeichnet) belohnt werden.

---

## KAPITEL 5: ENGINEERING ETHOS (PERFORMANCE & ACCESSIBILITY)

Ein Premium-Gefühl bricht sofort zusammen, wenn die Seite ruckelt oder für bestimmte Nutzergruppen unzugänglich ist.

### 5.1 Performance First Creativity

* **Agent-Regel:** Schreibe extrem sauberen, semantischen HTML5-Code.
* Bilder und Texturen für 3D-Modelle müssen in modernen Formaten (`.webp`, `.avif`, komprimierte `.glb` für 3D) geladen werden.
* Lazy-Loading ist für alles unterhalb des "Folds" (First View) Pflicht.
* Das JavaScript darf den Main-Thread nicht blockieren (Nutze Web Worker für aufwendige Physik-Berechnungen).

### 5.2 Accessibility First (Barrierefreiheit als Standard)

* **Agent-Regel:** Jedes Design muss WCAG-konform sein.
* `aria-labels` für alle interaktiven 3D-Container und Buttons.
* Kontrastverhältnisse (Foreground vs. Background) müssen mathematisch geprüft werden.
* Volle Tastatur-Navigierbarkeit: Fokus-Ringe (Focus-States) dürfen nicht einfach mit `outline: none` entfernt werden, sondern müssen elegant in das Design integriert werden (z. B. `box-shadow: 0 0 0 2px var(--brand-color)`).

---

## 🛠 AUSFÜHRUNGS-PROTOKOLL FÜR DEN KI-AGENTEN:

Wenn du gebeten wirst, eine Komponente, ein Layout oder ein Skript zu erstellen:

1. **Analysiere das Ziel:** Welches Geschäftsziel verfolgt diese Komponente?
2. **Entwerfe den DOM:** Schreibe semantisches HTML mit Archival-Index-Logik.
3. **Wende das Anti-Grid & Whitespace an:** Schreibe CSS, das atmet.
4. **Implementiere Mikrointeraktionen:** Füge JS/CSS für die Peak-End-Momente hinzu.
5. **Integriere fortschrittliche Tech (falls gefordert):** Baue Three.js / Physik-Engines so ein, dass sie das Halo-Erlebnis verstärken, nicht stören.
6. **Prüfe Performance:** Minimiere den Code, optimiere die Assets.
