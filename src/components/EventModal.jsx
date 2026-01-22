import { useState, useEffect } from 'react';
import { EVENT_TYPES } from '../data/eventTypes';
import { MONTHS } from '../data/calendar';
import './EventModal.css';

export default function EventModal({ isOpen, onClose, onSave, event, currentDate }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'story',
    date: currentDate
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'story',
        date: currentDate
      });
    }
  }, [event, currentDate, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (field, value) => {
    setFormData({
      ...formData,
      date: { ...formData.date, [field]: parseInt(value, 10) }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What happened?"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <div className="type-selector">
              {EVENT_TYPES.map(type => (
                <button
                  key={type.id}
                  type="button"
                  className={`type-btn ${formData.type === type.id ? 'active' : ''}`}
                  onClick={() => handleChange('type', type.id)}
                  style={{
                    borderColor: formData.type === type.id ? type.color : 'transparent',
                    color: formData.type === type.id ? type.color : 'var(--text-secondary)'
                  }}
                >
                  <span className="type-icon">{type.icon}</span>
                  <span className="type-label">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Date</label>
            <div className="date-inputs">
              <input
                type="number"
                min="1"
                max="30"
                value={formData.date.day + 1}
                onChange={(e) => handleDateChange('day', e.target.value - 1)}
                placeholder="Day"
              />
              <select
                value={formData.date.month}
                onChange={(e) => handleDateChange('month', e.target.value)}
              >
                {MONTHS.map((m, i) => (
                  <option key={m.name} value={i}>{m.name}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={formData.date.year}
                onChange={(e) => handleDateChange('year', e.target.value)}
                placeholder="Year"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Additional details about this event..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {event ? 'Update' : 'Add'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
