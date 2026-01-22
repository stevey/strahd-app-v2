import { getWeatherById } from '../data/weather';
import { advanceDate, getDayOfWeek, MONTHS } from '../data/calendar';
import './WeatherForecast.css';

export default function WeatherForecast({ forecast, currentDate, onRegenerate }) {
  return (
    <div className="weather-forecast">
      <div className="forecast-header">
        <h3 className="forecast-title">7-Day Forecast</h3>
        <button onClick={onRegenerate} className="forecast-regenerate-btn">
          Regenerate
        </button>
      </div>

      <div className="forecast-grid">
        {forecast.map((day) => {
          const futureDate = advanceDate(currentDate, day.dayOffset);
          const weather = getWeatherById(day.weatherId);
          const dayOfWeek = getDayOfWeek(futureDate);
          const month = MONTHS[futureDate.month];
          const isToday = day.dayOffset === 0;

          return (
            <div
              key={day.dayOffset}
              className={`forecast-card ${isToday ? 'today' : ''}`}
            >
              <div className="forecast-day-label">
                {isToday ? 'Today' : `Day ${day.dayOffset + 1}`}
              </div>
              <div className="forecast-date">
                {futureDate.day + 1} {month.name.slice(0, 3)}
              </div>
              <div className="forecast-weather-icon">{weather.icon}</div>
              <div className="forecast-weather-name">{weather.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
