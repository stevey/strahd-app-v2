import { MONTHS } from '../data/calendar';
import { getEventTypeColor, getEventTypeIcon, EVENT_TYPES } from '../data/eventTypes';
import { getWeatherById } from '../data/weather';
import './DayEventsPanel.css';

export default function DayEventsPanel({ selectedDay, selectedDate, events, onReorder, onEditEvent, onDeleteEvent, onAddEvent }) {
  if (selectedDay === null || selectedDay === undefined) return null;

  const sortedEvents = [...events].sort((a, b) => (a.order ?? parseInt(a.id)) - (b.order ?? parseInt(b.id)));

  const monthName = MONTHS[selectedDate.month].name;
  const dayNum = selectedDate.day + 1;
  const eventCount = events.length;

  return (
    <div className="day-events-panel">
      <div className="dep-header">
        <h3 className="dep-title">
          {dayNum} {monthName}, {selectedDate.year} BR
          <span className="dep-count">{eventCount} event{eventCount !== 1 ? 's' : ''}</span>
        </h3>
        <button className="dep-add-btn" onClick={() => onAddEvent(selectedDate)}>
          ＋ Add Event
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="dep-empty">No events recorded for this day</div>
      ) : (
        <div className="dep-list">
          {sortedEvents.map((event, idx) => {
            const color = getEventTypeColor(event.type);
            const icon = getEventTypeIcon(event.type);
            const weather = event.weatherId ? getWeatherById(event.weatherId) : null;
            const isFirst = idx === 0;
            const isLast = idx === sortedEvents.length - 1;

            return (
              <div key={event.id} className="dep-event-row">
                <div className="dep-type-badge" style={{ backgroundColor: color }}>
                  {icon}
                </div>
                <div className="dep-event-info">
                  <div className="dep-event-title">
                    {event.time && (
                      <span className="dep-event-time">{event.time.hour} {event.time.ampm}</span>
                    )}
                    {event.title || 'Untitled Event'}
                  </div>
                  {event.description && (
                    <div className="dep-event-desc">{event.description}</div>
                  )}
                </div>
                {weather && (
                  <div className="dep-weather" title={weather.name}>{weather.icon}</div>
                )}
                <div className="dep-reorder">
                  <button
                    className="dep-reorder-btn"
                    onClick={() => onReorder(event.id, 'up')}
                    disabled={isFirst}
                    title="Move up"
                  >▲</button>
                  <button
                    className="dep-reorder-btn"
                    onClick={() => onReorder(event.id, 'down')}
                    disabled={isLast}
                    title="Move down"
                  >▼</button>
                </div>
                <div className="dep-actions">
                  <button className="dep-edit-btn" onClick={() => onEditEvent(event)}>Edit</button>
                  <button className="dep-delete-btn" onClick={() => onDeleteEvent(event.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
