import { useState } from 'react';
import { generateGenericNpc, generateSpecialNpc, specialNpcTypes } from '../data/barovianNames';
import './NameGenerator.css';

export default function NameGenerator({
  genericHistory,
  setGenericHistory,
  specialHistory,
  setSpecialHistory,
}) {
  const [currentGeneric, setCurrentGeneric] = useState(null);
  const [currentSpecial, setCurrentSpecial] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showGenericHistory, setShowGenericHistory] = useState(false);
  const [showSpecialHistory, setShowSpecialHistory] = useState(false);
  const [copiedGeneric, setCopiedGeneric] = useState(false);
  const [copiedSpecial, setCopiedSpecial] = useState(false);

  // --- Generic NPC ---
  const handleGenerateGeneric = (gender) => {
    const recentFeatures = genericHistory.map(n => n.identifyingFeature).filter(Boolean);
    const npc = generateGenericNpc(gender, recentFeatures);
    setCurrentGeneric(npc);
    setGenericHistory([npc, ...genericHistory].slice(0, 20));
    setCopiedGeneric(false);
  };

  const handleCopyGeneric = async () => {
    if (!currentGeneric) return;
    const text = currentGeneric.identifyingFeature
      ? `${currentGeneric.fullName} — ${currentGeneric.identifyingFeature}`
      : currentGeneric.fullName;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedGeneric(true);
    setTimeout(() => setCopiedGeneric(false), 1500);
  };

  const deleteGeneric = (index) => {
    setGenericHistory(genericHistory.filter((_, i) => i !== index));
  };

  // --- Special NPC ---
  const handleGenerateSpecial = () => {
    if (!selectedGender || !selectedType) return;
    const recentFeatures = specialHistory
      .filter(n => n.npcType === selectedType)
      .map(n => n.identifyingFeature);
    const npc = generateSpecialNpc(selectedGender, selectedType, recentFeatures);
    setCurrentSpecial(npc);
    setSpecialHistory([npc, ...specialHistory].slice(0, 20));
    setCopiedSpecial(false);
  };

  const handleCopySpecial = async () => {
    if (!currentSpecial) return;
    const text = `${currentSpecial.fullName} — ${currentSpecial.description}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedSpecial(true);
    setTimeout(() => setCopiedSpecial(false), 1500);
  };

  const deleteSpecial = (index) => {
    setSpecialHistory(specialHistory.filter((_, i) => i !== index));
  };

  const typeLabel = (t) => t.replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="npc-generator-grid">

      {/* ---- Generic NPC Column ---- */}
      <div className="npc-column">
        <div className="name-header">
          <span className="name-title">Generic NPC</span>
        </div>

        <div className="name-buttons">
          <button onClick={() => handleGenerateGeneric('male')} className="gen-btn male">
            Male
          </button>
          <button onClick={() => handleGenerateGeneric('female')} className="gen-btn female">
            Female
          </button>
        </div>

        {currentGeneric && (
          <div className="name-result special-result">
            <div className="special-result-main">
              <span className="generated-name">{currentGeneric.fullName}</span>
              {currentGeneric.identifyingFeature && (
                <span className="npc-desc">{currentGeneric.identifyingFeature}</span>
              )}
            </div>
            <button onClick={handleCopyGeneric} className="copy-btn" title="Copy to clipboard">
              {copiedGeneric ? '✓' : '⎘'}
            </button>
          </div>
        )}

        {genericHistory.length > 0 && (
          <div className="history-section">
            <button
              className="history-toggle"
              onClick={() => setShowGenericHistory(!showGenericHistory)}
            >
              {showGenericHistory ? 'Hide history' : 'Show history...'}
            </button>
            {showGenericHistory && (
              <ul className="history-list">
                {genericHistory.map((name, i) => (
                  <li key={i} className={`history-item ${name.gender}`}>
                    <span
                      className="history-name clickable"
                      onClick={() => { setCurrentGeneric(name); setCopiedGeneric(false); }}
                    >{name.fullName}</span>
                    <button
                      className="history-delete"
                      onClick={() => deleteGeneric(i)}
                      title="Remove"
                    >×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* ---- Special NPC Column ---- */}
      <div className="npc-column">
        <div className="name-header">
          <span className="name-title">Special NPC</span>
        </div>

        <div className="special-controls">
          <div className="type-buttons">
            {specialNpcTypes.map(t => (
              <button
                key={t}
                className={`type-btn${selectedType === t ? ' active' : ''}`}
                onClick={() => setSelectedType(selectedType === t ? null : t)}
              >
                {typeLabel(t)}
              </button>
            ))}
          </div>

          <div className="name-buttons">
            <button
              className={`gen-btn male gender-btn${selectedGender === 'male' ? ' active' : ''}`}
              onClick={() => setSelectedGender(selectedGender === 'male' ? null : 'male')}
            >
              Male
            </button>
            <button
              className={`gen-btn female gender-btn${selectedGender === 'female' ? ' active-female' : ''}`}
              onClick={() => setSelectedGender(selectedGender === 'female' ? null : 'female')}
            >
              Female
            </button>
          </div>

          <button
            className="generate-btn"
            onClick={handleGenerateSpecial}
            disabled={!selectedGender || !selectedType}
          >
            Generate
          </button>
        </div>

        {currentSpecial && (
          <div className="name-result special-result">
            <div className="special-result-main">
              <span className="generated-name">
                {currentSpecial.isFormerAdventurer && <span className="npc-star">★</span>}
                {currentSpecial.fullName}
              </span>
              <span className="npc-type-badge">{typeLabel(currentSpecial.npcType)}</span>
              {currentSpecial.isFormerAdventurer && (
                <span className="npc-class-line">
                  {currentSpecial.npcRace} {currentSpecial.npcClass}
                </span>
              )}
              <span className="npc-desc">{currentSpecial.description}</span>
            </div>
            <button onClick={handleCopySpecial} className="copy-btn" title="Copy to clipboard">
              {copiedSpecial ? '✓' : '⎘'}
            </button>
          </div>
        )}

        {specialHistory.length > 0 && (
          <div className="history-section">
            <button
              className="history-toggle"
              onClick={() => setShowSpecialHistory(!showSpecialHistory)}
            >
              {showSpecialHistory ? 'Hide history' : 'Show history...'}
            </button>
            {showSpecialHistory && (
              <ul className="history-list">
                {specialHistory.map((npc, i) => (
                  <li key={i} className={`history-item special-history-item${npc.isFormerAdventurer ? ' adventurer' : ''}`}>
                    <span
                      className="history-item-content clickable"
                      onClick={() => { setCurrentSpecial(npc); setCopiedSpecial(false); }}
                    >
                      {npc.isFormerAdventurer && <span className="npc-star">★</span>}
                      <span className="history-name">{npc.fullName}</span>
                      <span className="npc-type-badge">{typeLabel(npc.npcType)}</span>
                    </span>
                    <button
                      className="history-delete"
                      onClick={() => deleteSpecial(i)}
                      title="Remove"
                    >×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
