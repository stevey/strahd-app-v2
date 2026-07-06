import { useState } from 'react';
import { GIFT_LISTS } from '../data/darkGifts';
import './DarkGifts.css';

const LIST_ORDER = ['ddal04', 'darker', 'custom'];

const EMPTY_GIFT = { title: '', list: 'custom', number: '', description: '' };

function GiftModal({ gift, onSave, onDelete, onClose }) {
  const isNew = !gift.id;
  const [form, setForm] = useState({
    title: gift.title || '',
    list: gift.list || 'custom',
    number: gift.number ?? '',
    description: gift.description || ''
  });

  const canSave = form.title.trim() && form.description.trim();

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      ...gift,
      title: form.title.trim(),
      list: form.list,
      number: form.number === '' ? null : Math.min(20, Math.max(1, parseInt(form.number))),
      description: form.description.trim()
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`Delete "${gift.title}"? It will be removed from any characters who have it.`)) {
      onDelete(gift.id);
      onClose();
    }
  };

  return (
    <div className="gift-modal-overlay" onClick={onClose}>
      <div className="gift-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="gift-modal-title">{isNew ? 'New Dark Gift' : 'Edit Dark Gift'}</h3>

        <div className="gift-modal-field">
          <label className="gift-modal-label">Title</label>
          <input
            type="text"
            value={form.title}
            placeholder="A short, evocative name..."
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            autoFocus
          />
        </div>

        <div className="gift-modal-row">
          <div className="gift-modal-field">
            <label className="gift-modal-label">List</label>
            <select
              value={form.list}
              onChange={(e) => setForm({ ...form, list: e.target.value })}
            >
              {LIST_ORDER.map(key => (
                <option key={key} value={key}>{GIFT_LISTS[key].title}</option>
              ))}
            </select>
          </div>
          <div className="gift-modal-field gift-modal-field-number">
            <label className="gift-modal-label">d20 (optional)</label>
            <input
              type="number"
              min="1"
              max="20"
              value={form.number}
              placeholder="—"
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </div>
        </div>

        <div className="gift-modal-field">
          <label className="gift-modal-label">Effect</label>
          <textarea
            rows={7}
            value={form.description}
            placeholder="The full rules text of the bane/boon..."
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="gift-modal-actions">
          {!isNew && (
            <button className="gift-modal-delete" onClick={handleDelete}>
              Delete
            </button>
          )}
          <div className="gift-modal-actions-right">
            <button className="gift-modal-cancel" onClick={onClose}>Cancel</button>
            <button className="gift-modal-save" onClick={handleSave} disabled={!canSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GiftCard({ gift, characters, onAssign, onUnassign, onEdit }) {
  const assignedIndexes = characters
    .map((c, i) => ({ character: c, index: i }))
    .filter(({ character }) => (character.darkGiftIds || []).includes(gift.id));

  const eligible = characters
    .map((c, i) => ({ character: c, index: i }))
    .filter(({ character }) =>
      character.name && !(character.darkGiftIds || []).includes(gift.id)
    );

  const handleAssignSelect = (e) => {
    const value = e.target.value;
    if (value !== '') {
      onAssign(parseInt(value), gift.id);
    }
    e.target.value = '';
  };

  const handleUnassign = (index, name) => {
    if (confirm(`Remove "${gift.title}" from ${name || 'this character'}?`)) {
      onUnassign(index, gift.id);
    }
  };

  return (
    <div className={`gift-card ${assignedIndexes.length > 0 ? 'gift-card-assigned' : ''}`}>
      <div className="gift-card-header">
        <span className="gift-number" title={gift.number ? `d20 roll: ${gift.number}` : 'No table number'}>
          {gift.number ?? '✦'}
        </span>
        <h4 className="gift-title">{gift.title}</h4>
        <button className="gift-edit-btn" onClick={() => onEdit(gift)} title="Edit gift">
          ✎
        </button>
      </div>
      <p className="gift-description">{gift.description}</p>
      <div className="gift-card-footer">
        <div className="gift-chips">
          {assignedIndexes.map(({ character, index }) => (
            <span
              key={index}
              className="gift-chip"
              style={character.color ? { borderColor: character.color } : undefined}
            >
              {character.portrait ? (
                <img src={character.portrait} alt="" className="gift-chip-portrait" />
              ) : (
                <span
                  className="gift-chip-dot"
                  style={character.color ? { background: character.color } : undefined}
                />
              )}
              <span className="gift-chip-name">{character.name || 'Unnamed'}</span>
              <button
                className="gift-chip-remove"
                onClick={() => handleUnassign(index, character.name)}
                title={`Remove from ${character.name || 'character'}`}
              >
                ✕
              </button>
            </span>
          ))}
          {assignedIndexes.length === 0 && (
            <span className="gift-unclaimed">Unclaimed</span>
          )}
        </div>
        {eligible.length > 0 && (
          <select className="gift-assign-select" value="" onChange={handleAssignSelect}>
            <option value="">+ Assign to…</option>
            {eligible.map(({ character, index }) => (
              <option key={index} value={index}>{character.name}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default function DarkGifts({ gifts, characters, onSaveGift, onDeleteGift, onAssign, onUnassign }) {
  const [search, setSearch] = useState('');
  const [assignedOnly, setAssignedOnly] = useState(false);
  const [editingGift, setEditingGift] = useState(null);

  const isAssigned = (gift) =>
    characters.some(c => (c.darkGiftIds || []).includes(gift.id));

  const query = search.trim().toLowerCase();
  const matchesSearch = (gift) =>
    !query ||
    gift.title.toLowerCase().includes(query) ||
    gift.description.toLowerCase().includes(query) ||
    String(gift.number) === query;

  const visibleGifts = gifts.filter(g => matchesSearch(g) && (!assignedOnly || isAssigned(g)));

  const sections = LIST_ORDER
    .map(key => ({
      key,
      ...GIFT_LISTS[key],
      gifts: visibleGifts
        .filter(g => g.list === key)
        .sort((a, b) => (a.number ?? 99) - (b.number ?? 99))
    }))
    .filter(section => section.gifts.length > 0);

  const assignedCount = gifts.filter(isAssigned).length;

  return (
    <div className="darkgifts-container">
      <div className="darkgifts-header">
        <div>
          <h2 className="darkgifts-title">Dark Gifts</h2>
          <p className="darkgifts-subtitle">
            Banes and boons bestowed by the Dark Powers upon those who die in Barovia
            {assignedCount > 0 && ` — ${assignedCount} bestowed`}
          </p>
        </div>
        <div className="darkgifts-controls">
          <input
            type="text"
            className="darkgifts-search"
            placeholder="Search gifts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label className="darkgifts-filter">
            <input
              type="checkbox"
              checked={assignedOnly}
              onChange={(e) => setAssignedOnly(e.target.checked)}
            />
            Bestowed only
          </label>
          <button className="darkgifts-add-btn" onClick={() => setEditingGift(EMPTY_GIFT)}>
            + New Gift
          </button>
        </div>
      </div>

      {sections.length === 0 && (
        <p className="darkgifts-empty">No dark gifts match — the mists reveal nothing.</p>
      )}

      {sections.map(section => (
        <div key={section.key} className="darkgifts-section-block">
          <div className="darkgifts-section-header">
            <h3 className="darkgifts-section-title">{section.title}</h3>
            <span className="darkgifts-section-subtitle">{section.subtitle}</span>
          </div>
          <div className="gift-grid">
            {section.gifts.map(gift => (
              <GiftCard
                key={gift.id}
                gift={gift}
                characters={characters}
                onAssign={onAssign}
                onUnassign={onUnassign}
                onEdit={setEditingGift}
              />
            ))}
          </div>
        </div>
      ))}

      {editingGift && (
        <GiftModal
          gift={editingGift}
          onSave={onSaveGift}
          onDelete={onDeleteGift}
          onClose={() => setEditingGift(null)}
        />
      )}
    </div>
  );
}
