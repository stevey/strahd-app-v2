import { useState } from 'react';
import { createPortal } from 'react-dom';
import './CardDraw.css';

const CARD_VALUES = ['+1', '+2', '+3', '+4', '+5'];

export default function CardDraw({ value, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSpecial = value === '+5';

  const modal = isModalOpen ? createPortal(
    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
      <div className="modal-content card-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Session Card Draw</h2>
          <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
        </div>

        <p className="card-modal-desc">Select the card drawn at session start</p>

        <div className="card-options">
          {CARD_VALUES.map((cardValue) => (
            <button
              key={cardValue}
              className={`card-option ${cardValue === '+5' ? 'special' : ''} ${value === cardValue ? 'active' : ''}`}
              onClick={() => {
                onChange(cardValue);
                setIsModalOpen(false);
              }}
            >
              {cardValue}
            </button>
          ))}
        </div>

        <div className="card-modal-actions">
          <button
            className="btn-secondary"
            onClick={() => {
              onChange(null);
              setIsModalOpen(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        className={`card-draw-display ${isSpecial ? 'special' : ''}`}
        onClick={() => setIsModalOpen(true)}
        title="Session card draw - click to change"
      >
        <span className="card-value">{value || '?'}</span>
      </button>
      {modal}
    </>
  );
}
