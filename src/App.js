import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserView from './UserView';
import LoginPage from './LoginPage'; // Make sure this exists
import AdminPanel from './AdminPanel'; // Make sure this exists
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

        {/* User View routes */}
        <Route path="/user" element={<UserView />} />

        {/* Backend-style public view (optional) */}
        <Route path="/user/public/view/:token" element={<UserView />} />

        {/* Frontend QR or button navigation */}
        <Route path="/view/:token" element={<UserView />} />
      </Routes>
    </Router>
  );
}

export default App;
