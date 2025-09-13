import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../api/recipeService'; // We will create this function next
import RecipeCard from '../components/RecipeCard';

const RecipeDetailPage = () => {
  const { id } = useParams(); // Gets the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(String(err.message || err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return <div className="text-center p-10 text-slate-500 dark:text-slate-400">Loading recipe...</div>;
  }

  if (error) {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 sm:p-8">
            <div className="text-center text-red-400">
                <p>Error: {error}</p>
                <Link to="/history" className="mt-4 inline-block text-emerald-500 hover:underline">
                    Back to History
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
             <Link to="/history" className="mb-6 inline-block text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400">
                &larr; Back to My History
            </Link>
            {recipe ? (
                <RecipeCard recipe={recipe} userId={recipe.userId} />
            ) : (
                <p>Recipe not found.</p>
            )}
        </div>
    </div>
  );
};

export default RecipeDetailPage;
