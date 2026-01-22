// Forgotten Realms Calendar - 12 months × 30 days = 360 days/year
export const MONTHS = [
  { name: 'Hammer', nickname: 'Deepwinter' },
  { name: 'Alturiak', nickname: 'The Claw of Winter' },
  { name: 'Ches', nickname: 'The Claw of Sunsets' },
  { name: 'Tarsakh', nickname: 'The Claw of Storms' },
  { name: 'Mirtul', nickname: 'The Melting' },
  { name: 'Kythorn', nickname: 'The Time of Flowers' },
  { name: 'Flamerule', nickname: 'Summertide' },
  { name: 'Eleasis', nickname: 'Highsun' },
  { name: 'Eleint', nickname: 'The Fading' },
  { name: 'Marpenoth', nickname: 'Leaffall' },
  { name: 'Uktar', nickname: 'The Rotting' },
  { name: 'Nightal', nickname: 'The Drawing Down' }
];

export const DAYS_OF_WEEK = [
  'First-day',
  'Second-day',
  'Third-day',
  'Fourth-day',
  'Fifth-day',
  'Sixth-day',
  'Seventh-day',
  'Eighth-day',
  'Ninth-day',
  'Tenth-day'
];

export const DAYS_PER_MONTH = 30;
export const MONTHS_PER_YEAR = 12;
export const DAYS_PER_YEAR = DAYS_PER_MONTH * MONTHS_PER_YEAR; // 360
export const DAYS_PER_WEEK = 10;

// Default starting date (Campaign typically starts in late autumn)
export const DEFAULT_DATE = {
  day: 1,
  month: 9, // Marpenoth (Leaffall) - October equivalent
  year: 735  // Year in Barovian Reckoning
};

// Helper functions
export function getTotalDays(date) {
  return (date.year * DAYS_PER_YEAR) + (date.month * DAYS_PER_MONTH) + date.day;
}

export function dateFromTotalDays(totalDays) {
  const year = Math.floor(totalDays / DAYS_PER_YEAR);
  const remainingDays = totalDays % DAYS_PER_YEAR;
  const month = Math.floor(remainingDays / DAYS_PER_MONTH);
  const day = remainingDays % DAYS_PER_MONTH;

  return { day, month, year };
}

export function getDayOfWeek(date) {
  const totalDays = getTotalDays(date);
  return DAYS_OF_WEEK[totalDays % DAYS_PER_WEEK];
}

export function formatDate(date) {
  const dayOfWeek = getDayOfWeek(date);
  const month = MONTHS[date.month];
  return `${dayOfWeek}, ${date.day + 1} ${month.name}, ${date.year} BR`;
}

export function advanceDate(date, days) {
  const totalDays = getTotalDays(date) + days;
  return dateFromTotalDays(totalDays);
}
