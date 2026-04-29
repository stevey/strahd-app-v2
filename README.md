# 🧛 Curse of Strahd — DM Tracker

A purpose-built Dungeon Master companion app for running **Curse of Strahd** campaigns. Tracks the Barovian calendar, weather, moon phases, timeline events, player characters, and Tarokka fortune readings — all in a single dark-themed, no-login, no-server web app.

> Built for the table. Everything persists in your browser. Nothing leaves your machine.

---

## Features

### 🌦️ Environment Tab
The session-start dashboard. Everything the DM needs to set the scene at a glance.

- **Barovian Calendar** — Full Forgotten Realms calendar (12 months × 30 days, year in Barovian Reckoning). Advance the date one day at a time or jump ahead — the forecast and weather history update automatically.
- **Current Weather** — Select or cycle through 19 Barovia-appropriate weather conditions, from *Gloomy* and *Heavy Fog* to *Blood Rain*, *Corpse Wind*, and *Unnatural Darkness*. Weighted random generation favours appropriately grim conditions.
- **7-Day Forecast** — Persistent forecast that advances as the campaign date moves forward. Click any day card to change its weather. Scrolls horizontally so all 7 cards always display at equal width.
- **Moon Phase** — Live moon phase calculated from the current Barovian date.
- **NPC Generator** — Two-column generator for instant NPC creation:
  - **Generic NPCs** — Click Male or Female for a randomised Barovian name and a distinctive physical feature.
  - **Special NPCs** — Choose a type (Werewolf, Wereraven, Vampire Spawn, Witch) and gender, then generate a named NPC with a themed appearance trait. Roughly 1-in-4 are marked ★ as former adventurers, complete with a D&D 5.5e race and class. Vampire spawn draw from a mix of Barovian and common fantasy names; starred vampire spawn use non-Barovian names only. Witches are never former adventurers and always draw from a dedicated pool of evocative witch names.
  - All features are appearance-based — usable the moment the NPC walks in the door.
  - Full history for both columns (up to 20 entries each) with per-item delete. Click any history entry to restore its full details. Histories are included in backup exports and imports.

### 📅 Timeline Tab
A scrollable horizontal campaign timeline showing 3 weeks at a time.

- Navigate backwards and forwards by week, or jump to today.
- Each day shows its weather icon and any events logged on that day.
- **Click any day** to open the Day Events Panel below the track — a full list of that day's events with type badges, descriptions, weather context, and reorder controls (▲▼).
- Add, edit, and delete events. Events are typed (Combat, Story, NPC, Location, Quest, Other) with colour-coded icons.
- The "Add Event" button pre-fills to the selected day's date.

### 🔮 Fortunes Tab
Tracks Madam Eva's Tarokka reading for the campaign.

- Five cards displayed in a **3 + 2 centred grid**: The Wizard, The Marionette, The Bishop, The Mists, The Myrmidon.
- Each card shows its tarokka artwork, the reading's **Meaning**, and the **Clue** given to players.
- **DM Notes** — a free-text field per card for session notes.
- **🔒 Secret Location** — a hidden field that is blurred by default and only revealed on hover. Keeps the actual location off-screen when players might be watching.

### 🧙 Characters Tab
Slots for up to 8 (expandable) player characters.

- Portrait upload with drag-and-drop support. Images are resized and stored locally.
- **Colour ring** — assign a player colour to each character; their portrait gets a glowing coloured ring for quick identification.
- **Details panel** — slide-in panel per character with fields for Conditions, Fears, Dark Gifts, Fortune (Tarokka reading), and general Notes.
- Death counter (💀) per character.
- D&D Beyond character sheet link.
- Retire a character to remove their slot.

### 💾 Backup & Restore
- **Export** — downloads a complete JSON snapshot of all campaign data (date, weather, forecast, events, characters, fortunes, card draw, NPC histories).
- **Import** — restores from any v2.1 or v2.2 backup file. Fully backwards-compatible.
- Current export version: `2.2`

---

## Technology

| | |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Build tool** | [Vite 5](https://vitejs.dev/) |
| **Styling** | Plain CSS with custom properties (no CSS framework) |
| **State** | React `useState` + a custom `useLocalStorage` hook — no external state library |
| **Persistence** | Browser `localStorage` only — no backend, no database, no accounts |
| **Dependencies** | `react`, `react-dom` — nothing else |

The entire app is a static single-page application. It can be hosted on any static file server (GitHub Pages, Netlify, Vercel, etc.) or run locally with no internet connection required after the initial load.

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── TabNavigation       # Top-level tab bar
│   ├── Calendar            # Barovian date picker
│   ├── Weather             # Current weather + forecast
│   ├── WeatherForecast     # 7-day forecast grid
│   ├── MoonPhase           # Moon phase display
│   ├── NameGenerator       # NPC generator (generic + special: werewolf/wereraven/vampire spawn/witch)
│   ├── Timeline            # Horizontal timeline track
│   ├── DayEventsPanel      # Selected-day event list
│   ├── EventModal          # Add / edit event form
│   ├── Fortunes            # Tarokka reading cards
│   ├── CharacterSlot       # Character portrait + quick info
│   ├── CharacterDetailsPanel  # Full character details panel
│   ├── CardDraw            # Card draw tracker (header)
│   ├── EnvironmentSummary  # Footer environment recap
│   └── AdminControls       # Export / import / reset
├── data/
│   ├── calendar.js         # Forgotten Realms calendar constants
│   ├── weather.js          # Weather types + generation logic
│   ├── eventTypes.js       # Timeline event type definitions
│   └── barovianNames.js    # NPC name lists + special NPC generation logic
├── hooks/
│   └── useLocalStorage.js  # Persistent state hook
└── App.jsx                 # Root component + all state
```

---

## Data & Privacy

All data is stored exclusively in your browser's `localStorage`. Nothing is transmitted anywhere. Exporting a backup produces a plain `.json` file you can store wherever you like. Importing replaces the current session data with the backup contents.

---

## Campaign Notes

The app defaults to **2 Marpenoth, 735 BR** — late autumn in Barovia, appropriate for a typical campaign start. The calendar follows the Forgotten Realms Harptos calendar structure (12 months, 30 days each, 10-day weeks).

---

*May the mists of Barovia shroud your journey.*
