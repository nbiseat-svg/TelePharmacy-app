import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js' // Import i18n configuration
import './serviceWorker.js' // Import service worker

// Performance monitoring
if ('performance' in window) {
  // Measure First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FCP:', entry.startTime)
    }
  })
  observer.observe({ entryTypes: ['paint'] })
}

// Report web vitals
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

// Accessibility improvements
// Set focus outline visibility based on user interaction
document.addEventListener('DOMContentLoaded', () => {
  let isUsingKeyboard = false;

  document.addEventListener('keydown', () => {
    isUsingKeyboard = true;
    document.documentElement.classList.add('user-is-tabbing');
  });

  document.addEventListener('mousedown', () => {
    isUsingKeyboard = false;
    document.documentElement.classList.remove('user-is-tabbing');
  });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Report web vitals in production
if (import.meta.env.PROD) {
  reportWebVitals(console.log)
}