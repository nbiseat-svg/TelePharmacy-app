import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './minimal.css';

// Components
import SimpleHeader from './components/SimpleHeader';
import SimpleFooter from './components/SimpleFooter';

// Pages
import BasicTest from './pages/BasicTest';
import ApiTest from './pages/ApiTest';

function App() {
  return (
    <Router>
      <div className="App">
        <SimpleHeader />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<BasicTest />} />
            <Route path="/api-test" element={<ApiTest />} />
          </Routes>
        </main>
        <SimpleFooter />
      </div>
    </Router>
  );
}

export default App;