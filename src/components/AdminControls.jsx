import { useState, useRef } from 'react';
import './AdminControls.css';

export default function AdminControls({ onResetCalendarWeather, onExportData, onImportData }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const fileInputRef = useRef(null);
  const [pendingImportData, setPendingImportData] = useState(null);

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleResetConfirm = () => {
    onResetCalendarWeather();
    setShowResetConfirm(false);
  };

  const handleResetCancel = () => {
    setShowResetConfirm(false);
  };

  const handleExport = () => {
    onExportData();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setPendingImportData(data);
        setShowImportConfirm(true);
      } catch (error) {
        alert('Error reading file: Invalid JSON format');
      }
    };
    reader.readAsText(file);

    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleImportConfirm = () => {
    if (pendingImportData) {
      onImportData(pendingImportData);
      setPendingImportData(null);
      setShowImportConfirm(false);
    }
  };

  const handleImportCancel = () => {
    setPendingImportData(null);
    setShowImportConfirm(false);
  };

  return (
    <>
      <div className="admin-controls">
        <button onClick={handleResetClick} className="admin-btn reset-btn" title="Reset calendar and weather data">
          Reset Calendar/Weather
        </button>
        <button onClick={handleExport} className="admin-btn export-btn" title="Export all data as JSON">
          Export Backup
        </button>
        <button onClick={handleImportClick} className="admin-btn import-btn" title="Import data from backup file">
          Import Backup
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="confirm-overlay" onClick={handleResetCancel}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Reset Calendar & Weather?</h3>
            <p>This will reset the calendar, weather, forecast, weather history, and timeline events to defaults.</p>
            <p className="warning">Character data will NOT be affected.</p>
            <p className="warning-strong">This cannot be undone!</p>
            <div className="confirm-actions">
              <button onClick={handleResetCancel} className="btn-secondary">Cancel</button>
              <button onClick={handleResetConfirm} className="btn-danger">Reset Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Import Confirmation Modal */}
      {showImportConfirm && (
        <div className="confirm-overlay" onClick={handleImportCancel}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Import Backup Data?</h3>
            <p>This will overwrite ALL current data including characters, calendar, weather, and events.</p>
            <p className="warning-strong">Current data will be permanently lost!</p>
            <p className="tip">Tip: Export a backup first if you want to preserve current data.</p>
            <div className="confirm-actions">
              <button onClick={handleImportCancel} className="btn-secondary">Cancel</button>
              <button onClick={handleImportConfirm} className="btn-danger">Import & Overwrite</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
