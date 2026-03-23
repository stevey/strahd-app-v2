# Strahd App v2.2 — Implementation Plan

## Context
v2.1 is stable and feature-complete. v2.2 adds UX polish, a new Fortunes tab, and meaningful improvements to the Forecast, Timeline, and Characters tabs. All changes must preserve import/export compatibility.

---

## 1. Tab UX — Active Highlight + Visual Connection

**Files:** `src/components/TabNavigation.css`

**Changes:**
- `.tab-btn.active`: change `background` from `var(--bg-dark)` (#0d0d0d) to `var(--accent-primary)` (#8b0000, blood red); change `color` from `var(--text-accent)` to `var(--text-primary)` (parchment, for legibility on red); keep `border-bottom: 2px solid var(--accent-primary)` so it blends into the bottom border line — this creates the visual tab-connects-to-content effect
- `.tab-btn:hover` (inactive): keep `rgba(139, 0, 0, 0.15)` tint as-is
- The `.tab-nav` already has `border-bottom: 2px solid var(--accent-primary)` — the active tab's bottom edge (same red) merges seamlessly with this line, visually connecting to the content area below. No layout changes needed.

---

## 2. 7-Day Forecast — Equal Widths + Click to Edit

**Files:** `src/components/WeatherForecast.jsx`, `src/components/WeatherForecast.css`

**Problem:** At responsive breakpoints (4-col, 3-col, 2-col), the 7 cards wrap unevenly — the last row has fewer items which stretch to fill the row.

**Fix:**
- Remove all responsive `grid-template-columns` breakpoints for `.forecast-grid`
- Replace with `grid-template-columns: repeat(7, 1fr)` always, plus `overflow-x: auto` on the container so it scrolls on narrow screens rather than wrapping unevenly
- Set `min-width: 80px` on `.forecast-card` to ensure readable minimum size

**Click to Edit:**
- Add `selectedForecastDay: number | null` state to `WeatherForecast.jsx` (local state)
- Each `.forecast-card` gets an `onClick` that sets `selectedForecastDay` to that card's index
- When a card is selected: show an inline weather `<select>` dropdown replacing the weather name label (same weather options from `weather.js`)
- On change: call a new prop `onForecastDayChange(dayIndex, newWeatherId)` passed down from App
- In `App.jsx`: implement `handleForecastDayChange(dayIndex, weatherId)` that updates the `forecast` array immutably
- Clicking another card or clicking the same card again closes the dropdown

---

## 3. Timeline — Selected Day Events Panel

**Files:** `src/components/Timeline.jsx`, `src/components/Timeline.css`, new `src/components/DayEventsPanel.jsx`, new `src/components/DayEventsPanel.css`

**Concept:** The horizontal timeline stays as-is at the top. Clicking a day circle selects it (highlighted ring) and populates a rich events panel below the track.

**Changes to `Timeline.jsx`:**
- Add `selectedDay: number | null` state (total-days integer), default to today
- Day circle `onClick` sets `selectedDay` to that day's `totalDays` value
- Selected day circle: add `.selected` CSS class → larger ring, brighter glow (distinct from `.today`)
- Render `<DayEventsPanel>` below the scroll track, passing:
  - `selectedDay` (date object)
  - `events` filtered to that day, sorted by `order` field
  - `onReorder(eventId, direction)` callback
  - `onEditEvent`, `onDeleteEvent` callbacks (reuse existing)

**Event ordering:**
- Add `order` field to event data structure (integer, default to `Date.now()` at creation)
- `onReorder(eventId, direction)`: swaps `order` values between adjacent events within the same day
- Events in `DayEventsPanel` sorted by `order` ascending

**`DayEventsPanel` component:**
- Shows formatted date as a header ("Day 12, Marpenoth — 3 events")
- Table/card list: each event shows in a row with:
  - Colored type icon badge (from eventTypes.js)
  - Event title (bold)
  - Description (muted, truncated if long)
  - Weather icon for that day
  - Up/Down reorder buttons (▲▼, disabled at first/last position)
  - Edit + Delete buttons
- If no events for selected day: "No events recorded for this day" placeholder
- "＋ Add Event" button pre-filled with the selected day's date

**Migration:** existing events get `order: parseInt(event.id)` on first load (their creation timestamp, preserving chronological order)

---

## 4. Characters — Color Assignment

**Files:** `src/App.jsx` (DEFAULT_CHARACTER), `src/components/CharacterSlot.jsx`, `src/components/CharacterSlot.css`, `src/components/CharacterDetailsPanel.jsx`, `src/components/CharacterDetailsPanel.css`

**Changes:**
- Add `color: null` to `DEFAULT_CHARACTER` in `App.jsx`
- `CharacterSlot.jsx`: when `character.color` is set, apply it as a colored ring around `.portrait-container`:
  - Use inline style `box-shadow: 0 0 0 3px {color}, 0 0 8px {color}40` for a glowing ring effect
  - The portrait container already has `border-radius: 50%` and a dashed border — the ring replaces/overlays the default border when a color is set
- `CharacterDetailsPanel.jsx`: add a "Character Colour" row in the panel header area (below portrait)
  - `<input type="color">` native color picker, styled to fit the gothic aesthetic
  - Label: "Character Colour"
  - Shows current color swatch; clicking opens browser color picker
  - "Clear" button to remove color (sets back to null)
- Pass `onUpdate` through to update the character's `color` field (already works via existing `onUpdate` prop pattern)

---

## 5. New Fortunes Tab

**New files:** `src/components/Fortunes.jsx`, `src/components/Fortunes.css`
**Modified files:** `src/components/TabNavigation.jsx`, `src/App.jsx`

### Image Setup
Copy the 5 card images from `sources/` to `public/cards/`:
- `public/cards/wizard.png` (from `180-dnd_tarokka_wizard.png`)
- `public/cards/marionette.png` (from `165-dnd_tarokka_marionette.png`)
- `public/cards/bishop.png` (from `208-dnd_tarokka_bishop.png`)
- `public/cards/mists.png` (from `166-dnd_tarokka_mists.png`)
- `public/cards/myrmidon.png` (from `175-dnd_tarokka_myrmidon.png`)

### Tab
In `TabNavigation.jsx`, add `{ id: 'fortunes', label: 'Fortunes' }` between `timeline` and `characters` in the `TABS` array.

### Card Data (hard-coded in `Fortunes.jsx`)
```javascript
const FORTUNE_CARDS = [
  {
    id: 'wizard',
    title: 'The Wizard',
    image: '/cards/wizard.png',
    meaning: 'This card tells of history. Knowledge of the ancient will help you better understand your enemy.',
    clue: 'Look for a wizard\'s tower on a lake. Let the wizard\'s name and servant guide you to that which you seek.'
  },
  {
    id: 'marionette',
    title: 'The Marionette',
    image: '/cards/marionette.png',
    meaning: 'Your enemy is a creature of darkness, whose powers are beyond mortality. This card will lead you to him!',
    clue: 'Look to great heights. Find the beating heart of the castle. He waits nearby.'
  },
  {
    id: 'bishop',
    title: 'The Bishop',
    image: '/cards/bishop.png',
    meaning: 'This is a card of power and strength. It tells of a weapon of vengeance: a sword of sunlight.',
    clue: 'What you seek lies in a pile of treasure, beyond a set of amber doors.'
  },
  {
    id: 'mists',
    title: 'The Mists',
    image: '/cards/mists.png',
    meaning: 'This card sheds light on one who will help you greatly in the battle against darkness.',
    clue: 'A Vistana wanders this land alone, searching for her mentor. She does not stay in one place for long. Seek her out at Saint Markovia\'s abbey, near the mists.'
  },
  {
    id: 'myrmidon',
    title: 'The Myrmidon',
    image: '/cards/myrmidon.png',
    meaning: 'This card tells of a powerful force for good and protection, a holy symbol of great hope.',
    clue: 'Look for a den of wolves in the hills overlooking a mountain lake. The treasure belongs to Mother Night.'
  }
]
```

### Layout
- 5 cards in a responsive CSS grid: `repeat(auto-fill, minmax(280px, 1fr))`
- Each card:
  - Card image at top (portrait crop, styled like a tarokka card with gothic border)
  - Card title (font-heading, gold)
  - "Meaning" label + italic text
  - "Clue" label + text (slightly muted)
  - Divider
  - "DM Notes" label + `<textarea>` (auto-resize, same style as character details panel)
- Notes are editable and persist in state

### State & Persistence
- `App.jsx`: new state `fortuneNotes` via `useLocalStorage('strahd-fortune-notes', {})` — object keyed by card id
- Pass `fortuneNotes` and `onFortuneNoteChange(cardId, text)` as props to `Fortunes.jsx`

---

## 6. Data Integrity — Export/Import v2.2

**Files:** `src/App.jsx` (handleExportData, handleImportData)

**Export changes:**
- Bump `version` from `'2.1'` to `'2.2'`
- Add `fortuneNotes` to export `data` object
- `characters` already includes the new `color` field (it's part of character objects)
- `events` already includes the new `order` field (it's part of event objects)

**Import changes (backward compatible):**
- Add `if (data.fortuneNotes) setFortuneNotes(data.fortuneNotes)` to `handleImportData`
- Character `color` and event `order` fields will be `undefined` in old backups — components handle `null`/`undefined` gracefully (color: no ring shown, order: falls back to id)

---

## File Summary

| File | Action |
|------|--------|
| `src/components/TabNavigation.jsx` | Add fortunes tab |
| `src/components/TabNavigation.css` | Red active tab, visual connection |
| `src/components/WeatherForecast.jsx` | Equal widths, click-to-edit day |
| `src/components/WeatherForecast.css` | Remove responsive grid breakpoints |
| `src/components/Timeline.jsx` | Selected day state, render DayEventsPanel |
| `src/components/Timeline.css` | Selected day circle style |
| `src/components/DayEventsPanel.jsx` | New — rich event list with reordering |
| `src/components/DayEventsPanel.css` | New — panel styling |
| `src/components/CharacterSlot.jsx` | Colored portrait ring |
| `src/components/CharacterSlot.css` | Ring styles |
| `src/components/CharacterDetailsPanel.jsx` | Color picker |
| `src/components/CharacterDetailsPanel.css` | Color picker styles |
| `src/components/Fortunes.jsx` | New — fortunes tab component |
| `src/components/Fortunes.css` | New — card layout styling |
| `src/App.jsx` | New tab, fortuneNotes state, export/import v2.2, event order migration |
| `public/cards/*.png` | Copy 5 card images from sources/ |

---

## Verification

1. **Tabs:** Active tab shows red background; clicking between all 4 tabs renders correct content
2. **Forecast:** All 7 day cards same width at any viewport; clicking a day shows dropdown; selecting new weather updates that day only
3. **Timeline:** Clicking a day populates the events panel below; up/down buttons reorder events; panel shows "no events" gracefully; Add Event pre-fills date
4. **Characters:** Color picker in details panel; portrait gets colored ring; clearing color removes ring
5. **Fortunes:** All 5 cards display with image, text, and editable notes; notes persist on reload
6. **Backup:** Export produces v2.2 JSON with fortuneNotes; importing a v2.1 backup restores all data without errors; importing v2.2 backup restores fortuneNotes and character colors
