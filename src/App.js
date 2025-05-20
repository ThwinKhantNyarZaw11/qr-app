import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserView from './UserView';
import LoginPage from './LoginPage';
import AdminPanel from './AdminPanel';
import SuccessPage from './SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth & Admin routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/success" element={<SuccessPage />} />

        {/* QR view route with token */}
        <Route path="/advice/document/:token" element={<UserView />} />
      </Routes>
    </Router>
  );
}

export default App;
