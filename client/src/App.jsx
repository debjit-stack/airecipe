import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SyncPage from './pages/SyncPage'; // 1. Import the new page
import Navbar from './components/Navbar';

function App() {
  React.useEffect(() => {
    const existingUserId = localStorage.getItem('recipeRemixerUserId');
    if (!existingUserId) {
      const newUserId = uuidv4();
      localStorage.setItem('recipeRemixerUserId', newUserId);
      console.log('New user ID created:', newUserId);
    } else {
      console.log('Existing user ID found:', existingUserId);
    }
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-slate-800">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            {/* 2. Add the new route for the sync page */}
            <Route path="/sync" element={<SyncPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;