# Strahd App V2 Refinements - Planning Document

## Current State Summary
The app is a functional Curse of Strahd DM tracker with calendar, weather, moon phases, 8 character slots, timeline events, and data persistence via localStorage.

---

## Feature 1: Tab-Based Navigation

### Problem
Page is too long, requires scrolling during sessions.

### Solution
Add a tab system to organize content into 3 views:

| Tab | Contents |
|-----|----------|
| **Dashboard** | Calendar, Weather (current + forecast), Moon Phase |
| **Timeline** | Event timeline with full width |
| **Characters** | All 8 character slots |

### Implementation Approach
- Add a `TabNavigation` component with 3 tabs at the top
- Track active tab in state (persist to localStorage so it remembers between sessions)
- Conditionally render content based on active tab
- Keep Admin Controls visible on all tabs (footer or header)

### UI Considerations
- Tab bar should be compact, not take up much vertical space
- Consider keyboard shortcuts? (1, 2, 3 to switch tabs)
- Mobile: tabs should still work well on smaller screens

---

## Feature 2: Random Barovian Name Generator

### Problem
Need to generate NPC names on the fly during sessions.

### Solution
New module that generates random Barovian names from the official list.

### Name Data (from sources/BAROVIAN-NAMES.txt)
- **42 male first names**
- **36 female first names**
- **~40 family names** (with masculine/feminine variants like Antonovich/Antonova)

### Implementation Approach
- Create `src/data/barovianNames.js` with parsed name arrays
- Create `NameGenerator.jsx` component
- UI:
  - "Generate Male Name" / "Generate Female Name" buttons
  - Display: "[First] [Family]" with correct gender agreement
  - "Copy" button for quick copy to clipboard
  - Collapsible "Show history..." link revealing last ~10 generated names
  - History persists to localStorage

### UI Placement
- Module on Dashboard tab (alongside Calendar, Weather, Moon Phase)

---

## Final Decisions

| Question | Answer |
|----------|--------|
| Tab names | Dashboard / Timeline / Characters |
| Name generator placement | Dashboard tab module |
| Name history | Collapsible "Show history..." with last ~10 names |
| Admin controls | Bottom of each tab |

---

## Feature 3: Death Counter (Per Character)

### Problem
Characters die frequently in Curse of Strahd. Need an easy way to track deaths per character.

### Solution
Add a skull-themed death counter to each character slot.

### UI Design
- Row of skull icons (filled = deaths, or single skull + count number)
- Increment (+) / decrement (-) buttons
- Displays prominently in character slot header (near portrait/name)
- Gothic styling: skull icon, maybe blood-red accent

### Chosen Design: Option A with Confirmation
- Display: Skull icon + death count (e.g., `💀 3`)
- **Click skull** → confirmation dialog ("Record a death for [Character]?")
- **Confirm** → increment count
- Skull is clickable/hoverable (cursor pointer, subtle hover effect)

### Decrement
- **Right-click** skull to decrement (no confirmation needed, quick fix for misclicks)
- Won't go below 0

### Implementation
- Add `deaths` field to character data structure (default: 0)
- Add to CharacterSlot.jsx UI (in header area near portrait/name)
- Confirmation modal or browser confirm()
- Persists with existing character localStorage

---

## Implementation Order

1. **Tab Navigation** - restructure App.jsx, create TabNav component
2. **Name Generator** - data file, component, localStorage for history
3. **Death Counter** - add to CharacterSlot component

---

## Design Principles
- **Tight & efficient** - no wasted space, compact layouts
- Minimal padding/margins
- Information-dense but readable
- No unnecessary labels or decorations
- Quick interactions, minimal clicks

---

## Files to Create/Modify

### New Files
- `src/components/TabNavigation.jsx` + `.css`
- `src/components/NameGenerator.jsx` + `.css`
- `src/data/barovianNames.js`

### Modified Files
- `src/App.jsx` - add tab state, reorganize layout
- `src/App.css` - tab layout styles
