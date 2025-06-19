import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GenerateQR from './components/GenerateQR';
import ScanQR from './components/ScanQR';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<GenerateQR />} />
          <Route path="/generate" element={<GenerateQR />} />
          <Route path="/scan" element={<ScanQR />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
