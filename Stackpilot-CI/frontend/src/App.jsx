import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddRepo from './components/AddRepo';
import BuildLogsViewer from './components/BuildLogsViewer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: 'auto' }}>
            <div style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>&gt;_</div>
            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'white' }}>DevDeploy</span>
          </div>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>Dashboard</NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>Add Repository</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddRepo />} />
          <Route path="/logs/:repoId" element={<BuildLogsViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
