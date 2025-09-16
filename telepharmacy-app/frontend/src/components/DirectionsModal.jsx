import React from 'react';
import './DirectionsModal.css';

const DirectionsModal = ({ isOpen, onClose, directions, pharmacy, userLocation }) => {
  if (!isOpen) return null;

  return (
    <div className="directions-modal-overlay" onClick={onClose}>
      <div className="directions-modal" onClick={(e) => e.stopPropagation()}>
        <div className="directions-modal-header">
          <h2>Directions to {pharmacy?.name}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="directions-modal-content">
          {directions ? (
            <>
              <div className="route-summary">
                <div className="summary-item">
                  <span className="summary-label">Distance:</span>
                  <span className="summary-value">{directions.distance}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Estimated Time:</span>
                  <span className="summary-value">{directions.duration}</span>
                </div>
              </div>
              
              <div className="route-instructions">
                <h3>Turn-by-turn Directions</h3>
                <ol className="instructions-list">
                  {directions.steps.map((step, index) => (
                    <li key={index} className="instruction-step">
                      <div className="step-icon">{index + 1}</div>
                      <div className="step-content">
                        <div className="step-text">{step.instruction}</div>
                        <div className="step-distance">{step.distance}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="route-actions">
                <button className="btn-primary" onClick={() => {
                  // In a real app, this would open the device's maps app
                  alert('This would open your device\'s maps app with the route');
                }}>
                  Open in Maps
                </button>
              </div>
            </>
          ) : (
            <div className="loading-directions">
              <p>Calculating directions...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectionsModal;