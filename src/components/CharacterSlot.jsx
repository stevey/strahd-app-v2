import { useRef, useState } from 'react';
import { processPortraitImage, handleFileDrop, handleFileSelect } from '../utils/imageUtils';
import './CharacterSlot.css';

export default function CharacterSlot({ character, onChange, onShowDetails }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const deaths = character.deaths || 0;

  const handleNameChange = (e) => {
    onChange({ ...character, name: e.target.value });
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
                     character.fortune || character.notes || character.fears ||
                     character.dndBeyondLink || deaths > 0;

  return (
    <div className={`character-slot ${hasContent ? 'has-content' : ''}`}>
      <div className="slot-header">
        <div
          className={`portrait-container ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
          onClick={handlePortraitClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={character.color ? { boxShadow: `0 0 0 3px ${character.color}, 0 0 8px ${character.color}40`, border: `2px solid ${character.color}` } : undefined}
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

      {deaths > 0 && (
        <div className="death-indicator">
          <span className="death-skull">💀</span>
          <span className="death-count">{deaths}</span>
        </div>
      )}

      <div className="slot-actions">
        <button className="details-btn" onClick={onShowDetails}>
          details
        </button>
        {character.dndBeyondLink ? (
          <a
            href={character.dndBeyondLink}
            target="_blank"
            rel="noopener noreferrer"
            className="sheet-link-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/images/dndbeyond-icon.png" alt="" className="ddb-icon" />
            D&D Beyond
          </a>
        ) : (
          <span className="sheet-link-placeholder">no sheet</span>
        )}
      </div>
    </div>
  );
}
