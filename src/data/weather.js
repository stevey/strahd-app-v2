// Barovia-appropriate weather types with weights for random generation
// Higher weight = more common
export const WEATHER_TYPES = [
  // Common conditions
  { id: 'gloomy', name: 'Gloomy', description: 'Overcast skies with an oppressive atmosphere', icon: '☁️', weight: 25 },
  { id: 'fog', name: 'Fog', description: 'Thick mist blankets the land', icon: '🌫️', weight: 20 },
  { id: 'heavy-fog', name: 'Heavy Fog', description: 'Dense fog reduces visibility to mere feet', icon: '🌁', weight: 12 },
  { id: 'overcast', name: 'Overcast', description: 'Gray clouds cover the sky', icon: '⛅', weight: 10 },

  // Rain and storms
  { id: 'light-rain', name: 'Light Rain', description: 'A steady drizzle falls from above', icon: '🌧️', weight: 8 },
  { id: 'heavy-rain', name: 'Heavy Rain', description: 'Torrential downpour drenches everything', icon: '⛈️', weight: 4 },
  { id: 'thunderstorm', name: 'Thunderstorm', description: 'Lightning splits the sky as thunder echoes', icon: '🌩️', weight: 3 },

  // Cold conditions
  { id: 'snow', name: 'Snow', description: 'Gentle snowfall covers the land in white', icon: '🌨️', weight: 3 },
  { id: 'blizzard', name: 'Blizzard', description: 'A howling blizzard with biting winds', icon: '❄️', weight: 1 },
  { id: 'freezing-mist', name: 'Freezing Mist', description: 'Ice-cold fog that chills to the bone', icon: '🥶', weight: 4 },

  // Gothic/supernatural conditions
  { id: 'blood-rain', name: 'Blood Rain', description: 'Crimson droplets fall from an angry sky', icon: '🩸', weight: 1 },
  { id: 'corpse-wind', name: 'Corpse Wind', description: 'A foul wind carrying the stench of death', icon: '💀', weight: 2 },
  { id: 'howling-wind', name: 'Howling Wind', description: 'Fierce winds that scream through the trees', icon: '🌬️', weight: 5 },
  { id: 'crimson-fog', name: 'Crimson Fog', description: 'Red-tinged mist seeps from the earth', icon: '🔴', weight: 2 },
  { id: 'ash-fall', name: 'Ash Fall', description: 'Gray ash drifts down like unholy snow', icon: '⚱️', weight: 2 },
  { id: 'deathly-still', name: 'Deathly Still', description: 'Unnaturally silent - no wind, no birds, nothing', icon: '🤫', weight: 3 },
  { id: 'whispering-wind', name: 'Whispering Wind', description: 'The wind carries distant, unintelligible voices', icon: '👻', weight: 2 },
  { id: 'eclipse', name: 'Unnatural Darkness', description: 'The sky darkens as if the sun itself hides in fear', icon: '🌑', weight: 1 },

  // Rare
  { id: 'clear', name: 'Clear', description: 'A rare break in the eternal gloom - unsettling', icon: '🌙', weight: 1 }
];

// Calculate total weight for random selection
const TOTAL_WEIGHT = WEATHER_TYPES.reduce((sum, w) => sum + w.weight, 0);

// Generate random weather based on weights
export function generateRandomWeather() {
  let random = Math.random() * TOTAL_WEIGHT;

  for (const weather of WEATHER_TYPES) {
    random -= weather.weight;
    if (random <= 0) {
      return weather.id;
    }
  }

  return 'gloomy'; // Fallback
}

// Get weather by ID
export function getWeatherById(id) {
  return WEATHER_TYPES.find(w => w.id === id) || WEATHER_TYPES[0];
}

// Get next weather in cycle (for manual override)
export function getNextWeather(currentId) {
  const currentIndex = WEATHER_TYPES.findIndex(w => w.id === currentId);
  const nextIndex = (currentIndex + 1) % WEATHER_TYPES.length;
  return WEATHER_TYPES[nextIndex].id;
}

// Generate 7-day weather forecast
export function generate7DayForecast() {
  const forecast = [];
  for (let i = 0; i < 7; i++) {
    forecast.push({
      dayOffset: i,
      weatherId: generateRandomWeather()
    });
  }
  return forecast;
}

// Advance forecast (remove first day, add new day 7)
export function advanceForecast(currentForecast) {
  const newForecast = currentForecast.slice(1).map(day => ({
    ...day,
    dayOffset: day.dayOffset - 1
  }));

  newForecast.push({
    dayOffset: 6,
    weatherId: generateRandomWeather()
  });

  return newForecast;
}
