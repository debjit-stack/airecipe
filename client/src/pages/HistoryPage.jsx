import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, deleteRecipe } from '../api/recipeService';
import { toast, Toaster } from 'react-hot-toast';

const HistoryPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('recipeRemixerUserId');
    setUserId(id);
    if (id) {
      fetchHistory(id);
    } else {
      setIsLoading(false);
      setError('No user ID found. Please generate a recipe first.');
    }
  }, []);

  const fetchHistory = async (id) => {
    try {
      setIsLoading(true);
      const data = await getHistory(id);
      setRecipes(data);
    } catch (err) {
      const errorMessage = String(err.message || err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      await deleteRecipe(recipeId);
      setRecipes(prev => prev.filter(recipe => recipe._id !== recipeId));
      toast.success('Recipe deleted successfully!');
    } catch (err) {
      const errorMessage = String(err.message || err);
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400">Loading your recipe history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-md">
            <p>Error: {error}</p>
            <Link to="/" className="mt-4 inline-block text-emerald-500 hover:underline">
              Go back to home and generate your first recipe
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#334155',
            color: '#fff',
          },
        }}
      />
      <div className="min-h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-emerald-500 dark:text-emerald-400 mb-4">
              My Recipe History
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              All your AI-generated recipes in one place
            </p>
          </header>

          {recipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-4">
                  No Recipes Yet
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  You haven't saved any recipes yet. Start by generating your first recipe!
                </p>
                <Link 
                  to="/" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-md transition-transform duration-200 hover:scale-105 active:scale-100"
                >
                  Generate My First Recipe
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <p className="text-slate-600 dark:text-slate-300">
                  {recipes.length} recipe{recipes.length === 1 ? '' : 's'} saved
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <div 
                    key={recipe._id} 
                    className="bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    <div className="relative">
                      <img 
                        src={recipe.imageUrl} 
                        alt={recipe.title} 
                        className="w-full h-48 object-cover"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src='https://placehold.co/400x300/334155/94a3b8?text=Recipe+Image'; 
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => handleDeleteRecipe(recipe._id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                          title="Delete Recipe"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-emerald-500 dark:text-emerald-400 mb-2 line-clamp-2">
                        {recipe.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                        {recipe.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                        <span>{recipe.ingredients.length} ingredients</span>
                        <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                      </div>

                      {recipe.userInput && (
                        <div className="mb-4 text-xs">
                          <p className="text-slate-500 dark:text-slate-400">
                            <span className="font-medium">Original ingredients:</span> {recipe.userInput.originalIngredients?.join(', ') || 'N/A'}
                          </p>
                          {recipe.userInput.originalDiet && (
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                              <span className="font-medium">Diet:</span> {recipe.userInput.originalDiet}
                            </p>
                          )}
                        </div>
                      )}
                      
                      <Link 
                        to={`/recipe/${recipe._id}`}
                        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold py-2 px-4 rounded-md transition-colors duration-200"
                      >
                        View Full Recipe
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;