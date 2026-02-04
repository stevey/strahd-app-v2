import { useState } from 'react';
import { createPortal } from 'react-dom';
import { MONTHS, getDayOfWeek } from '../data/calendar';
import { getWeatherById } from '../data/weather';
import { getMoonPhase, getDaysUntilFullMoon } from './MoonPhase';
import './EnvironmentSummary.css';

export default function EnvironmentSummary({ date, weatherId, cardDraw }) {
  const [isOpen, setIsOpen] = useState(false);

  const dayOfWeek = getDayOfWeek(date);
  const month = MONTHS[date.month];
  const weather = getWeatherById(weatherId);
  const moonPhase = getMoonPhase(date);
  const daysUntilFull = getDaysUntilFullMoon(date);

  const modal = isOpen ? createPortal(
    <div className="env-overlay" onClick={() => setIsOpen(false)}>
      <div className="env-modal" onClick={(e) => e.stopPropagation()}>
        {/* Ornamental corner accents */}
        <div className="env-corner env-corner-tl" />
        <div className="env-corner env-corner-tr" />
        <div className="env-corner env-corner-bl" />
        <div className="env-corner env-corner-br" />

        <div className="env-title">Barovia</div>
        <div className="env-rule" />

        {/* Date */}
        <div className="env-row">
          <div className="env-label">Date</div>
          <div className="env-date-value">
            <span className="env-day-name">{dayOfWeek}</span>
            <span className="env-date-full">{date.day + 1} {month.name}, {date.year} BR</span>
            <span className="env-date-nickname">{month.nickname}</span>
          </div>
        </div>

        <div className="env-divider" />

        {/* Weather */}
        <div className="env-row">
          <div className="env-label">Weather</div>
          <div className="env-weather-value">
            <span className="env-weather-icon">{weather.icon}</span>
            <span className="env-weather-name">{weather.name}</span>
            <span className="env-weather-desc">{weather.description}</span>
          </div>
        </div>

        <div className="env-divider" />

        {/* Moon Phase */}
        <div className="env-row">
          <div className="env-label">Moon</div>
          <div className="env-moon-value">
            <span className="env-moon-icon">{moonPhase.icon}</span>
            <span className="env-moon-name">{moonPhase.name}</span>
            <span className="env-moon-until">
              {daysUntilFull === 0
                ? 'The full moon rises tonight'
                : `${daysUntilFull} day${daysUntilFull !== 1 ? 's' : ''} until full moon`
              }
            </span>
          </div>
        </div>

        <div className="env-divider" />

        {/* Session Card */}
        <div className="env-row">
          <div className="env-label">Session Card</div>
          <div className="env-card-value">
            <span className={`env-card-drawn ${cardDraw === '+5' ? 'special' : ''}`}>
              {cardDraw || 'None'}
            </span>
          </div>
        </div>

        <div className="env-rule" />
        <div className="env-tagline">May the mists guide your path</div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        className="admin-btn env-btn"
        onClick={() => setIsOpen(true)}
        title="View current environment summary"
      >
        Environment
      </button>
      {modal}
    </>
  );
}
