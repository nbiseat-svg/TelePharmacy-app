import React from 'react'

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#333' }}>Minimal React App</h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        If you can see this, React is working correctly!
      </p>
    </div>
  )
}

export default App