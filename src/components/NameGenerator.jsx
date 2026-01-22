import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateName } from '../data/barovianNames';
import './NameGenerator.css';

export default function NameGenerator() {
  const [currentName, setCurrentName] = useState(null);
  const [nameHistory, setNameHistory] = useLocalStorage('strahd-name-history', []);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (gender) => {
    const name = generateName(gender);
    setCurrentName(name);

    // Add to history (keep last 10)
    const newHistory = [name, ...nameHistory].slice(0, 10);
    setNameHistory(newHistory);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!currentName) return;

    try {
      await navigator.clipboard.writeText(currentName.fullName);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentName.fullName;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="name-generator">
      <div className="name-header">
        <span className="name-title">Name Generator</span>
      </div>

      <div className="name-buttons">
        <button onClick={() => handleGenerate('male')} className="gen-btn male">
          Male
        </button>
        <button onClick={() => handleGenerate('female')} className="gen-btn female">
          Female
        </button>
      </div>

      {currentName && (
        <div className="name-result">
          <span className="generated-name">{currentName.fullName}</span>
          <button onClick={handleCopy} className="copy-btn" title="Copy to clipboard">
            {copied ? '✓' : '⎘'}
          </button>
        </div>
      )}

      {nameHistory.length > 0 && (
        <div className="history-section">
          <button
            className="history-toggle"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide history' : 'Show history...'}
          </button>

          {showHistory && (
            <ul className="history-list">
              {nameHistory.map((name, i) => (
                <li key={i} className={`history-item ${name.gender}`}>
                  {name.fullName}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
