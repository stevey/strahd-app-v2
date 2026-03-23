import { MONTHS, getDayOfWeek, advanceDate, DEFAULT_DATE, DAYS_PER_MONTH } from '../data/calendar';
import './Calendar.css';

export default function Calendar({ date, setDate, onDateChange, time, setTime }) {
  const dayOfWeek = getDayOfWeek(date);
  const month = MONTHS[date.month];

  const handleAdvanceDay = () => {
    const newDate = advanceDate(date, 1);
    setDate(newDate);
    onDateChange?.(newDate);
  };

  const handleAdvanceWeek = () => {
    const newDate = advanceDate(date, 10); // 10-day weeks in Forgotten Realms
    setDate(newDate);
    onDateChange?.(newDate);
  };

  const handleManualChange = (field, value) => {
    const newDate = { ...date, [field]: parseInt(value, 10) };
    setDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <div className="panel calendar">
      <h2 className="panel-header">Barovian Calendar</h2>

      <div className="calendar-display">
        <div className="day-of-week">{dayOfWeek}</div>
        <div className="date-main">
          <span className="day-number">{date.day + 1}</span>
          <span className="month-name">{month.name}</span>
        </div>
        <div className="date-meta">
          <span className="month-nickname">{month.nickname}</span>
          <span className="date-meta-sep">·</span>
          <span className="year">{date.year} BR</span>
          <span className="date-meta-sep">·</span>
          <span className="time-display">{time.hour} {time.ampm}</span>
        </div>
      </div>

      <div className="calendar-controls">
        <button onClick={handleAdvanceDay}>+ 1 Day</button>
        <button onClick={handleAdvanceWeek}>+ 1 Week</button>
      </div>

      <div className="calendar-manual">
        <h3>Set Date &amp; Time</h3>
        <div className="manual-inputs">
          <label>
            Day
            <input
              type="number"
              min="1"
              max={DAYS_PER_MONTH}
              value={date.day + 1}
              onChange={(e) => handleManualChange('day', e.target.value - 1)}
            />
          </label>
          <label>
            Month
            <select
              value={date.month}
              onChange={(e) => handleManualChange('month', e.target.value)}
            >
              {MONTHS.map((m, i) => (
                <option key={m.name} value={i}>{m.name}</option>
              ))}
            </select>
          </label>
          <label>
            Year
            <input
              type="number"
              min="1"
              value={date.year}
              onChange={(e) => handleManualChange('year', e.target.value)}
            />
          </label>
        </div>
        <div className="time-inputs">
          <label>
            Hour
            <select
              value={time.hour}
              onChange={(e) => setTime({ ...time, hour: parseInt(e.target.value, 10) })}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </label>
          <label>
            AM/PM
            <select
              value={time.ampm}
              onChange={(e) => setTime({ ...time, ampm: e.target.value })}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
