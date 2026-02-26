import { useState } from 'react';
import { getWeatherById, WEATHER_TYPES } from '../data/weather';
import { advanceDate, getDayOfWeek, MONTHS } from '../data/calendar';
import './WeatherForecast.css';

export default function WeatherForecast({ forecast, currentDate, onRegenerate, onForecastDayChange }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleCardClick = (index) => {
    setSelectedDay(prev => prev === index ? null : index);
  };

  const handleWeatherSelect = (e, dayIndex) => {
    e.stopPropagation();
    onForecastDayChange(dayIndex, e.target.value);
    setSelectedDay(null);
  };

  return (
    <div className="weather-forecast">
      <div className="forecast-header">
        <h3 className="forecast-title">7-Day Forecast</h3>
        <button onClick={onRegenerate} className="forecast-regenerate-btn">
          Regenerate
        </button>
      </div>

      <div className="forecast-grid-wrapper">
        <div className="forecast-grid">
          {forecast.map((day, index) => {
            const futureDate = advanceDate(currentDate, day.dayOffset);
            const weather = getWeatherById(day.weatherId);
            const month = MONTHS[futureDate.month];
            const isToday = day.dayOffset === 0;
            const isSelected = selectedDay === index;

            return (
              <div
                key={day.dayOffset}
                className={`forecast-card ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="forecast-day-label">
                  {isToday ? 'Today' : `Day ${day.dayOffset + 1}`}
                </div>
                <div className="forecast-date">
                  {futureDate.day + 1} {month.name.slice(0, 3)}
                </div>
                <div className="forecast-weather-icon">{weather.icon}</div>
                {isSelected ? (
                  <select
                    className="forecast-weather-select"
                    value={day.weatherId}
                    onChange={(e) => handleWeatherSelect(e, index)}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  >
                    {WEATHER_TYPES.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="forecast-weather-name">{weather.name}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
