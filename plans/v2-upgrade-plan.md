# Curse of Strahd DM Tracker - V2 Upgrade Plan

## Overview
Enhanced version of the Barovian campaign tracker with improved character portraits, timeline tracking, weather history, 7-day forecast, and restructured character information blocks.

## V2 Feature Additions

### 1. Character Portrait Upload
**Goal**: Add circular portrait images (100px × 100px) for each PC with in-place upload capability

**Implementation**:
- Add portrait field to character data model (store as base64 data URL)
- File input with drag-and-drop support
- Image processing: resize/crop to 100px circular format
- Display circular portrait at top of character slot
- Click portrait to change/upload new image
- Clear portrait option

**Technical Approach**:
- Use HTML5 FileReader API to convert uploaded PNG to base64
- Canvas API to resize/crop image to 100×100
- CSS: `border-radius: 50%` for circular display
- Store base64 string in localStorage (check size limits ~5MB total)

---

### 2. Timeline Event Tracker
**Goal**: Track multiple events per day, integrated with calendar, compact visual display

**Design Inspiration Research**:
- Horizontal timeline with date markers
- Event dots/badges on timeline (count indicator if multiple per day)
- Hover/click to show event details in tooltip or expandable card
- Color coding for event types (combat, story, NPC interaction, location discovery)

**Features**:
- Add event modal: date, title, description, category/type
- Visual timeline component (horizontal scroll, shows ±14 days from current)
- Event markers clickable with hover tooltips
- Filter by event type
- List view option (chronological, grouped by day)

**Data Structure**:
```javascript
{
  date: { day, month, year },
  title: string,
  description: string,
  type: 'combat' | 'story' | 'npc' | 'location' | 'other',
  weatherId: string // capture weather when event created
}
```

**UI Components**:
- `Timeline.jsx` - horizontal visual timeline
- `TimelineEvent.jsx` - event marker/tooltip
- `EventModal.jsx` - add/edit event form
- `EventsList.jsx` - alternative list view

---

### 3. Weather History Integration
**Goal**: Automatic weather logging when days advance, viewable in timeline

**Implementation**:
- When date advances, capture current weather and store in history
- Link weather history to timeline events
- Display weather icon/description in event tooltips
- Separate weather history view (calendar-style grid showing past weather)

**Data Structure**:
```javascript
weatherHistory: [
  { date: { day, month, year }, weatherId: string }
]
```

**Features**:
- Auto-save weather when advancing days
- Weather calendar view (grid showing icons for past 30 days)
- Include weather in timeline event cards
- Filter timeline by weather type

---

### 4. 7-Day Weather Forecast
**Goal**: Generate and display upcoming 7-day Barovian weather forecast

**UI Design**:
- Horizontal card layout showing 7 days
- Each day: date, day-of-week, weather icon, weather name
- Visual temperature/severity indicator
- "Regenerate Forecast" button (replaces old "Random Weather")
- Forecast advances automatically when day advances

**Implementation**:
- Generate array of 7 weather predictions
- Store forecast in state with generation date
- When date advances, shift forecast (drop day 1, generate new day 7)
- Manual regenerate clears and creates new 7-day forecast
- Visual card grid with gothic styling

**Data Structure**:
```javascript
weatherForecast: [
  { offset: 0-6, weatherId: string }
]
forecastGeneratedDate: { day, month, year }
```

---

### 5. Character Slot Restructure
**Goal**: Replace condition checkboxes with 4 flexible text areas

**New Layout**:
```
┌─────────────────────────────┐
│  [Portrait]  Character Name │
├─────────────────────────────┤
│ CONDITIONS: [text area]     │
├─────────────────────────────┤
│ DARK GIFTS: [text area]     │
├─────────────────────────────┤
│ FORTUNE: [text area]        │
├─────────────────────────────┤
│ NOTES: [text area]          │
└─────────────────────────────┘
```

**Updated Data Model**:
```javascript
{
  name: string,
  portrait: string, // base64 data URL
  conditions: string, // free text
  darkGifts: string,
  fortune: string,
  notes: string
}
```

**Features**:
- Auto-expanding textareas (minimum 2 rows, max 8 rows)
- Label each section clearly
- Maintain slot number and clear button
- Portrait at top-left, name to the right

---

## Updated File Structure

```
strahd-app-v1/
├── src/
│   ├── components/
│   │   ├── Calendar.jsx           # Enhanced with timeline integration
│   │   ├── Weather.jsx            # Now shows 7-day forecast
│   │   ├── WeatherForecast.jsx    # NEW: 7-day forecast display
│   │   ├── WeatherHistory.jsx     # NEW: Weather calendar history view
│   │   ├── MoonPhase.jsx          # Unchanged
│   │   ├── CharacterSlot.jsx      # MAJOR UPDATE: Portrait + 4 text areas
│   │   ├── Timeline.jsx           # NEW: Visual timeline
│   │   ├── TimelineEvent.jsx      # NEW: Event marker/tooltip
│   │   ├── EventModal.jsx         # NEW: Add/edit events
│   │   └── EventsList.jsx         # NEW: List view of events
│   ├── utils/
│   │   └── imageUtils.js          # NEW: Image resize/crop functions
│   ├── data/
│   │   ├── eventTypes.js          # NEW: Event type definitions
│   │   └── ... (existing files)
```

---

## Implementation Steps

### Phase 1: Character Portraits (Est: Simple)
1. Update character data model to include `portrait` field
2. Create image upload utility functions (resize, crop, convert to base64)
3. Update CharacterSlot.jsx:
   - Add portrait circle at top
   - File input with drag-and-drop
   - Preview and clear functionality
4. Test localStorage capacity with 8 portraits

### Phase 2: Character Slot Restructure (Est: Simple)
1. Update character data model (remove old conditions array, add 4 text fields)
2. Redesign CharacterSlot.jsx layout:
   - Portrait + name header
   - 4 labeled text areas
3. Update CharacterSlot.css for new layout
4. Migration: clear old condition data on first load (or convert to text)

### Phase 3: 7-Day Weather Forecast (Est: Moderate)
1. Create WeatherForecast.jsx component
2. Add forecast generation logic to weather.js
3. Update App.jsx:
   - Add forecastState
   - Generate forecast on mount
   - Advance/regenerate forecast logic
4. Update Weather.jsx or create separate widget
5. Style forecast as horizontal card layout

### Phase 4: Timeline Event Tracker (Est: Complex)
1. Design event data structure and types
2. Create EventModal.jsx (add/edit form)
3. Create Timeline.jsx (horizontal visual timeline):
   - Calculate date range (current ± 14 days)
   - Render date markers
   - Render event markers with counts
4. Create TimelineEvent.jsx (tooltip/card on hover)
5. Create EventsList.jsx (alternative list view)
6. Add event management to App.jsx state
7. Integrate with Calendar (add event button)

### Phase 5: Weather History (Est: Moderate)
1. Update date advance logic to auto-save weather
2. Create weatherHistory state in App.jsx
3. Create WeatherHistory.jsx component:
   - Calendar grid view of past weather
   - Show last 30-60 days
4. Integrate weather data into timeline events
5. Add weather filter to timeline

### Phase 6: UI/UX Polish
1. Timeline responsiveness and scroll behavior
2. Event modal validation and UX
3. Forecast visual design and animations
4. Portrait upload feedback (loading, errors)
5. Test all features together
6. Performance optimization (localStorage size, image compression)

---

## Technical Considerations

### LocalStorage Limits
- Browser limit: ~5-10MB
- 8 portraits @ 100×100 PNG (base64): ~50KB each = 400KB
- Weather history: ~1KB per year
- Timeline events: ~0.5KB each (200 events = 100KB)
- Total estimate: < 1MB (safe margin)

### Image Optimization
- Use JPEG format at 80% quality for smaller base64
- Compress to max 20KB per portrait
- Provide visual feedback during upload/processing

### Performance
- Lazy load timeline events (render visible range only)
- Debounce text area changes before localStorage save
- Optimize weather history rendering (virtual scrolling if needed)

### Accessibility
- ARIA labels for portrait upload
- Keyboard navigation for timeline
- Screen reader support for event tooltips
- Color contrast for event type indicators

---

## UI/UX Design Notes

### Timeline Design Inspiration
**Horizontal Scrollable Timeline** (Recommended):
- Current day centered, highlighted
- Past days to left (faded/darker)
- Future days to right (lighter)
- Event dots/badges above dates
- Count indicator on dots (e.g., "3" if 3 events that day)
- Hover shows event summary tooltip
- Click expands full event card

**Alternative: Compact List View**:
- Chronological list grouped by date
- Expandable accordion per day
- Filter sidebar (event type, date range)
- Search events by title/description

### Weather Forecast Visual
- Horizontal 7-card layout (day 1-7)
- Each card:
  - Day name
  - Date (e.g., "15 Marpenoth")
  - Large weather icon
  - Weather name
  - Small description text
- Gothic card styling with subtle hover effects
- "Regenerate" button below cards

### Character Portrait UX
- Dotted circle placeholder when empty
- "Upload Portrait" text/icon in center
- Drag-and-drop zone (entire circle)
- Hover: semi-transparent overlay with "Change" text
- Upload progress indicator
- Error states (file too large, wrong format)

---

## Migration Strategy

### Data Model Changes
1. Detect v1 data structure on app load
2. If old structure detected:
   - Convert condition checkboxes to comma-separated text in "CONDITIONS" field
   - Initialize empty strings for darkGifts, fortune
   - Set migration flag in localStorage
3. Clear old v1 data after successful migration

### Backward Compatibility
- V2 won't break existing localStorage data
- Graceful handling of missing fields (default to empty strings)
- Optional: Export v1 data before upgrading

---

## Testing Checklist

- [ ] Portrait upload (PNG, drag-and-drop, file input)
- [ ] Portrait resize/crop (100×100, circular display)
- [ ] Portrait clear/replace
- [ ] Character slot 4 text areas (auto-expand, save/load)
- [ ] Timeline event creation (all event types)
- [ ] Timeline visual display (multiple events per day)
- [ ] Timeline tooltips and event cards
- [ ] Timeline date range navigation
- [ ] Weather forecast generation (7 days)
- [ ] Weather forecast advance with calendar
- [ ] Weather forecast manual regenerate
- [ ] Weather history auto-save on date advance
- [ ] Weather history calendar view
- [ ] Weather integration in timeline events
- [ ] LocalStorage persistence (all new features)
- [ ] LocalStorage size limits (8 portraits + history + events)
- [ ] Responsive design (timeline, forecast, character slots)
- [ ] Accessibility (keyboard nav, ARIA labels)

---

## Future Considerations (V3?)

- Export campaign data (JSON download)
- Import campaign data
- Random encounter generator
- NPC tracker with portraits
- Location/map tracker
- Session notes with rich text editor
- Dice roller integration
- Print-friendly view for session prep
