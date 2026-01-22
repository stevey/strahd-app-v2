# V2 Final Updates - Admin & Timeline Improvements

## ✅ Admin Features (Complete)

### 1. Admin Controls Panel
**Location**: Footer, below "May the mists of Barovia shroud your journey"

**Files Created**:
- `src/components/AdminControls.jsx`
- `src/components/AdminControls.css`

**Features**:
- Three discreet buttons in footer
- Minimal styling (semi-transparent, only visible on hover)
- All actions require confirmation before execution

---

### 1.1 Reset Calendar & Weather Data ✅

**Button**: "Reset Calendar/Weather"

**What It Does**:
- Resets calendar to default date (1 Marpenoth, 735 BR)
- Generates new random weather
- Creates new 7-day forecast
- Clears all timeline events
- Clears weather history
- **PRESERVES**: Character data (portraits, conditions, dark gifts, fortune, notes)

**Confirmation Dialog**:
- Warning: "This will reset the calendar, weather, forecast, weather history, and timeline events to defaults."
- Emphasis: "Character data will NOT be affected."
- Strong warning: "This cannot be undone!"
- Buttons: Cancel / Reset Data (red danger button)

**Use Cases**:
- Starting a new campaign
- Resetting after testing
- Clearing old timeline data

---

### 1.2 Export Backup ✅

**Button**: "Export Backup"

**What It Does**:
- Exports ALL data to JSON file
- Includes: characters, calendar, weather, forecast, events, weather history
- File format: `strahd-backup-YYYY-MM-DD.json`
- Automatically downloads to browser's download folder

**Export Format**:
```json
{
  "version": "2.0",
  "exportDate": "2026-01-15T20:30:00.000Z",
  "data": {
    "date": {...},
    "weatherId": "...",
    "forecast": [...],
    "forecastDate": 123456,
    "characters": [...],
    "events": [...],
    "weatherHistory": [...]
  }
}
```

**No Confirmation**: Immediate download

**Use Cases**:
- Regular backups before major changes
- Transferring campaign to another device
- Archiving completed campaigns
- Sharing campaign state with co-DMs

---

### 1.3 Import Backup ✅

**Button**: "Import Backup"

**What It Does**:
- Opens file picker for .json files
- Reads and validates JSON format
- Overwrites ALL current data (including characters)
- Updates app state immediately

**Confirmation Dialog**:
- Warning: "This will overwrite ALL current data including characters, calendar, weather, and events."
- Strong warning: "Current data will be permanently lost!"
- Tip: "Tip: Export a backup first if you want to preserve current data."
- Buttons: Cancel / Import & Overwrite (red danger button)

**Error Handling**:
- Invalid JSON: Alert with error message
- Successful import: Alert confirmation

**Use Cases**:
- Restoring from backup
- Loading archived campaign
- Transferring campaign from another device
- Co-DM synchronization

---

## ✅ Timeline Improvements (Complete)

### 2.1 Dynamic Scroll Range ✅

**Previous Behavior**:
- Always showed ±14 days from current date
- Events outside this range were hidden

**New Behavior**:
- Shows ±14 days from current date (minimum)
- Automatically expands to include ALL saved events
- Adds 2-day buffer before earliest and after latest event
- Timeline scrolls horizontally to show entire range

**Example**:
- Current date: Day 100
- Events on: Day 50, Day 150
- Timeline shows: Day 48 to Day 152 (entire range)

**Benefits**:
- Never lose sight of events
- Easy to scroll through campaign history
- See full timeline span at a glance

---

### 2.2 Weather for Week Advance ✅

**Previous Behavior**:
- Only saved weather for the single day you were on
- Advancing a week saved only 1 weather entry

**New Behavior**:
- When advancing multiple days (e.g., +1 Week = 10 days)
- Saves weather for EVERY day in between
- Uses forecast weather for each day
- All 10 days get weather icons on timeline

**Implementation**:
```javascript
// For each day advanced (e.g., 10 days)
for (let i = 0; i < daysAdvanced; i++) {
  // Save weather from forecast
  weatherHistory.push({
    date: dayDate,
    weatherId: forecastWeatherId,
    totalDays: dayNumber
  });
  // Advance forecast
  forecast = advanceForecast(forecast);
}
```

**Benefits**:
- Complete weather record for time skips
- Useful for reviewing past week/month
- No gaps in weather history
- Timeline shows continuous weather

---

### 2.3 Improved Weather Icon Tooltips ✅

**Enhancements**:

1. **Better Tooltip Text**:
   - Before: Just weather name (e.g., "Gloomy")
   - Now: Full description (e.g., "Weather: Gloomy - Overcast skies with an oppressive atmosphere")

2. **Visual Hover Effect**:
   - Icon scales up 120% on hover
   - Full color (removes grayscale filter)
   - Full opacity (from 80% to 100%)
   - Subtle shadow effect
   - Cursor changes to "help" pointer
   - Smooth transition animation

3. **Better Visibility**:
   - Easier to see which days have weather
   - Quick identification of weather type
   - Hover reveals full details

**CSS**:
```css
.day-weather-icon:hover {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.2);
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
```

---

## Technical Details

### Admin Controls Styling
- Discreet placement in footer
- Low opacity (50%) until hover
- Small font size (0.75rem)
- Uppercase text
- Color-coded on hover:
  - Reset: Blood red
  - Export: Green
  - Import: Orange

### Confirmation Dialogs
- Full-screen overlay with blur backdrop
- Gothic-themed modal
- Blood-red accent borders
- Large, clear warnings
- Two-button layout (Cancel / Confirm)
- Click outside to cancel
- Escape key support (built-in)

### Data Export/Import
- Uses Blob API for file creation
- Creates download link programmatically
- FileReader API for import
- JSON validation on import
- Graceful error handling
- Version tracking in export

### Weather History Enhancement
- Efficient loop for bulk saves
- Uses existing forecast data
- No duplicate entries
- Proper date calculation
- Maintains chronological order

---

## User Workflow Examples

### Workflow 1: Regular Backup
1. Click "Export Backup"
2. File downloads: `strahd-backup-2026-01-15.json`
3. Save to cloud storage / backup drive
4. Continue playing

### Workflow 2: Start Fresh Campaign
1. Click "Reset Calendar/Weather"
2. Confirm in dialog
3. Calendar resets, events cleared
4. Characters remain intact
5. Ready for new campaign

### Workflow 3: Restore from Backup
1. Click "Import Backup"
2. Select backup file
3. Confirm overwrite warning
4. All data restored
5. Continue from saved state

### Workflow 4: Week Time Skip
1. Click "+1 Week" in calendar
2. Calendar advances 10 days
3. Weather saved for all 10 days
4. Forecast advances 10 times
5. Timeline shows all weather icons
6. Hover to see each day's weather

---

## Testing Checklist

### Admin Features
- [x] Reset button shows confirmation
- [x] Reset preserves character data
- [x] Reset clears calendar/weather/events
- [x] Export downloads JSON file
- [x] Export includes all data
- [x] Import shows file picker
- [x] Import shows confirmation
- [x] Import validates JSON
- [x] Import updates all state
- [x] Import error handling

### Timeline
- [x] Timeline expands to show all events
- [x] Week advance saves all weather
- [x] Weather icons appear for all days
- [x] Weather tooltips show full description
- [x] Weather icons scale on hover
- [x] Timeline scrolls horizontally
- [x] Buffer days shown before/after events

---

## Known Behaviors

1. **Reset is permanent**: No undo for reset operation (by design)
2. **Import overwrites**: Import completely replaces data (by design)
3. **Export format**: JSON is human-readable and can be manually edited
4. **Weather generation**: Each day uses forecast weather (weighted random)
5. **Timeline range**: Dynamically calculated each render
6. **Backward time travel**: Moving backward in time doesn't save weather

---

## File Changes Summary

### New Files
- `src/components/AdminControls.jsx`
- `src/components/AdminControls.css`

### Modified Files
- `src/App.jsx` - Added admin handlers, improved weather advance logic
- `src/components/Timeline.jsx` - Dynamic range, improved tooltips
- `src/components/Timeline.css` - Weather icon hover effects

---

**Status**: ✅ All V2 final updates complete!
**App URL**: http://localhost:5173
**Dev Server**: Running (no errors)
