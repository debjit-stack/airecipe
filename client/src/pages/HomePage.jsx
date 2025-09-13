// client/src/pages/HomePage.jsx

import React, { useState } from 'react';
import { generateRecipe } from '../api/recipeService';

const HomePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRecipe = async (e) => {
    e.preventDefault();
    setError('');
    setRecipe(null);
    setIsLoading(true);

    const ingredientsArray = ingredients.split(',').map(item => item.trim());

    try {
      const data = await generateRecipe(ingredientsArray, preferences);
      setRecipe(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-emerald-400">
            AI Recipe Remixer
          </h1>
          <p className="text-slate-400 mt-2">
            Enter the ingredients you have, and let the AI chef create a recipe for you!
          </p>
        </header>

        {/* Input Form */}
        <form onSubmit={handleGenerateRecipe} className="bg-slate-700 p-6 rounded-lg shadow-lg mb-8">
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-slate-300 font-medium mb-2">
              Ingredients (comma-separated)
            </label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g., chicken breast, broccoli, garlic"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preferences" className="block text-slate-300 font-medium mb-2">
              Preferences (optional)
            </label>
            <input
              type="text"
              id="preferences"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g., vegan, gluten-free, spicy"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Remixing...' : 'Remix my Recipe!'}
          </button>
        </form>

        {/* Display Area for Error, Loading, or Recipe */}
        <div className="mt-8">
          {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-md">{`Error: ${error}`}</p>}
          {isLoading && <p className="text-center text-lg">Asking the AI chef, please wait...</p>}
          
          {/* We will build the RecipeCard component here next */}
          {recipe && (
             <div className="bg-slate-700 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-emerald-400 mb-4">{recipe.title}</h2>
                <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" />
                <p className="text-slate-300 mb-4">{recipe.description}</p>
                {/* Ingredients and instructions would go here */}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;