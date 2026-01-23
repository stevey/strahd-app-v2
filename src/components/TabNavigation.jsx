import './TabNavigation.css';

const TABS = [
  { id: 'dashboard', label: 'Environment' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'characters', label: 'Characters' }
];

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="tab-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
