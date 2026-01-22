# Curse of Strahd DM Tracker - Implementation Plan

## Overview
Build a React + Vite webapp for tracking a D&D "Curse of Strahd" campaign with time tracking, weather, lunar cycles, and character management. All data persists to localStorage.

## Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: CSS with CSS custom properties for theming
- **Persistence**: localStorage with JSON serialization
- **No external UI libraries** - keeping it lightweight

## Features & Components

### 1. Time Tracking (Barovian Calendar)
- Use Forgotten Realms calendar: 12 months × 30 days = 360 days/year
- Months: Hammer, Alturiak, Ches, Tarsakh, Mirtul, Kythorn, Flamerule, Eleasis, Eleint, Marpenoth, Uktar, Nightal
- Display: Current day, month, year, and day of week
- Controls: Advance day, advance week, reset, manual date set

### 2. Weather System
- **Weather types** (Barovia-appropriate):
  - Fog (common), Heavy Fog, Overcast, Light Rain, Heavy Rain, Thunderstorm, Snow, Blizzard, Gloomy (default), Clear (rare)
- **Weighted random generation**: Gloomy weather heavily favored, clear weather rare
- **Manual override**: Click to cycle through options or select from dropdown
- Weather displayed with atmospheric icon/text

### 3. Lunar Cycle
- 8 moon phases over 28-day cycle:
  - New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent
- Auto-calculated based on current day
- Visual moon phase indicator (CSS-based)
- Important for werewolf/vampire encounters

### 4. Character Tracking (8 Slots)
Each slot contains:
- **Name**: Text input
- **Conditions**: Checkboxes (Blinded, Charmed, Cursed, Frightened, Poisoned, Exhausted, Custom)
- **Notes**: Free-form textarea

### 5. Dark Gothic Theme
- Dark background (#1a1a1a / #0d0d0d)
- Blood red accents (#8b0000 / #660000)
- Gothic serif font (Cinzel or similar from Google Fonts)
- Subtle fog/mist background effect
- Parchment-style panels with dark borders

## File Structure
```
strahd-app-v1/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css          # Global styles & theme
│   ├── components/
│   │   ├── Calendar.jsx   # Time tracking
│   │   ├── Weather.jsx    # Weather system
│   │   ├── MoonPhase.jsx  # Lunar cycle
│   │   └── CharacterSlot.jsx  # Character tracking
│   ├── hooks/
│   │   └── useLocalStorage.js  # Persistence hook
│   └── data/
│       ├── calendar.js    # Month names, day names
│       └── weather.js     # Weather types & weights
```

## Implementation Steps

### Step 1: Project Setup
- Initialize Vite + React project
- Configure package.json
- Add Google Fonts (Cinzel for headers, Crimson Text for body)

### Step 2: Core Infrastructure
- Create `useLocalStorage` custom hook
- Set up global CSS variables for theming
- Build main App layout (header, 3-column grid)

### Step 3: Calendar Component
- Implement Barovian calendar logic
- Day/week advancement functions
- Display current date with gothic styling

### Step 4: Weather Component
- Create weather type definitions with weights
- Random weather generator function
- Manual override UI
- Weather icon/description display

### Step 5: Moon Phase Component
- Calculate moon phase from day count
- CSS-based moon visualization
- Phase name display

### Step 6: Character Slots
- Build reusable CharacterSlot component
- Condition checkboxes
- Notes textarea
- Render 8 instances in grid

### Step 7: Persistence & Polish
- Wire all state to localStorage
- Add atmospheric CSS effects
- Final styling pass

## Verification
1. Run `npm install && npm run dev`
2. Open http://localhost:5173
3. Test time advancement - verify calendar updates
4. Test weather - verify random generation and manual override
5. Test moon phase - verify changes with day advancement
6. Add character data - verify persistence after page refresh
7. Check responsive layout on different screen sizes
