import { WEATHER_TYPES, getWeatherById, getNextWeather } from '../data/weather';
import WeatherForecast from './WeatherForecast';
import './Weather.css';

export default function Weather({ weatherId, onWeatherChange, forecast, onRegenerateForecast, currentDate, onForecastDayChange }) {
  const weather = getWeatherById(weatherId);

  const handleCycle = () => {
    onWeatherChange(getNextWeather(weatherId));
  };

  const handleSelect = (e) => {
    onWeatherChange(e.target.value);
  };

  return (
    <div className="panel weather">
      <h2 className="panel-header">Current Weather</h2>

      <div className="weather-display" onClick={handleCycle} title="Click to cycle weather">
        <div className="weather-icon">{weather.icon}</div>
        <div className="weather-name">{weather.name}</div>
        <div className="weather-description">{weather.description}</div>
      </div>

      <div className="weather-controls">
        <select value={weatherId} onChange={handleSelect}>
          {WEATHER_TYPES.map(w => (
            <option key={w.id} value={w.id}>{w.icon} {w.name}</option>
          ))}
        </select>
      </div>

      {forecast && (
        <WeatherForecast
          forecast={forecast}
          currentDate={currentDate}
          onRegenerate={onRegenerateForecast}
          onForecastDayChange={onForecastDayChange}
        />
      )}
    </div>
  );
}
