import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import RecipeDetailPage from './pages/RecipeDetailPage'; // 1. Import the new page
import Navbar from './components/Navbar';

function App() {
  // This useEffect hook is now in main.jsx to wrap the ThemeProvider correctly
  // but we keep the user ID logic here as it's app-level logic.
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
            {/* 2. Add the new route for the detail page */}
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;