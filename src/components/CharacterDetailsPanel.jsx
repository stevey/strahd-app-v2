import { useRef, useEffect } from 'react';
import './CharacterDetailsPanel.css';

export default function CharacterDetailsPanel({ character, onChange, onClose, onRetire }) {
  const textareaRefs = useRef({});

  // Auto-resize textareas
  const autoResize = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  // Resize all textareas on mount and when character changes
  useEffect(() => {
    Object.values(textareaRefs.current).forEach(autoResize);
  }, [character]);

  const handleTextareaChange = (field, e) => {
    onChange({ ...character, [field]: e.target.value });
    autoResize(e.target);
  };

  if (!character) return null;

  const deaths = character.deaths || 0;

  const handleRetire = () => {
    const name = character.name || 'this character';
    if (confirm(`Retire ${name}? This will permanently remove this character slot and all their data.`)) {
      onRetire();
    }
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
          <div className="panel-section panel-color-section">
            <label className="panel-label">Character Colour</label>
            <div className="panel-color-row">
              <input
                type="color"
                className="panel-color-input"
                value={character.color || '#8b0000'}
                onChange={(e) => onChange({ ...character, color: e.target.value })}
              />
              {character.color ? (
                <button
                  className="panel-color-clear"
                  onClick={() => onChange({ ...character, color: null })}
                >
                  Clear
                </button>
              ) : (
                <span className="panel-color-none">No colour set</span>
              )}
            </div>
          </div>

          <div className="panel-section">
            <label className="panel-label">Conditions</label>
            <textarea
              ref={el => textareaRefs.current.conditions = el}
              placeholder="Blinded, Charmed, Cursed, Frightened..."
              value={character.conditions || ''}
              onChange={(e) => handleTextareaChange('conditions', e)}
              rows={2}
              className="panel-textarea auto-resize"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Fears</label>
            <textarea
              ref={el => textareaRefs.current.fears = el}
              placeholder="What terrifies this character..."
              value={character.fears || ''}
              onChange={(e) => handleTextareaChange('fears', e)}
              rows={2}
              className="panel-textarea auto-resize"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Dark Gifts</label>
            <textarea
              ref={el => textareaRefs.current.darkGifts = el}
              placeholder="Dark powers bestowed by the Dark Powers..."
              value={character.darkGifts || ''}
              onChange={(e) => handleTextareaChange('darkGifts', e)}
              rows={2}
              className="panel-textarea auto-resize"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Fortune</label>
            <textarea
              ref={el => textareaRefs.current.fortune = el}
              placeholder="Madam Eva's Tarokka reading..."
              value={character.fortune || ''}
              onChange={(e) => handleTextareaChange('fortune', e)}
              rows={2}
              className="panel-textarea auto-resize"
            />
          </div>

          <div className="panel-section">
            <label className="panel-label">Notes</label>
            <textarea
              ref={el => textareaRefs.current.notes = el}
              placeholder="HP, items, status effects, story notes..."
              value={character.notes || ''}
              onChange={(e) => handleTextareaChange('notes', e)}
              rows={3}
              className="panel-textarea auto-resize"
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

          <div className="panel-footer">
            <div className="panel-death-row">
              <span className="panel-death-label">Deaths</span>
              <div className="panel-death-controls">
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
            </div>
            <button className="panel-retire-btn" onClick={handleRetire}>
              Retire Character
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
