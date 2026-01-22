import { useRef, useState } from 'react';
import { processPortraitImage, handleFileDrop, handleFileSelect } from '../utils/imageUtils';
import './CharacterSlot.css';

export default function CharacterSlot({ character, onChange, onRetire }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const deaths = character.deaths || 0;

  const handleNameChange = (e) => {
    onChange({ ...character, name: e.target.value });
  };

  const handleConditionsChange = (e) => {
    onChange({ ...character, conditions: e.target.value });
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

  const handleRetire = () => {
    const name = character.name || 'this character';
    if (confirm(`Retire ${name}? This will permanently remove this character slot and all their data.`)) {
      onRetire();
    }
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

  // Portrait upload handlers
  const handlePortraitClick = () => {
    fileInputRef.current?.click();
  };

  const handlePortraitChange = async (e) => {
    const file = handleFileSelect(e);
    if (!file) return;
    await uploadPortrait(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    const file = handleFileDrop(e);
    setIsDragging(false);
    if (!file) {
      setUploadError('Please drop an image file');
      return;
    }
    await uploadPortrait(file);
  };

  const uploadPortrait = async (file) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const dataUrl = await processPortraitImage(file);
      onChange({ ...character, portrait: dataUrl });
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearPortrait = (e) => {
    e.stopPropagation();
    onChange({ ...character, portrait: null });
  };

  const hasContent = character.name || character.portrait ||
                     character.conditions || character.darkGifts ||
                     character.fortune || character.notes || deaths > 0;

  return (
    <div className={`character-slot ${hasContent ? 'has-content' : ''}`}>
      <div className="slot-header">
        <div
          className={`portrait-container ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
          onClick={handlePortraitClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {character.portrait ? (
            <>
              <img src={character.portrait} alt={character.name || 'Character'} className="portrait-image" />
              <div className="portrait-overlay">
                <span className="portrait-change-text">Change</span>
              </div>
              <button
                className="portrait-clear-btn"
                onClick={handleClearPortrait}
                title="Remove portrait"
                aria-label="Remove portrait"
              >
                ✕
              </button>
            </>
          ) : (
            <div className="portrait-placeholder">
              <span className="portrait-icon">📷</span>
              <span className="portrait-text">Upload</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePortraitChange}
            className="portrait-input"
            aria-label="Upload character portrait"
          />
        </div>

        <input
          type="text"
          placeholder="Character Name"
          value={character.name}
          onChange={handleNameChange}
          className="character-name"
        />
      </div>

      {uploadError && (
        <div className="upload-error">{uploadError}</div>
      )}

      <div className="text-section">
        <label className="text-label">Conditions</label>
        <textarea
          placeholder="Blinded, Charmed, Cursed, Frightened..."
          value={character.conditions || ''}
          onChange={handleConditionsChange}
          rows={2}
          className="text-area"
        />
      </div>

      <div className="text-section">
        <label className="text-label">Dark Gifts</label>
        <textarea
          placeholder="Dark powers bestowed by the Dark Powers..."
          value={character.darkGifts || ''}
          onChange={handleDarkGiftsChange}
          rows={2}
          className="text-area"
        />
      </div>

      <div className="text-section">
        <label className="text-label">Fortune</label>
        <textarea
          placeholder="Madam Eva's Tarokka reading..."
          value={character.fortune || ''}
          onChange={handleFortuneChange}
          rows={2}
          className="text-area"
        />
      </div>

      <div className="text-section">
        <label className="text-label">Notes</label>
        <textarea
          placeholder="HP, items, status effects, story notes..."
          value={character.notes || ''}
          onChange={handleNotesChange}
          rows={2}
          className="text-area"
        />
      </div>

      <div className="death-banner">
        <button
          className="death-btn death-minus"
          onClick={handleRemoveDeath}
          disabled={deaths === 0}
          title="Remove a death"
        >
          −
        </button>
        <span className="death-display">
          <span className="death-skull">💀</span>
          <span className="death-count">{deaths}</span>
        </span>
        <button
          className="death-btn death-plus"
          onClick={handleAddDeath}
          title="Record a death"
        >
          +
        </button>
      </div>

      <button className="retire-btn" onClick={handleRetire}>
        Retire Character
      </button>
    </div>
  );
}
