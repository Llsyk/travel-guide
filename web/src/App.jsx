import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/HomePage.jsx';
import Explore from './pages/Explore.jsx';
import LocationDetail from './pages/LocationDetail.jsx';
import ExplorationMode from './pages/ExplorationMode.jsx';

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
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;