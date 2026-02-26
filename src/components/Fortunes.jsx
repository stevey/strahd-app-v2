import { useRef, useEffect } from 'react';
import './Fortunes.css';

const FORTUNE_CARDS = [
  {
    id: 'wizard',
    title: 'The Wizard',
    image: '/cards/wizard.png',
    meaning: 'This card tells of history. Knowledge of the ancient will help you better understand your enemy.',
    clue: "Look for a wizard's tower on a lake. Let the wizard's name and servant guide you to that which you seek."
  },
  {
    id: 'marionette',
    title: 'The Marionette',
    image: '/cards/marionette.png',
    meaning: 'Your enemy is a creature of darkness, whose powers are beyond mortality. This card will lead you to him!',
    clue: 'Look to great heights. Find the beating heart of the castle. He waits nearby.'
  },
  {
    id: 'bishop',
    title: 'The Bishop',
    image: '/cards/bishop.png',
    meaning: 'This is a card of power and strength. It tells of a weapon of vengeance: a sword of sunlight.',
    clue: 'What you seek lies in a pile of treasure, beyond a set of amber doors.'
  },
  {
    id: 'mists',
    title: 'The Mists',
    image: '/cards/mists.png',
    meaning: 'This card sheds light on one who will help you greatly in the battle against darkness.',
    clue: "A Vistana wanders this land alone, searching for her mentor. She does not stay in one place for long. Seek her out at Saint Markovia's abbey, near the mists."
  },
  {
    id: 'myrmidon',
    title: 'The Myrmidon',
    image: '/cards/myrmidon.png',
    meaning: 'This card tells of a powerful force for good and protection, a holy symbol of great hope.',
    clue: 'Look for a den of wolves in the hills overlooking a mountain lake. The treasure belongs to Mother Night.'
  }
];

export default function Fortunes({ fortuneNotes, onFortuneNoteChange, fortuneLocations, onFortuneLocationChange }) {
  const textareaRefs = useRef({});

  const autoResize = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    Object.values(textareaRefs.current).forEach(autoResize);
  }, [fortuneNotes]);

  return (
    <div className="fortunes-container">
      <div className="fortunes-header">
        <h2 className="fortunes-title">Tarokka Reading</h2>
        <p className="fortunes-subtitle">Madam Eva's fortunes for the campaign</p>
      </div>
      <div className="fortunes-grid">
        {FORTUNE_CARDS.map(card => (
          <div key={card.id} className="fortune-card">
            <div className="fortune-card-image-wrap">
              <img src={card.image} alt={card.title} className="fortune-card-image" />
            </div>
            <div className="fortune-card-body">
              <h3 className="fortune-card-title">{card.title}</h3>
              <div className="fortune-card-section">
                <span className="fortune-label">Meaning</span>
                <p className="fortune-meaning">{card.meaning}</p>
              </div>
              <div className="fortune-card-section">
                <span className="fortune-label">Clue</span>
                <p className="fortune-clue">{card.clue}</p>
              </div>
              <hr className="fortune-divider" />
              <div className="fortune-card-section">
                <span className="fortune-label">DM Notes</span>
                <textarea
                  ref={el => textareaRefs.current[card.id] = el}
                  className="fortune-notes"
                  placeholder="Add notes..."
                  value={fortuneNotes[card.id] || ''}
                  onChange={(e) => {
                    onFortuneNoteChange(card.id, e.target.value);
                    autoResize(e.target);
                  }}
                  rows={2}
                />
              </div>

              <div className="fortune-secret-section">
                <span className="fortune-secret-label">🔒 Location — hover to reveal</span>
                <div className="fortune-secret-reveal">
                  <textarea
                    ref={el => textareaRefs.current[`${card.id}-loc`] = el}
                    className="fortune-location"
                    placeholder="Secret location..."
                    value={fortuneLocations[card.id] || ''}
                    onChange={(e) => {
                      onFortuneLocationChange(card.id, e.target.value);
                      autoResize(e.target);
                    }}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
