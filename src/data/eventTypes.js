// Event type definitions for timeline tracking

export const EVENT_TYPES = [
  { id: 'combat', label: 'Combat', color: '#8b0000', icon: '⚔️' },
  { id: 'story', label: 'Story', color: '#c9a959', icon: '📖' },
  { id: 'npc', label: 'NPC', color: '#6b4e9b', icon: '👤' },
  { id: 'location', label: 'Location', color: '#2a7f62', icon: '📍' },
  { id: 'quest', label: 'Quest', color: '#d97706', icon: '🗡️' },
  { id: 'other', label: 'Other', color: '#4a5568', icon: '📝' }
];

export function getEventTypeById(id) {
  return EVENT_TYPES.find(t => t.id === id) || EVENT_TYPES[EVENT_TYPES.length - 1];
}

export function getEventTypeColor(id) {
  const type = getEventTypeById(id);
  return type.color;
}

export function getEventTypeIcon(id) {
  const type = getEventTypeById(id);
  return type.icon;
}
