import { getTotalDays } from '../data/calendar';
import './MoonPhase.css';

// 7-day lunar cycle - the moon of Barovia moves unnaturally fast
const MOON_PHASES = [
  { name: 'New Moon', icon: '🌑', illumination: 0 },
  { name: 'Waxing Crescent', icon: '🌒', illumination: 0.25 },
  { name: 'First Quarter', icon: '🌓', illumination: 0.5 },
  { name: 'Waxing Gibbous', icon: '🌔', illumination: 0.75 },
  { name: 'Full Moon', icon: '🌕', illumination: 1 },
  { name: 'Waning Gibbous', icon: '🌖', illumination: 0.75 },
  { name: 'Last Quarter', icon: '🌗', illumination: 0.5 }
];

const LUNAR_CYCLE = 7; // Days per lunar cycle - weekly full moons
const FULL_MOON_DAY = 4; // Full moon occurs on day 4 of each cycle

export function getMoonPhase(date) {
  const totalDays = getTotalDays(date);
  const dayInCycle = totalDays % LUNAR_CYCLE;
  // Map 7 days to 7 phases (one phase per day)
  const phaseIndex = dayInCycle % MOON_PHASES.length;
  return MOON_PHASES[phaseIndex];
}

export function getDaysUntilFullMoon(date) {
  const totalDays = getTotalDays(date);
  const dayInCycle = totalDays % LUNAR_CYCLE;

  if (dayInCycle <= FULL_MOON_DAY) {
    return FULL_MOON_DAY - dayInCycle;
  } else {
    return LUNAR_CYCLE - dayInCycle + FULL_MOON_DAY;
  }
}

export default function MoonPhase({ date }) {
  const phase = getMoonPhase(date);
  const daysUntilFull = getDaysUntilFullMoon(date);
  const totalDays = getTotalDays(date);
  const dayInCycle = totalDays % LUNAR_CYCLE;

  return (
    <div className="panel moon-phase">
      <h2 className="panel-header">Lunar Cycle</h2>

      <div className="moon-display">
        <div className="moon-visual">
          <div className="moon-icon">{phase.icon}</div>
          <div
            className="moon-glow"
            style={{ opacity: phase.illumination * 0.5 }}
          />
        </div>
        <div className="moon-name">{phase.name}</div>
        <div className="moon-info">
          {daysUntilFull === 0 ? (
            <span className="full-moon-warning">The full moon rises tonight!</span>
          ) : (
            <span>{daysUntilFull} day{daysUntilFull !== 1 ? 's' : ''} until full moon</span>
          )}
        </div>
      </div>

      <div className="moon-cycle-bar">
        <div className="cycle-track">
          <div
            className="cycle-marker"
            style={{ left: `${(dayInCycle / LUNAR_CYCLE) * 100}%` }}
          />
        </div>
        <div className="cycle-labels">
          {MOON_PHASES.map((p, i) => (
            <span key={i}>{p.icon}</span>
          ))}
        </div>
      </div>

      <div className="moon-note">
        <em>Werewolves and other lycanthropes are strongest during the full moon.</em>
      </div>
    </div>
  );
}
