import React from 'react';
import './Loading.css';

const Loading = ({ type = 'spinner', message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      {type === 'spinner' && (
        <div className="loading-spinner"></div>
      )}
      
      {type === 'pulse' && (
        <div className="loading-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      
      {type === 'dots' && (
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
      
      {message && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  );
};

export default Loading;