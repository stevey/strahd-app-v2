import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_DATE, getTotalDays, dateFromTotalDays } from './data/calendar';
import { generateRandomWeather, generate7DayForecast, advanceForecast } from './data/weather';
import TabNavigation from './components/TabNavigation';
import Calendar from './components/Calendar';
import Weather from './components/Weather';
import MoonPhase from './components/MoonPhase';
import NameGenerator from './components/NameGenerator';
import CharacterSlot from './components/CharacterSlot';
import CharacterDetailsPanel from './components/CharacterDetailsPanel';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import AdminControls from './components/AdminControls';
import CardDraw from './components/CardDraw';
import EnvironmentSummary from './components/EnvironmentSummary';
import Fortunes from './components/Fortunes';
import './App.css';

const DEFAULT_CHARACTER = {
  name: '',
  portrait: null,
  conditions: '',
  fears: '',
  darkGifts: '',
  fortune: '',
  notes: '',
  dndBeyondLink: '',
  deaths: 0,
  color: null
};

const DEFAULT_CHARACTERS = Array(8).fill(null).map(() => ({ ...DEFAULT_CHARACTER }));

export default function App() {
  const [date, setDate] = useLocalStorage('strahd-date', DEFAULT_DATE);
  const [time, setTime] = useLocalStorage('strahd-time', { hour: 12, ampm: 'AM' });
  const [weatherId, setWeatherId] = useLocalStorage('strahd-weather', generateRandomWeather());
  const [forecast, setForecast] = useLocalStorage('strahd-forecast', generate7DayForecast());
  const [forecastDate, setForecastDate] = useLocalStorage('strahd-forecast-date', getTotalDays(DEFAULT_DATE));
  const [characters, setCharacters] = useLocalStorage('strahd-characters', DEFAULT_CHARACTERS);
  const [events, setEvents] = useLocalStorage('strahd-events', []);
  const [weatherHistory, setWeatherHistory] = useLocalStorage('strahd-weather-history', []);
  const [activeTab, setActiveTab] = useLocalStorage('strahd-active-tab', 'dashboard');
  const [cardDraw, setCardDraw] = useLocalStorage('strahd-card-draw', null);
  const [fortuneNotes, setFortuneNotes] = useLocalStorage('strahd-fortune-notes', {});
  const [fortuneLocations, setFortuneLocations] = useLocalStorage('strahd-fortune-locations', {});

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventFormDate, setEventFormDate] = useState(date);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(null);

  // Ensure current weather matches forecast day 0 on initial load
  useEffect(() => {
    if (forecast[0] && weatherId !== forecast[0].weatherId) {
      setWeatherId(forecast[0].weatherId);
    }
  }, []); // Only run once on mount

  // Migrate existing events to have an order field
  useEffect(() => {
    const needsMigration = events.some(e => e.order === undefined);
    if (needsMigration) {
      const migrated = events.map(e => ({
        ...e,
        order: e.order !== undefined ? e.order : parseInt(e.id) || 0
      }));
      setEvents(migrated);
    }
  }, []); // Only run once on mount

  const handleDateChange = (newDate) => {
    const currentTotalDays = getTotalDays(date);
    const newTotalDays = getTotalDays(newDate);
    const daysAdvanced = newTotalDays - currentTotalDays;

    // If moving forward in time, advance the forecast and save weather history
    if (daysAdvanced > 0) {
      const newWeatherHistory = [...weatherHistory];

      // Save weather for each day advanced
      let updatedForecast = forecast;
      for (let i = 0; i < daysAdvanced; i++) {
        const dayDate = i === 0 ? date : dateFromTotalDays(currentTotalDays + i);
        const dayWeatherId = i === 0 ? weatherId : updatedForecast[0]?.weatherId || generateRandomWeather();

        // Add to history
        newWeatherHistory.push({
          date: { ...dayDate },
          weatherId: dayWeatherId,
          totalDays: currentTotalDays + i
        });

        // Advance forecast
        if (i < daysAdvanced - 1 || daysAdvanced === 1) {
          updatedForecast = advanceForecast(updatedForecast);
        }
      }

      setWeatherHistory(newWeatherHistory);
      setForecast(updatedForecast);
      setForecastDate(newTotalDays);

      // Set today's weather to the forecast for day 0
      if (updatedForecast[0]) {
        setWeatherId(updatedForecast[0].weatherId);
      }
    }
  };

  const handleRegenerateForecast = () => {
    const newForecast = generate7DayForecast();
    setForecast(newForecast);
    setForecastDate(getTotalDays(date));
    // Update current weather to match new forecast day 0
    setWeatherId(newForecast[0].weatherId);
  };

  // Handle weather change - sync current weather with forecast day 0
  const handleWeatherChange = (newWeatherId) => {
    setWeatherId(newWeatherId);
    // Update forecast day 0 to match the new current weather
    const updatedForecast = forecast.map((day, index) =>
      index === 0 ? { ...day, weatherId: newWeatherId } : day
    );
    setForecast(updatedForecast);
  };

  const handleForecastDayChange = (dayIndex, newWeatherId) => {
    const updatedForecast = forecast.map((day, index) =>
      index === dayIndex ? { ...day, weatherId: newWeatherId } : day
    );
    setForecast(updatedForecast);
    // If changing day 0, also update current weather
    if (dayIndex === 0) {
      setWeatherId(newWeatherId);
    }
  };

  const handleCharacterChange = (index, character) => {
    const newCharacters = [...characters];
    newCharacters[index] = character;
    setCharacters(newCharacters);
  };

  const handleRetireCharacter = (index) => {
    const newCharacters = characters.filter((_, i) => i !== index);
    setCharacters(newCharacters);
    if (selectedCharacterIndex === index) {
      setSelectedCharacterIndex(null);
    } else if (selectedCharacterIndex > index) {
      setSelectedCharacterIndex(selectedCharacterIndex - 1);
    }
  };

  const handleAddCharacter = () => {
    setCharacters([...characters, { ...DEFAULT_CHARACTER }]);
  };

  const handleAddEvent = (eventDate = date) => {
    setEditingEvent(null);
    setEventFormDate(eventDate);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(e =>
        e.id === editingEvent.id ? { ...eventData, id: e.id, order: e.order } : e
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: Date.now().toString(),
        order: Date.now(),
        weatherId: weatherId // Capture current weather
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (confirm('Delete this event?')) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const handleReorderEvent = (eventId, direction) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const eventTotalDays = getTotalDays(event.date);
    const dayEvents = events
      .filter(e => getTotalDays(e.date) === eventTotalDays)
      .sort((a, b) => (a.order ?? parseInt(a.id)) - (b.order ?? parseInt(b.id)));

    const idx = dayEvents.findIndex(e => e.id === eventId);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;

    if (swapIdx < 0 || swapIdx >= dayEvents.length) return;

    const swapEvent = dayEvents[swapIdx];
    const tempOrder = event.order ?? parseInt(event.id);
    const swapOrder = swapEvent.order ?? parseInt(swapEvent.id);

    setEvents(events.map(e => {
      if (e.id === eventId) return { ...e, order: swapOrder };
      if (e.id === swapEvent.id) return { ...e, order: tempOrder };
      return e;
    }));
  };

  const handleCloseModal = () => {
    setIsEventModalOpen(false);
    setEditingEvent(null);
  };

  const handleFortuneNoteChange = (cardId, text) => {
    setFortuneNotes(prev => ({ ...prev, [cardId]: text }));
  };

  const handleFortuneLocationChange = (cardId, text) => {
    setFortuneLocations(prev => ({ ...prev, [cardId]: text }));
  };

  // Admin functions
  const handleResetCalendarWeather = () => {
    const newForecast = generate7DayForecast();
    setDate(DEFAULT_DATE);
    setTime({ hour: 12, ampm: 'AM' });
    setWeatherId(newForecast[0].weatherId); // Use forecast day 0 as current weather
    setForecast(newForecast);
    setForecastDate(getTotalDays(DEFAULT_DATE));
    setEvents([]);
    setWeatherHistory([]);
  };

  const handleExportData = () => {
    const exportData = {
      version: '2.2',
      exportDate: new Date().toISOString(),
      data: {
        date,
        time,
        weatherId,
        forecast,
        forecastDate,
        characters,
        events,
        weatherHistory,
        cardDraw,
        fortuneNotes,
        fortuneLocations
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `strahd-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (importedData) => {
    try {
      const data = importedData.data || importedData;

      if (data.date) setDate(data.date);
      if (data.time) setTime(data.time);
      if (data.weatherId) setWeatherId(data.weatherId);
      if (data.forecast) setForecast(data.forecast);
      if (data.forecastDate !== undefined) setForecastDate(data.forecastDate);
      if (data.characters) setCharacters(data.characters);
      if (data.events) setEvents(data.events);
      if (data.weatherHistory) setWeatherHistory(data.weatherHistory);
      if (data.cardDraw !== undefined) setCardDraw(data.cardDraw);
      if (data.fortuneNotes) setFortuneNotes(data.fortuneNotes);
      if (data.fortuneLocations) setFortuneLocations(data.fortuneLocations);

      alert('Data imported successfully!');
    } catch (error) {
      alert('Error importing data: ' + error.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-card">
          <CardDraw value={cardDraw} onChange={setCardDraw} />
        </div>
        <h1>Curse of Strahd Tracker</h1>
        <div className="header-shortcuts">
          <a
            href="https://www.dndbeyond.com/sources/dnd/cos"
            target="_blank"
            rel="noopener noreferrer"
            className="shortcut-link"
            title="D&D Beyond - Curse of Strahd"
          >
            <img src="/images/dndbeyond-icon.png" alt="D&D Beyond" />
          </a>
          <a
            href="https://app.roll20.net/editor/setcampaign/20397133"
            target="_blank"
            rel="noopener noreferrer"
            className="shortcut-link"
            title="Roll20 Campaign"
          >
            <img src="/images/roll20.png" alt="Roll20" />
          </a>
        </div>
      </header>

      <main className="app-main">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'dashboard' && (
          <section className="dashboard-section">
            <div className="tracker-grid">
              <Calendar
                date={date}
                setDate={setDate}
                onDateChange={handleDateChange}
                time={time}
                setTime={setTime}
              />
              <Weather
                weatherId={weatherId}
                onWeatherChange={handleWeatherChange}
                forecast={forecast}
                onRegenerateForecast={handleRegenerateForecast}
                currentDate={date}
                onForecastDayChange={handleForecastDayChange}
              />
              <MoonPhase date={date} />
            </div>
            <div className="dashboard-tools">
              <NameGenerator />
            </div>
          </section>
        )}

        {activeTab === 'timeline' && (
          <section className="timeline-section">
            <Timeline
              events={events}
              currentDate={date}
              currentWeatherId={weatherId}
              onEventClick={handleEditEvent}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
              onReorderEvent={handleReorderEvent}
              weatherHistory={weatherHistory}
            />
          </section>
        )}

        {activeTab === 'fortunes' && (
          <section className="fortunes-section">
            <Fortunes
              fortuneNotes={fortuneNotes}
              onFortuneNoteChange={handleFortuneNoteChange}
              fortuneLocations={fortuneLocations}
              onFortuneLocationChange={handleFortuneLocationChange}
            />
          </section>
        )}

        {activeTab === 'characters' && (
          <section className="characters-section">
            <div className="characters-grid">
              {characters.map((character, index) => (
                <CharacterSlot
                  key={index}
                  character={character}
                  onChange={(c) => handleCharacterChange(index, c)}
                  onShowDetails={() => setSelectedCharacterIndex(index)}
                />
              ))}
              <button className="add-character-btn" onClick={handleAddCharacter}>
                + Add Character
              </button>
            </div>
          </section>
        )}

        {selectedCharacterIndex !== null && characters[selectedCharacterIndex] && (
          <CharacterDetailsPanel
            character={characters[selectedCharacterIndex]}
            onChange={(c) => handleCharacterChange(selectedCharacterIndex, c)}
            onClose={() => setSelectedCharacterIndex(null)}
            onRetire={() => {
              handleRetireCharacter(selectedCharacterIndex);
              setSelectedCharacterIndex(null);
            }}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>May the mists of Barovia shroud your journey</p>
        <AdminControls
          onResetCalendarWeather={handleResetCalendarWeather}
          onExportData={handleExportData}
          onImportData={handleImportData}
        />
        <EnvironmentSummary date={date} time={time} weatherId={weatherId} cardDraw={cardDraw} />
      </footer>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        event={editingEvent}
        currentDate={eventFormDate}
      />
    </div>
  );
}
