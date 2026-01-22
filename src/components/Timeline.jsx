import { useState, useRef, useEffect } from 'react';
import { getTotalDays, dateFromTotalDays, MONTHS, getDayOfWeek } from '../data/calendar';
import { getEventTypeColor, getEventTypeIcon } from '../data/eventTypes';
import { getWeatherById } from '../data/weather';
import './Timeline.css';

const DAYS_TO_SHOW = 21; // Show 3 weeks at a time
const NAVIGATION_STEP = 7; // Navigate by 1 week

export default function Timeline({ events, currentDate, currentWeatherId, onEventClick, onAddEvent, weatherHistory = [] }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredWeather, setHoveredWeather] = useState(null);
  const [viewOffset, setViewOffset] = useState(0); // Days offset from today
  const scrollRef = useRef(null);

  const currentTotalDays = getTotalDays(currentDate);
  const viewCenterDay = currentTotalDays + viewOffset;

  // Reset view to today when currentDate changes
  useEffect(() => {
    setViewOffset(0);
  }, [currentDate]);

  // Calculate the visible range centered on viewCenterDay
  const halfRange = Math.floor(DAYS_TO_SHOW / 2);
  let startDay = viewCenterDay - halfRange;
  let endDay = viewCenterDay + halfRange;

  // Generate days array for current view
  const days = [];
  for (let i = startDay; i <= endDay; i++) {
    days.push(i);
  }

  // Navigation functions
  const navigateBack = () => setViewOffset(prev => prev - NAVIGATION_STEP);
  const navigateForward = () => setViewOffset(prev => prev + NAVIGATION_STEP);
  const goToToday = () => setViewOffset(0);

  // Check if today is visible in current view
  const isTodayVisible = currentTotalDays >= startDay && currentTotalDays <= endDay;

  // Get the date range for display
  const startDate = dateFromTotalDays(startDay);
  const endDate = dateFromTotalDays(endDay);

  // Group events by day
  const eventsByDay = {};
  events.forEach(event => {
    const eventDay = getTotalDays(event.date);
    if (!eventsByDay[eventDay]) {
      eventsByDay[eventDay] = [];
    }
    eventsByDay[eventDay].push(event);
  });

  // Create weather history lookup
  const weatherByDay = {};
  weatherHistory.forEach(entry => {
    weatherByDay[entry.totalDays] = entry.weatherId;
  });

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <div className="timeline-title-row">
          <h2>Campaign Timeline</h2>
          <span className="timeline-range">
            {startDate.day + 1} {MONTHS[startDate.month].name.slice(0, 3)} — {endDate.day + 1} {MONTHS[endDate.month].name.slice(0, 3)}, {endDate.year} BR
          </span>
        </div>
        <div className="timeline-controls">
          <button onClick={navigateBack} className="nav-btn" title="Previous week">
            ← Week
          </button>
          <button
            onClick={goToToday}
            className={`nav-btn today-btn ${!isTodayVisible ? 'highlight' : ''}`}
            title="Go to today"
          >
            Today
          </button>
          <button onClick={navigateForward} className="nav-btn" title="Next week">
            Week →
          </button>
          <button onClick={() => onAddEvent(currentDate)} className="add-event-btn">
            + Add Event
          </button>
        </div>
      </div>

      <div className="timeline-scroll" ref={scrollRef}>
        <div className="timeline-track">
          {days.map(day => {
            const date = dateFromTotalDays(day);
            const isToday = day === currentTotalDays;
            const isPast = day < currentTotalDays;
            const dayEvents = eventsByDay[day] || [];
            // Use current weather for today, otherwise look up from history
            const dayWeatherId = isToday ? currentWeatherId : weatherByDay[day];
            const dayWeather = dayWeatherId ? getWeatherById(dayWeatherId) : null;

            return (
              <div
                key={day}
                className={`timeline-day ${isToday ? 'today' : ''} ${isPast ? 'past' : 'future'}`}
              >
                <div
                  className="day-marker"
                  onClick={() => onAddEvent(date)}
                  style={{ cursor: 'pointer' }}
                  title="Click to add event on this date"
                >
                  {dayWeather && (
                    <div
                      className="day-weather-icon"
                      onMouseEnter={() => setHoveredWeather({ weather: dayWeather, date })}
                      onMouseLeave={() => setHoveredWeather(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {dayWeather.icon}
                    </div>
                  )}
                  <div className="day-date">{date.day + 1}</div>
                  <div className="day-month">{MONTHS[date.month].name.slice(0, 3)}</div>
                </div>

                {dayEvents.length > 0 && (
                  <div className="day-events">
                    {dayEvents.map((event, idx) => (
                      <div
                        key={event.id || idx}
                        className="event-marker"
                        style={{ backgroundColor: getEventTypeColor(event.type) }}
                        onMouseEnter={() => setHoveredEvent(event)}
                        onMouseLeave={() => setHoveredEvent(null)}
                        onClick={() => onEventClick(event)}
                        title={event.title}
                      >
                        <span className="event-icon">{getEventTypeIcon(event.type)}</span>
                      </div>
                    ))}
                    {dayEvents.length > 1 && (
                      <div className="event-count">+{dayEvents.length - 1}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {hoveredEvent && (
        <div className="event-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-icon">{getEventTypeIcon(hoveredEvent.type)}</span>
            <span className="tooltip-title">{hoveredEvent.title}</span>
          </div>
          {hoveredEvent.description && (
            <div className="tooltip-description">{hoveredEvent.description}</div>
          )}
          <div className="tooltip-date">
            {hoveredEvent.date.day + 1} {MONTHS[hoveredEvent.date.month].name}, {hoveredEvent.date.year} BR
          </div>
        </div>
      )}

      {hoveredWeather && (
        <div className="weather-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-icon">{hoveredWeather.weather.icon}</span>
            <span className="tooltip-title">{hoveredWeather.weather.name}</span>
          </div>
          <div className="tooltip-description">{hoveredWeather.weather.description}</div>
          <div className="tooltip-date">
            {hoveredWeather.date.day + 1} {MONTHS[hoveredWeather.date.month].name}, {hoveredWeather.date.year} BR
          </div>
        </div>
      )}
    </div>
  );
}
