import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../api/recipeService';
import RecipeCard from '../components/RecipeCard';
import { toast, Toaster } from 'react-hot-toast';

const RecipeDetailPage = () => {
  const { id } = useParams(); // Gets the recipe ID from the URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No recipe ID provided');
      setIsLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        const errorMessage = String(err.message || err);
        setError(errorMessage);
        toast.error(`Failed to load recipe: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-slate-500 dark:text-slate-400">Loading recipe...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-red-900/50 text-red-400 p-6 rounded-lg max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-2">Recipe Not Found</h2>
                <p className="mb-4">Error: {error}</p>
                <div className="space-y-2">
                  <Link 
                    to="/history" 
                    className="block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Back to History
                  </Link>
                  <button
                    onClick={() => navigate(-1)}
                    className="block w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!recipe) {
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg max-w-md mx-auto">
                <p className="text-slate-600 dark:text-slate-300 mb-4">Recipe not found.</p>
                <Link 
                  to="/history" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Back to History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
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
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link 
              to="/history" 
              className="inline-flex items-center text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to My History
            </Link>
            
            <button
              onClick={() => navigate(-1)}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Recipe Content */}
          <RecipeCard recipe={recipe} userId={recipe.userId} showSaveButton={false} />
          
          {/* Additional Recipe Information */}
          {recipe.createdAt && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Created on {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeDetailPage;