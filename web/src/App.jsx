import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/HomePage.jsx';
import Explore from './pages/Explore.jsx';
import LocationDetail from './pages/LocationDetail.jsx';
import ExplorationMode from './pages/ExplorationMode.jsx';
import ExplorationModeOverview from './pages/ExplorationModeOverview.jsx';
import TempleLauncher from './pages/TempleLauncher.jsx';
import Login from './pages/Login.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/location/:id" element={<LocationDetail />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/explore/:id" element={<ExplorationMode />} />
        <Route path="/launcher" element={<TempleLauncher />} />
        <Route path="/tour/:id" element={<ExplorationModeOverview />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;