import './CharacterDetailsPanel.css';

export default function CharacterDetailsPanel({ character, onChange, onClose, onRetire }) {
  if (!character) return null;

  const deaths = character.deaths || 0;

  const handleRetire = () => {
    const name = character.name || 'this character';
    if (confirm(`Retire ${name}? This will permanently remove this character slot and all their data.`)) {
      onRetire();
    }
  };

  const handleConditionsChange = (e) => {
    onChange({ ...character, conditions: e.target.value });
  };

  const handleFearsChange = (e) => {
    onChange({ ...character, fears: e.target.value });
  };

  const handleDarkGiftsChange = (e) => {
    onChange({ ...character, darkGifts: e.target.value });
  };

  const handleFortuneChange = (e) => {
    onChange({ ...character, fortune: e.target.value });
  };

  const handleNotesChange = (e) => {
    onChange({ ...character, notes: e.target.value });
  };

  const handleDndBeyondLinkChange = (e) => {
    onChange({ ...character, dndBeyondLink: e.target.value });
  };

  const handleAddDeath = () => {
    const name = character.name || 'this character';
    if (confirm(`Record a death for ${name}?`)) {
      onChange({ ...character, deaths: deaths + 1 });
    }
  };

  const handleRemoveDeath = () => {
    if (deaths > 0) {
      const name = character.name || 'this character';
      if (confirm(`Remove a death from ${name}?`)) {
        onChange({ ...character, deaths: deaths - 1 });
      }
    }
  };

  return (
    <div className="details-panel-overlay" onClick={onClose}>
      <div className="details-panel" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="panel-header">
          {character.portrait && (
            <div className="panel-portrait">
              <img src={character.portrait} alt={character.name || 'Character'} />
            </div>
          )}
          <h2 className="panel-character-name">
            {character.name || 'Unnamed Character'}
          </h2>
        </div>

        <div className="panel-content">
          <div className="panel-section">
            <label className="panel-label">Conditions</label>
            <textarea
              placeholder="Blinded, Charmed, Cursed, Frightened..."
              value={character.conditions || ''}
              onChange={handleConditionsChange}
              rows={2}
              className="panel-textarea"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Fears</label>
            <textarea
              placeholder="What terrifies this character..."
              value={character.fears || ''}
              onChange={handleFearsChange}
              rows={2}
              className="panel-textarea"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Dark Gifts</label>
            <textarea
              placeholder="Dark powers bestowed by the Dark Powers..."
              value={character.darkGifts || ''}
              onChange={handleDarkGiftsChange}
              rows={2}
              className="panel-textarea"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Fortune</label>
            <textarea
              placeholder="Madam Eva's Tarokka reading..."
              value={character.fortune || ''}
              onChange={handleFortuneChange}
              rows={2}
              className="panel-textarea"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Notes</label>
            <textarea
              placeholder="HP, items, status effects, story notes..."
              value={character.notes || ''}
              onChange={handleNotesChange}
              rows={3}
              className="panel-textarea"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">D&D Beyond Sheet</label>
            {character.dndBeyondLink ? (
              <div className="panel-link-display">
                <a
                  href={character.dndBeyondLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-link"
                >
                  <img src="/images/dndbeyond-icon.png" alt="" className="panel-ddb-icon" />
                  View Character Sheet
                </a>
                <button
                  className="panel-link-edit"
                  onClick={() => onChange({ ...character, dndBeyondLink: '' })}
                >
                  change
                </button>
              </div>
            ) : (
              <input
                type="text"
                placeholder="https://www.dndbeyond.com/characters/..."
                value={character.dndBeyondLink || ''}
                onChange={handleDndBeyondLinkChange}
                className="panel-input"
              />
            )}
          </div>

          <div className="panel-death-section">
            <button
              className="panel-death-btn"
              onClick={handleRemoveDeath}
              disabled={deaths === 0}
            >
              -
            </button>
            <span className="panel-death-display">
              <span className="panel-death-skull">💀</span>
              <span className="panel-death-count">{deaths}</span>
            </span>
            <button
              className="panel-death-btn"
              onClick={handleAddDeath}
            >
              +
            </button>
          </div>

          <div className="panel-retire-section">
            <button className="panel-retire-btn" onClick={handleRetire}>
              Retire Character
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
